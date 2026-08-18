import React, { useState } from 'react';
import { Calculator, CheckCircle, Sparkles, Send, Clock, DollarSign, ArrowRight, Layers, Database } from 'lucide-react';
import { saveInquiryToFirestore } from '../lib/firebase';
import { notifyQuoteEstimate } from '../lib/gmail';

interface InteractivePlannerProps {
  onSuccess: (details: { scope: string[]; total: number; timeline: string }) => void;
}

export const InteractivePlanner: React.FC<InteractivePlannerProps> = ({ onSuccess }) => {
  const [selectedServices, setSelectedServices] = useState<string[]>(['Brand Identity & Logo Mark']);
  const [timelineSpeed, setTimelineSpeed] = useState<'Standard (5-7 Days)' | 'Express (48 Hours)' | 'Rush (24 Hours)'>('Standard (5-7 Days)');
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [projectBrief, setProjectBrief] = useState('');

  const availableOptions = [
    { name: 'Brand Identity & Logo Mark', basePrice: 450, desc: 'Vector logo, color palette & typography setup' },
    { name: '3D Product / Packaging Render', basePrice: 350, desc: 'Photorealistic 3D scene & packaging mockup' },
    { name: 'Complete Brand Guidelines Book', basePrice: 300, desc: 'Multi-page brand strategy & rules PDF' },
    { name: 'Social Media Ad Suite (10 Visuals)', basePrice: 250, desc: 'High-converting ad graphics & carousels' },
    { name: 'Motion Graphic / Animated Poster', basePrice: 200, desc: '4K kinetic typography video & loop' },
    { name: 'UI Landing Page Visual Layout', basePrice: 400, desc: 'Desktop & mobile dark mode UI design' },
  ];

  const toggleService = (name: string) => {
    if (selectedServices.includes(name)) {
      if (selectedServices.length > 1) {
        setSelectedServices(selectedServices.filter(s => s !== name));
      }
    } else {
      setSelectedServices([...selectedServices, name]);
    }
  };

  // Price Calculation
  const subtotal = availableOptions
    .filter(opt => selectedServices.includes(opt.name))
    .reduce((acc, curr) => acc + curr.basePrice, 0);

  const speedMultiplier = timelineSpeed === 'Rush (24 Hours)' ? 1.5 : timelineSpeed === 'Express (48 Hours)' ? 1.25 : 1.0;
  const totalPrice = Math.round(subtotal * speedMultiplier);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !clientEmail || submitting) return;

    setSubmitting(true);
    try {
      await saveInquiryToFirestore({
        name: clientName,
        email: clientEmail,
        serviceCategory: selectedServices.join(', '),
        budget: `$${totalPrice} USD (${timelineSpeed})`,
        message: projectBrief || 'Interactive Quote Estimator Request',
        type: 'Interactive Quote Estimate'
      });

      // Send Gmail Notification
      await notifyQuoteEstimate({
        name: clientName,
        email: clientEmail,
        services: selectedServices,
        total: totalPrice,
        speed: timelineSpeed,
        brief: projectBrief
      });

      // Server-side Order Alert
      try {
        await fetch('/api/notify-order', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: clientName,
            email: clientEmail,
            category: selectedServices.join(', '),
            budget: `$${totalPrice} USD (${timelineSpeed})`,
            message: projectBrief || 'Quote Estimator Order Brief',
            type: 'Interactive Quote Order'
          })
        });
      } catch (e) {
        console.warn('Server notify-order error:', e);
      }

      setSubmitted(true);
      onSuccess({
        scope: selectedServices,
        total: totalPrice,
        timeline: timelineSpeed,
      });
    } catch (err) {
      console.error('Failed to save quote estimate to Firestore', err);
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="estimate" className="py-20 md:py-28 bg-[#0B0F17] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#161C28] border border-[#2A3447] text-xs font-bold text-[#00F2FE] uppercase tracking-wider">
            <Calculator className="w-3.5 h-3.5" /> Instant Estimator & Brief
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl tracking-tight text-white">
            Customize Your <span className="text-[#00F2FE]">Project Scope</span>
          </h2>
          <p className="text-[#94A3B8] text-base leading-relaxed">
            Select the design deliverables you need to calculate real-time estimated investment and turnaround timeline for Khondoker Creation.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Interactive Scope Picker */}
          <div className="lg:col-span-7 bg-[#161C28] rounded-2xl p-6 sm:p-8 border border-[#2A3447] space-y-6">
            <h3 className="font-display font-bold text-xl text-white flex items-center gap-2">
              <Layers className="w-5 h-5 text-[#00F2FE]" /> 1. Select Required Services
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {availableOptions.map((option) => {
                const isSelected = selectedServices.includes(option.name);
                return (
                  <div
                    key={option.name}
                    onClick={() => toggleService(option.name)}
                    className={`p-4 rounded-xl border cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-[#00F2FE]/10 border-[#00F2FE] shadow-[0_0_15px_rgba(0,242,254,0.15)]'
                        : 'bg-[#0B0F17] border-[#2A3447] hover:border-[#94A3B8]/40'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span className={`text-xs font-bold ${isSelected ? 'text-white' : 'text-[#94A3B8]'}`}>
                        {option.name}
                      </span>
                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                        isSelected ? 'bg-[#00F2FE] border-[#00F2FE] text-black' : 'border-[#2A3447]'
                      }`}>
                        {isSelected && <CheckCircle className="w-3.5 h-3.5 fill-black stroke-white" />}
                      </div>
                    </div>
                    <p className="text-[11px] text-[#94A3B8] mt-2">{option.desc}</p>
                    <div className="mt-3 text-xs font-mono font-bold text-[#00F2FE]">
                      ${option.basePrice} USD
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Timeline Speed Selector */}
            <div className="pt-4 border-t border-[#2A3447] space-y-3">
              <h3 className="font-display font-bold text-sm text-white flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#00F2FE]" /> 2. Desired Turnaround Speed
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {(['Standard (5-7 Days)', 'Express (48 Hours)', 'Rush (24 Hours)'] as const).map((speed) => (
                  <button
                    key={speed}
                    type="button"
                    onClick={() => setTimelineSpeed(speed)}
                    className={`py-2.5 px-3 rounded-xl text-xs font-bold border transition-all ${
                      timelineSpeed === speed
                        ? 'bg-[#00F2FE] text-black border-[#00F2FE] shadow-md'
                        : 'bg-[#0B0F17] text-[#94A3B8] border-[#2A3447] hover:text-white'
                    }`}
                  >
                    {speed}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Quote Summary & Direct Brief Submission */}
          <div className="lg:col-span-5 bg-[#161C28] rounded-2xl p-6 sm:p-8 border border-[#2A3447] space-y-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#00F2FE]/10 rounded-bl-full pointer-events-none" />

            <div className="border-b border-[#2A3447] pb-4">
              <div className="text-xs uppercase font-mono text-[#00F2FE] tracking-wider">Estimated Investment</div>
              <div className="font-display font-extrabold text-4xl text-white mt-1 flex items-baseline gap-1">
                <span>${totalPrice}</span>
                <span className="text-xs font-normal text-[#94A3B8]">USD approx</span>
              </div>
              <div className="text-xs text-[#94A3B8] mt-1 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#00F2FE]" /> Speed: <span className="text-white font-semibold">{timelineSpeed}</span>
              </div>
            </div>

            {/* Selected Summary List */}
            <div className="space-y-2 text-xs">
              <div className="font-bold text-white uppercase font-mono text-[11px] text-[#94A3B8]">
                Selected Scope ({selectedServices.length}):
              </div>
              <ul className="space-y-1.5 max-h-32 overflow-y-auto pr-1">
                {selectedServices.map((service, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-gray-300 bg-[#0B0F17] px-3 py-1.5 rounded-lg border border-[#2A3447]">
                    <Sparkles className="w-3 h-3 text-[#00F2FE] shrink-0" />
                    <span className="truncate">{service}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Form submission */}
            {submitted ? (
              <div className="p-6 rounded-xl bg-[#0B0F17] border border-[#00F2FE]/50 text-center space-y-3 animate-in fade-in">
                <div className="w-12 h-12 rounded-full bg-[#00F2FE]/20 text-[#00F2FE] flex items-center justify-center mx-auto shadow-[0_0_20px_rgba(0,242,254,0.3)]">
                  <CheckCircle className="w-6 h-6 text-[#00F2FE]" />
                </div>
                <h4 className="font-display font-bold text-lg text-white">অর্ডার সাথে সাথে জমা হয়েছে!</h4>
                <p className="text-xs text-[#94A3B8] leading-relaxed">
                  ধন্যবাদ <span className="text-white font-bold">{clientName}</span>! আপনার অর্ডারের সকল ডিটেইলস ও বাজেট ব্রিফ সাথে সাথে <span className="text-[#00F2FE] font-bold">khondokercreation1@gmail.com</span> এ ইমেইল অ্যালার্ট হিসেবে চলে গেছে।
                </p>
                <div className="p-3 rounded-lg bg-[#161C28] border border-[#00F2FE]/40 text-xs text-[#00F2FE] font-mono flex items-center justify-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#00F2FE] shrink-0" />
                  <span>ইমেইল সাথে সাথে সেন্ট: khondokercreation1@gmail.com</span>
                </div>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-2 text-xs font-bold text-[#00F2FE] hover:underline"
                >
                  Edit Project Scope
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 pt-2">
                <div>
                  <label className="block text-xs font-bold text-gray-300 mb-1">Your Name *</label>
                  <input
                    type="text"
                    required
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="e.g. Tanjib Khondoker"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#0B0F17] border border-[#2A3447] focus:border-[#00F2FE] text-white text-xs focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-300 mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    placeholder="name@company.com"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#0B0F17] border border-[#2A3447] focus:border-[#00F2FE] text-white text-xs focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-300 mb-1">Brief Project Notes (Optional)</label>
                  <textarea
                    rows={2}
                    value={projectBrief}
                    onChange={(e) => setProjectBrief(e.target.value)}
                    placeholder="Describe brand vision, preferences, or deadline details..."
                    className="w-full px-4 py-2.5 rounded-xl bg-[#0B0F17] border border-[#2A3447] focus:border-[#00F2FE] text-white text-xs focus:outline-none resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-[#00F2FE] hover:bg-[#00E5FF] text-black font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,242,254,0.4)] transition-all"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Brief & Reserve Slot</span>
                </button>
              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
