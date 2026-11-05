import React from 'react';
import { caseStudies } from '../data/caseStudiesData';
import { CheckCircle2, TrendingUp, ArrowRight } from 'lucide-react';

export function CaseStudiesPage({ onOpenConsultation }) {
  return (
    <div className="case-studies-page">
      <section className="page-hero">
        <div className="container">
          <span className="badge-pill">CASE STUDIES</span>
          <h1>In-Depth Growth Breakdowns &amp; Performance Records</h1>
          <p className="page-hero-sub">
            Real commercial challenges, systematic strategies, and transparent performance indicators achieved for our clients.
          </p>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container">
          <div className="case-studies-stack">
            {caseStudies.map((cs) => (
              <article key={cs.id} className="case-study-feature-card">
                <div className="cs-header-strip">
                  <div>
                    <span className="badge-pill">{cs.industry} • Timeframe: {cs.timeframe}</span>
                    <h2>{cs.title}</h2>
                    <span className="cs-client-name">Client: {cs.client}</span>
                  </div>
                  <div className="cs-highlight-box">
                    <TrendingUp size={20} className="text-cyan" />
                    <strong>{cs.resultsHighlight}</strong>
                  </div>
                </div>

                <div className="cs-body-grid">
                  <div className="cs-left-col">
                    <div className="cs-block">
                      <h4>The Business Challenge</h4>
                      <p>{cs.challenge}</p>
                    </div>

                    <div className="cs-block">
                      <h4>Strategic Objectives</h4>
                      <ul className="cs-check-list">
                        {cs.objectives.map((obj, i) => (
                          <li key={i}>
                            <CheckCircle2 size={16} className="text-cyan" />
                            <span>{obj}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="cs-block">
                      <h4>Strategy &amp; Execution</h4>
                      <ul className="cs-bullet-list">
                        {cs.strategy.map((st, i) => (
                          <li key={i}>• {st}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="cs-right-col">
                    <h4>Key Performance Indicators</h4>
                    <div className="kpi-cards-grid">
                      {cs.kpis.map((kpi, idx) => (
                        <div key={idx} className="kpi-mini-card">
                          <strong className="kpi-val">{kpi.value}</strong>
                          <span className="kpi-lbl">{kpi.label}</span>
                        </div>
                      ))}
                    </div>

                    <div className="cs-quote-card">
                      <p>"{cs.clientFeedback}"</p>
                      <strong>— {cs.clientPerson}</strong>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="case-studies-bottom-cta">
            <div>
              <h3>Want Similar Results for Your Company?</h3>
              <p>Let’s conduct a diagnostic audit of your digital presence and map out a growth blueprint.</p>
            </div>
            <button className="btn-primary" onClick={onOpenConsultation}>
              Book a Consultation <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
