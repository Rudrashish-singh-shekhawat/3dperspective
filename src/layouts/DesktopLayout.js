// src/layouts/DesktopLayout.js
import React from 'react';
import { Sidebar } from '../features/fourier/components/Sidebar/Sidebar';
import { FourierCanvas } from '../features/fourier/canvas/FourierCanvas';
import { Taskbar } from '../features/fourier/components/Toolbar/Taskbar';
import { BottomPanel } from '../features/fourier/components/BottomPanel/BottomPanel';

import { useGraphStore } from '../features/fourier/state/GraphStore';

export function DesktopLayout() {
  const isMainSidebarOpen = useGraphStore((s) => s.isMainSidebarOpen);
  const toggleMainSidebar = useGraphStore((s) => s.toggleMainSidebar);

  return (
    <div className="flex h-[100dvh] w-screen overflow-hidden bg-surface text-ink font-sans antialiased relative">
      {/* Sidebar Overlay (only visible on mobile/tablet when sidebar is open) */}
      <div 
        className={`md:hidden absolute inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${isMainSidebarOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={toggleMainSidebar}
      />
      
      {/* Main Sidebar */}
      <div className={`
        absolute left-0 top-0 md:relative z-50 h-full flex-shrink-0 transition-transform duration-300
        ${isMainSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <Sidebar />
      </div>

      <div className="flex flex-col flex-1 h-full overflow-hidden w-full relative">
        <main className="flex flex-1 overflow-hidden w-full relative">
          {/* Toggle button floating over canvas on mobile/tablet */}
          <button 
            className="md:hidden absolute top-4 left-4 z-30 flex items-center rounded-lg bg-[rgba(11,11,10,0.72)] border border-white/10 backdrop-blur-md px-3.5 py-2 text-ink-dim hover:text-ink active:bg-white/5 transition-colors shadow-lg"
            onClick={toggleMainSidebar}
            title="Toggle Sidebar"
          >
            <span className="font-mono text-[11px] uppercase tracking-[0.12em] font-black text-[#e4e4ec]">
              3D
            </span>
          </button>
          <FourierCanvas />
        </main>
        <Taskbar />
        <BottomPanel />
      </div>
    </div>
  );
}