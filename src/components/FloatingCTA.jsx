import React from 'react';
import { Phone } from 'lucide-react';

const FloatingCTA = () => {
  return (
    <a
      href="tel:+918527921295"
      className="fixed bottom-6 right-6 bg-green-800 hover:bg-green-700 text-white px-5 py-3 rounded-full shadow-lg z-50 flex items-center space-x-2"
    >
      <Phone className="w-4 h-4" />
      <span>Call Now</span>
    </a>
  );
};

export default FloatingCTA;