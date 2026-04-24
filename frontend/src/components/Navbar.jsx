import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import logoImage from '../assets/saat-saath-logo.png';

const navLinks = [
  { name: 'Grants', href: '/grants' },
  { name: 'Programs', href: '/programs' },
  { name: 'Sculpture Park', href: '/sculpture-park' },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const transparent = isHome && !scrolled;

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${transparent ? 'bg-transparent py-5' : 'bg-white/95 backdrop-blur-sm shadow-sm py-3'}`}>
      <div className="container mx-auto max-w-7xl px-6 flex justify-between items-center">
        <Link to="/" className="z-50 h-16 flex items-center">
          <img
            src={logoImage}
            alt="Saat Saath Arts"
            className={`h-16 w-auto transition-all duration-300 ${transparent ? 'brightness-0 invert' : ''}`}
          />
        </Link>

        <div className="hidden md:flex space-x-10 items-center">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className={`text-sm font-semibold uppercase tracking-[0.15em] hover:opacity-70 transition-opacity ${transparent ? 'text-white' : 'text-black'}`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className={`md:hidden z-50 ${transparent && !isMenuOpen ? 'text-white' : 'text-black'}`}
        >
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-black/95 flex flex-col items-center justify-center space-y-8 text-white">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              onClick={() => setIsMenuOpen(false)}
              className="text-2xl font-light uppercase tracking-wider hover:opacity-70 transition-opacity"
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
