import React, { useState } from 'react';
import { Calendar, MapPin, Users, Building, ExternalLink } from 'lucide-react';
import sculptureParkHeroImage from '../assets/sculpture-park-hero.png';
import sculptureParkLogoImage from '../assets/sculpture-park-logo.png';

const BACKEND = 'http://localhost:5001';
const resolveImg = (url, fallback) => {
  if (!url) return fallback;
  return url.startsWith('/') ? `${BACKEND}${url}` : url;
};

const tabs = [
  { id: 'founding', label: 'Founding', Icon: Calendar },
  { id: 'evolution', label: 'Evolution', Icon: MapPin },
  { id: 'impact', label: 'Impact', Icon: Users },
  { id: 'support', label: 'Support', Icon: Building },
];

export default function SculptureParkPage({ data }) {
  const [activeTab, setActiveTab] = useState('founding');
  const d = data || {};

  const heroImg = resolveImg(d.heroImageUrl, sculptureParkHeroImage);
  const logoImg = resolveImg(d.logoImageUrl, sculptureParkLogoImage);

  const milestones = d.evolutionMilestones || [];
  const impactStats = d.impactStats || [];
  const supportItems = d.supportItems || [];

  return (
    <section className="pt-32 pb-24 px-6 md:px-12 bg-white min-h-screen">
      <div className="container mx-auto max-w-6xl">

        {/* Header */}
        <div className="mb-16">
          <div className="flex items-start gap-8 mb-8">
            <img src={logoImg} alt="The Sculpture Park Logo" className="w-32 h-32 object-contain" />
            <div className="flex-1">
              <span className="text-xs font-bold tracking-[0.2em] text-gray-500 uppercase block mb-4">{d.pageLabel || 'Major Initiative'}</span>
              <h1 className="text-5xl lg:text-6xl font-light mb-6 text-gray-900">{d.pageTitle || 'The Sculpture Park'}</h1>
              <p className="text-xl text-gray-600 max-w-3xl font-light leading-relaxed mb-6">{d.pageSubtitle || ''}</p>
              <a href={d.officialWebsite || 'https://www.thesculpturepark.org/'} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.15em] text-black hover:text-blue-600 transition-colors">
                Visit Official Website <ExternalLink size={16} />
              </a>
            </div>
          </div>
        </div>

        {/* Hero Image */}
        <div className="relative h-100 md:h-150 overflow-hidden shadow-lg mb-16 rounded-lg">
          <img src={heroImg} alt="The Sculpture Park" className="w-full h-full object-cover" />
        </div>

        {/* Tabs */}
        <div className="mb-16">
          <div className="grid grid-cols-2 md:grid-cols-4 mb-8 border border-gray-200 rounded-lg overflow-hidden">
            {tabs.map(({ id, label }) => (
              <button key={id} onClick={() => setActiveTab(id)}
                className={`py-3 text-xs font-semibold uppercase tracking-widest transition-colors ${activeTab === id ? 'bg-black text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}>
                {label}
              </button>
            ))}
          </div>

          {activeTab === 'founding' && (
            <div className="bg-gray-50 p-8 md:p-10 rounded-lg">
              <div className="flex items-start gap-4">
                <Calendar className="text-gray-600 shrink-0 mt-1" size={24} />
                <div>
                  <h2 className="text-3xl font-semibold mb-4 text-gray-900">{d.foundingTitle || 'Founding'}</h2>
                  <p className="text-gray-700 mb-4 leading-relaxed text-lg">{d.foundingBody1 || ''}</p>
                  <p className="text-gray-700 leading-relaxed text-lg">{d.foundingBody2 || ''}</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'evolution' && (
            <div className="bg-gray-50 p-8 md:p-10 rounded-lg">
              <div className="flex items-start gap-4 mb-6">
                <MapPin className="text-gray-600 shrink-0 mt-1" size={24} />
                <div>
                  <h2 className="text-3xl font-semibold mb-4 text-gray-900">{d.evolutionTitle || 'Historical Development'}</h2>
                  <p className="text-gray-700 mb-8 leading-relaxed text-lg">{d.evolutionIntro || ''}</p>
                </div>
              </div>
              <div className="space-y-6">
                {milestones.map((m, i) => (
                  <div key={i} className="border-l-4 border-black pl-6">
                    <h3 className="text-xl font-semibold mb-2 text-gray-900">{m.heading}</h3>
                    <p className="text-gray-700 leading-relaxed">{m.body}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'impact' && (
            <div className="bg-gray-50 p-8 md:p-10 rounded-lg">
              <div className="flex items-start gap-4">
                <Users className="text-gray-600 shrink-0 mt-1" size={24} />
                <div className="w-full">
                  <h2 className="text-3xl font-semibold mb-4 text-gray-900">{d.impactTitle || 'Contemporary Impact'}</h2>
                  <p className="text-gray-700 mb-4 leading-relaxed text-lg">{d.impactBody1 || ''}</p>
                  <p className="text-gray-700 mb-8 leading-relaxed text-lg">{d.impactBody2 || ''}</p>
                  {impactStats.length > 0 && (
                    <div className="grid md:grid-cols-3 gap-6 mt-8">
                      {impactStats.map((s, i) => (
                        <div key={i} className="text-center p-6 bg-white rounded-lg">
                          <p className="text-4xl font-semibold mb-2 text-gray-900">{s.value}</p>
                          <p className="text-gray-600 font-semibold uppercase tracking-widest text-xs">{s.label}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'support' && (
            <div className="bg-gray-50 p-8 md:p-10 rounded-lg">
              <div className="flex items-start gap-4 mb-6">
                <Building className="text-gray-600 shrink-0 mt-1" size={24} />
                <div>
                  <h2 className="text-3xl font-semibold mb-4 text-gray-900">{d.supportTitle || 'Support and Funding'}</h2>
                  <p className="text-gray-700 mb-8 leading-relaxed text-lg">{d.supportIntro || ''}</p>
                </div>
              </div>
              <div className="space-y-6">
                {supportItems.map((s, i) => (
                  <div key={i} className="p-6 bg-white rounded-lg">
                    <h3 className="text-xl font-semibold mb-3 text-gray-900">{s.title}</h3>
                    <p className="text-gray-700 leading-relaxed">{s.body}</p>
                  </div>
                ))}
              </div>
              {d.supportNote && <p className="text-gray-600 mt-8 italic leading-relaxed">{d.supportNote}</p>}
            </div>
          )}
        </div>

        {/* Visit Us */}
        <div className="border-t border-gray-200 pt-16 mt-16">
          <h2 className="text-3xl font-semibold mb-8 text-gray-900">{d.visitTitle || 'Visit Us'}</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-50 p-8 rounded-lg">
              <h3 className="text-xl font-semibold mb-4 text-gray-900">{d.visitVenueName || 'Jaigarh Fort'}</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">{d.visitVenueDesc || ''}</p>
              {d.visitMapEmbed && (
                <div className="aspect-video bg-gray-200 mb-4 rounded overflow-hidden">
                  <iframe src={d.visitMapEmbed} width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
                </div>
              )}
              {d.visitDirectionsUrl && (
                <a href={d.visitDirectionsUrl} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.15em] text-black hover:text-blue-600 transition-colors">
                  Get Directions <ExternalLink size={14} />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
