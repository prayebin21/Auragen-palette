'use client';
import { useColor } from '@/context/ColorContext';
import PreviewCard from './PreviewCard';

export default function ButtonMatrix() {
  const { scale } = useColor();
  const html = `<div style="background:#fff; border-radius:1rem; padding:1.25rem;">
  <!-- Button Matrix: Default | Hover | Active | Disabled -->
  <!-- Row 1: Primary -->
  <div style="display:grid; grid-template-columns:repeat(4,1fr); gap:8px; margin-bottom:8px;">
    <button style="background:${scale[500]}; color:#fff; padding:8px; border:none; border-radius:8px; font-weight:700; font-size:11px;">Primary</button>
    <button style="background:${scale[600]}; color:#fff; padding:8px; border:none; border-radius:8px; font-weight:700; font-size:11px;">Primary</button>
    <button style="background:${scale[700]}; color:#fff; padding:8px; border:none; border-radius:8px; font-weight:700; font-size:11px;">Primary</button>
    <button style="background:${scale[200]}; color:#fff; padding:8px; border:none; border-radius:8px; font-weight:700; font-size:11px; opacity:0.5; cursor:not-allowed;">Primary</button>
  </div>
  <!-- Row 2: Secondary -->
  <div style="display:grid; grid-template-columns:repeat(4,1fr); gap:8px; margin-bottom:8px;">
    <button style="background:${scale[50]}; color:${scale[700]}; padding:8px; border:none; border-radius:8px; font-weight:700; font-size:11px;">Secondary</button>
    <button style="background:${scale[100]}; color:${scale[800]}; padding:8px; border:none; border-radius:8px; font-weight:700; font-size:11px;">Secondary</button>
    <button style="background:${scale[200]}; color:${scale[900]}; padding:8px; border:none; border-radius:8px; font-weight:700; font-size:11px;">Secondary</button>
    <button style="background:#f8fafc; color:#cbd5e1; padding:8px; border:none; border-radius:8px; font-weight:700; font-size:11px; cursor:not-allowed;">Secondary</button>
  </div>
  <!-- Row 3: Tertiary -->
  <div style="display:grid; grid-template-columns:repeat(4,1fr); gap:8px;">
    <button style="color:${scale[600]}; background:transparent; padding:8px; border:none; border-radius:8px; font-weight:700; font-size:11px;">Tertiary</button>
    <button style="color:${scale[700]}; background:transparent; padding:8px; border:none; border-radius:8px; font-weight:700; font-size:11px; text-decoration:underline;">Tertiary</button>
    <button style="color:${scale[800]}; background:${scale[50]}; padding:8px; border:none; border-radius:8px; font-weight:700; font-size:11px;">Tertiary</button>
    <button style="color:#cbd5e1; background:transparent; padding:8px; border:none; border-radius:8px; font-weight:700; font-size:11px; cursor:not-allowed;">Tertiary</button>
  </div>
</div>`;
  return (
    <PreviewCard htmlContent={html} tailwindClasses="" cssContent={html} label="Copy">
      <div className="bg-white rounded-2xl p-5">
        <div className="grid grid-cols-4 gap-2 text-center mb-3">
          {['Default','Hover','Active','Disabled'].map(s => (
            <div key={s} className="text-[9px] font-bold text-slate-400 uppercase tracking-wide">{s}</div>
          ))}
        </div>
        <div className="grid grid-cols-4 gap-2 mb-2">
          <button className="text-white text-[11px] font-bold py-2.5 rounded-lg" style={{ backgroundColor: scale[500] }}>Primary</button>
          <button className="text-white text-[11px] font-bold py-2.5 rounded-lg" style={{ backgroundColor: scale[600] }}>Primary</button>
          <button className="text-white text-[11px] font-bold py-2.5 rounded-lg" style={{ backgroundColor: scale[700] }}>Primary</button>
          <button className="text-white text-[11px] font-bold py-2.5 rounded-lg opacity-50 cursor-not-allowed" style={{ backgroundColor: scale[200] }}>Primary</button>
        </div>
        <div className="grid grid-cols-4 gap-2 mb-2">
          <button className="text-[11px] font-bold py-2.5 rounded-lg" style={{ backgroundColor: scale[50], color: scale[700] }}>Secondary</button>
          <button className="text-[11px] font-bold py-2.5 rounded-lg" style={{ backgroundColor: scale[100], color: scale[800] }}>Secondary</button>
          <button className="text-[11px] font-bold py-2.5 rounded-lg" style={{ backgroundColor: scale[200], color: scale[900] }}>Secondary</button>
          <button className="text-[11px] font-bold py-2.5 rounded-lg cursor-not-allowed bg-slate-50 text-slate-300">Secondary</button>
        </div>
        <div className="grid grid-cols-4 gap-2">
          <button className="text-[11px] font-bold py-2.5 rounded-lg" style={{ color: scale[600] }}>Tertiary</button>
          <button className="text-[11px] font-bold py-2.5 rounded-lg underline" style={{ color: scale[700] }}>Tertiary</button>
          <button className="text-[11px] font-bold py-2.5 rounded-lg" style={{ color: scale[800], backgroundColor: scale[50] }}>Tertiary</button>
          <button className="text-[11px] font-bold py-2.5 rounded-lg cursor-not-allowed text-slate-300">Tertiary</button>
        </div>
      </div>
    </PreviewCard>
  );
}
