// src/engine/interaction/Drag.js
import { useState, useCallback, useRef } from 'react';

/**
 * Hook that manages drag state for different drag modes:
 *   - rotate (left button on canvas)
 *   - gizmo (left button near gizmo)
 *   - pan (right button on canvas)
 *
 * Original logic: scattered variables `isDraggingRotate`, `isDraggingGizmo`,
 * `isDraggingPan`, `dragStartX`, `dragStartY`, `lastMouseX`, `lastMouseY`.
 */
export function useDrag() {
  const [mode, setMode] = useState(null); // 'rotate' | 'gizmo' | 'pan' | null
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [lastPos, setLastPos] = useState({ x: 0, y: 0 });

  const isDragging = mode !== null;

  const startDrag = useCallback((clientX, clientY, dragMode) => {
    setMode(dragMode);
    setStartPos({ x: clientX, y: clientY });
    setLastPos({ x: clientX, y: clientY });
  }, []);

  const updateDrag = useCallback((clientX, clientY) => {
    setLastPos({ x: clientX, y: clientY });
    // Delta is computed by consumer from lastPos and new pos
  }, []);

  const endDrag = useCallback(() => {
    setMode(null);
  }, []);

  // Returns delta since last update (to be used in callbacks)
  const getDelta = useCallback(() => {
    return {
      dx: lastPos.x - startPos.x,
      dy: lastPos.y - startPos.y,
    };
  }, [lastPos, startPos]);

  return {
    mode,
    isDragging,
    startPos,
    lastPos,
    startDrag,
    updateDrag,
    endDrag,
    getDelta,
  };
}