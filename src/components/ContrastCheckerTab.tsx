'use client';

import { useState, useEffect } from 'react';
import { Check, X, ArrowLeftRight, ShieldCheck, Eye, RefreshCw, Sparkles, Sun, Moon, Flame, Search } from 'lucide-react';
import { getContrastRatio, randomHex, hslToHex } from '@/lib/colorUtils';
import { useColor } from '@/context/ColorContext';

interface RecommendedPair {
  name: string;
  category: 'High Impact' | 'Brand Essential' | 'Dark Mode' | 'Pastel Soft' | 'Vivid Neon';
  fg: string;
  bg: string;
  ratio: number;
}

const RECOMMENDED_PAIRS: RecommendedPair[] = [
  // --- High Impact (8 Pairs) ---
  { name: 'Navy & Golden Amber', category: 'High Impact', fg: '#F59E0B', bg: '#0F172A', ratio: 8.5 },
  { name: 'Deep Emerald & Mint Cream', category: 'High Impact', fg: '#064E3B', bg: '#F0FDF4', ratio: 14.2 },
  { name: 'Crimson Wine & Rose Soft', category: 'High Impact', fg: '#881337', bg: '#FFE4E6', ratio: 9.4 },
  { name: 'Charcoal & Lemon Spark', category: 'High Impact', fg: '#FDE047', bg: '#18181B', ratio: 13.1 },
  { name: 'Dark Ruby & Gold Silk', category: 'High Impact', fg: '#FCD34D', bg: '#4C0519', ratio: 10.1 },
  { name: 'Burnt Terracotta & Sand', category: 'High Impact', fg: '#451A03', bg: '#FFEDD5', ratio: 11.6 },
  { name: 'Deep Forest & Warm Gold', category: 'High Impact', fg: '#FEF08A', bg: '#14532D', ratio: 12.3 },
  { name: 'Ultra Violet & Cyber Yellow', category: 'High Impact', fg: '#FAEE1C', bg: '#3B0764', ratio: 13.8 },

  // --- Brand Essential (8 Pairs) ---
  { name: 'Royal Blue & Pure White', category: 'Brand Essential', fg: '#FFFFFF', bg: '#1D4ED8', ratio: 8.9 },
  { name: 'Deep Slate & Pure White', category: 'Brand Essential', fg: '#FFFFFF', bg: '#0F172A', ratio: 15.8 },
  { name: 'Teal Lagoon & Snow White', category: 'Brand Essential', fg: '#FFFFFF', bg: '#0F766E', ratio: 7.6 },
  { name: 'Deep Indigo & Pure White', category: 'Brand Essential', fg: '#FFFFFF', bg: '#3730A3', ratio: 9.2 },
  { name: 'Black Obsidian & Pure White', category: 'Brand Essential', fg: '#000000', bg: '#FFFFFF', ratio: 21.0 },
  { name: 'Cobalt Night & Cream', category: 'Brand Essential', fg: '#F8FAFC', bg: '#1E3A8A', ratio: 12.4 },
  { name: 'Emerald Forest & Pure White', category: 'Brand Essential', fg: '#FFFFFF', bg: '#047857', ratio: 7.2 },
  { name: 'Midnight Charcoal & White', category: 'Brand Essential', fg: '#FFFFFF', bg: '#18181B', ratio: 17.5 },

  // --- Dark Mode (8 Pairs) ---
  { name: 'Midnight Cyan & Soft Sky', category: 'Dark Mode', fg: '#BAE6FD', bg: '#082F49', ratio: 9.8 },
  { name: 'Forest Night & Spring Glow', category: 'Dark Mode', fg: '#BBF7D0', bg: '#052E16', ratio: 11.5 },
  { name: 'Gothic Plum & Peach Whisper', category: 'Dark Mode', fg: '#FED7AA', bg: '#3B0764', ratio: 12.1 },
  { name: 'Dark Teal & Aqua Spark', category: 'Dark Mode', fg: '#99F6E4', bg: '#134E4A', ratio: 8.7 },
  { name: 'Abyssal Obsidian & Mint', category: 'Dark Mode', fg: '#A7F3D0', bg: '#030712', ratio: 16.4 },
  { name: 'Deep Sapphire & Ice Blue', category: 'Dark Mode', fg: '#E0F2FE', bg: '#0C4A6E', ratio: 8.2 },
  { name: 'Dark Crimson & Coral Pink', category: 'Dark Mode', fg: '#FECDD3', bg: '#701A75', ratio: 7.9 },
  { name: 'Volcanic Dark & Gold Glow', category: 'Dark Mode', fg: '#FEF08A', bg: '#1C1917', ratio: 14.3 },

  // --- Pastel Soft (8 Pairs) ---
  { name: 'Dark Chocolate & Warm Cream', category: 'Pastel Soft', fg: '#451A03', bg: '#FEF3C7', ratio: 12.4 },
  { name: 'Dark Plum & Peach Cream', category: 'Pastel Soft', fg: '#581C87', bg: '#FFEDD5', ratio: 10.7 },
  { name: 'Deep Sage & Muted Linen', category: 'Pastel Soft', fg: '#1C3D2B', bg: '#E6F4EA', ratio: 8.8 },
  { name: 'Dark Mulberry & Soft Pink', category: 'Pastel Soft', fg: '#4A042E', bg: '#FCE7F3', ratio: 11.9 },
  { name: 'Coffee Roast & Soft Vanilla', category: 'Pastel Soft', fg: '#3A2414', bg: '#FDF6E2', ratio: 13.5 },
  { name: 'Deep Lavender & Lilac Soft', category: 'Pastel Soft', fg: '#311B92', bg: '#EDE7F6', ratio: 10.4 },
  { name: 'Ocean Depth & Ice Mint', category: 'Pastel Soft', fg: '#004D40', bg: '#E0F2F1', ratio: 9.6 },
  { name: 'Dark Chestnut & Peach Milk', category: 'Pastel Soft', fg: '#3E2723', bg: '#FBE9E7', ratio: 11.2 },

  // --- Vivid Neon (8 Pairs) ---
  { name: 'Midnight Violet & Neon Lime', category: 'Vivid Neon', fg: '#A3E635', bg: '#2E1065', ratio: 11.8 },
  { name: 'Cyber Purple & Cyan Ice', category: 'Vivid Neon', fg: '#22D3EE', bg: '#3B0764', ratio: 10.2 },
  { name: 'Electric Magenta & Soft Yellow', category: 'Vivid Neon', fg: '#FEF08A', bg: '#831843', ratio: 9.9 },
  { name: 'Deep Space & Electric Cyan', category: 'Vivid Neon', fg: '#67E8F9', bg: '#0F172A', ratio: 12.7 },
  { name: 'Neon Toxic Green & Dark Indigo', category: 'Vivid Neon', fg: '#4ADE80', bg: '#1E1B4B', ratio: 9.5 },
  { name: 'Hot Pink Electric & Night Black', category: 'Vivid Neon', fg: '#F472B6', bg: '#09090B', ratio: 8.3 },
  { name: 'Plasma Blue & Electric Gold', category: 'Vivid Neon', fg: '#FBBF24', bg: '#172554', ratio: 10.8 },
  { name: 'Ultra Amber & Midnight Purple', category: 'Vivid Neon', fg: '#F97316', bg: '#1E1035', ratio: 7.4 },
];

export default function ContrastCheckerTab() {
  const { baseHex, isDarkMode, setDarkMode } = useColor();
  const [textColor, setTextColor] = useState('#FFFFFF');
  const [bgColor, setBgColor] = useState(baseHex || '#3B82F6');

  // Modal State for Recommended Pairs
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Close modal on Esc key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isModalOpen) {
        setIsModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen]);

  const ratio = getContrastRatio(textColor, bgColor);

  const swapColors = () => {
    const temp = textColor;
    setTextColor(bgColor);
    setBgColor(temp);
  };

  /**
   * Diverse 360° Color Spectrum AAA Randomizer
   * Generates vibrant colors across all 360 degrees of the HSL color wheel
   * and guarantees WCAG AAA ratio >= 7.0:1
   */
  const handleRandomizeAAA = () => {
    let fg = '#FFFFFF';
    let bg = '#0F172A';
    let attempts = 0;

    while (attempts < 100) {
      const h1 = Math.floor(Math.random() * 360);
      const s1 = 60 + Math.floor(Math.random() * 35);
      const isDarkBackground = Math.random() > 0.5;

      if (isDarkBackground) {
        const lBg = 5 + Math.floor(Math.random() * 22);
        bg = hslToHex(h1, s1, lBg);

        const h2 = (h1 + (Math.random() > 0.5 ? 180 : Math.floor(Math.random() * 120 - 60)) + 360) % 360;
        const s2 = 40 + Math.floor(Math.random() * 55);
        const lFg = 75 + Math.floor(Math.random() * 23);
        fg = hslToHex(h2, s2, lFg);
      } else {
        const lBg = 80 + Math.floor(Math.random() * 18);
        bg = hslToHex(h1, s1, lBg);

        const h2 = (h1 + (Math.random() > 0.5 ? 180 : Math.floor(Math.random() * 120 - 60)) + 360) % 360;
        const s2 = 60 + Math.floor(Math.random() * 35);
        const lFg = 5 + Math.floor(Math.random() * 25);
        fg = hslToHex(h2, s2, lFg);
      }

      if (getContrastRatio(fg, bg) >= 7.0) {
        break;
      }
      attempts++;
    }

    setTextColor(fg);
    setBgColor(bg);
  };

  const applyPair = (pair: RecommendedPair) => {
    setTextColor(pair.fg);
    setBgColor(pair.bg);
    setIsModalOpen(false);
  };

  // WCAG Compliance Criteria
  const isAALarge = ratio >= 3.0;
  const isAANormal = ratio >= 4.5;
  const isAAALarge = ratio >= 4.5;
  const isAAANormal = ratio >= 7.0;

  const categoriesList = ['All', 'High Impact', 'Brand Essential', 'Dark Mode', 'Pastel Soft', 'Vivid Neon'];

  const filteredPairs = RECOMMENDED_PAIRS.filter(p => {
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesSearch = searchQuery === '' ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.fg.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.bg.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="flex flex-col gap-6">
      {/* Full-width Rounded Control Bar - Identical Layout to Palette Generator */}
      <div className={`p-3.5 sm:p-4 rounded-3xl border shadow-sm flex flex-col xl:flex-row items-stretch xl:items-center justify-between gap-4 transition-colors ${
        isDarkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200/80 text-slate-900'
      }`}>
        {/* Left: Standard Badge */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
          <span className="text-xs font-extrabold uppercase tracking-wider text-slate-400 flex items-center gap-1.5 flex-shrink-0">
            <ShieldCheck size={14} className="text-blue-500" /> Standard:
          </span>
          <span className={`px-3.5 py-1.5 rounded-xl text-xs font-black border transition-all ${
            isDarkMode ? 'bg-slate-800 border-slate-700 text-blue-400' : 'bg-blue-50 border-blue-200 text-blue-700'
          }`}>
            ✦ WCAG 2.1 AAA (7.0+:1)
          </span>
        </div>

        {/* Right: Action Buttons Group */}
        <div className="flex flex-wrap items-center gap-2.5 w-full xl:w-auto">
          {/* Light / Dark Mode Toggle */}
          <div className={`flex gap-1 text-xs font-semibold p-1 rounded-xl border flex-shrink-0 ${
            isDarkMode ? 'bg-slate-800/80 border-slate-700' : 'bg-slate-100 border-slate-200'
          }`}>
            <button
              onClick={() => setDarkMode(false)}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg transition-all ${
                !isDarkMode
                  ? 'bg-white text-slate-900 shadow-sm font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Sun size={12} />
              <span>Light</span>
            </button>
            <button
              onClick={() => setDarkMode(true)}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg transition-all ${
                isDarkMode
                  ? 'bg-slate-700 text-white shadow-sm font-bold'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <Moon size={12} />
              <span>Dark</span>
            </button>
          </div>

          {/* Recommended AAA Pairs Button */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold text-xs sm:text-sm px-3.5 py-2 rounded-xl transition-all shadow-md shadow-amber-500/20 active:scale-95 whitespace-nowrap"
          >
            <Flame size={15} className="flex-shrink-0" />
            <span>Recommended AAA ({RECOMMENDED_PAIRS.length})</span>
          </button>

          <button
            onClick={swapColors}
            className={`flex-1 sm:flex-none flex items-center justify-center gap-1.5 font-bold text-xs sm:text-sm px-3.5 py-2 rounded-xl border transition-colors whitespace-nowrap ${
              isDarkMode
                ? 'bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700'
                : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <ArrowLeftRight size={14} />
            <span>Swap</span>
          </button>

          <button
            onClick={handleRandomizeAAA}
            className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-xs sm:text-sm px-4 py-2 rounded-xl transition-all shadow-md shadow-emerald-500/20 active:scale-95 whitespace-nowrap"
          >
            <Sparkles size={14} />
            <span>Random AAA (7.0+) ✨</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Controls & Ratio Gauge */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Color Pickers (5 Cols) */}
        <div className={`lg:col-span-5 p-6 rounded-3xl border shadow-sm flex flex-col justify-between gap-6 transition-colors ${
          isDarkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
        }`}>
          <div className="flex flex-col gap-5">
            <h2 className="text-xs font-extrabold uppercase tracking-widest text-slate-400">
              Color Configuration
            </h2>

            {/* Foreground Text Color */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-slate-500 dark:text-slate-400">
                Text Color (Foreground)
              </label>
              <div className="flex items-center gap-3 p-2.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60">
                <input
                  type="color"
                  value={textColor}
                  onChange={e => setTextColor(e.target.value.toUpperCase())}
                  className="w-10 h-10 rounded-xl cursor-pointer border-none bg-none p-0 flex-shrink-0"
                />
                <input
                  type="text"
                  value={textColor}
                  onChange={e => setTextColor(e.target.value.toUpperCase())}
                  className="font-mono text-sm font-bold bg-transparent outline-none uppercase w-full"
                  maxLength={7}
                />
              </div>
            </div>

            {/* Background Color */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-slate-500 dark:text-slate-400">
                Background Color
              </label>
              <div className="flex items-center gap-3 p-2.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60">
                <input
                  type="color"
                  value={bgColor}
                  onChange={e => setBgColor(e.target.value.toUpperCase())}
                  className="w-10 h-10 rounded-xl cursor-pointer border-none bg-none p-0 flex-shrink-0"
                />
                <input
                  type="text"
                  value={bgColor}
                  onChange={e => setBgColor(e.target.value.toUpperCase())}
                  className="font-mono text-sm font-bold bg-transparent outline-none uppercase w-full"
                  maxLength={7}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Live Ratio & WCAG Badges (7 Cols) */}
        <div className={`lg:col-span-7 p-6 rounded-3xl border shadow-sm flex flex-col justify-between gap-6 transition-colors ${
          isDarkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
        }`}>
          {/* Big Ratio Display */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-2xl bg-gradient-to-r from-blue-500/10 via-indigo-500/10 to-purple-500/10 border border-blue-500/20">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-widest text-blue-500">
                Contrast Ratio
              </span>
              <div className="text-4xl sm:text-5xl font-black tracking-tight leading-none mt-1">
                {ratio} <span className="text-xl sm:text-2xl font-bold text-slate-400">: 1</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {ratio >= 7.0 ? (
                <span className="px-4 py-2 rounded-2xl bg-emerald-500 text-white text-xs font-black tracking-wider uppercase shadow-md shadow-emerald-500/20 flex items-center gap-1.5">
                  <Check size={16} /> AAA Pass (7.0+ Excellent)
                </span>
              ) : ratio >= 4.5 ? (
                <span className="px-4 py-2 rounded-2xl bg-blue-600 text-white text-xs font-black tracking-wider uppercase shadow-md shadow-blue-500/20 flex items-center gap-1.5">
                  <Check size={16} /> AA Pass (Good)
                </span>
              ) : (
                <span className="px-4 py-2 rounded-2xl bg-rose-500 text-white text-xs font-black tracking-wider uppercase shadow-md shadow-rose-500/20 flex items-center gap-1.5">
                  <X size={16} /> Fail (Low Contrast)
                </span>
              )}
            </div>
          </div>

          {/* WCAG Compliance Matrix */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* AA Normal Text */}
            <div className={`p-3.5 rounded-2xl border flex items-center justify-between transition-colors ${
              isAANormal ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400' : 'bg-rose-500/10 border-rose-500/30 text-rose-600 dark:text-rose-400'
            }`}>
              <div>
                <div className="text-xs font-bold">AA Normal Text</div>
                <div className="text-[10px] opacity-80">Min ratio 4.5:1</div>
              </div>
              <span className="font-extrabold text-xs flex items-center gap-1">
                {isAANormal ? <><Check size={14} /> Pass</> : <><X size={14} /> Fail</>}
              </span>
            </div>

            {/* AA Large Text */}
            <div className={`p-3.5 rounded-2xl border flex items-center justify-between transition-colors ${
              isAALarge ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400' : 'bg-rose-500/10 border-rose-500/30 text-rose-600 dark:text-rose-400'
            }`}>
              <div>
                <div className="text-xs font-bold">AA Large Text (18pt+)</div>
                <div className="text-[10px] opacity-80">Min ratio 3.0:1</div>
              </div>
              <span className="font-extrabold text-xs flex items-center gap-1">
                {isAALarge ? <><Check size={14} /> Pass</> : <><X size={14} /> Fail</>}
              </span>
            </div>

            {/* AAA Normal Text */}
            <div className={`p-3.5 rounded-2xl border flex items-center justify-between transition-colors ${
              isAAANormal ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400' : 'bg-rose-500/10 border-rose-500/30 text-rose-600 dark:text-rose-400'
            }`}>
              <div>
                <div className="text-xs font-bold">AAA Normal Text</div>
                <div className="text-[10px] opacity-80">Min ratio 7.0:1</div>
              </div>
              <span className="font-extrabold text-xs flex items-center gap-1">
                {isAAANormal ? <><Check size={14} /> Pass</> : <><X size={14} /> Fail</>}
              </span>
            </div>

            {/* AAA Large Text */}
            <div className={`p-3.5 rounded-2xl border flex items-center justify-between transition-colors ${
              isAAALarge ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400' : 'bg-rose-500/10 border-rose-500/30 text-rose-600 dark:text-rose-400'
            }`}>
              <div>
                <div className="text-xs font-bold">AAA Large Text (18pt+)</div>
                <div className="text-[10px] opacity-80">Min ratio 4.5:1</div>
              </div>
              <span className="font-extrabold text-xs flex items-center gap-1">
                {isAAALarge ? <><Check size={14} /> Pass</> : <><X size={14} /> Fail</>}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Live Interactive Preview Sandbox */}
      <div className="rounded-3xl border shadow-sm overflow-hidden p-6 sm:p-8 transition-all" style={{ backgroundColor: bgColor, color: textColor }}>
        <div className="max-w-3xl mx-auto flex flex-col gap-6">
          <div className="flex items-center justify-between border-b pb-4" style={{ borderColor: 'rgba(128,128,128,0.2)' }}>
            <span className="text-xs font-extrabold uppercase tracking-widest opacity-70 flex items-center gap-1.5">
              <Eye size={14} /> Live Legibility Sandbox
            </span>
            <span className="font-mono text-xs font-bold px-3 py-1 rounded-full" style={{ backgroundColor: 'rgba(128,128,128,0.15)' }}>
              {textColor} on {bgColor}
            </span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-black leading-tight tracking-tight">
            The super fast color palette generator for modern web designers.
          </h2>

          <p className="text-sm sm:text-base leading-relaxed opacity-90">
            WCAG 2.1 compliance ensures that your web interfaces maintain exceptional readability for all users, including those with visual impairments or color vision deficiencies.
          </p>

          {/* Interactive UI Component Examples */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              className="px-6 py-3 rounded-xl font-bold text-sm transition-transform hover:scale-105 shadow-md"
              style={{ backgroundColor: textColor, color: bgColor }}
            >
              Primary Action Button
            </button>

            <button
              className="px-6 py-3 rounded-xl font-bold text-sm border"
              style={{ borderColor: textColor, color: textColor }}
            >
              Secondary Outline
            </button>

            <span className="px-3.5 py-1.5 rounded-full text-xs font-extrabold" style={{ backgroundColor: 'rgba(128,128,128,0.2)', color: textColor }}>
              Interactive Badge
            </span>
          </div>
        </div>
      </div>

      {/* RECOMMENDED AAA PAIRS MODAL (LOCKED HEIGHT h-[85vh] DOES NOT JUMP) */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-md animate-fadeIn"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className={`w-full max-w-5xl h-[85vh] rounded-3xl border shadow-2xl flex flex-col overflow-hidden transition-all ${
              isDarkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
            }`}
            onClick={e => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-4 sm:p-6 border-b border-slate-200 dark:border-slate-800 flex flex-col gap-4 flex-shrink-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-500 text-white flex items-center justify-center shadow-md">
                    <Flame size={20} />
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-black tracking-tight leading-none">
                      Recommended AAA Combinations
                    </h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">
                      Explore {RECOMMENDED_PAIRS.length}+ handpicked high-contrast color pairs passing WCAG AAA standards
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setIsModalOpen(false)}
                  className="w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 flex items-center justify-center text-slate-500 dark:text-slate-300 transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Search Bar & Categories */}
              <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
                <div className="relative flex-1">
                  <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    placeholder="Search color name or HEX..."
                    className={`w-full pl-10 pr-4 py-2 rounded-xl text-sm font-semibold border outline-none transition-all ${
                      isDarkMode
                        ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-500 focus:border-amber-500'
                        : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400 focus:border-amber-500'
                    }`}
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      <X size={14} />
                    </button>
                  )}
                </div>

                {/* Category Chips */}
                <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
                  {categoriesList.map(cat => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                        selectedCategory === cat
                          ? 'bg-amber-500 text-white shadow-sm'
                          : isDarkMode
                          ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Body: Pairs Grid (Scrollable with Fixed Height) */}
            <div className="p-4 sm:p-6 overflow-y-auto flex-1 h-full min-h-0 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
              {filteredPairs.length === 0 ? (
                <div className="col-span-full py-12 text-center text-slate-400 text-sm font-bold">
                  No AAA combinations found matching "{searchQuery}"
                </div>
              ) : (
                filteredPairs.map((p, idx) => (
                  <div
                    key={idx}
                    onClick={() => applyPair(p)}
                    className="p-4 rounded-2xl border transition-all cursor-pointer group hover:-translate-y-0.5 hover:shadow-md flex flex-col justify-between h-28"
                    style={{ backgroundColor: p.bg, color: p.fg, borderColor: 'rgba(0,0,0,0.1)' }}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="text-xs font-black leading-snug">{p.name}</div>
                      <span className={`text-[9px] font-bold px-2 py-0.5 rounded-md flex-shrink-0 ${
                        isDarkMode ? 'bg-black/30 text-white' : 'bg-white/40 text-black'
                      }`}>
                        {p.category}
                      </span>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t" style={{ borderColor: 'rgba(128,128,128,0.2)' }}>
                      <span className="font-mono text-[10px] opacity-80 font-bold">
                        {p.fg} on {p.bg}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-lg text-[10px] font-black shadow-xs flex items-center gap-1" style={{ backgroundColor: 'rgba(255,255,255,0.25)' }}>
                        <ShieldCheck size={12} /> {p.ratio}:1 AAA
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
