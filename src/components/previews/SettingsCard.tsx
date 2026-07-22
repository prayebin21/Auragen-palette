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
      <div className="flex flex-col sm:grid sm:grid-cols-3 gap-2.5">
        {items.map(({ Icon, title, desc, shade }) => (
          <div
            key={title}
            className="text-white px-4 py-3.5 sm:p-4 rounded-2xl flex items-center justify-between sm:flex-col sm:justify-between shadow-xs transition-transform hover:scale-[1.01] min-h-[58px] sm:min-h-[110px]"
            style={{ backgroundColor: scale[shade] }}
          >
            <div className="flex items-center gap-3 sm:flex-col sm:items-start sm:gap-0">
              <div className="w-8 h-8 sm:w-9 sm:h-9 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0 sm:mb-3">
                <Icon size={16} className="sm:w-[18px] sm:h-[18px]" />
              </div>
              <div>
                <div className="text-xs sm:text-xs font-bold leading-snug">{title}</div>
                <div className="text-[10px] opacity-80 leading-relaxed hidden sm:block mt-0.5">{desc}</div>
              </div>
            </div>
            <span className="text-[10px] font-mono font-bold bg-white/20 px-2 py-0.5 rounded-md sm:hidden flex-shrink-0 ml-2">
              {shade}
            </span>
          </div>
        ))}
      </div>
    </PreviewCard>
  );
}
