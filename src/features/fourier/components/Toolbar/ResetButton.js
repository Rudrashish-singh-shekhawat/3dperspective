// src/features/fourier/components/Toolbar/ResetButton.js
import React from 'react';
import { useAnimationStore } from '../../state/AnimationStore';
import { useFourierStore } from '../../state/FourierStore';

/**
 * Reset button in the taskbar.
 * Sets time to 0 and clears the path.
 */
export function ResetButton() {
  const resetTime = useAnimationStore((s) => s.resetTime);
  const resetPath = useFourierStore((s) => s.resetPath);

  const handleReset = () => {
    resetTime();
    resetPath();
  };

  return (
    <button
      className="btn flex h-6 px-3 items-center justify-center gap-1.5 overflow-hidden rounded-md border border-white/10 bg-white/[0.02] font-mono text-[9px] uppercase tracking-[0.06em] text-ink-dim transition-all duration-200 hover:-translate-y-px hover:border-white/20 hover:bg-white/[0.04] hover:text-ink hover:shadow-[0_2px_8px_rgba(0,0,0,0.3)] active:translate-y-0 active:border-blue/50 active:bg-blue/10 active:text-blue active:shadow-[0_0_12px_rgba(77,159,255,0.15),inset_0_0_12px_rgba(77,159,255,0.06)] active:animate-borderPulse"
      id="btn-reset"
      title="Reset"
      onClick={handleReset}
    >
      <svg width="10" height="10" viewBox="0 0 11 11" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <path d="M10 5.5A4.5 4.5 0 1 1 5.5 1" />
        <polyline points="5.5,1 8.5,1 8.5,4" />
      </svg>
    </button>
  );
}