// src/features/fourier/components/Toolbar/ExportButton.js
import React from 'react';
import { useFourierStore } from '../../state/FourierStore';
import { exportSVG } from '../../services/ExportSVG';

/**
 * Export button in the taskbar.
 * Exports the current path as an SVG file.
 */
export function ExportButton() {
  const path = useFourierStore((s) => s.path);

  const handleExport = () => {
    if (!path || path.length < 2) return;
    exportSVG(path);
  };

  return (
    <button
      className="icon-btn flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-md border border-transparent text-ink-mute transition-all duration-200 hover:-translate-y-px hover:border-white/10 hover:bg-white/[0.05] hover:text-ink active:border-blue/20 active:bg-blue/10 active:text-blue active:shadow-[0_0_10px_rgba(77,159,255,0.1)]"
      id="btn-export"
      title="Export SVG path"
      onClick={handleExport}
    >
      <svg width="11" height="11" viewBox="0 0 15 15" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 2H3a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h9a1 1 0 0 0 1-1V7" />
        <polyline points="10,1 14,1 14,5" />
        <line x1="6" y1="9" x2="14" y2="1" />
      </svg>
    </button>
  );
}