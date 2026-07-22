'use client';
import { useState, useEffect, useCallback, useRef } from 'react';
import { Lock, Unlock, Copy, Check, RefreshCw, SlidersHorizontal, Sparkles, Image as ImageIcon, Loader2, Sun, Moon } from 'lucide-react';
import { hexToRgb } from '@/lib/colorUtils';
import { downloadElementAsPng, getExportFileName } from '@/lib/exportUtils';
import { useColor } from '@/context/ColorContext';

interface PaletteColor {
  hex: string;
  locked: boolean;
}

type ColorMode = 'harmony' | 'warm' | 'vivid' | 'pastel' | 'cool';

function randomHsl(mode: ColorMode): [number, number, number] {
  let h = Math.floor(Math.random() * 360);
  let s = Math.floor(Math.random() * 40) + 60;
  let l = Math.floor(Math.random() * 40) + 40;

  if (mode === 'warm') {
    h = (Math.random() > 0.3) ? Math.floor(Math.random() * 55) : Math.floor(Math.random() * 30) + 330;
    s = Math.floor(Math.random() * 30) + 70;
    l = Math.floor(Math.random() * 25) + 45;
  } else if (mode === 'cool') {
    h = Math.floor(Math.random() * 140) + 140;
    s = Math.floor(Math.random() * 30) + 60;
    l = Math.floor(Math.random() * 30) + 40;
  } else if (mode === 'vivid') {
    s = Math.floor(Math.random() * 15) + 85;
    l = Math.floor(Math.random() * 20) + 45;
  } else if (mode === 'pastel') {
    s = Math.floor(Math.random() * 30) + 35;
    l = Math.floor(Math.random() * 15) + 75;
  }

  return [h, s, l];
}

function hslToHex(h: number, s: number, l: number): string {
  l /= 100;
  const a = (s * Math.min(l, 1 - l)) / 100;
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const c = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * c).toString(16).padStart(2, '0');
  };
  return `#${f(0)}${f(8)}${f(4)}`.toUpperCase();
}

function getContrastColor(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.55 ? '#0f172a' : '#ffffff';
}

export default function PaletteGeneratorTab() {
  const { isDarkMode, setDarkMode } = useColor();
  const [mode, setMode] = useState<ColorMode>('harmony');
  const [colors, setColors] = useState<PaletteColor[]>(() => [
    { hex: '#3B82F6', locked: false },
    { hex: '#6366F1', locked: false },
    { hex: '#8B5CF6', locked: false },
    { hex: '#EC4899', locked: false },
    { hex: '#F43F5E', locked: false },
  ]);
  const [copiedHex, setCopiedHex] = useState<string | null>(null);
  const [copiedAll, setCopiedAll] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);

  const generatePalette = useCallback(() => {
    setColors(prev =>
      prev.map(c => {
        if (c.locked) return c;
        const [h, s, l] = randomHsl(mode);
        return { ...c, hex: hslToHex(h, s, l) };
      })
    );
  }, [mode]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' && e.target === document.body) {
        e.preventDefault();
        generatePalette();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [generatePalette]);

  const toggleLock = (index: number) => {
    setColors(prev =>
      prev.map((c, i) => (i === index ? { ...c, locked: !c.locked } : c))
    );
  };

  const updateColor = (index: number, newHex: string) => {
    if (/^#[0-9A-F]{6}$/i.test(newHex)) {
      setColors(prev =>
        prev.map((c, i) => (i === index ? { ...c, hex: newHex.toUpperCase() } : c))
      );
    }
  };

  const copyHex = async (hex: string) => {
    await navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 1500);
  };

  const copyAll = async () => {
    const allHex = colors.map(c => `${c.hex} (${hexToRgb(c.hex)})`).join(', ');
    await navigator.clipboard.writeText(allHex);
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2000);
  };

  const exportPng = async () => {
    if (!gridRef.current) return;
    setIsExporting(true);
    const filename = getExportFileName('palgen');
    await downloadElementAsPng(gridRef.current, filename);
    setIsExporting(false);
  };

  const modes: { id: ColorMode; label: string }[] = [
    { id: 'harmony', label: '✦ Harmony' },
    { id: 'warm', label: '🔥 Warm' },
    { id: 'vivid', label: '⚡ Vivid' },
    { id: 'pastel', label: '🌸 Pastel' },
    { id: 'cool', label: '❄️ Cool' },
  ];

  return (
    <div className="flex flex-col gap-5">
      {/* Control Bar */}
      <div className={`border p-4 rounded-3xl shadow-sm flex flex-wrap items-center justify-between gap-4 transition-colors ${
        isDarkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200/80 text-slate-900'
      }`}>
        {/* Mode Selector Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto py-1">
          <span className={`text-xs font-bold uppercase tracking-wider mr-2 flex items-center gap-1 ${
            isDarkMode ? 'text-slate-400' : 'text-slate-400'
          }`}>
            <SlidersHorizontal size={13} /> Mode:
          </span>
          {modes.map(m => (
            <button
              key={m.id}
              onClick={() => setMode(m.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                mode === m.id
                  ? isDarkMode ? 'bg-blue-600 text-white shadow-sm' : 'bg-slate-900 text-white shadow-sm'
                  : isDarkMode ? 'bg-slate-800 text-slate-300 hover:bg-slate-700' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          {/* Light / Dark Mode Toggle */}
          <div className={`flex gap-1 text-xs font-semibold p-1 rounded-xl border ${
            isDarkMode ? 'bg-slate-800/80 border-slate-700' : 'bg-slate-100 border-slate-200'
          }`}>
            <button
              onClick={() => setDarkMode(false)}
              className={`flex items-center gap-1 px-3 py-1 rounded-lg transition-all ${
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
              className={`flex items-center gap-1 px-3 py-1 rounded-lg transition-all ${
                isDarkMode
                  ? 'bg-slate-700 text-white shadow-sm font-bold'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <Moon size={12} />
              <span>Dark</span>
            </button>
          </div>

          <span className="hidden lg:inline-block text-xs font-semibold text-slate-400">
            Press <kbd className={`px-2 py-1 border rounded-md font-mono text-[11px] ${
              isDarkMode ? 'bg-slate-800 border-slate-700 text-slate-300' : 'bg-slate-100 border-slate-200 text-slate-600'
            }`}>Spacebar</kbd> to generate
          </span>
          <button
            onClick={generatePalette}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm px-4 py-2 rounded-xl transition-all shadow-md shadow-blue-500/20 active:scale-95"
          >
            <RefreshCw size={15} />
            Generate
          </button>
          <button
            onClick={copyAll}
            className={`flex items-center gap-1.5 font-bold text-sm px-4 py-2 rounded-xl transition-colors ${
              isDarkMode ? 'bg-slate-800 hover:bg-slate-700 text-slate-200' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            {copiedAll ? <Check size={15} className="text-green-500" /> : <Copy size={15} />}
            {copiedAll ? 'Copied All!' : 'Copy HEX & RGB'}
          </button>
          <button
            onClick={exportPng}
            disabled={isExporting}
            className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm px-4 py-2 rounded-xl transition-all shadow-md shadow-emerald-500/20 disabled:opacity-50 active:scale-95"
          >
            {isExporting ? <Loader2 size={15} className="animate-spin" /> : <ImageIcon size={15} />}
            {isExporting ? 'Exporting...' : 'Export PNG'}
          </button>
        </div>
      </div>

      {/* 5 Big Color Columns Grid (Exported container) */}
      <div ref={gridRef} className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 min-h-[460px] p-4 rounded-3xl relative transition-colors ${
        isDarkMode ? 'bg-slate-900 border border-slate-800' : 'bg-white'
      }`}>
        {colors.map((color, index) => {
          const contrast = getContrastColor(color.hex);
          const isCopied = copiedHex === color.hex;
          const rgbString = hexToRgb(color.hex);

          return (
            <div
              key={index}
              className="rounded-3xl p-6 flex flex-col justify-between relative group transition-all duration-300 shadow-sm border border-black/5 min-h-[380px]"
              style={{ backgroundColor: color.hex, color: contrast }}
            >
              {/* Top Controls (Hidden in exported image) */}
              <div className="flex items-center justify-between z-10 export-hide">
                <button
                  onClick={() => toggleLock(index)}
                  className="w-10 h-10 rounded-2xl flex items-center justify-center backdrop-blur-md transition-all hover:scale-105"
                  style={{
                    backgroundColor: color.locked ? 'rgba(0,0,0,0.35)' : 'rgba(255,255,255,0.25)',
                    color: color.locked ? '#fff' : contrast,
                  }}
                  title={color.locked ? 'Click to Unlock' : 'Click to Lock'}
                >
                  {color.locked ? <Lock size={18} /> : <Unlock size={18} />}
                </button>

                <label className="w-10 h-10 rounded-2xl flex items-center justify-center backdrop-blur-md cursor-pointer transition-transform hover:scale-105" style={{ backgroundColor: 'rgba(255,255,255,0.25)' }}>
                  <input
                    type="color"
                    value={color.hex}
                    onChange={e => updateColor(index, e.target.value)}
                    className="opacity-0 w-0 h-0 absolute"
                  />
                  <Sparkles size={16} />
                </label>
              </div>

              {/* Center Lock Status Badge (Hidden in exported image) */}
              <div className="my-auto text-center py-6 export-hide">
                {color.locked && (
                  <span
                    className="text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-sm"
                    style={{ backgroundColor: 'rgba(0,0,0,0.4)', color: '#fff' }}
                  >
                    LOCKED
                  </span>
                )}
              </div>

              {/* Bottom Codes (HEX & RGB Always Visible, Copy button hidden in export) */}
              <div className="flex flex-col items-center gap-1.5 z-10 mt-auto">
                <span className="font-mono text-2xl font-black tracking-wider uppercase leading-none">
                  {color.hex}
                </span>
                <span className="font-mono text-xs font-bold opacity-80 leading-none">
                  {rgbString}
                </span>

                <button
                  onClick={() => copyHex(color.hex)}
                  className="export-hide mt-3 flex items-center gap-1.5 text-xs font-bold px-3.5 py-1.5 rounded-xl transition-all backdrop-blur-md hover:scale-105"
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.3)',
                    color: contrast,
                  }}
                >
                  {isCopied ? <Check size={13} /> : <Copy size={13} />}
                  <span>{isCopied ? 'Copied' : 'Copy HEX'}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
