'use client';
import { Zap } from 'lucide-react';
import { useColor } from '@/context/ColorContext';
import PreviewCard from './PreviewCard';

export default function HeroCard() {
  const { scale } = useColor();
  const html = `<div style="background-color: ${scale[500]}; padding: 2rem; border-radius: 1rem; text-align: center;">
  <div style="width:3.5rem; height:3.5rem; background:rgba(255,255,255,0.2); border-radius:50%; display:flex; align-items:center; justify-content:center; margin:0 auto 1.25rem;">⚡</div>
  <h2 style="color:#fff; font-size:1.5rem; font-weight:900; margin-bottom:0.75rem; line-height:1.2;">Accelerate Your Frontend Systems</h2>
  <p style="color:${scale[100]}; font-size:0.875rem; margin-bottom:1.5rem;">Generate harmonious Tailwind CSS color tokens and preview them on production UI components.</p>
  <button style="background:${scale[800]}; color:#fff; padding:0.75rem 1.5rem; border-radius:0.75rem; border:none; font-weight:700; width:100%; cursor:pointer;">Explore Tokens</button>
</div>`;

  return (
    <PreviewCard htmlContent={html} cssContent={html} label="Copy">
      <div className="rounded-2xl overflow-hidden shadow-sm" style={{ backgroundColor: scale[500] }}>
        <div className="p-7 flex flex-col items-center text-center">
          <div className="w-14 h-14 rounded-full flex items-center justify-center mb-5" style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}>
            <Zap size={26} color="white" />
          </div>
          <h2 className="text-[22px] font-black text-white leading-tight mb-3">Accelerate Your Frontend Systems</h2>
          <p className="text-sm mb-6 leading-relaxed" style={{ color: scale[100] }}>
            Generate harmonious Tailwind CSS color tokens and preview them on production UI components.
          </p>
          <button className="w-full font-bold py-3 rounded-xl text-white text-sm shadow-lg transition-opacity hover:opacity-90" style={{ backgroundColor: scale[800] }}>
            Explore Tokens
          </button>
        </div>
      </div>
    </PreviewCard>
  );
}
