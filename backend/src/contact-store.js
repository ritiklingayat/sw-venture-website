import fs from 'node:fs/promises';
import { randomUUID } from 'node:crypto';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import dotenv from 'dotenv';

const here = path.dirname(fileURLToPath(import.meta.url));
// Load both current working directory and backend directory .env
dotenv.config();
dotenv.config({ path: path.resolve(here, '../.env') });

const dataDir = process.env.DATA_DIR || path.resolve(here, '../data');
const contactFile = path.join(dataDir, 'contact-submissions.json');
const leadsFile = path.join(dataDir, 'leads.json');
let pool = null;
let initialised = false;

async function initPostgres() {
  if (!process.env.DATABASE_URL) return false;
  const { Pool } = await import('pg');

  const isSsl = process.env.DATABASE_SSL === 'true' || process.env.DATABASE_URL.includes('sslmode=require');

  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: isSsl ? { rejectUnauthorized: process.env.DATABASE_SSL_REJECT_UNAUTHORIZED === 'true' } : false,
    max: Number(process.env.DB_POOL_MAX || 10),
    connectionTimeoutMillis: 10000,
    idleTimeoutMillis: 30000,
  });

  // Verify connection
  const ping = await pool.query('SELECT NOW() as current_time');
  console.log(`SW Digital Hub Storage: Neon PostgreSQL connected at ${ping.rows[0].current_time.toISOString()}`);

  // 1. Leads Table (Unified CRM Lead Record)
  await pool.query(`
    CREATE TABLE IF NOT EXISTS leads (
      id VARCHAR(64) PRIMARY KEY,
      lead_number VARCHAR(64) NOT NULL UNIQUE,
      full_name VARCHAR(150) NOT NULL,
      company_name VARCHAR(150),
      email VARCHAR(254) NOT NULL,
      phone VARCHAR(50) NOT NULL,
      country VARCHAR(80) DEFAULT 'India',
      service_required VARCHAR(150),
      budget VARCHAR(80),
      preferred_contact VARCHAR(50) DEFAULT 'WhatsApp',
      preferred_date VARCHAR(50),
      preferred_time VARCHAR(50),
      website_url VARCHAR(255),
      social_links JSONB DEFAULT '{}'::jsonb,
      description TEXT,
      source_page VARCHAR(200) DEFAULT '/',
      lead_type VARCHAR(80) DEFAULT 'Website Inquiry',
      status VARCHAR(50) DEFAULT 'New',
      notes TEXT,
      metadata JSONB DEFAULT '{}'::jsonb,
      ip_address VARCHAR(64),
      user_agent TEXT,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `);

  // 2. Digital Audits Table (Free 360° Digital Growth Audit)
  await pool.query(`
    CREATE TABLE IF NOT EXISTS digital_audits (
      id BIGSERIAL PRIMARY KEY,
      lead_id VARCHAR(64) REFERENCES leads(id) ON DELETE CASCADE,
      full_name VARCHAR(150) NOT NULL,
      business_name VARCHAR(150),
      email VARCHAR(254) NOT NULL,
      phone VARCHAR(50) NOT NULL,
      services_interested VARCHAR(150),
      website_url VARCHAR(255),
      instagram_url VARCHAR(255),
      facebook_url VARCHAR(255),
      linkedin_url VARCHAR(255),
      main_challenge TEXT,
      status VARCHAR(50) DEFAULT 'Pending Review',
      audit_notes TEXT,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `);

  // 3. Consultations Table (Book a Free Consultation Modal)
  await pool.query(`
    CREATE TABLE IF NOT EXISTS consultations (
      id BIGSERIAL PRIMARY KEY,
      lead_id VARCHAR(64) REFERENCES leads(id) ON DELETE CASCADE,
      full_name VARCHAR(150) NOT NULL,
      company_name VARCHAR(150),
      email VARCHAR(254) NOT NULL,
      phone VARCHAR(50) NOT NULL,
      service_required VARCHAR(150),
      preferred_date VARCHAR(50),
      preferred_time VARCHAR(50),
      notes TEXT,
      status VARCHAR(50) DEFAULT 'Scheduled',
      meeting_link VARCHAR(255),
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `);

  // 4. Contact Submissions Table (Direct Contact Form & Legacy API)
  await pool.query(`
    CREATE TABLE IF NOT EXISTS contact_submissions (
      id BIGSERIAL PRIMARY KEY,
      name VARCHAR(150) NOT NULL,
      email VARCHAR(254) NOT NULL,
      business VARCHAR(120),
      message TEXT NOT NULL,
      ip_address VARCHAR(64),
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `);

  // 5. Newsletter Subscribers Table
  await pool.query(`
    CREATE TABLE IF NOT EXISTS newsletter_subscribers (
      id BIGSERIAL PRIMARY KEY,
      email VARCHAR(254) NOT NULL UNIQUE,
      source VARCHAR(100) DEFAULT 'Website Footer',
      status VARCHAR(50) DEFAULT 'Active',
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `);

  // Indexes for high performance
  await pool.query(`
    CREATE INDEX IF NOT EXISTS idx_leads_email ON leads(email);
    CREATE INDEX IF NOT EXISTS idx_leads_phone ON leads(phone);
    CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);
    CREATE INDEX IF NOT EXISTS idx_leads_lead_type ON leads(lead_type);
    CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at DESC);
    CREATE INDEX IF NOT EXISTS idx_digital_audits_lead_id ON digital_audits(lead_id);
    CREATE INDEX IF NOT EXISTS idx_digital_audits_email ON digital_audits(email);
    CREATE INDEX IF NOT EXISTS idx_consultations_lead_id ON consultations(lead_id);
    CREATE INDEX IF NOT EXISTS idx_consultations_email ON consultations(email);
    CREATE INDEX IF NOT EXISTS idx_contact_submissions_email ON contact_submissions(email);
  `);

  return true;
}

export async function initialiseStore() {
  if (initialised && pool) return;
  if (process.env.DATABASE_URL) {
    try {
      await initPostgres();
      initialised = true;
      return;
    } catch (error) {
      console.warn('PostgreSQL initialization warning:', error.message);
      console.warn('Fallback to local storage active until connection restores.');
    }
  }
  
  await fs.mkdir(dataDir, { recursive: true });
  try { await fs.access(contactFile); } catch { await fs.writeFile(contactFile, '[]\n', { flag: 'wx' }); }
  try { await fs.access(leadsFile); } catch { await fs.writeFile(leadsFile, '[]\n', { flag: 'wx' }); }
  initialised = true;
}

function generateLeadNumber() {
  const rand = Math.floor(10000 + Math.random() * 90000);
  return `SWD-${rand}`;
}

export async function saveLead(leadData, reqMeta = {}) {
  if (!initialised) await initialiseStore();
  const id = randomUUID();
  const leadNumber = generateLeadNumber();
  const now = new Date().toISOString();

  const fullName = (leadData.fullName || leadData.name || '').trim();
  const companyName = (leadData.companyName || leadData.businessName || '').trim();
  const email = (leadData.email || '').trim().toLowerCase();
  const phone = (leadData.phone || '').trim();
  const country = leadData.country || 'India';
  const serviceRequired = leadData.serviceRequired || 'Digital Growth Strategy';
  const budget = leadData.budget || 'Custom Scope';
  const preferredContact = leadData.preferredContact || 'WhatsApp';
  const preferredDate = leadData.preferredDate || null;
  const preferredTime = leadData.preferredTime || null;
  const websiteUrl = leadData.websiteUrl || null;
  const socialLinks = {
    instagram: leadData.instagramUrl || null,
    facebook: leadData.facebookUrl || null,
    linkedin: leadData.linkedinUrl || null,
  };
  const description = (leadData.description || '').trim();
  const sourcePage = leadData.sourcePage || '/';
  const leadType = leadData.leadType || 'Website Inquiry';
  const status = 'New';
  const notes = '';
  const metadata = {
    consent: leadData.consent ?? true,
    servicesInterested: leadData.servicesInterested || null,
    mainChallenge: leadData.mainChallenge || null,
  };
  const ipAddress = reqMeta.ip || null;
  const userAgent = reqMeta.userAgent || null;

  const record = {
    id,
    leadNumber,
    fullName,
    companyName,
    email,
    phone,
    country,
    serviceRequired,
    budget,
    preferredContact,
    preferredDate,
    preferredTime,
    websiteUrl,
    socialLinks,
    description,
    sourcePage,
    leadType,
    status,
    notes,
    metadata,
    ipAddress,
    userAgent,
    createdAt: now,
    updatedAt: now,
  };

  if (pool) {
    // 1. Insert into main leads table
    await pool.query(
      `INSERT INTO leads (
        id, lead_number, full_name, company_name, email, phone, country,
        service_required, budget, preferred_contact, preferred_date, preferred_time,
        website_url, social_links, description, source_page, lead_type, status,
        notes, metadata, ip_address, user_agent, created_at, updated_at
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24)`,
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
        record.preferredContact,
        record.preferredDate,
        record.preferredTime,
        record.websiteUrl,
        JSON.stringify(record.socialLinks),
        record.description,
        record.sourcePage,
        record.leadType,
        record.status,
        record.notes,
        JSON.stringify(record.metadata),
        record.ipAddress,
        record.userAgent,
        record.createdAt,
        record.updatedAt,
      ]
    );

    // 2. If this is a Free Digital Audit, also insert into digital_audits table
    if (leadType === 'Free Digital Audit') {
      try {
        await pool.query(
          `INSERT INTO digital_audits (
            lead_id, full_name, business_name, email, phone, services_interested,
            website_url, instagram_url, facebook_url, linkedin_url, main_challenge, status, created_at
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)`,
          [
            record.id,
            record.fullName,
            record.companyName,
            record.email,
            record.phone,
            leadData.servicesInterested || record.serviceRequired,
            leadData.websiteUrl || null,
            leadData.instagramUrl || null,
            leadData.facebookUrl || null,
            leadData.linkedinUrl || null,
            leadData.mainChallenge || null,
            'Pending Review',
            record.createdAt,
          ]
        );
      } catch (auditErr) {
        console.error('Error inserting into digital_audits:', auditErr.message);
      }
    }

    // 3. If this is a Consultation Booking, also insert into consultations table
    if (leadType === 'Consultation Booking') {
      try {
        await pool.query(
          `INSERT INTO consultations (
            lead_id, full_name, company_name, email, phone, service_required,
            preferred_date, preferred_time, notes, status, created_at
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`,
          [
            record.id,
            record.fullName,
            record.companyName,
            record.email,
            record.phone,
            record.serviceRequired,
            record.preferredDate,
            record.preferredTime,
            record.description,
            'Scheduled',
            record.createdAt,
          ]
        );
      } catch (consultErr) {
        console.error('Error inserting into consultations:', consultErr.message);
      }
    }

    return record;
  }

  // File fallback
  let existing = [];
  try {
    const raw = await fs.readFile(leadsFile, 'utf8');
    existing = raw.trim() ? JSON.parse(raw) : [];
  } catch {
    existing = [];
  }
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
      preferredContact: r.preferred_contact,
      preferredDate: r.preferred_date,
      preferredTime: r.preferred_time,
      websiteUrl: r.website_url,
      socialLinks: r.social_links,
      description: r.description,
      sourcePage: r.source_page,
      leadType: r.lead_type,
      status: r.status,
      notes: r.notes,
      metadata: r.metadata,
      createdAt: r.created_at,
      updatedAt: r.updated_at,
    }));
  }

  try {
    const data = await fs.readFile(leadsFile, 'utf8');
    return data.trim() ? JSON.parse(data) : [];
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
    const updated = await pool.query(`SELECT * FROM leads WHERE id = $1 OR lead_number = $1`, [id]);
    return updated.rows[0] || true;
  }

  let leads = [];
  try {
    const data = await fs.readFile(leadsFile, 'utf8');
    leads = data.trim() ? JSON.parse(data) : [];
  } catch {
    leads = [];
  }
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

// Contact form submission
export async function saveContact(contact, reqMeta = {}) {
  if (!initialised) await initialiseStore();
  const now = new Date().toISOString();

  if (pool) {
    await pool.query(
      `INSERT INTO contact_submissions (name, email, business, message, ip_address, created_at)
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [contact.name, contact.email, contact.business || '', contact.message, reqMeta.ip || null, now]
    );
  }

  // Also save into unified leads table
  return saveLead({
    fullName: contact.name,
    email: contact.email,
    serviceRequired: contact.business || 'General Inquiry',
    description: contact.message,
    sourcePage: '/contact',
    leadType: 'Contact Submission',
  }, reqMeta);
}

// Newsletter subscription
export async function saveNewsletter(email, source = 'Website Footer') {
  if (!initialised) await initialiseStore();
  if (pool) {
    const cleanEmail = email.trim().toLowerCase();
    await pool.query(
      `INSERT INTO newsletter_subscribers (email, source, status, created_at)
       VALUES ($1, $2, 'Active', NOW())
       ON CONFLICT (email) DO NOTHING`,
      [cleanEmail, source]
    );
    return { email: cleanEmail, status: 'Active' };
  }
  return { email, status: 'Active' };
}

// Digital Audits listing
export async function getDigitalAudits() {
  if (!initialised) await initialiseStore();
  if (pool) {
    const result = await pool.query('SELECT * FROM digital_audits ORDER BY created_at DESC');
    return result.rows;
  }
  return [];
}

// Consultations listing
export async function getConsultations() {
  if (!initialised) await initialiseStore();
  if (pool) {
    const result = await pool.query('SELECT * FROM consultations ORDER BY created_at DESC');
    return result.rows;
  }
  return [];
}

export async function closeStore() {
  if (pool) {
    await pool.end();
  }
}
