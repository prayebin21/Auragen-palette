'use client';
import { useColor } from '@/context/ColorContext';
import PreviewCard from './PreviewCard';

export default function DonutStatsCard() {
  const { scale } = useColor();
  const html = `<div style="background:#fff; border-radius:1rem; padding:1.25rem;">
  <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1rem;">
    <h3 style="font-weight:700; color:#0f172a;">API Load</h3>
    <span style="font-size:11px; padding:2px 8px; border-radius:6px; border:1px solid #e2e8f0; color:#64748b;">Live Traffic ▾</span>
  </div>
  <div style="position:relative; width:140px; height:140px; margin:0 auto 1rem;">
    <svg viewBox="0 0 36 36" style="width:100%; height:100%; transform:rotate(-90deg);">
      <circle cx="18" cy="18" r="15.915" fill="none" stroke="${scale[100]}" strokeWidth="3.8"/>
      <circle cx="18" cy="18" r="15.915" fill="none" stroke="${scale[500]}" strokeWidth="3.8" strokeDasharray="55 45" strokeDashoffset="25"/>
      <circle cx="18" cy="18" r="15.915" fill="none" stroke="${scale[300]}" strokeWidth="3.8" strokeDasharray="25 75" strokeDashoffset="-30"/>
    </svg>
    <div style="position:absolute; inset:0; display:flex; flex-direction:column; align-items:center; justify-content:center;">
      <span style="font-size:9px; color:#94a3b8; font-weight:700;">Total Req</span>
      <span style="font-size:1.25rem; font-weight:900; color:#0f172a;">2.4M</span>
    </div>
  </div>
  <div style="display:flex; justify-content:center; gap:12px; font-size:10px; color:#64748b; font-weight:600;">
    <span><span style="display:inline-block; width:8px; height:8px; border-radius:50%; background:${scale[500]}; margin-right:4px;"></span>Prod</span>
    <span><span style="display:inline-block; width:8px; height:8px; border-radius:50%; background:${scale[300]}; margin-right:4px;"></span>Staging</span>
    <span><span style="display:inline-block; width:8px; height:8px; border-radius:50%; background:${scale[100]}; margin-right:4px;"></span>Dev</span>
  </div>
</div>`;

  return (
    <PreviewCard htmlContent={html} cssContent={html} label="Copy">
      <div className="bg-white rounded-2xl p-5 shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-slate-800">API Load</h3>
          <span className="text-[11px] font-semibold text-slate-500 bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-lg cursor-pointer">
            Live Traffic ▾
          </span>
        </div>
        <div className="relative w-36 h-36 mx-auto mb-4">
          <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
            <circle cx="18" cy="18" r="15.915" fill="none" stroke={scale[100]} strokeWidth="3.8" />
            <circle
              cx="18"
              cy="18"
              r="15.915"
              fill="none"
              stroke={scale[500]}
              strokeWidth="3.8"
              strokeDasharray="55 45"
              strokeDashoffset="25"
            />
            <circle
              cx="18"
              cy="18"
              r="15.915"
              fill="none"
              stroke={scale[300]}
              strokeWidth="3.8"
              strokeDasharray="25 75"
              strokeDashoffset="-30"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-[10px] text-slate-400 font-bold">Total Req</span>
            <span className="text-xl font-black text-slate-900">2.4M</span>
          </div>
        </div>
        <div className="flex justify-center gap-3 text-[10px] text-slate-500 font-bold">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full inline-block" style={{ backgroundColor: scale[500] }}></span> Prod
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full inline-block" style={{ backgroundColor: scale[300] }}></span> Staging
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full inline-block" style={{ backgroundColor: scale[100] }}></span> Dev
          </span>
        </div>
      </div>
    </PreviewCard>
  );
}
