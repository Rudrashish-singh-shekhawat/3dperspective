import React from 'react';
import { Radio, Play } from 'lucide-react';
import { SectionHead } from '../../../components/ArticleElements';

export function HowItWorks() {
  return (
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
  );
}

export function FooterCTA({ onNavigate }) {
  return (
    <section className="flex flex-col items-center text-center gap-8 py-12">
      <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white">Ready to try it yourself?</h2>
      <p className="text-xl text-white/60 max-w-xl leading-relaxed">
        I built a fully interactive math engine right in the browser. Add epicycles, tweak frequencies,
        switch wave types, and watch the Fourier Series come alive in real-time.
      </p>
      <button
        onClick={onNavigate}
        className="mt-4 w-full sm:w-auto flex items-center justify-center gap-3 px-6 md:px-10 py-4 md:py-5 bg-gradient-to-r from-blue via-purple to-blue bg-[length:200%_auto] animate-gradientShift text-white font-bold rounded-xl hover:scale-[1.03] active:scale-[0.97] transition-all shadow-[0_0_40px_rgba(168,85,247,0.4)] group"
      >
        <Play size={24} className="fill-white group-hover:scale-110 transition-transform" />
        <span className="text-lg tracking-wide">Enter the Visualizer</span>
      </button>
    </section>
  );
}
