// src/features/fourier/components/Toolbar/ParametersButton.js
import React from 'react';
import { useGraphStore } from '../../state/GraphStore';

/**
 * Parameters button in the taskbar.
 * Toggles the right inner sidebar (Analysis panel) of the bottom panel.
 */
export function ParametersButton() {
  const isRightBpOpen = useGraphStore((s) => s.isRightBpOpen);
  const toggleRightSidebar = useGraphStore((s) => s.toggleRightSidebar);

  return (
    <button
      className={`icon-btn flex h-10 w-10 md:h-6 md:w-6 flex-shrink-0 items-center justify-center rounded-md border border-transparent text-ink-mute transition-all duration-200 hover:-translate-y-px hover:border-white/10 hover:bg-white/[0.05] hover:text-ink active:border-blue/20 active:bg-blue/10 active:text-blue active:shadow-[0_0_10px_rgba(77,159,255,0.1)]`}
      id="btn-params"
      title="Parameters"
      onClick={() => {}}
    >
      <svg width="11" height="11" viewBox="0 0 15 15" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round">
        <line x1="2" y1="4" x2="13" y2="4" />
        <line x1="2" y1="7.5" x2="13" y2="7.5" />
        <line x1="2" y1="11" x2="13" y2="11" />
        <circle cx="5" cy="4" r="1.5" fill="currentColor" strokeWidth="1.3" />
        <circle cx="9" cy="7.5" r="1.5" fill="currentColor" strokeWidth="1.3" />
        <circle cx="6" cy="11" r="1.5" fill="currentColor" strokeWidth="1.3" />
      </svg>
    </button>
  );
}