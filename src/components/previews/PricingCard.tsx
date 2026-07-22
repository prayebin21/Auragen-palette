'use client';
import { Sparkles, Zap, ShieldCheck } from 'lucide-react';
import { useColor } from '@/context/ColorContext';
import PreviewCard from './PreviewCard';

const plans = [
  { icon: Sparkles, name: 'Starter', price: '$0', period: 'forever free', desc: 'Essential tools for solo developers.', cta: 'Get Started', featured: false },
  { icon: Zap, name: 'Pro Studio', price: '$49', period: 'per month', desc: 'Full design tokens & team collaboration.', cta: 'Upgrade Pro', featured: true },
  { icon: ShieldCheck, name: 'Enterprise Scale', price: '$149', period: 'per month', desc: 'Dedicated SLA, custom pipelines & SSO.', cta: 'Contact Sales', featured: false },
];

export default function PricingCard() {
  const { scale } = useColor();
  const html = `<div style="background:#fff; border-radius:1rem; padding:1.25rem;">
  <h3 style="font-weight:700; margin-bottom:1rem;">Subscription Tiers</h3>
  <div style="display:grid; grid-template-columns:repeat(3,1fr); gap:0.75rem;">
    ${plans.map(p => `<div style="text-align:center; padding:0.75rem; border-radius:0.75rem; border:${p.featured ? `2px solid ${scale[500]}` : '1px solid #e2e8f0'}; background:${p.featured ? scale[50] : '#fff'};">
      <div style="font-size:11px; font-weight:700; color:${p.featured ? scale[700] : '#64748b'}; margin-bottom:0.5rem;">${p.name}</div>
      <div style="font-size:1.5rem; font-weight:900; color:${p.featured ? scale[900] : '#0f172a'};">${p.price}</div>
      <div style="font-size:9px; color:${p.featured ? scale[400] : '#94a3b8'}; margin-bottom:0.75rem;">${p.period}</div>
      <button style="width:100%; padding:0.5rem; border-radius:0.5rem; border:none; font-weight:700; font-size:11px; cursor:pointer; background:${p.featured ? scale[500] : '#f1f5f9'}; color:${p.featured ? '#fff' : '#64748b'};">${p.cta}</button>
    </div>`).join('')}
  </div>
</div>`;

  return (
    <PreviewCard htmlContent={html} cssContent={html} label="Copy">
      <div className="bg-white rounded-2xl p-5 shadow-sm">
        <h3 className="font-bold text-slate-800 mb-4">Subscription Tiers</h3>
        <div className="grid grid-cols-3 gap-3">
          {plans.map((plan) => {
            const Icon = plan.icon;
            return (
              <div
                key={plan.name}
                className="flex flex-col items-center text-center p-3 rounded-xl"
                style={{
                  border: plan.featured ? `2px solid ${scale[500]}` : '1px solid #e2e8f0',
                  backgroundColor: plan.featured ? scale[50] : '#fff',
                }}
              >
                <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-2 flex-shrink-0"
                  style={{ backgroundColor: plan.featured ? scale[500] : '#f8fafc', color: plan.featured ? '#fff' : '#94a3b8' }}>
                  <Icon size={18} />
                </div>
                <div className="text-[11px] font-bold mb-1" style={{ color: plan.featured ? scale[700] : '#475569' }}>{plan.name}</div>
                <div className="text-2xl font-black leading-none" style={{ color: plan.featured ? scale[900] : '#0f172a' }}>{plan.price}</div>
                <div className="text-[9px] mb-3" style={{ color: plan.featured ? scale[400] : '#94a3b8' }}>{plan.period}</div>
                <p className="text-[10px] leading-relaxed mb-3" style={{ color: plan.featured ? scale[600] : '#94a3b8' }}>{plan.desc}</p>
                <button
                  className="w-full text-[11px] font-bold py-2 rounded-lg transition-opacity hover:opacity-90 shadow-sm"
                  style={{ backgroundColor: plan.featured ? scale[500] : '#f1f5f9', color: plan.featured ? '#fff' : '#64748b' }}
                >
                  {plan.cta}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </PreviewCard>
  );
}
