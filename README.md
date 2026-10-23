# SW Venture — Parent Website

Responsive parent-brand landing website for SW Venture, based on **SW Venture Complete Developer Documentation v1.0 (21 October 2026)**. Built with React + Vite, CSS, Lucide React, Node.js + Express, and optional PostgreSQL for contact enquiries.

## What's included

- Responsive landing page with Home, About, Businesses, Our Approach, Contact and footer sections.
- Four configurable business links: SW Multimedia, SW Digital Hub, SW Meritx and SW Hub.
- Contact form connected to `POST /api/contact`.
- `GET /api/health` endpoint.
- Server-side validation, Helmet security headers, explicit CORS allowlist, request-size limit, rate limiting, graceful shutdown and safe error messages.
- PostgreSQL storage when `DATABASE_URL` is configured; a local JSON-file fallback for development only.
- `.env.example` files and deployment/migration notes.

## Requirements

- Node.js 20 or newer (tested target: Node 22)
- npm 10 or newer
- PostgreSQL for persistent production contact submissions (recommended)

## Run locally

From this project root:

```bash
npm install
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
npm run dev
```

On Windows PowerShell, use `Copy-Item backend/.env.example backend/.env` and `Copy-Item frontend/.env.example frontend/.env` instead of `cp` if needed.

- Frontend: http://localhost:5173
- API health: http://localhost:8080/api/health

The Vite dev server proxies `/api` to `http://localhost:8080`. The contact form stores data in `backend/data/contact-submissions.json` if `DATABASE_URL` is not configured. Do not use this file-backed mode for multi-instance or production workloads.

## PostgreSQL setup

1. Create a database and a dedicated app role. Do not use a PostgreSQL superuser for the website.
2. Set `DATABASE_URL` in `backend/.env` (never in the frontend environment or frontend bundle).
3. Set `DATABASE_SSL=true` if required by your database provider. Keep certificate verification enabled where supported.
4. Start the backend. It creates the `contact_submissions` table if it does not already exist.
5. Configure automated backups and test restoration before production use.

The parent site's contact table is separate from the existing Meritx and SW Hub databases. This project does not migrate or merge those databases.

## Production build and run

```bash
npm install
npm run build
npm start
```

Build output is `frontend/dist`. Configure the chosen static host to serve this directory, and configure `/api/*` to reach the Node service; alternatively, configure Express or a reverse proxy to serve the static build. For same-origin deployment, leave `VITE_API_BASE_URL` empty and route `/api` to the backend. If the frontend and backend use different origins, set `VITE_API_BASE_URL` to the API origin and set the exact frontend origin in `CORS_ORIGINS`.

Client environment values are baked into the build. Set `VITE_MULTIMEDIA_URL`, `VITE_DIGITAL_URL`, `VITE_MERITX_URL`, and `VITE_SHOP_URL` before building if the owner approves different URLs. The default URLs follow the proposed hostnames in the specification; verify DNS and deployments before launch.

## Important production checklist

- Confirm the final displayed brand spelling (“SW Venture” vs “SW Ventures”) and approve brand assets.
- Verify domain ownership and exact provider DNS records; preserve MX, SPF, DKIM and DMARC records.
- Keep existing application URLs and databases available while subdomains are tested.
- Configure HTTPS, production CORS origins, PostgreSQL credentials and backups.
- Connect a real email/CRM delivery integration if contact enquiries must be emailed. Currently the API stores enquiries; it does not send email.
- Publish owner-approved privacy and terms pages before production launch.
- Run accessibility, cross-device, API, security and backup/restore tests.
- Keep secrets out of source control and the frontend environment.
- Do not assume the proposed under-₹1,000/month hosting target is feasible before auditing actual usage, costs and backup needs.

## API contract

### `GET /api/health`
Returns service status and timestamp.

### `POST /api/contact`
JSON body:

```json
{
  "name": "Example Person",
  "email": "person@example.com",
  "business": "General enquiry",
  "message": "I would like to learn more about SW Venture."
}
```

Accepted `business` values: `General enquiry`, `SW Multimedia`, `SW Digital Hub`, `SW Meritx`, `SW Hub`, `Partnership`. Returns `201` when saved, `400` for validation errors and `429` when the rate limit is exceeded.

## Project layout

```text
sw-venture-website/
├── frontend/
│   ├── public/
│   │   └── favicon.png
│   ├── src/
│   │   ├── assets/
│   │   │   ├── logo-icon.png
│   │   │   ├── logo.png
│   │   │   └── logo-dark.png
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── styles.css
│   ├── index.html
│   ├── vite.config.js
│   ├── package.json
│   ├── .env
│   └── .env.example
├── backend/
│   ├── data/
│   │   └── contact-submissions.json
│   ├── src/
│   │   ├── contact-store.js
│   │   └── server.js
│   ├── DEPLOYMENT.md
│   ├── package.json
│   ├── .env
│   └── .env.example
├── package.json
├── package-lock.json
├── .gitignore
└── README.md
```
