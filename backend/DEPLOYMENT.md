# Deployment and handover notes

## Recommended initial rollout

1. Audit owner-controlled repositories, provider plans, deployments, domain access and current costs.
2. Confirm the final parent-brand spelling and subdomain names with the owner.
3. Deploy the parent landing page without moving the four existing applications.
4. Add the approved custom domains to each current hosting provider using provider-supplied DNS values. Do not guess DNS targets.
5. Validate HTTPS, redirects, forms, authentication callbacks, CORS and existing application journeys.
6. Consider hosting consolidation only after measuring traffic, CPU, memory, database usage, uptime needs and recovery objectives.

## Proposed hostname map (owner approval required)

| Site | Proposed hostname | Purpose |
|---|---|---|
| SW Venture | `https://swventure.in` | Parent landing page |
| SW Multimedia | `https://learn.swventure.in` | Education and training |
| SW Digital Hub | `https://digital.swventure.in` | Digital growth and marketing |
| SW Meritx | `https://meritx.swventure.in` | Online mock examinations |
| SW Hub | `https://shop.swventure.in` | E-commerce storefront |

The Meritx and shop URLs in the source document are existing provider URLs to audit. The proposed custom hostnames do not become live just by adding links to this landing page.

## Operational safety

- Use separate environment settings and database roles per application.
- Never combine databases simply because applications share a parent domain.
- Configure daily backups with off-server retention and test a restore.
- Keep the old deployments and databases available through the agreed rollback window.
- Use a production-grade email provider if enquiries must be delivered to an inbox or CRM.
- Use a process manager/container platform and TLS reverse proxy for self-hosted deployments.
- Monitor API health, request failures, disk, memory, database connections, backup status and spend.
- Keep registrar, hosting, source-control and billing accounts under the business owner's control with MFA.
