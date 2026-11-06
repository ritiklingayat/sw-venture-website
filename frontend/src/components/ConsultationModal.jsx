import React, { useState, useEffect } from 'react';
import { WhatsAppIcon } from './WhatsAppIcon';
import { X, Calendar, Clock, CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';

export function ConsultationModal({ isOpen, onClose, initialService = 'Digital Growth Strategy' }) {
  const [formData, setFormData] = useState({
    fullName: '',
    companyName: '',
    email: '',
    phone: '',
    serviceRequired: initialService,
    preferredDate: '',
    preferredTime: 'Morning (10:00 AM - 1:00 PM)',
    description: '',
  });

  useEffect(() => {
    if (initialService) {
      setFormData((prev) => ({ ...prev, serviceRequired: initialService }));
    }
  }, [initialService, isOpen]);

  const [submitting, setSubmitting] = useState(false);
  const [leadResult, setLeadResult] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

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
        companyName: formData.companyName,
        email: formData.email,
        phone: formData.phone,
        serviceRequired: formData.serviceRequired,
        description: `Consultation Booking: Date: ${formData.preferredDate || 'Flexible'} | Time: ${formData.preferredTime}. Notes: ${formData.description}`,
        sourcePage: window.location.pathname,
        leadType: 'Consultation Booking',
      };

      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Unable to schedule consultation.');

      setLeadResult(data);
    } catch (err) {
      setErrorMsg(err.message || 'Failed to submit. Please try again or WhatsApp us.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
          <X size={20} />
        </button>

        {!leadResult ? (
          <div>
            <div className="modal-header">
              <span className="badge-pill">30-MIN STRATEGY CALL</span>
              <h2>Book a Free Consultation</h2>
              <p>Discuss your digital goals with our senior marketing & development strategists.</p>
            </div>

            {errorMsg && <div className="alert-box error">{errorMsg}</div>}

            <form onSubmit={handleSubmit} className="modal-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="fullName">Full Name *</label>
                  <input
                    id="fullName"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="e.g. Rahul Sharma"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="companyName">Company / Brand *</label>
                  <input
                    id="companyName"
                    name="companyName"
                    required
                    value={formData.companyName}
                    onChange={handleChange}
                    placeholder="e.g. Apex Health"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="phone">Phone / WhatsApp Number *</label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 98765 43210"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Work Email *</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="name@company.com"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="serviceRequired">Primary Service Needed</label>
                  <select
                    id="serviceRequired"
                    name="serviceRequired"
                    value={formData.serviceRequired}
                    onChange={handleChange}
                  >
                    <option value="Email Marketing Software (SaaS)">Email Marketing Software (SaaS)</option>
                    <option value="Digital Growth Strategy">Digital Growth Strategy</option>
                    <option value="Website Development">Website Development</option>
                    <option value="Mobile App Development">Mobile App Development</option>
                    <option value="Meta & Google Ads">Performance Ads (Meta / Google)</option>
                    <option value="Social Media Management">Social Media Management</option>
                    <option value="Product / Video Shoots">Content & Production Shoots</option>
                    <option value="TV Commercials">TV Commercial (TVC)</option>
                    <option value="Brand Identity & Design">Creative Design & Branding</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="preferredTime">Preferred Time</label>
                  <select
                    id="preferredTime"
                    name="preferredTime"
                    value={formData.preferredTime}
                    onChange={handleChange}
                  >
                    <option>Morning (10:00 AM - 1:00 PM)</option>
                    <option>Afternoon (1:00 PM - 4:00 PM)</option>
                    <option>Evening (4:00 PM - 7:00 PM)</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="description">What is your main growth bottleneck or project goal?</label>
                <textarea
                  id="description"
                  name="description"
                  rows={3}
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Tell us a little about your timeline, targets, or current challenges..."
                />
              </div>

              <button type="submit" className="btn-primary w-full" disabled={submitting}>
                {submitting ? 'Confirming Booking...' : 'Confirm Consultation Request'} <ArrowRight size={17} />
              </button>

              <p className="privacy-subtext">
                <ShieldCheck size={14} /> Strict privacy. Your details are never shared with third parties.
              </p>
            </form>
          </div>
        ) : (
          <div className="modal-success">
            <div className="success-icon-wrap">
              <CheckCircle2 size={48} className="text-cyan" />
            </div>
            <h3>Consultation Booked Successfully!</h3>
            <p className="lead-id-badge">
              Reference ID: <strong>{leadResult.leadNumber || 'SWD-CONFIRMED'}</strong>
            </p>
            <p className="success-sub">
              Thank you, <strong>{formData.fullName}</strong>. Our senior growth strategist will reach out to you within 24 business hours to confirm your scheduled slot.
            </p>
            <div className="success-actions">
              <a
                href={`https://wa.me/919112166105?text=Hello%20SW%20Digital%20Hub,%20I%20just%20booked%20a%20consultation%20with%20ID%20${leadResult.leadNumber || 'SWD-CONFIRMED'}.`}
                target="_blank"
                rel="noreferrer"
                className="btn-whatsapp"
              >
                <WhatsAppIcon size={18} /> Connect on WhatsApp Now
              </a>
              <button className="btn-secondary" onClick={onClose}>
                Close Window
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
