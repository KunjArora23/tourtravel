import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, MapPin, Phone } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Tours', path: '/tours' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header className={`sticky top-0 z-50 shadow-lg border-b border-rolex-gold/30 transition-all duration-300 ${scrolled ? 'backdrop-blur-xl bg-rolex-green/80' : 'bg-rolex-green'}`}>
      {/* Top Bar */}
      <div className="hidden md:block bg-rolex-darkGreen text-rolex-champagne py-2 animate-fade-in">
        <div className="container mx-auto px-4 flex justify-between items-center text-sm">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <Phone className="w-4 h-4 text-rolex-gold" />
              <Link to="tel:+918527921295" className="hover:underline text-rolex-champagne">+91 8527921295</Link>
              <Link to="tel:+919818808842" className="hover:underline text-rolex-champagne">+91 9818808842</Link>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <MapPin className="w-4 h-4 text-rolex-gold" />
            <span className="tracking-wide font-semibold text-rolex-gold">S & C Tours</span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-12 h-12 bg-rolex-gold rounded-xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
              <MapPin className="w-7 h-7 text-rolex-green drop-shadow-lg" />
            </div>
            <div>
              <h1 className={`text-2xl font-extrabold font-display tracking-tight group-hover:text-rolex-green transition-colors ${scrolled ? 'text-white drop-shadow-lg' : 'text-rolex-gold'}`}>S & C Tours</h1>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `text-base font-semibold font-sans px-2 py-1 rounded-lg transition-all duration-200 hover:text-rolex-gold hover:bg-rolex-gold/10 focus:outline-none focus:ring-2 focus:ring-rolex-gold ${
                    isActive
                      ? 'text-rolex-gold bg-rolex-gold/10 shadow'
                      : 'text-rolex-champagne'
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-full bg-rolex-gold/20 text-rolex-gold hover:bg-rolex-gold/40 shadow transition-colors duration-200"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-rolex-gold/30 pt-4 animate-slide-down bg-rolex-green rounded-xl shadow-lg">
            <nav className="flex flex-col space-y-3">
              {navItems.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={({ isActive }) =>
                    `text-base font-semibold font-sans py-2 px-3 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-rolex-gold ${
                      isActive
                        ? 'text-rolex-gold bg-rolex-gold/10 shadow'
                        : 'text-rolex-champagne hover:bg-rolex-gold/10'
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;