import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import DashboardPreview from './components/DashboardPreview';
import Roles from './components/Roles';
import Pricing from './components/Pricing';
import Specs from './components/Specs';
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans">
      <Navbar 
        mobileMenuOpen={mobileMenuOpen} 
        setMobileMenuOpen={setMobileMenuOpen}
        onSignInClick={() => setAuthModalOpen(true)}
      />
      <Hero />
      <Features />
      <DashboardPreview />
      <Roles />
      <Pricing />
      <Specs />
      <Footer />
      <AuthModal 
        isOpen={authModalOpen} 
        onClose={() => setAuthModalOpen(false)} 
      />
    </div>
  );
}
