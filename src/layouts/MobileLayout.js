import React, { useState } from 'react';
import { Sidebar } from '../features/fourier/components/Sidebar/Sidebar';
import { FourierCanvas } from '../features/fourier/canvas/FourierCanvas';
import { Taskbar } from '../features/fourier/components/Toolbar/Taskbar';
import { BottomPanel } from '../features/fourier/components/BottomPanel/BottomPanel';

export function MobileLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-surface text-ink font-sans antialiased relative">
      {/* Sidebar Overlay */}
      <div 
        className={`absolute inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${sidebarOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setSidebarOpen(false)}
      />
      
      {/* Sliding Sidebar */}
      <div className={`absolute left-0 top-0 bottom-0 z-50 transform transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <Sidebar />
      </div>

      <div className="flex flex-col flex-1 h-full overflow-hidden w-full relative">
        <main className="flex flex-1 overflow-hidden w-full relative">
          {/* Hamburger button floating over canvas */}
          <button 
            className="absolute top-4 left-4 z-30 flex h-9 w-9 items-center justify-center rounded-lg bg-[rgba(11,11,10,0.72)] border border-white/10 backdrop-blur-md text-ink-dim hover:text-ink active:bg-white/5 transition-colors"
            onClick={() => setSidebarOpen(true)}
            title="Menu"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <line x1="4" y1="12" x2="20" y2="12"></line>
              <line x1="4" y1="6" x2="20" y2="6"></line>
              <line x1="4" y1="18" x2="20" y2="18"></line>
            </svg>
          </button>
          <FourierCanvas />
        </main>
        <Taskbar />
        <BottomPanel />
      </div>
    </div>
  );
}