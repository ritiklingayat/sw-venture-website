import fs from 'node:fs/promises';
import { randomUUID } from 'node:crypto';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const dataDir = process.env.DATA_DIR || path.resolve(here, '../data');
const contactFile = path.join(dataDir, 'contact-submissions.json');
const leadsFile = path.join(dataDir, 'leads.json');
let pool;
let initialised = false;

async function initPostgres() {
  if (!process.env.DATABASE_URL) return false;
  const { Pool } = await import('pg');
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.DATABASE_SSL === 'true' ? { rejectUnauthorized: process.env.DATABASE_SSL_REJECT_UNAUTHORIZED !== 'false' } : undefined,
    max: Number(process.env.DB_POOL_MAX || 5),
    connectionTimeoutMillis: 5000,
    idleTimeoutMillis: 30000,
  });

  await pool.query(`CREATE TABLE IF NOT EXISTS contact_submissions (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(254) NOT NULL,
    business VARCHAR(80) NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
  )`);

  await pool.query(`CREATE TABLE IF NOT EXISTS leads (
    id VARCHAR(64) PRIMARY KEY,
    lead_number VARCHAR(64) NOT NULL,
    full_name VARCHAR(120) NOT NULL,
    company_name VARCHAR(120),
    email VARCHAR(254) NOT NULL,
    phone VARCHAR(40) NOT NULL,
    country VARCHAR(60),
    service_required VARCHAR(120),
    budget VARCHAR(60),
    description TEXT,
    source_page VARCHAR(150),
    lead_type VARCHAR(60),
    status VARCHAR(50) DEFAULT 'New',
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
  )`);

  return true;
}

export async function initialiseStore() {
  if (initialised) return;
  if (process.env.DATABASE_URL) {
    await initPostgres();
    console.log('SW Digital Hub Storage: PostgreSQL connected.');
  } else {
    await fs.mkdir(dataDir, { recursive: true });
    try { await fs.access(contactFile); } catch { await fs.writeFile(contactFile, '[]\n', { flag: 'wx' }); }
    try { await fs.access(leadsFile); } catch { await fs.writeFile(leadsFile, '[]\n', { flag: 'wx' }); }
    console.log(`SW Digital Hub Storage: Local JSON storage active at ${dataDir}`);
  }
  initialised = true;
}

function generateLeadNumber() {
  const rand = Math.floor(10000 + Math.random() * 90000);
  return `SWD-${rand}`;
}

export async function saveLead(leadData) {
  if (!initialised) await initialiseStore();
  const id = randomUUID();
  const leadNumber = generateLeadNumber();
  const now = new Date().toISOString();

  const record = {
    id,
    leadNumber,
    fullName: (leadData.fullName || leadData.name || '').trim(),
    companyName: (leadData.companyName || '').trim(),
    email: (leadData.email || '').trim().toLowerCase(),
    phone: (leadData.phone || '').trim(),
    country: leadData.country || 'India',
    serviceRequired: leadData.serviceRequired || 'Digital Growth Strategy',
    budget: leadData.budget || 'Custom Scope',
    description: (leadData.description || '').trim(),
    sourcePage: leadData.sourcePage || '/',
    leadType: leadData.leadType || 'Website Inquiry',
    status: 'New',
    notes: '',
    createdAt: now,
    updatedAt: now,
  };

  if (pool) {
    await pool.query(
      `INSERT INTO leads (id, lead_number, full_name, company_name, email, phone, country, service_required, budget, description, source_page, lead_type, status, notes, created_at, updated_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)`,
      [
        record.id,
        record.leadNumber,
        record.fullName,
        record.companyName,
        record.email,
        record.phone,
        record.country,
        record.serviceRequired,
        record.budget,
        record.description,
        record.sourcePage,
        record.leadType,
        record.status,
        record.notes,
        record.createdAt,
        record.updatedAt,
      ]
    );
    return record;
  }

  // File write
  const existing = JSON.parse(await fs.readFile(leadsFile, 'utf8'));
  existing.unshift(record);
  await fs.writeFile(leadsFile, JSON.stringify(existing, null, 2) + '\n', 'utf8');
  return record;
}

export async function getLeads() {
  if (!initialised) await initialiseStore();
  if (pool) {
    const result = await pool.query('SELECT * FROM leads ORDER BY created_at DESC');
    return result.rows.map((r) => ({
      id: r.id,
      leadNumber: r.lead_number,
      fullName: r.full_name,
      companyName: r.company_name,
      email: r.email,
      phone: r.phone,
      country: r.country,
      serviceRequired: r.service_required,
      budget: r.budget,
      description: r.description,
      sourcePage: r.source_page,
      leadType: r.lead_type,
      status: r.status,
      notes: r.notes,
      createdAt: r.created_at,
      updatedAt: r.updated_at,
    }));
  }

  try {
    const data = await fs.readFile(leadsFile, 'utf8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

export async function updateLead(id, updates) {
  if (!initialised) await initialiseStore();
  const now = new Date().toISOString();

  if (pool) {
    const fields = [];
    const values = [];
    let idx = 1;

    if (updates.status !== undefined) {
      fields.push(`status = $${idx++}`);
      values.push(updates.status);
    }
    if (updates.notes !== undefined) {
      fields.push(`notes = $${idx++}`);
      values.push(updates.notes);
    }
    fields.push(`updated_at = $${idx++}`);
    values.push(now);
    values.push(id);

    await pool.query(`UPDATE leads SET ${fields.join(', ')} WHERE id = $${idx} OR lead_number = $${idx}`, values);
    return true;
  }

  const leads = JSON.parse(await fs.readFile(leadsFile, 'utf8'));
  const foundIndex = leads.findIndex((l) => l.id === id || l.leadNumber === id);
  if (foundIndex !== -1) {
    leads[foundIndex] = {
      ...leads[foundIndex],
      ...updates,
      updatedAt: now,
    };
    await fs.writeFile(leadsFile, JSON.stringify(leads, null, 2) + '\n', 'utf8');
    return leads[foundIndex];
  }
  return null;
}

// Backwards-compatible contact save
export async function saveContact(contact) {
  return saveLead({
    fullName: contact.name,
    email: contact.email,
    serviceRequired: contact.business,
    description: contact.message,
    sourcePage: '/contact',
    leadType: 'Legacy Contact Form',
  });
}

export async function closeStore() {
  if (pool) {
    await pool.end();
  }
}
