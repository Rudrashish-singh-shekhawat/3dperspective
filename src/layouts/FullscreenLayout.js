// src/layouts/FullscreenLayout.js
import React from 'react';
import { FourierCanvas } from '../features/fourier/canvas/FourierCanvas';

export function FullscreenLayout() {
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-surface text-ink font-sans antialiased">
      <main className="flex flex-1 overflow-hidden w-full relative">
        <FourierCanvas />
      </main>
    </div>
  );
}