import React, { useState } from 'react';
import { Palette, Box, Sparkles, Layout, PackageCheck, Zap, Shirt, ArrowRight, CheckCircle, X } from 'lucide-react';
import { SERVICES_DATA } from '../data/agencyData';
import { ServiceItem } from '../types';

interface ServicesGridProps {
  onSelectService: (service: ServiceItem) => void;
}

export const ServicesGrid: React.FC<ServicesGridProps> = ({ onSelectService }) => {
  const [activeModalService, setActiveModalService] = useState<ServiceItem | null>(null);

  // Icon mapping helper
  const renderIcon = (iconName: string) => {
    const props = { className: "w-6 h-6 text-[#00F2FE]" };
    switch (iconName) {
      case 'Palette': return <Palette {...props} />;
      case 'Box': return <Box {...props} />;
      case 'Sparkles': return <Sparkles {...props} />;
      case 'Layout': return <Layout {...props} />;
      case 'PackageCheck': return <PackageCheck {...props} />;
      case 'Zap': return <Zap {...props} />;
      case 'Shirt': return <Shirt {...props} />;
      default: return <Palette {...props} />;
    }
  };

  return (
    <section id="services" className="py-20 md:py-28 bg-[#0B0F17] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#161C28] border border-[#2A3447] text-xs font-bold text-[#00F2FE] uppercase tracking-wider">
            Capabilities & Offerings
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl tracking-tight text-white">
            High-Performance <br />
            <span className="text-[#00F2FE]">Graphic Design Solutions</span>
          </h2>
          <p className="text-[#94A3B8] text-base leading-relaxed">
            From luxury brand identities to photorealistic 3D product renders, we combine aesthetic perfection with conversion-focused visual strategy.
          </p>
        </div>

        {/* 3-Column Interactive Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {SERVICES_DATA.map((service) => (
            <div
              key={service.id}
              onClick={() => setActiveModalService(service)}
              className="group relative bg-[#161C28] rounded-2xl p-7 border border-[#2A3447] hover:border-[#00F2FE]/60 transition-all duration-300 hover:shadow-[0_10px_30px_-10px_rgba(0,242,254,0.25)] flex flex-col justify-between cursor-pointer transform hover:-translate-y-1 overflow-hidden"
              id={`service-card-${service.id}`}
            >
              {/* Subtle Ambient Hover Light Corner */}
              <div className="absolute top-0 right-0 w-28 h-28 bg-[#00F2FE]/5 rounded-bl-full pointer-events-none group-hover:bg-[#00F2FE]/15 transition-colors" />

              <div>
                {/* Top Row: Icon & Tag */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-xl bg-[#0B0F17] border border-[#2A3447] group-hover:border-[#00F2FE]/50 flex items-center justify-center transition-colors shadow-inner">
                    {renderIcon(service.iconName)}
                  </div>
                  <span className="text-[10px] uppercase tracking-widest font-mono text-[#94A3B8] group-hover:text-[#00F2FE] transition-colors">
                    {service.subtitle}
                  </span>
                </div>

                {/* Bold Title */}
                <h3 className="font-display font-bold text-xl text-white group-hover:text-[#00F2FE] transition-colors mb-3">
                  {service.title}
                </h3>

                {/* Concise Description */}
                <p className="text-sm text-[#94A3B8] leading-relaxed mb-6">
                  {service.description}
                </p>

                {/* Feature Pills */}
                <div className="space-y-2 mb-6">
                  {service.features.slice(0, 3).map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-gray-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00F2FE]" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Row: Arrow Link Icon */}
              <div className="pt-4 border-t border-[#2A3447]/60 flex items-center justify-between">
                <span className="text-xs font-bold text-[#94A3B8] group-hover:text-white transition-colors">
                  Explore Service
                </span>
                <div className="w-9 h-9 rounded-full bg-[#0B0F17] border border-[#2A3447] group-hover:border-[#00F2FE] group-hover:bg-[#00F2FE] text-[#94A3B8] group-hover:text-black flex items-center justify-center transition-all duration-300">
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-0.5" />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Service Details Modal */}
      {activeModalService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl bg-[#161C28] border border-[#2A3447] rounded-2xl p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setActiveModalService(null)}
              className="absolute top-5 right-5 p-2 rounded-xl bg-[#0B0F17] border border-[#2A3447] text-gray-400 hover:text-white hover:border-[#00F2FE]"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-[#0B0F17] border border-[#00F2FE]/40 flex items-center justify-center">
                {renderIcon(activeModalService.iconName)}
              </div>
              <div>
                <span className="text-xs uppercase font-mono text-[#00F2FE]">{activeModalService.subtitle}</span>
                <h3 className="font-display font-extrabold text-2xl text-white">{activeModalService.title}</h3>
              </div>
            </div>

            <p className="text-sm text-[#94A3B8] leading-relaxed mb-6">
              {activeModalService.description}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              <div className="bg-[#0B0F17] p-4 rounded-xl border border-[#2A3447]">
                <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#00F2FE]" /> Included Scope
                </h4>
                <ul className="space-y-2">
                  {activeModalService.features.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-xs text-[#94A3B8]">
                      <CheckCircle className="w-3.5 h-3.5 text-[#00F2FE] shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-[#0B0F17] p-4 rounded-xl border border-[#2A3447]">
                <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3 flex items-center gap-2">
                  <PackageCheck className="w-4 h-4 text-[#00F2FE]" /> Key Deliverables
                </h4>
                <ul className="space-y-2">
                  {activeModalService.deliverables.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-xs text-[#94A3B8]">
                      <CheckCircle className="w-3.5 h-3.5 text-[#00F2FE] shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => {
                  const s = activeModalService;
                  setActiveModalService(null);
                  onSelectService(s);
                }}
                className="flex-1 py-3 px-6 rounded-xl bg-[#00F2FE] hover:bg-[#00E5FF] text-black font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,242,254,0.4)]"
              >
                <span>Request Quote For {activeModalService.title}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
