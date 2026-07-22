'use client';
import { ReactNode, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useColor } from '@/context/ColorContext';

interface CarouselSectionProps {
  title: string;
  children: ReactNode;
}

export default function CarouselSection({ title, children }: CarouselSectionProps) {
  const { isDarkMode } = useColor();
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -380 : 380;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className={`p-5 rounded-3xl border shadow-sm transition-colors ${
      isDarkMode
        ? 'bg-slate-900/80 border-slate-800 backdrop-blur-sm'
        : 'bg-white/80 border-slate-200/90 backdrop-blur-sm'
    }`}>
      {/* Section Header with Carousel Navigation Arrows */}
      <div className="flex items-center justify-between mb-4 px-1">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse"></span>
          <h2 className={`text-xs font-extrabold uppercase tracking-widest ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
            {title}
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => scroll('left')}
            className={`flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded-xl border transition-all active:scale-95 ${
              isDarkMode
                ? 'bg-slate-800 hover:bg-blue-600 border-slate-700 text-white'
                : 'bg-white hover:bg-blue-600 hover:text-white border-slate-200 text-slate-700 shadow-sm'
            }`}
            title="Scroll Left"
          >
            <ChevronLeft size={16} />
            <span className="hidden sm:inline">Prev</span>
          </button>
          <button
            onClick={() => scroll('right')}
            className={`flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded-xl border transition-all active:scale-95 ${
              isDarkMode
                ? 'bg-slate-800 hover:bg-blue-600 border-slate-700 text-white'
                : 'bg-white hover:bg-blue-600 hover:text-white border-slate-200 text-slate-700 shadow-sm'
            }`}
            title="Scroll Right"
          >
            <span className="hidden sm:inline">Next</span>
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Horizontal Scroll Track */}
      <div
        ref={scrollRef}
        className="flex gap-5 overflow-x-auto snap-x snap-mandatory py-2 pb-3 no-scrollbar"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {children}
      </div>
    </section>
  );
}
