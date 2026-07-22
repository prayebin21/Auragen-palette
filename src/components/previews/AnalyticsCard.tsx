'use client';
import { useColor } from '@/context/ColorContext';
import PreviewCard from './PreviewCard';

const stats = [
  { label: 'Active Workspaces', value: '124,850', from: 'from 118,200', change: '+18%', positive: true },
  { label: 'System Conversion', value: '64.20%', from: 'from 58.10%', change: '+6.10%', positive: true },
  { label: 'Avg API Latency', value: '38.4ms', from: 'from 46.2ms', change: '-7.8ms', positive: true },
];

export default function AnalyticsCard() {
  const { scale } = useColor();
  const html = `<div style="background:#fff; border-radius:1rem; display:grid; grid-template-columns:repeat(3,1fr); border:1px solid #e2e8f0;">
  ${stats.map(s => `<div style="padding:1.25rem; border-right:1px solid #e2e8f0;">
    <div style="font-size:10px; color:#94a3b8; font-weight:700; text-transform:uppercase; margin-bottom:0.5rem;">${s.label}</div>
    <div style="font-size:1.5rem; font-weight:900; color:#0f172a;">${s.value}</div>
    <div style="font-size:11px; color:#94a3b8; margin:4px 0 8px;">${s.from}</div>
    <span style="font-size:10px; font-weight:700; padding:2px 8px; border-radius:999px; background:#f0fdf4; color:#16a34a;">${s.change}</span>
  </div>`).join('')}
</div>`;

  return (
    <PreviewCard htmlContent={html} cssContent={html} label="Copy">
      <div className="bg-white rounded-2xl border border-slate-200 grid grid-cols-3 divide-x divide-slate-100 shadow-sm">
        {stats.map((s, i) => (
          <div key={i} className="p-5">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-2">{s.label}</div>
            <div className="text-2xl font-black text-slate-900 leading-none">{s.value}</div>
            <div className="text-[11px] text-slate-400 mt-1 mb-2">{s.from}</div>
            <span className="inline-flex items-center text-[10px] font-bold px-2 py-0.5 rounded-full"
              style={{ backgroundColor: scale[50], color: scale[700] }}>
              {s.change}
            </span>
          </div>
        ))}
      </div>
    </PreviewCard>
  );
}
