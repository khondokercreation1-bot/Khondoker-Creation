import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ServicesGrid } from './components/ServicesGrid';
import { PortfolioGallery } from './components/PortfolioGallery';
import { StatsSection } from './components/StatsSection';
import { InteractivePlanner } from './components/InteractivePlanner';
import { Testimonials } from './components/Testimonials';
import { CtaBanner } from './components/CtaBanner';
import { Footer } from './components/Footer';
import { ProjectModal } from './components/ProjectModal';
import { AdminPanel } from './components/AdminPanel';
import { LiveChatWidget } from './components/LiveChatWidget';
import { GmailControlModal } from './components/GmailControlModal';
import { AuthGate } from './components/AuthGate';
import { PORTFOLIO_DATA } from './data/agencyData';
import { ServiceItem, PortfolioItem } from './types';
import { ShieldCheck, Mail, Sparkles } from 'lucide-react';
import { 
  testFirestoreConnection, 
  savePortfolioToFirestore, 
  subscribeToPortfolioFromFirestore,
  subscribeToAuth,
  logoutUser,
  AppUser
} from './lib/firebase';
import { notifyPageView, TARGET_GMAIL } from './lib/gmail';

const STORAGE_KEY = 'khondoker_portfolio_v2';
const AUTH_USER_KEY = 'khondoker_auth_user_v1';

export default function App() {
  const [currentUser, setCurrentUser] = useState<AppUser | null>(() => {
    try {
      const saved = localStorage.getItem(AUTH_USER_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return null;
  });
  const [authLoading, setAuthLoading] = useState(true);

  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [adminOpen, setAdminOpen] = useState(false);
  const [gmailModalOpen, setGmailModalOpen] = useState(false);

  // Initialize portfolio items from localStorage or defaults
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (err) {
      console.error('Failed to load saved portfolio items', err);
    }
    return PORTFOLIO_DATA;
  });

  // Auth state listener & Firestore sync
  useEffect(() => {
    testFirestoreConnection();

    // Subscribe to Firebase Authentication
    const unsubscribeAuth = subscribeToAuth((user) => {
      if (user) {
        setCurrentUser(user);
        try {
          localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
        } catch (e) {}
      }
      setAuthLoading(false);
    });

    // Trigger website page view notification to khondokercreation1@gmail.com
    notifyPageView(window.location.pathname || '/');

    const unsubscribePortfolio = subscribeToPortfolioFromFirestore((firestoreItems) => {
      if (firestoreItems && firestoreItems.length > 0) {
        setPortfolioItems(firestoreItems);
      }
    });

    return () => {
      unsubscribeAuth();
      unsubscribePortfolio();
    };
  }, []);

  const handleLoginSuccess = (user: AppUser) => {
    setCurrentUser(user);
    try {
      localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
    } catch (e) {}
  };

  const handleLogout = async () => {
    try {
      await logoutUser();
    } catch (e) {}
    setCurrentUser(null);
    try {
      localStorage.removeItem(AUTH_USER_KEY);
    } catch (e) {}
  };

  // Persist portfolio items to Firestore and localStorage when changed
  const handleUpdatePortfolio = (updatedItems: PortfolioItem[]) => {
    setPortfolioItems(updatedItems);
    savePortfolioToFirestore(updatedItems);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedItems));
    } catch (err) {
      console.error('Failed to save portfolio items', err);
    }
  };

  const handleResetPortfolio = () => {
    setPortfolioItems(PORTFOLIO_DATA);
    savePortfolioToFirestore(PORTFOLIO_DATA);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (err) {
      console.error('Failed to clear portfolio items', err);
    }
  };

  const handleOpenContactWithService = (service: ServiceItem) => {
    setSelectedService(service);
    setContactModalOpen(true);
  };

  const handleOpenGeneralContact = () => {
    setSelectedService(null);
    setContactModalOpen(true);
  };

  const handleOpenPlanner = () => {
    document.getElementById('estimate')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handlePlannerSuccess = () => {
    // Smooth auto scroll
  };

  // Show Auth Gate if user is not logged in
  if (!currentUser) {
    return <AuthGate onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="min-h-screen bg-[#0B0F17] text-white selection:bg-[#00F2FE] selection:text-black font-['Plus_Jakarta_Sans',sans-serif] relative">
      {/* Sticky Navigation */}
      <Navbar
        onOpenContact={handleOpenGeneralContact}
        onOpenPlanner={handleOpenPlanner}
        onOpenAdmin={() => setAdminOpen(true)}
        currentUser={currentUser}
        onLogout={handleLogout}
      />

      {/* Main Content Sections */}
      <main>
        {/* 1. Hero UI Component */}
        <Hero
          onOpenContact={handleOpenGeneralContact}
          onOpenPlanner={handleOpenPlanner}
        />

        {/* 2. Services UI Grid */}
        <ServicesGrid onSelectService={handleOpenContactWithService} />

        {/* 3. Portfolio Showcase Gallery UI */}
        <PortfolioGallery
          items={portfolioItems}
          onOpenAdmin={() => setAdminOpen(true)}
        />

        {/* 4. Stats & Trust Badge Section */}
        <StatsSection />

        {/* 5. Interactive Project Scope & Instant Estimator */}
        <InteractivePlanner onSuccess={handlePlannerSuccess} />

        {/* 6. Testimonials & Client Endorsements */}
        <Testimonials />

        {/* 7. Call To Action Banner UI */}
        <CtaBanner
          onOpenContact={handleOpenGeneralContact}
          onOpenPlanner={handleOpenPlanner}
        />
      </main>

      {/* 8. Clean Footer UI */}
      <Footer />

      {/* Floating Bottom-Right Controls */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col sm:flex-row items-end sm:items-center gap-2">
        <button
          onClick={() => setGmailModalOpen(true)}
          className="flex items-center gap-2 px-3.5 py-2.5 rounded-full bg-[#161C28]/95 hover:bg-[#121824] border border-[#00F2FE]/50 hover:border-[#00F2FE] text-white font-extrabold text-xs shadow-[0_10px_25px_rgba(0,0,0,0.5)] hover:shadow-[0_0_25px_rgba(0,242,254,0.4)] backdrop-blur-md transition-all scale-100 hover:scale-105 active:scale-95 group"
          id="floating-gmail-btn"
          title="Gmail Alert Status & Setup"
        >
          <div className="w-6 h-6 rounded-full bg-[#00F2FE] text-black flex items-center justify-center font-extrabold">
            <Mail className="w-3.5 h-3.5" />
          </div>
          <span className="hidden sm:inline text-xs font-bold">Gmail SMS Alerts: <span className="text-[#00F2FE]">Active</span></span>
        </button>

        <button
          onClick={() => setAdminOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#161C28]/90 hover:bg-[#121824] border border-[#2A3447] hover:border-[#00F2FE] text-white font-extrabold text-xs shadow-[0_10px_25px_rgba(0,0,0,0.5)] hover:shadow-[0_0_25px_rgba(0,242,254,0.4)] backdrop-blur-md transition-all scale-100 hover:scale-105 active:scale-95 group"
          id="floating-admin-btn"
        >
          <div className="w-6 h-6 rounded-full bg-[#1F293D] text-[#00F2FE] flex items-center justify-center font-extrabold">
            <ShieldCheck className="w-3.5 h-3.5" />
          </div>
          <span className="hidden sm:inline">Admin Panel</span>
        </button>
      </div>

      {/* Project Inquiry Modal */}
      <ProjectModal
        isOpen={contactModalOpen}
        onClose={() => setContactModalOpen(false)}
        preselectedService={selectedService}
      />

      {/* Admin Panel Modal for Selected Work & Case Studies */}
      <AdminPanel
        isOpen={adminOpen}
        onClose={() => setAdminOpen(false)}
        portfolioItems={portfolioItems}
        onUpdatePortfolio={handleUpdatePortfolio}
        onResetPortfolio={handleResetPortfolio}
      />

      {/* Gmail Control & Status Modal */}
      <GmailControlModal
        isOpen={gmailModalOpen}
        onClose={() => setGmailModalOpen(false)}
      />

      {/* Firebase Firestore Realtime Live Chat Widget */}
      <LiveChatWidget />
    </div>
  );
}

