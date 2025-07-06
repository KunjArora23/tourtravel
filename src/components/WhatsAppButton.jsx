import React from 'react';
import { MessageCircle } from 'lucide-react';

const WhatsAppButton = () => {
  return (
    <a
      href="https://wa.me/918527921295"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 left-6 z-50 bg-green-800 hover:bg-green-600 text-white px-4 py-3 rounded-full shadow-lg flex items-center space-x-2 transition-all duration-300 group"
    >
      <MessageCircle className="w-5 h-5 text-white group-hover:scale-110 transition-transform duration-200" />
      <span className="font-semibold text-sm hidden sm:inline">Chat on WhatsApp</span>
    </a>
  );
};

export default WhatsAppButton;