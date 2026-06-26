// src/layouts/TabletLayout.js
import React from 'react';
import { Sidebar } from '../features/fourier/components/Sidebar/Sidebar';
import { FourierCanvas } from '../features/fourier/canvas/FourierCanvas';
import { Taskbar } from '../features/fourier/components/Toolbar/Taskbar';
import { BottomPanel } from '../features/fourier/components/BottomPanel/BottomPanel';

export function TabletLayout() {
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-surface text-ink font-sans antialiased">
      <Sidebar />
      <div className="flex flex-col flex-1 h-full overflow-hidden">
        <main className="flex flex-1 overflow-hidden w-full relative">
          <FourierCanvas />
        </main>
        <Taskbar />
        <BottomPanel />
      </div>
    </div>
  );
}