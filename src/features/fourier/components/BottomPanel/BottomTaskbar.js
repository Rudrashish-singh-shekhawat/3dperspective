// src/features/fourier/components/BottomPanel/BottomTaskbar.js
import React from 'react';
import { useGraphStore } from '../../state/GraphStore';

/**
 * A vertical taskbar on the left edge of the bottom panel.
 * Contains toggle buttons for the inner sidebars.
 */
export function BottomTaskbar() {
  const isLeftBpOpen = useGraphStore((s) => s.isLeftBpOpen);
  const toggleLeftSidebar = useGraphStore((s) => s.toggleLeftSidebar);
  
  const isRightBpOpen = useGraphStore((s) => s.isRightBpOpen);
  const toggleRightSidebar = useGraphStore((s) => s.toggleRightSidebar);
  
  const isOrthoOpen = useGraphStore((s) => s.isOrthoOpen);
  const toggleOrtho = useGraphStore((s) => s.toggleOrtho);

  return (
    <div className="w-8 sm:w-10 h-full flex-shrink-0 flex flex-col items-center py-3 border-r border-white/5 bg-panel-solid/60 z-10 gap-3">
      {/* Settings Toggle */}
      <button
        className={`icon-btn flex h-7 w-7 items-center justify-center rounded-md border border-transparent text-ink-mute transition-all duration-200 hover:-translate-y-px hover:border-white/10 hover:bg-white/[0.05] hover:text-ink active:border-blue/20 active:bg-blue/10 active:text-blue active:shadow-[0_0_10px_rgba(77,159,255,0.1)] ${
          isLeftBpOpen ? 'bg-white/[0.15] text-white shadow-[0_0_8px_rgba(255,255,255,0.1)]' : ''
        }`}
        title="Toggle Graph Settings"
        onClick={toggleLeftSidebar}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-90">
          <path d="M18 4H7a2 2 0 0 0-2 2v14" />
          <path d="M5 12h9" />
          <path d="M13 18l5-5-5-5" />
        </svg>
      </button>

      {/* Analytics/Parameters Toggle */}
      <button
        className={`icon-btn flex h-7 w-7 items-center justify-center rounded-md border border-transparent text-ink-mute transition-all duration-200 hover:-translate-y-px hover:border-white/10 hover:bg-white/[0.05] hover:text-ink active:border-blue/20 active:bg-blue/10 active:text-blue active:shadow-[0_0_10px_rgba(77,159,255,0.1)] ${
          isRightBpOpen ? 'bg-white/[0.15] text-white shadow-[0_0_8px_rgba(255,255,255,0.1)]' : ''
        }`}
        title="Toggle Analysis Panel"
        onClick={toggleRightSidebar}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-90">
          <path d="M3 3v18h18" />
          <path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3" />
        </svg>
      </button>

      {/* Ortho Projection Toggle */}
      <button
        className={`icon-btn flex h-7 w-7 items-center justify-center rounded-md border border-transparent text-ink-mute transition-all duration-200 hover:-translate-y-px hover:border-white/10 hover:bg-white/[0.05] hover:text-ink active:border-blue/20 active:bg-blue/10 active:text-blue active:shadow-[0_0_10px_rgba(77,159,255,0.1)] ${
          isOrthoOpen ? 'bg-white/[0.15] text-white shadow-[0_0_8px_rgba(255,255,255,0.1)]' : ''
        }`}
        title="Toggle Ortho Projection"
        onClick={toggleOrtho}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-90">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
          <path d="M2 12h20" />
        </svg>
      </button>
    </div>
  );
}
