// src/features/fourier/components/Sidebar/Sidebar.js
import React from 'react';
import { Header } from './Header';
import { SpeedControl } from './SpeedControl';
import { SortButton } from './SortButton';
import { WaveButton } from './WaveButton';
import { ArmList } from './ArmList';
import { StatsBar } from './StatsBar';
import { useFourierStore } from '../../state/FourierStore';

/**
 * Main sidebar container.
 * Replicates the original <div id="sidebar">...</div> structure.
 */
export function Sidebar() {
  return (
    <div
      id="sidebar"
      className="relative z-10 flex h-full w-[85vw] max-w-[320px] md:w-[280px] flex-shrink-0 flex-col overflow-hidden border-r border-white/10 bg-panel backdrop-blur-2xl select-none
                 before:absolute before:left-0 before:right-0 before:top-0 before:z-[1] before:h-[2px] before:bg-gradient-to-r before:from-blue before:via-green before:to-purple before:bg-[length:300%_100%] before:content-[''] before:animate-gradientShift 
                 after:absolute after:right-0 after:top-0 after:h-full after:w-px after:bg-gradient-to-b after:from-[rgba(77,159,255,0.15)] after:via-[rgba(62,207,142,0.08)] after:to-[rgba(167,139,250,0.15)] after:content-['']"
    >
      <Header />
      <SpeedControl />
      <div className="flex flex-shrink-0 gap-1.5 border-b border-white/5 px-4 py-3 z-50">
        <SortButton />
        <button
          className="btn flex h-8 flex-1 items-center justify-center gap-1.5 rounded-md border border-white/10 bg-white/[0.02] font-mono text-[9px] uppercase tracking-[0.06em] text-ink-dim transition-all duration-200 hover:-translate-y-px hover:border-white/20 hover:bg-white/[0.04] hover:text-ink hover:shadow-[0_2px_8px_rgba(0,0,0,0.3)]"
          title="Add new arm"
          onClick={() => {
            const state = useFourierStore.getState();
            const circles = state.circles;
            const nextFreq = circles.length > 0 ? Math.max(...circles.map(c => Math.abs(c.freq))) + 2 : 1;
            const nextRad = 100 * (4 / (nextFreq * Math.PI));
            state.addCircle({ radius: nextRad, freq: nextFreq, phase: 0 });
            state.resetPath();
          }}
        >
          ADD
        </button>
        <WaveButton />
      </div>
      <ArmList />
      <StatsBar />
    </div>
  );
}