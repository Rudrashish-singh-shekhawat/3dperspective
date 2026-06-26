// src/features/fourier/components/BottomPanel/RightSidebar.js
import React from 'react';
import { AnalysisPanel } from './AnalysisPanel';

/**
 * Right inner sidebar of the bottom panel.
 * Toggleable via the Parameters button in the taskbar.
 */
export function RightSidebar({ isOpen }) {
  return (
    <div
      id="bp-sidebar-right"
      className={`h-full border-white/5 bg-panel-solid/40 flex-shrink-0 transition-all duration-300 overflow-hidden absolute md:relative left-8 sm:left-10 md:left-0 z-20 ${
        isOpen ? 'w-[calc(100%-4rem)] sm:w-[calc(100%-5rem)] md:w-64 border-r' : 'w-0 border-r-0'
      }`}
    >
      <div className="w-[calc(100vw-4rem)] sm:w-[calc(100vw-5rem)] md:w-64 h-full">
        <AnalysisPanel />
      </div>
    </div>
  );
}