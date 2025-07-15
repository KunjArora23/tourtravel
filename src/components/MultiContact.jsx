import React, { useState } from 'react';
import { Phone, MapPin, Facebook, MessageCircle, X } from 'lucide-react';

const contacts = [
  {
    label: 'WhatsApp',
    href: 'https://wa.me/918527921295',
    icon: <MessageCircle className="w-5 h-5 text-primary-600 dark:text-primary-400" />, // WhatsApp icon
  },
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/sandctours/',
    icon: <Facebook className="w-5 h-5 text-primary-600 dark:text-primary-400" />, // Facebook icon
  },
  {
    label: 'Call Now',
    href: 'tel:+918527921295',
    icon: <Phone className="w-5 h-5 text-primary-600 dark:text-primary-400" />, // Phone icon
  },
  {
    label: 'Google Map',
    href: 'https://maps.app.goo.gl/PbXBz3phESrCazSZA',
    icon: <MapPin className="w-5 h-5 text-primary-600 dark:text-primary-400" />, // Map icon
  },
];

const MultiContactButton = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Overlay when open */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm transition-opacity animate-fadeIn"
          onClick={() => setOpen(false)}
        />
      )}
      <div className="fixed bottom-6 left-6 z-50 flex flex-col items-start gap-3">
        {/* Contact options with staggered animation */}
        <div className={`flex flex-col items-start gap-3 ${open ? 'pointer-events-auto' : 'pointer-events-none'}`}
          style={{ position: 'relative' }}
        >
          {contacts.map((c, i) => (
            <a
              key={c.label}
              href={c.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center px-4 py-2 rounded-full shadow-md border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-primary-700 dark:text-primary-400 font-semibold text-sm gap-2 transition-all duration-300 hover:bg-primary-50 dark:hover:bg-gray-800 ${open ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-95'}`}
              style={{
                minWidth: 140,
                transitionDelay: open ? `${i * 70 + 100}ms` : `${(contacts.length - i) * 40}ms`,
                zIndex: 2,
              }}
            >
              {c.icon}
              <span>{c.label}</span>
            </a>
          ))}
        </div>
        {/* Main FAB */}
        <button
          onClick={() => setOpen((v) => !v)}
          className={`flex items-center justify-center px-6 h-14 rounded-full bg-white dark:bg-gray-900 border border-primary-600 dark:border-primary-400 shadow-lg text-primary-700 dark:text-primary-400 text-lg font-bold transition-transform duration-300 focus:outline-none relative overflow-hidden
            ${open ? '' : 'hover:scale-105'}
          `}
          aria-label={open ? 'Close contacts' : 'Open contacts'}
          style={{ minWidth: 140 }}
        >
          {/* Glowing ring when closed */}
          {!open && (
            <span className="absolute inset-0 rounded-full animate-pulse bg-primary-100 dark:bg-primary-900 opacity-30 blur-lg" />
          )}
          <span className="relative z-10">{open ? <X className="w-7 h-7" /> : 'Contact Us'}</span>
        </button>
      </div>
      {/* Animations */}
      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        .animate-fadeIn { animation: fadeIn 0.3s ease; }
      `}</style>
    </>
  );
};

export default MultiContactButton;