import React from 'react';
import { WhatsAppIcon } from './WhatsAppIcon';

export function FloatingWhatsApp() {
  const phoneNumber = '919112166105';
  const message = encodeURIComponent('Hello SW Digital Hub, I would like to know more about your digital marketing and development services.');
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <aside className="floating-whatsapp-container" aria-label="WhatsApp quick contact">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noreferrer"
        className="floating-whatsapp-btn"
        aria-label="Chat on WhatsApp with SW Digital Hub"
      >
        <span className="whatsapp-pulse" />
        <WhatsAppIcon size={28} />
        <span className="whatsapp-tooltip">Chat with us on WhatsApp</span>
      </a>
    </aside>
  );
}
