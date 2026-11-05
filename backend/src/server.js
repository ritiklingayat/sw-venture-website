import 'dotenv/config';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import { initialiseStore, saveLead, getLeads, updateLead, saveContact, closeStore } from './contact-store.js';

const app = express();
const port = Number(process.env.PORT || 8080);
const allowedOrigins = (process.env.CORS_ORIGINS || 'http://localhost:5173,http://127.0.0.1:5173')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

app.disable('x-powered-by');
app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }));
app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
      return callback(new Error('Origin not allowed by CORS'));
    },
    methods: ['GET', 'POST', 'PATCH'],
    allowedHeaders: ['Content-Type'],
    maxAge: 600,
  })
);
app.use(express.json({ limit: '50kb', strict: true }));

// Rate limit for inquiry submissions
const leadRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 15,
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
    timestamp: new Date().toISOString(),
  });
});

// Public Lead / Inquiry submission
app.post('/api/leads', leadRateLimit, async (req, res, next) => {
  try {
    const { fullName, email, phone, companyName, serviceRequired, budget, description, country, sourcePage, leadType } = req.body;

    if (!fullName || typeof fullName !== 'string' || fullName.trim().length < 2) {
      return res.status(400).json({ message: 'Full name must be at least 2 characters long.' });
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ message: 'Please provide a valid email address.' });
    }
    if (!phone || typeof phone !== 'string' || phone.trim().length < 7) {
      return res.status(400).json({ message: 'Please provide a valid phone/WhatsApp number.' });
    }

    const saved = await saveLead({
      fullName,
      email,
      phone,
      companyName,
      serviceRequired,
      budget,
      description,
      country,
      sourcePage,
      leadType,
    });

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

// Admin Lead Listing
app.get('/api/leads', async (_req, res, next) => {
  try {
    const leads = await getLeads();
    return res.json({ leads });
  } catch (error) {
    return next(error);
  }
});

// Admin Lead Status / Notes update
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

// Backwards-compatible contact endpoint
app.post('/api/contact', leadRateLimit, async (req, res, next) => {
  try {
    const { name, email, business, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ message: 'Name, email, and message are required.' });
    }
    const saved = await saveContact({ name, email, business, message });
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
