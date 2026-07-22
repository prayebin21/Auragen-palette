'use client';
import { Palette, Layers, Home, ShieldCheck } from 'lucide-react';
import { useColor } from '@/context/ColorContext';

export type TabType = 'home' | 'palette' | 'tailwind' | 'contrast';

interface HeaderProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
}

export default function Header({ activeTab, setActiveTab }: HeaderProps) {
  const { isDarkMode } = useColor();

  return (
    <header className={`backdrop-blur-md border-b sticky top-0 z-50 transition-colors ${
      isDarkMode ? 'bg-slate-900/90 border-slate-800 text-white' : 'bg-[#FAF6EE]/90 border-amber-900/10 text-slate-900'
    }`}>
      <div className="max-w-[1400px] mx-auto px-4 sm:px-5 py-3 flex flex-col sm:flex-row items-center justify-between gap-3">
        
        {/* Top Row on Mobile: Logo on Left, Support on Right */}
        <div className="w-full sm:w-auto flex items-center justify-between gap-3">
          {/* Brand Logo */}
          <div
            className="flex items-center gap-2 cursor-pointer group flex-shrink-0"
            onClick={() => setActiveTab('home')}
          >
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-600 to-orange-500 text-white flex items-center justify-center text-base font-bold shadow-md group-hover:scale-105 transition-transform flex-shrink-0">
              ✦
            </div>
            <span className="font-black text-lg sm:text-xl tracking-tight leading-none">
              Aura<span className="text-orange-600">Gen</span>
            </span>
          </div>

          {/* Support Button on Mobile */}
          <a
            href="https://buymeacoffee.com/prayebin"
            target="_blank"
            rel="noreferrer"
            className="sm:hidden bg-amber-400 hover:bg-amber-500 text-amber-950 font-extrabold text-xs px-3.5 py-1.5 rounded-full transition-all shadow-xs flex items-center gap-1.5 active:scale-95 border border-amber-500/30 flex-shrink-0"
          >
            <span>☕</span>
            <span>Support</span>
          </a>
        </div>

        {/* Navigation Tabs - Full Width Grid on Mobile, Flex on Desktop */}
        <nav className={`w-full sm:w-auto grid grid-cols-4 sm:flex items-center gap-1 p-1 rounded-2xl border ${
          isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white/80 border-amber-900/10 shadow-xs'
        }`}>
          <button
            onClick={() => setActiveTab('home')}
            className={`flex items-center justify-center gap-1.5 text-xs font-extrabold px-2.5 sm:px-3.5 py-2 rounded-xl transition-all whitespace-nowrap ${
              activeTab === 'home'
                ? isDarkMode ? 'bg-slate-700 text-white shadow-sm' : 'bg-amber-100/80 text-amber-950 shadow-xs'
                : isDarkMode ? 'text-slate-400 hover:text-slate-100' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Home size={14} className="flex-shrink-0" />
            <span>Home</span>
          </button>

          <button
            onClick={() => setActiveTab('palette')}
            className={`flex items-center justify-center gap-1.5 text-xs font-extrabold px-2.5 sm:px-3.5 py-2 rounded-xl transition-all whitespace-nowrap ${
              activeTab === 'palette'
                ? isDarkMode ? 'bg-slate-700 text-white shadow-sm' : 'bg-amber-100/80 text-amber-950 shadow-xs'
                : isDarkMode ? 'text-slate-400 hover:text-slate-100' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Palette size={14} className="flex-shrink-0" />
            <span className="hidden sm:inline">Palette Generator</span>
            <span className="sm:hidden">Palette</span>
          </button>

          <button
            onClick={() => setActiveTab('tailwind')}
            className={`flex items-center justify-center gap-1.5 text-xs font-extrabold px-2.5 sm:px-3.5 py-2 rounded-xl transition-all whitespace-nowrap ${
              activeTab === 'tailwind'
                ? isDarkMode ? 'bg-slate-700 text-white shadow-sm' : 'bg-amber-100/80 text-amber-950 shadow-xs'
                : isDarkMode ? 'text-slate-400 hover:text-slate-100' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Layers size={14} className="flex-shrink-0" />
            <span className="hidden sm:inline">Tailwind Studio</span>
            <span className="sm:hidden">Studio</span>
          </button>

          <button
            onClick={() => setActiveTab('contrast')}
            className={`flex items-center justify-center gap-1.5 text-xs font-extrabold px-2.5 sm:px-3.5 py-2 rounded-xl transition-all whitespace-nowrap ${
              activeTab === 'contrast'
                ? isDarkMode ? 'bg-slate-700 text-white shadow-sm' : 'bg-amber-100/80 text-amber-950 shadow-xs'
                : isDarkMode ? 'text-slate-400 hover:text-slate-100' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <ShieldCheck size={14} className="flex-shrink-0" />
            <span className="hidden sm:inline">Contrast Checker</span>
            <span className="sm:hidden">Contrast</span>
          </button>
        </nav>

        {/* Support Button on Desktop */}
        <a
          href="https://buymeacoffee.com/prayebin"
          target="_blank"
          rel="noreferrer"
          className="hidden sm:flex bg-amber-400 hover:bg-amber-500 text-amber-950 font-extrabold text-xs px-4 py-2 rounded-full transition-all shadow-xs items-center gap-1.5 active:scale-95 border border-amber-500/30 flex-shrink-0"
        >
          <span>☕</span>
          <span>Support</span>
        </a>

      </div>
    </header>
  );
}
