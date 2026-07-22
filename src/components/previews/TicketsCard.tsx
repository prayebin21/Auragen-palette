'use client';
import { MoreHorizontal } from 'lucide-react';
import { useColor } from '@/context/ColorContext';
import PreviewCard from './PreviewCard';

const tickets = [
  { name: 'David K.', initials: 'DK', shade: 500 as const, status: 'Open', time: '15 mins' },
  { name: 'Elena R.', initials: 'ER', shade: 400 as const, status: 'Open', time: '40 mins' },
  { name: 'Marcus T.', initials: 'MT', shade: 300 as const, status: 'Processing', time: '1 hrs' },
  { name: 'Chloe V.', initials: 'CV', shade: 200 as const, status: 'Resolved', time: '1 day' },
];

export default function TicketsCard() {
  const { scale } = useColor();
  const html = `<div style="background:#fff; border-radius:1rem; padding:1.25rem;">
  <h3 style="font-weight:700; margin-bottom:1rem;">Support Desk Requests</h3>
  ${tickets.map(t => `<div style="display:flex; align-items:center; gap:0.75rem; padding:0.5rem; border-radius:0.75rem;">
    <div style="width:2.25rem; height:2.25rem; border-radius:50%; background:${scale[t.shade]}; color:#fff; font-size:12px; font-weight:800; display:flex; align-items:center; justify-content:center;">${t.initials}</div>
    <div style="flex:1;"><p style="font-size:14px; font-weight:600;">${t.name}</p></div>
    <span style="font-size:10px; font-weight:700; padding:2px 8px; border-radius:999px; background:${t.status === 'Open' ? scale[100] : t.status === 'Processing' ? '#fef3c7' : '#f1f5f9'}; color:${t.status === 'Open' ? scale[700] : t.status === 'Processing' ? '#b45309' : '#64748b'}">${t.status}</span>
    <span style="font-size:11px; color:#94a3b8; width:2.5rem; text-align:right;">${t.time}</span>
  </div>`).join('')}
</div>`;

  return (
    <PreviewCard htmlContent={html} cssContent={html} label="Copy" cardName="auragen-tickets">
      <div className="bg-white rounded-2xl p-5 shadow-sm">
        <h3 className="font-bold text-slate-800 mb-4">Support Desk Requests</h3>
        <div className="flex flex-col gap-1">
          {tickets.map((t, i) => (
            <div key={i} className="flex items-center gap-3 px-2 py-2.5 rounded-xl hover:bg-slate-50 transition-colors">
              <div className="w-9 h-9 rounded-full flex items-center justify-center font-black text-xs text-white shadow-sm flex-shrink-0" style={{ backgroundColor: scale[t.shade] }}>
                {t.initials}
              </div>
              <div className="flex-1 min-w-0"><p className="text-sm font-semibold text-slate-800 truncate">{t.name}</p></div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full flex-shrink-0 whitespace-nowrap" style={{
                backgroundColor: t.status === 'Open' ? scale[100] : t.status === 'Processing' ? '#fef3c7' : '#f1f5f9',
                color: t.status === 'Open' ? scale[700] : t.status === 'Processing' ? '#b45309' : '#64748b'
              }}>{t.status}</span>
              <span className="text-[11px] text-slate-400 w-10 text-right flex-shrink-0">{t.time}</span>
              <button className="text-slate-300 hover:text-slate-500 flex-shrink-0"><MoreHorizontal size={16} /></button>
            </div>
          ))}
        </div>
      </div>
    </PreviewCard>
  );
}
