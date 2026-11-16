import 'dotenv/config';
import pg from 'pg';

const { Pool } = pg;

export async function runMigration() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error('DATABASE_URL is not set in environment.');
  }

  const pool = new Pool({
    connectionString,
    ssl: { rejectUnauthorized: false },
    connectionTimeoutMillis: 10000,
  });

  try {
    console.log('Connecting to Neon PostgreSQL...');
    const nowResult = await pool.query('SELECT NOW() as current_time');
    console.log('Connected to Neon successfully at:', nowResult.rows[0].current_time);

    console.log('Creating database schema for SW Digital Hub...');

    // 1. Leads Table (Comprehensive Master Table)
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

    // Create Indexes for high performance
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

    console.log('✅ All tables and indexes successfully created in Neon PostgreSQL!');
    const tablesResult = await pool.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      ORDER BY table_name;
    `);
    console.log('Tables created in Neon database:', tablesResult.rows.map(r => r.table_name));

    return true;
  } catch (error) {
    console.error('❌ Migration failed:', error);
    throw error;
  } finally {
    await pool.end();
  }
}

// Auto-run if executed directly
if (process.argv[1] && process.argv[1].endsWith('migrate.js')) {
  runMigration().catch(() => process.exit(1));
}
