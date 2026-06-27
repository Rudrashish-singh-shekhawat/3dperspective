import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Activity, Box, Layers, Zap, Globe, ChevronRight, Play, ArrowUpRight, Cpu, Sparkles } from 'lucide-react';
import Background from './background/Background';
import Pendulum from './background/Pendulum';
import EquationsBackground from './background/equations/EquationsBackground';

/* ─── 3D Tilt Card Component for Premium Feel ─── */
const TiltCard = ({ children, className = '' }) => {
  const cardRef = useRef(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left; // x position within the element.
    const y = e.clientY - rect.top;  // y position within the element.

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Calculate rotation (-10 to 10 degrees)
    const rotateX = -((y - centerY) / centerY) * 10;
    const rotateY = ((x - centerX) / centerX) * 10;

    setRotate({ x: rotateX, y: rotateY });

    // Glare effect
    setGlare({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.15
    });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
    setGlare((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative transition-transform duration-200 ease-out preserve-3d ${className}`}
      style={{
        transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
      }}
    >
      {/* Glare overlay */}
      <div
        className="absolute inset-0 z-50 rounded-[inherit] pointer-events-none transition-opacity duration-300"
        style={{
          opacity: glare.opacity,
          background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 80%)`,
          mixBlendMode: 'overlay'
        }}
      />
      {children}
    </div>
  );
};


/* ─── Scroll Reveal Component ─── */
const ScrollReveal = ({ children, className = '' }) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-[800ms] ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        } ${className}`}
    >
      {children}
    </div>
  );
};


export default function Home() {
  const navigate = useNavigate();
  const heroRef = useRef(null);

  return (
    <div className="min-h-screen bg-[#0f1311] text-white font-sans selection:bg-white/20 overflow-x-hidden relative">
      <Background />
      <EquationsBackground />


      {/* ─── Floating Logo ─── */}
      <div className="absolute top-0 left-0 right-0 z-50 pointer-events-none">

        <div className="max-w-[1400px] mx-auto px-6 h-20 flex items-center">
          <button
            className="flex items-center gap-2 font-mono text-sm font-bold tracking-wider text-white/80 hover:text-white transition-colors pointer-events-auto p-2 -ml-2"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Scroll to top"
          >
            <Box size={18} />
            <span>3D PERSPECTIVE</span>
          </button>
        </div>
      </div>

      {/* ─── Soft Ambient Light Removed ─── */}

      <div className="relative z-10 max-w-[1400px] mx-auto px-4 md:px-6 py-12 md:py-24 flex flex-col gap-24 md:gap-40">

        {/* ═══ HERO SECTION — centered typography over math background ═══ */}
        <section ref={heroRef} className="flex flex-col items-center justify-center h-screen relative -mt-32 md:-mt-48 overflow-visible text-center">
          <Pendulum />
          <div className="z-10 flex flex-col items-center gap-6 max-w-4xl px-4 pointer-events-none -mt-20 md:-mt-32">


            {/* Premium Contrast Title */}
            <h1 className="text-5xl sm:text-6xl md:text-8xl font-black tracking-tight leading-none select-none py-2 flex flex-col md:flex-row items-center gap-2 md:gap-4 justify-center">
              <span className="text-white/40 font-light">3D</span>
              <span className="bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-white/40">PERSPECTIVE</span>
            </h1>
          </div>
        </section>

        {/* ═══ SUBTITLE & CTAs — revealed on scroll ═══ */}
        <ScrollReveal>
          <section className="flex flex-col items-center text-center gap-8 md:gap-10 -mt-10 md:-mt-20 px-4 md:px-0">
            <p className="max-w-3xl text-lg md:text-2xl text-white/50 leading-relaxed font-light">
              Explore dynamic mathematical fields, physical motion equations, and spatial simulations directly in the browser. Pure performance, pure code.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 mt-8">
              <button
                onClick={() => document.getElementById('showcase').scrollIntoView({ behavior: 'smooth' })}
                className="group relative px-6 md:px-10 py-4 md:py-5 bg-white text-black font-bold rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 overflow-hidden shadow-[0_0_40px_rgba(255,255,255,0.15)]"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
                <span className="text-lg">Discover the Engine</span>
                <ArrowUpRight size={22} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
              <button
                onClick={() => document.getElementById('features').scrollIntoView({ behavior: 'smooth' })}
                className="px-6 md:px-10 py-4 md:py-5 bg-transparent border border-white/10 text-white font-bold rounded-2xl hover:bg-white/5 transition-all flex items-center justify-center gap-3 backdrop-blur-sm"
              >
                <span className="text-lg">Capabilities</span>
              </button>
            </div>
          </section>
        </ScrollReveal>
        {/* ═══ BENTO BOX FEATURES ═══ */}
        <section id="features" className="flex flex-col gap-12 animate-fadeSlideIn scroll-mt-32">
          <div className="flex flex-col gap-4">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-white/50">
              Unrivaled Capabilities
            </h2>
            <p className="text-white/50 text-xl max-w-2xl">A symphony of design and mathematics, pushing the boundaries of what is possible on the web.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4 auto-rows-[250px]">

            {/* Main Feature (Large) */}
            <TiltCard className="md:col-span-2 md:row-span-2 rounded-3xl bg-gradient-to-br from-white/[0.04] to-white/[0.01] border border-white/[0.08] p-6 md:p-10 flex flex-col justify-between overflow-hidden group">
              <div className="absolute inset-0 bg-white/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-3xl pointer-events-none" />
              <div className="w-16 h-16 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-white group-hover:scale-105 transition-transform duration-500 shadow-sm">
                <Globe size={32} />
              </div>
              <div className="mt-8 relative z-10">
                <h3 className="text-2xl md:text-3xl font-bold mb-4 tracking-tight">Immersive Real-time Rendering</h3>
                <p className="text-white/55 text-base md:text-lg leading-relaxed font-light">
                  Utilizing our custom rendering pipelines to deliver 60FPS fluid interactions, stunning simulated lighting, and photorealistic depth directly in standard web browsers.
                </p>
              </div>
            </TiltCard>

            {/* Feature 2 (Wide) */}
            <TiltCard className="md:col-span-2 md:row-span-1 rounded-3xl bg-gradient-to-br from-white/[0.03] to-transparent border border-white/[0.08] p-6 md:p-8 flex flex-col justify-center overflow-hidden group relative">
              {/* Abstract background rings */}
              <div className="absolute -right-10 -bottom-20 opacity-20 group-hover:opacity-30 transition-opacity duration-700 pointer-events-none">
                <div className="w-64 h-64 border-[1px] border-white/10 rounded-full absolute top-0 left-0" />
                <div className="w-48 h-48 border-[1px] border-white/5 rounded-full absolute top-8 left-8" />
                <div className="w-32 h-32 border-[1px] border-white/5 rounded-full absolute top-16 left-16" />
              </div>
              <div className="flex items-center gap-6 relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-white/[0.03] border border-white/10 flex shrink-0 items-center justify-center text-white/90">
                  <Cpu size={28} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-2 tracking-tight">Uncompromised Performance</h3>
                  <p className="text-white/55 font-light">Highly optimized asset delivery, structural rendering, and memory management.</p>
                </div>
              </div>
            </TiltCard>

            {/* Feature 3 (Small) */}
            <TiltCard className="md:col-span-1 md:row-span-1 rounded-3xl bg-gradient-to-br from-white/[0.03] to-transparent border border-white/[0.08] p-6 md:p-8 flex flex-col gap-4 group">
              <div className="w-12 h-12 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-white/90">
                <Layers size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 tracking-tight">Interactive Data</h3>
                <p className="text-white/55 text-sm font-light">Visualize complex mathematical operations and structures in real-time.</p>
              </div>
            </TiltCard>

            {/* Feature 4 (Small) */}
            <TiltCard className="md:col-span-1 md:row-span-1 rounded-3xl bg-gradient-to-br from-white/[0.03] to-transparent border border-white/[0.08] p-6 md:p-8 flex flex-col gap-4 group">
              <div className="w-12 h-12 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-white/90">
                <Zap size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 tracking-tight">Zero Latency</h3>
                <p className="text-white/55 text-sm font-light">Direct interaction via specialized hardware-accelerated loops.</p>
              </div>
            </TiltCard>

          </div>
        </section>

        {/* ═══ INTERACTIVE SHOWCASE ═══ */}
        <section id="showcase" className="flex flex-col gap-12 mt-16 scroll-mt-32">
          <div className="flex items-end justify-between">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-white/50">
              Interactive Showcase
            </h2>
          </div>

          <TiltCard className="w-full rounded-[2.5rem] bg-gradient-to-br from-white/[0.05] to-transparent border border-white/[0.1] overflow-hidden shadow-2xl relative group">
            {/* Animated glowing orb behind content */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/[0.02] rounded-full blur-[100px] opacity-50 group-hover:opacity-100 group-hover:scale-110 transition-all duration-1000 pointer-events-none" />

            <div className="flex flex-col lg:flex-row relative z-10">
              <div className="p-8 md:p-12 lg:w-[55%] flex flex-col justify-center gap-6 md:gap-8 border-b lg:border-b-0 lg:border-r border-white/10 bg-black/20 backdrop-blur-xl">
                <h3 className="text-3xl md:text-5xl font-bold text-white tracking-tight">Fourier Series Engine</h3>
                <p className="text-white/60 text-lg md:text-xl leading-relaxed font-light">
                  Experience our real-time math engine. Watch complex wave forms assemble themselves through modular rotating vectors and epicycles. A true demonstration of algorithmic performance and mathematical beauty.
                </p>
                <button
                  onClick={() => navigate('/fourier')}
                  className="mt-6 flex items-center justify-between w-max px-8 py-4 rounded-xl bg-white text-black font-bold hover:scale-[1.02] active:scale-[0.98] transition-all group/btn"
                >
                  <span className="mr-6">Launch Visualizer</span>
                  <div className="w-8 h-8 rounded-full bg-black/10 flex items-center justify-center group-hover/btn:bg-black group-hover/btn:text-white transition-colors">
                    <ArrowUpRight size={18} />
                  </div>
                </button>
              </div>

              <div className="lg:w-[45%] min-h-[300px] md:min-h-[400px] bg-black/40 relative flex items-center justify-center p-8 md:p-12 overflow-hidden">
                {/* 3D abstract composition */}
                <div className="relative w-full aspect-square max-w-[350px] transform-style-3d group-hover:rotate-x-12 group-hover:-rotate-y-12 transition-transform duration-1000">
                  <div className="absolute inset-0 border-[1px] border-white/20 rounded-full animate-[spin_20s_linear_infinite]" />
                  <div className="absolute inset-8 border-[1px] border-white/15 rounded-full animate-[spin_15s_linear_infinite_reverse] rotate-x-45" />
                  <div className="absolute inset-16 border-[1px] border-white/10 rounded-full animate-[spin_10s_linear_infinite] rotate-y-45" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-32 h-32 rounded-full bg-gradient-to-tr from-white/10 to-white/5 blur-xl opacity-50 animate-pulse" />
                    <Globe size={100} strokeWidth={1} className="text-white/60 absolute drop-shadow-[0_0_30px_rgba(255,255,255,0.2)]" />
                  </div>
                </div>
              </div>
            </div>
          </TiltCard>
        </section>

        {/* ═══ FOOTER ═══ */}
        <footer className="max-w-5xl mx-auto py-8 md:py-12 border-t border-white/[0.05] flex flex-col md:flex-row justify-between items-center gap-6 text-white/40 text-sm mt-10">
          <div className="flex items-center gap-2">
          <Sparkles size={16} />
          <p className="font-mono uppercase tracking-widest">3D Perspective © {new Date().getFullYear()}</p>
          </div>
          <div className="flex gap-8 font-medium">
            <span className="hover:text-white cursor-pointer transition-colors">Privacy</span>
            <span className="hover:text-white cursor-pointer transition-colors">Terms</span>
            <span className="hover:text-white cursor-pointer transition-colors">Twitter</span>
            <span className="hover:text-white cursor-pointer transition-colors">GitHub</span>
          </div>
        </footer>

      </div>
    </div>
  );
}
