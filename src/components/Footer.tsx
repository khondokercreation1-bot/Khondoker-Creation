import React, { useState } from 'react';
import { ArrowUp, Dribbble, Github, Instagram, Linkedin, Twitter, ShieldCheck, Mail, CheckCircle } from 'lucide-react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail('');
  };

  return (
    <footer className="bg-[#0B0F17] border-t border-[#2A3447] pt-16 pb-12 text-[#94A3B8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-[#161C28] border border-[#2A3447] flex items-center justify-center">
                <span className="w-2.5 h-2.5 rounded-full bg-[#00F2FE] animate-pulse glow-cyan-sm" />
              </div>
              <span className="font-display font-extrabold text-xl text-white">
                Khondoker Creation
              </span>
            </div>

            <p className="text-xs text-[#94A3B8] leading-relaxed max-w-sm">
              Full-service graphic design studio specializing in luxury dark-mode visual identities, photorealistic 3D product renders, and performance marketing assets.
            </p>

            <div className="flex items-center gap-1.5 text-xs text-[#94A3B8] font-mono">
              <ShieldCheck className="w-4 h-4 text-[#00F2FE]" />
              <span>Registered Design Studio & Copywriting Entity</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-display font-bold text-xs uppercase tracking-wider text-white">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#home" className="hover:text-[#00F2FE] transition-colors">Home</a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#00F2FE] transition-colors">Services Offerings</a>
              </li>
              <li>
                <a href="#work" className="hover:text-[#00F2FE] transition-colors">Portfolio Showcase</a>
              </li>
              <li>
                <a href="#stats" className="hover:text-[#00F2FE] transition-colors">Studio Experience</a>
              </li>
              <li>
                <a href="#estimate" className="hover:text-[#00F2FE] transition-colors">Project Estimator</a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-[#00F2FE] transition-colors">Client Endorsements</a>
              </li>
            </ul>
          </div>

          {/* Newsletter Join */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="font-display font-bold text-xs uppercase tracking-wider text-white">
              Studio Insights & Case Studies
            </h4>
            <p className="text-xs text-[#94A3B8]">
              Subscribe to receive exclusive monthly 3D design breakdowns & typography trends.
            </p>

            {subscribed ? (
              <div className="p-3 rounded-xl bg-[#161C28] border border-[#00F2FE]/50 text-xs text-[#00F2FE] flex items-center gap-2 font-medium">
                <CheckCircle className="w-4 h-4 shrink-0" />
                <span>Thank you! You are subscribed to Studio Insights.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email..."
                  className="w-full px-3.5 py-2 rounded-xl bg-[#161C28] border border-[#2A3447] focus:border-[#00F2FE] text-xs text-white focus:outline-none"
                />
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-[#00F2FE] text-black font-extrabold text-xs hover:bg-[#00E5FF] transition-colors shrink-0"
                >
                  Join
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Bottom Bar: Copyright & Social Icons & Back to Top */}
        <div className="pt-8 border-t border-[#2A3447]/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          
          <div className="text-[#94A3B8] font-mono">
            © {new Date().getFullYear()} <span className="text-white font-bold">Khondoker Creation</span>. All rights reserved.
          </div>

          {/* Social Media Row */}
          <div className="flex items-center gap-3">
            <a href="https://dribbble.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-[#161C28] border border-[#2A3447] text-[#94A3B8] hover:text-[#00F2FE] hover:border-[#00F2FE] flex items-center justify-center transition-colors" aria-label="Dribbble">
              <Dribbble className="w-4 h-4" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-[#161C28] border border-[#2A3447] text-[#94A3B8] hover:text-[#00F2FE] hover:border-[#00F2FE] flex items-center justify-center transition-colors" aria-label="Instagram">
              <Instagram className="w-4 h-4" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-[#161C28] border border-[#2A3447] text-[#94A3B8] hover:text-[#00F2FE] hover:border-[#00F2FE] flex items-center justify-center transition-colors" aria-label="Twitter">
              <Twitter className="w-4 h-4" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-[#161C28] border border-[#2A3447] text-[#94A3B8] hover:text-[#00F2FE] hover:border-[#00F2FE] flex items-center justify-center transition-colors" aria-label="LinkedIn">
              <Linkedin className="w-4 h-4" />
            </a>
            <a href="https://github.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-[#161C28] border border-[#2A3447] text-[#94A3B8] hover:text-[#00F2FE] hover:border-[#00F2FE] flex items-center justify-center transition-colors" aria-label="GitHub">
              <Github className="w-4 h-4" />
            </a>
          </div>

          {/* Scroll to top button */}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#161C28] border border-[#2A3447] text-[#94A3B8] hover:text-[#00F2FE] hover:border-[#00F2FE] transition-colors"
            id="footer-back-to-top"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>

        </div>

      </div>
    </footer>
  );
};
