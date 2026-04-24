import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import initiative1Image from '../assets/initiative1.png';

const BACKEND = 'http://localhost:5001';

export default function ConjecturesPage({ data }) {
  const d = data || {};
  const imgSrc = d.imageUrl
    ? (d.imageUrl.startsWith('/') ? `${BACKEND}${d.imageUrl}` : d.imageUrl)
    : initiative1Image;

  return (
    <section className="pt-32 pb-24 px-6 md:px-12 bg-white min-h-screen">
      <div className="container mx-auto max-w-5xl">
        <Link to="/programs" className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.15em] text-gray-500 hover:text-blue-600 transition-colors mb-12">
          <ArrowLeft size={16} /> Back to Programs
        </Link>

        <div className="mb-12">
          <span className="text-xs font-bold tracking-[0.2em] text-gray-500 uppercase block mb-4">{d.label || 'Exhibition'}</span>
          <h1 className="text-5xl md:text-6xl font-light mb-6 text-gray-900">{d.title || 'Conjectures on a Paper Sky'}</h1>
          <p className="text-2xl text-gray-600 font-light mb-8">{d.subtitle || 'Jitish Kallat at Bikaner House, New Delhi'}</p>
          <p className="text-sm text-gray-500 uppercase tracking-[0.15em] font-semibold mb-8">{d.dates || '4–10 February 2026'}</p>
        </div>

        <div className="mb-12">
          <img src={imgSrc} alt={d.title || 'Exhibition'} className="w-full aspect-video object-cover" />
        </div>

        <div className="space-y-8 text-gray-700 leading-relaxed text-lg max-w-4xl">
          {d.leadParagraph && <p className="text-xl font-semibold text-gray-900">{d.leadParagraph}</p>}
          {d.body1 && <p>{d.body1}</p>}
          {d.body2 && <p>{d.body2}</p>}

          <div className="border-t border-gray-200 pt-8 mt-12">
            <h2 className="text-2xl font-semibold mb-6 text-gray-900">{d.detailsHeading || 'Exhibition Details'}</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-[0.15em] text-gray-500 mb-2">Venue</h3>
                <p className="text-gray-900">{d.detailVenue || 'Bikaner House, New Delhi'}</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-[0.15em] text-gray-500 mb-2">Dates</h3>
                <p className="text-gray-900">{d.detailDates || '4–10 February 2026'}</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-[0.15em] text-gray-500 mb-2">Curator</h3>
                <p className="text-gray-900">{d.detailCurator || 'Alexandra Munroe'}</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-[0.15em] text-gray-500 mb-2">Artist</h3>
                <p className="text-gray-900">{d.detailArtist || 'Jitish Kallat'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
