// src/features/fourier/components/Toolbar/PauseButton.js
import React from 'react';
import { useAnimationStore } from '../../state/AnimationStore';

/**
 * Pause button in the taskbar.
 * Sets isPlaying to false.
 */
export function PauseButton() {
  const pause = useAnimationStore((s) => s.pause);

  return (
    <button
      className="btn flex h-10 px-4 md:h-6 md:px-3 items-center justify-center gap-1.5 overflow-hidden rounded-md border border-white/10 bg-white/[0.02] font-mono text-[9px] uppercase tracking-[0.06em] text-ink-dim transition-all duration-200 hover:-translate-y-px hover:border-white/20 hover:bg-white/[0.04] hover:text-ink hover:shadow-[0_2px_8px_rgba(0,0,0,0.3)] active:translate-y-0 active:border-blue/50 active:bg-blue/10 active:text-blue active:shadow-[0_0_12px_rgba(77,159,255,0.15),inset_0_0_12px_rgba(77,159,255,0.06)] active:animate-borderPulse"
      id="btn-pause"
      title="Pause"
      onClick={pause}
    >
      <svg width="8" height="9" viewBox="0 0 9 10" fill="currentColor">
        <rect x="0" y="0" width="3" height="10" />
        <rect x="6" y="0" width="3" height="10" />
      </svg>
    </button>
  );
}