import React, { useState } from 'react';
import { ArrowRight, Sparkles, Play, Layers, Eye, CheckCircle2, ShieldCheck } from 'lucide-react';
import { HERO_IMAGE } from '../data/agencyData';

interface HeroProps {
  onOpenContact: () => void;
  onOpenPlanner: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenContact, onOpenPlanner }) => {
  const [activeTab, setActiveTab] = useState<'3D Render' | 'Brand Spec' | 'Lighting'>('3D Render');
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section id="home" className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-radial-glow">
      {/* Background Subtle Mesh Grid & Ambient Light Orbs */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#161C2815_1px,transparent_1px),linear-gradient(to_bottom,#161C2815_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#00F2FE]/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto space-y-6">
          
          {/* Centered Top Glowing Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#161C28] border border-[#2A3447] shadow-[0_0_15px_rgba(0,242,254,0.15)] hover:border-[#00F2FE]/50 transition-all cursor-pointer group" id="hero-glowing-badge">
            <span className="w-2 h-2 rounded-full bg-[#00F2FE] animate-ping" />
            <span className="text-xs font-bold tracking-wide uppercase text-white group-hover:text-[#00F2FE] transition-colors flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#00F2FE]" />
              Complete Graphic Design Solutions
            </span>
          </div>

          {/* Main Display Title */}
          <h1 className="font-display font-extrabold text-4xl sm:text-6xl lg:text-7xl tracking-tight text-white leading-[1.08]" id="hero-display-title">
            Crafting Iconic <br className="hidden sm:inline" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-[#00F2FE] to-[#00E5FF] drop-shadow-[0_0_35px_rgba(0,242,254,0.4)]">
              Visual Identities
            </span>{' '}
            & 3D Designs
          </h1>

          {/* Subtext Block */}
          <p className="text-base sm:text-lg text-[#94A3B8] max-w-2xl mx-auto font-normal leading-relaxed" id="hero-subtext">
            Khondoker Creation is a high-end graphic design studio delivering world-class brand architecture, photorealistic 3D mockups, luxury packaging, and performance marketing assets for ambitious global brands.
          </p>

          {/* Two CTA Buttons */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4" id="hero-cta-buttons">
            {/* Primary Filled Accent Button */}
            <button
              onClick={onOpenContact}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#00F2FE] hover:bg-[#00E5FF] text-black font-extrabold text-sm tracking-wide shadow-[0_0_30px_rgba(0,242,254,0.4)] hover:shadow-[0_0_45px_rgba(0,242,254,0.7)] transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 group"
              id="hero-primary-cta"
            >
              <span>Explore Our Work</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            {/* Secondary Outlined Ghost Button */}
            <button
              onClick={onOpenPlanner}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#161C28] hover:bg-[#2A3447]/60 border border-[#2A3447] hover:border-[#00F2FE]/60 text-white font-bold text-sm tracking-wide transition-all duration-300 flex items-center justify-center gap-2 group"
              id="hero-secondary-cta"
            >
              <Layers className="w-4 h-4 text-[#00F2FE]" />
              <span>Interactive Scope & Quote</span>
            </button>
          </div>

          {/* Micro Trust Indicators */}
          <div className="pt-3 flex items-center justify-center gap-6 text-xs text-[#94A3B8] font-medium">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#00F2FE]" /> 100% Vector & 4K Ready
            </span>
            <span className="hidden sm:flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#00F2FE]" /> NDA Guaranteed
            </span>
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#00F2FE]" /> 24-48h Initial Concepts
            </span>
          </div>

        </div>

        {/* Main Hero Graphic Showcase Container (Large 16:9 Floating Glass Frame) */}
        <div className="mt-12 lg:mt-16 relative max-w-5xl mx-auto" id="hero-graphic-container">
          <div className="relative rounded-2xl p-2 bg-[#161C28]/90 border border-[#2A3447] shadow-[0_20px_60px_-15px_rgba(0,242,254,0.2)] backdrop-blur-xl group overflow-hidden">
            
            {/* Interactive Header Bar inside Showcase Frame */}
            <div className="px-4 py-3 bg-[#0B0F17]/80 rounded-xl mb-2 flex items-center justify-between border border-[#2A3447]/50 text-xs">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-green-500/80 inline-block" />
                <span className="ml-2 font-mono text-[#94A3B8] text-[11px] hidden sm:inline">khondoker-3d-viewport-v2.6.render</span>
              </div>
              
              {/* Interactive Viewport Mode Switches */}
              <div className="flex items-center gap-1 bg-[#161C28] p-1 rounded-lg border border-[#2A3447]">
                {(['3D Render', 'Brand Spec', 'Lighting'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-3 py-1 rounded-md text-[11px] font-semibold transition-all ${
                      activeTab === tab
                        ? 'bg-[#00F2FE] text-black shadow-sm'
                        : 'text-[#94A3B8] hover:text-white'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Main Visual Render Frame */}
            <div className="relative aspect-[16/9] rounded-xl overflow-hidden bg-[#0B0F17] group-hover:border-[#00F2FE]/40 transition-colors">
              <img
                src={HERO_IMAGE}
                alt="Khondoker Creation 3D Studio Mockup Showcase"
                className={`w-full h-full object-cover transition-transform duration-700 ${isPlaying ? 'scale-105 filter brightness-110' : 'group-hover:scale-102'}`}
                referrerPolicy="no-referrer"
              />

              {/* Gradient Vignette Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F17] via-transparent to-transparent opacity-80" />

              {/* Floating Interactive Glass Overlay Badges */}
              <div className="absolute top-4 left-4 sm:top-6 sm:left-6 p-3 sm:p-4 rounded-xl glass-card border border-[#2A3447] space-y-1.5 text-left max-w-[200px] sm:max-w-[240px]">
                <div className="flex items-center gap-2 text-[10px] uppercase font-bold text-[#00F2FE] tracking-wider">
                  <span className="w-2 h-2 rounded-full bg-[#00F2FE] animate-pulse" />
                  Live Preview
                </div>
                <div className="text-xs sm:text-sm font-bold text-white">Merchandising & Marketing Specs</div>
                <div className="text-[11px] text-[#94A3B8] flex items-center justify-between">
                  <span>Product Visuals</span>
                  <span className="font-mono text-white">4K Output</span>
                </div>
              </div>

              {/* Bottom Right Spec Badge */}
              <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 p-3 sm:p-4 rounded-xl glass-card border border-[#2A3447] flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#00F2FE]/20 border border-[#00F2FE]/50 flex items-center justify-center text-[#00F2FE]">
                  <Eye className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <div className="text-xs font-bold text-white">Studio Canvas v4.2</div>
                  <div className="text-[11px] text-[#00F2FE] font-mono">100% Vector / 8K Output</div>
                </div>
              </div>

              {/* Center Interactive Play / Dynamic Lighting Overlay Toggle */}
              <div className="absolute inset-0 flex items-center justify-center">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#00F2FE]/90 hover:bg-[#00F2FE] text-black flex items-center justify-center shadow-[0_0_40px_rgba(0,242,254,0.6)] hover:scale-110 transition-all duration-300 group/btn cursor-pointer"
                  title="Toggle Interactive Lighting Render"
                  id="hero-play-render-btn"
                >
                  <Play className={`w-8 h-8 sm:w-10 sm:h-10 fill-black ml-1 transition-transform ${isPlaying ? 'scale-90' : ''}`} />
                </button>
              </div>

            </div>
          </div>

          {/* Glowing Accent Shadow behind container */}
          <div className="absolute -bottom-6 left-10 right-10 h-12 bg-[#00F2FE]/20 blur-3xl -z-10 rounded-full" />
        </div>

      </div>
    </section>
  );
};
