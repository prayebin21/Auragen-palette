'use client';
import { useColor } from '@/context/ColorContext';
import PreviewCard from './PreviewCard';

export default function IllustrationCard() {
  const { scale } = useColor();
  const html = `<div style="background:#fff; border-radius:1rem; padding:1.5rem; display:flex; justify-content:center; align-items:center;">
  <svg viewBox="0 0 300 240" style="width:100%; max-width:240px; height:auto;">
    <circle cx="150" cy="120" r="90" fill="${scale[50]}" />
    <rect x="80" y="145" width="140" height="8" rx="4" fill="${scale[700]}" />
    <rect x="135" y="125" width="30" height="20" fill="${scale[300]}" />
    <rect x="110" y="70" width="80" height="55" rx="6" fill="#1e293b" />
    <rect x="116" y="76" width="68" height="43" rx="3" fill="${scale[50]}" />
    <rect x="122" y="84" width="30" height="4" rx="2" fill="${scale[500]}" />
    <rect x="122" y="92" width="45" height="4" rx="2" fill="${scale[300]}" />
    <circle cx="150" cy="170" r="14" fill="${scale[400]}" />
    <path d="M 125 210 Q 150 188 175 210 Z" fill="${scale[600]}" />
  </svg>
</div>`;

  return (
    <PreviewCard htmlContent={html} cssContent={html} label="Copy">
      <div className="bg-white rounded-2xl p-6 flex flex-col items-center justify-center min-h-[280px] shadow-sm">
        <svg viewBox="0 0 300 240" className="w-full max-w-[240px] h-auto">
          <circle cx="150" cy="120" r="90" fill={scale[50]} />
          <path d="M 50 180 Q 150 200 250 180" stroke={scale[200]} strokeWidth="4" fill="none" strokeLinecap="round" />
          <rect x="80" y="145" width="140" height="8" rx="4" fill={scale[700]} />
          <rect x="135" y="125" width="30" height="20" fill={scale[300]} />
          <rect x="110" y="70" width="80" height="55" rx="6" fill="#1e293b" />
          <rect x="116" y="76" width="68" height="43" rx="3" fill={scale[50]} />
          <rect x="122" y="84" width="30" height="4" rx="2" fill={scale[500]} />
          <rect x="122" y="92" width="45" height="4" rx="2" fill={scale[300]} />
          <rect x="122" y="100" width="22" height="4" rx="2" fill={scale[400]} />
          <rect x="122" y="108" width="36" height="4" rx="2" fill={scale[600]} />
          <circle cx="150" cy="170" r="14" fill={scale[400]} />
          <path d="M 125 210 Q 150 188 175 210 Z" fill={scale[600]} />
          <circle cx="70" cy="80" r="4" fill={scale[300]} />
          <circle cx="230" cy="90" r="6" fill={scale[400]} />
          <polygon points="210,60 214,68 222,70 214,72 210,80 206,72 198,70 206,68" fill={scale[500]} />
        </svg>
      </div>
    </PreviewCard>
  );
}
