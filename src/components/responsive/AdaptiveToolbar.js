// src/components/responsive/AdaptiveToolbar.js
import React from 'react';
import { useResponsive } from '../../responsive/useResponsive';

/**
 * Wraps the toolbar (taskbar) to adapt to different breakpoints.
 * On desktop, it stays the same.
 * On tablet/mobile, it can be simplified or re‑ordered.
 */
export function AdaptiveToolbar({ children }) {
  const { breakpoint } = useResponsive();

  // You can customise the toolbar per breakpoint here if needed.
  // For now we simply pass through the children unchanged.
  return (
    <div
      className={`pointer-events-auto relative flex h-8 flex-shrink-0 items-center justify-between border-t border-white/5 bg-panel/80 backdrop-blur-md px-4 z-30 transition-colors ${
        breakpoint === 'mobile' ? 'gap-1' : ''
      }`}
    >
      {children}
    </div>
  );
}