import React, { useState, useEffect } from 'react';
import { Link, useRouter } from '../router';
import { serviceCategories } from '../data/servicesData';
import logoIcon from '../assets/logo-icon.png';
import { WhatsAppIcon } from './WhatsAppIcon';
import {
  ChevronDown,
  Menu,
  X,
  PhoneCall,
  ArrowRight,
  Code2,
  TrendingUp,
  Share2,
  Palette,
  Video,
  Target,
  Sparkles,
} from 'lucide-react';

const iconMap = {
  Code2,
  TrendingUp,
  Share2,
  Palette,
  Video,
  Target,
};

export function Header({ onOpenConsultation }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesExpanded, setMobileServicesExpanded] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { path } = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on path change
  useEffect(() => {
    setMenuOpen(false);
    setServicesOpen(false);
  }, [path]);

  return (
    <header className={`site-header ${scrolled ? 'header-scrolled' : ''}`}>
      {/* Top micro-bar for quick phone & address contact */}
      <div className="top-microbar">
        <div className="container top-microbar-inner">
          <div className="microbar-left">
            <span>Official Partner for Digital Growth &amp; Technology</span>
            <span className="dot-sep">•</span>
            <span>Chh. Sambhajinagar, Maharashtra</span>
          </div>
          <div className="microbar-right">
            <a href="tel:+919112166105" className="microbar-link">
              <PhoneCall size={12} /> +91 91121 66105
            </a>
            <span className="dot-sep">•</span>
            <a
              href="https://wa.me/919112166105?text=Hello%20SW%20Digital%20Hub,%20I%20would%20like%20to%20know%20more%20about%20your%20services."
              target="_blank"
              rel="noreferrer"
              className="microbar-whatsapp"
            >
              <WhatsAppIcon size={13} /> WhatsApp Inquiry
            </a>
          </div>
        </div>
      </div>

      <div className="container header-main-wrap">
        {/* Brand Logo */}
        <Link to="/" className="brand-logo" aria-label="SW Digital Hub home">
          <img src={logoIcon} alt="SW Digital Hub Logo" className="brand-logo-img" />
          <div className="brand-text-block">
            <span className="brand-title">SW DIGITAL HUB</span>
            <span className="brand-tagline">YOUR VISION. YOUR GROWTH.</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="desktop-nav" aria-label="Main Navigation">
          <Link to="/" className="nav-item">
            Home
          </Link>
          <Link to="/about-us" className="nav-item">
            About Us
          </Link>

          {/* Mega Menu Dropdown */}
          <div
            className="services-dropdown-container"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <Link to="/services" className={`nav-item services-trigger ${path.startsWith('/services') ? 'active' : ''}`}>
              <span>Services</span>
              <ChevronDown size={14} className={`chevron-icon ${servicesOpen ? 'rotate-180' : ''}`} />
            </Link>

            {servicesOpen && (
              <div className="mega-menu" role="menu">
                <div className="mega-menu-inner">
                  <div className="mega-menu-header">
                    <div>
                      <span className="mega-badge">
                        <Sparkles size={12} /> 6 CORE SERVICE CATEGORIES
                      </span>
                      <h3>Complete Digital Solutions Under One Roof</h3>
                    </div>
                    <Link to="/services" className="text-link-cyan" onClick={() => setServicesOpen(false)}>
                      View All Services Directory <ArrowRight size={14} />
                    </Link>
                  </div>

                  <div className="mega-menu-grid">
                    {serviceCategories.map((cat) => {
                      const IconComponent = iconMap[cat.iconName] || Target;
                      return (
                        <div key={cat.id} className="mega-category-col">
                          <Link
                            to={cat.slug}
                            className="mega-category-title"
                            onClick={() => setServicesOpen(false)}
                          >
                            <span className="mega-icon-box">
                              <IconComponent size={16} />
                            </span>
                            <strong>{cat.name}</strong>
                          </Link>
                          <ul className="mega-sub-list">
                            {cat.subServices.map((sub, idx) => (
                              <li key={idx}>
                                <Link
                                  to={sub.slug}
                                  className="mega-sub-link"
                                  onClick={() => setServicesOpen(false)}
                                >
                                  {sub.title}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      );
                    })}
                  </div>

                  <div className="mega-menu-footer">
                    <span>Need a tailored scope for your enterprise or startup?</span>
                    <button
                      className="btn-outline-cyan btn-sm"
                      onClick={() => {
                        setServicesOpen(false);
                        onOpenConsultation();
                      }}
                    >
                      Book 30-Min Strategy Call
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          <Link to="/portfolio" className="nav-item">
            Portfolio
          </Link>
          <Link to="/case-studies" className="nav-item">
            Case Studies
          </Link>
          <Link to="/industries" className="nav-item">
            Industries
          </Link>
          <Link to="/blog" className="nav-item">
            Blog
          </Link>
          <Link to="/contact" className="nav-item">
            Contact
          </Link>
        </nav>

        {/* Action Buttons */}
        <div className="header-actions">
          <Link to="/free-digital-audit" className="btn-audit-nav">
            Free Audit
          </Link>
          <button className="btn-primary btn-consultation" onClick={onOpenConsultation}>
            <span>Free Consultation</span>
            <ArrowRight size={15} />
          </button>
          <button
            className="mobile-hamburger"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
          >
            {menuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {menuOpen && (
        <div className="mobile-drawer">
          <div className="mobile-drawer-inner">
            <Link to="/" className="mobile-nav-link" onClick={() => setMenuOpen(false)}>
              Home
            </Link>
            <Link to="/about-us" className="mobile-nav-link" onClick={() => setMenuOpen(false)}>
              About Us
            </Link>

            {/* Mobile Services Accordion */}
            <div className="mobile-accordion">
              <button
                className="mobile-accordion-toggle"
                onClick={() => setMobileServicesExpanded(!mobileServicesExpanded)}
              >
                <span>Services ({serviceCategories.length} Categories)</span>
                <ChevronDown size={18} className={mobileServicesExpanded ? 'rotate-180' : ''} />
              </button>
              {mobileServicesExpanded && (
                <div className="mobile-accordion-content">
                  <Link
                    to="/services"
                    className="mobile-sub-link highlight"
                    onClick={() => setMenuOpen(false)}
                  >
                    ★ Explore All Services Hub
                  </Link>
                  {serviceCategories.map((cat) => (
                    <div key={cat.id} className="mobile-category-block">
                      <Link
                        to={cat.slug}
                        className="mobile-category-head"
                        onClick={() => setMenuOpen(false)}
                      >
                        {cat.name}
                      </Link>
                      {cat.subServices.map((sub, i) => (
                        <Link
                          key={i}
                          to={sub.slug}
                          className="mobile-sub-link"
                          onClick={() => setMenuOpen(false)}
                        >
                          {sub.title}
                        </Link>
                      ))}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <Link to="/portfolio" className="mobile-nav-link" onClick={() => setMenuOpen(false)}>
              Portfolio
            </Link>
            <Link to="/case-studies" className="mobile-nav-link" onClick={() => setMenuOpen(false)}>
              Case Studies
            </Link>
            <Link to="/industries" className="mobile-nav-link" onClick={() => setMenuOpen(false)}>
              Industries We Serve
            </Link>
            <Link to="/blog" className="mobile-nav-link" onClick={() => setMenuOpen(false)}>
              Blog &amp; Insights
            </Link>
            <Link to="/contact" className="mobile-nav-link" onClick={() => setMenuOpen(false)}>
              Contact Us
            </Link>
            <Link to="/free-digital-audit" className="mobile-nav-link text-cyan" onClick={() => setMenuOpen(false)}>
              ★ Request Free Digital Audit
            </Link>

            <div className="mobile-drawer-cta">
              <button
                className="btn-primary w-full"
                onClick={() => {
                  setMenuOpen(false);
                  onOpenConsultation();
                }}
              >
                Book a Free Consultation
              </button>
              <a
                href="https://wa.me/919112166105?text=Hello%20SW%20Digital%20Hub,%20I%20would%20like%20to%20know%20more%20about%20your%20services."
                target="_blank"
                rel="noreferrer"
                className="btn-whatsapp w-full"
              >
                <WhatsAppIcon size={18} /> WhatsApp: +91 91121 66105
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
