import React from 'react';
import {
  CircleDashed, Sparkles, Activity, Zap, Music, Image as ImageIcon,
  Volume2, Brain, Wifi, Smartphone, Sigma
} from 'lucide-react';
import { SectionHead, InfoCard } from '../../../components/ArticleElements';
import EpicycleCanvas from '../../../components/EpicycleCanvas';

export function EpicyclesSection() {
  return (
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
  );
}

export function RealWorldUses() {
  return (
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
  );
}

export function MathPeek() {
  return (
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
          <strong className="text-white">e<sup>−iωt</sup></strong> factor is what connects the math to the epicycles we saw earlier.
          Euler's formula tells us that <em>e<sup>iθ</sup> = cos(θ) + i·sin(θ)</em>, which is just a point on a unit circle!
          So multiplying by <em>e<sup>−iωt</sup></em> is the same as spinning a vector — and that's exactly what an epicycle does.
        </p>
      </div>
    </section>
  );
}
