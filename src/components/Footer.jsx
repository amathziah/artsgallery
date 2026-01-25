import React from 'react';
import { Mail, Phone, MapPin, MessageCircle } from 'lucide-react';

const Footer = ({ onOpenModal }) => {
  return (
    <footer className="bg-black text-white py-16 px-6 md:px-12">
      <div className="container mx-auto max-w-6xl">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          <div>
            <h3 className="text-lg font-semibold mb-4 uppercase tracking-wider">Contact</h3>
            <div className="space-y-3 text-gray-400">
              <div className="flex items-start gap-3">
                <Mail size={18} className="mt-1" />
                <a href="mailto:info@saatsaatharts.org" className="hover:text-white transition-colors">
                  info@saatsaatharts.org
                </a>
              </div>
              <div className="flex items-start gap-3">
                <Phone size={18} className="mt-1" />
                <span>+91 11 2338 3550</span>
              </div>
              <div className="flex items-start gap-3">
                <MapPin size={18} className="mt-1" />
                <span>Bikaner House<br />Pandara Road<br />New Delhi 110003</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 uppercase tracking-wider">Quick Links</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#about" className="hover:text-white transition-colors">About</a></li>
              <li><a href="#grants" className="hover:text-white transition-colors">Grants</a></li>
              <li><a href="#programs" className="hover:text-white transition-colors">Programs</a></li>
              <li><a href="https://www.thesculpturepark.org/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Sculpture Park</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 uppercase tracking-wider">AI Assistant</h3>
            <p className="text-gray-400 mb-4">
              Have questions? Chat with our AI assistant to learn more about our programs and initiatives.
            </p>
            <button 
              onClick={onOpenModal}
              className="flex items-center gap-2 px-6 py-3 bg-white text-black hover:bg-gray-200 transition-colors uppercase tracking-widest text-xs font-semibold"
            >
              <MessageCircle size={18} />
              Chat Now
            </button>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Saat Saath Arts Foundation. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
