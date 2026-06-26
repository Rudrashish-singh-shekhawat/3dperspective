// src/features/fourier/components/Toolbar/ChartButton.js
import React from 'react';
import { useGraphStore } from '../../state/GraphStore';

/**
 * Chart (toggle panel) button in the taskbar.
 * Toggles the entire bottom panel open/closed.
 */
export function ChartButton() {
  const isPanelOpen = useGraphStore((s) => s.isPanelOpen);
  const togglePanel = useGraphStore((s) => s.togglePanel);

  return (
    <button
      className={`icon-btn flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-md border border-transparent text-ink-mute transition-all duration-200 hover:-translate-y-px hover:border-white/10 hover:bg-white/[0.05] hover:text-ink active:border-blue/20 active:bg-blue/10 active:text-blue active:shadow-[0_0_10px_rgba(77,159,255,0.1)] ${
        isPanelOpen ? 'bg-white/[0.15] text-white' : ''
      }`}
      id="btn-chart"
      title="Toggle path"
      onClick={togglePanel}
    >
      <svg width="11" height="11" viewBox="0 0 15 15" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="1,12 4,8 7,10 10,5 14,3" />
        <rect x="1" y="1" width="13" height="13" rx="1" strokeOpacity="0.3" />
      </svg>
    </button>
  );
}