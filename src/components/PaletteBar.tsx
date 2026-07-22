'use client';
import { useState, useRef } from 'react';
import { Check, Image as ImageIcon, Loader2, Sun, Moon } from 'lucide-react';
import { useColor } from '@/context/ColorContext';
import { SCALE_KEYS, getContrastColor } from '@/lib/colorUtils';
import { downloadElementAsPng, getExportFileName } from '@/lib/exportUtils';

export default function PaletteBar() {
  const { scale, baseHex, isDarkMode, setDarkMode } = useColor();
  const [copied, setCopied] = useState<number | null>(null);
  const [isExporting, setIsExporting] = useState(false);
  const barRef = useRef<HTMLDivElement>(null);

  const copy = async (key: number, hex: string) => {
    await navigator.clipboard.writeText(hex);
    setCopied(key);
    setTimeout(() => setCopied(null), 1500);
  };

  const handleExportPng = async () => {
    if (!barRef.current) return;
    setIsExporting(true);
    const filename = getExportFileName('twgen', 'scale');
    await downloadElementAsPng(barRef.current, filename);
    setIsExporting(false);
  };

  return (
    <div ref={barRef} className={`rounded-2xl border shadow-sm overflow-hidden mb-4 p-4 transition-colors ${
      isDarkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
    }`}>
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-bold">
          Palette 1 (<span className="font-mono">{baseHex}</span>)
        </span>
        <div className="flex items-center gap-2">
          {/* Light / Dark Mode Switcher */}
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

          <button
            onClick={handleExportPng}
            disabled={isExporting}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition disabled:opacity-50 ${
              isDarkMode
                ? 'bg-slate-800 text-slate-200 hover:bg-slate-700'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            {isExporting ? <Loader2 size={13} className="animate-spin" /> : <ImageIcon size={13} />}
            <span>{isExporting ? 'Exporting...' : 'Export PNG'}</span>
          </button>
        </div>
      </div>

      {/* 50 - 950 Scale Strip with High-Contrast Badges */}
      <div className="flex h-20 rounded-xl overflow-hidden shadow-inner border border-black/5">
        {SCALE_KEYS.map(key => {
          const hex = scale[key];
          const contrast = getContrastColor(hex);
          const isCopied = copied === key;
          const isDarkBg = contrast === '#ffffff';

          return (
            <button
              key={key}
              onClick={() => copy(key, hex)}
              className="flex-1 flex flex-col transition-all hover:flex-[1.4] overflow-hidden group relative"
              style={{ backgroundColor: hex }}
              title={`${key}: ${hex}`}
            >
              {/* Hover HEX popup */}
              <div className="flex-1 flex items-end justify-center pb-1.5 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                {isCopied ? (
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded shadow-sm bg-slate-900 text-green-400 flex items-center gap-1">
                    <Check size={10} /> Copied
                  </span>
                ) : (
                  <span
                    className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded shadow-sm border border-black/10 backdrop-blur-md"
                    style={{
                      backgroundColor: isDarkBg ? 'rgba(0, 0, 0, 0.45)' : 'rgba(255, 255, 255, 0.75)',
                      color: isDarkBg ? '#ffffff' : '#0f172a',
                    }}
                  >
                    {hex}
                  </span>
                )}
              </div>

              {/* Number Badge (50, 100... 950) with High Contrast Badge & Backdrop Blur */}
              <div className="pb-1.5 pt-0.5 flex justify-center items-center z-10">
                <span
                  className="text-[10px] font-black px-2 py-0.5 rounded-md shadow-sm border transition-transform group-hover:scale-105"
                  style={{
                    backgroundColor: isDarkBg ? 'rgba(0, 0, 0, 0.4)' : 'rgba(255, 255, 255, 0.75)',
                    color: isDarkBg ? '#ffffff' : '#0f172a',
                    borderColor: isDarkBg ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.1)',
                    backdropFilter: 'blur(4px)',
                  }}
                >
                  {key}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
