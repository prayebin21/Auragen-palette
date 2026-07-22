'use client';
import { useState, useRef, useEffect } from 'react';
import { Copy, Check, ChevronDown, Code, FileCode, Image as ImageIcon, Loader2 } from 'lucide-react';
import { downloadElementAsPng, getExportFileName } from '@/lib/exportUtils';

interface CopyMenuProps {
  cardRef?: React.RefObject<HTMLDivElement | null>;
  htmlContent: string;
  cssContent: string;
  label?: string;
  cardName?: string;
}

export default function CopyMenu({
  cardRef,
  htmlContent,
  cssContent,
  label = 'Copy',
  cardName = 'component'
}: CopyMenuProps) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
  const [isExporting, setIsExporting] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const copy = async (text: string, key: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(key);
    setOpen(false);
    setTimeout(() => setCopied(null), 2000);
  };

  const exportPng = async () => {
    if (!cardRef?.current) return;
    setIsExporting(true);
    const filename = getExportFileName('twgen', cardName);
    await downloadElementAsPng(cardRef.current, filename);
    setIsExporting(false);
    setOpen(false);
  };

  return (
    <div ref={ref} className="relative z-30">
      <button
        onClick={() => setOpen(o => !o)}
        className="flex items-center gap-1.5 bg-slate-900/85 hover:bg-slate-900 text-white text-[11px] font-semibold px-2.5 py-1.5 rounded-lg transition-all shadow-md backdrop-blur-md"
      >
        {copied ? <Check size={12} className="text-green-400" /> : <Copy size={12} />}
        <span>{copied ? 'Copied!' : label}</span>
        <ChevronDown size={10} className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div className="absolute top-full right-0 mt-1.5 bg-white rounded-xl shadow-2xl border border-slate-100 py-1 w-52 overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-100">
          {/* Copy React JSX */}
          <button
            onClick={() => copy(htmlContent, 'html')}
            className="w-full flex items-center gap-2.5 px-3 py-2 hover:bg-slate-50 transition-colors text-left"
          >
            <div className="w-6 h-6 rounded-md bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
              <Code size={13} />
            </div>
            <div>
              <div className="text-[11px] font-bold text-slate-800">Copy React / JSX</div>
              <div className="text-[9px] text-slate-400">Ready for Next.js / React</div>
            </div>
          </button>

          {/* Copy HTML + CSS */}
          <button
            onClick={() => copy(cssContent, 'css')}
            className="w-full flex items-center gap-2.5 px-3 py-2 hover:bg-slate-50 transition-colors text-left"
          >
            <div className="w-6 h-6 rounded-md bg-purple-50 text-purple-600 flex items-center justify-center flex-shrink-0">
              <FileCode size={13} />
            </div>
            <div>
              <div className="text-[11px] font-bold text-slate-800">Copy HTML + CSS</div>
              <div className="text-[9px] text-slate-400">Inline HEX style code</div>
            </div>
          </button>

          <div className="h-px bg-slate-100 my-1"></div>

          {/* Download Image (PNG) */}
          <button
            onClick={exportPng}
            disabled={isExporting}
            className="w-full flex items-center gap-2.5 px-3 py-2 hover:bg-slate-50 transition-colors text-left disabled:opacity-50"
          >
            <div className="w-6 h-6 rounded-md bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0">
              {isExporting ? <Loader2 size={13} className="animate-spin" /> : <ImageIcon size={13} />}
            </div>
            <div>
              <div className="text-[11px] font-bold text-slate-800">
                {isExporting ? 'Exporting Image...' : 'Download Image (PNG)'}
              </div>
              <div className="text-[9px] text-slate-400">Save as high-res image</div>
            </div>
          </button>
        </div>
      )}
    </div>
  );
}
