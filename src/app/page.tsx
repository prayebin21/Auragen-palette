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

export default function Home() {
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

  return (
    <>
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="max-w-[1400px] mx-auto px-5 py-8">

        {/* Tab 1: Random Palette Generator (AuraGen Original) */}
        {activeTab === 'palette' && (
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-1">
              <h1 className="text-2xl font-black text-slate-800 tracking-tight">
                AuraGen Color Palette Generator
              </h1>
              <p className="text-slate-500 text-sm">
                Generate random color harmonies, lock your favorite shades, and export ready-to-use color schemes.
              </p>
            </div>
            <PaletteGeneratorTab />
          </div>
        )}

        {/* Tab 2: Tailwind Studio (50-950 scale & component visualizer) */}
        {activeTab === 'tailwind' && (
          <div className="flex flex-col gap-6">
            {/* Controls Row (Not included in exported PNG) */}
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-black text-slate-800 tracking-tight">Tailwind Studio</h1>
                <p className="text-slate-500 text-sm mt-0.5">Pick a base color → get a full 50–950 scale with real UI previews.</p>
              </div>
              <ColorPicker onExportPage={handleExportFullPage} isExportingPage={isExportingPage} />
            </div>

            {/* Export Target Container (Starts from PaletteBar down) */}
            <div ref={studioPageRef} className="flex flex-col gap-6 p-3 rounded-3xl bg-[#f0f2f5]">
              {/* Palette Strip */}
              <PaletteBar />

              {/* Examples Section Header */}
              <div className="flex items-center justify-between">
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Component Visualizer</p>
              </div>

              {/* Structured Groups with Outer Frames */}
              <div className="flex flex-col gap-6">

                {/* Group 1: System Overview & Domains */}
                <section className="bg-white/60 border border-slate-200/80 p-5 rounded-3xl shadow-sm backdrop-blur-sm">
                  <h2 className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-3 px-1">
                    System Overview &amp; Domains
                  </h2>
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-stretch">
                    <HeroCard />
                    <CategoriesCard />
                    <FinanceCard />
                  </div>
                </section>

                {/* Group 2: Developer Profile & Schedule */}
                <section className="bg-white/60 border border-slate-200/80 p-5 rounded-3xl shadow-sm backdrop-blur-sm">
                  <h2 className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-3 px-1">
                    Developer Profile &amp; Schedule
                  </h2>
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-stretch">
                    <RadioCard />
                    <ScheduleCard />
                    <ProfileCard />
                  </div>
                </section>

                {/* Group 3: Financial Metrics & Subscriptions */}
                <section className="bg-white/60 border border-slate-200/80 p-5 rounded-3xl shadow-sm backdrop-blur-sm">
                  <h2 className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-3 px-1">
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
                <section className="bg-white/60 border border-slate-200/80 p-5 rounded-3xl shadow-sm backdrop-blur-sm">
                  <h2 className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-3 px-1">
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
                <section className="bg-white/60 border border-slate-200/80 p-5 rounded-3xl shadow-sm backdrop-blur-sm">
                  <h2 className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-3 px-1">
                    Active Workspace Performance
                  </h2>
                  <AnalyticsCard />
                </section>

                {/* Group 6: System Security & UI Kit */}
                <section className="bg-white/60 border border-slate-200/80 p-5 rounded-3xl shadow-sm backdrop-blur-sm">
                  <h2 className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-3 px-1">
                    System Security &amp; UI Kit
                  </h2>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 items-stretch">
                    <SettingsCard />
                    <ButtonMatrix />
                  </div>
                </section>

                {/* Group 7: Developer Resources & Metrics */}
                <section className="bg-white/60 border border-slate-200/80 p-5 rounded-3xl shadow-sm backdrop-blur-sm">
                  <h2 className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-3 px-1">
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
    </>
  );
}
