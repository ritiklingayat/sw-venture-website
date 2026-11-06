import React from 'react';
import { LeadForm } from '../components/LeadForm';
import { WhatsAppIcon } from '../components/WhatsAppIcon';
import { MapPin, Phone, Mail, Globe, Clock, ShieldCheck } from 'lucide-react';

export function ContactPage() {
  return (
    <div className="contact-page">
      <section className="page-hero">
        <div className="container">
          <span className="badge-pill">GET IN TOUCH</span>
          <h1>Let’s Talk About Your Business Growth</h1>
          <p className="page-hero-sub">
            Visit our corporate studio, connect over phone or WhatsApp, or submit your project brief for an immediate consultation.
          </p>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container">
          <div className="contact-layout-grid">
            {/* Left: Contact Info & Headquarters */}
            <div className="contact-info-panel">
              <span className="badge-pill">OFFICIAL DETAILS</span>
              <h2>SW Digital Hub Headquarters</h2>
              <p>
                Our commercial studio and development center is open for client meetings and strategy workshops.
              </p>

              <div className="contact-card-list">
                <div className="contact-detail-card">
                  <div className="cdc-icon"><MapPin size={22} className="text-cyan" /></div>
                  <div>
                    <strong>Corporate Studio Address:</strong>
                    <p>
                      Shop No. S-06, 2nd Floor, Khinvasara August Highstreet, Chh. Sambhajinagar – 431009, Maharashtra, India.
                    </p>
                  </div>
                </div>

                <div className="contact-detail-card">
                  <div className="cdc-icon"><Phone size={22} className="text-cyan" /></div>
                  <div>
                    <strong>Direct Business Lines:</strong>
                    <p>
                      <a href="tel:+919112166105">+91 91121 66105</a><br />
                      <a href="tel:+919011359616">+91 90113 59616</a>
                    </p>
                  </div>
                </div>

                <div className="contact-detail-card">
                  <div className="cdc-icon"><WhatsAppIcon size={22} className="text-cyan" /></div>
                  <div>
                    <strong>WhatsApp Support:</strong>
                    <p>
                      <a
                        href="https://wa.me/919112166105?text=Hello%20SW%20Digital%20Hub,%20I%20would%20like%20to%20connect%20with%20your%20team."
                        target="_blank"
                        rel="noreferrer"
                        className="text-cyan font-bold"
                      >
                        +91 91121 66105 (Click to Message)
                      </a>
                    </p>
                  </div>
                </div>

                <div className="contact-detail-card">
                  <div className="cdc-icon"><Mail size={22} className="text-cyan" /></div>
                  <div>
                    <strong>Official Business Mailbox:</strong>
                    <p><a href="mailto:info@swdigitalhub.com">info@swdigitalhub.com</a></p>
                  </div>
                </div>

                <div className="contact-detail-card">
                  <div className="cdc-icon"><Clock size={22} className="text-cyan" /></div>
                  <div>
                    <strong>Studio &amp; Office Hours:</strong>
                    <p>Monday – Saturday: 9:30 AM to 7:30 PM (IST)<br />Sunday: By Scheduled Appointment</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Comprehensive Form */}
            <div className="contact-form-panel">
              <LeadForm
                defaultService="Digital Growth Strategy"
                formTitle="Direct Project Inquiry"
                formSub="Fill out the form below. Our project director will review your requirements and respond within 24 hours."
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
