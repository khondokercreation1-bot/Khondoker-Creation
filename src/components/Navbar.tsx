import React, { useState, useEffect } from 'react';
import { Sparkles, Menu, X, ArrowUpRight, ShieldCheck, LogOut, User as UserIcon } from 'lucide-react';
import { AppUser } from '../lib/firebase';

interface NavbarProps {
  onOpenContact: () => void;
  onOpenPlanner: () => void;
  onOpenAdmin?: () => void;
  currentUser?: AppUser | null;
  onLogout?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  onOpenContact, 
  onOpenPlanner, 
  onOpenAdmin,
  currentUser,
  onLogout 
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Services', href: '#services' },
    { name: 'Work', href: '#work' },
    { name: 'Stats', href: '#stats' },
    { name: 'Estimate', href: '#estimate' },
    { name: 'Reviews', href: '#reviews' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0B0F17]/85 backdrop-blur-md border-b border-[#2A3447]/60 py-3.5 shadow-2xl'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Left: Brand Logo */}
          <a
            href="#home"
            className="flex items-center gap-3 group focus:outline-none"
            id="nav-logo-link"
          >
            <div className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-[#161C28] border border-[#2A3447] group-hover:border-[#00F2FE]/60 transition-colors">
              <span className="w-2.5 h-2.5 rounded-full bg-[#00F2FE] animate-pulse glow-cyan-sm" />
              <div className="absolute inset-0 rounded-xl bg-[#00F2FE]/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="flex flex-col">
              <span className="font-display font-extrabold text-lg sm:text-xl tracking-tight text-white group-hover:text-[#00F2FE] transition-colors">
                Khondoker Creation
              </span>
              <span className="text-[10px] uppercase tracking-widest text-[#94A3B8] -mt-1 font-semibold flex items-center gap-1">
                <ShieldCheck className="w-2.5 h-2.5 text-[#00F2FE]" /> Studio UI
              </span>
            </div>
          </a>

          {/* Center: Desktop Nav Items */}
          <nav className="hidden md:flex items-center gap-1 bg-[#161C28]/80 backdrop-blur-lg border border-[#2A3447]/80 rounded-full px-5 py-1.5 shadow-inner">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="px-4 py-1.5 text-xs font-semibold text-[#94A3B8] hover:text-white hover:bg-[#2A3447]/50 rounded-full transition-all duration-200"
                id={`nav-link-${link.name.toLowerCase()}`}
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right: User Profile & Actions */}
          <div className="hidden md:flex items-center gap-3">
            {currentUser && (
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#161C28] border border-[#2A3447]">
                <div className="w-6 h-6 rounded-full bg-[#00F2FE] text-black font-extrabold text-[10px] flex items-center justify-center shrink-0">
                  {currentUser.displayName ? currentUser.displayName.charAt(0).toUpperCase() : 'U'}
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-[11px] font-bold text-white max-w-[110px] truncate leading-tight">
                    {currentUser.displayName || 'User'}
                  </span>
                  <span className="text-[9px] text-[#00F2FE] truncate max-w-[110px] leading-tight">
                    Logged In
                  </span>
                </div>
                {onLogout && (
                  <button
                    onClick={onLogout}
                    className="ml-1 p-1 rounded-full text-gray-400 hover:text-rose-400 hover:bg-rose-500/10 transition-all"
                    title="Sign Out / Log Out"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            )}

            {onOpenAdmin && (
              <button
                onClick={onOpenAdmin}
                className="px-3 py-1.5 rounded-full bg-[#161C28] hover:bg-[#2A3447] text-[#00F2FE] border border-[#00F2FE]/30 hover:border-[#00F2FE] text-xs font-bold transition-all flex items-center gap-1.5"
                id="nav-admin-btn"
                title="Admin Panel: Manage Work Images"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-[#00F2FE]" />
                <span>Admin</span>
              </button>
            )}
            <button
              onClick={onOpenPlanner}
              className="text-xs font-semibold text-[#94A3B8] hover:text-[#00F2FE] px-2.5 py-2 transition-colors flex items-center gap-1"
              id="nav-planner-btn"
            >
              <Sparkles className="w-3.5 h-3.5" /> Quote Calc
            </button>
            <button
              onClick={onOpenContact}
              className="relative inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold text-black bg-[#00F2FE] hover:bg-[#00E5FF] transition-all duration-300 shadow-[0_0_20px_rgba(0,242,254,0.35)] hover:shadow-[0_0_30px_rgba(0,242,254,0.6)] hover:scale-[1.02] active:scale-[0.98]"
              id="nav-get-started-btn"
            >
              <span>Get Started</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl bg-[#161C28] border border-[#2A3447] text-[#94A3B8] hover:text-white flex items-center gap-2"
            aria-label="Toggle menu"
            id="nav-mobile-toggle"
          >
            {currentUser && (
              <div className="w-5 h-5 rounded-full bg-[#00F2FE] text-black font-extrabold text-[10px] flex items-center justify-center">
                {currentUser.displayName ? currentUser.displayName.charAt(0).toUpperCase() : 'U'}
              </div>
            )}
            {mobileMenuOpen ? <X className="w-5 h-5 text-[#00F2FE]" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0B0F17]/95 backdrop-blur-xl border-b border-[#2A3447] px-6 pt-4 pb-6 mt-3 space-y-4 shadow-2xl animate-in slide-in-from-top duration-200">
          {currentUser && (
            <div className="p-3 rounded-xl bg-[#161C28] border border-[#2A3447] flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#00F2FE] text-black font-extrabold text-xs flex items-center justify-center">
                  {currentUser.displayName ? currentUser.displayName.charAt(0).toUpperCase() : 'U'}
                </div>
                <div>
                  <p className="text-xs font-bold text-white">{currentUser.displayName || 'Logged User'}</p>
                  <p className="text-[10px] text-gray-400">{currentUser.email || 'Verified Account'}</p>
                </div>
              </div>
              {onLogout && (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onLogout();
                  }}
                  className="px-2.5 py-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 text-xs font-bold flex items-center gap-1"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Logout</span>
                </button>
              )}
            </div>
          )}

          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2.5 rounded-lg text-sm font-semibold text-[#94A3B8] hover:text-white hover:bg-[#161C28] transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>
          <div className="pt-2 border-t border-[#2A3447]/60 flex flex-col gap-2">
            {onOpenAdmin && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAdmin();
                }}
                className="w-full py-2.5 rounded-xl bg-[#161C28] border border-[#00F2FE]/40 text-xs font-bold text-[#00F2FE] hover:bg-[#2A3447] flex items-center justify-center gap-2"
              >
                <ShieldCheck className="w-4 h-4 text-[#00F2FE]" /> Admin Panel: Edit Work Images
              </button>
            )}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenPlanner();
              }}
              className="w-full py-2.5 rounded-xl border border-[#2A3447] text-xs font-bold text-[#94A3B8] hover:text-white hover:bg-[#161C28] flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-[#00F2FE]" /> Quick Project Calculator
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenContact();
              }}
              className="w-full py-3 rounded-xl bg-[#00F2FE] text-black text-xs font-extrabold flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,242,254,0.4)]"
            >
              <span>Get Started</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
