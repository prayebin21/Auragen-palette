'use client';
import { Server, Terminal, Sparkles } from 'lucide-react';
import { useColor } from '@/context/ColorContext';
import PreviewCard from './PreviewCard';

const items = [
  { Icon: Server, label: 'Cloud Infrastructure', total: '$15,000', spent: '$12,400', left: '$2,600', pct: 82, shade: 500 as const },
  { Icon: Terminal, label: 'Engineering Ops', total: '$48,000', spent: '$24,000', left: '$24,000', pct: 50, shade: 300 as const },
  { Icon: Sparkles, label: 'Team R&D Budget', total: '$8,500', spent: '$4,800', left: '$3,700', pct: 56, shade: 200 as const },
];

export default function FinanceCard() {
  const { scale } = useColor();
  const html = `<div style="background:#fff; border-radius:1rem; overflow:hidden;">${items.map((item, i) => `<div style="display:flex; align-items:center; gap:0.75rem; padding:1rem; ${i < 2 ? 'border-bottom:1px solid #f1f5f9;' : ''}">
  <div style="width:2.5rem; height:2.5rem; border-radius:0.75rem; background:${scale[item.shade]}; display:flex; align-items:center; justify-content:center; flex-shrink:0;"></div>
  <div style="flex:1;">
    <div style="display:flex; justify-content:space-between; margin-bottom:6px;"><span style="font-size:14px; font-weight:700;">${item.label}</span><span style="font-size:14px; font-weight:700;">${item.total}</span></div>
    <div style="background:#f1f5f9; border-radius:999px; height:6px; margin-bottom:4px;"><div style="background:${scale[item.shade]}; width:${item.pct}%; height:6px; border-radius:999px;"></div></div>
    <div style="display:flex; justify-content:space-between; font-size:10px; color:#94a3b8;"><span>${item.spent} spent</span><span>${item.left} left</span></div>
  </div>
</div>`).join('')}</div>`;

  return (
    <PreviewCard htmlContent={html} cssContent={html} label="Copy">
      <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
        {items.map(({ Icon, label, total, spent, left, pct, shade }, i) => (
          <div key={label} className={`flex items-center gap-3 p-4 hover:bg-slate-50 transition-colors ${i < 2 ? 'border-b border-slate-100' : ''}`}>
            <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 text-white" style={{ backgroundColor: scale[shade] }}>
              <Icon size={18} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-center mb-1.5">
                <span className="font-bold text-slate-800 text-sm">{label}</span>
                <span className="font-bold text-slate-700 text-sm tabular-nums">{total}</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-1.5 mb-1">
                <div className="h-1.5 rounded-full" style={{ width: `${pct}%`, backgroundColor: scale[shade] }}></div>
              </div>
              <div className="flex justify-between text-[10px] text-slate-400 font-medium">
                <span>{spent} spent</span><span>{left} left</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </PreviewCard>
  );
}
