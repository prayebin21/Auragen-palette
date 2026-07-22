'use client';
import { useColor } from '@/context/ColorContext';
import PreviewCard from './PreviewCard';

const bars = [
  [60, 35, 20], [75, 45, 25], [50, 30, 15], [95, 55, 30], [65, 40, 22]
];
const months = ['Q1', 'Q2', 'Q3', 'Q4', 'YTD'];

export default function RevenueChart() {
  const { scale } = useColor();
  const html = `<div style="background:#fff; border-radius:1rem; padding:1.25rem;">
  <div style="display:flex; justify-content:space-between; align-items:start; margin-bottom:0.75rem;">
    <h3 style="font-weight:700;">System Monthly ARR</h3>
    <div style="display:flex; gap:12px; font-size:10px; font-weight:700; color:#94a3b8;">
      <span>● Enterprise</span><span>● Pro</span><span>● Starter</span>
    </div>
  </div>
  <div style="font-size:1.75rem; font-weight:900; color:#0f172a; margin-bottom:1rem;">$428,500 <span style="font-size:12px; background:#f0fdf4; color:#16a34a; padding:2px 8px; border-radius:999px;">+34%</span></div>
</div>`;

  return (
    <PreviewCard htmlContent={html} cssContent={html} label="Copy">
      <div className="bg-white rounded-2xl p-5 shadow-sm">
        <div className="flex items-start justify-between mb-3">
          <h3 className="font-bold text-slate-800">System Monthly ARR</h3>
          <div className="flex gap-3 text-[10px] font-bold text-slate-400 flex-shrink-0">
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full inline-block" style={{ backgroundColor: scale[500] }}></span>Enterprise</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full inline-block" style={{ backgroundColor: scale[200] }}></span>Pro</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full inline-block" style={{ backgroundColor: scale[100] }}></span>Starter</span>
          </div>
        </div>
        <div className="mb-4">
          <span className="text-3xl font-black text-slate-900">$428,500</span>
          <span className="ml-2 text-xs font-bold bg-green-50 text-green-600 px-2 py-0.5 rounded-full">+34%</span>
        </div>
        <div className="flex items-end gap-2 h-28">
          {bars.map((group, gi) => (
            <div key={gi} className="flex-1 flex items-end gap-0.5 h-full">
              <div className="flex-1 rounded-t-sm" style={{ height: `${group[0]}%`, backgroundColor: scale[500] }}></div>
              <div className="flex-1 rounded-t-sm" style={{ height: `${group[1]}%`, backgroundColor: scale[200] }}></div>
              <div className="flex-1 rounded-t-sm" style={{ height: `${group[2]}%`, backgroundColor: scale[100] }}></div>
            </div>
          ))}
        </div>
        <div className="flex justify-between text-[10px] text-slate-300 mt-2 font-medium">
          {months.map(m => <span key={m}>{m}</span>)}
        </div>
      </div>
    </PreviewCard>
  );
}
