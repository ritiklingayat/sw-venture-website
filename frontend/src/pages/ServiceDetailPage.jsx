import React from 'react';
import { useRouter, Link } from '../router';
import { detailedServices } from '../data/servicesData';
import { LeadForm } from '../components/LeadForm';
import {
  CheckCircle2,
  ArrowRight,
  HelpCircle,
  ShieldCheck,
  ChevronRight,
  Sparkles,
} from 'lucide-react';

export function ServiceDetailPage({ onOpenConsultation }) {
  const { path } = useRouter();
  const service = detailedServices[path] || detailedServices['/services/development'];

  return (
    <div className="service-detail-page">
      {/* Breadcrumb Bar */}
      <div className="breadcrumb-strip">
        <div className="container breadcrumb-inner">
          <Link to="/">Home</Link>
          <ChevronRight size={14} />
          <Link to="/services">Services</Link>
          <ChevronRight size={14} />
          <span className="current-crumb">{service.category}</span>
          <ChevronRight size={14} />
          <span className="current-leaf">{service.title}</span>
        </div>
      </div>

      {/* Service Hero */}
      <section className="service-hero-section">
        <div className="container service-hero-inner">
          <div className="service-hero-copy">
            <span className="badge-pill">{service.category.toUpperCase()}</span>
            <h1>{service.title}</h1>
            <p className="service-hero-lead">{service.heroDescription}</p>

            <div className="service-hero-actions">
              <a href="#inquiry" className="btn-primary">
                Get a Custom Proposal <ArrowRight size={17} />
              </a>
              <button className="btn-secondary" onClick={onOpenConsultation}>
                Book Consultation
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Capabilities & What We Deliver */}
      <section className="section bg-white">
        <div className="container">
          <div className="section-head text-center max-w-750">
            <span className="badge-pill">CAPABILITIES</span>
            <h2>What We Deliver Under {service.title}</h2>
            <p>Comprehensive, battle-tested solutions executed by dedicated in-house specialists.</p>
          </div>

          <div className="offerings-grid">
            {service.offerings.map((item, idx) => (
              <div key={idx} className="offering-card">
                <div className="offering-icon">
                  <CheckCircle2 size={20} className="text-cyan" />
                </div>
                <h3>{item}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Structured Process Steps */}
      {service.process && (
        <section className="section bg-dark">
          <div className="container">
            <div className="section-head text-center max-w-750">
              <span className="badge-pill">OUR METHODOLOGY</span>
              <h2>Execution Process</h2>
              <p>How we take your project from initial brief to measurable performance.</p>
            </div>

            <div className="service-process-grid">
              {service.process.map((step, i) => (
                <div key={i} className="service-step-card">
                  <span className="step-num">{step.step}</span>
                  <h3>{step.title}</h3>
                  <p>{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Frequently Asked Questions */}
      {service.faqs && (
        <section className="section bg-white">
          <div className="container max-w-850">
            <div className="section-head text-center">
              <span className="badge-pill">FAQ</span>
              <h2>Frequently Asked Questions</h2>
              <p>Key information regarding timelines, pricing structures, and deliverables.</p>
            </div>

            <div className="faq-stack">
              {service.faqs.map((faq, i) => (
                <div key={i} className="faq-item">
                  <div className="faq-q">
                    <HelpCircle size={18} className="text-blue" />
                    <h4>{faq.q}</h4>
                  </div>
                  <p className="faq-a">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Dedicated Inquiry Form */}
      <section className="section bg-light-grey" id="inquiry">
        <div className="container max-w-850">
          <LeadForm
            defaultService={service.title}
            formTitle={`Inquire About ${service.title}`}
            formSub="Share your requirements and our project director will provide a customized plan, scope, and timeline within 24 hours."
          />
        </div>
      </section>
    </div>
  );
}
