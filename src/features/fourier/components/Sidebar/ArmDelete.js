// src/features/fourier/components/Sidebar/ArmDelete.js
import React from 'react';

/**
 * Delete button for an arm card.
 * SVG cross that rotates 90° on hover with red glow.
 */
export function ArmDelete({ onRemove }) {
  return (
    <button
      className="group flex h-[26px] w-[26px] items-center justify-center rounded-full border border-transparent bg-transparent transition-all duration-150
                 hover:border-[rgba(248,113,113,0.2)] hover:bg-[rgba(248,113,113,0.08)] hover:shadow-[0_0_12px_rgba(248,113,113,0.15)]"
      title="Remove arm"
      onClick={onRemove}
    >
      <svg
        width="14" height="14" viewBox="0 0 100 100"
        className="transition-transform duration-150 group-hover:rotate-90 group-active:scale-90"
      >
        <line x1="20" y1="20" x2="80" y2="80"
          stroke="currentColor" strokeWidth="12" strokeLinecap="round"
          className="text-ink-mute group-hover:text-red" />
        <line x1="80" y1="20" x2="20" y2="80"
          stroke="currentColor" strokeWidth="12" strokeLinecap="round"
          className="text-ink-mute group-hover:text-red" />
      </svg>
    </button>
  );
}