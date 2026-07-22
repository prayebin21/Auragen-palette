'use client';
import { ReactNode, useRef } from 'react';
import CopyMenu from '@/components/CopyMenu';

interface PreviewCardProps {
  children: ReactNode;
  className?: string;
  htmlContent: string;
  cssContent: string;
  tailwindClasses?: string;
  label?: string;
  cardName?: string;
}

export default function PreviewCard({
  children,
  className = '',
  htmlContent,
  cssContent,
  label,
  cardName
}: PreviewCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  return (
    <div className={`relative group h-full ${className}`}>
      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-200 translate-y-1 group-hover:translate-y-0 z-30 pointer-events-auto">
        <CopyMenu cardRef={cardRef} htmlContent={htmlContent} cssContent={cssContent} label={label} cardName={cardName} />
      </div>
      <div ref={cardRef} className="h-full">
        {children}
      </div>
    </div>
  );
}
