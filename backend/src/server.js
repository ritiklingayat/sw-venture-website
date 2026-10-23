import 'dotenv/config';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import { initialiseStore, saveContact, closeStore } from './contact-store.js';

const app = express();
const port = Number(process.env.PORT || 8080);
const allowedOrigins = (process.env.CORS_ORIGINS || 'http://localhost:5173,http://127.0.0.1:5173')
  .split(',').map(origin => origin.trim()).filter(Boolean);

app.disable('x-powered-by');
app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }));
app.use(cors({ origin(origin, callback) {
  if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
  return callback(new Error('Origin not allowed by CORS'));
}, methods: ['GET', 'POST'], allowedHeaders: ['Content-Type'], maxAge: 600 }));
app.use(express.json({ limit: '20kb', strict: true }));
app.use('/api/contact', rateLimit({ windowMs: 15 * 60 * 1000, limit: 8, standardHeaders: 'draft-7', legacyHeaders: false, message: { message: 'Too many messages from this connection. Please try again later.' } }));

app.get('/api/health', (_req, res) => res.json({ status: 'ok', service: 'sw-venture-api', timestamp: new Date().toISOString() }));

const allowedBusinesses = new Set(['General enquiry', 'SW Multimedia', 'SW Digital Hub', 'SW Meritx', 'SW Hub', 'Partnership']);
function cleanText(value) { return typeof value === 'string' ? value.trim() : ''; }
function validateContact(body) {
  const contact = { name: cleanText(body?.name), email: cleanText(body?.email).toLowerCase(), business: cleanText(body?.business) || 'General enquiry', message: cleanText(body?.message) };
  const errors = {};
  if (contact.name.length < 2 || contact.name.length > 100) errors.name = 'Name must be between 2 and 100 characters.';
  if (contact.email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email)) errors.email = 'Enter a valid email address.';
  if (!allowedBusinesses.has(contact.business)) errors.business = 'Choose a valid enquiry category.';
  if (contact.message.length < 10 || contact.message.length > 3000) errors.message = 'Message must be between 10 and 3,000 characters.';
  return { contact, errors };
}

app.post('/api/contact', async (req, res, next) => {
  const { contact, errors } = validateContact(req.body);
  if (Object.keys(errors).length) return res.status(400).json({ message: 'Please check the form fields and try again.', errors });
  try {
    const saved = await saveContact(contact);
    return res.status(201).json({ message: 'Thanks! Your message has been received.', id: saved.id, receivedAt: saved.created_at });
  } catch (error) { return next(error); }
});

app.use((_req, res) => res.status(404).json({ message: 'Endpoint not found.' }));
app.use((error, _req, res, _next) => {
  if (error?.message === 'Origin not allowed by CORS') return res.status(403).json({ message: 'This origin is not allowed.' });
  if (error instanceof SyntaxError && 'body' in error) return res.status(400).json({ message: 'Request body must be valid JSON.' });
  console.error('Request failed:', error?.message || 'Unknown error');
  res.status(500).json({ message: 'Something went wrong. Please try again later.' });
});

await initialiseStore();
const server = app.listen(port, () => console.log(`SW Venture API listening on port ${port}`));
async function shutdown(signal) {
  console.log(`${signal} received; closing server gracefully.`);
  server.close(async () => { try { await closeStore(); process.exit(0); } catch (error) { console.error('Shutdown error:', error.message); process.exit(1); } });
  setTimeout(() => process.exit(1), 10000).unref();
}
process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));
