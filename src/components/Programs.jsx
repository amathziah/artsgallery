import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, ExternalLink } from 'lucide-react';
import axios from 'axios';

const Programs = () => {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPrograms();
  }, []);

  const fetchPrograms = async () => {
    try {
      const { data } = await axios.get('http://localhost:5001/api/programs');
      setPrograms(data);
    } catch (error) {
      console.error('Failed to fetch programs');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="programs" className="py-20 px-6 md:px-12 bg-white">
      <div className="container mx-auto max-w-7xl">
        <span className="text-xs font-semibold tracking-[0.25em] text-gray-500 uppercase mb-4 block">
          Programs & Initiatives
        </span>

        <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-16">
          Engaging Communities Through Art
        </h2>

        {/* Loading */}
        {loading && (
          <div className="text-center text-gray-500">
            Loading programs...
          </div>
        )}

        {/* Empty */}
        {!loading && programs.length === 0 && (
          <div className="text-center text-gray-500">
            No programs available yet.
          </div>
        )}

        {/* GRID */}
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
          {programs.map((program) => (
            <div
              key={program._id}
              className="group flex flex-col border border-gray-200 hover:border-black transition-colors"
            >
              {/* Poster */}
              <div className="relative overflow-hidden bg-gray-100 aspect-[4/3]">
                {program.posterUrl ? (
                  <img
                    src={`http://localhost:5001${program.posterUrl}`}
                    alt={program.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-sm text-gray-400">
                    No Poster
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="flex flex-col flex-1 p-6">
                <h3 className="text-xl font-medium text-gray-900 mb-3">
                  {program.title}
                </h3>

                <div className="flex flex-wrap gap-4 text-xs text-gray-500 mb-4">
                  <div className="flex items-center gap-1">
                    <MapPin size={14} />
                    <span>Various Locations</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar size={14} />
                    <span>{new Date(program.createdAt).getFullYear()}</span>
                  </div>
                </div>

                <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-4">
                  {program.description}
                </p>

                {/* CTA */}
                <div className="mt-auto">
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-black hover:opacity-70 transition-opacity"
                  >
                    Learn More
                    <ExternalLink size={14} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Programs;

