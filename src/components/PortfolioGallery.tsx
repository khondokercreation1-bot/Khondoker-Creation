import React, { useState } from 'react';
import { PORTFOLIO_DATA } from '../data/agencyData';
import { CategoryType, PortfolioItem } from '../types';
import { ExternalLink, Eye, Sparkles, X, Tag, Calendar, UserCheck, Settings, Image as ImageIcon } from 'lucide-react';
import fallbackCyberImg from '../assets/images/cyber_3d_logo_1785850040412.jpg';

interface PortfolioGalleryProps {
  items?: PortfolioItem[];
  onOpenAdmin?: () => void;
}

export const PortfolioGallery: React.FC<PortfolioGalleryProps> = ({ items, onOpenAdmin }) => {
  const [activeCategory, setActiveCategory] = useState<CategoryType>('All');
  const [selectedProject, setSelectedProject] = useState<PortfolioItem | null>(null);

  const portfolioList = items || PORTFOLIO_DATA;
  const categories: CategoryType[] = [
    'All',
    'Logo Design',
    'Social Media Post',
    'Label Design',
    'Packaging Design',
    'Box Design',
    'Pattern Design',
    'Techpack Design',
    'Branding',
    '3D Mockups',
    'Social Media',
    'Posters',
    'UI Visuals'
  ];

  const filteredProjects = activeCategory === 'All'
    ? portfolioList
    : portfolioList.filter((item) => item.category === activeCategory);

  return (
    <section id="work" className="py-20 md:py-28 bg-[#0B0F17] relative border-t border-[#2A3447]/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#161C28] border border-[#2A3447] text-xs font-bold text-[#00F2FE] uppercase tracking-wider">
            Curated Visual Portfolio
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl tracking-tight text-white">
            Selected Work & <span className="text-[#00F2FE]">Case Studies</span>
          </h2>
          <p className="text-[#94A3B8] text-base leading-relaxed">
            A curated showcase of recent client projects spanning dark aesthetic branding, photorealistic 3D renders, and digital marketing graphics.
          </p>

          {/* Quick Admin Access Button */}
          {onOpenAdmin && (
            <div className="pt-2">
              <button
                onClick={onOpenAdmin}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#161C28] hover:bg-[#1F293D] border border-[#00F2FE]/40 hover:border-[#00F2FE] text-xs font-bold text-[#00F2FE] hover:text-white transition-all shadow-[0_0_15px_rgba(0,242,254,0.15)] group"
                id="open-admin-from-section"
              >
                <Settings className="w-4 h-4 group-hover:rotate-45 transition-transform" />
                <span>Admin Panel: Edit Section Images & Content</span>
                <ImageIcon className="w-3.5 h-3.5 text-[#00F2FE]" />
              </button>
            </div>
          )}
        </div>

        {/* Filter Tabs Bar: Pill-style */}
        <div className="flex items-center justify-center flex-wrap gap-2 sm:gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-5 py-2 rounded-full text-xs font-bold transition-all duration-300 ${
                activeCategory === category
                  ? 'bg-[#00F2FE] text-black shadow-[0_0_20px_rgba(0,242,254,0.4)] scale-105'
                  : 'bg-[#161C28] text-[#94A3B8] hover:text-white border border-[#2A3447] hover:border-[#00F2FE]/40'
              }`}
              id={`filter-tab-${category.toLowerCase().replace(/\s+/g, '-')}`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Bento Grid Showcase */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredProjects.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedProject(item)}
              className={`group relative rounded-2xl overflow-hidden bg-[#161C28] border border-[#2A3447] hover:border-[#00F2FE]/60 transition-all duration-500 cursor-pointer shadow-lg hover:shadow-[0_15px_35px_-10px_rgba(0,242,254,0.3)] ${
                item.gridSpan || 'col-span-1'
              }`}
              id={`portfolio-card-${item.id}`}
            >
              <div className="relative w-full h-72 md:h-full min-h-[300px] overflow-hidden">
                <img
                  src={item.image || fallbackCyberImg}
                  alt={item.title || 'Creative Showcase'}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = fallbackCyberImg;
                  }}
                />

                {/* Dark Vignette Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F17] via-[#0B0F17]/40 to-transparent opacity-85 group-hover:opacity-90 transition-opacity" />

                {/* Top Category Pill */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-[#0B0F17]/80 text-[#00F2FE] border border-[#2A3447] backdrop-blur-md">
                    {item.category}
                  </span>
                </div>

                {/* Top Right Quick Inspection Icon */}
                <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-9 h-9 rounded-full bg-[#00F2FE] text-black flex items-center justify-center shadow-lg">
                    <Eye className="w-4 h-4" />
                  </div>
                </div>

                {/* Bottom Content Info */}
                <div className="absolute bottom-0 left-0 right-0 p-6 z-10 space-y-2 transform translate-y-1 group-hover:translate-y-0 transition-transform">
                  <div className="flex items-center gap-2 text-xs text-[#94A3B8] font-mono">
                    <span>{item.client}</span>
                    <span>•</span>
                    <span>{item.year}</span>
                  </div>
                  <h3 className="font-display font-bold text-xl sm:text-2xl text-white group-hover:text-[#00F2FE] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#94A3B8] line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>

                  {/* Tags */}
                  <div className="pt-2 flex flex-wrap gap-1.5">
                    {item.tags.map((tag, idx) => (
                      <span key={idx} className="px-2 py-0.5 rounded-md bg-[#2A3447]/60 text-[10px] text-gray-300 font-medium">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox / Project Details Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-lg animate-in fade-in duration-200">
          <div className="relative w-full max-w-4xl bg-[#161C28] border border-[#2A3447] rounded-2xl overflow-hidden shadow-2xl max-h-[92vh] flex flex-col md:flex-row">
            
            {/* Modal Image View */}
            <div className="w-full md:w-1/2 relative bg-[#0B0F17] min-h-[250px] md:min-h-[450px]">
              <img
                src={selectedProject.image || fallbackCyberImg}
                alt={selectedProject.title || 'Creative Showcase'}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = fallbackCyberImg;
                }}
              />
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#00F2FE] text-black">
                  {selectedProject.category}
                </span>
              </div>
            </div>

            {/* Modal Details Panel */}
            <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto space-y-6">
              <button
                onClick={() => setSelectedProject(null)}
                className="self-end p-2 rounded-xl bg-[#0B0F17] border border-[#2A3447] text-gray-400 hover:text-white hover:border-[#00F2FE]"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-4">
                <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-white">
                  {selectedProject.title}
                </h3>

                <div className="grid grid-cols-2 gap-3 p-3 rounded-xl bg-[#0B0F17] border border-[#2A3447] text-xs">
                  <div>
                    <span className="text-[#94A3B8] block text-[10px] uppercase font-mono">Client</span>
                    <span className="text-white font-bold flex items-center gap-1.5 mt-0.5">
                      <UserCheck className="w-3.5 h-3.5 text-[#00F2FE]" /> {selectedProject.client}
                    </span>
                  </div>
                  <div>
                    <span className="text-[#94A3B8] block text-[10px] uppercase font-mono">Year</span>
                    <span className="text-white font-bold flex items-center gap-1.5 mt-0.5">
                      <Calendar className="w-3.5 h-3.5 text-[#00F2FE]" /> {selectedProject.year}
                    </span>
                  </div>
                </div>

                <p className="text-sm text-[#94A3B8] leading-relaxed">
                  {selectedProject.description}
                </p>

                <div>
                  <span className="text-xs uppercase font-mono font-bold text-white mb-2 block flex items-center gap-1.5">
                    <Tag className="w-3.5 h-3.5 text-[#00F2FE]" /> Creative Disciplines
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tags.map((tag, idx) => (
                      <span key={idx} className="px-3 py-1 rounded-lg bg-[#2A3447] text-xs text-[#00F2FE] font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#2A3447]">
                <button
                  onClick={() => {
                    setSelectedProject(null);
                    // scroll to contact or estimate
                    document.getElementById('estimate')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full py-3 rounded-xl bg-[#00F2FE] hover:bg-[#00E5FF] text-black font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,242,254,0.4)]"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Request Similar Custom Design</span>
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>

            </div>
          </div>
        </div>
      )}
    </section>
  );
};
