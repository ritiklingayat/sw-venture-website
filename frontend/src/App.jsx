import React, { useState, useEffect } from 'react';
import {
  ArrowDownRight, ArrowRight, ArrowUpRight, Atom, BarChart3,
  CheckCircle2, ChevronDown, Code2, GraduationCap, Globe2, Layers3,
  Mail, Menu, Network, ShieldCheck, ShoppingBag,
  Sparkles, Target, X, Zap
} from 'lucide-react';
import logoIcon from './assets/logo-icon.png';

const businesses = [
  { id: 'multimedia', number: '01', name: 'SW Multimedia', category: 'LEARNING & EDUCATION', description: 'Learning experiences designed to help people build skills, explore new ideas and move forward with confidence.', icon: GraduationCap, url: import.meta.env.VITE_MULTIMEDIA_URL || 'https://sw-portfolio-five.vercel.app/', accent: 'accent-cyan', tags: ['Learning', 'Training', 'Admissions'] },
  { id: 'digital', number: '02', name: 'SW Digital Hub', category: 'DIGITAL GROWTH', description: 'Digital services that help businesses strengthen their presence, reach the right audience and grow online.', icon: BarChart3, url: import.meta.env.VITE_DIGITAL_URL || 'https://sw-digital-hub.vercel.app/', accent: 'accent-azure', tags: ['Digital strategy', 'Growth', 'Web'] },
  { id: 'meritx', number: '03', name: 'SW Meritx', category: 'ONLINE EXAMINATIONS', description: 'A focused destination for online mock examinations, practice sessions and performance insights.', icon: Target, url: import.meta.env.VITE_MERITX_URL || 'https://mertix-blond.vercel.app/', accent: 'accent-royal', tags: ['Mock tests', 'Practice', 'Results'] },
  { id: 'hub', number: '04', name: 'SW Hub', category: 'COMMERCE & SHOPPING', description: 'A streamlined shopping experience built around product discovery, convenient ordering and customer care.', icon: ShoppingBag, url: import.meta.env.VITE_SHOP_URL || 'https://swhub-gilt.vercel.app/', accent: 'accent-ice', tags: ['Discover', 'Shopping', 'Orders'] },
];

const roadmap = [
  { n: '01', title: 'Discover & connect', text: 'Bring the group together with a clear parent website and memorable business destinations.' },
  { n: '02', title: 'Build on what works', text: 'Keep each application’s identity, features, access rules and data boundaries intact.' },
  { n: '03', title: 'Strengthen the foundation', text: 'Prioritise HTTPS, secure configuration, backups, monitoring and tested recovery.' },
  { n: '04', title: 'Optimise with evidence', text: 'Measure usage and costs before selectively consolidating infrastructure.' },
];

function Brand({ onClick }) {
  return (
    <a className="brand" href="#home" onClick={onClick} aria-label="SW Venture home">
      <img src={logoIcon} alt="SW Venture" className="brand-logo-icon" />
      <span className="brand-copy">
        <b>SW VENTURE</b>
        <small>ONE VISION. MULTIPLE POSSIBILITIES.</small>
      </span>
    </a>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const links = [
    ['Businesses', '#businesses'],
    ['Vision', '#vision'],
    ['About', '#about'],
    ['Our approach', '#approach'],
    ['Contact', '#contact']
  ];

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth > 768 && open) {
        setOpen(false);
      }
    }
    function handleKeyDown(e) {
      if (e.key === 'Escape' && open) {
        setOpen(false);
      }
    }

    if (open) {
      document.body.classList.add('nav-open-lock');
    } else {
      document.body.classList.remove('nav-open-lock');
    }

    window.addEventListener('resize', handleResize);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.classList.remove('nav-open-lock');
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [open]);

  return (
    <>
      <header className="header">
        <div className="container nav-wrap">
          <Brand onClick={() => setOpen(false)} />
          <nav
            id="main-nav"
            className={open ? 'nav nav-open' : 'nav'}
            aria-label="Main navigation"
          >
            {links.map(([label, href]) => (
              <a key={href} href={href} onClick={() => setOpen(false)}>
                {label}
              </a>
            ))}
            <a
              className="nav-cta"
              href="#businesses"
              onClick={() => setOpen(false)}
            >
              Explore the group <ArrowUpRight size={15} />
            </a>
          </nav>
          <button
            type="button"
            className="menu-toggle"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-controls="main-nav"
            aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>
      <div
        className={`nav-backdrop ${open ? 'nav-backdrop-open' : ''}`}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />
    </>
  );
}

function Hero() {
  return (
    <section className="hero hero-portfolio" id="home">
      <div id="businesses" className="section-anchor" />
      <div className="hero-grid" />
      <div className="container hero-portfolio-inner">
        <div className="section-heading hero-portfolio-heading">
          <div>
            <div className="hero-eyebrow-badge">
              <img src={logoIcon} alt="" className="hero-eyebrow-logo" />
              <span>OUR BUSINESS PORTFOLIO</span>
            </div>
            <h1>
              Four destinations.<br />
              <span className="logo-gradient-text">One connected group.</span>
            </h1>
          </div>
          <p>
            Explore the business that fits your next step. Each destination has a distinct focus and its own experience.
          </p>
        </div>

        <div className="business-grid">
          {businesses.map((b) => {
            const Icon = b.icon;
            return (
              <article
                className={`business-card ${b.accent}`}
                key={b.id}
                onClick={() => window.open(b.url, '_blank', 'noopener,noreferrer')}
                role="link"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    window.open(b.url, '_blank', 'noopener,noreferrer');
                  }
                }}
              >
                <div className="card-top">
                  <span className="card-number">{b.number} / 04</span>
                  <a
                    href={b.url}
                    target="_blank"
                    rel="noreferrer"
                    className="card-icon"
                    aria-label={`Open ${b.name}`}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Icon size={23} />
                  </a>
                </div>
                <div className="card-category">{b.category}</div>
                <h3>
                  <a
                    href={b.url}
                    target="_blank"
                    rel="noreferrer"
                    className="card-title-link"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {b.name}
                  </a>
                </h3>
                <p>{b.description}</p>
                <div className="tag-row">
                  {b.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
                <a
                  href={b.url}
                  target="_blank"
                  rel="noreferrer"
                  className="card-link"
                  aria-label={`Visit ${b.name}`}
                  onClick={(e) => e.stopPropagation()}
                >
                  <span>Explore business</span>
                  <span className="card-arrow"><ArrowUpRight size={17} /></span>
                </a>
              </article>
            );
          })}
        </div>

        <div className="hero-portfolio-footer">
          <div className="business-footnote">
            <Sparkles size={16} />
            <span>Each business keeps its own identity, application features and data boundaries.</span>
          </div>
          <div className="hero-brand-tag">
            <img src={logoIcon} alt="" className="hero-tag-logo" />
            <span>swventure.in — The group starts here</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function VisionSection() {
  return (
    <section className="hero vision-section" id="vision">
      <div className="hero-grid" />
      <div className="container hero-inner">
        <div className="hero-copy">
          <div className="eyebrow light">
            <span className="eyebrow-dot" /> A CONNECTED GROUP OF BUSINESSES
          </div>
          <h2>
            One vision.<br />Multiple <span>possibilities.</span>
          </h2>
          <p className="hero-lede">
            Different ideas. Distinct experiences. One connected vision for what comes next.
          </p>
          <p className="hero-body">
            SW Venture brings education, digital growth, online examinations and commerce together—making it easier to discover the right destination for every need.
          </p>
          <div className="hero-actions">
            <a className="button button-lime" href="#businesses">
              Explore our businesses <ArrowRight size={17} />
            </a>
            <a className="text-link light-link" href="#about">
              Get to know us <ArrowDownRight size={17} />
            </a>
          </div>
          <div className="hero-note">
            <span className="note-line" /> BUILT TO CONNECT. DESIGNED TO GROW.
          </div>
        </div>
        <div className="hero-art" aria-label="Abstract illustration representing connected businesses">
          <div className="orbit orbit-one" />
          <div className="orbit orbit-two" />
          <div className="orbit orbit-three" />
          <div className="orbit-core">
            <img src={logoIcon} alt="SW Venture" className="orbit-core-logo" />
            <span>SW</span>
            <small>VENTURE</small>
          </div>
          <div className="orbit-node node-learning"><GraduationCap size={22} /><span>Learning</span></div>
          <div className="orbit-node node-digital"><BarChart3 size={22} /><span>Digital</span></div>
          <div className="orbit-node node-meritx"><Target size={22} /><span>Meritx</span></div>
          <div className="orbit-node node-shop"><ShoppingBag size={22} /><span>Commerce</span></div>
          <div className="art-caption">
            <span className="caption-pulse" /> FOUR BUSINESSES. ONE BIGGER PICTURE.
          </div>
        </div>
        <div className="hero-bottom-label">
          <Globe2 size={15} /> swventure.in <span>—</span> The group starts here
        </div>
      </div>
    </section>
  );
}

function Intro() {
  return <section className="intro section" id="about"><div className="container intro-grid"><div><div className="eyebrow"><span className="eyebrow-dot"/> THE SW VENTURE STORY</div><h2>Different strengths.<br/><span>Shared direction.</span></h2></div><div className="intro-content"><p className="intro-lede">We believe good ideas become more powerful when they have room to grow—and a clear place to belong.</p><p>SW Venture is the parent brand connecting four distinct businesses. Each has its own purpose and audience, while sharing a commitment to useful experiences, thoughtful technology and steady progress.</p><a className="text-link" href="#approach">Explore our approach <ArrowRight size={17}/></a></div></div><div className="container values-row"><div className="value-item"><span className="value-icon"><Network size={19}/></span><div><b>Connected by vision</b><small>A clear home for every business.</small></div></div><div className="value-item"><span className="value-icon"><ShieldCheck size={19}/></span><div><b>Independent by design</b><small>Distinct experiences and boundaries.</small></div></div><div className="value-item"><span className="value-icon"><Zap size={19}/></span><div><b>Ready to evolve</b><small>Improve with care and evidence.</small></div></div></div></section>;
}

function Approach() {
  return <section className="approach section" id="approach"><div className="container"><div className="approach-head"><div><div className="eyebrow"><span className="eyebrow-dot"/> HOW WE MOVE FORWARD</div><h2>Grow thoughtfully.<br/><span>Build responsibly.</span></h2></div><div className="approach-copy"><p>Progress is more than putting everything in one place. It means creating a stronger foundation without disrupting what already works.</p><div className="approach-badge"><ShieldCheck size={18}/> <span>Safety before shortcuts</span></div></div></div><div className="roadmap">{roadmap.map((item, i) => <div className="roadmap-item" key={item.n}><div className="roadmap-top"><span>{item.n}</span>{i === 0 ? <Globe2/> : i === 1 ? <Layers3/> : i === 2 ? <ShieldCheck/> : <BarChart3/>}</div><h3>{item.title}</h3><p>{item.text}</p>{i < roadmap.length - 1 && <div className="roadmap-connector"/>}</div>)}</div><div className="principles"><div className="principle-lead"><Code2 size={21}/><span>Our guiding principles</span></div><div><CheckCircle2 size={16}/> Protect existing user journeys</div><div><CheckCircle2 size={16}/> Keep application data separated</div><div><CheckCircle2 size={16}/> Test backups and recovery</div><div><CheckCircle2 size={16}/> Optimise after measuring</div></div></div></section>;
}

function Contact() {
  const [form, setForm] = useState({ name: '', email: '', business: 'General enquiry', message: '' });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [sending, setSending] = useState(false);
  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  async function submit(e) {
    e.preventDefault(); setSending(true); setStatus({ type: '', message: '' });
    try {
      const base = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/$/, '');
      const response = await fetch(`${base}/api/contact`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Unable to send your message right now.');
      setStatus({ type: 'success', message: data.message || 'Thanks! Your message has been received.' });
      setForm({ name: '', email: '', business: 'General enquiry', message: '' });
    } catch (error) {
      setStatus({ type: 'error', message: error.message === 'Failed to fetch' ? 'We could not reach the server. Please make sure the backend is running and try again.' : error.message });
    } finally { setSending(false); }
  }
  return <section className="contact-section section" id="contact"><div className="container contact-grid"><div className="contact-copy"><div className="eyebrow light"><span className="eyebrow-dot"/> START A CONVERSATION</div><h2>Good things<br/>start with <span>hello.</span></h2><p>Have a question about SW Venture or one of our businesses? Send a note and tell us what you have in mind.</p><a className="contact-email" href="mailto:hello@swventure.in"><span><Mail size={18}/></span> hello@swventure.in <ArrowUpRight size={16}/></a><div className="contact-visual"><div className="visual-ring ring-a"/><div className="visual-ring ring-b"/><div className="visual-center"><Atom size={34}/></div><span className="visual-label label-a">Ideas</span><span className="visual-label label-b">People</span><span className="visual-label label-c">Possibility</span></div></div><form className="contact-form" onSubmit={submit}><div className="form-heading"><span>CONTACT FORM</span><small>Fields marked * are required</small></div><label htmlFor="name">Your name *</label><input id="name" name="name" value={form.name} onChange={update} required minLength="2" maxLength="100" placeholder="How should we address you?" autoComplete="name"/><label htmlFor="email">Email address *</label><input id="email" name="email" type="email" value={form.email} onChange={update} required maxLength="254" placeholder="you@example.com" autoComplete="email"/><label htmlFor="business">What is this about?</label><div className="select-wrap"><select id="business" name="business" value={form.business} onChange={update}><option>General enquiry</option><option>SW Multimedia</option><option>SW Digital Hub</option><option>SW Meritx</option><option>SW Hub</option><option>Partnership</option></select><ChevronDown size={16}/></div><label htmlFor="message">Your message *</label><textarea id="message" name="message" value={form.message} onChange={update} required minLength="10" maxLength="3000" rows="4" placeholder="Tell us a little about what you need…"/><button className="button button-lime submit-button" type="submit" disabled={sending}>{sending ? 'Sending message…' : 'Send your message'} <ArrowRight size={17}/></button>{status.message && <div className={`form-status ${status.type}`} role="status">{status.type === 'success' ? <CheckCircle2 size={17}/> : <ShieldCheck size={17}/>}<span>{status.message}</span></div>}<p className="privacy-note"><ShieldCheck size={14}/> Your details are used to respond to this enquiry.</p></form></div></section>;
}

function Footer() {
  return <footer className="footer"><div className="container footer-main"><div><Brand/><p className="footer-tagline">A connected group of businesses,<br/>moving forward with purpose.</p></div><div className="footer-links"><div><b>EXPLORE</b><a href="#businesses">Our businesses</a><a href="#vision">Our vision</a><a href="#about">About us</a><a href="#approach">Our approach</a></div><div><b>BUSINESSES</b>{businesses.map(b => <a key={b.id} href={b.url} target="_blank" rel="noreferrer">{b.name} <ArrowUpRight size={12}/></a>)}</div><div><b>GET IN TOUCH</b><a href="#contact">Contact us</a><a href="mailto:hello@swventure.in">hello@swventure.in</a><span className="domain-label"><Globe2 size={13}/> swventure.in</span></div></div></div><div className="container footer-bottom"><span>© {new Date().getFullYear()} SW Venture. All rights reserved.</span><div><a href="#privacy" onClick={e => { e.preventDefault(); window.alert('Privacy notice: enquiry details are collected only to respond to your message. A full legal privacy policy should be reviewed and published before production launch.'); }}>Privacy</a><a href="#terms" onClick={e => { e.preventDefault(); window.alert('Terms of use: this parent website introduces SW Venture and its associated businesses. Please publish owner-approved legal terms before production launch.'); }}>Terms</a></div><a href="#home" className="back-top">BACK TO TOP ↑</a></div></footer>;
}

export default function App() {
  return <><Header/><main><Hero/><VisionSection/><Intro/><Approach/><Contact/></main><Footer/></>;
}
