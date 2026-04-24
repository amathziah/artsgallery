import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, LayoutDashboard, FileText, Award, Home, Users, Footprints, Trees, Image, Layout } from 'lucide-react';

const AdminLayout = ({ children }) => {
  const { logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const navItems = [
    { path: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/admin/home', label: 'Hero Slides', icon: Home },
    { path: '/admin/homepage-sections', label: 'Homepage Sections', icon: Layout },
    { path: '/admin/about', label: 'About & Leadership', icon: Users },
    { path: '/admin/footer', label: 'Footer / Contact', icon: Footprints },
    { path: '/admin/programs', label: 'Programs Page', icon: FileText },
    { path: '/admin/grants', label: 'Grants Page', icon: Award },
    { path: '/admin/sculpture-park', label: 'Sculpture Park', icon: Trees },
    { path: '/admin/conjectures', label: 'Conjectures', icon: Image },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-black text-white">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">SSA Admin Panel</h1>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-white text-black hover:bg-gray-200 transition-colors text-sm"
          >
            <LogOut size={16} /> Logout
          </button>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-8">
        <div className="flex gap-6">
          <aside className="w-64 shrink-0">
            <nav className="bg-white p-4 space-y-1 shadow">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center gap-3 px-4 py-3 rounded transition-colors text-sm ${isActive ? 'bg-black text-white' : 'text-gray-700 hover:bg-gray-100'}`}
                  >
                    <Icon size={18} /> {item.label}
                  </Link>
                );
              })}
            </nav>
          </aside>
          <main className="flex-1">{children}</main>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
