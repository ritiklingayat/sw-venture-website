import React, { useState } from 'react';
import { portfolioProjects, portfolioCategories } from '../data/portfolioData';
import { ArrowUpRight, TrendingUp, Filter } from 'lucide-react';

export function PortfolioPage({ onOpenConsultation }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);

  const filtered = activeCategory === 'All'
    ? portfolioProjects
    : portfolioProjects.filter((p) => p.category === activeCategory || p.tags.includes(activeCategory));

  return (
    <div className="portfolio-page">
      <section className="page-hero">
        <div className="container">
          <span className="badge-pill">OUR PORTFOLIO</span>
          <h1>Proven Results &amp; Real Client Work</h1>
          <p className="page-hero-sub">
            Browse our completed websites, mobile applications, advertising campaigns, and studio productions across major industries.
          </p>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container">
          {/* Category Filter Tabs */}
          <div className="portfolio-filter-tabs">
            {portfolioCategories.map((cat) => (
              <button
                key={cat}
                className={`portfolio-tab-btn ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Projects Grid */}
          <div className="portfolio-full-grid">
            {filtered.map((item) => (
              <article key={item.id} className="portfolio-card-detailed">
                <div className="pcd-meta-row">
                  <span className="pcd-cat">{item.category}</span>
                  <span className="pcd-industry">{item.industry}</span>
                </div>
                <h3>{item.title}</h3>
                <p className="pcd-desc">{item.shortDesc}</p>

                <div className="pcd-metric-badge">
                  <TrendingUp size={15} className="text-cyan" />
                  <strong>{item.metrics}</strong>
                </div>

                <div className="pcd-challenge-box">
                  <strong>Challenge:</strong>
                  <p>{item.challenge}</p>
                </div>

                <div className="pcd-solution-box">
                  <strong>Our Execution:</strong>
                  <p>{item.solution}</p>
                </div>

                <div className="pcd-tags-row">
                  {item.tags.map((t, idx) => (
                    <span key={idx} className="pcd-tag">{t}</span>
                  ))}
                </div>

                <div className="pcd-footer">
                  <button className="btn-outline-blue w-full" onClick={() => setSelectedProject(item)}>
                    View Full Case Details <ArrowUpRight size={15} />
                  </button>
                </div>
              </article>
            ))}
          </div>

          <div className="portfolio-cta-banner">
            <div>
              <h3>Have a Specific Project in Mind?</h3>
              <p>Let’s analyze your requirements and show you relevant case references from your industry.</p>
            </div>
            <button className="btn-primary" onClick={onOpenConsultation}>
              Book a Strategy Call
            </button>
          </div>
        </div>
      </section>

      {/* Project Detail Modal */}
      {selectedProject && (
        <div className="modal-overlay" onClick={() => setSelectedProject(null)} role="dialog" aria-modal="true">
          <div className="modal-card modal-lg" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setSelectedProject(null)} aria-label="Close modal">
              ×
            </button>

            <span className="badge-pill">{selectedProject.category} • {selectedProject.industry}</span>
            <h2 className="mt-12">{selectedProject.title}</h2>
            <p className="lead-text mt-8">{selectedProject.shortDesc}</p>

            <div className="modal-project-metrics mt-16">
              <TrendingUp size={18} className="text-cyan" />
              <span>{selectedProject.metrics}</span>
            </div>

            <div className="modal-project-details-grid mt-24">
              <div className="mp-section">
                <h4>Client Requirement &amp; Initial Challenge</h4>
                <p>{selectedProject.challenge}</p>
              </div>

              <div className="mp-section">
                <h4>Strategy &amp; Creative Execution</h4>
                <p>{selectedProject.solution}</p>
              </div>

              <div className="mp-section">
                <h4>Measurable Commercial Results</h4>
                <p>{selectedProject.results}</p>
              </div>
            </div>

            <div className="modal-actions mt-32">
              <button className="btn-primary" onClick={() => {
                setSelectedProject(null);
                onOpenConsultation();
              }}>
                Inquire for Similar Project
              </button>
              <button className="btn-secondary" onClick={() => setSelectedProject(null)}>
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
