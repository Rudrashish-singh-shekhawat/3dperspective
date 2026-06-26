// src/features/fourier/components/Toolbar/Taskbar.js
import React from 'react';
import { PlayButton } from './PlayButton';
import { PauseButton } from './PauseButton';
import { ResetButton } from './ResetButton';
import { ClearButton } from './ClearButton';
import { ExportButton } from './ExportButton';
import { SettingsButton } from './SettingsButton';
import { ParametersButton } from './ParametersButton';
import { ChartButton } from './ChartButton';
import { Resizer } from '../BottomPanel/Resizer';

/**
 * Taskbar component that sits between the viewport and the bottom panel.
 * Contains the resizer handle, play/pause/reset/clear buttons,
 * and the settings/params/chart/export buttons on the right.
 * Replicates the original <div id="taskbar">...</div>.
 */
export function Taskbar() {
  return (
    <div
      id="taskbar"
      className="pointer-events-auto relative flex h-8 flex-shrink-0 items-center justify-between border-t border-white/5 bg-panel/80 backdrop-blur-md px-2 sm:px-4 z-30 transition-colors overflow-x-auto overflow-y-hidden whitespace-nowrap [&::-webkit-scrollbar]:hidden"
    >
      {/* Resizer (shown only when panel is open) */}
      <Resizer />

      {/* Left side: on mobile, show graph and svg export buttons here */}
      <div className="flex items-center gap-0.5 sm:gap-1 md:hidden">
        <ChartButton />
        <ExportButton />
      </div>

      {/* Center: playback and clear controls */}
      <div id="taskbar-center" className="flex items-center gap-1 sm:gap-1.5">
        <PlayButton />
        <PauseButton />
        <ResetButton />
        <ClearButton />
      </div>

      {/* Right side: utility buttons */}
      <div id="taskbar-right" className="flex items-center gap-0.5 sm:gap-0.75">
        <SettingsButton />
        <ParametersButton />
        <div className="hidden md:flex items-center gap-0.5 sm:gap-0.75">
          <ChartButton />
          <ExportButton />
        </div>
      </div>
    </div>
  );
}