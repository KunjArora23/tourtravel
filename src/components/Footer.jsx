import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { MapPin, Phone, Mail, Facebook, Twitter, Instagram, Youtube, Lock } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Incredible Tours</h3>
                <p className="text-sm text-gray-400">Discover Amazing India</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Experience the magic of India with our carefully curated tour packages. 
              From the majestic Himalayas to serene backwaters, we bring you the best of Incredible India.
            </p>
            <div className="flex space-x-4">
              <Link to="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary-600 transition-colors duration-200">
                <Facebook className="w-5 h-5" />
              </Link>
              <Link to="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary-600 transition-colors duration-200">
                <Twitter className="w-5 h-5" />
              </Link>
              <Link to="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary-600 transition-colors duration-200">
                <Instagram className="w-5 h-5" />
              </Link>
              <Link to="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary-600 transition-colors duration-200">
                <Youtube className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Quick Links</h4>
            <nav className="flex flex-col space-y-2">
              <NavLink 
                to="/" 
                className={({ isActive }) => 
                  `text-gray-400 hover:text-white transition-colors duration-200 ${isActive ? 'text-white' : ''}`
                }
              >
                Home
              </NavLink>
              <NavLink 
                to="/tours" 
                className={({ isActive }) => 
                  `text-gray-400 hover:text-white transition-colors duration-200 ${isActive ? 'text-white' : ''}`
                }
              >
                Tours
              </NavLink>
              <NavLink 
                to="/about" 
                className={({ isActive }) => 
                  `text-gray-400 hover:text-white transition-colors duration-200 ${isActive ? 'text-white' : ''}`
                }
              >
                About Us
              </NavLink>
              <NavLink 
                to="/contact" 
                className={({ isActive }) => 
                  `text-gray-400 hover:text-white transition-colors duration-200 ${isActive ? 'text-white' : ''}`
                }
              >
                Contact
              </NavLink>
               <Link to="/admin" className="text-gray-400 hover:text-white text-sm transition-colors duration-200 flex items-center">
              <Lock className="w-3 h-3 mr-1" /> Admin
            </Link>
            </nav>
          </div>

          {/* Popular Destinations */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Popular Destinations</h4>
            <div className="flex flex-col space-y-2">
              <Link to="/tours/golden-triangle" className="text-gray-400 hover:text-white transition-colors duration-200">
                Golden Triangle
              </Link>
              <Link to="/tours/kerala-backwaters" className="text-gray-400 hover:text-white transition-colors duration-200">
                Kerala Backwaters
              </Link>
              <Link to="/tours/rajasthan-tours" className="text-gray-400 hover:text-white transition-colors duration-200">
                Rajasthan Tours
              </Link>
              <Link to="/tours/goa-beaches" className="text-gray-400 hover:text-white transition-colors duration-200">
                Goa Beaches
              </Link>
              <Link to="/tours/himalayan-treks" className="text-gray-400 hover:text-white transition-colors duration-200">
                Himalayan Treks
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Contact Info</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-primary-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-gray-400 text-sm">
                    123 Travel Street,<br />
                    New Delhi, India 110001
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-primary-500 flex-shrink-0" />
                <Link to="tel:+919876543210" className="text-gray-400 text-sm hover:text-white">
                  +91 98765 43210
                </Link>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-primary-500 flex-shrink-0" />
                <Link to="mailto:info@incredibletours.com" className="text-gray-400 text-sm hover:text-white">
                  info@incredibletours.com
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2024 Incredible Tours. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/privacy-policy" className="text-gray-400 hover:text-white text-sm transition-colors duration-200">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-gray-400 hover:text-white text-sm transition-colors duration-200">
              Terms of Service
            </Link>
           
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;