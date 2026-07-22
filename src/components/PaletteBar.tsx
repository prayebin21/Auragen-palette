'use client';
import { useState, useRef } from 'react';
import { Check, Image as ImageIcon, Loader2 } from 'lucide-react';
import { useColor } from '@/context/ColorContext';
import { SCALE_KEYS, getContrastColor } from '@/lib/colorUtils';
import { downloadElementAsPng, getExportFileName } from '@/lib/exportUtils';

export default function PaletteBar() {
  const { scale, baseHex } = useColor();
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
    <div ref={barRef} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mb-4 p-4">
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-bold text-slate-700">
          Palette 1 (<span className="font-mono">{baseHex}</span>)
        </span>
        <div className="flex items-center gap-2">
          <button
            onClick={handleExportPng}
            disabled={isExporting}
            className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 text-xs font-semibold transition disabled:opacity-50"
          >
            {isExporting ? <Loader2 size={13} className="animate-spin" /> : <ImageIcon size={13} />}
            <span>{isExporting ? 'Exporting...' : 'Export PNG'}</span>
          </button>
          <div className="flex gap-1 text-xs font-semibold">
            <button className="px-3 py-1 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 transition">Light</button>
            <button className="px-3 py-1 rounded-lg text-slate-400 hover:bg-slate-100 transition">Dark</button>
          </div>
        </div>
      </div>
      <div className="flex h-20 rounded-xl overflow-hidden shadow-inner">
        {SCALE_KEYS.map(key => {
          const hex = scale[key];
          const contrast = getContrastColor(hex);
          const isCopied = copied === key;
          return (
            <button
              key={key}
              onClick={() => copy(key, hex)}
              className="flex-1 flex flex-col transition-all hover:flex-[1.4] overflow-hidden group"
              style={{ backgroundColor: hex }}
              title={`${key}: ${hex}`}
            >
              <div className="flex-1 flex items-end justify-center pb-1 opacity-0 group-hover:opacity-100 transition-opacity">
                {isCopied
                  ? <Check size={12} style={{ color: contrast }} />
                  : <span className="text-[9px] font-bold" style={{ color: contrast }}>{hex}</span>
                }
              </div>
              <div className="bg-white/10 backdrop-blur-none px-1 py-1 text-center">
                <span className="text-[10px] font-bold" style={{ color: contrast, mixBlendMode: 'difference' as const }}>{key}</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
