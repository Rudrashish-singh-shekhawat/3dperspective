// src/features/fourier/components/BottomPanel/RightTaskbar.js
import React from 'react';

/**
 * A vertical taskbar on the right edge of the bottom panel.
 * Used for labeling the main 2D wave canvas.
 */
export function RightTaskbar() {
  return (
    <div className="w-8 sm:w-10 h-full flex-shrink-0 flex flex-col items-center justify-center py-6 border-l border-white/5 bg-panel-solid/60 z-10 gap-8">
      
      {/* Real (X) Label */}
      <div className="flex flex-col items-center gap-1.5">
        <span className="font-mono text-[10px] font-bold text-blue tracking-wider">REAL</span>
        <div className="w-5 h-0.5 bg-blue shadow-[0_0_8px_rgba(77,159,255,0.6)] rounded-full"></div>
      </div>

      {/* Imaginary (Y) Label */}
      <div className="flex flex-col items-center gap-1.5">
        <span className="font-mono text-[10px] font-bold text-purple tracking-wider">IMAG</span>
        <div className="w-5 h-0.5 bg-purple shadow-[0_0_8px_rgba(167,139,250,0.6)] rounded-full"></div>
      </div>

    </div>
  );
}
