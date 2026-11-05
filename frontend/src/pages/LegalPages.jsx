import React from 'react';
import { useRouter } from '../router';
import { ShieldCheck, FileText, Lock } from 'lucide-react';

export function LegalPages() {
  const { path } = useRouter();

  if (path === '/terms-and-conditions') {
    return (
      <div className="legal-page">
        <section className="page-hero">
          <div className="container">
            <span className="badge-pill">LEGAL AGREEMENT</span>
            <h1>Terms &amp; Conditions</h1>
            <p className="page-hero-sub">Effective Date: October 2026 • SW Digital Hub Official Website</p>
          </div>
        </section>

        <section className="section bg-white">
          <div className="container max-w-850 legal-body">
            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing and using <strong>www.swdigitalhub.com</strong> ("the Website"), you agree to be bound by these Terms and Conditions and all applicable Indian laws and regulations.
            </p>

            <h2>2. Agency Services &amp; Proposals</h2>
            <p>
              The materials and descriptions on this website represent the service capabilities of SW Digital Hub, including website engineering, mobile app development, performance advertising, social media management, creative design, and media production.
            </p>
            <p>
              Formal project timelines, milestones, deliverables, service level agreements (SLAs), and fee structures are governed exclusively by mutual written contracts and signed Statements of Work (SOW).
            </p>

            <h2>3. Intellectual Property Rights</h2>
            <p>
              All trademarks, logos, service marks, graphics, and source code displayed on this website are the property of SW Digital Hub or their respective registered owners. Client deliverables and code handovers are transferred to clients strictly in accordance with signed individual client agreements.
            </p>

            <h2>4. Limitation of Liability</h2>
            <p>
              While SW Digital Hub employs industry-leading practices to optimize digital advertising campaigns, search engine rankings, and application performance, we do not guarantee specific fixed revenue figures, lead counts, or third-party platform algorithm decisions outside our direct control.
            </p>

            <h2>5. Governing Law &amp; Jurisdiction</h2>
            <p>
              These Terms shall be governed by and construed in accordance with the laws of India. Any disputes arising in connection with these terms shall be subject to the exclusive jurisdiction of the courts located in Chhatrapati Sambhajinagar, Maharashtra, India.
            </p>

            <h2>6. Contact Regarding Legal Matters</h2>
            <p>
              For any legal or contractual inquiries, please reach out to:
              <br />
              <strong>SW Digital Hub Legal Desk</strong><br />
              Shop No. S-06, 2nd Floor, Khinvasara August Highstreet, Chh. Sambhajinagar – 431009<br />
              Email: <a href="mailto:info@swdigitalhub.com">info@swdigitalhub.com</a>
            </p>
          </div>
        </section>
      </div>
    );
  }

  if (path === '/cookie-policy') {
    return (
      <div className="legal-page">
        <section className="page-hero">
          <div className="container">
            <span className="badge-pill">TRANSPARENCY</span>
            <h1>Cookie Policy</h1>
            <p className="page-hero-sub">Effective Date: October 2026 • SW Digital Hub</p>
          </div>
        </section>

        <section className="section bg-white">
          <div className="container max-w-850 legal-body">
            <h2>1. What Are Cookies?</h2>
            <p>
              Cookies are small text files placed on your device by your web browser when you visit websites. They help remember your preferences, measure site performance, and improve your browsing experience.
            </p>

            <h2>2. Types of Cookies We Use</h2>
            <ul>
              <li><strong>Essential Cookies:</strong> Necessary for core site navigation, form security, and route handling.</li>
              <li><strong>Analytical Cookies:</strong> Aggregated, anonymized tracking via Google Analytics 4 to understand which service pages provide the most value.</li>
              <li><strong>Marketing &amp; Retargeting Pixels:</strong> Optional third-party cookies (such as Meta Pixel) used to serve relevant follow-up advertisements to previous website visitors.</li>
            </ul>

            <h2>3. Managing Cookie Preferences</h2>
            <p>
              You can control and disable non-essential cookies at any time via your browser settings. Please note that disabling essential cookies may impact certain interactive features such as form submissions.
            </p>
          </div>
        </section>
      </div>
    );
  }

  // Default: Privacy Policy (DPDP-compliant)
  return (
    <div className="legal-page">
      <section className="page-hero">
        <div className="container">
          <span className="badge-pill">PRIVACY &amp; DATA PROTECTION</span>
          <h1>Privacy Policy</h1>
          <p className="page-hero-sub">In Compliance with the Digital Personal Data Protection (DPDP) Act of India</p>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container max-w-850 legal-body">
          <h2>1. Introduction</h2>
          <p>
            SW Digital Hub ("we", "our", or "us") respects your privacy and is committed to protecting your personal data. This policy explains what information we collect when you visit <strong>www.swdigitalhub.com</strong> or submit project inquiries.
          </p>

          <h2>2. Information We Collect</h2>
          <p>We only collect personal information that you voluntarily provide through our contact forms, audit requests, and consultation bookings, including:</p>
          <ul>
            <li>Full Name &amp; Company Name</li>
            <li>Mobile / WhatsApp Phone Number</li>
            <li>Business Email Address</li>
            <li>Website &amp; Social Profile URLs</li>
            <li>Project Specifications &amp; Estimated Budget</li>
          </ul>

          <h2>3. Purpose of Processing</h2>
          <p>We process your data strictly for legitimate commercial purposes:</p>
          <ul>
            <li>To respond to your specific inquiries and provide customized project proposals.</li>
            <li>To deliver requested digital growth audits and schedule consultation meetings.</li>
            <li>To communicate project milestones and provide technical customer support.</li>
          </ul>
          <p>
            <strong>Note:</strong> We will never sell, rent, or trade your personal information to third-party data brokers. Submitting an inquiry does not automatically subscribe you to unsolicited promotional spam.
          </p>

          <h2>4. Data Security &amp; Storage</h2>
          <p>
            We implement strict technical and organizational safeguards, including SSL/TLS encryption in transit, secure database access controls, and role-based access control (RBAC) to ensure your data is shielded from unauthorized access.
          </p>

          <h2>5. Your Rights as a Data Principal</h2>
          <p>
            Under applicable Indian data protection laws, you have the right to request access to, correction of, or deletion of your personal information held by us.
          </p>

          <h2>6. Contacting the Grievance Officer</h2>
          <p>
            For any data protection inquiries or to request data removal, please contact:
            <br />
            <strong>Privacy &amp; Grievance Officer — SW Digital Hub</strong><br />
            Address: Shop No. S-06, 2nd Floor, Khinvasara August Highstreet, Chh. Sambhajinagar – 431009, Maharashtra, India.<br />
            Email: <a href="mailto:info@swdigitalhub.com">info@swdigitalhub.com</a>
          </p>
        </div>
      </section>
    </div>
  );
}
