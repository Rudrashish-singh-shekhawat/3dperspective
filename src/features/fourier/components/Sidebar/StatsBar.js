// src/features/fourier/components/Sidebar/StatsBar.js
import React from 'react';
import { useFourierStore } from '../../state/FourierStore';

/**
 * Stats bar at the bottom of the sidebar.
 * Displays number of arms, maximum amplitude, and path point count.
 * Replicates the original <div id="stats-bar">...</div>.
 */
export function StatsBar() {
  const circles = useFourierStore((s) => s.circles);
  const path = useFourierStore((s) => s.path);

  const armCount = circles.length;
  const maxAmp = circles.reduce((max, c) => Math.max(max, c.radius), 0);
  const pointsCount = path.length;

  return (
    <div id="stats-bar" className="flex flex-shrink-0 border-t border-white/5 bg-white/[0.012]">
      <div className="stat flex-1 border-r border-white/5 px-3 py-2.5 text-center transition-colors hover:bg-white/[0.02]">
        <span className="stat-val block font-mono text-[14px] font-semibold text-ink [text-shadow:0_0_16px_rgba(77,159,255,0.2)]">
          {armCount}
        </span>
        <span className="stat-key mt-0.5 block font-mono text-[8px] uppercase tracking-[0.14em] text-ink-mute">
          Arms
        </span>
      </div>
      <div className="stat flex-1 border-r border-white/5 px-3 py-2.5 text-center transition-colors hover:bg-white/[0.02]">
        <span className="stat-val block font-mono text-[14px] font-semibold text-ink [text-shadow:0_0_16px_rgba(77,159,255,0.2)]">
          {maxAmp.toFixed(0)}
        </span>
        <span className="stat-key mt-0.5 block font-mono text-[8px] uppercase tracking-[0.14em] text-ink-mute">
          Max amp
        </span>
      </div>
      <div className="stat flex-1 px-3 py-2.5 text-center transition-colors hover:bg-white/[0.02]">
        <span className="stat-val block font-mono text-[14px] font-semibold text-ink [text-shadow:0_0_16px_rgba(77,159,255,0.2)]">
          {pointsCount}
        </span>
        <span className="stat-key mt-0.5 block font-mono text-[8px] uppercase tracking-[0.14em] text-ink-mute">
          Pts
        </span>
      </div>
    </div>
  );
}