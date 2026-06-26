// src/features/fourier/components/BottomPanel/OrthoSidebar.js
import React from 'react';
import { OrthoCanvas } from './OrthoCanvas';

/**
 * Sliding sidebar on the right edge of the bottom panel.
 * Contains the Orthographic Projection (2D parametric shape).
 */
export function OrthoSidebar({ isOpen }) {
  return (
    <div
      id="bp-sidebar-ortho"
      className={`h-full border-white/5 bg-panel-solid/40 flex-shrink-0 transition-all duration-300 overflow-hidden absolute md:relative left-8 sm:left-10 md:left-auto md:right-0 z-20 ${
        isOpen ? 'w-[calc(100%-4rem)] sm:w-[calc(100%-5rem)] md:w-[400px] border-r md:border-r-0 md:border-l' : 'w-0 border-r-0 md:border-l-0'
      }`}
    >
      <div className="w-[calc(100vw-4rem)] sm:w-[calc(100vw-5rem)] md:w-[400px] h-full relative">
        <div className="absolute top-4 left-4 z-10 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-ink">
          Orthographic Projection
        </div>
        <OrthoCanvas />
      </div>
    </div>
  );
}
