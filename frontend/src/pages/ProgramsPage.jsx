import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import initiative1Image from '../assets/initiative1.png';
import sculptureParkImage from '../assets/sculpture-park2.png';

const BACKEND = 'http://localhost:5001';

const fallbackImages = [initiative1Image, null, null, sculptureParkImage];

const getImg = (url, index) => {
  if (url) return url.startsWith('/') ? `${BACKEND}${url}` : url;
  return fallbackImages[index] || null;
};

export default function ProgramsPage({ data }) {
  const d = data || {};
  const cards = d.cards || [];

  return (
    <section className="pt-32 pb-24 px-6 md:px-12 bg-white min-h-screen">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-light text-gray-900 mb-4">{d.pageTitle || 'Programs'}</h1>
            <p className="text-xl text-gray-600 font-light leading-relaxed">{d.pageSubtitle || ''}</p>
          </div>
          {d.sculptureParklinkUrl && (
            <a href={d.sculptureParklinkUrl} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.15em] hover:text-blue-600 transition-colors whitespace-nowrap">
              {d.sculptureParklinkText || 'Visit Sculpture Park'} <ArrowRight size={16} />
            </a>
          )}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {cards.map((card, i) => {
            const imgSrc = getImg(card.imageUrl, i);
            const isInternal = !card.isExternal && card.link && card.link.startsWith('/');
            return isInternal ? (
              <Link key={i} to={card.link} className="group">
                <div className="bg-gray-100 aspect-4/3 mb-6 overflow-hidden">
                  {imgSrc && <img src={imgSrc} alt={card.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    onError={(e) => { e.target.style.display = 'none'; }} />}
                </div>
                <h3 className="text-2xl font-semibold mb-3 text-gray-900 group-hover:text-blue-600 transition-colors">{card.title}</h3>
                <p className="text-gray-600 leading-relaxed mb-2">{card.description}</p>
                {card.date && <p className="text-sm text-gray-500 uppercase tracking-[0.15em] font-semibold">{card.date}</p>}
              </Link>
            ) : (
              <div key={i} className="group">
                <div className="bg-gray-100 aspect-4/3 mb-6 overflow-hidden">
                  {imgSrc && <img src={imgSrc} alt={card.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    onError={(e) => { e.target.style.display = 'none'; }} />}
                </div>
                <h3 className="text-2xl font-semibold mb-3 text-gray-900">{card.title}</h3>
                <p className="text-gray-600 leading-relaxed">{card.description}</p>
                {card.date && <p className="text-sm text-gray-500 uppercase tracking-[0.15em] font-semibold mt-2">{card.date}</p>}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
