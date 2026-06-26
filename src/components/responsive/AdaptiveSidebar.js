// src/components/responsive/AdaptiveSidebar.js
import React from 'react';
import { useResponsive } from '../../responsive/useResponsive';

/**
 * Renders the sidebar with different behaviours per breakpoint.
 * - Desktop: always visible, fixed width (280px)
 * - Tablet: collapsible (user toggle), narrower width (240px)
 * - Mobile: hidden by default, can be shown as an overlay
 *
 * Accepts `isOpen` and `onToggle` props for tablet/mobile control.
 */
export function AdaptiveSidebar({ children, isOpen = true, onToggle }) {
  const { breakpoint } = useResponsive();

  // Desktop: always show
  if (breakpoint === 'desktop') {
    return (
      <div className="relative z-10 flex h-full w-[280px] flex-shrink-0 flex-col overflow-hidden border-r border-white/10 bg-panel backdrop-blur-2xl">
        {children}
      </div>
    );
  }

  // Tablet: collapsible with narrower width
  if (breakpoint === 'tablet') {
    return (
      <div
        className={`relative z-10 flex h-full flex-shrink-0 flex-col overflow-hidden border-r border-white/10 bg-panel backdrop-blur-2xl transition-all duration-300 ${
          isOpen ? 'w-[240px]' : 'w-0'
        }`}
      >
        {isOpen && children}
      </div>
    );
  }

  // Mobile: overlay sidebar
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-20 bg-black/60" onClick={onToggle} />
      )}
      <div
        className={`fixed left-0 top-0 z-30 h-full w-[260px] flex-shrink-0 flex-col overflow-hidden border-r border-white/10 bg-panel backdrop-blur-2xl transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {children}
      </div>
    </>
  );
}