'use client';
import { Check } from 'lucide-react';
import { useColor } from '@/context/ColorContext';
import PreviewCard from './PreviewCard';

const options = [
  { label: 'Product Releases', sub: 'Latest v2.4 build deployed 30m ago', selected: false },
  { label: 'Active Enterprise Clients', sub: 'Syncing 124 organizations', selected: true },
  { label: 'Beta Testers Program', sub: 'Invited 48 dev teams', selected: false },
];

export default function RadioCard() {
  const { scale } = useColor();
  const html = `<div style="background:#fff; border-radius:1rem; padding:1.25rem;">${options.map(o => `<div style="display:flex; align-items:start; gap:0.75rem; padding:0.875rem; border-radius:0.75rem; border:${o.selected ? `2px solid ${scale[500]}` : '1px solid #e2e8f0'}; background:${o.selected ? scale[50] : '#fff'}; margin-bottom:0.625rem; position:relative;">
  <input type="radio" ${o.selected ? 'checked' : ''} style="margin-top:2px;" />
  <div><div style="font-size:14px; font-weight:700; color:${o.selected ? scale[900] : '#1e293b'};">${o.label}</div><div style="font-size:12px; color:${o.selected ? scale[500] : '#94a3b8'}; margin-top:2px;">${o.sub}</div></div>
</div>`).join('')}</div>`;

  return (
    <PreviewCard htmlContent={html} cssContent={html} label="Copy">
      <div className="bg-white rounded-2xl p-5 pt-10 relative shadow-sm">
        <div className="flex flex-col gap-2.5">
          {options.map((o, i) => (
            <label key={i} className="flex items-start gap-3 p-3.5 rounded-xl cursor-pointer relative transition-colors"
              style={{
                border: o.selected ? `2px solid ${scale[500]}` : '1px solid #e2e8f0',
                backgroundColor: o.selected ? scale[50] : '#fff'
              }}>
              <input type="radio" name="radio_demo" defaultChecked={o.selected} className="mt-0.5 flex-shrink-0" />
              <div className="pr-6">
                <div className="text-sm font-bold" style={{ color: o.selected ? scale[900] : '#1e293b' }}>{o.label}</div>
                <div className="text-xs mt-0.5" style={{ color: o.selected ? scale[500] : '#94a3b8' }}>{o.sub}</div>
              </div>
              {o.selected && <Check size={16} className="absolute right-3.5 top-4" style={{ color: scale[500] }} />}
            </label>
          ))}
        </div>
      </div>
    </PreviewCard>
  );
}
