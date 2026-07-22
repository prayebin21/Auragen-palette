'use client';
import { ShoppingCart, Coffee, Cpu, Activity, Truck, HeartPulse, Wifi, Laptop } from 'lucide-react';
import { useColor } from '@/context/ColorContext';
import PreviewCard from './PreviewCard';

const cats = [
  { Icon: ShoppingCart, label: 'E-Commerce', active: true },
  { Icon: Coffee, label: 'Hospitality', active: true },
  { Icon: Cpu, label: 'Infrastructure', active: false },
  { Icon: Activity, label: 'Fitness', active: false },
  { Icon: Truck, label: 'Mobility', active: false },
  { Icon: HeartPulse, label: 'Healthcare', active: false },
  { Icon: Wifi, label: 'Connectivity', active: false },
  { Icon: Laptop, label: 'Devices', active: false },
];

export default function CategoriesCard() {
  const { scale } = useColor();
  const html = `<div style="background:#fff; border-radius:1rem; padding:1.25rem;"><p style="font-size:10px; font-weight:700; color:#94a3b8; text-transform:uppercase; letter-spacing:0.1em; margin-bottom:1rem;">Industry Domains</p><div style="display:grid; grid-template-columns:repeat(4,1fr); gap:12px;">${cats.map(c => `<div style="display:flex; flex-direction:column; align-items:center; gap:8px;"><div style="width:3rem; height:3rem; border-radius:0.75rem; background:${c.active ? scale[50] : '#f8fafc'}; color:${c.active ? scale[600] : '#94a3b8'}; display:flex; align-items:center; justify-content:center;"></div><span style="font-size:10px; color:#64748b; text-align:center;">${c.label}</span></div>`).join('')}</div></div>`;

  return (
    <PreviewCard htmlContent={html} cssContent={html} label="Copy">
      <div className="bg-white rounded-2xl p-5 shadow-sm">
        <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-4">Industry Domains</p>
        <div className="grid grid-cols-4 gap-y-4 gap-x-2">
          {cats.map(({ Icon, label, active }) => (
            <div key={label} className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center transition-colors" style={{ backgroundColor: active ? scale[50] : '#f8fafc', color: active ? scale[600] : '#94a3b8' }}>
                <Icon size={20} />
              </div>
              <span className="text-[10px] text-slate-500 font-semibold text-center leading-tight">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </PreviewCard>
  );
}
