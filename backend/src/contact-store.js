import fs from 'node:fs/promises';
import { randomUUID } from 'node:crypto';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const dataDir = process.env.DATA_DIR || path.resolve(here, '../data');
const dataFile = path.join(dataDir, 'contact-submissions.json');
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
  return true;
}

export async function initialiseStore() {
  if (initialised) return;
  if (process.env.DATABASE_URL) {
    await initPostgres();
    console.log('Contact storage: PostgreSQL');
  } else {
    await fs.mkdir(dataDir, { recursive: true });
    try { await fs.access(dataFile); } catch { await fs.writeFile(dataFile, '[]\n', { flag: 'wx' }); }
    console.warn(`Contact storage: local JSON file at ${dataFile}. Configure DATABASE_URL for production.`);
  }
  initialised = true;
}

export async function saveContact(contact) {
  if (!initialised) await initialiseStore();
  if (pool) {
    const result = await pool.query(
      'INSERT INTO contact_submissions (name, email, business, message) VALUES ($1, $2, $3, $4) RETURNING id, created_at',
      [contact.name, contact.email, contact.business, contact.message]
    );
    return result.rows[0];
  }
  // Serialise file writes so simultaneous requests do not overwrite one another.
  const previous = saveContact.writeQueue || Promise.resolve();
  const next = previous.then(async () => {
    const existing = JSON.parse(await fs.readFile(dataFile, 'utf8'));
    const entry = { id: randomUUID(), ...contact, createdAt: new Date().toISOString() };
    existing.push(entry);
    await fs.writeFile(dataFile, `${JSON.stringify(existing, null, 2)}\n`, { mode: 0o600 });
    return { id: entry.id, created_at: entry.createdAt };
  });
  saveContact.writeQueue = next.catch(() => {});
  return next;
}

export async function closeStore() {
  if (pool) await pool.end();
}
