import React from 'react';
import { useGraphStore } from '../../state/GraphStore';
import { LeftSidebar } from './LeftSidebar';
import { RightSidebar } from './RightSidebar';
import { GraphCanvas } from './GraphCanvas';
import { BottomTaskbar } from './BottomTaskbar';
import { OrthoSidebar } from './OrthoSidebar';
import { RightTaskbar } from './RightTaskbar';

export function BottomPanel() {
  const isPanelOpen = useGraphStore((s) => s.isPanelOpen);
  const isLeftBpOpen = useGraphStore((s) => s.isLeftBpOpen);
  const isRightBpOpen = useGraphStore((s) => s.isRightBpOpen);
  const isOrthoOpen = useGraphStore((s) => s.isOrthoOpen);
  const panelHeight = useGraphStore((s) => s.panelHeight);

  return (
    <div
      id="bottom-panel"
      className={`pointer-events-auto w-full bg-panel/70 backdrop-blur-md transition-[height,border-color] duration-300 overflow-hidden border-t flex relative ${
        isPanelOpen ? 'border-white/5' : 'border-transparent'
      }`}
      style={{ height: isPanelOpen ? `${panelHeight}px` : '0px' }}
    >
      {/* Left-most vertical taskbar */}
      <BottomTaskbar />
      {/* Left inner sidebars */}
      <LeftSidebar isOpen={isLeftBpOpen} />
      <RightSidebar isOpen={isRightBpOpen} />
      {/* Center graph canvas */}
      <div className="flex-1 h-full relative overflow-hidden">
        <GraphCanvas />
      </div>
      {/* Right inner sidebar (Ortho Projection) */}
      <OrthoSidebar isOpen={isOrthoOpen} />
      {/* Right-most vertical taskbar */}
      <RightTaskbar />
    </div>
  );
}