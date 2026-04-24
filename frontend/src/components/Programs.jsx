import React from 'react';
import { Link } from 'react-router-dom';
import initiative1Image from '../assets/initiative1.png';
import sculptureParkImage from '../assets/sculpture-park2.png';

const BACKEND = 'http://localhost:5001';
const resolveImg = (url, idx) => {
  if (url) return url.startsWith('/') ? `${BACKEND}${url}` : url;
  return idx === 3 ? sculptureParkImage : initiative1Image;
};

const Programs = ({ data, sectionLabel, sectionHeading }) => {
  const cards = data?.cards || [];
  const label = sectionLabel || 'Programs & Initiatives';
  const heading = sectionHeading || 'Engaging Communities Through Art';

  return (
    <section id="programs" className="py-20 px-6 md:px-12 bg-white">
      <div className="container mx-auto max-w-7xl">
        <span className="text-xs font-semibold tracking-[0.25em] text-gray-500 uppercase mb-4 block">{label}</span>
        <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-16">{heading}</h2>

        {cards.length === 0 && (
          <div className="text-center text-gray-400 py-12">No programs yet.</div>
        )}

        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((card, i) => (
            <div key={i} className="group flex flex-col border border-gray-200 hover:border-black transition-colors">
              <div className="relative overflow-hidden bg-gray-100 aspect-4/3">
                <img src={resolveImg(card.imageUrl, i)} alt={card.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => { e.target.src = initiative1Image; }} />
              </div>
              <div className="flex flex-col flex-1 p-6">
                <h3 className="text-xl font-medium text-gray-900 mb-3">{card.title}</h3>
                {card.date && <p className="text-xs text-gray-500 mb-3 uppercase tracking-wider">{card.date}</p>}
                <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-4">{card.description}</p>
                {card.link && (
                  <div className="mt-auto">
                    {card.isExternal ? (
                      <a href={card.link} target="_blank" rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-black hover:opacity-70 transition-opacity">
                        Learn More
                      </a>
                    ) : (
                      <Link to={card.link}
                        className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-black hover:opacity-70 transition-opacity">
                        Learn More
                      </Link>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Programs;
