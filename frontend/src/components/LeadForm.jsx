import React, { useState } from 'react';
import { CheckCircle2, ShieldCheck, ArrowRight, MessageCircle, AlertCircle } from 'lucide-react';

export function LeadForm({ defaultService = 'Website Development', formTitle = 'Request a Project Proposal', formSub = 'Fill in your requirements to receive a customized scope, timeline, and quote.' }) {
  const [formData, setFormData] = useState({
    fullName: '',
    companyName: '',
    email: '',
    phone: '',
    country: 'India',
    serviceRequired: defaultService,
    budget: '₹50,000 - ₹1,00,000',
    description: '',
    preferredContact: 'WhatsApp',
    consent: true,
  });

  const [submitting, setSubmitting] = useState(false);
  const [leadResult, setLeadResult] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.consent) {
      setErrorMsg('Please accept the privacy consent to submit your inquiry.');
      return;
    }
    setSubmitting(true);
    setErrorMsg('');

    try {
      const payload = {
        ...formData,
        sourcePage: window.location.pathname,
        leadType: 'Project Proposal',
      };

      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Unable to submit your inquiry.');

      setLeadResult(data);
    } catch (err) {
      setErrorMsg(err.message || 'Something went wrong. Please reach us directly on WhatsApp.');
    } finally {
      setSubmitting(false);
    }
  };

  if (leadResult) {
    return (
      <div className="lead-form-card lead-success-box">
        <div className="success-icon-wrap">
          <CheckCircle2 size={52} className="text-cyan" />
        </div>
        <h3>Inquiry Received Successfully!</h3>
        <p className="lead-id-badge">
          Lead Reference ID: <strong>{leadResult.leadNumber || 'SWD-PROPOSAL'}</strong>
        </p>
        <p className="success-body">
          Thank you, <strong>{formData.fullName}</strong>. A dedicated project director from SW Digital Hub has received your project details for <strong>{formData.serviceRequired}</strong> and will connect with you via {formData.preferredContact}.
        </p>

        <div className="lead-success-actions">
          <a
            href={`https://wa.me/919112166105?text=Hello%20SW%20Digital%20Hub,%20I%20just%20submitted%20project%20inquiry%20ID%20${leadResult.leadNumber || 'SWD-PROPOSAL'}.`}
            target="_blank"
            rel="noreferrer"
            className="btn-whatsapp"
          >
            <MessageCircle size={18} /> Speed Up Review on WhatsApp
          </a>
          <button
            className="btn-secondary"
            onClick={() => {
              setLeadResult(null);
              setFormData({
                fullName: '',
                companyName: '',
                email: '',
                phone: '',
                country: 'India',
                serviceRequired: defaultService,
                budget: '₹50,000 - ₹1,00,000',
                description: '',
                preferredContact: 'WhatsApp',
                consent: true,
              });
            }}
          >
            Submit Another Request
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="lead-form-card">
      <div className="lead-form-header">
        <span className="badge-pill">GET IN TOUCH</span>
        <h3>{formTitle}</h3>
        <p>{formSub}</p>
      </div>

      {errorMsg && (
        <div className="alert-box error">
          <AlertCircle size={18} /> {errorMsg}
        </div>
      )}

      <form onSubmit={handleSubmit} className="standard-lead-form">
        <div className="form-grid-2">
          <div className="form-group">
            <label htmlFor="lf-name">Full Name *</label>
            <input
              id="lf-name"
              name="fullName"
              required
              minLength={2}
              maxLength={100}
              value={formData.fullName}
              onChange={handleChange}
              placeholder="e.g. Vikram Singhania"
            />
          </div>

          <div className="form-group">
            <label htmlFor="lf-company">Company / Organization *</label>
            <input
              id="lf-company"
              name="companyName"
              required
              minLength={2}
              maxLength={100}
              value={formData.companyName}
              onChange={handleChange}
              placeholder="e.g. Singhania Industries"
            />
          </div>
        </div>

        <div className="form-grid-2">
          <div className="form-group">
            <label htmlFor="lf-email">Business Email *</label>
            <input
              id="lf-email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="vikram@singhania.com"
            />
          </div>

          <div className="form-group">
            <label htmlFor="lf-phone">Mobile / WhatsApp Number *</label>
            <input
              id="lf-phone"
              name="phone"
              type="tel"
              required
              value={formData.phone}
              onChange={handleChange}
              placeholder="+91 98765 43210"
            />
          </div>
        </div>

        <div className="form-grid-3">
          <div className="form-group">
            <label htmlFor="lf-country">Country</label>
            <select id="lf-country" name="country" value={formData.country} onChange={handleChange}>
              <option value="India">India</option>
              <option value="UAE">UAE / Middle East</option>
              <option value="USA">USA / North America</option>
              <option value="UK">UK &amp; Europe</option>
              <option value="Singapore">Singapore / Asia</option>
              <option value="Other">Other International</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="lf-service">Service Required *</label>
            <select id="lf-service" name="serviceRequired" value={formData.serviceRequired} onChange={handleChange}>
              <option value="Email Marketing Software (SaaS)">Email Marketing Software (SaaS)</option>
              <option value="Website Development">Website Development</option>
              <option value="Android App Development">Android App Development</option>
              <option value="iOS App Development">iOS App Development</option>
              <option value="Meta Ads (Facebook & Instagram)">Meta Ads (Facebook &amp; Insta)</option>
              <option value="Google & YouTube Ads">Google &amp; YouTube Ads</option>
              <option value="Social Media Management">Social Media Management</option>
              <option value="Product Photography & Shoots">Product Photography &amp; Shoots</option>
              <option value="Reels & Video Production">Reels &amp; Video Production</option>
              <option value="Podcast Production">Podcast Studio Production</option>
              <option value="TV Commercials (TVC)">TV Commercials (TVC)</option>
              <option value="AI Video Creation">AI Video Creation</option>
              <option value="Brand Identity & Design">Creative Design &amp; Branding</option>
              <option value="Digital Growth Strategy">Digital Growth Strategy</option>
              <option value="Lead Generation Funnel">Lead Generation Funnel</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="lf-budget">Estimated Budget</label>
            <select id="lf-budget" name="budget" value={formData.budget} onChange={handleChange}>
              <option value="₹25,000 - ₹50,000">₹25,000 - ₹50,000</option>
              <option value="₹50,000 - ₹1,00,000">₹50,000 - ₹1,00,000</option>
              <option value="₹1,00,000 - ₹3,00,000">₹1,00,000 - ₹3,00,000</option>
              <option value="₹3,00,000 - ₹10,00,000+">₹3,00,000 - ₹10,00,000+</option>
              <option value="Enterprise / Custom">Enterprise / Custom Scope</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="lf-desc">Project Overview &amp; Requirements *</label>
          <textarea
            id="lf-desc"
            name="description"
            rows={4}
            required
            minLength={10}
            maxLength={3000}
            value={formData.description}
            onChange={handleChange}
            placeholder="Tell us about your brand, current challenges, objectives, and any reference websites or ideas..."
          />
        </div>

        <div className="form-grid-2">
          <div className="form-group">
            <label htmlFor="lf-pref">Preferred Contact Method</label>
            <select id="lf-pref" name="preferredContact" value={formData.preferredContact} onChange={handleChange}>
              <option value="WhatsApp">WhatsApp Message</option>
              <option value="Phone Call">Direct Phone Call</option>
              <option value="Email">Detailed Email</option>
              <option value="Virtual Meet">Google Meet / Zoom</option>
            </select>
          </div>

          <div className="form-group consent-check-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="consent"
                checked={formData.consent}
                onChange={handleChange}
                required
              />
              <span>I consent to SW Digital Hub contacting me regarding this business inquiry.</span>
            </label>
          </div>
        </div>

        <button type="submit" className="btn-primary w-full submit-btn-lg" disabled={submitting}>
          {submitting ? 'Submitting Inquiry...' : 'Submit Inquiry & Request Proposal'} <ArrowRight size={18} />
        </button>

        <div className="form-trust-badges">
          <span><ShieldCheck size={14} /> 100% Confidential</span>
          <span>•</span>
          <span>Fast 24-Hr Turnaround</span>
          <span>•</span>
          <span>No Obligation Proposal</span>
        </div>
      </form>
    </div>
  );
}
