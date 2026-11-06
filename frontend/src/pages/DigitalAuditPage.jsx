import React, { useState } from 'react';
import { WhatsAppIcon } from '../components/WhatsAppIcon';
import { CheckCircle2, ShieldCheck, ArrowRight, Search, FileText, TrendingUp, AlertCircle } from 'lucide-react';

export function DigitalAuditPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    businessName: '',
    websiteUrl: '',
    instagramUrl: '',
    facebookUrl: '',
    linkedinUrl: '',
    phone: '',
    email: '',
    mainChallenge: 'Low return on ad spend and rising CAC',
    servicesInterested: 'Meta & Google Ads + Website Speed',
  });

  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMsg('');

    try {
      const payload = {
        fullName: formData.fullName,
        companyName: formData.businessName,
        email: formData.email,
        phone: formData.phone,
        serviceRequired: `Digital Audit: ${formData.servicesInterested}`,
        description: `AUDIT REQUEST: Website: ${formData.websiteUrl || 'None'} | Instagram: ${formData.instagramUrl || 'None'} | Facebook: ${formData.facebookUrl || 'None'} | LinkedIn: ${formData.linkedinUrl || 'None'}. Main Challenge: ${formData.mainChallenge}`,
        sourcePage: '/free-digital-audit',
        leadType: 'Free Digital Audit',
      };

      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to submit audit request.');

      setResult(data);
    } catch (err) {
      setErrorMsg(err.message || 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="audit-page">
      <section className="page-hero">
        <div className="container">
          <span className="badge-pill">COMPLIMENTARY AUDIT • NO OBLIGATION</span>
          <h1>Request a Free 360° Digital Growth Audit</h1>
          <p className="page-hero-sub">
            Our senior strategists will manually evaluate your website speed, technical SEO, social media presence, and competitor ad strategies.
          </p>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container">
          <div className="audit-layout-grid">
            <div className="audit-info-col">
              <span className="badge-pill">WHAT YOU RECEIVE</span>
              <h2>A Detailed, Manual 5-Pillar Diagnostic Report</h2>
              <p>
                We do not send generic automated software outputs. Our practitioners manually review your brand assets and prepare a bespoke analysis within 48 business hours.
              </p>

              <div className="audit-deliverables-list">
                <div className="adl-item">
                  <div className="adl-icon"><Search size={20} className="text-cyan" /></div>
                  <div>
                    <h4>1. Technical Website &amp; Speed Analysis</h4>
                    <p>Mobile loading speed, Core Web Vitals, Google PageSpeed score, and conversion leaks.</p>
                  </div>
                </div>

                <div className="adl-item">
                  <div className="adl-icon"><TrendingUp size={20} className="text-cyan" /></div>
                  <div>
                    <h4>2. Competitor Ad Intelligence</h4>
                    <p>Insight into what ads your direct competitors are running and where market gaps exist.</p>
                  </div>
                </div>

                <div className="adl-item">
                  <div className="adl-icon"><FileText size={20} className="text-cyan" /></div>
                  <div>
                    <h4>3. Social Media &amp; Content Review</h4>
                    <p>Evaluating profile bios, engagement rates, visual aesthetics, and reel video hooks.</p>
                  </div>
                </div>

                <div className="adl-item">
                  <div className="adl-icon"><CheckCircle2 size={20} className="text-cyan" /></div>
                  <div>
                    <h4>4. 90-Day Action Roadmap</h4>
                    <p>Specific, prioritized recommendations to increase inquiries and decrease customer acquisition cost.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="audit-form-col">
              {!result ? (
                <div className="lead-form-card">
                  <div className="lead-form-header">
                    <span className="badge-pill">FREE AUDIT FORM</span>
                    <h3>Submit Your Digital Assets</h3>
                    <p>Provide your links below so our team can begin your diagnostic review.</p>
                  </div>

                  {errorMsg && (
                    <div className="alert-box error">
                      <AlertCircle size={16} /> {errorMsg}
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="audit-form-inner">
                    <div className="form-grid-2">
                      <div className="form-group">
                        <label htmlFor="aud-name">Your Full Name *</label>
                        <input
                          id="aud-name"
                          name="fullName"
                          required
                          value={formData.fullName}
                          onChange={handleChange}
                          placeholder="e.g. Ramesh Shah"
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="aud-bname">Business / Brand Name *</label>
                        <input
                          id="aud-bname"
                          name="businessName"
                          required
                          value={formData.businessName}
                          onChange={handleChange}
                          placeholder="e.g. Shah Steels & Alloys"
                        />
                      </div>
                    </div>

                    <div className="form-grid-2">
                      <div className="form-group">
                        <label htmlFor="aud-phone">Mobile / WhatsApp Number *</label>
                        <input
                          id="aud-phone"
                          name="phone"
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="+91 98765 43210"
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="aud-email">Work Email *</label>
                        <input
                          id="aud-email"
                          name="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="ramesh@company.com"
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="aud-web">Website URL (if existing)</label>
                      <input
                        id="aud-web"
                        name="websiteUrl"
                        type="url"
                        value={formData.websiteUrl}
                        onChange={handleChange}
                        placeholder="https://yourcompany.com"
                      />
                    </div>

                    <div className="form-grid-3">
                      <div className="form-group">
                        <label htmlFor="aud-ig">Instagram Handle / URL</label>
                        <input
                          id="aud-ig"
                          name="instagramUrl"
                          value={formData.instagramUrl}
                          onChange={handleChange}
                          placeholder="@yourbrand"
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="aud-fb">Facebook Page URL</label>
                        <input
                          id="aud-fb"
                          name="facebookUrl"
                          value={formData.facebookUrl}
                          onChange={handleChange}
                          placeholder="facebook.com/brand"
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="aud-li">LinkedIn Profile / Page</label>
                        <input
                          id="aud-li"
                          name="linkedinUrl"
                          value={formData.linkedinUrl}
                          onChange={handleChange}
                          placeholder="linkedin.com/company/brand"
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="aud-chal">What is your #1 business growth challenge right now?</label>
                      <textarea
                        id="aud-chal"
                        name="mainChallenge"
                        rows={3}
                        required
                        value={formData.mainChallenge}
                        onChange={handleChange}
                        placeholder="e.g. Inquiries are too expensive, website bounce rate is high, competitors are winning on search..."
                      />
                    </div>

                    <button type="submit" className="btn-primary w-full submit-btn-lg" disabled={submitting}>
                      {submitting ? 'Submitting Audit Request...' : 'Request My Free Digital Audit'} <ArrowRight size={17} />
                    </button>

                    <p className="privacy-subtext">
                      <ShieldCheck size={14} /> 100% Confidential. We never spam or sell client information.
                    </p>
                  </form>
                </div>
              ) : (
                <div className="lead-form-card lead-success-box">
                  <div className="success-icon-wrap">
                    <CheckCircle2 size={52} className="text-cyan" />
                  </div>
                  <h3>Audit Request Confirmed!</h3>
                  <p className="lead-id-badge">
                    Audit Tracking ID: <strong>{result.leadNumber || 'SWD-AUDIT-ACTIVE'}</strong>
                  </p>
                  <p className="success-body">
                    Thank you, <strong>{formData.fullName}</strong>. Our senior audit team will begin evaluating your digital properties for <strong>{formData.businessName}</strong>. You will receive your personalized report within 48 business hours.
                  </p>
                  <div className="lead-success-actions">
                    <a
                      href={`https://wa.me/919112166105?text=Hello%20SW%20Digital%20Hub,%20I%20just%20submitted%20Audit%20Request%20ID%20${result.leadNumber || 'SWD-AUDIT'}.`}
                      target="_blank"
                      rel="noreferrer"
                      className="btn-whatsapp"
                    >
                      <WhatsAppIcon size={18} /> Connect on WhatsApp
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
