'use client';
import { Palette, Layers } from 'lucide-react';
import { useColor } from '@/context/ColorContext';

interface HeaderProps {
  activeTab: 'palette' | 'tailwind';
  setActiveTab: (tab: 'palette' | 'tailwind') => void;
}

export default function Header({ activeTab, setActiveTab }: HeaderProps) {
  const { isDarkMode } = useColor();

  return (
    <header className={`backdrop-blur-md border-b sticky top-0 z-50 transition-colors ${
      isDarkMode ? 'bg-slate-900/90 border-slate-800 text-white' : 'bg-white/80 border-slate-200/80 text-slate-900'
    }`}>
      <div className="max-w-[1400px] mx-auto px-5 h-14 flex items-center justify-between">
        {/* Brand Logo & Title */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setActiveTab('palette')}>
            <span className="text-xl text-blue-500 font-bold">✦</span>
            <span className="font-black text-xl tracking-tight">
              Aura<span className="text-blue-500">Gen</span>
            </span>
          </div>

          {/* Nav Tabs */}
          <nav className={`flex items-center gap-1.5 p-1 rounded-xl border ${
            isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-slate-100/80 border-slate-200/60'
          }`}>
            <button
              onClick={() => setActiveTab('palette')}
              className={`flex items-center gap-2 text-xs font-bold px-3.5 py-1.5 rounded-lg transition-all ${
                activeTab === 'palette'
                  ? isDarkMode ? 'bg-slate-700 text-white shadow-sm' : 'bg-white text-slate-900 shadow-sm'
                  : isDarkMode ? 'text-slate-400 hover:text-slate-100' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <Palette size={14} />
              <span>Palette Generator</span>
            </button>
            <button
              onClick={() => setActiveTab('tailwind')}
              className={`flex items-center gap-2 text-xs font-bold px-3.5 py-1.5 rounded-lg transition-all ${
                activeTab === 'tailwind'
                  ? isDarkMode ? 'bg-slate-700 text-white shadow-sm' : 'bg-white text-slate-900 shadow-sm'
                  : isDarkMode ? 'text-slate-400 hover:text-slate-100' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <Layers size={14} />
              <span>Tailwind Studio</span>
            </button>
          </nav>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          <a
            href="https://buymeacoffee.com/prayebin"
            target="_blank"
            rel="noreferrer"
            className="bg-amber-400 hover:bg-amber-500 text-amber-950 font-bold text-xs px-3.5 py-2 rounded-xl transition-all shadow-sm flex items-center gap-1.5"
          >
            <span>☕</span>
            <span>Support</span>
          </a>
        </div>
      </div>
    </header>
  );
}
