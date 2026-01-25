import React, { useState } from 'react';
import { Menu, X, ExternalLink } from 'lucide-react';

const Navbar = ({ scrolled }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Grants', href: '#grants' },
    { name: 'Programs', href: '#programs' },
    { name: 'Sculpture Park', href: 'https://www.thesculpturepark.org/', external: true },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md py-4' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <a href="#" className={`text-xl font-bold uppercase tracking-wider z-50 ${scrolled ? 'text-black' : 'text-white'}`}>
          Saat Saath Arts
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex space-x-8 items-center">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              target={link.external ? "_blank" : "_self"}
              rel={link.external ? "noopener noreferrer" : ""}
              className={`text-xs uppercase tracking-widest hover:opacity-70 transition-opacity flex items-center gap-1 ${scrolled ? 'text-black' : 'text-white'}`}
            >
              {link.name}
              {link.external && <ExternalLink size={12} />}
            </a>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button onClick={toggleMenu} className={`md:hidden z-50 ${isMenuOpen ? 'text-black' : (scrolled ? 'text-black' : 'text-white')}`}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav Overlay */}
      <div className={`fixed inset-0 bg-white text-black flex flex-col items-center justify-center space-y-8 transition-transform duration-300 ease-in-out md:hidden ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        {navLinks.map((link) => (
          <a 
            key={link.name} 
            href={link.href} 
            onClick={toggleMenu}
            target={link.external ? "_blank" : "_self"}
            className="text-2xl font-light uppercase tracking-widest"
          >
            {link.name}
          </a>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
