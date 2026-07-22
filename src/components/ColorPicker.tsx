'use client';
import { useState, useEffect } from 'react';
import { Shuffle, Image as ImageIcon, Loader2 } from 'lucide-react';
import { useColor } from '@/context/ColorContext';

interface ColorPickerProps {
  onExportPage?: () => void;
  isExportingPage?: boolean;
}

export default function ColorPicker({ onExportPage, isExportingPage }: ColorPickerProps) {
  const { baseHex, setBaseHex, randomize, isDarkMode } = useColor();
  const [inputVal, setInputVal] = useState(baseHex);

  useEffect(() => { setInputVal(baseHex); }, [baseHex]);

  const handleTextChange = (v: string) => {
    setInputVal(v);
    const clean = v.startsWith('#') ? v : '#' + v;
    if (/^#[0-9A-F]{6}$/i.test(clean)) setBaseHex(clean);
  };

  return (
    <div className={`flex flex-wrap items-center gap-3 border rounded-2xl px-4 py-2.5 shadow-sm transition-colors ${
      isDarkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200/80 text-slate-900'
    }`}>
      <input
        type="color"
        value={baseHex}
        onChange={e => setBaseHex(e.target.value)}
        className="w-9 h-9 rounded-lg cursor-pointer border-none bg-none p-0"
        style={{ WebkitAppearance: 'none' } as React.CSSProperties}
      />
      <input
        type="text"
        value={inputVal}
        onChange={e => handleTextChange(e.target.value)}
        onBlur={() => setInputVal(baseHex)}
        className={`font-mono text-base font-bold w-24 border-none outline-none bg-transparent uppercase ${
          isDarkMode ? 'text-white' : 'text-slate-800'
        }`}
        maxLength={7}
      />
      <button
        onClick={randomize}
        className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm px-3.5 py-2 rounded-xl transition-colors shadow-sm active:scale-95"
      >
        <Shuffle size={14} />
        Randomize
      </button>

      {onExportPage && (
        <button
          onClick={onExportPage}
          disabled={isExportingPage}
          className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm px-3.5 py-2 rounded-xl transition-all shadow-md shadow-emerald-500/20 disabled:opacity-50 active:scale-95"
        >
          {isExportingPage ? <Loader2 size={14} className="animate-spin" /> : <ImageIcon size={14} />}
          <span>{isExportingPage ? 'Exporting Page...' : 'Export Page PNG'}</span>
        </button>
      )}
    </div>
  );
}
