import React, { useState, useEffect } from 'react';
import { Award, Users, Briefcase } from 'lucide-react';
import axios from 'axios';

const Grants = () => {
  const [grants, setGrants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGrants();
  }, []);

  const fetchGrants = async () => {
    try {
      const { data } = await axios.get('http://localhost:5001/api/grants');
      setGrants(data);
    } catch (error) {
      console.error('Failed to fetch grants');
    } finally {
      setLoading(false);
    }
  };

  const grantPrograms = grants.length > 0 ? grants.map(grant => ({
    icon: <Award className="w-10 h-10 text-gray-700" />,
    title: grant.title,
    description: grant.description,
    posterUrl: grant.posterUrl
  })) : [
    {
      icon: <Award className="w-10 h-10 text-gray-700" />,
      title: "Curatorial Research Grants",
      description: "Supporting independent curators and scholars in developing innovative research projects that advance critical discourse on contemporary Indian art."
    },
    {
      icon: <Users className="w-10 h-10 text-gray-700" />,
      title: "Artist Residency Support",
      description: "Funding residencies and studio programs that enable artists to experiment, collaborate, and engage with new contexts and communities."
    },
    {
      icon: <Briefcase className="w-10 h-10 text-gray-700" />,
      title: "Institutional Partnerships",
      description: "Collaborating with museums, galleries, and cultural institutions to produce exhibitions and public programs that foster dialogue and learning."
    }
  ];

  return (
    <section id="grants" className="py-20 px-6 md:px-12 bg-gray-50">
      <div className="container mx-auto max-w-6xl">
        <span className="text-xs font-semibold tracking-[0.25em] text-gray-500 uppercase mb-4 block">Grants & Support</span>
        <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-16">
          Empowering the Arts Ecosystem
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {grantPrograms.map((program, index) => (
            <div key={index} className="bg-white p-8 hover:shadow-lg transition-shadow">
              {program.posterUrl && (
                <img 
                  src={`http://localhost:5001${program.posterUrl}`} 
                  alt={program.title}
                  className="w-full h-48 object-cover mb-6"
                />
              )}
              <div className="mb-6">
                {program.icon}
              </div>
              <h3 className="text-xl font-semibold mb-4">{program.title}</h3>
              <p className="text-gray-600 leading-relaxed">{program.description}</p>
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
  );
};

export default Grants;
