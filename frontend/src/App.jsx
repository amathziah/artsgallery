import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './admin/context/AuthContext';
import ProtectedRoute from './admin/components/ProtectedRoute';
import api from './admin/utils/api';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import ProgramsSection from './components/Programs';
import GrantsSection from './components/Grants';
import Footer from './components/Footer';

import GrantsPage from './pages/GrantsPage';
import ProgramsPage from './pages/ProgramsPage';
import SculptureParkPage from './pages/SculptureParkPage';
import ConjecturesPage from './pages/ConjecturesPage';

import Login from './admin/pages/Login';
import Dashboard from './admin/pages/Dashboard';
import AdminHomePage from './admin/pages/HomePage';
import AdminAboutPage from './admin/pages/AboutPage';
import AdminFooterPage from './admin/pages/FooterPage';
import AdminGrantsEditor from './admin/pages/GrantsEditor';
import AdminProgramsEditor from './admin/pages/ProgramsEditor';
import AdminSculptureParkEditor from './admin/pages/SculptureParkEditor';
import AdminConjecturesEditor from './admin/pages/ConjecturesEditor';
import AdminHomepageSections from './admin/pages/HomepageSectionsEditor';

function PublicLayout() {
  const [sc, setSc] = useState(null);

  useEffect(() => {
    api.get('/site-content').then((r) => setSc(r.data)).catch(() => {});
  }, []);

  return (
    <>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<>
            <Hero slides={sc?.heroSlides} />
            <About content={sc} />
          </>} />
          <Route path="/grants" element={<GrantsPage data={sc?.grants} bgImage={sc?.grantsPageBgImage} />} />
          <Route path="/programs" element={<ProgramsPage data={sc?.programs} />} />
          <Route path="/programs/conjectures-paper-sky" element={<ConjecturesPage data={sc?.conjectures} />} />
          <Route path="/sculpture-park" element={<SculptureParkPage data={sc?.sculpturePark} />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
      <Footer contact={sc} />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/admin/login" element={<Login />} />
          <Route path="/admin/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/admin/home" element={<ProtectedRoute><AdminHomePage /></ProtectedRoute>} />
          <Route path="/admin/about" element={<ProtectedRoute><AdminAboutPage /></ProtectedRoute>} />
          <Route path="/admin/footer" element={<ProtectedRoute><AdminFooterPage /></ProtectedRoute>} />
          <Route path="/admin/grants" element={<ProtectedRoute><AdminGrantsEditor /></ProtectedRoute>} />
          <Route path="/admin/programs" element={<ProtectedRoute><AdminProgramsEditor /></ProtectedRoute>} />
          <Route path="/admin/sculpture-park" element={<ProtectedRoute><AdminSculptureParkEditor /></ProtectedRoute>} />
          <Route path="/admin/conjectures" element={<ProtectedRoute><AdminConjecturesEditor /></ProtectedRoute>} />
          <Route path="/admin/homepage-sections" element={<ProtectedRoute><AdminHomepageSections /></ProtectedRoute>} />
          <Route path="/*" element={<PublicLayout />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
