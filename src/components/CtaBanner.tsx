import React from 'react';
import { ArrowUpRight, Sparkles, MessageSquare } from 'lucide-react';

interface CtaBannerProps {
  onOpenContact: () => void;
  onOpenPlanner: () => void;
}

export const CtaBanner: React.FC<CtaBannerProps> = ({ onOpenContact, onOpenPlanner }) => {
  return (
    <section className="py-20 bg-[#0B0F17] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Full-width dark gradient card with radial light effect behind text */}
        <div className="relative rounded-3xl bg-radial-cta border border-[#2A3447] p-8 sm:p-14 lg:p-20 text-center overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
          
          {/* Radial Light Glow Effect */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-[#00F2FE]/20 blur-[130px] rounded-full pointer-events-none" />

          {/* Glowing Top Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0B0F17]/80 border border-[#2A3447] text-xs font-bold text-[#00F2FE] mb-6 shadow-md backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Ready To Elevate Your Brand Presence?</span>
          </div>

          {/* Main Title */}
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight max-w-3xl mx-auto leading-tight">
            Let's Build Extraordinary <br />
            <span className="text-[#00F2FE]">Visual Experiences Together</span>
          </h2>

          <p className="mt-4 text-[#94A3B8] text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Partner with Khondoker Creation to transform your brand identity, product packaging, or 3D visuals into high-converting design assets.
          </p>

          {/* Prominent Centered Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
            <button
              onClick={onOpenContact}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#00F2FE] hover:bg-[#00E5FF] text-black font-extrabold text-sm tracking-wide shadow-[0_0_35px_rgba(0,242,254,0.5)] hover:shadow-[0_0_50px_rgba(0,242,254,0.8)] transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 group"
              id="cta-banner-primary-btn"
            >
              <span>Get Started Now</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>

            <button
              onClick={onOpenPlanner}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#161C28] hover:bg-[#2A3447] border border-[#2A3447] hover:border-[#00F2FE]/60 text-white font-bold text-sm tracking-wide transition-all duration-300 flex items-center justify-center gap-2"
              id="cta-banner-secondary-btn"
            >
              <MessageSquare className="w-4 h-4 text-[#00F2FE]" />
              <span>Calculate Project Quote</span>
            </button>
          </div>

          <div className="mt-6 text-xs text-[#94A3B8]">
            Fast 24h Response • Direct 1-on-1 Designer Communication • 100% Satisfaction
          </div>

        </div>

      </div>
    </section>
  );
};
