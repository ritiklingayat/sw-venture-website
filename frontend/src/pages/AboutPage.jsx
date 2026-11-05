import React from 'react';
import { Link } from '../router';
import {
  CheckCircle2,
  ShieldCheck,
  Target,
  Zap,
  Users,
  Award,
  ArrowRight,
  TrendingUp,
  MapPin,
  Phone,
  Mail,
} from 'lucide-react';

export function AboutPage({ onOpenConsultation }) {
  return (
    <div className="about-page">
      {/* Page Hero */}
      <section className="page-hero">
        <div className="container">
          <span className="badge-pill">WHO WE ARE</span>
          <h1>Your Complete Digital Growth Partner</h1>
          <p className="page-hero-sub">
            We combine software engineering, creative video production, brand strategy, and performance advertising to help ambitious businesses build market-leading digital presence.
          </p>
        </div>
      </section>

      {/* Main Story & Positioning */}
      <section className="section bg-white">
        <div className="container">
          <div className="grid-2-col">
            <div>
              <span className="badge-pill">OUR PHILOSOPHY</span>
              <h2>Strategy Before Execution. Business Growth Above Everything.</h2>
              <p className="lead-text">
                Most agencies focus on siloed deliverables: a web designer builds a site without SEO, an ad freelancer burns money without good landing pages, and a video shooter produces clips without sales intent.
              </p>
              <p>
                At <strong>SW Digital Hub</strong>, we eliminate this friction. We operate as an integrated extension of your business leadership. From technical architecture and data tracking to studio shoots and paid acquisition, every asset we create serves a single objective: <em>generating qualified inquiries and verifiable revenue.</em>
              </p>

              <div className="about-highlights-list">
                <div className="about-hl-item">
                  <CheckCircle2 size={18} className="text-cyan" />
                  <span><strong>Zero Subcontracting:</strong> Complete in-house development, design, and production crew.</span>
                </div>
                <div className="about-hl-item">
                  <CheckCircle2 size={18} className="text-cyan" />
                  <span><strong>Complete Transparency:</strong> Direct ad account access, daily lead webhooks, and weekly reviews.</span>
                </div>
                <div className="about-hl-item">
                  <CheckCircle2 size={18} className="text-cyan" />
                  <span><strong>Full IP Ownership:</strong> You own 100% of your source code, design files, and ad accounts.</span>
                </div>
              </div>
            </div>

            <div className="about-stats-panel">
              <div className="about-stat-box">
                <strong>4</strong>
                <span>Core Operating Pillars (Develop, Market, Create, Grow)</span>
              </div>
              <div className="about-stat-box">
                <strong>18+</strong>
                <span>Specialized In-House Digital Services</span>
              </div>
              <div className="about-stat-box">
                <strong>10+</strong>
                <span>Industry Sectors Served Across India &amp; Globally</span>
              </div>
              <div className="about-stat-box">
                <strong>100%</strong>
                <span>Commitment to Measurable Commercial Outcomes</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Corporate Values */}
      <section className="section bg-dark">
        <div className="container">
          <div className="section-head text-center max-w-750">
            <span className="badge-pill">CORE VALUES</span>
            <h2>Principles That Guide Every Client Engagement</h2>
            <p>How we maintain high standards across technology, advertising, and creative production.</p>
          </div>

          <div className="values-grid">
            <div className="value-card">
              <ShieldCheck size={28} className="text-cyan" />
              <h3>Radical Integrity</h3>
              <p>We will never recommend an ad campaign, software feature, or production shoot unless the numbers demonstrate a clear commercial return for you.</p>
            </div>

            <div className="value-card">
              <Zap size={28} className="text-cyan" />
              <h3>Engineering Precision</h3>
              <p>We write clean, semantic, modern code. Our websites and apps load in under 1 second, rank on Google, and convert mobile visitors effortlessly.</p>
            </div>

            <div className="value-card">
              <Target size={28} className="text-cyan" />
              <h3>Accountability to Revenue</h3>
              <p>Impressions, likes, and traffic mean nothing if the phone doesn’t ring. We judge our campaigns by qualified leads, bookings, and bottom-line revenue.</p>
            </div>

            <div className="value-card">
              <Users size={28} className="text-cyan" />
              <h3>True Partnership</h3>
              <p>We do not operate as a distant vendor. We embed with your team, understand your operational constraints, and celebrate your business milestones.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Corporate Details & Location */}
      <section className="section bg-white">
        <div className="container">
          <div className="corporate-hq-card">
            <div>
              <span className="badge-pill">HEADQUARTERS</span>
              <h2>SW Digital Hub Corporate Office</h2>
              <p>Located in the commercial heart of Chhatrapati Sambhajinagar, Maharashtra, serving enterprise and startup clients nationwide.</p>

              <div className="hq-details-list">
                <div className="hq-detail">
                  <MapPin size={20} className="text-blue" />
                  <span>Shop No. S-06, 2nd Floor, Khinvasara August Highstreet, Chh. Sambhajinagar – 431009, Maharashtra, India.</span>
                </div>
                <div className="hq-detail">
                  <Phone size={20} className="text-blue" />
                  <span>+91 91121 66105 / +91 90113 59616</span>
                </div>
                <div className="hq-detail">
                  <Mail size={20} className="text-blue" />
                  <span>info@swdigitalhub.com</span>
                </div>
              </div>
            </div>

            <div className="hq-cta-box">
              <h3>Have a Project in Mind?</h3>
              <p>Schedule a 30-minute discovery consultation with our partners.</p>
              <button className="btn-primary w-full" onClick={onOpenConsultation}>
                Book a Free Consultation <ArrowRight size={16} />
              </button>
              <Link to="/contact" className="btn-secondary w-full text-center mt-12">
                Visit Contact Page
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
