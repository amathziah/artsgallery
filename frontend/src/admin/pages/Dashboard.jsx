import React, { useState, useEffect } from 'react';
import AdminLayout from '../components/AdminLayout';
import api from '../utils/api';
import { FileText, Award } from 'lucide-react';

const Dashboard = () => {
  const [stats, setStats] = useState({ programs: 0, grants: 0 });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [programs, grants] = await Promise.all([
        api.get('/programs'),
        api.get('/grants')
      ]);
      setStats({ programs: programs.data.length, grants: grants.data.length });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AdminLayout>
      <div>
        <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-white p-6 shadow">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gray-100">
                <FileText size={24} />
              </div>
              <div>
                <div className="text-3xl font-bold">{stats.programs}</div>
                <div className="text-gray-600 text-sm">Programs</div>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 shadow">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gray-100">
                <Award size={24} />
              </div>
              <div>
                <div className="text-3xl font-bold">{stats.grants}</div>
                <div className="text-gray-600 text-sm">Grants</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
