'use client';
import { Palette, Layers } from 'lucide-react';

interface HeaderProps {
  activeTab: 'palette' | 'tailwind';
  setActiveTab: (tab: 'palette' | 'tailwind') => void;
}

export default function Header({ activeTab, setActiveTab }: HeaderProps) {
  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-slate-200/80 sticky top-0 z-50">
      <div className="max-w-[1400px] mx-auto px-5 h-14 flex items-center justify-between">
        {/* Brand Logo & Title */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setActiveTab('palette')}>
            <span className="text-xl text-blue-600 font-bold">✦</span>
            <span className="font-black text-slate-900 text-xl tracking-tight">
              Aura<span className="text-blue-600">Gen</span>
            </span>
          </div>

          {/* Nav Tabs */}
          <nav className="flex items-center gap-1.5 bg-slate-100/80 p-1 rounded-xl">
            <button
              onClick={() => setActiveTab('palette')}
              className={`flex items-center gap-2 text-xs font-bold px-3.5 py-1.5 rounded-lg transition-all ${
                activeTab === 'palette'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <Palette size={14} />
              <span>Palette Generator</span>
            </button>
            <button
              onClick={() => setActiveTab('tailwind')}
              className={`flex items-center gap-2 text-xs font-bold px-3.5 py-1.5 rounded-lg transition-all ${
                activeTab === 'tailwind'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-500 hover:text-slate-900'
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
