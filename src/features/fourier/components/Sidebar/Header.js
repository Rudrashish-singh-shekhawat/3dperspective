// src/features/fourier/components/Sidebar/Header.js
import React from 'react';
/**
 * Sidebar header: displays the app title.
 */
export function Header() {

  return (
    <div className="px-4 py-4 pb-4">
      <h1 className="text-[18px] font-black tracking-[-0.01em] text-[#e4e4ec]">
        3D PERSPECTIVE
      </h1>
      <p className="text-[11px] font-bold tracking-[0.02em] text-ink-mute mt-1 uppercase">
        fourier .
      </p>
    </div>
  );
}