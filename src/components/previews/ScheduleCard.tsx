'use client';
import { Plus } from 'lucide-react';
import { useColor } from '@/context/ColorContext';
import PreviewCard from './PreviewCard';

const events = [
  { time: '10:00', period: 'AM', title: 'Sprint Architecture Sync', desc: 'Align system architecture and API schemas with lead dev team.', active: true },
  { time: '2:30', period: 'PM', title: 'UI Component Audit', desc: 'Review design token consistency across frontend repositories.', active: false },
  { time: '6:00', period: 'PM', title: 'Release Candidate Demo', desc: 'Walkthrough of upcoming v3.0 core features with engineering leads.', active: false },
];

export default function ScheduleCard() {
  const { scale } = useColor();
  const html = `<div style="background:#fff; border-radius:1rem; padding:1.25rem;">
  <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1.25rem;">
    <h3 style="font-weight:700;">Developer Schedule</h3>
    <button style="background:${scale[500]}; color:#fff; border:none; border-radius:50%; width:1.75rem; height:1.75rem; font-size:1.25rem; cursor:pointer;">+</button>
  </div>
  ${events.map(e => `<div style="display:flex; gap:0.75rem; margin-bottom:0.75rem;">
    <div style="text-align:right; width:3.5rem;"><span style="font-weight:900; color:${e.active ? scale[600] : '#94a3b8'}">${e.time}</span><span style="font-size:10px; color:${e.active ? scale[400] : '#cbd5e1'}"> ${e.period}</span></div>
    <div style="flex:1; background:${e.active ? scale[50] : '#f8fafc'}; border-left:3px solid ${e.active ? scale[500] : '#e2e8f0'}; border-radius:0 0.5rem 0.5rem 0; padding:0.5rem 0.75rem;">
      <p style="font-size:12px; font-weight:700; color:#1e293b;">${e.title}</p>
      <p style="font-size:11px; color:#64748b; margin-top:2px;">${e.desc}</p>
    </div>
  </div>`).join('')}
</div>`;

  return (
    <PreviewCard htmlContent={html} cssContent={html} label="Copy">
      <div className="bg-white rounded-2xl p-5 shadow-sm">
        <div className="flex justify-between items-center mb-5">
          <h3 className="font-bold text-slate-800 text-base">Developer Schedule</h3>
          <button className="w-7 h-7 rounded-full text-white flex items-center justify-center hover:opacity-90 transition-opacity" style={{ backgroundColor: scale[500] }}>
            <Plus size={16} />
          </button>
        </div>
        <div className="flex flex-col gap-3">
          {events.map((e, i) => (
            <div key={i} className="flex gap-3 items-start">
              <div className="text-right w-14 flex-shrink-0">
                <span className="text-lg font-black leading-none" style={{ color: e.active ? scale[600] : '#94a3b8' }}>{e.time}</span>
                <span className="text-[10px] font-bold ml-0.5" style={{ color: e.active ? scale[400] : '#cbd5e1' }}> {e.period}</span>
              </div>
              <div className="flex-1 min-w-0 rounded-r-xl px-3 py-2.5" style={{
                backgroundColor: e.active ? scale[50] : '#f8fafc',
                borderLeft: `3px solid ${e.active ? scale[500] : '#e2e8f0'}`
              }}>
                <p className="text-xs font-bold text-slate-800 truncate">{e.title}</p>
                <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed line-clamp-2">{e.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PreviewCard>
  );
}
