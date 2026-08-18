import React, { useState, useRef } from 'react';
import { PortfolioItem, CategoryType } from '../types';
import { 
  X, Image as ImageIcon, Upload, Link as LinkIcon, Trash2, Plus, 
  RotateCcw, Save, CheckCircle2, Shield, Edit3, Eye, Sparkles, Layers, RefreshCw,
  Lock, AlertCircle, ArrowRight, Download, UploadCloud, Copy, ExternalLink, Loader2,
  Code2, FileCode, Check
} from 'lucide-react';
import { HERO_IMAGE } from '../data/agencyData';
import { optimizeImageFile, validateImageUrl } from '../lib/imageOptimizer';

// Available high-res local preset images for quick selection
import brandingImg from '../assets/images/portfolio_branding_1785848216933.jpg';
import poster3dImg from '../assets/images/portfolio_3d_poster_1785848229723.jpg';
import packagingImg from '../assets/images/portfolio_packaging_1785848240142.jpg';
import cyber3dLogoImg from '../assets/images/cyber_3d_logo_1785850040412.jpg';
import luxuryBizCardImg from '../assets/images/luxury_biz_card_1785850101468.jpg';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
  portfolioItems: PortfolioItem[];
  onUpdatePortfolio: (items: PortfolioItem[]) => void;
  onResetPortfolio: () => void;
}

const PRESET_IMAGES = [
  { name: 'Cyberpunk 3D Logo', url: cyber3dLogoImg },
  { name: 'Luxury Gold Business Card', url: luxuryBizCardImg },
  { name: 'Dark Tech Brand System', url: brandingImg },
  { name: '3D Typography Poster', url: poster3dImg },
  { name: 'Matte Product Packaging', url: packagingImg },
  { name: 'Studio Hero Visual', url: HERO_IMAGE },
  { name: 'Minimalist Vector Mockup', url: 'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?w=1000&auto=format&fit=crop&q=80' },
  { name: 'Neon Cyber Aesthetic 3D', url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1000&auto=format&fit=crop&q=80' },
  { name: 'Luxury Glass Bottle 3D', url: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=1000&auto=format&fit=crop&q=80' },
  { name: 'Apparel Techpack Fabric', url: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=1000&auto=format&fit=crop&q=80' }
];

export const AdminPanel: React.FC<AdminPanelProps> = ({
  isOpen,
  onClose,
  portfolioItems,
  onUpdatePortfolio,
  onResetPortfolio
}) => {
  const [selectedId, setSelectedId] = useState<string>(portfolioItems[0]?.id || '');
  const [imageInputMode, setImageInputMode] = useState<'upload' | 'url' | 'presets'>('upload');
  const [customUrl, setCustomUrl] = useState('');
  const [urlTesting, setUrlTesting] = useState(false);
  const [urlTestStatus, setUrlTestStatus] = useState<'idle' | 'valid' | 'invalid'>('idle');
  const [isProcessingFile, setIsProcessingFile] = useState(false);
  const [lastUploadedSize, setLastUploadedSize] = useState<number | null>(null);
  const [notification, setNotification] = useState<string | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [showJsonBackup, setShowJsonBackup] = useState(false);
  const [showCodeExport, setShowCodeExport] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [jsonInput, setJsonInput] = useState('');

  // New Item State
  const [newItem, setNewItem] = useState<Partial<PortfolioItem>>({
    title: 'New Creative Showcase',
    category: '3D Mockups',
    client: 'Client Name',
    year: '2026',
    description: 'High quality 3D visual render designed with premium lighting and dark aesthetic tone.',
    tags: ['3D Design', 'Mockup', 'Branding'],
    image: cyber3dLogoImg,
    gridSpan: 'md:col-span-1 md:row-span-1'
  });

  const [adminPassword, setAdminPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const newFileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleVerifyPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminPassword.trim() === '106669') {
      setIsAuthenticated(true);
      setAuthError(false);
    } else {
      setAuthError(true);
    }
  };

  const handleCloseModal = () => {
    setIsAuthenticated(false);
    setAdminPassword('');
    setAuthError(false);
    onClose();
  };

  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xl flex items-center justify-center p-4 animate-in fade-in duration-200 font-['Plus_Jakarta_Sans',sans-serif]">
        <div className="w-full max-w-md bg-[#161C28] border border-[#2A3447] rounded-3xl p-6 sm:p-8 shadow-[0_25px_60px_rgba(0,0,0,0.8)] relative">
          <button
            onClick={handleCloseModal}
            className="absolute top-5 right-5 p-2 text-gray-400 hover:text-white rounded-full bg-[#0B0F17] hover:bg-[#1F293D] transition-colors"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#00F2FE]/10 border border-[#00F2FE]/40 text-[#00F2FE] mb-3 shadow-[0_0_20px_rgba(0,242,254,0.3)]">
              <Shield className="w-7 h-7" />
            </div>
            <h2 className="text-2xl font-black text-white">Admin Access Protection</h2>
            <p className="text-xs text-gray-400 mt-1.5 font-medium leading-relaxed">
              এডমিন প্যানেলে প্রবেশ করতে সিকিউরিটি পাসওয়ার্ড প্রদান করুন
            </p>
          </div>

          {authError && (
            <div className="mb-4 p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2.5 animate-in shake">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
              <span>ভুল পাসওয়ার্ড! সঠিক এডমিন পাসওয়ার্ড (106669) দিয়ে চেষ্টা করুন।</span>
            </div>
          )}

          <form onSubmit={handleVerifyPassword} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-300 mb-1.5">
                Admin Security Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                <input
                  type="password"
                  required
                  autoFocus
                  placeholder="পাসওয়ার্ড লিখুন"
                  value={adminPassword}
                  onChange={(e) => {
                    setAdminPassword(e.target.value);
                    setAuthError(false);
                  }}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#0B0F17] border border-[#2A3447] focus:border-[#00F2FE] text-white text-sm focus:outline-none tracking-widest font-mono"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-[#00F2FE] hover:bg-[#00E5FF] text-black font-extrabold text-xs flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,242,254,0.3)] transition-all"
            >
              <span>পাসওয়ার্ড যাচাই করে প্রবেশ করুন</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="mt-5 text-center text-[11px] text-gray-500 font-medium">
            🔒 Khondoker Creation Admin Portal Security
          </div>
        </div>
      </div>
    );
  }

  const currentItem = portfolioItems.find((item) => item.id === selectedId) || portfolioItems[0];

  const showToast = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3500);
  };

  // High-Speed Adaptive Image Upload Handler
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, isForNew = false) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsProcessingFile(true);
      const result = await optimizeImageFile(file, 1000, 0.78);
      setLastUploadedSize(result.sizeKb);

      if (isForNew) {
        setNewItem((prev) => ({ ...prev, image: result.dataUrl }));
        showToast(`✅ ছবি অপ্টিমাইজড ও রেডি (${result.sizeKb} KB)`);
      } else if (currentItem) {
        updateItemImage(currentItem.id, result.dataUrl);
        showToast(`✅ ছবি সফলভাবে সেভ হয়েছে (${result.sizeKb} KB) — ক্লাউড ও নেটলিফাইতে পাবলিক হবে!`);
      }
    } catch (err: any) {
      console.error(err);
      alert('Image upload failed. Please try a different image format (JPG, PNG, WEBP).');
    } finally {
      setIsProcessingFile(false);
      // Reset input value so re-selecting same file fires onChange
      e.target.value = '';
    }
  };

  // Update image for a project
  const updateItemImage = (id: string, newImage: string) => {
    const updated = portfolioItems.map((item) => 
      item.id === id ? { ...item, image: newImage } : item
    );
    onUpdatePortfolio(updated);
  };

  // Update text field for a project
  const updateField = (id: string, field: keyof PortfolioItem, value: any) => {
    const updated = portfolioItems.map((item) => {
      if (item.id === id) {
        return { ...item, [field]: value };
      }
      return item;
    });
    onUpdatePortfolio(updated);
  };

  // Delete project item
  const handleDeleteItem = (id: string) => {
    if (portfolioItems.length <= 1) {
      alert('Portfolio must contain at least one project.');
      return;
    }
    if (confirm('Are you sure you want to remove this project from Selected Work?')) {
      const updated = portfolioItems.filter((item) => item.id !== id);
      onUpdatePortfolio(updated);
      setSelectedId(updated[0]?.id || '');
      showToast('Project deleted successfully.');
    }
  };

  // Add new item
  const handleCreateProject = () => {
    if (!newItem.title || !newItem.image) {
      alert('Please enter a title and select an image.');
      return;
    }
    const created: PortfolioItem = {
      id: `project-${Date.now()}`,
      title: newItem.title || 'New Project',
      category: (newItem.category as any) || 'Branding',
      image: newItem.image || cyber3dLogoImg,
      client: newItem.client || 'Studio Client',
      year: newItem.year || '2026',
      description: newItem.description || 'Custom crafted design asset for global brand showcase.',
      tags: newItem.tags || ['Design', 'Branding'],
      gridSpan: newItem.gridSpan || 'md:col-span-1 md:row-span-1'
    };

    onUpdatePortfolio([created, ...portfolioItems]);
    setSelectedId(created.id);
    setIsAddingNew(false);
    showToast('🎉 নতুন প্রজেক্ট লাইভ পোর্টফোলিওতে যুক্ত হয়েছে!');
  };

  // Test Image URL Handler
  const handleTestUrl = async () => {
    if (!customUrl) return;
    setUrlTesting(true);
    setUrlTestStatus('idle');
    const isValid = await validateImageUrl(customUrl);
    setUrlTesting(false);
    setUrlTestStatus(isValid ? 'valid' : 'invalid');
  };

  const handleApplyUrl = (isForNew = false) => {
    if (!customUrl) return;
    if (isForNew) {
      setNewItem((prev) => ({ ...prev, image: customUrl }));
      setCustomUrl('');
      setUrlTestStatus('idle');
      showToast('Image URL applied to new project!');
    } else if (currentItem) {
      updateItemImage(currentItem.id, customUrl);
      setCustomUrl('');
      setUrlTestStatus('idle');
      showToast('✅ প্রজেক্টের ইমেজ সফলভাবে পরিবর্তন করা হয়েছে!');
    }
  };

  // Export / Import JSON
  const handleExportJson = () => {
    const jsonStr = JSON.stringify(portfolioItems, null, 2);
    navigator.clipboard.writeText(jsonStr);
    showToast('📋 পুরো পোর্টফোলিও ডেটা JSON ক্লিপবোর্ডে কপি করা হয়েছে!');
  };

  // Generate clean TypeScript Code for agencyData.ts
  const generateTypeScriptCode = () => {
    return `// ==========================================
// KHONDOKER CREATION - HARDCODED PORTFOLIO DATA
// Generated from Admin Master on ${new Date().toLocaleDateString()}
// ==========================================

import { PortfolioItem } from '../types';

export const PORTFOLIO_DATA: PortfolioItem[] = ${JSON.stringify(portfolioItems, null, 2)};
`;
  };

  const handleCopyTsCode = () => {
    const code = generateTypeScriptCode();
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    showToast('💻 পুরো TypeScript কোড ক্লিপবোর্ডে কপি করা হয়েছে!');
    setTimeout(() => setCopiedCode(false), 3000);
  };

  const handleDownloadTsFile = () => {
    const code = generateTypeScriptCode();
    const blob = new Blob([code], { type: 'text/typescript;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'portfolioData.ts';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showToast('📥 portfolioData.ts ফাইল ডাউনলোড সম্পন্ন হয়েছে!');
  };

  const handleImportJson = () => {
    try {
      const parsed = JSON.parse(jsonInput);
      if (Array.isArray(parsed) && parsed.length > 0) {
        onUpdatePortfolio(parsed);
        setShowJsonBackup(false);
        setJsonInput('');
        showToast('✅ JSON ব্যাকআপ সফলভাবে ইম্পোর্ট করা হয়েছে!');
      } else {
        alert('Invalid JSON structure: Expected an array of portfolio items.');
      }
    } catch (e) {
      alert('Invalid JSON format. Please paste valid JSON.');
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200 font-['Plus_Jakarta_Sans',sans-serif]">
      <div className="relative w-full max-w-5xl bg-[#121824] border border-[#2A3447] rounded-2xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col">
        
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#0B0F17] border-b border-[#2A3447]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#00F2FE]/10 border border-[#00F2FE]/30 text-[#00F2FE] flex items-center justify-center font-bold">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-display font-extrabold text-lg text-white">Admin Panel</h3>
                <span className="px-2 py-0.5 rounded text-[10px] uppercase font-mono font-bold bg-[#00F2FE] text-black">
                  Live Image & Code Master
                </span>
              </div>
              <p className="text-xs text-[#94A3B8]">
                যেকোনো ছবি বা টেক্সট পরিবর্তন করুন — সাথে সাথে লাইভ ও নেটলিফাইতে কোড আকারে সেভ হবে
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setShowCodeExport(!showCodeExport);
                setShowJsonBackup(false);
              }}
              className="px-3 py-1.5 rounded-lg bg-[#00F2FE]/10 hover:bg-[#00F2FE]/20 text-[#00F2FE] border border-[#00F2FE]/40 text-xs font-bold flex items-center gap-1.5 transition-all shadow-[0_0_12px_rgba(0,242,254,0.15)]"
              title="Export Full Hardcoded Code"
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>কোড হিসেবে সেভ/এক্সপোর্ট</span>
            </button>

            <button
              onClick={() => {
                setShowJsonBackup(!showJsonBackup);
                setShowCodeExport(false);
              }}
              className="px-3 py-1.5 rounded-lg bg-[#161C28] hover:bg-[#2A3447] text-[#94A3B8] hover:text-white border border-[#2A3447] text-xs font-semibold flex items-center gap-1.5 transition-colors"
              title="Backup or Import Portfolio Data"
            >
              <Download className="w-3.5 h-3.5 text-[#00F2FE]" />
              <span className="hidden sm:inline">Backup/JSON</span>
            </button>

            <button
              onClick={() => {
                if (confirm('Reset all portfolio items to original studio defaults?')) {
                  onResetPortfolio();
                  showToast('Reset to original studio portfolio defaults.');
                }
              }}
              className="px-3 py-1.5 rounded-lg bg-[#161C28] hover:bg-[#2A3447] text-[#94A3B8] hover:text-white border border-[#2A3447] text-xs font-semibold flex items-center gap-1.5 transition-colors"
              title="Reset to default data"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Reset Defaults</span>
            </button>

            <button
              onClick={handleCloseModal}
              className="p-2 rounded-xl bg-[#161C28] border border-[#2A3447] text-gray-400 hover:text-white hover:border-[#00F2FE]"
              id="close-admin-panel"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Saved Toast Banner */}
        {notification && (
          <div className="bg-[#00F2FE] text-black px-4 py-2 font-bold text-xs flex items-center justify-center gap-2 animate-in slide-in-from-top duration-200">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{notification}</span>
          </div>
        )}

        {/* EXPORT HARDCODED TYPESCRIPT CODE OVERLAY */}
        {showCodeExport && (
          <div className="p-5 bg-[#090D14] border-b border-[#00F2FE]/40 animate-in fade-in duration-150 space-y-3">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <FileCode className="w-4 h-4 text-[#00F2FE]" />
                <span className="text-xs font-black text-white uppercase tracking-wider">
                  💻 Hardcoded Source Code (আপনার যুক্ত করা সব ছবি ও প্রজেক্টের কোড)
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyTsCode}
                  className="px-3.5 py-1.5 bg-[#00F2FE] hover:bg-[#00E5FF] text-black font-extrabold text-xs rounded-xl flex items-center gap-1.5 shadow-[0_0_15px_rgba(0,242,254,0.3)] transition-all"
                >
                  {copiedCode ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedCode ? 'কোড কপি হয়েছে!' : '১-ক্লিকে কোড কপি করুন'}</span>
                </button>
                <button
                  onClick={handleDownloadTsFile}
                  className="px-3 py-1.5 bg-[#1F293D] hover:bg-[#2A3447] text-white font-bold text-xs rounded-xl border border-[#2A3447] flex items-center gap-1.5 transition-colors"
                >
                  <Download className="w-3.5 h-3.5 text-[#00F2FE]" />
                  <span>Download .ts File</span>
                </button>
                <button
                  onClick={() => setShowCodeExport(false)}
                  className="p-1.5 text-gray-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            <p className="text-[11px] text-gray-400 leading-relaxed">
              💡 আপনি এডমিন প্যানেলে যেসব ছবি বা তথ্য পরিবর্তন করেছেন, তার সম্পূর্ণ কোড নিচে জেনারেট হয়েছে। এটি কোডে পেস্ট করলে বা ডাউনলোড করে দিলে সাইট নেটলিফাইতে ডিপ্লয় করলেও ছবি চিরস্থায়ী কোড আকারে থাকবে:
            </p>

            <div className="relative rounded-xl overflow-hidden border border-[#2A3447] bg-[#05080E] max-h-48 overflow-y-auto font-mono text-[11px] p-3 text-emerald-400 leading-relaxed">
              <pre>{generateTypeScriptCode()}</pre>
            </div>
          </div>
        )}

        {/* JSON Backup / Import Modal Overlay */}
        {showJsonBackup && (
          <div className="p-4 bg-[#0B0F17] border-b border-[#2A3447] animate-in fade-in duration-150 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white flex items-center gap-2">
                <UploadCloud className="w-4 h-4 text-[#00F2FE]" /> Portfolio JSON Backup & Migration Tool
              </span>
              <button
                onClick={handleExportJson}
                className="px-3 py-1 bg-[#00F2FE] text-black font-bold text-xs rounded-lg flex items-center gap-1.5"
              >
                <Copy className="w-3.5 h-3.5" /> Copy All Portfolio Data
              </button>
            </div>
            <textarea
              rows={3}
              placeholder="Paste Portfolio JSON array here to restore or import..."
              value={jsonInput}
              onChange={(e) => setJsonInput(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-[#161C28] border border-[#2A3447] text-white text-xs font-mono outline-none focus:border-[#00F2FE]"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowJsonBackup(false)}
                className="px-3 py-1 rounded-lg text-xs text-gray-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={handleImportJson}
                disabled={!jsonInput.trim()}
                className="px-4 py-1.5 rounded-lg bg-[#1F293D] hover:bg-[#2A3447] text-white text-xs font-bold border border-[#00F2FE]/50 disabled:opacity-40"
              >
                Import & Apply JSON
              </button>
            </div>
          </div>
        )}

        {/* Main Body Grid */}
        <div className="flex-1 overflow-hidden grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-[#2A3447]">
          
          {/* Left Column: Project Selector List (4 Cols) */}
          <div className="lg:col-span-4 p-4 overflow-y-auto max-h-[260px] lg:max-h-none bg-[#0D121D] space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-[#2A3447]/60">
              <span className="text-xs font-bold uppercase tracking-wider text-[#94A3B8] flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-[#00F2FE]" /> Projects List ({portfolioItems.length})
              </span>
              <button
                onClick={() => setIsAddingNew(true)}
                className="px-2.5 py-1 rounded-lg bg-[#00F2FE] hover:bg-[#00E5FF] text-black font-extrabold text-[11px] flex items-center gap-1 transition-all"
              >
                <Plus className="w-3.5 h-3.5" /> Add Project
              </button>
            </div>

            <div className="space-y-2">
              {portfolioItems.map((item) => (
                <div
                  key={item.id}
                  onClick={() => {
                    setSelectedId(item.id);
                    setIsAddingNew(false);
                  }}
                  className={`p-2.5 rounded-xl border transition-all cursor-pointer flex items-center gap-3 ${
                    selectedId === item.id && !isAddingNew
                      ? 'bg-[#1A2333] border-[#00F2FE] shadow-[0_0_15px_rgba(0,242,254,0.15)]'
                      : 'bg-[#161C28]/60 border-[#2A3447] hover:border-[#00F2FE]/40 hover:bg-[#161C28]'
                  }`}
                >
                  <img
                    src={item.image || cyber3dLogoImg}
                    alt={item.title}
                    className="w-12 h-12 rounded-lg object-cover border border-[#2A3447] flex-shrink-0"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = cyber3dLogoImg;
                    }}
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-xs text-white truncate">{item.title || '(No Title)'}</h4>
                    <p className="text-[10px] text-[#94A3B8] font-mono mt-0.5">{item.category} • {item.year || '2026'}</p>
                  </div>
                  {selectedId === item.id && !isAddingNew && (
                    <span className="w-2 h-2 rounded-full bg-[#00F2FE] animate-pulse" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Project Image Changer & Details Editor (8 Cols) */}
          <div className="lg:col-span-8 p-6 overflow-y-auto bg-[#121824] space-y-6">
            
            {/* MODE A: ADD NEW PROJECT */}
            {isAddingNew ? (
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-3 border-b border-[#2A3447]">
                  <h4 className="font-display font-bold text-lg text-white flex items-center gap-2">
                    <Plus className="w-5 h-5 text-[#00F2FE]" /> Add New Project to Selected Work
                  </h4>
                  <button
                    onClick={() => setIsAddingNew(false)}
                    className="text-xs text-[#94A3B8] hover:text-white"
                  >
                    Cancel
                  </button>
                </div>

                {/* Image upload for new item */}
                <div className="bg-[#0B0F17] p-4 rounded-2xl border border-[#2A3447] space-y-3">
                  <span className="text-xs font-bold text-white flex items-center gap-2">
                    <ImageIcon className="w-4 h-4 text-[#00F2FE]" /> Select or Upload Image for New Project
                  </span>

                  {/* Image preview */}
                  <div className="h-40 rounded-xl overflow-hidden border border-[#2A3447] relative">
                    <img
                      src={newItem.image || cyber3dLogoImg}
                      alt="New preview"
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-2 left-2 px-2.5 py-1 rounded bg-black/70 backdrop-blur-md text-[10px] font-bold text-[#00F2FE] border border-[#2A3447]">
                      New Image Selected
                    </div>
                  </div>

                  {/* File Upload Button */}
                  <input
                    type="file"
                    ref={newFileInputRef}
                    accept="image/*"
                    onChange={(e) => handleFileUpload(e, true)}
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => newFileInputRef.current?.click()}
                    disabled={isProcessingFile}
                    className="w-full py-3 border-2 border-dashed border-[#00F2FE]/50 hover:border-[#00F2FE] bg-[#00F2FE]/5 hover:bg-[#00F2FE]/10 rounded-xl text-center transition-all cursor-pointer flex items-center justify-center gap-2 group"
                  >
                    {isProcessingFile ? (
                      <Loader2 className="w-5 h-5 text-[#00F2FE] animate-spin" />
                    ) : (
                      <Upload className="w-5 h-5 text-[#00F2FE] group-hover:scale-110 transition-transform" />
                    )}
                    <span className="text-xs font-bold text-white">
                      {isProcessingFile ? 'ছবি প্রসেস হচ্ছে...' : 'কম্পিউটার/মোবাইল থেকে নতুন ছবি আপলোড করুন'}
                    </span>
                  </button>

                  {/* Presets Grid */}
                  <div>
                    <label className="block text-[11px] font-bold text-[#94A3B8] mb-2">অথবা প্রিসেট থেকে বেছে নিন:</label>
                    <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                      {PRESET_IMAGES.slice(0, 5).map((preset, idx) => (
                        <div
                          key={idx}
                          onClick={() => setNewItem({ ...newItem, image: preset.url })}
                          className={`relative rounded-lg overflow-hidden border cursor-pointer h-16 transition-all ${
                            newItem.image === preset.url ? 'border-[#00F2FE] ring-2 ring-[#00F2FE]/40' : 'border-[#2A3447]'
                          }`}
                        >
                          <img src={preset.url} alt={preset.name} className="w-full h-full object-cover" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Form fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#94A3B8] mb-1">Project Title</label>
                    <input
                      type="text"
                      value={newItem.title}
                      onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-[#0B0F17] border border-[#2A3447] text-white text-xs focus:border-[#00F2FE] outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#94A3B8] mb-1">Category</label>
                    <select
                      value={newItem.category}
                      onChange={(e) => setNewItem({ ...newItem, category: e.target.value as any })}
                      className="w-full px-3 py-2 rounded-xl bg-[#0B0F17] border border-[#2A3447] text-white text-xs focus:border-[#00F2FE] outline-none"
                    >
                      <option value="Logo Design">Logo Design</option>
                      <option value="Social Media Post">Social Media Post</option>
                      <option value="Label Design">Label Design</option>
                      <option value="Packaging Design">Packaging Design</option>
                      <option value="Box Design">Box Design</option>
                      <option value="Pattern Design">Pattern Design</option>
                      <option value="Techpack Design">Techpack Design</option>
                      <option value="Branding">Branding</option>
                      <option value="3D Mockups">3D Mockups</option>
                      <option value="Social Media">Social Media</option>
                      <option value="Posters">Posters</option>
                      <option value="UI Visuals">UI Visuals</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#94A3B8] mb-1">Client Name</label>
                    <input
                      type="text"
                      value={newItem.client}
                      onChange={(e) => setNewItem({ ...newItem, client: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-[#0B0F17] border border-[#2A3447] text-white text-xs focus:border-[#00F2FE] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#94A3B8] mb-1">Year</label>
                    <input
                      type="text"
                      value={newItem.year}
                      onChange={(e) => setNewItem({ ...newItem, year: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-[#0B0F17] border border-[#2A3447] text-white text-xs focus:border-[#00F2FE] outline-none"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-[#94A3B8] mb-1">Description</label>
                    <textarea
                      rows={2}
                      value={newItem.description}
                      onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-[#0B0F17] border border-[#2A3447] text-white text-xs focus:border-[#00F2FE] outline-none"
                    />
                  </div>
                </div>

                <button
                  onClick={handleCreateProject}
                  className="w-full py-3.5 rounded-xl bg-[#00F2FE] text-black font-extrabold text-xs uppercase tracking-wider hover:bg-[#00E5FF] transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,242,254,0.3)]"
                >
                  <Save className="w-4 h-4" /> Add Project To Live Portfolio
                </button>
              </div>
            ) : currentItem ? (
              /* MODE B: EDIT CURRENT SELECTED PROJECT */
              <div className="space-y-6">
                
                {/* Active Project Card Header */}
                <div className="flex items-start justify-between pb-4 border-b border-[#2A3447]">
                  <div>
                    <span className="text-[10px] uppercase font-mono font-bold text-[#00F2FE]">Editing Project</span>
                    <h3 className="font-display font-extrabold text-2xl text-white mt-0.5">
                      {currentItem.title || '(Untitled Project)'}
                    </h3>
                  </div>
                  <button
                    onClick={() => handleDeleteItem(currentItem.id)}
                    className="px-3 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 text-xs font-bold flex items-center gap-1.5 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Delete Project
                  </button>
                </div>

                {/* 1. IMAGE CHANGE SECTION */}
                <div className="bg-[#0B0F17] p-5 rounded-2xl border border-[#2A3447] space-y-4">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-2">
                      <ImageIcon className="w-4 h-4 text-[#00F2FE]" /> Change Project Image
                    </span>
                    
                    {/* Tabs for Image Source */}
                    <div className="flex items-center gap-1 bg-[#161C28] p-1 rounded-xl border border-[#2A3447]">
                      <button
                        onClick={() => setImageInputMode('upload')}
                        className={`px-3 py-1 rounded-lg text-[11px] font-bold transition-all ${
                          imageInputMode === 'upload' ? 'bg-[#00F2FE] text-black' : 'text-[#94A3B8] hover:text-white'
                        }`}
                      >
                        File Upload
                      </button>
                      <button
                        onClick={() => setImageInputMode('presets')}
                        className={`px-3 py-1 rounded-lg text-[11px] font-bold transition-all ${
                          imageInputMode === 'presets' ? 'bg-[#00F2FE] text-black' : 'text-[#94A3B8] hover:text-white'
                        }`}
                      >
                        Studio Presets
                      </button>
                      <button
                        onClick={() => setImageInputMode('url')}
                        className={`px-3 py-1 rounded-lg text-[11px] font-bold transition-all ${
                          imageInputMode === 'url' ? 'bg-[#00F2FE] text-black' : 'text-[#94A3B8] hover:text-white'
                        }`}
                      >
                        Image Link (URL)
                      </button>
                    </div>
                  </div>

                  {/* Current Active Image Preview */}
                  <div className="relative rounded-xl overflow-hidden border border-[#2A3447] h-56 group">
                    <img
                      src={currentItem.image || cyber3dLogoImg}
                      alt={currentItem.title}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = cyber3dLogoImg;
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end justify-between p-4">
                      <span className="text-xs text-white font-mono bg-black/70 px-3 py-1 rounded-lg backdrop-blur-md border border-[#2A3447]">
                        Active in Selected Work
                      </span>
                      {lastUploadedSize && (
                        <span className="text-[10px] text-[#00F2FE] font-mono bg-[#0B0F17]/90 px-2.5 py-1 rounded-md border border-[#00F2FE]/40">
                          ⚡ {lastUploadedSize} KB (High-Speed Cloud Synced)
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Input Option 1: File Upload */}
                  {imageInputMode === 'upload' && (
                    <div className="space-y-2">
                      <input
                        type="file"
                        ref={fileInputRef}
                        accept="image/*"
                        onChange={(e) => handleFileUpload(e, false)}
                        className="hidden"
                      />
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={isProcessingFile}
                        className="w-full py-4 border-2 border-dashed border-[#00F2FE]/50 hover:border-[#00F2FE] bg-[#00F2FE]/5 hover:bg-[#00F2FE]/10 rounded-xl text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-2 group"
                      >
                        {isProcessingFile ? (
                          <div className="flex items-center gap-2 text-[#00F2FE] font-bold text-xs">
                            <Loader2 className="w-5 h-5 animate-spin" />
                            <span>ছবি অপ্টিমাইজ ও সেভ হচ্ছে...</span>
                          </div>
                        ) : (
                          <>
                            <Upload className="w-6 h-6 text-[#00F2FE] group-hover:scale-110 transition-transform" />
                            <span className="text-xs font-extrabold text-white">
                              কম্পিউটার বা ফোন থেকে ছবি সিলেক্ট করুন (Choose Image File)
                            </span>
                            <span className="text-[10px] text-[#94A3B8]">
                              Supports JPG, PNG, WEBP, SVG • অট্যোমেটিক অপ্টিমাইজড ও ইনস্ট্যান্ট নেটলিফাই সিঙ্ক
                            </span>
                          </>
                        )}
                      </button>
                    </div>
                  )}

                  {/* Input Option 2: Presets */}
                  {imageInputMode === 'presets' && (
                    <div className="space-y-2">
                      <p className="text-[11px] text-[#94A3B8] mb-2">High-quality studio renders for instant 1-click swap:</p>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {PRESET_IMAGES.map((preset, idx) => (
                          <div
                            key={idx}
                            onClick={() => {
                              updateItemImage(currentItem.id, preset.url);
                              showToast(`Image updated to ${preset.name}`);
                            }}
                            className={`p-2 rounded-xl bg-[#161C28] border cursor-pointer hover:border-[#00F2FE] transition-all space-y-1.5 ${
                              currentItem.image === preset.url ? 'border-[#00F2FE] bg-[#00F2FE]/10' : 'border-[#2A3447]'
                            }`}
                          >
                            <div className="h-20 rounded-lg overflow-hidden border border-[#2A3447]">
                              <img src={preset.url} alt={preset.name} className="w-full h-full object-cover" />
                            </div>
                            <span className="text-[11px] font-bold text-white block truncate">{preset.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Input Option 3: Image URL */}
                  {imageInputMode === 'url' && (
                    <div className="space-y-3">
                      <div className="flex gap-2">
                        <input
                          type="url"
                          placeholder="https://example.com/image.jpg (Imgur, Cloudinary, Unsplash, Google Drive link, etc.)"
                          value={customUrl}
                          onChange={(e) => {
                            setCustomUrl(e.target.value);
                            setUrlTestStatus('idle');
                          }}
                          className="flex-1 px-3 py-2.5 rounded-xl bg-[#161C28] border border-[#2A3447] text-white text-xs focus:border-[#00F2FE] outline-none"
                        />
                        <button
                          type="button"
                          onClick={handleTestUrl}
                          disabled={!customUrl || urlTesting}
                          className="px-3 py-2 rounded-xl bg-[#1F293D] hover:bg-[#2A3447] text-white text-xs font-bold border border-[#2A3447] flex items-center gap-1.5"
                        >
                          {urlTesting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Eye className="w-3.5 h-3.5" />}
                          <span>Test</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleApplyUrl(false)}
                          disabled={!customUrl}
                          className="px-4 py-2 rounded-xl bg-[#00F2FE] text-black font-extrabold text-xs flex items-center gap-1 hover:bg-[#00E5FF] disabled:opacity-40"
                        >
                          <LinkIcon className="w-3.5 h-3.5" /> Apply
                        </button>
                      </div>

                      {urlTestStatus === 'valid' && (
                        <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Image URL is working & valid! Click "Apply" to save.</span>
                        </div>
                      )}
                      {urlTestStatus === 'invalid' && (
                        <div className="p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
                          <AlertCircle className="w-4 h-4" />
                          <span>Could not load image from this URL. Please check link permissions.</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* 2. TEXT DETAILS EDITOR WITH QUICK REMOVE / CLEAR BUTTONS */}
                <div className="bg-[#0B0F17] p-5 rounded-2xl border border-[#2A3447] space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-2">
                      <Edit3 className="w-4 h-4 text-[#00F2FE]" /> Project Text Editor & Remove Option
                    </span>
                    <span className="text-[10px] text-emerald-400 font-mono font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                      ✏️ Edit or Remove Any Text Below
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="text-[11px] font-bold text-[#94A3B8]">Project Title</label>
                        {currentItem.title && (
                          <button
                            type="button"
                            onClick={() => {
                              updateField(currentItem.id, 'title', '');
                              showToast('Title text removed / cleared');
                            }}
                            className="text-[10px] text-rose-400 hover:text-rose-300 hover:underline font-bold"
                          >
                            ❌ Remove Text
                          </button>
                        )}
                      </div>
                      <input
                        type="text"
                        placeholder="Project Title (or leave empty to remove)"
                        value={currentItem.title}
                        onChange={(e) => updateField(currentItem.id, 'title', e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-[#161C28] border border-[#2A3447] text-white text-xs focus:border-[#00F2FE] outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-[#94A3B8] mb-1">Category Filter</label>
                      <select
                        value={currentItem.category}
                        onChange={(e) => updateField(currentItem.id, 'category', e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-[#161C28] border border-[#2A3447] text-white text-xs focus:border-[#00F2FE] outline-none"
                      >
                        <option value="Logo Design">Logo Design</option>
                        <option value="Social Media Post">Social Media Post</option>
                        <option value="Label Design">Label Design</option>
                        <option value="Packaging Design">Packaging Design</option>
                        <option value="Box Design">Box Design</option>
                        <option value="Pattern Design">Pattern Design</option>
                        <option value="Techpack Design">Techpack Design</option>
                        <option value="Branding">Branding</option>
                        <option value="3D Mockups">3D Mockups</option>
                        <option value="Social Media">Social Media</option>
                        <option value="Posters">Posters</option>
                        <option value="UI Visuals">UI Visuals</option>
                      </select>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="text-[11px] font-bold text-[#94A3B8]">Client Name</label>
                        {currentItem.client && (
                          <button
                            type="button"
                            onClick={() => {
                              updateField(currentItem.id, 'client', '');
                              showToast('Client text removed / cleared');
                            }}
                            className="text-[10px] text-rose-400 hover:text-rose-300 hover:underline font-bold"
                          >
                            ❌ Remove Text
                          </button>
                        )}
                      </div>
                      <input
                        type="text"
                        placeholder="Client Name"
                        value={currentItem.client}
                        onChange={(e) => updateField(currentItem.id, 'client', e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-[#161C28] border border-[#2A3447] text-white text-xs focus:border-[#00F2FE] outline-none"
                      />
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="text-[11px] font-bold text-[#94A3B8]">Year</label>
                        {currentItem.year && (
                          <button
                            type="button"
                            onClick={() => {
                              updateField(currentItem.id, 'year', '');
                              showToast('Year text removed / cleared');
                            }}
                            className="text-[10px] text-rose-400 hover:text-rose-300 hover:underline font-bold"
                          >
                            ❌ Remove Text
                          </button>
                        )}
                      </div>
                      <input
                        type="text"
                        placeholder="2026"
                        value={currentItem.year}
                        onChange={(e) => updateField(currentItem.id, 'year', e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-[#161C28] border border-[#2A3447] text-white text-xs focus:border-[#00F2FE] outline-none"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <div className="flex items-center justify-between mb-1">
                        <label className="text-[11px] font-bold text-[#94A3B8]">Description Text</label>
                        {currentItem.description && (
                          <button
                            type="button"
                            onClick={() => {
                              updateField(currentItem.id, 'description', '');
                              showToast('Description text removed / cleared');
                            }}
                            className="text-[10px] text-rose-400 hover:text-rose-300 hover:underline font-bold"
                          >
                            ❌ Remove Description
                          </button>
                        )}
                      </div>
                      <textarea
                        rows={2}
                        placeholder="Description text"
                        value={currentItem.description}
                        onChange={(e) => updateField(currentItem.id, 'description', e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-[#161C28] border border-[#2A3447] text-white text-xs focus:border-[#00F2FE] outline-none"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <div className="flex items-center justify-between mb-1">
                        <label className="text-[11px] font-bold text-[#94A3B8]">Tags (Comma separated)</label>
                        {currentItem.tags && currentItem.tags.length > 0 && (
                          <button
                            type="button"
                            onClick={() => {
                              updateField(currentItem.id, 'tags', []);
                              showToast('Tags removed / cleared');
                            }}
                            className="text-[10px] text-rose-400 hover:text-rose-300 hover:underline font-bold"
                          >
                            ❌ Remove All Tags
                          </button>
                        )}
                      </div>
                      <input
                        type="text"
                        placeholder="Tag 1, Tag 2, Tag 3"
                        value={Array.isArray(currentItem.tags) ? currentItem.tags.join(', ') : ''}
                        onChange={(e) => {
                          const tagsArray = e.target.value.split(',').map((t) => t.trim()).filter(Boolean);
                          updateField(currentItem.id, 'tags', tagsArray);
                        }}
                        className="w-full px-3 py-2 rounded-xl bg-[#161C28] border border-[#2A3447] text-white text-xs focus:border-[#00F2FE] outline-none"
                      />
                    </div>
                  </div>
                </div>

              </div>
            ) : null}

          </div>

        </div>

        {/* Footer info bar */}
        <div className="px-6 py-3.5 bg-[#0B0F17] border-t border-[#2A3447] flex items-center justify-between text-[11px] text-[#94A3B8]">
          <span className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#00F2FE]" /> Changes are live immediately & synced to Netlify + Cloud!
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-[#00F2FE] text-black font-extrabold text-xs hover:bg-[#00E5FF] transition-all shadow-[0_0_15px_rgba(0,242,254,0.3)]"
          >
            Done & Close
          </button>
        </div>

      </div>
    </div>
  );
};
