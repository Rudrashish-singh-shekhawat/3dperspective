// src/features/fourier/components/BottomPanel/Resizer.js
import React, { useRef, useCallback } from 'react';
import { useGraphStore } from '../../state/GraphStore';

/**
 * Draggable handle to resize the bottom panel vertically.
 * Mirrors the original #taskbar-resizer logic:
 *   - mousedown starts the drag
 *   - mousemove adjusts the panel height (with min/max constraints)
 *   - mouseup ends the drag
 * The panel height is stored in GraphStore.panelHeight.
 */
export function Resizer() {
  const setPanelHeight = useGraphStore((s) => s.setPanelHeight);
  const panelHeight = useGraphStore((s) => s.panelHeight);
  const isPanelOpen = useGraphStore((s) => s.isPanelOpen);

  const draggingRef = useRef(false);
  const startYRef = useRef(0);
  const startHeightRef = useRef(0);

  const onMouseDown = useCallback(
    (e) => {
      e.preventDefault();
      draggingRef.current = true;
      startYRef.current = e.clientY;
      startHeightRef.current = panelHeight;

      document.body.style.cursor = 'ns-resize';
      // Disable transition on the panel while dragging
      const panel = document.getElementById('bottom-panel');
      if (panel) panel.style.transition = 'none';
    },
    [panelHeight]
  );

  const onMouseMove = useCallback(
    (e) => {
      if (!draggingRef.current) return;
      const deltaY = startYRef.current - e.clientY;
      let newHeight = startHeightRef.current + deltaY;

      // Min 50px, max 80% of viewport height
      const maxHeight = window.innerHeight * 0.8;
      newHeight = Math.max(50, Math.min(maxHeight, newHeight));
      setPanelHeight(newHeight);
    },
    [setPanelHeight]
  );

  const onMouseUp = useCallback(() => {
    if (!draggingRef.current) return;
    draggingRef.current = false;
    document.body.style.cursor = '';
    // Re-enable transition
    const panel = document.getElementById('bottom-panel');
    if (panel) panel.style.transition = '';
  }, []);

  // Attach global mousemove/mouseup listeners
  React.useEffect(() => {
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, [onMouseMove, onMouseUp]);

  return (
    <div
      id="taskbar-resizer"
      onMouseDown={onMouseDown}
      className={`absolute left-0 right-0 top-[-2px] h-[4px] cursor-ns-resize hover:bg-blue/40 active:bg-blue/60 z-30 transition-colors ${
        isPanelOpen ? 'block' : 'hidden'
      }`}
    />
  );
}