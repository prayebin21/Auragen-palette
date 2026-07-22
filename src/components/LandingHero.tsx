'use client';

import { useState } from 'react';
import { Sparkles, Layers, ArrowRight, CheckCircle2, Download, Code, Shuffle, Check, Palette, Sliders, Flame } from 'lucide-react';
import { useColor } from '@/context/ColorContext';
import { randomHex } from '@/lib/colorUtils';

interface LandingHeroProps {
  onStartGenerator: () => void;
  onExploreStudio: () => void;
}

export default function LandingHero({ onStartGenerator, onExploreStudio }: LandingHeroProps) {
  const { isDarkMode } = useColor();
  const [heroColors, setHeroColors] = useState<string[]>([
    '#FF5964', '#FFE74C', '#6BF178', '#35A7FF', '#7209B7'
  ]);
  const [copiedHex, setCopiedHex] = useState<string | null>(null);

  const randomizeHeroColors = () => {
    setHeroColors([
      randomHex(), randomHex(), randomHex(), randomHex(), randomHex()
    ]);
  };

  const copyHeroHex = async (hex: string, e: React.MouseEvent) => {
    e.stopPropagation();
    await navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 1500);
  };

  return (
    <div className="relative py-4 sm:py-8 md:py-10">

      {/* TOPOGRAPHIC CONTOUR LINES VECTOR OVERLAY */}
      <div className="absolute top-0 right-0 w-full md:w-2/3 h-full pointer-events-none opacity-25 -z-10 overflow-hidden">
        <svg viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-[#8C7355]/30">
          <path d="M150 100 Q 300 50, 450 150 T 750 200" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <path d="M100 200 Q 280 120, 500 220 T 780 320" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <path d="M50 300 Q 320 200, 550 300 T 800 450" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <path d="M200 400 Q 400 320, 600 420 T 820 550" fill="none" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </div>

      {/* HERO MAIN CONTENT GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center mb-10 sm:mb-16">
        
        {/* LEFT COLUMN: Designer Centric Typography & Action Buttons */}
        <div className="lg:col-span-6 flex flex-col gap-4 sm:gap-5 pr-0 sm:pr-2">
          {/* Web Designer Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[11px] sm:text-xs font-bold w-fit bg-[#E5D7C4]/90 border border-[#8C7355]/30 text-[#4A3B2C] shadow-xs backdrop-blur-md">
            <Palette size={13} className="text-orange-600 flex-shrink-0" />
            <span className="truncate">Crafted for UI/UX Designers &amp; Frontend Devs</span>
          </div>

          {/* Headline - Responsive mobile sizing */}
          <div className="relative">
            <h1 className={`text-3xl sm:text-4xl lg:text-[2.75rem] xl:text-[3.15rem] font-black tracking-tight leading-[1.15] ${
              isDarkMode ? 'text-white' : 'text-slate-900'
            }`}>
              The super fast <br />
              <span className="inline-block pr-2 sm:pr-4 font-playfair italic font-extrabold bg-gradient-to-r from-[#D9531E] via-[#C87932] to-[#B84032] bg-clip-text text-transparent">
                color palettes
              </span> <br />
              generator!
            </h1>
          </div>

          {/* Subtitle */}
          <p className={`text-xs sm:text-base font-medium leading-relaxed max-w-md ${
            isDarkMode ? 'text-slate-400' : 'text-slate-700/90'
          }`}>
            Create perfect color palettes for your design systems, generate full 50–950 Tailwind CSS color scales, and preview live UI components with 1-click React export.
          </p>

          {/* Pill CTA Buttons - Fixed whitespace-nowrap and min-width to prevent deformation */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-1">
            <button
              onClick={onStartGenerator}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2.5 bg-[#FAF6EE] hover:bg-white text-slate-900 font-extrabold text-sm sm:text-base px-6 py-3.5 rounded-full transition-all shadow-md active:scale-95 border-2 border-[#8C7355]/40 whitespace-nowrap min-w-[200px] group"
            >
              <Sparkles size={16} className="text-orange-600 flex-shrink-0 group-hover:rotate-12 transition-transform" />
              <span>Start the Generator</span>
              <ArrowRight size={16} className="text-slate-900 flex-shrink-0 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={onExploreStudio}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-[#FAF6EE]/80 hover:bg-white text-slate-900 font-extrabold text-sm sm:text-base px-6 py-3.5 rounded-full transition-all active:scale-95 border-2 border-[#8C7355]/30 shadow-xs whitespace-nowrap min-w-[200px]"
            >
              <Layers size={16} className="text-[#8C7355] flex-shrink-0" />
              <span>Explore Tailwind Studio</span>
            </button>
          </div>

          {/* Designer Tool Badges */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-5 pt-2 text-[11px] sm:text-xs font-bold text-slate-700">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 size={15} className="text-[#8C7355]" />
              <span>160+ Curated Palettes</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 size={15} className="text-[#8C7355]" />
              <span>Tailwind 50–950 Scale</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 size={15} className="text-[#8C7355]" />
              <span>JSX &amp; PNG Export</span>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Mobile Responsive 3D Color Palettes Stack */}
        <div className="lg:col-span-6 relative flex justify-center items-center py-2 sm:py-4">
          
          {/* Subtle Multi-layered Ambient Glow */}
          <div className="absolute w-72 sm:w-96 h-72 sm:h-96 bg-gradient-to-tr from-orange-400/25 via-pink-500/20 to-blue-500/25 rounded-full blur-3xl -z-10 animate-pulse"></div>

          {/* Mobile Responsive 3D Stack Container */}
          <div className="relative w-full max-w-xl h-[330px] sm:h-[450px] flex items-center justify-center">
            
            {/* Card 1 (Back Layer - Cyberpunk) */}
            <div className="absolute top-1 sm:top-2 -rotate-12 w-[90%] h-40 sm:h-56 rounded-2xl sm:rounded-3xl p-2.5 sm:p-4 shadow-xl border border-white/40 dark:border-white/10 transition-transform duration-500 hover:rotate-0 grid grid-cols-5 gap-1.5 sm:gap-2.5 bg-white/50 dark:bg-slate-900/60 backdrop-blur-md">
              {['#0D0221', '#020887', '#38369A', '#8963B4', '#F72585'].map((hex, i) => (
                <div key={i} className="h-full rounded-xl sm:rounded-2xl flex items-end p-1.5 sm:p-2.5 shadow-sm" style={{ backgroundColor: hex }}>
                  <span className="text-[8px] sm:text-[10px] font-mono font-bold text-white/80 uppercase truncate">{hex}</span>
                </div>
              ))}
            </div>

            {/* Card 2 (Middle Layer - Warm Sunset) */}
            <div className="absolute top-8 sm:top-12 rotate-6 w-[94%] h-40 sm:h-56 rounded-2xl sm:rounded-3xl p-2.5 sm:p-4 shadow-2xl border border-white/50 dark:border-white/15 transition-transform duration-500 hover:rotate-0 grid grid-cols-5 gap-1.5 sm:gap-2.5 bg-white/60 dark:bg-slate-900/70 backdrop-blur-lg">
              {['#2B1B17', '#4A2C2A', '#8C4A32', '#C68B59', '#E7D4C0'].map((hex, i) => (
                <div key={i} className="h-full rounded-xl sm:rounded-2xl flex items-end p-1.5 sm:p-2.5 shadow-sm" style={{ backgroundColor: hex }}>
                  <span className="text-[8px] sm:text-[10px] font-mono font-bold text-white/80 uppercase truncate">{hex}</span>
                </div>
              ))}
            </div>

            {/* Card 3 (Front Main Interactive Layer - Grand Glassmorphism) */}
            <div className="absolute bottom-2 sm:bottom-4 w-full h-[200px] sm:h-[270px] rounded-2xl sm:rounded-3xl p-3 sm:p-5 shadow-2xl border border-white/80 dark:border-white/20 transition-all duration-300 hover:scale-[1.02] grid grid-cols-5 gap-2 sm:gap-3.5 bg-white/85 dark:bg-slate-900/90 backdrop-blur-2xl">
              {heroColors.map((hex, i) => {
                const isCopied = copiedHex === hex;
                return (
                  <div
                    key={i}
                    onClick={(e) => copyHeroHex(hex, e)}
                    className="h-full rounded-xl sm:rounded-2xl flex flex-col justify-end p-1.5 sm:p-3 transition-transform hover:scale-95 cursor-pointer shadow-md group relative overflow-hidden"
                    style={{ backgroundColor: hex }}
                    title={`Click to copy ${hex}`}
                  >
                    <div className="z-10 bg-black/40 backdrop-blur-md px-1 py-1 sm:px-1.5 sm:py-1.5 rounded-lg sm:rounded-xl text-center border border-white/20 shadow-xs">
                      <span className="text-[8px] sm:text-[11px] font-mono font-black text-white uppercase tracking-wider block truncate">
                        {isCopied ? <Check size={10} className="mx-auto text-green-400" /> : hex}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Enlarged Floating Action Buttons below 3D stack */}
            <div className="absolute -bottom-4 right-2 sm:right-6 z-20 flex items-center gap-2 sm:gap-3">
              <button
                onClick={randomizeHeroColors}
                className="bg-slate-900 text-white hover:bg-slate-800 px-4 py-2 sm:px-6 sm:py-3 rounded-full shadow-2xl border border-slate-700 flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-black transition-all active:scale-95"
              >
                <Shuffle size={13} className="text-orange-400 flex-shrink-0" />
                <span>Randomize</span>
              </button>

              <div className="bg-white/95 dark:bg-slate-800/95 text-slate-900 dark:text-white px-3 py-2 sm:px-4 sm:py-3 rounded-full shadow-2xl border border-slate-200 dark:border-slate-700 flex items-center gap-1.5 text-[11px] sm:text-xs font-extrabold backdrop-blur-md">
                <Flame size={13} className="text-amber-500 flex-shrink-0" />
                <span>Live Studio</span>
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* FEATURE SHOWCASE CARDS (1 Column on Mobile, 4 Columns on Desktop) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 pt-2">
        
        {/* Card 1: Color Harmonies */}
        <div
          className={`p-5 sm:p-6 rounded-3xl border transition-all ${
            isDarkMode
              ? 'bg-slate-900/60 border-slate-800'
              : 'bg-white/70 border-[#8C7355]/20 shadow-xs backdrop-blur-md'
          }`}
        >
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-[40%_60%_70%_30%/50%_60%_30%_70%] bg-[#E5D7C4] text-[#4A3B2C] flex items-center justify-center mb-3 sm:mb-4">
            <Sliders size={18} />
          </div>
          <h3 className={`text-sm sm:text-base font-extrabold mb-1 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
            Color Harmonies &amp; HSL
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Generate complementary, warm, pastel, and vivid color harmonies with instant HSL lock controls.
          </p>
        </div>

        {/* Card 2: Tailwind Scales */}
        <div
          className={`p-5 sm:p-6 rounded-3xl border transition-all ${
            isDarkMode
              ? 'bg-slate-900/60 border-slate-800'
              : 'bg-white/70 border-[#8C7355]/20 shadow-xs backdrop-blur-md'
          }`}
        >
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-[60%_40%_30%_70%/60%_30%_70%_40%] bg-[#E5D7C4] text-[#4A3B2C] flex items-center justify-center mb-3 sm:mb-4">
            <Layers size={18} />
          </div>
          <h3 className={`text-sm sm:text-base font-extrabold mb-1 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
            Tailwind 50–950 Scales
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Generate full 50–950 Tailwind color scales with real UI component visualizers and contrast scores.
          </p>
        </div>

        {/* Card 3: Design Tokens & JSX */}
        <div
          className={`p-5 sm:p-6 rounded-3xl border transition-all ${
            isDarkMode
              ? 'bg-slate-900/60 border-slate-800'
              : 'bg-white/70 border-[#8C7355]/20 shadow-xs backdrop-blur-md'
          }`}
        >
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-[50%_50%_70%_30%/30%_70%_50%_50%] bg-[#E5D7C4] text-[#4A3B2C] flex items-center justify-center mb-3 sm:mb-4">
            <Code size={18} />
          </div>
          <h3 className={`text-sm sm:text-base font-extrabold mb-1 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
            Design Tokens &amp; JSX
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            1-click export for Tailwind Config theme objects, React / JSX UI components, and CSS Variables.
          </p>
        </div>

        {/* Card 4: PNG Export */}
        <div
          className={`p-5 sm:p-6 rounded-3xl border transition-all ${
            isDarkMode
              ? 'bg-slate-900/60 border-slate-800'
              : 'bg-white/70 border-[#8C7355]/20 shadow-xs backdrop-blur-md'
          }`}
        >
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-[40%_60%_40%_60%/60%_40%_60%_40%] bg-[#E5D7C4] text-[#4A3B2C] flex items-center justify-center mb-3 sm:mb-4">
            <Download size={18} />
          </div>
          <h3 className={`text-sm sm:text-base font-extrabold mb-1 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
            High-Res PNG Export
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Export full-page PNG images or individual cards with off-screen ✦ AuraGen watermarking for Figma.
          </p>
        </div>

      </div>
    </div>
  );
}
