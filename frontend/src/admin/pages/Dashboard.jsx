import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '../components/AdminLayout';
import api from '../utils/api';
import { FileText, Award, Home, Users, Footprints, Trees, Image, Layout, ArrowRight } from 'lucide-react';

const Dashboard = () => {
  const [stats, setStats] = useState({});

  const sections = [
    { label: 'Hero Slides', description: 'Edit homepage slideshow images, titles, and CTAs', icon: Home, path: '/admin/home', color: 'bg-blue-50' },
    { label: 'Homepage Sections', description: 'Edit Programs & Grants section labels, headings, CTA, and background', icon: Layout, path: '/admin/homepage-sections', color: 'bg-sky-50' },
    { label: 'About & Leadership', description: 'Edit vision, mission, about text, section labels, and leadership profiles', icon: Users, path: '/admin/about', color: 'bg-green-50' },
    { label: 'Footer / Contact', description: 'Edit tagline, copyright, address, emails, and social media links', icon: Footprints, path: '/admin/footer', color: 'bg-yellow-50' },
    { label: 'Programs', description: 'Edit program cards and page header', icon: FileText, path: '/admin/programs', color: 'bg-purple-50' },
    { label: 'Grants', description: 'Edit current grant, awardee, jury, and archive', icon: Award, path: '/admin/grants', color: 'bg-red-50' },
    { label: 'Sculpture Park', description: 'Edit all tabs, stats, milestones, and visit info', icon: Trees, path: '/admin/sculpture-park', color: 'bg-emerald-50' },
    { label: 'Conjectures Exhibition', description: 'Edit exhibition page content and details', icon: Image, path: '/admin/conjectures', color: 'bg-orange-50' },
  ];

  return (
    <AdminLayout>
      <div>
        <h2 className="text-2xl font-bold mb-2">Dashboard</h2>
        <p className="text-gray-500 text-sm mb-8">Manage all content on the Saat Saath Arts website.</p>
        <div className="grid md:grid-cols-2 gap-4">
          {sections.map((s) => {
            const Icon = s.icon;
            return (
              <Link key={s.path} to={s.path} className={`${s.color} p-6 rounded-lg hover:shadow-md transition-shadow group flex items-start justify-between`}>
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-white rounded shadow-sm">
                    <Icon size={22} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{s.label}</h3>
                    <p className="text-gray-500 text-sm mt-0.5">{s.description}</p>
                  </div>
                </div>
                <ArrowRight size={18} className="text-gray-400 group-hover:text-gray-700 mt-1 transition-colors" />
              </Link>
            );
          })}
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
