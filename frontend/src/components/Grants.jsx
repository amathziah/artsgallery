import React from 'react';
import { Award } from 'lucide-react';

const BACKEND = 'http://localhost:5001';
const resolveImg = (url) => {
  if (!url) return null;
  return url.startsWith('/') ? `${BACKEND}${url}` : url;
};

const Grants = ({ data, sectionLabel, sectionHeading, sectionCta, bgImage }) => {
  const cards = data?.cards || [];
  const label = sectionLabel || 'Grants & Support';
  const heading = sectionHeading || 'Empowering the Arts Ecosystem';
  const cta = sectionCta || 'Apply for a Grant';

  const bgStyle = bgImage
    ? { backgroundImage: `url(${resolveImg(bgImage)})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed' }
    : { backgroundColor: '#f9fafb' };

  return (
    <section id="grants" className="py-20 px-6 md:px-12 relative" style={bgStyle}>
      {bgImage && <div className="absolute inset-0 bg-white/85" />}
      <div className="container mx-auto max-w-6xl relative z-10">
        <span className="text-xs font-semibold tracking-[0.25em] text-gray-500 uppercase mb-4 block">{label}</span>
        <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-16">{heading}</h2>

        <div className="grid md:grid-cols-3 gap-8">
          {cards.map((card, i) => (
            <div key={i} className="bg-white p-8 hover:shadow-lg transition-shadow flex flex-col">
              {resolveImg(card.imageUrl) && (
                <img src={resolveImg(card.imageUrl)} alt={card.title} className="w-full h-48 object-cover mb-6" />
              )}
              <div className="mb-6"><Award className="w-10 h-10 text-gray-700" /></div>
              <h3 className="text-xl font-semibold mb-4">{card.title}</h3>
              <p className="text-gray-600 leading-relaxed">{card.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <a href="#contact"
            className="inline-block px-10 py-4 bg-black text-white hover:bg-gray-800 transition-colors uppercase tracking-widest text-xs font-semibold">
            {cta}
          </a>
        </div>
      </div>
    </section>
  );
};

export default Grants;
