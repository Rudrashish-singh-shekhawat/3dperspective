import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, ChevronRight, Box } from 'lucide-react';
import JosephFourierCanvas from '../components/JosephFourierCanvas';
import Background from './background/Background';
import FourierDraw from './background/background epcircle/FourierDraw';
import ScrollReveal from '../components/ScrollReveal';
import { Divider } from '../components/ArticleElements';

// Article Sections
import { WhatIsFourier, SeriesVsTransform, SeeingItVisually } from './fourier-series/sections/IntroSections';
import { EpicyclesSection, RealWorldUses, MathPeek } from './fourier-series/sections/AdvancedSections';
import { HowItWorks, FooterCTA } from './fourier-series/sections/HowItWorksSection';

export default function FourierArticle() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0f1311] text-white font-sans selection:bg-white/20 overflow-x-hidden relative">
      <Background />

      <div className="absolute top-0 left-0 w-full h-screen pointer-events-none z-0 overflow-hidden opacity-80 mix-blend-screen">
        <FourierDraw />
      </div>

      {/* ─── Floating Logo ─── */}
      <div className="absolute top-0 left-0 right-0 z-50 pointer-events-none">
        <div className="max-w-[1400px] mx-auto px-6 h-20 flex items-center">
          <button
            className="flex items-center gap-2 font-mono text-sm font-bold tracking-wider text-white/80 hover:text-white transition-colors pointer-events-auto p-2 -ml-2"
            onClick={() => navigate('/')}
            aria-label="Back to home"
          >
            <Box size={18} />
            <span>3D PERSPECTIVE</span>
          </button>
        </div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 py-8 md:py-20 pb-16 md:pb-32 flex flex-col gap-12 md:gap-28">

        {/* ═══ HERO ═══ */}
        <section className="flex flex-col gap-6 text-center justify-center items-center h-screen -mt-8 md:-mt-20 pointer-events-none px-2">
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[1.1] animate-fadeSlideIn break-words">
            <span className="bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-white/40 block pb-2">
              Fourier Series
            </span>
          </h1>
        </section>

        {/* ═══ SUBTITLE & CTA ═══ */}
        <ScrollReveal>
          <section className="flex flex-col items-center text-center gap-8 md:gap-10 -mt-10 md:-mt-20 px-4 md:px-0">
            <p className="max-w-3xl text-lg md:text-2xl text-white/50 leading-relaxed font-light">
              From sound waves to JPEG compression, from MRI scanners to drawing pictures with circles —
              Fourier's idea is everywhere. Let's understand it visually, step by step.
            </p>
            <button
              onClick={() => navigate('/fourier/app')}
              className="mt-4 w-full sm:w-auto flex items-center justify-center gap-3 px-6 md:px-10 py-4 md:py-5 bg-white text-black font-bold rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_0_40px_rgba(255,255,255,0.15)] group"
            >
              <Play size={20} className="fill-black group-hover:text-blue transition-colors" />
              <span>Skip to Visualizer App</span>
              <ChevronRight size={20} className="ml-2 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
            </button>
          </section>
        </ScrollReveal>

        <Divider />

        {/* Preview canvas */}
        <div className="my-8 md:my-12 w-full max-w-2xl mx-auto px-2 sm:px-0">
          <JosephFourierCanvas className="w-full aspect-square sm:aspect-video md:h-96" />
        </div>

        {/* ═══ SECTION 1 — WHAT IS THE FOURIER SERIES? ═══ */}
        <ScrollReveal>
          <WhatIsFourier />
        </ScrollReveal>

        <Divider />

        {/* ═══ SECTION 2 — SERIES vs TRANSFORM ═══ */}
        <ScrollReveal>
          <SeriesVsTransform />
        </ScrollReveal>

        <Divider />

        {/* ═══ SECTION 3 — SEEING IT VISUALLY ═══ */}
        <ScrollReveal>
          <SeeingItVisually />
        </ScrollReveal>

        <Divider />

        {/* ═══ SECTION 4 — EPICYCLES ═══ */}
        <ScrollReveal>
          <EpicyclesSection />
        </ScrollReveal>

        <Divider />

        {/* ═══ SECTION 5 — REAL WORLD USES ═══ */}
        <ScrollReveal>
          <RealWorldUses />
        </ScrollReveal>

        <Divider />

        {/* ═══ SECTION 6 — THE MATH ═══ */}
        <ScrollReveal>
          <MathPeek />
        </ScrollReveal>

        <Divider />

        {/* ═══ SECTION 7 — HOW OUR VISUALIZER WORKS ═══ */}
        <ScrollReveal>
          <HowItWorks />
        </ScrollReveal>

        <Divider />

        {/* ═══ FOOTER CTA ═══ */}
        <ScrollReveal>
          <FooterCTA onNavigate={() => navigate('/fourier/app')} />
        </ScrollReveal>
      </div>
    </div>
  );
}
