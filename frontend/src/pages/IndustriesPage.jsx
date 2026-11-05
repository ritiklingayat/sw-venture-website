import React from 'react';
import { Link } from '../router';
import { industries } from '../data/industriesData';
import { ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';

export function IndustriesPage({ onOpenConsultation }) {
  return (
    <div className="industries-page">
      <section className="page-hero">
        <div className="container">
          <span className="badge-pill">SPECIALIZED INDUSTRY SOLUTIONS</span>
          <h1>Tailored Digital Playbooks by Industry</h1>
          <p className="page-hero-sub">
            Generic marketing fails. We customize our websites, video production, and advertising funnels around your specific industry regulations, sales cycles, and buyer behavior.
          </p>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container">
          <div className="industries-detailed-stack">
            {industries.map((ind, idx) => (
              <div key={ind.id} className="industry-detailed-card" id={ind.id}>
                <div className="idc-header">
                  <div className="idc-idx">0{idx + 1}</div>
                  <div>
                    <h2>{ind.name}</h2>
                    <p className="idc-tagline">{ind.tagline}</p>
                  </div>
                </div>

                <div className="idc-grid">
                  <div className="idc-col challenges-col">
                    <h4>
                      <AlertCircle size={16} className="text-blue" /> Common Industry Challenges
                    </h4>
                    <ul>
                      {ind.challenges.map((ch, i) => (
                        <li key={i}>{ch}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="idc-col solutions-col">
                    <h4>
                      <CheckCircle2 size={16} className="text-cyan" /> SW Digital Hub Playbook
                    </h4>
                    <ul>
                      {ind.solutions.map((sol, i) => (
                        <li key={i}>{sol}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="idc-col actions-col">
                    <h4>Recommended Services</h4>
                    <div className="idc-pills">
                      {ind.relevantServices.map((svc, i) => (
                        <span key={i} className="svc-pill">{svc}</span>
                      ))}
                    </div>
                    <button className="btn-primary w-full mt-16" onClick={onOpenConsultation}>
                      Inquire for {ind.name}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
