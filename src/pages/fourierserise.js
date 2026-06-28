import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Play, Waves, Activity, CircleDashed, Image as ImageIcon,
  ChevronRight, Music, Radio, Sigma, Brain, Zap, Volume2,
  Smartphone, Wifi, Sparkles, Box
} from 'lucide-react';
import JosephFourierCanvas from '../components/JosephFourierCanvas';
import Background from './background/Background';
import EquationsBackground from './background/equations/EquationsBackground';
import FourierDraw from './background/background epcircle/FourierDraw';


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

/* ─── tiny animated sine-wave canvas ─── */
function SineWaveCanvas({ color = '#3b82f6', frequency = 1, amplitude = 1, className = '' }) {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let id;

    const dpr = Math.min(2, window.devicePixelRatio || 1);
    let currentW = canvas.offsetWidth;
    let currentH = canvas.offsetHeight;
    const resizeObserver = new ResizeObserver(entries => {
      for (let entry of entries) {
        currentW = entry.contentRect.width;
        currentH = entry.contentRect.height;
      }
    });
    resizeObserver.observe(canvas);

    let isIntersecting = true;
    const observer = new IntersectionObserver(([entry]) => {
      isIntersecting = entry.isIntersecting;
    }, { threshold: 0.05 });
    observer.observe(canvas);

    const draw = (t) => {
      if (!isIntersecting) {
        id = requestAnimationFrame(draw);
        return;
      }
      const targetW = currentW * dpr;
      const targetH = currentH * dpr;
      if (canvas.width !== targetW || canvas.height !== targetH) {
        canvas.width = targetW;
        canvas.height = targetH;
        ctx.scale(dpr, dpr);
      }
      const w = currentW;
      const h = currentH;
      ctx.clearRect(0, 0, w, h);
      ctx.strokeStyle = color;
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      for (let x = 0; x < w; x++) {
        const y = h / 2 + Math.sin((x / w) * Math.PI * 2 * frequency + t * 0.002) * (h / 2 - 10) * amplitude;
        x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.stroke();
      id = requestAnimationFrame(draw);
    };
    id = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(id);
      resizeObserver.disconnect();
      observer.disconnect();
    };
  }, [color, frequency, amplitude]);
  return <canvas ref={ref} className={`w-full h-full ${className}`} />;
}

/* ─── animated epicycle canvas ─── */
function EpicycleCanvas({ className = '' }) {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const trail = [];
    let id;
    const arms = [
      { r: 60, speed: 1, color: 'rgba(168,85,247,0.8)' },
      { r: 30, speed: 3, color: 'rgba(59,130,246,0.7)' },
      { r: 15, speed: -5, color: 'rgba(34,197,94,0.6)' },
      { r: 8, speed: 7, color: 'rgba(251,191,36,0.5)' },
    ];

    const dpr = Math.min(2, window.devicePixelRatio || 1);
    let currentW = canvas.offsetWidth;
    let currentH = canvas.offsetHeight;
    const resizeObserver = new ResizeObserver(entries => {
      for (let entry of entries) {
        currentW = entry.contentRect.width;
        currentH = entry.contentRect.height;
      }
    });
    resizeObserver.observe(canvas);

    let isIntersecting = true;
    const observer = new IntersectionObserver(([entry]) => {
      isIntersecting = entry.isIntersecting;
    }, { threshold: 0.05 });
    observer.observe(canvas);

    const draw = (t) => {
      if (!isIntersecting) {
        id = requestAnimationFrame(draw);
        return;
      }
      const targetW = currentW * dpr;
      const targetH = currentH * dpr;
      if (canvas.width !== targetW || canvas.height !== targetH) {
        canvas.width = targetW;
        canvas.height = targetH;
        ctx.scale(dpr, dpr);
      }
      const w = currentW;
      const h = currentH;
      ctx.clearRect(0, 0, w, h);
      let cx = w * 0.35, cy = h / 2;
      const time = t * 0.001;
      for (const arm of arms) {
        ctx.beginPath();
        ctx.arc(cx, cy, arm.r * 2, 0, Math.PI * 2);
        ctx.strokeStyle = arm.color.replace(/[\d.]+\)$/, '0.15)');
        ctx.lineWidth = 1.5;
        ctx.stroke();
        const nx = cx + Math.cos(time * arm.speed) * arm.r * 2;
        const ny = cy + Math.sin(time * arm.speed) * arm.r * 2;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(nx, ny);
        ctx.strokeStyle = arm.color;
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(nx, ny, 4, 0, Math.PI * 2);
        ctx.fillStyle = arm.color;
        ctx.fill();
        cx = nx; cy = ny;
      }
      trail.push({ x: cx, y: cy });
      if (trail.length > 500) trail.shift();
      ctx.beginPath();
      for (let i = 0; i < trail.length; i++) {
        const p = trail[i];
        i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y);
      }
      ctx.strokeStyle = 'rgba(168,85,247,0.5)';
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.beginPath();
      ctx.setLineDash([4, 6]);
      ctx.moveTo(cx, cy);
      ctx.lineTo(w * 0.7, cy);
      ctx.strokeStyle = 'rgba(255,255,255,0.15)';
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.setLineDash([]);
      id = requestAnimationFrame(draw);
    };
    id = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(id);
      resizeObserver.disconnect();
      observer.disconnect();
    };
  }, []);
  return <canvas ref={ref} className={`w-full h-full ${className}`} />;
}

/* ─── Fourier epicycle canvas (≈300 arms) ─── */
function FourierEpicycleCanvas({ numArms = 300, className = '' }) {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const trail = [];
    let id;
    // Generate arms for square wave: odd harmonics
    const arms = [];
    const baseScale = 60;
    for (let k = 1; k <= numArms * 2; k += 2) {
      const r = (4 / Math.PI) * (baseScale / k);
      const speed = k;
      const hue = (k * 40) % 360;
      const color = `hsla(${hue}, 70%, 60%, 0.8)`;
      arms.push({ r, speed, color });
    }
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    let currentW = canvas.offsetWidth;
    let currentH = canvas.offsetHeight;
    const resizeObserver = new ResizeObserver(entries => {
      for (let entry of entries) {
        currentW = entry.contentRect.width;
        currentH = entry.contentRect.height;
      }
    });
    resizeObserver.observe(canvas);

    let isIntersecting = true;
    const observer = new IntersectionObserver(([entry]) => {
      isIntersecting = entry.isIntersecting;
    }, { threshold: 0.05 });
    observer.observe(canvas);

    const draw = (t) => {
      if (!isIntersecting) {
        id = requestAnimationFrame(draw);
        return;
      }
      const targetW = currentW * dpr;
      const targetH = currentH * dpr;
      if (canvas.width !== targetW || canvas.height !== targetH) {
        canvas.width = targetW;
        canvas.height = targetH;
        ctx.scale(dpr, dpr);
      }
      const w = currentW;
      const h = currentH;
      ctx.clearRect(0, 0, w, h);
      let cx = w * 0.35, cy = h / 2;
      const time = t * 0.001;
      for (const arm of arms) {
        ctx.beginPath();
        ctx.arc(cx, cy, arm.r * 2, 0, Math.PI * 2);
        ctx.strokeStyle = arm.color.replace(/\d+(?=\))/g, '0.15');
        ctx.lineWidth = 1.5;
        ctx.stroke();
        const nx = cx + Math.cos(time * arm.speed) * arm.r * 2;
        const ny = cy + Math.sin(time * arm.speed) * arm.r * 2;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(nx, ny);
        ctx.strokeStyle = arm.color;
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(nx, ny, 3, 0, Math.PI * 2);
        ctx.fillStyle = arm.color;
        ctx.fill();
        cx = nx;
        cy = ny;
      }
      trail.push({ x: cx, y: cy });
      if (trail.length > 500) trail.shift();
      ctx.beginPath();
      for (let i = 0; i < trail.length; i++) {
        const p = trail[i];
        i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y);
      }
      ctx.strokeStyle = 'rgba(168,85,247,0.5)';
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.beginPath();
      ctx.setLineDash([4, 6]);
      ctx.moveTo(cx, cy);
      ctx.lineTo(w * 0.7, cy);
      ctx.strokeStyle = 'rgba(255,255,255,0.15)';
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.setLineDash([]);
      id = requestAnimationFrame(draw);
    };
    id = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(id);
      resizeObserver.disconnect();
      observer.disconnect();
    };
  }, [numArms]);
  return <canvas ref={ref} className={`w-full h-full ${className}`} />;
}

/* ─── square-wave approximation canvas ─── */
function SquareWaveCanvas({ terms = 7, className = '' }) {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let id;

    const dpr = Math.min(2, window.devicePixelRatio || 1);
    let currentW = canvas.offsetWidth;
    let currentH = canvas.offsetHeight;
    const resizeObserver = new ResizeObserver(entries => {
      for (let entry of entries) {
        currentW = entry.contentRect.width;
        currentH = entry.contentRect.height;
      }
    });
    resizeObserver.observe(canvas);

    let isIntersecting = true;
    const observer = new IntersectionObserver(([entry]) => {
      isIntersecting = entry.isIntersecting;
    }, { threshold: 0.05 });
    observer.observe(canvas);

    const draw = (t) => {
      if (!isIntersecting) {
        id = requestAnimationFrame(draw);
        return;
      }
      const targetW = currentW * dpr;
      const targetH = currentH * dpr;
      if (canvas.width !== targetW || canvas.height !== targetH) {
        canvas.width = targetW;
        canvas.height = targetH;
        ctx.scale(dpr, dpr);
      }
      const w = currentW;
      const h = currentH;
      ctx.clearRect(0, 0, w, h);
      ctx.strokeStyle = 'rgba(255,255,255,0.08)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      for (let x = 0; x < w; x++) {
        const phase = ((x / w) * 4 * Math.PI + t * 0.001) % (2 * Math.PI);
        const y = phase < Math.PI ? h * 0.25 : h * 0.75;
        x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.stroke();
      ctx.strokeStyle = '#a855f7';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      for (let x = 0; x < w; x++) {
        let val = 0;
        for (let n = 0; n < terms; n++) {
          const k = 2 * n + 1;
          val += (1 / k) * Math.sin(k * ((x / w) * 4 * Math.PI + t * 0.001));
        }
        const y = h / 2 - val * (h * 0.28);
        x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.stroke();
      id = requestAnimationFrame(draw);
    };
    id = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(id);
      resizeObserver.disconnect();
      observer.disconnect();
    };
  }, [terms]);
  return <canvas ref={ref} className={`w-full h-full ${className}`} />;
}

/* ─── Section divider ─── */
function Divider() {
  return <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />;
}

/* ─── Section heading ─── */
function SectionHead({ icon: Icon, color, title, subtitle }) {
  const colors = {
    blue: 'bg-blue/10 border-blue/20 text-blue shadow-[0_0_20px_rgba(59,130,246,0.1)]',
    purple: 'bg-purple/10 border-purple/20 text-purple shadow-[0_0_20px_rgba(168,85,247,0.1)]',
    green: 'bg-green/10 border-green/20 text-green shadow-[0_0_20px_rgba(34,197,94,0.1)]',
    amber: 'bg-yellow/10 border-yellow/20 text-yellow shadow-[0_0_20px_rgba(234,179,8,0.1)]',
    pink: 'bg-pink/10 border-pink/20 text-pink shadow-[0_0_20px_rgba(236,72,153,0.1)]',
    red: 'bg-red/10 border-red/20 text-red shadow-[0_0_20px_rgba(239,68,68,0.1)]',
  };
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-3 sm:gap-4">
        <div className={`shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl flex items-center justify-center border ${colors[color]}`}>
          <Icon size={20} className="sm:w-6 sm:h-6" />
        </div>
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight leading-snug">{title}</h2>
      </div>
      {subtitle && <p className="text-white/60 ml-14 sm:ml-16 text-xs sm:text-sm font-mono uppercase tracking-widest">{subtitle}</p>}
    </div>
  );
}

/* ─── Info card ─── */
function InfoCard({ icon: Icon, title, children, accent = 'blue' }) {
  const accents = {
    blue: 'border-blue/20 hover:bg-blue/80 hover:border-blue/80',
    purple: 'border-purple/20 hover:bg-purple/80 hover:border-purple/80',
    green: 'border-green/20 hover:bg-green/80 hover:border-green/80',
    amber: 'border-yellow/20 hover:bg-yellow/80 hover:border-yellow/80',
    pink: 'border-pink/20 hover:bg-pink/80 hover:border-pink/80',
  };
  return (
    <div className={`group p-5 md:p-6 rounded-2xl bg-white/[0.02] border ${accents[accent]} transition-all duration-500 ease-in-out flex flex-col gap-3 cursor-default`}>
      <div className="flex items-center gap-3">
        <Icon size={20} className="text-white/60 group-hover:text-white transition-all duration-500 ease-in-out" />
        <h4 className="font-semibold text-white group-hover:text-white transition-all duration-500 ease-in-out">{title}</h4>
      </div>
      <p className="text-white/60 leading-relaxed text-[15px] group-hover:text-white/80 transition-all duration-500 ease-in-out">{children}</p>
    </div>
  );
}

/* ═══════════════ MAIN PAGE ═══════════════ */
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
          <section className="flex flex-col gap-8">
            <SectionHead icon={Sigma} color="blue" title="What is the Fourier Series?" subtitle="The Big Idea" />

            <div className="flex flex-col gap-5 text-white/60 text-lg leading-relaxed">
              <p>
                In 1807, the French mathematician <strong className="text-white">Jean-Baptiste Joseph Fourier</strong> made
                a bold claim: <em>any periodic function — no matter how complex or jagged — can be written as a sum of
                  simple sine and cosine waves.</em> At the time, many mathematicians doubted him. But he was right, and
                this idea became one of the most powerful tools in all of mathematics and engineering.
              </p>
              <p>
                Imagine you hear a musical chord. Your ear is hearing one single combined sound wave. But your brain
                somehow picks out the individual notes — the bass note, the mid-range, the high note. The Fourier Series
                is the mathematical version of that trick. It takes a complicated repeating signal and tells you exactly
                which simple sine waves, at which frequencies and amplitudes, you need to recreate it perfectly.
              </p>
            </div>

            {/* Live sine wave visual */}
            <div className="w-full h-32 sm:h-40 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 overflow-hidden relative">
              <SineWaveCanvas color="#3b82f6" frequency={2} amplitude={0.6} />
              <div className="absolute inset-0 flex items-end justify-center pb-2 sm:pb-3 px-2 text-center">
                <span className="font-mono text-[10px] sm:text-xs text-white/60/60 uppercase tracking-widest leading-tight">A single pure sine wave — the building block</span>
              </div>
            </div>

            <div className="flex flex-col gap-5 text-white/60 text-lg leading-relaxed">
              <p>
                Put simply, every repeating pattern is secretly a recipe. The Fourier Series gives you the recipe —
                telling you how much of each frequency ingredient you need. Low frequencies give you the broad shape,
                high frequencies add the fine details and sharp edges.
              </p>
            </div>

          </section>
        </ScrollReveal>

        <Divider />

        {/* ═══ SECTION 2 — SERIES vs TRANSFORM ═══ */}
        <ScrollReveal>
          <section className="flex flex-col gap-8">
            <SectionHead icon={Zap} color="purple" title="Series vs. Transform" subtitle="What's the difference?" />

            <div className="flex flex-col gap-5 text-white/60 text-lg leading-relaxed">
              <p>
                People often confuse the <strong className="text-white">Fourier Series</strong> and the <strong className="text-white">Fourier Transform</strong>.
                They are cousins — deeply related, but not the same thing:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl bg-blue/[0.04] border border-blue/10 flex flex-col gap-3">
                <h3 className="font-bold text-white text-lg flex items-center gap-2">
                  <Sigma size={18} className="text-blue" /> Fourier Series
                </h3>
                <p className="text-white/60 leading-relaxed text-[15px]">
                  Works on <strong>periodic</strong> (repeating) signals. It decomposes them into a
                  <strong> discrete set of frequencies</strong> — the fundamental frequency and its harmonics
                  (integer multiples). The output is a list of amplitudes and phases.
                </p>
                <p className="text-white/60/60 text-sm font-mono mt-2">
                  f(t) = a₀ + Σ [ aₙcos(nωt) + bₙsin(nωt) ]
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-purple/[0.04] border border-purple/10 flex flex-col gap-3">
                <h3 className="font-bold text-white text-lg flex items-center gap-2">
                  <Zap size={18} className="text-purple" /> Fourier Transform
                </h3>
                <p className="text-white/60 leading-relaxed text-[15px]">
                  Works on <strong>any signal</strong>, whether repeating or not. Instead of a list
                  of discrete frequencies, it gives you a <strong>continuous spectrum</strong> — a smooth
                  curve showing how much energy exists at every possible frequency.
                </p>
                <p className="text-white/60/60 text-sm font-mono mt-2">
                  F(ω) = ∫ f(t) · e^(-iωt) dt
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-5 text-white/60 text-lg leading-relaxed">
              <p>
                Think of the Fourier Series as the special case of the Fourier Transform when your signal repeats forever.
                In practice, computers use the <strong className="text-white">Discrete Fourier Transform (DFT)</strong> —
                a version that works on sampled digital data — and a blazingly fast algorithm called the
                <strong className="text-white"> FFT (Fast Fourier Transform)</strong> to compute it efficiently.
              </p>
            </div>

          </section>
        </ScrollReveal>

        <Divider />

        {/* ═══ SECTION 3 — SEEING IT VISUALLY ═══ */}
        <ScrollReveal>
          <section className="flex flex-col gap-8">
            <SectionHead icon={Waves} color="green" title="Seeing It Visually" subtitle="Adding waves together" />

            <div className="flex flex-col gap-5 text-white/60 text-lg leading-relaxed">
              <p>
                The best way to understand the Fourier Series is to watch it build a shape from scratch.
                Let's take the classic <strong className="text-white">square wave</strong> — a signal that jumps abruptly between
                two values. It looks nothing like a smooth sine wave. Yet the Fourier Series says we can build it
                using only sine waves!
              </p>
              <p>
                The recipe is elegant: add up sine waves at odd frequencies (1×, 3×, 5×, 7× ...) with amplitudes
                that shrink as 1/n. The first sine wave gives the rough shape. Each additional wave sharpens the edges
                a little more. With enough waves, you get a perfect square wave.
              </p>
            </div>

            {/* Square wave approximation visual */}
            <div className="w-full h-40 sm:h-56 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 overflow-hidden relative">
              <SquareWaveCanvas terms={7} />
              <div className="absolute inset-0 flex items-end justify-center pb-2 sm:pb-3 px-2 text-center">
                <span className="font-mono text-[10px] sm:text-xs text-white/60/60 uppercase tracking-widest leading-tight">
                  7 sine waves approximating a square wave (ghost = ideal)
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-5 text-white/60 text-lg leading-relaxed">
              <p>
                Notice the little wiggles near the sharp edges? That's called the <strong className="text-white">Gibbs phenomenon</strong> —
                the Fourier Series always overshoots a little at discontinuities, no matter how many terms you add.
                It's a quirky but beautiful property of the math.
              </p>
              <p>
                This same principle applies to <em>any</em> repeating shape. A sawtooth wave, a triangle wave, even a complicated heartbeat signal —
                they can all be decomposed into their sine wave ingredients. The Fourier Series is the universal language of periodic signals.
              </p>
            </div>

          </section>
        </ScrollReveal>

        <Divider />

        {/* ═══ SECTION 4 — EPICYCLES ═══ */}
        <ScrollReveal>
          <section className="flex flex-col gap-8">
            <SectionHead icon={CircleDashed} color="purple" title="Epicycles: Drawing with Circles" subtitle="From ancient astronomy to modern math" />

            <div className="flex flex-col gap-5 text-white/60 text-lg leading-relaxed">
              <p>
                The ancient Greeks used a system of <strong className="text-white">epicycles</strong> — circles riding on circles —
                to predict the motion of planets across the sky. Remarkably, this same idea is the geometric heart of the
                Fourier Series!
              </p>
              <p>
                Each term in a Fourier Series can be visualized as a <strong className="text-white">rotating vector</strong> (a phasor).
                Its length is the amplitude, and its rotation speed is the frequency. If you chain these rotating vectors
                end-to-end, the tip of the last vector traces out a complex path in 2D space.
              </p>
            </div>

            {/* Live epicycle visual */}
            <div className="w-full h-48 sm:h-72 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 overflow-hidden relative">
              <EpicycleCanvas />
              <div className="absolute inset-0 flex items-end justify-center pb-2 sm:pb-3 px-2 text-center">
                <span className="font-mono text-[10px] sm:text-xs text-white/60/60 uppercase tracking-widest leading-tight">
                  4 rotating circles tracing a path — live epicycles
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-5 text-white/60 text-lg leading-relaxed">
              <p>
                With just a few circles, you get a rough approximation. Add more circles, and the drawing becomes
                astonishingly precise. People have used this technique to draw portraits, spell out text, and recreate
                complex mathematical curves — all using nothing but spinning circles.
              </p>
              <p>
                This is exactly what our <strong className="text-white">Fourier Visualizer app</strong> does.
                You can add, remove, and configure individual arms (circles) and watch in real-time as the combined
                motion traces out different waveforms. Each arm represents one term in the Fourier Series.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <InfoCard icon={CircleDashed} title="Frequency" accent="purple">
                How fast the circle spins. Higher frequency = more rotations per second. This determines the harmonic number.
              </InfoCard>
              <InfoCard icon={Sparkles} title="Amplitude" accent="blue">
                The radius of the circle. Larger amplitude = bigger contribution to the final shape.
              </InfoCard>
              <InfoCard icon={Activity} title="Phase" accent="green">
                The starting angle of the rotation. Phase shifts the contribution in time, aligning the waves correctly.
              </InfoCard>
            </div>

          </section>
        </ScrollReveal>

        <Divider />

        {/* ═══ SECTION 5 — REAL WORLD USES ═══ */}
        <ScrollReveal>
          <section className="flex flex-col gap-8">
            <SectionHead icon={Zap} color="amber" title="Where Is This Used?" subtitle="Everywhere, it turns out" />

            <div className="flex flex-col gap-5 text-white/60 text-lg leading-relaxed">
              <p>
                Fourier's idea isn't just beautiful mathematics — it is one of the most <strong className="text-white">practically
                  useful tools</strong> ever discovered. Here's a small sample of where it shows up:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <InfoCard icon={Music} title="Audio & Music" accent="blue">
                Every audio equalizer, noise-cancellation algorithm, and auto-tune system uses the FFT to decompose
                sound into frequencies. Spotify, your phone calls, hearing aids — all powered by Fourier.
              </InfoCard>
              <InfoCard icon={ImageIcon} title="Image Compression (JPEG)" accent="green">
                JPEG images break photos into 8×8 pixel blocks and run a variant of the Fourier Transform (the DCT)
                to discard imperceptible high-frequency details. This is why a 10MB photo becomes a 200KB JPEG.
              </InfoCard>
              <InfoCard icon={Volume2} title="MP3 & Streaming" accent="purple">
                MP3 compression analyzes audio frequencies to remove sounds your ear can't perceive.
                Streaming services like YouTube and Netflix use frequency-domain compression for both audio and video.
              </InfoCard>
              <InfoCard icon={Brain} title="MRI Scanners" accent="pink">
                Magnetic Resonance Imaging machines collect raw data in the frequency domain (called k-space).
                The image you see of your brain is literally reconstructed using an inverse Fourier Transform.
              </InfoCard>
              <InfoCard icon={Wifi} title="WiFi & 5G" accent="amber">
                Modern wireless communication uses OFDM (Orthogonal Frequency Division Multiplexing),
                which encodes data across many frequencies simultaneously — all orchestrated via the FFT.
              </InfoCard>
              <InfoCard icon={Smartphone} title="Signal Processing" accent="blue">
                From earthquake seismology to stock market analysis, speech recognition to radar systems —
                any field that deals with signals uses Fourier analysis as a fundamental tool.
              </InfoCard>
            </div>

          </section>
        </ScrollReveal>

        <Divider />

        {/* ═══ SECTION 6 — THE MATH ═══ */}
        <ScrollReveal>
          <section className="flex flex-col gap-8">
            <SectionHead icon={Sigma} color="pink" title="A Peek at the Math" subtitle="Don't worry, it's friendlier than it looks" />

            <div className="flex flex-col gap-5 text-white/60 text-lg leading-relaxed">
              <p>
                The continuous Fourier Series for a periodic function with period T is:
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 text-center">
              <p className="font-mono text-xl md:text-2xl text-white tracking-wide">
                f(t) = a₀ + <span className="text-blue">Σ</span> [ aₙ·cos(nωt) + bₙ·sin(nωt) ]
              </p>
              <p className="font-mono text-sm text-white/60 mt-4">where ω = 2π/T is the fundamental angular frequency</p>
            </div>

            <div className="flex flex-col gap-5 text-white/60 text-lg leading-relaxed">
              <p>
                <strong className="text-white">a₀</strong> is the average (DC offset) of the signal.
                The coefficients <strong className="text-white">aₙ</strong> and <strong className="text-white">bₙ</strong> tell
                you how much of each cosine and sine harmonic is present. They are computed using integrals
                over one period of the function.
              </p>
              <p>
                For the Fourier Transform (non-periodic signals), the sum becomes an integral, and instead of discrete
                harmonics you get a continuous frequency spectrum:
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 text-center">
              <p className="font-mono text-xl md:text-2xl text-white tracking-wide">
                F(ω) = <span className="text-purple">∫</span> f(t) · e<sup>−iωt</sup> dt
              </p>
              <p className="font-mono text-sm text-white/60 mt-4">The beautiful Euler form — e^(iθ) = cos(θ) + i·sin(θ)</p>
            </div>

            <div className="flex flex-col gap-5 text-white/60 text-lg leading-relaxed">
              <p>
                The <strong className="text-white">e<sup>−iωt</sup></strong> factor is what connects the math to the epicycles we saw earlier.
                Euler's formula tells us that <em>e<sup>iθ</sup> = cos(θ) + i·sin(θ)</em>, which is just a point on a unit circle!
                So multiplying by <em>e<sup>−iωt</sup></em> is the same as spinning a vector — and that's exactly what an epicycle does.
              </p>
            </div>

          </section>
        </ScrollReveal>

        <Divider />

        {/* ═══ SECTION 7 — HOW OUR VISUALIZER WORKS ═══ */}
        <ScrollReveal>
          <section className="flex flex-col gap-8">
            <SectionHead icon={Radio} color="green" title="How Our Visualizer Works" subtitle="From math to pixels" />

            <div className="flex flex-col gap-5 text-white/60 text-lg leading-relaxed">
              <p>
                The interactive visualizer app I built takes these mathematical ideas and makes them tangible.
                Here's what it does:
              </p>
            </div>

            <div className="flex flex-col gap-4">
              {[
                { step: '01', title: 'Define Arms', desc: 'Each arm in the sidebar represents one term in the Fourier Series — with its own frequency, amplitude, and phase.' },
                { step: '02', title: 'Animate Epicycles', desc: 'The canvas renders each arm as a rotating vector. They are chained tip-to-tail, forming a cascade of spinning circles.' },
                { step: '03', title: 'Trace the Wave', desc: 'The tip of the final arm is projected onto the time axis, producing a flowing wave in the bottom panel graph.' },
                { step: '04', title: 'Switch Wave Types', desc: 'Toggle between preset wave types (square, sawtooth, triangle) or customize individual harmonics to create any waveform.' },
              ].map(({ step, title, desc }) => (
                <div key={step} className="flex gap-5 items-start p-5 rounded-xl bg-white/[0.02] border border-white/10 hover:border-green/20 transition-colors">
                  <span className="font-mono text-3xl font-black text-green/30">{step}</span>
                  <div className="flex flex-col gap-1">
                    <h4 className="font-semibold text-white">{title}</h4>
                    <p className="text-white/60 text-[15px] leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>

          </section>
        </ScrollReveal>

        <Divider />

        {/* ═══ FOOTER CTA ═══ */}
        <ScrollReveal>
          <section className="flex flex-col items-center text-center gap-8 py-12">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white">Ready to try it yourself?</h2>
            <p className="text-xl text-white/60 max-w-xl leading-relaxed">
              I built a fully interactive math engine right in the browser. Add epicycles, tweak frequencies,
              switch wave types, and watch the Fourier Series come alive in real-time.
            </p>
            <button
              onClick={() => navigate('/fourier/app')}
              className="mt-4 w-full sm:w-auto flex items-center justify-center gap-3 px-6 md:px-10 py-4 md:py-5 bg-gradient-to-r from-blue via-purple to-blue bg-[length:200%_auto] animate-gradientShift text-white font-bold rounded-xl hover:scale-[1.03] active:scale-[0.97] transition-all shadow-[0_0_40px_rgba(168,85,247,0.4)] group"
            >
              <Play size={24} className="fill-white group-hover:scale-110 transition-transform" />
              <span className="text-lg tracking-wide">Enter the Visualizer</span>
            </button>

          </section>
        </ScrollReveal>
      </div>
    </div>
  );
}
