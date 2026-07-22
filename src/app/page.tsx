'use client';

import { useState, useRef } from 'react';
import Header from '@/components/Header';
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
  const [activeTab, setActiveTab] = useState<'palette' | 'tailwind'>('palette');
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
    ? 'bg-slate-900/70 border border-slate-800 p-5 rounded-3xl shadow-sm backdrop-blur-sm'
    : 'bg-white/60 border border-slate-200/80 p-5 rounded-3xl shadow-sm backdrop-blur-sm';

  const titleClass = isDarkMode ? 'text-white' : 'text-slate-800';
  const sectionTitleClass = isDarkMode ? 'text-slate-400' : 'text-slate-400';

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode ? 'bg-[#0b0f19] text-white' : 'bg-[#f0f2f5] text-slate-900'
    }`}>
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="max-w-[1400px] mx-auto px-5 py-6">

        {/* Tab 1: Random Palette Generator (AuraGen Original) */}
        {activeTab === 'palette' && (
          <div className="flex flex-col gap-5">
            <div className="flex items-center justify-between">
              <h1 className={`text-2xl font-black tracking-tight ${titleClass}`}>
                Palette Generator
              </h1>
            </div>
            <PaletteGeneratorTab />
          </div>
        )}

        {/* Tab 2: Tailwind Studio (50-950 scale & component visualizer) */}
        {activeTab === 'tailwind' && (
          <div className="flex flex-col gap-5">
            {/* Controls Row */}
            <div className="flex flex-wrap items-center justify-between gap-4">
              <h1 className={`text-2xl font-black tracking-tight ${titleClass}`}>Tailwind Studio</h1>
              <ColorPicker onExportPage={handleExportFullPage} isExportingPage={isExportingPage} />
            </div>

            {/* Export Target Container (Starts from PaletteBar down) */}
            <div ref={studioPageRef} className={`flex flex-col gap-6 p-3 rounded-3xl transition-colors ${
              isDarkMode ? 'bg-[#0b0f19]' : 'bg-[#f0f2f5]'
            }`}>
              {/* Palette Strip */}
              <PaletteBar />

              {/* Examples Section Header */}
              <div className="flex items-center justify-between">
                <p className={`text-[11px] font-bold uppercase tracking-widest ${sectionTitleClass}`}>Component Visualizer</p>
              </div>

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
  );
}
