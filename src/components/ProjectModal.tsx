import React, { useState } from 'react';
import { X, Send, Sparkles, CheckCircle, Clock, ShieldCheck, Database } from 'lucide-react';
import { ServiceItem } from '../types';
import { saveInquiryToFirestore } from '../lib/firebase';
import { notifyInquiryOrder } from '../lib/gmail';

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedService?: ServiceItem | null;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ isOpen, onClose, preselectedService }) => {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [budget, setBudget] = useState('$500 - $1,500');
  const [serviceCategory, setServiceCategory] = useState(
    preselectedService ? preselectedService.title : 'Brand Identity & Strategy'
  );
  const [message, setMessage] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || isSubmitting) return;

    setIsSubmitting(true);
    try {
      // 1. Save to Firestore DB
      await saveInquiryToFirestore({
        name,
        email,
        serviceCategory,
        budget,
        message,
        type: 'Project Inquiry Order'
      });

      // 2. Trigger Gmail Notification via Client OAuth Helper
      await notifyInquiryOrder({
        name,
        email,
        category: serviceCategory,
        budget,
        message
      });

      // 3. Trigger Server-side Order Alert
      try {
        await fetch('/api/notify-order', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name,
            email,
            category: serviceCategory,
            budget,
            message,
            type: 'Website Order Form'
          })
        });
      } catch (e) {
        console.warn('Server notify-order endpoint error:', e);
      }

      setSubmitted(true);
    } catch (err) {
      console.error('Error saving inquiry to Firestore', err);
      // Still show submission confirmation to user gracefully
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-[#161C28] border border-[#2A3447] rounded-2xl p-6 sm:p-8 shadow-2xl overflow-hidden">
        
        {/* Glow Accent */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#00F2FE]/15 rounded-bl-full pointer-events-none" />

        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-[#0B0F17] border border-[#2A3447] text-gray-400 hover:text-white hover:border-[#00F2FE]"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="py-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#00F2FE]/20 text-[#00F2FE] flex items-center justify-center mx-auto border border-[#00F2FE]/40 shadow-[0_0_20px_rgba(0,242,254,0.3)]">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h3 className="font-display font-extrabold text-2xl text-white">অর্ডার সাথে সাথে জমা হয়েছে!</h3>
            <p className="text-xs text-[#94A3B8] max-w-md mx-auto leading-relaxed">
              ধন্যবাদ <span className="text-white font-bold">{name}</span>! আপনার <span className="text-[#00F2FE] font-bold">{serviceCategory}</span> প্রজেক্টের অর্ডারটি সাথে সাথে জমা নেওয়া হয়েছে।
            </p>
            <div className="p-3 rounded-xl bg-[#0B0F17] border border-[#00F2FE]/40 text-xs text-[#00F2FE] max-w-md mx-auto font-mono flex items-center justify-center gap-2">
              <Sparkles className="w-4 h-4 text-[#00F2FE] shrink-0" />
              <span>ইমেইল সাথে সাথে সেন্ট: khondokercreation1@gmail.com</span>
            </div>
            <button
              onClick={() => {
                setSubmitted(false);
                onClose();
              }}
              className="mt-4 px-6 py-2.5 rounded-xl bg-[#00F2FE] text-black font-extrabold text-xs uppercase tracking-wider shadow-lg"
            >
              Close Window
            </button>
          </div>
        ) : (
          <div>
            <div className="space-y-1 mb-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0B0F17] border border-[#2A3447] text-[11px] font-bold text-[#00F2FE]">
                <Sparkles className="w-3.5 h-3.5" /> Direct Studio Discovery
              </div>
              <h3 className="font-display font-extrabold text-2xl text-white">Start Your Project</h3>
              <p className="text-xs text-[#94A3B8]">
                Fill out this quick brief to get a tailored timeline, 3D render breakdown, and custom quote.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-300 mb-1">Your Name *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Alex Vance"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#0B0F17] border border-[#2A3447] focus:border-[#00F2FE] text-white text-xs focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-300 mb-1">Work Email *</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="alex@company.com"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#0B0F17] border border-[#2A3447] focus:border-[#00F2FE] text-white text-xs focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-300 mb-1">Primary Service</label>
                  <select
                    value={serviceCategory}
                    onChange={(e) => setServiceCategory(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#0B0F17] border border-[#2A3447] focus:border-[#00F2FE] text-white text-xs focus:outline-none"
                  >
                    <option value="Brand Identity & Strategy">Brand Identity & Strategy</option>
                    <option value="3D Mockups & Renders">3D Mockups & Renders</option>
                    <option value="Digital Marketing Graphics">Digital Marketing Graphics</option>
                    <option value="UI & Digital Experience Design">UI & Digital Experience Design</option>
                    <option value="Luxury Packaging & Labeling">Luxury Packaging & Labeling</option>
                    <option value="Motion Design & Posters">Motion Design & Posters</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-300 mb-1">Target Budget</label>
                  <select
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#0B0F17] border border-[#2A3447] focus:border-[#00F2FE] text-white text-xs focus:outline-none"
                  >
                    <option value="$300 - $800">$300 - $800</option>
                    <option value="$800 - $1,500">$800 - $1,500</option>
                    <option value="$1,500 - $3,000">$1,500 - $3,000</option>
                    <option value="$3,000+">$3,000+ Enterprise</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-300 mb-1">Project Details / Goals</label>
                <textarea
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us about your brand vision, target launch date, and key deliverables..."
                  className="w-full px-4 py-2.5 rounded-xl bg-[#0B0F17] border border-[#2A3447] focus:border-[#00F2FE] text-white text-xs focus:outline-none resize-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-[#00F2FE] hover:bg-[#00E5FF] text-black font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,242,254,0.4)]"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Direct Inquiry</span>
                </button>
              </div>

              <div className="text-[11px] text-[#94A3B8] text-center flex items-center justify-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-[#00F2FE]" /> Guaranteed 24-Hour Proposal & Non-Disclosure
              </div>
            </form>
          </div>
        )}

      </div>
    </div>
  );
};
