'use client';
import { Palette, Layers, Home } from 'lucide-react';
import { useColor } from '@/context/ColorContext';

interface HeaderProps {
  activeTab: 'home' | 'palette' | 'tailwind';
  setActiveTab: (tab: 'home' | 'palette' | 'tailwind') => void;
}

export default function Header({ activeTab, setActiveTab }: HeaderProps) {
  const { isDarkMode } = useColor();

  return (
    <header className={`backdrop-blur-md border-b sticky top-0 z-50 transition-colors ${
      isDarkMode ? 'bg-slate-900/90 border-slate-800 text-white' : 'bg-[#FAF6EE]/90 border-amber-900/10 text-slate-900'
    }`}>
      <div className="max-w-[1400px] mx-auto px-4 sm:px-5 py-2.5 flex flex-wrap items-center justify-between gap-3">
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

        {/* Nav Tabs - Clean Unconstrained Pill Navigation */}
        <nav className={`flex items-center gap-1 p-1 rounded-2xl border flex-shrink-0 ${
          isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white/80 border-amber-900/10 shadow-xs'
        }`}>
          <button
            onClick={() => setActiveTab('home')}
            className={`flex items-center gap-1.5 text-xs font-extrabold px-3 py-1.5 rounded-xl transition-all whitespace-nowrap ${
              activeTab === 'home'
                ? isDarkMode ? 'bg-slate-700 text-white shadow-sm' : 'bg-amber-100/80 text-amber-950 shadow-xs'
                : isDarkMode ? 'text-slate-400 hover:text-slate-100' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Home size={14} />
            <span>Home</span>
          </button>
          <button
            onClick={() => setActiveTab('palette')}
            className={`flex items-center gap-1.5 text-xs font-extrabold px-3 py-1.5 rounded-xl transition-all whitespace-nowrap ${
              activeTab === 'palette'
                ? isDarkMode ? 'bg-slate-700 text-white shadow-sm' : 'bg-amber-100/80 text-amber-950 shadow-xs'
                : isDarkMode ? 'text-slate-400 hover:text-slate-100' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Palette size={14} />
            <span>Palette Generator</span>
          </button>
          <button
            onClick={() => setActiveTab('tailwind')}
            className={`flex items-center gap-1.5 text-xs font-extrabold px-3 py-1.5 rounded-xl transition-all whitespace-nowrap ${
              activeTab === 'tailwind'
                ? isDarkMode ? 'bg-slate-700 text-white shadow-sm' : 'bg-amber-100/80 text-amber-950 shadow-xs'
                : isDarkMode ? 'text-slate-400 hover:text-slate-100' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Layers size={14} />
            <span>Tailwind Studio</span>
          </button>
        </nav>

        {/* Support Button */}
        <a
          href="https://buymeacoffee.com/prayebin"
          target="_blank"
          rel="noreferrer"
          className="bg-amber-400 hover:bg-amber-500 text-amber-950 font-extrabold text-xs px-4 py-2 rounded-full transition-all shadow-xs flex items-center gap-1.5 active:scale-95 border border-amber-500/30 flex-shrink-0 ml-auto sm:ml-0"
        >
          <span>☕</span>
          <span>Support</span>
        </a>
      </div>
    </header>
  );
}
