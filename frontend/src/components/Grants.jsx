import React, { useState, useEffect } from 'react';
import { Award, Users, Briefcase, X } from 'lucide-react';
import axios from 'axios';

const Grants = () => {
  const [grants, setGrants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeGrant, setActiveGrant] = useState(null);

  useEffect(() => {
    fetchGrants();
  }, []);

  const fetchGrants = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/grants`         );
      setGrants(data);
    } catch (error) {
      console.error('Failed to fetch grants');
    } finally {
      setLoading(false);
    }
  };

  const grantPrograms = grants.length > 0
    ? grants.map(grant => ({
        ...grant,
        icon: <Award className="w-10 h-10 text-gray-700" />
      }))
    : [];

  return (
    <>
      <section id="grants" className="py-20 px-6 md:px-12 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <span className="text-xs font-semibold tracking-[0.25em] text-gray-500 uppercase mb-4 block">
            Grants & Support
          </span>

          <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-16">
            Empowering the Arts Ecosystem
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {grantPrograms.map((program) => (
              <div
                key={program._id}
                className="bg-white p-8 hover:shadow-lg transition-shadow flex flex-col"
              >
                {program.posterUrl && (
                  <img
                   src={`${import.meta.env.VITE_API_URL.replace('/api', '')}${program.posterUrl}`}
                    alt={program.title}
                    className="w-full h-48 object-cover mb-6"
                  />
                )}

                <div className="mb-6">{program.icon}</div>

                <h3 className="text-xl font-semibold mb-4">
                  {program.title}
                </h3>

                <p className="text-gray-600 leading-relaxed mb-6">
                  {program.description}
                </p>

                <button
                  onClick={() => setActiveGrant(program)}
                  className="mt-auto text-sm font-semibold text-black underline hover:text-gray-700"
                >
                  Show more
                </button>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <a
              href="#contact"
              className="inline-block px-10 py-4 bg-black text-white hover:bg-gray-800 transition-colors uppercase tracking-widest text-xs font-semibold"
            >
              Apply for a Grant
            </a>
          </div>
        </div>
      </section>

      {/* ================= MODAL ================= */}
      {activeGrant && (
        <div
          className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center px-4"
          onClick={() => setActiveGrant(null)}
        >
          <div
            className="bg-white max-w-2xl w-full p-8 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveGrant(null)}
              className="absolute top-4 right-4 p-1 hover:bg-gray-100"
            >
              <X size={20} />
            </button>

            {activeGrant.posterUrl && (
              <img
                src={`${import.meta.env.VITE_API_URL}${activeGrant.posterUrl}`}
                alt={activeGrant.title}
                className="w-full h-56 object-cover mb-6"
              />
            )}

            <h3 className="text-2xl font-semibold mb-4">
              {activeGrant.title}
            </h3>

            <p className="text-gray-600 mb-6">
              {activeGrant.description}
            </p>

            <div className="space-y-4 text-sm text-gray-700">
              <div>
                <strong>Awardee:</strong> {activeGrant.awardee}
              </div>

              <div>
                <strong>Eligibility:</strong> {activeGrant.eligibility}
              </div>

              <div>
                <strong>Structure:</strong> {activeGrant.structure}
              </div>

              {activeGrant.jury?.length > 0 && (
                <div>
                  <strong>Jury:</strong> {activeGrant.jury.join(', ')}
                </div>
              )}
            </div>

            <div className="mt-8">
              <a
                href="#contact"
                className="inline-block w-full text-center px-6 py-3 bg-black text-white hover:bg-gray-800 uppercase tracking-widest text-xs font-semibold"
              >
                Apply for this Grant
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Grants;
