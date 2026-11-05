import React, { useState } from 'react';
import { Router, useRouter } from './router';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { ConsultationModal } from './components/ConsultationModal';

// Pages
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ServicesIndexPage } from './pages/ServicesIndexPage';
import { ServiceDetailPage } from './pages/ServiceDetailPage';
import { PortfolioPage } from './pages/PortfolioPage';
import { CaseStudiesPage } from './pages/CaseStudiesPage';
import { IndustriesPage } from './pages/IndustriesPage';
import { BlogPage } from './pages/BlogPage';
import { ContactPage } from './pages/ContactPage';
import { DigitalAuditPage } from './pages/DigitalAuditPage';
import { LegalPages } from './pages/LegalPages';
import { AdminPage } from './pages/AdminPage';

function AppContent() {
  const { path } = useRouter();
  const [consultationOpen, setConsultationOpen] = useState(false);
  const [consultationService, setConsultationService] = useState('Digital Growth Strategy');

  const openConsultation = (service = 'Digital Growth Strategy') => {
    setConsultationService(service);
    setConsultationOpen(true);
  };
  const closeConsultation = () => setConsultationOpen(false);

  // Route matching
  const renderCurrentPage = () => {
    // 1. Home
    if (path === '/' || path === '') {
      return <HomePage onOpenConsultation={openConsultation} />;
    }

    // 2. About Us
    if (path === '/about-us') {
      return <AboutPage onOpenConsultation={openConsultation} />;
    }

    // 3. Services Index
    if (path === '/services') {
      return <ServicesIndexPage onOpenConsultation={openConsultation} />;
    }

    // 4. Detailed Service Pages
    if (path.startsWith('/services/')) {
      return <ServiceDetailPage onOpenConsultation={openConsultation} />;
    }

    // 5. Portfolio
    if (path === '/portfolio') {
      return <PortfolioPage onOpenConsultation={openConsultation} />;
    }

    // 6. Case Studies
    if (path === '/case-studies') {
      return <CaseStudiesPage onOpenConsultation={openConsultation} />;
    }

    // 7. Industries
    if (path === '/industries') {
      return <IndustriesPage onOpenConsultation={openConsultation} />;
    }

    // 8. Blog & Insights
    if (path === '/blog' || path.startsWith('/blog/')) {
      return <BlogPage />;
    }

    // 9. Contact
    if (path === '/contact') {
      return <ContactPage />;
    }

    // 10. Free Digital Audit
    if (path === '/free-digital-audit') {
      return <DigitalAuditPage />;
    }

    // 11. Legal Pages
    if (path === '/privacy-policy' || path === '/terms-and-conditions' || path === '/cookie-policy') {
      return <LegalPages />;
    }

    // 12. Admin Portal
    if (path === '/admin') {
      return <AdminPage />;
    }

    // Fallback: 404 or default to Home
    return <HomePage onOpenConsultation={openConsultation} />;
  };

  return (
    <div className="app-root">
      <Header onOpenConsultation={openConsultation} />
      <main id="main-content" className="site-main">
        {renderCurrentPage()}
      </main>
      <Footer />
      <FloatingWhatsApp />
      <ConsultationModal
        isOpen={consultationOpen}
        onClose={closeConsultation}
        initialService={consultationService}
      />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
