import React from 'react';
import aparajitaJainImage from '../assets/aparajita-jain.png';
import vidishaAggarwalImage from '../assets/vidisha-aggarwal.png';

const BACKEND = 'http://localhost:5001';
const resolveImg = (url, fallback) => {
  if (!url) return fallback;
  return url.startsWith('/') ? `${BACKEND}${url}` : url;
};

const fallbackLeadership = [
  { name: 'Aparajita Jain', title: 'Founding Director', imageUrl: '', _fallbackImg: aparajitaJainImage },
  { name: 'Vidisha Aggarwal', title: 'Head of Programs', imageUrl: '', _fallbackImg: vidishaAggarwalImage },
];

const About = ({ content }) => {
  const c = content || {};
  const visionLabel = c.visionLabel || 'Our Vision';
  const missionLabel = c.missionLabel || 'Our Mission';
  const aboutLabel = c.aboutLabel || 'About Us';
  const leadershipHeading = c.leadershipHeading || 'Leadership';
  const vision = c.vision || '';
  const mission = c.mission || '';
  const aboutHeading = c.aboutHeading || '';
  const aboutBody = c.aboutBody || '';
  const leadership = c.leadership?.length > 0 ? c.leadership : fallbackLeadership;

  return (
    <>
      <section className="py-24 px-6 md:px-12 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16">
            <div className="space-y-6">
              <span className="text-xs font-bold tracking-[0.2em] text-gray-500 uppercase block">{visionLabel}</span>
              <h2 className="text-4xl md:text-5xl font-light leading-tight text-gray-900">{vision}</h2>
            </div>
            <div className="space-y-6">
              <span className="text-xs font-bold tracking-[0.2em] text-gray-500 uppercase block">{missionLabel}</span>
              <h2 className="text-4xl md:text-5xl font-light leading-tight text-gray-900">{mission}</h2>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="py-24 px-6 md:px-12 bg-white">
        <div className="container mx-auto max-w-5xl">
          <span className="text-xs font-bold tracking-[0.2em] text-gray-500 uppercase block mb-4">{aboutLabel}</span>
          <h2 className="text-3xl md:text-4xl font-light leading-relaxed text-gray-900 mb-8">{aboutHeading}</h2>
          <p className="text-gray-600 leading-loose text-lg font-light">{aboutBody}</p>

          <div className="border-t border-gray-100 pt-16 mt-16">
            <h3 className="text-2xl font-semibold mb-10 text-gray-900">{leadershipHeading}</h3>
            <div className="space-y-12 max-w-4xl">
              {leadership.map((person, idx) => {
                const fallbackImg = fallbackLeadership[idx]?._fallbackImg || aparajitaJainImage;
                const src = resolveImg(person.imageUrl, person._fallbackImg || fallbackImg);
                return (
                  <div key={person.name || idx} className="grid md:grid-cols-[300px_1fr] gap-12 items-start">
                    <div className="w-full aspect-4/5 bg-gray-100 overflow-hidden rounded-lg">
                      <img src={src} alt={person.name} className="w-full h-full object-cover"
                        onError={(e) => { e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(person.name)}&background=e5e7eb&color=374151&size=512`; }} />
                    </div>
                    <div>
                      <h4 className="text-2xl font-semibold text-gray-900">{person.name}</h4>
                      <p className="text-gray-500 text-sm uppercase tracking-[0.15em] mt-2 font-semibold">{person.title}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
