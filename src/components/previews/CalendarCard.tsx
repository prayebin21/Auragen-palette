'use client';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useColor } from '@/context/ColorContext';
import PreviewCard from './PreviewCard';

const DAYS = ['Su','Mo','Tu','We','Th','Fr','Sa'];
const rows = [
  [null, 1, 2, 3, 4, 5, 6],
  [7, 8, 9, 10, 11, 12, 13],
  [14, 15, 16, 17, 18, 19, 20],
  [21, 22, 23, 24, 25, 26, 27],
  [28, 29, 30, 31, null, null, null],
];
const highlights: Record<number, 'primary'|'light'|'lighter'> = { 11: 'primary', 22: 'light', 26: 'lighter' };

export default function CalendarCard() {
  const { scale } = useColor();
  const html = `<div style="background:#fff; border-radius:1rem; padding:1.25rem;"><h3 style="text-align:center; font-weight:700; margin-bottom:1rem;">July</h3><div style="display:grid; grid-template-columns:repeat(7,1fr); text-align:center; gap:4px;">${DAYS.map(d=>`<div style="font-size:10px; font-weight:700; color:#94a3b8;">${d}</div>`).join('')}${rows.flat().map(d => d ? `<div style="font-size:11px; width:1.75rem; height:1.75rem; display:flex; align-items:center; justify-content:center; margin:auto; border-radius:50%; background:${highlights[d] === 'primary' ? scale[500] : highlights[d] === 'light' ? scale[200] : highlights[d] === 'lighter' ? scale[100] : 'transparent'}; color:${highlights[d] === 'primary' ? '#fff' : highlights[d] ? scale[800] : '#64748b'}; font-weight:${highlights[d] ? '700' : '500'};">${d}</div>` : '<div></div>').join('')}</div></div>`;
  return (
    <PreviewCard htmlContent={html} tailwindClasses="" cssContent={html} label="Copy">
      <div className="bg-white rounded-2xl p-5">
        <div className="flex justify-between items-center mb-4">
          <button className="w-7 h-7 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-400 transition-colors"><ChevronLeft size={16} /></button>
          <h3 className="font-bold text-slate-800">July</h3>
          <button className="w-7 h-7 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-400 transition-colors"><ChevronRight size={16} /></button>
        </div>
        <div className="grid grid-cols-7 text-center gap-y-2">
          {DAYS.map(d => <div key={d} className="text-[10px] font-bold text-slate-400 pb-1">{d}</div>)}
          {rows.flat().map((day, idx) => {
            if (!day) return <div key={idx} />;
            const hl = highlights[day];
            const bg = hl === 'primary' ? scale[500] : hl === 'light' ? scale[200] : hl === 'lighter' ? scale[100] : 'transparent';
            const color = hl === 'primary' ? '#fff' : hl ? scale[800] : '#64748b';
            return (
              <div key={idx} className="py-1">
                <span className="w-7 h-7 rounded-full flex items-center justify-center mx-auto text-xs font-bold cursor-pointer hover:opacity-90 transition-opacity"
                  style={{ backgroundColor: bg, color }}>
                  {day}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </PreviewCard>
  );
}
