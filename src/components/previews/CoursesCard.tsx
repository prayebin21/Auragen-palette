'use client';
import { Layers, Code2, Music } from 'lucide-react';
import { useColor } from '@/context/ColorContext';
import PreviewCard from './PreviewCard';

const courses = [
  { icon: Layers, tag: 'Architecture', title: 'Tailwind System Architecture Masterclass', mentor: 'Orlando S.', initials: 'OS', pct: 65, shade: 500 as const },
  { icon: Code2, tag: 'Full Stack', title: 'Next.js App Router & Server Actions', mentor: 'James A.', initials: 'JA', pct: 30, shade: 300 as const },
  { icon: Music, tag: 'Web Graphics', title: 'High Performance Web Graphics & Shaders', mentor: 'Richard C.', initials: 'RC', pct: 10, shade: 200 as const },
];

export default function CoursesCard() {
  const { scale } = useColor();
  const html = `<div style="background:#fff; border-radius:1rem; padding:1.25rem;"><h3 style="font-weight:700; margin-bottom:1rem;">Continue Learning</h3><div style="display:flex; flex-direction:column; gap:1rem;">${courses.map(c => `<div style="display:flex; gap:0.75rem; align-items:start;"><div style="width:5rem; height:4rem; border-radius:0.75rem; background:${scale[c.shade]}; color:#fff; display:flex; align-items:center; justify-content:center; flex-shrink:0;">📚</div><div style="flex:1;"><div style="font-size:9px; font-weight:700; background:${scale[100]}; color:${scale[700]}; padding:2px 8px; border-radius:4px; display:inline-block; margin-bottom:4px;">${c.tag}</div><p style="font-size:13px; font-weight:700; color:#1e293b; margin-bottom:4px;">${c.title}</p><div style="background:#f1f5f9; height:4px; border-radius:999px;"><div style="background:${scale[500]}; width:${c.pct}%; height:4px; border-radius:999px;"></div></div></div></div>`).join('')}</div></div>`;

  return (
    <PreviewCard htmlContent={html} cssContent={html} label="Copy" cardName="auragen-courses">
      <div className="bg-white rounded-2xl p-5 shadow-sm">
        <h3 className="font-bold text-slate-800 mb-4">Continue Learning</h3>
        <div className="flex flex-col gap-4">
          {courses.map((c, i) => {
            const Icon = c.icon;
            return (
              <div key={i} className="flex gap-3 items-start">
                <div className="w-20 h-16 rounded-xl flex items-center justify-center flex-shrink-0 text-white shadow-sm" style={{ backgroundColor: scale[c.shade] }}>
                  <Icon size={24} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="inline-flex items-center gap-1 mb-1">
                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded" style={{ backgroundColor: scale[100], color: scale[700] }}>{c.tag}</span>
                  </div>
                  <p className="text-sm font-bold text-slate-800 leading-snug line-clamp-2">{c.title}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="w-5 h-5 rounded-full text-[9px] font-black text-white flex items-center justify-center" style={{ backgroundColor: scale[600] }}>
                      {c.initials}
                    </div>
                    <span className="text-[10px] text-slate-500">{c.mentor} · Lead Instructor</span>
                  </div>
                  <div className="w-full bg-slate-100 h-1 rounded-full mt-2">
                    <div className="h-1 rounded-full" style={{ width: `${c.pct}%`, backgroundColor: scale[500] }}></div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </PreviewCard>
  );
}
