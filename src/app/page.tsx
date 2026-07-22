'use client';

import { useState, useRef } from 'react';
import Header from '@/components/Header';
import LandingHero from '@/components/LandingHero';
import ColorPicker from '@/components/ColorPicker';
import PaletteBar from '@/components/PaletteBar';
import PaletteGeneratorTab from '@/components/PaletteGeneratorTab';
import HeroCard from '@/components/previews/HeroCard';
import CategoriesCard from '@/components/previews/CategoriesCard';
import FinanceCard from '@/components/previews/FinanceCard';
import RadioCard from '@/components/previews/RadioCard';
import ScheduleCard from '@/components/previews/ScheduleCard';
import ProfileCard from '@/components/previews/ProfileCard';
import RevenueChart from '@/components/previews/RevenueChart';
import PricingCard from '@/components/previews/PricingCard';
import TicketsCard from '@/components/previews/TicketsCard';
import CoursesCard from '@/components/previews/CoursesCard';
import AnalyticsCard from '@/components/previews/AnalyticsCard';
import SettingsCard from '@/components/previews/SettingsCard';
import CalendarCard from '@/components/previews/CalendarCard';
import ButtonMatrix from '@/components/previews/ButtonMatrix';
import IllustrationCard from '@/components/previews/IllustrationCard';
import HandbookCard from '@/components/previews/HandbookCard';
import DonutStatsCard from '@/components/previews/DonutStatsCard';
import { downloadElementAsPng, getExportFileName } from '@/lib/exportUtils';
import { useColor } from '@/context/ColorContext';

export default function Home() {
  const { isDarkMode } = useColor();
  const [activeTab, setActiveTab] = useState<'home' | 'palette' | 'tailwind'>('home');
  const [isExportingPage, setIsExportingPage] = useState(false);
  const studioPageRef = useRef<HTMLDivElement>(null);

  const handleExportFullPage = async () => {
    if (!studioPageRef.current) return;
    setIsExportingPage(true);
    const filename = getExportFileName('twgen');
    await downloadElementAsPng(studioPageRef.current, filename);
    setIsExportingPage(false);
  };

  const sectionFrameClass = isDarkMode
    ? 'bg-slate-900/70 border border-slate-800 p-4 rounded-3xl shadow-sm backdrop-blur-sm'
    : 'bg-white/80 border border-amber-900/10 p-4 rounded-3xl shadow-xs backdrop-blur-sm';

  const titleClass = isDarkMode ? 'text-white' : 'text-slate-900';
  const sectionTitleClass = isDarkMode ? 'text-slate-400' : 'text-amber-900/50';

  return (
    <div className={`min-h-screen transition-colors duration-300 relative ${
      isDarkMode ? 'bg-[#0b0f19] text-white' : 'bg-[#FAF6EE] text-slate-900'
    }`}>
      {/* PERFORMANCE OPTIMIZED BACKGROUND IMAGE OVERLAY (bg.png & bgdark.png) */}
      <img
        src={isDarkMode ? '/bgdark.png' : '/bg.png'}
        alt="Background"
        loading="eager"
        decoding="async"
        fetchPriority="high"
        className="fixed inset-0 w-full h-full object-cover object-top pointer-events-none transition-opacity duration-500 opacity-70 z-0"
      />

      {/* FOREGROUND CONTENT LAYER */}
      <div className="relative z-10">
        <Header activeTab={activeTab} setActiveTab={setActiveTab} />
        <main className="max-w-[1400px] mx-auto px-4 sm:px-5 py-6">

          {/* Tab 0: Futuristic Warm Organic Landing Index Page */}
          {activeTab === 'home' && (
            <LandingHero
              onStartGenerator={() => setActiveTab('palette')}
              onExploreStudio={() => setActiveTab('tailwind')}
            />
          )}

          {/* Tab 1: Random Palette Generator (AuraGen Original) */}
          {activeTab === 'palette' && (
            <div className="flex flex-col">
              {/* Title Row */}
              <div className="min-h-14 flex items-center justify-between gap-4 mb-5">
                <h1 className={`text-2xl sm:text-3xl font-black tracking-tight leading-none ${titleClass}`}>
                  Palette <span className="text-orange-600">Generator</span>
                </h1>
              </div>
              <PaletteGeneratorTab />
            </div>
          )}

          {/* Tab 2: Tailwind Studio (50-950 scale & component visualizer) */}
          {activeTab === 'tailwind' && (
            <div className="flex flex-col">
              {/* Title Row - Responsive Flex Column on Mobile */}
              <div className="min-h-14 flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
                <h1 className={`text-2xl sm:text-3xl font-black tracking-tight leading-none ${titleClass}`}>
                  Tailwind <span className="text-orange-600">Studio</span>
                </h1>
                <ColorPicker onExportPage={handleExportFullPage} isExportingPage={isExportingPage} />
              </div>

              {/* Export Target Container */}
              <div ref={studioPageRef} className="flex flex-col gap-6">
                {/* Palette Strip */}
                <PaletteBar />

                {/* Structured Groups with Outer Frames */}
                <div className="flex flex-col gap-6">

                  {/* Group 1: System Overview & Domains */}
                  <section className={sectionFrameClass}>
                    <h2 className={`text-[10px] font-extrabold uppercase tracking-widest mb-3 px-1 ${sectionTitleClass}`}>
                      System Overview &amp; Domains
                    </h2>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-stretch">
                      <HeroCard />
                      <CategoriesCard />
                      <FinanceCard />
                    </div>
                  </section>

                  {/* Group 2: Developer Profile & Schedule */}
                  <section className={sectionFrameClass}>
                    <h2 className={`text-[10px] font-extrabold uppercase tracking-widest mb-3 px-1 ${sectionTitleClass}`}>
                      Developer Profile &amp; Schedule
                    </h2>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-stretch">
                      <RadioCard />
                      <ScheduleCard />
                      <ProfileCard />
                    </div>
                  </section>

                  {/* Group 3: Financial Metrics & Subscriptions */}
                  <section className={sectionFrameClass}>
                    <h2 className={`text-[10px] font-extrabold uppercase tracking-widest mb-3 px-1 ${sectionTitleClass}`}>
                      Financial Metrics &amp; Subscriptions
                    </h2>
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
                      <div className="lg:col-span-5">
                        <RevenueChart />
                      </div>
                      <div className="lg:col-span-7">
                        <PricingCard />
                      </div>
                    </div>
                  </section>

                  {/* Group 4: Support Desk & Learning Portal */}
                  <section className={sectionFrameClass}>
                    <h2 className={`text-[10px] font-extrabold uppercase tracking-widest mb-3 px-1 ${sectionTitleClass}`}>
                      Support Desk &amp; Learning Portal
                    </h2>
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
                      <div className="lg:col-span-5">
                        <TicketsCard />
                      </div>
                      <div className="lg:col-span-7">
                        <CoursesCard />
                      </div>
                    </div>
                  </section>

                  {/* Group 5: Active Workspace Performance */}
                  <section className={sectionFrameClass}>
                    <h2 className={`text-[10px] font-extrabold uppercase tracking-widest mb-3 px-1 ${sectionTitleClass}`}>
                      Active Workspace Performance
                    </h2>
                    <AnalyticsCard />
                  </section>

                  {/* Group 6: System Security & UI Kit */}
                  <section className={sectionFrameClass}>
                    <h2 className={`text-[10px] font-extrabold uppercase tracking-widest mb-3 px-1 ${sectionTitleClass}`}>
                      System Security &amp; UI Kit
                    </h2>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 items-stretch">
                      <SettingsCard />
                      <ButtonMatrix />
                    </div>
                  </section>

                  {/* Group 7: Developer Resources & Metrics */}
                  <section className={sectionFrameClass}>
                    <h2 className={`text-[10px] font-extrabold uppercase tracking-widest mb-3 px-1 ${sectionTitleClass}`}>
                      Developer Resources &amp; Metrics
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 items-stretch">
                      <IllustrationCard />
                      <CalendarCard />
                      <HandbookCard />
                      <DonutStatsCard />
                    </div>
                  </section>

                </div>
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  );
}
