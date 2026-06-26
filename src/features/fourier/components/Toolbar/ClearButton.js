// src/features/fourier/components/Toolbar/ClearButton.js
import React from 'react';
import { useFourierStore } from '../../state/FourierStore';

/**
 * Clear button in the taskbar.
 * Removes all circles and clears the path.
 */
export function ClearButton() {
  const clearAll = useFourierStore((s) => s.clearAll);

  return (
    <button
      className="btn btn-danger flex h-6 px-3 items-center justify-center gap-1.5 overflow-hidden rounded-md border border-white/10 bg-white/[0.02] font-mono text-[9px] uppercase tracking-[0.06em] text-ink-dim transition-all duration-200 hover:-translate-y-px hover:border-white/20 hover:bg-white/[0.04] hover:text-ink hover:shadow-[0_2px_8px_rgba(0,0,0,0.3)] active:translate-y-0 active:border-blue/50 active:bg-blue/10 active:text-blue active:shadow-[0_0_12px_rgba(77,159,255,0.15),inset_0_0_12px_rgba(77,159,255,0.06)] active:animate-borderPulse hover:border-red/50 hover:bg-red/10 hover:text-red hover:shadow-[0_0_14px_rgba(244,124,90,0.12)]"
      id="btn-clear"
      title="Clear arms"
      onClick={clearAll}
    >
      <svg width="9" height="10" viewBox="0 0 10 11" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
        <polyline points="1,3 9,3" />
        <path d="M2 3V9a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1V3" />
        <path d="M3.5 3V2a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v1" />
      </svg>
    </button>
  );
}