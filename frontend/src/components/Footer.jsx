import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, MapPin, Instagram } from 'lucide-react';
import logoImage from '../assets/saat-saath-logo.png';

const Footer = ({ contact }) => {
  const c = contact || {};
  const tagline = c.footerTagline || '';
  const copyright = c.footerCopyright || 'Saat Saath Arts Foundation. All rights reserved.';
  const address = c.address || '';
  const emailGeneral = c.emailGeneral || '';
  const emailGrants = c.emailGrants || '';
  const emailPrograms = c.emailPrograms || '';
  const instagram = c.instagram || '';
  const instagramUrl = c.instagramUrl || '#';

  return (
    <footer className="bg-black text-white py-16 px-6 md:px-12">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-12">
          <img src={logoImage} alt="Saat Saath Arts" className="h-24 w-auto brightness-0 invert" />
        </div>

        <div className="grid md:grid-cols-12 gap-12">
          <div className="md:col-span-4">
            <p className="text-gray-400 text-sm leading-relaxed">{tagline}</p>
          </div>

          <div className="md:col-span-3">
            <h4 className="text-sm font-medium mb-4 uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/grants" className="text-gray-400 text-sm hover:text-white transition-colors">Grants</Link></li>
              <li><Link to="/programs" className="text-gray-400 text-sm hover:text-white transition-colors">Programs</Link></li>
              <li><Link to="/sculpture-park" className="text-gray-400 text-sm hover:text-white transition-colors">Sculpture Park</Link></li>
            </ul>
          </div>

          <div className="md:col-span-5">
            <h4 className="text-sm font-medium mb-4 uppercase tracking-wider">Contact</h4>
            <div className="space-y-4">
              {address && (
                <div className="flex items-start gap-3">
                  <MapPin size={16} className="text-gray-400 shrink-0 mt-0.5" />
                  <p className="text-gray-400 text-sm leading-relaxed whitespace-pre-line">{address}</p>
                </div>
              )}
              {(emailGeneral || emailGrants || emailPrograms) && (
                <div className="flex items-start gap-3">
                  <Mail size={16} className="text-gray-400 shrink-0 mt-0.5" />
                  <div className="text-gray-400 space-y-2">
                    {emailGeneral && (
                      <div>
                        <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">General Enquiries</p>
                        <a href={`mailto:${emailGeneral}`} className="text-sm hover:text-white transition-colors">{emailGeneral}</a>
                      </div>
                    )}
                    {emailGrants && (
                      <div>
                        <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Grants</p>
                        <a href={`mailto:${emailGrants}`} className="text-sm hover:text-white transition-colors">{emailGrants}</a>
                      </div>
                    )}
                    {emailPrograms && (
                      <div>
                        <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Programs</p>
                        <a href={`mailto:${emailPrograms}`} className="text-sm hover:text-white transition-colors">{emailPrograms}</a>
                      </div>
                    )}
                  </div>
                </div>
              )}
              {instagram && (
                <div className="flex items-center gap-3">
                  <Instagram size={16} className="text-gray-400 shrink-0" />
                  <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className="text-gray-400 text-sm hover:text-white transition-colors">{instagram}</a>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-6 text-center text-gray-500 text-xs">
          © {new Date().getFullYear()} {copyright}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
