import React, { Suspense, lazy, useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LoadingSpinner from './components/LoadingSpinner';
import FamilyAccounts from './pages/FamilyAccounts';
import './App.css';

// Lazy load all pages
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'));
const ResetPassword = lazy(() => import('./pages/ResetPassword'));
const SymptomDetector = lazy(() => import('./pages/SymptomDetector'));
const HealthAdvisor = lazy(() => import('./pages/HealthAdvisor'));
const LifeSync = lazy(() => import('./pages/LifeSync'));
const Dashboard = lazy(() => import('./pages/Dashboard'));


function App() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <BrowserRouter>
      <div className="App">
        <Navbar scrolled={scrolled} />
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            {/* Public Routes - All accessible without login */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
            <Route path="/symptom-detector" element={<SymptomDetector />} />
            <Route path="/health-advisor" element={<HealthAdvisor />} />
            <Route path="/lifesync" element={<LifeSync />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/family-accounts" element={<FamilyAccounts />} />

            {/* 404 Route - Redirect to home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;