import React, { useState } from 'react';
import { Link } from '../router';
import { serviceCategories } from '../data/servicesData';
import { portfolioProjects, portfolioCategories } from '../data/portfolioData';
import { industries } from '../data/industriesData';
import { testimonials } from '../data/testimonialsData';
import { LeadForm } from '../components/LeadForm';
import { WhatsAppIcon } from '../components/WhatsAppIcon';
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Sparkles,
  TrendingUp,
  Code2,
  Video,
  Target,
  Palette,
  Share2,
  ShieldCheck,
  Zap,
  Layers,
  MessageCircle,
  Star,
  Users,
  Compass,
  GraduationCap,
  BarChart3,
  ShoppingBag,
  Mail,
} from 'lucide-react';

const ventureDestinations = [
  {
    number: '01 / 04',
    category: 'LEARNING & EDUCATION',
    title: 'SW Multimedia',
    description: 'Learning experiences designed to help people build skills, explore new ideas and move forward with confidence.',
    tags: ['Learning', 'Education', 'Skills'],
    url: 'https://sw-portfolio-five.vercel.app/',
    icon: GraduationCap,
    ctaLabel: 'Explore business',
  },
  {
    number: '02 / 04',
    category: 'SOFTWARE AS A SERVICE (SAAS)',
    title: 'SW Mail SaaS',
    description: 'Enterprise-grade email marketing software (SaaS) built for automated subscriber workflows, high inbox deliverability, and scalable revenue campaigns.',
    tags: ['Email Marketing', 'Automation', 'SaaS Software'],
    url: '#inquiry',
    icon: Mail,
    isSaaS: true,
    ctaLabel: 'Explore software',
  },
  {
    number: '03 / 04',
    category: 'ONLINE EXAMINATIONS',
    title: 'SW Meritx',
    description: 'A focused destination for online mock examinations, practice sessions and performance insights.',
    tags: ['Mock Tests', 'Exams', 'Analytics'],
    url: 'https://mertix-blond.vercel.app/',
    icon: Target,
    ctaLabel: 'Explore business',
  },
  {
    number: '04 / 04',
    category: 'COMMERCE & SHOPPING',
    title: 'SW Hub',
    description: 'A streamlined shopping experience built around product discovery, convenient ordering and customer care.',
    tags: ['Discover', 'Shopping', 'Orders'],
    url: 'https://shop.swdigitalhub.com/',
    icon: ShoppingBag,
    ctaLabel: 'Explore business',
  },
];

export function HomePage({ onOpenConsultation }) {
  const [selectedPortfolioCat, setSelectedPortfolioCat] = useState('All');

  const filteredPortfolio = selectedPortfolioCat === 'All'
    ? portfolioProjects.slice(0, 6)
    : portfolioProjects.filter((p) => p.category === selectedPortfolioCat || p.tags.includes(selectedPortfolioCat)).slice(0, 6);

  return (
    <div className="home-page">
      {/* SECTION 1: HERO SECTION */}
      <section className="hero-section">
        <div className="hero-ambient-glow" />
        <div className="hero-grid-pattern" />

        <div className="container hero-container">
          <div className="hero-copy-column">
            <div className="hero-eyebrow-badge">
              <span className="pulsing-dot" />
              <span>OFFICIAL CORPORATE PLATFORM</span>
            </div>

            <h1 className="hero-headline">
              Your Vision.<br />
              <span className="text-gradient-cyan">Our Strategy.</span><br />
              Your Growth.
            </h1>

            <p className="hero-subhead">
              We help businesses scale through powerful digital marketing, modern websites, mobile applications, broadcast-quality creative content, and result-driven performance advertising.
            </p>

            <div className="hero-cta-group">
              <Link to="/free-digital-audit" className="btn-primary">
                Get a Free Digital Audit <ArrowRight size={17} />
              </Link>
              <Link to="/services" className="btn-secondary">
                Explore Our Services
              </Link>
            </div>
          </div>

          <div className="hero-visual-column">
            <div className="hero-graphic-card">
              <div className="graphic-top-bar">
                <span className="window-dot red" />
                <span className="window-dot yellow" />
                <span className="window-dot green" />
                <span className="graphic-title">growth-pipeline.swdigitalhub.com</span>
              </div>

              <div className="graphic-content">
                <div className="metric-chip">
                  <span className="metric-label">Client Revenue Impact</span>
                  <strong className="metric-value text-cyan">+284%</strong>
                  <span className="metric-note">Across Active Client Accounts</span>
                </div>

                <div className="pillars-grid-mini">
                  <div className="mini-pillar">
                    <Code2 size={20} className="text-cyan" />
                    <strong>DEVELOP</strong>
                    <small>Web &amp; Apps</small>
                  </div>
                  <div className="mini-pillar">
                    <TrendingUp size={20} className="text-cyan" />
                    <strong>MARKET</strong>
                    <small>Meta &amp; Google</small>
                  </div>
                  <div className="mini-pillar">
                    <Video size={20} className="text-cyan" />
                    <strong>CREATE</strong>
                    <small>Reels &amp; TVCs</small>
                  </div>
                  <div className="mini-pillar">
                    <Target size={20} className="text-cyan" />
                    <strong>GROW</strong>
                    <small>Lead Engines</small>
                  </div>
                </div>

                <div className="graphic-status-box">
                  <div className="status-indicator-live">
                    <span className="live-ping" />
                    <span>Real-Time Ingestion Active</span>
                  </div>
                  <p>Inquiries routed directly to dedicated account managers with WhatsApp sync.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="hero-trust-strip">
            <div className="trust-pill">
              <CheckCircle2 size={15} className="text-cyan" />
              <span>Complete In-House Execution</span>
            </div>
            <div className="trust-pill">
              <CheckCircle2 size={15} className="text-cyan" />
              <span>Strategy Before Execution</span>
            </div>
            <div className="trust-pill">
              <CheckCircle2 size={15} className="text-cyan" />
              <span>Verifiable Business Growth</span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: BRAND INTRODUCTION */}
      <section className="section brand-intro-section">
        <div className="container">
          <div className="section-head text-center max-w-750">
            <span className="badge-pill">ONE DESTINATION FOR DIGITAL EXCELLENCE</span>
            <h2>Your Complete Digital Growth Partner</h2>
            <p>
              From engineering your website and developing smartphone applications to managing social media, producing high-impact video content, and managing performance ad campaigns—we deliver integrated digital solutions under one roof.
            </p>
          </div>

          <div className="four-pillars-grid">
            <div className="pillar-card">
              <div className="pillar-icon-wrap">
                <TrendingUp size={24} />
              </div>
              <h3>Digital Marketing</h3>
              <p>Meta Ads, Google Search, YouTube Ads, dynamic retargeting, and full-funnel customer acquisition.</p>
              <Link to="/services/performance-marketing" className="pillar-link">
                Explore Marketing <ArrowRight size={14} />
              </Link>
            </div>

            <div className="pillar-card">
              <div className="pillar-icon-wrap">
                <Code2 size={24} />
              </div>
              <h3>Web &amp; App Development</h3>
              <p>Modern responsive websites, custom e-commerce stores, native Android &amp; iOS apps built for speed.</p>
              <Link to="/services/development" className="pillar-link">
                Explore Development <ArrowRight size={14} />
              </Link>
            </div>

            <div className="pillar-card">
              <div className="pillar-icon-wrap">
                <Video size={24} />
              </div>
              <h3>Creative Production</h3>
              <p>Studio product photography, high-retention social media reels, podcasts, and television commercials.</p>
              <Link to="/services/content-production" className="pillar-link">
                Explore Production <ArrowRight size={14} />
              </Link>
            </div>

            <div className="pillar-card">
              <div className="pillar-icon-wrap">
                <Target size={24} />
              </div>
              <h3>Business Growth Strategy</h3>
              <p>Competitor intelligence, brand positioning, sales funnels, and automated CRM lead qualification.</p>
              <Link to="/services/business-growth-strategy" className="pillar-link">
                Explore Strategy <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: VENTURE ECOSYSTEM - FOUR DESTINATIONS */}
      <section className="section venture-ecosystem-section bg-dark">
        <div className="container">
          <div className="venture-ecosystem-head">
            <div className="veh-left">
              <span className="badge-pill">
                <Sparkles size={12} className="text-cyan" /> OUR BUSINESS PORTFOLIO
              </span>
              <h2 className="veh-title">
                Four destinations.<br />
                <span className="text-gradient-cyan">One connected group.</span>
              </h2>
            </div>
            <div className="veh-right">
              <p className="veh-desc">
                Explore the business that fits your next step. Each destination has a distinct focus and its own experience.
              </p>
            </div>
          </div>

          <div className="venture-destinations-grid">
            {ventureDestinations.map((dest) => {
              const IconComp = dest.icon;
              const isExternal = dest.url && dest.url.startsWith('http');
              const handleCardClick = (e) => {
                if (!isExternal) {
                  e.preventDefault();
                  if (dest.isSaaS && onOpenConsultation) {
                    onOpenConsultation('Email Marketing Software (SaaS)');
                  } else {
                    const el = document.getElementById('inquiry');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }
                }
              };

              return (
                <a
                  key={dest.title}
                  href={dest.url}
                  target={isExternal ? '_blank' : undefined}
                  rel={isExternal ? 'noopener noreferrer' : undefined}
                  onClick={handleCardClick}
                  className="venture-destination-card"
                  aria-label={`Explore ${dest.title} (${dest.category})`}
                >
                  <div className="vdc-top">
                    <span className="vdc-number">{dest.number}</span>
                    <div className="vdc-icon-badge">
                      <IconComp size={20} />
                    </div>
                  </div>

                  <span className="vdc-category">{dest.category}</span>
                  <h3 className="vdc-title">{dest.title}</h3>
                  <p className="vdc-desc">{dest.description}</p>

                  <div className="vdc-tags">
                    {dest.tags.map((tag) => (
                      <span key={tag} className="vdc-tag">{tag}</span>
                    ))}
                  </div>

                  <div className="vdc-bottom">
                    <span className="vdc-cta-label">{dest.ctaLabel || 'Explore business'}</span>
                    <div className="vdc-arrow-btn">
                      <ArrowUpRight size={18} />
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 3: FEATURED SERVICES */}
      <section className="section featured-services-section bg-dark">
        <div className="container">
          <div className="section-head flex-between-head">
            <div>
              <span className="badge-pill">CORE SPECIALIZATIONS</span>
              <h2>High-Impact Featured Services</h2>
              <p>Four primary service engines that drive measurable commercial results for our clients.</p>
            </div>
            <Link to="/services" className="btn-outline-cyan">
              View All 18 Services <ArrowRight size={15} />
            </Link>
          </div>

          <div className="featured-cards-grid">
            {/* Card 1 */}
            <article className="featured-service-card">
              <div className="fsc-badge">01 / 04</div>
              <div className="fsc-icon">
                <Share2 size={28} />
              </div>
              <h3>Social Media Marketing</h3>
              <p>End-to-end community growth, structured monthly content calendars, viral reels, and high-impact carousel design for Instagram, Facebook, and LinkedIn.</p>
              <ul className="fsc-features">
                <li>• Monthly Content Calendar &amp; Scheduling</li>
                <li>• Viral Hook Reel Scripting &amp; Editing</li>
                <li>• Active Community Engagement &amp; DMs</li>
              </ul>
              <div className="fsc-footer">
                <Link to="/services/social-media-marketing" className="btn-card-link">
                  Explore Service <ArrowUpRight size={16} />
                </Link>
              </div>
            </article>

            {/* Card 2 */}
            <article className="featured-service-card highlight-border">
              <div className="fsc-badge">02 / 04</div>
              <div className="fsc-icon">
                <Code2 size={28} />
              </div>
              <h3>Website Development</h3>
              <p>Custom corporate websites, e-commerce stores, and high-converting landing pages built with React &amp; Next.js for sub-second loading speed and top SEO ranks.</p>
              <ul className="fsc-features">
                <li>• 100% Mobile-First Responsive Design</li>
                <li>• Google PageSpeed 90+ Guaranteed</li>
                <li>• Intuitive Non-Technical Content Updates</li>
              </ul>
              <div className="fsc-footer">
                <Link to="/services/website-development" className="btn-card-link">
                  Explore Service <ArrowUpRight size={16} />
                </Link>
              </div>
            </article>

            {/* Card 3 */}
            <article className="featured-service-card">
              <div className="fsc-badge">03 / 04</div>
              <div className="fsc-icon">
                <Layers size={28} />
              </div>
              <h3>Android &amp; iOS App Development</h3>
              <p>Native Kotlin/Swift and cross-platform Flutter smartphone apps with secure backends, push notifications, and intuitive UI/UX journeys.</p>
              <ul className="fsc-features">
                <li>• Native &amp; Cross-Platform (Flutter/RN)</li>
                <li>• Real-Time Cloud Sync &amp; Payment APIs</li>
                <li>• Google Play &amp; Apple App Store Rollout</li>
              </ul>
              <div className="fsc-footer">
                <Link to="/services/app-development" className="btn-card-link">
                  Explore Service <ArrowUpRight size={16} />
                </Link>
              </div>
            </article>

            {/* Card 4 */}
            <article className="featured-service-card">
              <div className="fsc-badge">04 / 04</div>
              <div className="fsc-icon">
                <TrendingUp size={28} />
              </div>
              <h3>Performance Marketing</h3>
              <p>Laser-targeted advertising campaigns across Meta, Google Search, and YouTube designed to deliver qualified sales inquiries and verifiable ROAS.</p>
              <ul className="fsc-features">
                <li>• High-Intent Lead Generation Campaigns</li>
                <li>• Conversions API (CAPI) Tracking</li>
                <li>• Transparent Weekly CPA &amp; ROAS Reports</li>
              </ul>
              <div className="fsc-footer">
                <Link to="/services/performance-marketing" className="btn-card-link">
                  Explore Service <ArrowUpRight size={16} />
                </Link>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* SECTION 4: COMPLETE SERVICE CATEGORIES */}
      <section className="section service-categories-section">
        <div className="container">
          <div className="section-head text-center max-w-750">
            <span className="badge-pill">OUR ENTIRE CAPABILITY SPECTRUM</span>
            <h2>Six Major Service Categories</h2>
            <p>Every digital requirement handled with specialist focus and unified accountability.</p>
          </div>

          <div className="categories-grid-six">
            {serviceCategories.map((cat, idx) => (
              <Link to={cat.slug} key={cat.id} className="category-big-card">
                <div className="cat-card-number">0{idx + 1}</div>
                <h3>{cat.name}</h3>
                <p>{cat.tagline}</p>
                <div className="cat-sub-tags">
                  {cat.subServices.map((s, i) => (
                    <span key={i}>{s.title}</span>
                  ))}
                </div>
                <div className="cat-explore-row">
                  <span>Explore Category</span>
                  <ArrowRight size={16} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5: WHY CHOOSE SW DIGITAL HUB? */}
      <section className="section why-choose-section bg-dark">
        <div className="container">
          <div className="why-grid">
            <div className="why-copy">
              <span className="badge-pill">THE SW DIGITAL HUB ADVANTAGE</span>
              <h2>Why Growing Businesses Choose Us as Their Long-Term Partner</h2>
              <p>
                We reject superficial vanity metrics. We measure our success exclusively by your brand authority, inquiry volume, and verified commercial growth.
              </p>

              <div className="why-pillars-list">
                <div className="why-item">
                  <div className="why-item-icon"><CheckCircle2 size={20} className="text-cyan" /></div>
                  <div>
                    <h4>Complete Digital Solutions Under One Roof</h4>
                    <p>No more coordinating between separate freelance designers, coders, ad agencies, and video crews.</p>
                  </div>
                </div>

                <div className="why-item">
                  <div className="why-item-icon"><CheckCircle2 size={20} className="text-cyan" /></div>
                  <div>
                    <h4>Strategy Before Execution</h4>
                    <p>We analyze your customer unit economics, margins, and competitors before spending a single rupee on ads.</p>
                  </div>
                </div>

                <div className="why-item">
                  <div className="why-item-icon"><CheckCircle2 size={20} className="text-cyan" /></div>
                  <div>
                    <h4>In-House Production Studio</h4>
                    <p>Equipped with 4K cinema cameras, professional studio lighting, audio mixing, and broadcast anchoring talent.</p>
                  </div>
                </div>

                <div className="why-item">
                  <div className="why-item-icon"><CheckCircle2 size={20} className="text-cyan" /></div>
                  <div>
                    <h4>Transparent Communication &amp; Live Tracking</h4>
                    <p>Direct access to your project leads, real-time lead sync, and weekly KPI reviews without agency jargon.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="why-stat-card">
              <div className="stat-card-inner">
                <div className="stat-number">360°</div>
                <h3>Unified Digital Capabilities</h3>
                <p>From initial brand strategy and software engineering to 4K studio shoots and multi-million rupee ad scale.</p>

                <div className="stat-mini-metrics">
                  <div>
                    <strong>90+</strong>
                    <small>PageSpeed Score</small>
                  </div>
                  <div>
                    <strong>&lt; 60s</strong>
                    <small>Lead WhatsApp Sync</small>
                  </div>
                  <div>
                    <strong>100%</strong>
                    <small>IP Ownership</small>
                  </div>
                </div>

                <button className="btn-primary w-full mt-24" onClick={onOpenConsultation}>
                  Schedule Free Strategy Consultation
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: FEATURED PORTFOLIO */}
      <section className="section portfolio-section">
        <div className="container">
          <div className="section-head text-center max-w-750">
            <span className="badge-pill">VERIFIED PROOF OF WORK</span>
            <h2>Featured Projects &amp; Client Success</h2>
            <p>Explore real work delivered for growing brands across web, mobile, advertising, and creative production.</p>
          </div>

          {/* Category Filter Buttons */}
          <div className="portfolio-filter-bar">
            {portfolioCategories.slice(0, 6).map((cat) => (
              <button
                key={cat}
                className={`filter-btn ${selectedPortfolioCat === cat ? 'active' : ''}`}
                onClick={() => setSelectedPortfolioCat(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="portfolio-grid">
            {filteredPortfolio.map((project) => (
              <article key={project.id} className="project-card">
                <div className="project-card-top">
                  <span className="project-category">{project.category}</span>
                  <span className="project-industry">{project.industry}</span>
                </div>
                <h3>{project.title}</h3>
                <p className="project-desc">{project.shortDesc}</p>

                <div className="project-metric-pill">
                  <TrendingUp size={14} className="text-cyan" />
                  <span>{project.metrics}</span>
                </div>

                <div className="project-tags">
                  {project.tags.map((t, idx) => (
                    <span key={idx}>{t}</span>
                  ))}
                </div>

                <div className="project-card-footer">
                  <Link to="/portfolio" className="btn-view-project">
                    View Case Details <ArrowUpRight size={15} />
                  </Link>
                </div>
              </article>
            ))}
          </div>

          <div className="text-center mt-40">
            <Link to="/portfolio" className="btn-secondary">
              View All Portfolio Case Studies <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 7: OUR PROCESS */}
      <section className="section process-section bg-dark">
        <div className="container">
          <div className="section-head text-center max-w-750">
            <span className="badge-pill">HOW WE OPERATE</span>
            <h2>Our 5-Step Digital Growth Framework</h2>
            <p>A systematic methodology that eliminates guesswork and ensures consistent execution.</p>
          </div>

          <div className="process-timeline-grid">
            <div className="process-card">
              <div className="process-number">01</div>
              <h3>Discover</h3>
              <p>We deeply understand your business model, profit margins, ideal customer personas, and competitors.</p>
            </div>

            <div className="process-card">
              <div className="process-number">02</div>
              <h3>Strategize</h3>
              <p>We design the omnichannel growth blueprint—selecting optimal tech stacks, ad channels, and content hooks.</p>
            </div>

            <div className="process-card">
              <div className="process-number">03</div>
              <h3>Create</h3>
              <p>Our engineers build fast platforms while our studio scripts, shoots, and designs world-class creative assets.</p>
            </div>

            <div className="process-card">
              <div className="process-number">04</div>
              <h3>Launch</h3>
              <p>We deploy campaigns, connect server tracking, configure lead alerts, and ensure zero-downtime rollouts.</p>
            </div>

            <div className="process-card">
              <div className="process-number">05</div>
              <h3>Grow</h3>
              <p>We analyze conversion data weekly, prune underperformers, and scale winning channels to maximize ROAS.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 8: INDUSTRIES WE SERVE */}
      <section className="section industries-section">
        <div className="container">
          <div className="section-head flex-between-head">
            <div>
              <span className="badge-pill">SPECIALIZED EXPERTISE</span>
              <h2>Industries We Serve</h2>
              <p>Tailored digital growth playbooks customized to specific sector dynamics and consumer journeys.</p>
            </div>
            <Link to="/industries" className="btn-outline-blue">
              All 10 Industries Directory <ArrowRight size={15} />
            </Link>
          </div>

          <div className="industries-strip-grid">
            {industries.slice(0, 6).map((ind) => (
              <div key={ind.id} className="industry-card">
                <h3>{ind.name}</h3>
                <p>{ind.tagline}</p>
                <div className="ind-solutions">
                  <strong>Recommended Playbook:</strong>
                  <ul>
                    {ind.solutions.slice(0, 2).map((sol, i) => (
                      <li key={i}>• {sol}</li>
                    ))}
                  </ul>
                </div>
                <Link to="/industries" className="ind-link">
                  View Industry Playbook <ArrowRight size={13} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 9: TESTIMONIALS */}
      <section className="section testimonials-section bg-dark">
        <div className="container">
          <div className="section-head text-center max-w-750">
            <span className="badge-pill">CLIENT SATISFACTION</span>
            <h2>What Founders &amp; Business Leaders Say</h2>
            <p>Genuine feedback from businesses that partner with SW Digital Hub.</p>
          </div>

          <div className="testimonials-grid">
            {testimonials.map((t) => (
              <div key={t.id} className="testimonial-card">
                <div className="rating-stars">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} size={16} className="star-filled" />
                  ))}
                </div>
                <p className="testimonial-feedback">"{t.feedback}"</p>
                <div className="testimonial-author">
                  <div className="author-avatar">{t.name.charAt(0)}</div>
                  <div>
                    <strong>{t.name}</strong>
                    <small>{t.designation}, {t.company}</small>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 10 & 11: FINAL CTA & EMBEDDED LEAD CAPTURE */}
      <section className="section final-cta-section" id="inquiry">
        <div className="container">
          <div className="final-cta-grid">
            <div className="final-cta-copy">
              <span className="badge-pill">START YOUR DIGITAL GROWTH</span>
              <h2>Ready to Grow Your Business Digitally?</h2>
              <p>
                Let’s build a stronger brand, reach more qualified customers, and create predictable, measurable business revenue.
              </p>

              <div className="final-contact-points">
                <div className="fcp-item">
                  <WhatsAppIcon size={22} className="text-cyan" />
                  <div>
                    <strong>Instant WhatsApp Support</strong>
                    <a
                      href="https://wa.me/919112166105?text=Hello%20SW%20Digital%20Hub,%20I%20would%20like%20to%20discuss%20my%20business%20growth."
                      target="_blank"
                      rel="noreferrer"
                    >
                      +91 91121 66105 (Click to Chat)
                    </a>
                  </div>
                </div>

                <div className="fcp-item">
                  <Compass size={22} className="text-cyan" />
                  <div>
                    <strong>Corporate Headquarters</strong>
                    <span>Shop No. S-06, 2nd Floor, Khinvasara August Highstreet, Chh. Sambhajinagar – 431009</span>
                  </div>
                </div>
              </div>

              <div className="hero-cta-group mt-32">
                <button className="btn-primary" onClick={onOpenConsultation}>
                  Book a Consultation <ArrowRight size={16} />
                </button>
                <Link to="/free-digital-audit" className="btn-secondary">
                  Request Free Digital Audit
                </Link>
              </div>
            </div>

            <div className="final-form-column">
              <LeadForm
                defaultService="Digital Growth Strategy"
                formTitle="Send Us a Project Inquiry"
                formSub="Share your requirements and our project director will provide a customized plan."
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
