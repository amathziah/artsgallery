import React, { useState } from 'react';
import { X } from 'lucide-react';
import { profileData as localProfiles } from '../data/profileData';

const BACKEND = 'http://localhost:5001';
const img = (url, name) => {
  if (!url) return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=e5e7eb&color=374151&size=512`;
  return url.startsWith('/') ? `${BACKEND}${url}` : url;
};

// Fallback to local figma images for known names
const getImg = (url, name) => {
  if (url) return img(url, name);
  const local = localProfiles[name];
  return local ? local.image : img('', name);
};

function ProfileCard({ person, onSelect }) {
  return (
    <div className="cursor-pointer group" onClick={() => onSelect(person)}>
      <div className="w-full aspect-square bg-gray-200 overflow-hidden group-hover:shadow-xl transition-all duration-500">
        <img src={getImg(person.imageUrl, person.name)} alt={person.name}
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
          onError={(e) => { e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(person.name)}&background=e5e7eb&color=374151&size=512`; }} />
      </div>
      <p className="text-sm font-semibold group-hover:text-blue-600 transition-colors text-center mt-3">{person.name}</p>
    </div>
  );
}

function ProfileModal({ person, onClose }) {
  if (!person) return null;
  const bio = person.bio || localProfiles[person.name]?.text || '';
  return (
    <div className="fixed inset-0 bg-black/70 z-60 flex items-center justify-center p-4 md:p-8 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-white max-w-4xl w-full rounded-2xl shadow-2xl overflow-hidden relative" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 bg-gray-100 hover:bg-gray-200 p-2 rounded-full text-gray-600 z-10"><X size={20} /></button>
        <div className="p-8 md:p-12 flex flex-col md:flex-row gap-10 items-start">
          <div className="w-full md:w-80 shrink-0">
            <div className="w-full aspect-square bg-gray-100 overflow-hidden">
              <img src={getImg(person.imageUrl, person.name)} alt={person.name} className="w-full h-full object-cover"
                onError={(e) => { e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(person.name)}&background=e5e7eb&color=374151&size=512`; }} />
            </div>
          </div>
          <div className="flex-1">
            <h3 className="text-3xl font-semibold mb-3 text-gray-900">{person.name}</h3>
            <p className="text-sm text-gray-500 uppercase tracking-[0.15em] mb-8 font-semibold">{person.role}</p>
            <p className="text-gray-700 leading-relaxed text-lg">{bio}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function GrantsPage({ data, bgImage }) {
  const [tab, setTab] = useState('current');
  const [selected, setSelected] = useState(null);

  const d = data || {};
  const awardee = d.awardee || { name: '', role: '', imageUrl: '', bio: '' };
  const jury = d.jury || [];
  const archiveAwardees = d.archiveAwardees || [];

  const resolvedBg = bgImage ? (bgImage.startsWith('/') ? `${BACKEND}${bgImage}` : bgImage) : null;
  const bgStyle = resolvedBg
    ? { backgroundImage: `url(${resolvedBg})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed' }
    : {};

  return (
    <>
      <section className="pt-32 pb-24 px-6 md:px-12 min-h-screen relative" style={bgStyle}>
        <div className="absolute inset-0 bg-white/90 backdrop-blur-sm" />
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="mb-12 text-center">
            <span className="text-xs font-bold tracking-[0.2em] text-gray-500 uppercase block mb-4">{d.pageLabel || 'Funding Opportunities'}</span>
            <h1 className="text-5xl md:text-6xl font-light mb-6 text-gray-900">{d.pageTitle || 'Grants'}</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light leading-relaxed">{d.pageSubtitle || ''}</p>
          </div>

          <div className="flex justify-center mb-16 border-b border-gray-300">
            <button onClick={() => setTab('current')} className={`pb-4 px-10 text-sm uppercase tracking-[0.15em] transition-all font-semibold ${tab === 'current' ? 'border-b-2 border-black text-black' : 'text-gray-400 hover:text-blue-600'}`}>
              {d.currentTabLabel || 'SSA-IAF Grant (Current)'}
            </button>
            <button onClick={() => setTab('archive')} className={`pb-4 px-10 text-sm uppercase tracking-[0.15em] transition-all font-semibold ${tab === 'archive' ? 'border-b-2 border-black text-black' : 'text-gray-400 hover:text-blue-600'}`}>
              {d.archiveTabLabel || 'Saat Saath Grant (Archive)'}
            </button>
          </div>

          <div className="bg-white/95 backdrop-blur-sm p-8 md:p-12 shadow-lg">
            {tab === 'current' ? (
              <div className="space-y-16">
                <div>
                  <h2 className="text-3xl md:text-4xl font-light mb-8 text-gray-900">{d.currentGrantTitle || ''}</h2>
                  <div className="space-y-8 text-gray-700 leading-relaxed text-lg max-w-4xl">
                    <p>{d.currentGrantBody1 || ''}</p>
                    <p>{d.currentGrantBody2 || ''}</p>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-10">
                  <div className="bg-gray-50 p-8 rounded-lg">
                    <h3 className="text-xl font-semibold mb-4 text-gray-900">{d.currentStructureTitle || 'Grant Structure'}</h3>
                    <p className="text-gray-600 leading-relaxed">{d.currentStructureBody || ''}</p>
                  </div>
                  <div className="bg-gray-50 p-8 rounded-lg">
                    <h3 className="text-xl font-semibold mb-4 text-gray-900">{d.currentEligibilityTitle || 'Eligibility'}</h3>
                    <p className="text-gray-600 leading-relaxed">{d.currentEligibilityBody || ''}</p>
                  </div>
                </div>
                <div className="border-t border-gray-200 pt-12">
                  <h3 className="text-3xl font-light mb-10 text-gray-900">{d.currentAwardeeHeading || '2025–26 Awardee'}</h3>
                  <div className="flex flex-col md:flex-row gap-8 items-start bg-gray-50 p-8 rounded-lg cursor-pointer group" onClick={() => setSelected(awardee)}>
                    <div className="w-full md:w-80 shrink-0">
                      <div className="w-full aspect-square bg-gray-200 overflow-hidden group-hover:shadow-xl transition-all duration-500">
                        <img src={getImg(awardee.imageUrl, awardee.name)} alt={awardee.name}
                          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                          onError={(e) => { e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(awardee.name)}&background=e5e7eb&color=374151&size=512`; }} />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-3xl font-semibold mb-2 text-gray-900 hover:text-blue-600 transition-colors">{awardee.name}</h4>
                      <p className="text-sm text-gray-500 uppercase tracking-[0.15em] mb-6 font-semibold">{awardee.role}</p>
                      <p className="text-gray-700 leading-relaxed">{awardee.bio || localProfiles[awardee.name]?.text || ''}</p>
                    </div>
                  </div>

                  {jury.length > 0 && (
                    <>
                      <h3 className="text-3xl font-light mb-10 mt-16 text-gray-900">{d.currentJuryHeading || '2025–26 Jury'}</h3>
                      <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
                        {jury.map((p) => <ProfileCard key={p.name} person={p} onSelect={setSelected} />)}
                      </div>
                    </>
                  )}
                </div>
              </div>
            ) : (
              <div className="space-y-16">
                <div>
                  <h2 className="text-3xl md:text-4xl font-light mb-8 text-gray-900">{d.archiveGrantTitle || ''}</h2>
                  <div className="space-y-8 text-gray-700 leading-relaxed text-lg max-w-4xl">
                    <p>{d.archiveGrantBody1 || ''}</p>
                    <p>{d.archiveGrantBody2 || ''}</p>
                  </div>
                </div>
                <div className="bg-gray-50 p-8 rounded-lg max-w-4xl">
                  <h3 className="text-xl font-semibold mb-4 text-gray-900">{d.archiveStructureTitle || 'Structure & Administration'}</h3>
                  <p className="text-gray-600 leading-relaxed">{d.archiveStructureBody || ''}</p>
                </div>
                {archiveAwardees.length > 0 && (
                  <div className="border-t border-gray-200 pt-12">
                    <h3 className="text-3xl font-light mb-6 text-gray-900">{d.archiveAwardeesHeading || 'Select Awardees (2015–2024)'}</h3>
                    <p className="text-gray-600 mb-10 leading-relaxed max-w-3xl">{d.archiveAwardeesNote || ''}</p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-12">
                      {archiveAwardees.map((p) => <ProfileCard key={p.name} person={p} onSelect={setSelected} />)}
                    </div>
                  </div>
                )}
                <div className="border-t border-gray-200 pt-12">
                  <h3 className="text-2xl font-semibold mb-6 text-gray-900">{d.archiveLegacyTitle || 'Legacy'}</h3>
                  <p className="text-gray-700 leading-relaxed text-lg max-w-4xl">{d.archiveLegacyBody || ''}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
      <ProfileModal person={selected} onClose={() => setSelected(null)} />
    </>
  );
}
