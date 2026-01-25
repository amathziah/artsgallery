import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './admin/context/AuthContext'
import ProtectedRoute from './admin/components/ProtectedRoute'

import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Grants from './components/Grants'
import Programs from './components/Programs'
import Footer from './components/Footer'
import AIModal from './components/AIModal'

import Login from './admin/pages/Login'
import Dashboard from './admin/pages/Dashboard'
import AdminPrograms from './admin/pages/Programs'
import AdminGrants from './admin/pages/Grants'

function PublicSite() {
  const [scrolled, setScrolled] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const API_KEY = 'YOUR_GEMINI_API_KEY'

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="font-sans">
      <Navbar scrolled={scrolled} />
      <Hero />
      <About apiKey={API_KEY} />
      <Grants />
      <Programs />
      <Footer onOpenModal={() => setIsModalOpen(true)} />
      <AIModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} apiKey={API_KEY} />
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<PublicSite />} />
          <Route path="/admin/login" element={<Login />} />
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/programs"
            element={
              <ProtectedRoute>
                <AdminPrograms />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/grants"
            element={
              <ProtectedRoute>
                <AdminGrants />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
