'use client';
import { ArrowRight } from 'lucide-react';
import { useColor } from '@/context/ColorContext';
import PreviewCard from './PreviewCard';

export default function HandbookCard() {
  const { scale } = useColor();
  const html = `<div style="background: linear-gradient(135deg, ${scale[400]}, ${scale[700]}); border-radius:1rem; padding:1.5rem; color:#fff; position:relative; overflow:hidden; min-height:280px; display:flex; flex-direction:column; justify-between;">
  <div>
    <span style="font-size:10px; font-weight:800; text-transform:uppercase; letter-spacing:0.1em; background:rgba(255,255,255,0.2); padding:4px 8px; border-radius:6px;">PAGE 48 OF 320</span>
    <h3 style="font-size:1.5rem; font-weight:900; margin-top:1.5rem; line-height:1.2;">Modern Web Systems Architecture</h3>
  </div>
  <div style="margin-top:2rem;">
    <button style="background:#0f172a; color:#fff; padding:0.6rem 1rem; border-radius:0.75rem; border:none; font-size:12px; font-weight:700; cursor:pointer;">Read Publication →</button>
  </div>
</div>`;

  return (
    <PreviewCard htmlContent={html} cssContent={html} label="Copy">
      <div className="rounded-2xl p-6 text-white relative overflow-hidden shadow-md flex flex-col justify-between min-h-[300px]"
        style={{
          background: `linear-gradient(135deg, ${scale[400]} 0%, ${scale[700]} 100%)`
        }}>
        <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full blur-2xl opacity-40" style={{ backgroundColor: scale[100] }}></div>
        <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full blur-2xl opacity-30" style={{ backgroundColor: scale[900] }}></div>

        <div className="relative z-10">
          <span className="text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-md bg-white/20 backdrop-blur-md">
            PAGE 48 OF 320
          </span>
          <h3 className="text-2xl font-black leading-tight mt-6 mb-2">
            Modern Web Systems Architecture
          </h3>
        </div>

        <div className="relative z-10 pt-6">
          <button className="flex items-center gap-2 bg-slate-900/80 hover:bg-slate-900 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all shadow-lg backdrop-blur-sm">
            <span>Read Publication</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </PreviewCard>
  );
}
