import React from 'react';
import { Sigma, Zap, Waves } from 'lucide-react';
import { SectionHead } from '../../../components/ArticleElements';
import SineWaveCanvas from '../../../components/SineWaveCanvas';
import SquareWaveCanvas from '../../../components/SquareWaveCanvas';

export function WhatIsFourier() {
  return (
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
  );
}

export function SeriesVsTransform() {
  return (
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
  );
}

export function SeeingItVisually() {
  return (
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
  );
}
