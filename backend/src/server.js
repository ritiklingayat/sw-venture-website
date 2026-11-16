import 'dotenv/config';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import {
  initialiseStore,
  saveLead,
  getLeads,
  updateLead,
  saveContact,
  saveNewsletter,
  getDigitalAudits,
  getConsultations,
  closeStore,
} from './contact-store.js';

const app = express();
const port = Number(process.env.PORT || 5000);
const corsOriginsEnv = process.env.CORS_ORIGINS || '*';
const configuredOrigins = corsOriginsEnv
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

app.disable('x-powered-by');
app.set('trust proxy', 1);
app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }));
app.use(
  cors({
    origin(origin, callback) {
      // Allow requests with no origin (e.g. mobile apps, curl, same-origin/proxied requests)
      if (!origin) return callback(null, true);

      // If wildcard is specified in env or dev mode
      if (configuredOrigins.includes('*') || process.env.NODE_ENV !== 'production') {
        return callback(null, true);
      }

      // Check configured list
      if (configuredOrigins.includes(origin)) {
        return callback(null, true);
      }

      // Allow any localhost, 127.0.0.1, or local LAN IP on any port
      if (
        /^http:\/\/(localhost|127\.0\.0\.1|0\.0\.0\.0)(:\d+)?$/.test(origin) ||
        /^http:\/\/(192\.168\.\d+\.\d+|10\.\d+\.\d+\.\d+|172\.(1[6-9]|2\d|3[01])\.\d+\.\d+)(:\d+)?$/.test(origin)
      ) {
        return callback(null, true);
      }

      // Allow production domains and preview deployments
      if (
        /^https:\/\/([a-zA-Z0-9-]+\.)*swdigitalhub\.com$/.test(origin) ||
        /^https:\/\/([a-zA-Z0-9-]+\.)*vercel\.app$/.test(origin)
      ) {
        return callback(null, true);
      }

      return callback(new Error('Origin not allowed by CORS'));
    },
    methods: ['GET', 'POST', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    maxAge: 86400,
  })
);
app.use(express.json({ limit: '50kb', strict: true }));

// Rate limit for inquiry submissions
const leadRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 25,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  message: { message: 'Too many requests from this connection. Please try again after a few minutes.' },
});

// Health check endpoint
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    service: 'sw-digital-hub-api',
    business: 'SW Digital Hub',
    domain: 'www.swdigitalhub.com',
    database: process.env.DATABASE_URL ? 'Neon PostgreSQL' : 'Local Fallback',
    timestamp: new Date().toISOString(),
  });
});

// Helper to extract request metadata
function getReqMeta(req) {
  return {
    ip: req.ip || req.headers['x-forwarded-for'] || req.socket.remoteAddress || null,
    userAgent: req.headers['user-agent'] || null,
  };
}

// 1. Unified Lead / Inquiry submission (Handles Project Proposals, Audits, Consultations)
app.post('/api/leads', leadRateLimit, async (req, res, next) => {
  try {
    const {
      fullName,
      email,
      phone,
      companyName,
      serviceRequired,
      budget,
      description,
      country,
      preferredContact,
      preferredDate,
      preferredTime,
      websiteUrl,
      instagramUrl,
      facebookUrl,
      linkedinUrl,
      mainChallenge,
      servicesInterested,
      consent,
      sourcePage,
      leadType,
    } = req.body;

    if (!fullName || typeof fullName !== 'string' || fullName.trim().length < 2) {
      return res.status(400).json({ message: 'Full name must be at least 2 characters long.' });
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ message: 'Please provide a valid email address.' });
    }
    if (!phone || typeof phone !== 'string' || phone.trim().length < 7) {
      return res.status(400).json({ message: 'Please provide a valid phone or WhatsApp number.' });
    }

    const saved = await saveLead(
      {
        fullName,
        email,
        phone,
        companyName,
        serviceRequired,
        budget,
        description,
        country,
        preferredContact,
        preferredDate,
        preferredTime,
        websiteUrl,
        instagramUrl,
        facebookUrl,
        linkedinUrl,
        mainChallenge,
        servicesInterested,
        consent,
        sourcePage,
        leadType,
      },
      getReqMeta(req)
    );

    return res.status(201).json({
      status: 'ok',
      message: 'Inquiry received. A senior growth strategist from SW Digital Hub will contact you shortly.',
      id: saved.id,
      leadNumber: saved.leadNumber,
      receivedAt: saved.createdAt,
    });
  } catch (error) {
    return next(error);
  }
});

// 2. Admin Lead Listing
app.get('/api/leads', async (_req, res, next) => {
  try {
    const leads = await getLeads();
    return res.json({ leads });
  } catch (error) {
    return next(error);
  }
});

// 3. Admin Lead Status / Notes update
app.patch('/api/leads/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status, notes } = req.body;
    const updated = await updateLead(id, { status, notes });
    if (!updated) {
      return res.status(404).json({ message: 'Lead not found.' });
    }
    return res.json({ status: 'ok', lead: updated });
  } catch (error) {
    return next(error);
  }
});

// 4. Digital Audits Listing
app.get('/api/audits', async (_req, res, next) => {
  try {
    const audits = await getDigitalAudits();
    return res.json({ audits });
  } catch (error) {
    return next(error);
  }
});

// 5. Consultations Listing
app.get('/api/consultations', async (_req, res, next) => {
  try {
    const consultations = await getConsultations();
    return res.json({ consultations });
  } catch (error) {
    return next(error);
  }
});

// 6. Contact Form endpoint
app.post('/api/contact', leadRateLimit, async (req, res, next) => {
  try {
    const { name, email, business, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ message: 'Name, email, and message are required.' });
    }
    const saved = await saveContact({ name, email, business, message }, getReqMeta(req));
    return res.status(201).json({
      message: 'Thanks! Your message has been received.',
      id: saved.id,
      leadNumber: saved.leadNumber,
      receivedAt: saved.createdAt,
    });
  } catch (error) {
    return next(error);
  }
});

// 7. Newsletter Subscription endpoint
app.post('/api/newsletter', leadRateLimit, async (req, res, next) => {
  try {
    const { email, source } = req.body;
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ message: 'Please provide a valid email address.' });
    }
    const result = await saveNewsletter(email, source);
    return res.status(201).json({
      status: 'ok',
      message: 'Subscribed successfully to SW Digital Hub updates.',
      data: result,
    });
  } catch (error) {
    return next(error);
  }
});

app.use((_req, res) => res.status(404).json({ message: 'Endpoint not found.' }));

app.use((error, _req, res, _next) => {
  if (error?.message === 'Origin not allowed by CORS') return res.status(403).json({ message: 'This origin is not allowed.' });
  if (error instanceof SyntaxError && 'body' in error) return res.status(400).json({ message: 'Request body must be valid JSON.' });
  console.error('Request failed:', error?.message || 'Unknown error');
  res.status(500).json({ message: 'Something went wrong. Please try again later.' });
});

await initialiseStore();
const server = app.listen(port, () => console.log(`SW Digital Hub API running on port ${port}`));

async function shutdown(signal) {
  console.log(`${signal} received; closing server gracefully.`);
  server.close(async () => {
    try {
      await closeStore();
      process.exit(0);
    } catch (error) {
      console.error('Shutdown error:', error.message);
      process.exit(1);
    }
  });
  setTimeout(() => process.exit(1), 10000).unref();
}

process.on('SIGTERM', () => shutdown('SIGTERM'));
