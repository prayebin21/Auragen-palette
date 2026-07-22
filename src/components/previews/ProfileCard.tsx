'use client';
import { useColor } from '@/context/ColorContext';
import PreviewCard from './PreviewCard';

export default function ProfileCard() {
  const { scale } = useColor();
  const html = `<div style="border-radius:1rem; overflow:hidden; background:#fff; box-shadow:0 4px 12px rgba(0,0,0,0.05);">
  <div style="height:20rem; background:${scale[50]}; display:flex; align-items:center; justify-content:center; position:relative;">
    <svg viewBox="0 0 200 200" style="width:140px; height:140px;">
      <circle cx="100" cy="100" r="90" fill="${scale[100]}" />
      <circle cx="100" cy="80" r="36" fill="${scale[500]}" />
      <path d="M 45 165 Q 100 120 155 165 Z" fill="${scale[700]}" />
    </svg>
    <div style="position:absolute; bottom:0; inset-x:0; background:linear-gradient(to top, rgba(0,0,0,0.6), transparent); padding:1rem; color:#fff;">
      <span style="font-size:10px; font-weight:800; text-transform:uppercase; background:${scale[500]}; padding:3px 8px; border-radius:6px;">Featured Developer</span>
    </div>
  </div>
  <div style="padding:1.25rem;">
    <h3 style="font-weight:900; font-size:1.35rem; color:#0f172a; margin-bottom:2px;">Saharat rus</h3>
    <p style="color:#64748b; font-size:14px; font-weight:600; margin-bottom:1.25rem;">Developer</p>
    <div style="display:flex; gap:0.5rem;">
      <button style="flex:1; background:${scale[500]}; color:#fff; font-weight:700; padding:0.75rem; border:none; border-radius:0.75rem;">Follow</button>
      <button style="padding:0.75rem 1rem; background:${scale[50]}; color:${scale[600]}; font-weight:700; border:1px solid ${scale[100]}; border-radius:0.75rem;">● Online</button>
    </div>
  </div>
</div>`;

  return (
    <PreviewCard htmlContent={html} cssContent={html} label="Copy" cardName="auragen-profile">
      <div className="bg-white rounded-2xl overflow-hidden shadow-sm flex flex-col h-full border border-slate-100">
        {/* Vector Developer Avatar Background - CORS Free */}
        <div
          className="h-80 w-full overflow-hidden relative flex-shrink-0 flex items-center justify-center transition-colors"
          style={{ backgroundColor: scale[50] }}
        >
          {/* Subtle Background Pattern */}
          <div className="absolute inset-0 opacity-20" style={{
            backgroundImage: `radial-gradient(${scale[300]} 1px, transparent 1px)`,
            backgroundSize: '16px 16px'
          }}></div>

          <svg viewBox="0 0 200 200" className="w-44 h-44 relative z-10 drop-shadow-md">
            <circle cx="100" cy="100" r="85" fill={scale[100]} />
            <circle cx="100" cy="78" r="36" fill={scale[500]} />
            {/* Glasses / Code Vibe */}
            <rect x="76" y="70" width="20" height="14" rx="3" fill="#1e293b" />
            <rect x="104" y="70" width="20" height="14" rx="3" fill="#1e293b" />
            <line x1="96" y1="77" x2="104" y2="77" stroke="#1e293b" strokeWidth="2" />
            <path d="M 42 165 Q 100 120 158 165 Z" fill={scale[700]} />
          </svg>

          <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent p-4 flex items-end">
            <span
              className="text-[10px] font-black uppercase tracking-wider text-white px-2.5 py-1 rounded-md shadow-sm"
              style={{ backgroundColor: scale[500] }}
            >
              Featured Developer
            </span>
          </div>
        </div>

        {/* Info & Actions */}
        <div className="p-5 flex flex-col justify-between flex-1">
          <div>
            <h3 className="font-black text-2xl text-slate-900 leading-tight">Saharat rus</h3>
            <p className="text-slate-500 font-semibold text-sm mb-5">Developer</p>
          </div>
          <div className="flex gap-2.5">
            <button
              className="flex-1 text-white font-bold py-3 rounded-xl text-sm shadow-md transition-opacity hover:opacity-90"
              style={{ backgroundColor: scale[500] }}
            >
              Follow
            </button>
            <button
              className="px-4 font-bold py-3 rounded-xl text-sm border"
              style={{
                backgroundColor: scale[50],
                color: scale[600],
                borderColor: scale[100],
              }}
            >
              ● Online
            </button>
          </div>
        </div>
      </div>
    </PreviewCard>
  );
}
