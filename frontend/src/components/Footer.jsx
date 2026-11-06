import React from 'react';
import { Link } from '../router';
import logoIcon from '../assets/logo-icon.png';
import { WhatsAppIcon } from './WhatsAppIcon';
import {
  MapPin,
  Phone,
  Mail,
  Globe,
  ArrowUpRight,
  ShieldCheck,
  Instagram,
  Facebook,
  Linkedin,
  Youtube,
  Lock,
} from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
      {/* Pre-footer Call-To-Action Banner */}
      <div className="pre-footer-banner">
        <div className="container pre-footer-inner">
          <div>
            <span className="badge-pill">READY TO GROW?</span>
            <h2>Let’s Build Measurable Digital Momentum Together.</h2>
            <p>From website architecture to multi-million view ad campaigns, we are your dedicated digital partners.</p>
          </div>
          <div className="pre-footer-actions">
            <Link to="/contact" className="btn-primary">
              Start Your Project <ArrowUpRight size={17} />
            </Link>
            <Link to="/free-digital-audit" className="btn-secondary">
              Request Free Audit
            </Link>
          </div>
        </div>
      </div>

      <div className="container footer-main-content">
        <div className="footer-grid">
          {/* Column 1: Brand Info & Address */}
          <div className="footer-col brand-col">
            <Link to="/" className="footer-brand">
              <img src={logoIcon} alt="SW Digital Hub Logo" className="footer-logo-img" />
              <div>
                <span className="footer-brand-title">SW DIGITAL HUB</span>
                <span className="footer-brand-sub">COMPLETE DIGITAL GROWTH PARTNER</span>
              </div>
            </Link>
            <p className="footer-tagline-text">
              Your Vision. Our Strategy. Your Growth. Combining technology, design, video production, and performance advertising to scale modern businesses.
            </p>

            <div className="footer-contact-details">
              <div className="contact-item">
                <MapPin size={18} className="contact-icon text-cyan" />
                <span>
                  Shop No. S-06, 2nd Floor, Khinvasara August Highstreet, Chh. Sambhajinagar – 431009, Maharashtra, India.
                </span>
              </div>
              <div className="contact-item">
                <Phone size={18} className="contact-icon text-cyan" />
                <div className="phone-stack">
                  <a href="tel:+919112166105">+91 91121 66105</a>
                  <a href="tel:+919011359616">+91 90113 59616</a>
                </div>
              </div>
              <div className="contact-item">
                <Mail size={18} className="contact-icon text-cyan" />
                <a href="mailto:info@swdigitalhub.com">info@swdigitalhub.com</a>
              </div>
              <div className="contact-item">
                <Globe size={18} className="contact-icon text-cyan" />
                <span>www.swdigitalhub.com</span>
              </div>
            </div>

            {/* Social Icons */}
            <div className="footer-socials">
              <a
                href="https://wa.me/919112166105?text=Hello%20SW%20Digital%20Hub,%20I%20would%20like%20to%20connect%20with%20your%20team."
                target="_blank"
                rel="noreferrer"
                aria-label="WhatsApp"
                title="Chat on WhatsApp"
              >
                <WhatsAppIcon size={18} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram">
                <Instagram size={18} />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook">
                <Facebook size={18} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn">
                <Linkedin size={18} />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" aria-label="YouTube">
                <Youtube size={18} />
              </a>
            </div>
          </div>

          {/* Column 2: Core Development & Ads Services */}
          <div className="footer-col">
            <h4>DEVELOPMENT &amp; ADS</h4>
            <ul className="footer-links-list">
              <li>
                <Link to="/services/website-development">Website Development</Link>
              </li>
              <li>
                <Link to="/services/app-development">Android &amp; iOS Apps</Link>
              </li>
              <li>
                <Link to="/services/development">Custom Web Applications</Link>
              </li>
              <li>
                <Link to="/services/meta-ads">Meta Ads (Facebook &amp; Insta)</Link>
              </li>
              <li>
                <Link to="/services/google-ads">Google Search &amp; Display</Link>
              </li>
              <li>
                <Link to="/services/youtube-ads">YouTube Video Advertising</Link>
              </li>
              <li>
                <Link to="/services/performance-marketing">Performance Marketing Hub</Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Media, Content & Strategy */}
          <div className="footer-col">
            <h4>CONTENT &amp; PRODUCTION</h4>
            <ul className="footer-links-list">
              <li>
                <Link to="/services/product-shoots">Product Photography &amp; Shoots</Link>
              </li>
              <li>
                <Link to="/services/reels-ad-shoots">Reels &amp; Ad Video Production</Link>
              </li>
              <li>
                <Link to="/services/podcast-production">Podcast Studio Production</Link>
              </li>
              <li>
                <Link to="/services/tvc-production">TV Commercials (TVC)</Link>
              </li>
              <li>
                <Link to="/services/ai-video-creation">AI Video Creation</Link>
              </li>
              <li>
                <Link to="/services/creative-design-branding">Creative Design &amp; Branding</Link>
              </li>
              <li>
                <Link to="/services/social-media-marketing">Social Media Management</Link>
              </li>
              <li>
                <Link to="/services/lead-generation">B2B/B2C Lead Generation</Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Quick Links & Industries */}
          <div className="footer-col">
            <h4>EXPLORE &amp; INDUSTRIES</h4>
            <ul className="footer-links-list">
              <li>
                <Link to="/about-us">About SW Digital Hub</Link>
              </li>
              <li>
                <Link to="/portfolio">Featured Portfolio</Link>
              </li>
              <li>
                <Link to="/case-studies">Verified Case Studies</Link>
              </li>
              <li>
                <Link to="/industries">Industries We Serve</Link>
              </li>
              <li>
                <Link to="/blog">Blog &amp; Market Insights</Link>
              </li>
              <li>
                <Link to="/free-digital-audit">Free Digital Audit Form</Link>
              </li>
              <li>
                <Link to="/contact">Contact Our Strategists</Link>
              </li>
              <li>
                <Link to="/admin" className="admin-access-link">
                  <Lock size={12} /> Lead Portal (Admin)
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom Legal Bar */}
        <div className="footer-bottom-bar">
          <div className="footer-legal-copy">
            <span>© {currentYear} SW Digital Hub. All Rights Reserved.</span>
            <span className="dot-sep">•</span>
            <span>Positioning: Complete Digital Growth Partner for Your Business.</span>
          </div>
          <div className="footer-legal-links">
            <Link to="/privacy-policy">Privacy Policy</Link>
            <span className="dot-sep">•</span>
            <Link to="/terms-and-conditions">Terms &amp; Conditions</Link>
            <span className="dot-sep">•</span>
            <Link to="/cookie-policy">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
