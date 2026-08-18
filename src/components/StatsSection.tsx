import React from 'react';
import { STATS_DATA } from '../data/agencyData';
import { Award, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';

export const StatsSection: React.FC = () => {
  return (
    <section id="stats" className="py-16 bg-[#161C28]/60 border-y border-[#2A3447] relative overflow-hidden">
      
      {/* Background Accent Lines */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#00F2FE]/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Horizontal Stats Bar with Divider Lines */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 divide-y md:divide-y-0 md:divide-x divide-[#2A3447]/80">
          {STATS_DATA.map((stat, index) => (
            <div
              key={index}
              className={`pt-6 md:pt-0 ${index !== 0 ? 'md:pl-8' : ''} space-y-2 text-center md:text-left group`}
            >
              <div className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white group-hover:text-[#00F2FE] transition-colors tracking-tight">
                {stat.value}
              </div>
              <div className="text-xs font-bold uppercase tracking-wider text-[#00F2FE]">
                {stat.label}
              </div>
              <p className="text-xs text-[#94A3B8] leading-relaxed max-w-[200px] mx-auto md:mx-0">
                {stat.description}
              </p>
            </div>
          ))}
        </div>

        {/* Software & Quality Badges */}
        <div className="mt-12 pt-8 border-t border-[#2A3447]/60 flex flex-wrap items-center justify-between gap-6 text-xs text-[#94A3B8]">
          <div className="flex items-center gap-2 font-mono text-white">
            <ShieldCheck className="w-4 h-4 text-[#00F2FE]" />
            <span>STUDIO STANDARDS:</span>
          </div>

          <div className="flex flex-wrap items-center gap-4 sm:gap-6 font-semibold">
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#0B0F17] border border-[#2A3447]">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#00F2FE]" /> Adobe Illustrator & Vector
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#0B0F17] border border-[#2A3447]">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#00F2FE]" /> Blender 3D Raytracing
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#0B0F17] border border-[#2A3447]">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#00F2FE]" /> Figma Design Tokens
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#0B0F17] border border-[#2A3447]">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#00F2FE]" /> Photorealistic Photoshop
            </span>
          </div>
        </div>

      </div>
    </section>
  );
};
