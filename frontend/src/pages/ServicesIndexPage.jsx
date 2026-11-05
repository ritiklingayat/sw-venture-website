import React from 'react';
import { Link } from '../router';
import { serviceCategories } from '../data/servicesData';
import { ArrowRight, ArrowUpRight, CheckCircle2, Sparkles } from 'lucide-react';

export function ServicesIndexPage({ onOpenConsultation }) {
  return (
    <div className="services-index-page">
      <section className="page-hero">
        <div className="container">
          <span className="badge-pill">OUR SERVICES DIRECTORY</span>
          <h1>Integrated Digital Growth Services</h1>
          <p className="page-hero-sub">
            From custom software engineering and 4K commercial production to full-funnel performance marketing and strategic growth consulting.
          </p>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container">
          <div className="services-catalog-stack">
            {serviceCategories.map((cat, index) => (
              <div key={cat.id} className="service-catalog-group" id={cat.id}>
                <div className="catalog-group-header">
                  <div className="cgh-left">
                    <span className="catalog-idx">0{index + 1}</span>
                    <div>
                      <h2>{cat.name}</h2>
                      <p>{cat.tagline}</p>
                    </div>
                  </div>
                  <Link to={cat.slug} className="btn-outline-blue">
                    View Category Hub <ArrowRight size={15} />
                  </Link>
                </div>

                <div className="catalog-sub-grid">
                  {cat.subServices.map((sub, i) => (
                    <article key={i} className="catalog-sub-card">
                      <h3>{sub.title}</h3>
                      <p>{sub.desc}</p>
                      <div className="catalog-card-footer">
                        <Link to={sub.slug} className="text-link-blue">
                          Explore Details &amp; Capabilities <ArrowUpRight size={15} />
                        </Link>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="services-banner-cta">
            <div>
              <h3>Need a Custom Solution Across Multiple Services?</h3>
              <p>We build tailored omnichannel packages combining website, creative production, and ad scale.</p>
            </div>
            <button className="btn-primary" onClick={onOpenConsultation}>
              Book a Strategy Call <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
