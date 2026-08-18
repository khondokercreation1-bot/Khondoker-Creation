import React from 'react';
import { TESTIMONIALS_DATA } from '../data/agencyData';
import { Star, Quote, Sparkles } from 'lucide-react';

export const Testimonials: React.FC = () => {
  return (
    <section id="reviews" className="py-20 md:py-28 bg-[#0B0F17] relative border-t border-[#2A3447]/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#161C28] border border-[#2A3447] text-xs font-bold text-[#00F2FE] uppercase tracking-wider">
            Verified Endorsements
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl tracking-tight text-white">
            What Clients Say About <br />
            <span className="text-[#00F2FE]">Khondoker Creation</span>
          </h2>
          <p className="text-[#94A3B8] text-base leading-relaxed">
            Read how our luxury dark aesthetics, 3D renders, and precise brand execution transformed our clients' market presence.
          </p>
        </div>

        {/* 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS_DATA.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-[#161C28] rounded-2xl p-7 border border-[#2A3447] hover:border-[#00F2FE]/50 transition-all duration-300 relative flex flex-col justify-between group hover:shadow-[0_10px_30px_-10px_rgba(0,242,254,0.2)]"
            >
              <Quote className="w-10 h-10 text-[#00F2FE]/20 absolute top-6 right-6 group-hover:text-[#00F2FE]/40 transition-colors" />

              <div className="space-y-4">
                {/* Rating Stars */}
                <div className="flex items-center gap-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#00F2FE] text-[#00F2FE]" />
                  ))}
                </div>

                {/* Quote Text */}
                <p className="text-sm text-gray-300 leading-relaxed italic">
                  "{testimonial.quote}"
                </p>
              </div>

              {/* Author Info */}
              <div className="pt-6 mt-6 border-t border-[#2A3447]/60 flex items-center gap-3">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.author}
                  className="w-11 h-11 rounded-full object-cover border border-[#00F2FE]/50"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <div className="font-display font-bold text-sm text-white group-hover:text-[#00F2FE] transition-colors">
                    {testimonial.author}
                  </div>
                  <div className="text-xs text-[#94A3B8]">
                    {testimonial.role} • <span className="text-[#00F2FE] font-medium">{testimonial.company}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
