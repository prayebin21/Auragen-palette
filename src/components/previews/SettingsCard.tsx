'use client';
import { Shield, Bell, Download } from 'lucide-react';
import { useColor } from '@/context/ColorContext';
import PreviewCard from './PreviewCard';

export default function SettingsCard() {
  const { scale } = useColor();
  const items = [
    { Icon: Shield, title: 'Workspace Permissions', desc: 'Configure RBAC access policies and granular team security.', shade: 600 as const },
    { Icon: Bell, title: 'Webhook Notifications', desc: 'Customize real-time alert triggers across Slack and Discord.', shade: 400 as const },
    { Icon: Download, title: 'Export Raw Tokens', desc: 'Download full design system tokens in JSON, SCSS, or Tailwind format.', shade: 200 as const },
  ];
  const html = `<div style="display:grid; grid-template-columns:repeat(3,1fr); gap:0.75rem;">${items.map(it => `<div style="background:${scale[it.shade]}; color:#fff; padding:1rem; border-radius:1rem;"><div style="font-size:12px; font-weight:700; margin-bottom:0.5rem;">${it.title}</div><div style="font-size:10px; opacity:0.8;">${it.desc}</div></div>`).join('')}</div>`;

  return (
    <PreviewCard htmlContent={html} cssContent={html} label="Copy">
      <div className="grid grid-cols-3 gap-3">
        {items.map(({ Icon, title, desc, shade }) => (
          <div key={title} className="text-white p-4 rounded-2xl flex flex-col justify-between" style={{ backgroundColor: scale[shade] }}>
            <div className="w-9 h-9 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0 mb-3">
              <Icon size={18} />
            </div>
            <div>
              <div className="text-xs font-bold mb-1 leading-snug">{title}</div>
              <div className="text-[10px] opacity-80 leading-relaxed">{desc}</div>
            </div>
          </div>
        ))}
      </div>
    </PreviewCard>
  );
}
