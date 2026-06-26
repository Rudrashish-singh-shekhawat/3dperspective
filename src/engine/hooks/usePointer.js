// src/engine/hooks/usePointer.js
import { useCallback, useRef } from 'react';
import { useCameraStore } from '../camera/CameraState';
import { useGizmoStore } from '../gizmo/GizmoState';
import { arcballVec } from '../canvas/Coordinate';
import { GizmoInteraction } from '../gizmo/GizmoInteraction';

const CURSOR_GRAB = `url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M12 2v20M2 12h20M12 2l3 3M12 2l-3 3M12 22l3-3M12 22l-3-3M2 12l3-3M2 12l3 3M22 12l-3-3M22 12l-3 3' stroke='%23e8e6df' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3Ccircle cx='12' cy='12' r='3' fill='%230d0d0c' stroke='%23e8e6df' stroke-width='1.5'/%3E%3C/svg%3E") 12 12, grab`;
const CURSOR_GRABBING = `url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M12 4v16M4 12h16M12 4l2 2M12 4l-2 2M12 20l2-2M12 20l-2-2M4 12l2-2M4 12l2 2M20 12l-2-2M20 12l-2 2' stroke='%233ecf8e' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3Ccircle cx='12' cy='12' r='2' fill='%233ecf8e'/%3E%3C/svg%3E") 12 12, grabbing`;
const CURSOR_POINTER = `url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10 14L10 4.5A1.5 1.5 0 0 1 13 4.5L13 5.5A1.5 1.5 0 0 1 16 5.5L16 7.5A1.5 1.5 0 0 1 19 7.5L19 9.5A1.5 1.5 0 0 1 22 9.5L22 16A7.5 7.5 0 0 1 7 16L7 12.5A1.5 1.5 0 0 1 10 12.5Z' fill='%230d0d0c' stroke='%23e8e6df' stroke-width='1.5' stroke-linejoin='round'/%3E%3C/svg%3E") 11 3, pointer`;

export function usePointer(canvasRef) {
  const dragRef = useRef({
    active: false,
    mode: null,   // 'rotate' | 'gizmo' | 'pan'
    prevVec: null,
    startX: 0,
    startY: 0,
    lastX: 0,
    lastY: 0,
  });

  const getCanvasPos = useCallback((clientX, clientY) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: clientX, y: clientY };
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    return { 
      x: (clientX - rect.left) * scaleX, 
      y: (clientY - rect.top) * scaleY 
    };
  }, [canvasRef]);

  const getCanvasSize = useCallback(() => {
    const canvas = canvasRef.current;
    return canvas ? { width: canvas.width, height: canvas.height } : { width: 0, height: 0 };
  }, [canvasRef]);

  const onPointerDown = useCallback((clientX, clientY, button, shiftKey) => {
    const pos = getCanvasPos(clientX, clientY);
    const canvas = canvasRef.current;
    if (!canvas) return;

    const cam = useCameraStore.getState();

    // Cancel any in‑progress snap
    if (cam.isSnapping) {
      cam.setSnapping(false);
    }

    const distToGizmo = Math.hypot(
      pos.x - (canvas.width - 70),
      pos.y - 70
    );

    let mode = null;
    if (distToGizmo < 65 && button === 0) {
      mode = 'gizmo';
    } else if (button === 0) {
      mode = 'rotate';
    } else if (button === 2) {
      mode = 'pan';
    }

    if (mode) {
      const size = getCanvasSize();
      dragRef.current = {
        active: true,
        mode,
        prevVec: mode !== 'pan' ? arcballVec(pos.x, pos.y, size.width, size.height) : null,
        startX: clientX,
        startY: clientY,
        lastX: clientX,
        lastY: clientY,
      };

      // Reset spin and snapping flags via dedicated actions
      cam.setSpinAngle(0);
      cam.setSnapping(false);

      if (canvas) canvas.style.cursor = CURSOR_GRABBING;
    }
  }, [canvasRef, getCanvasPos, getCanvasSize]);

  const onPointerMove = useCallback((clientX, clientY, shiftKey) => {
    const drag = dragRef.current;
    if (!drag.active) return;

    const dx = clientX - drag.lastX;
    const dy = clientY - drag.lastY;
    drag.lastX = clientX;
    drag.lastY = clientY;

    const cam = useCameraStore.getState();

    if (drag.mode === 'rotate') {
      if (shiftKey) {
        cam.roll(dx);
      } else if (drag.prevVec) {
        const size = getCanvasSize();
        const pos = getCanvasPos(clientX, clientY);
        const curVec = arcballVec(pos.x, pos.y, size.width, size.height);
        cam.rotate(drag.prevVec, curVec);
        drag.prevVec = curVec;
      }
    } else if (drag.mode === 'gizmo') {
      if (drag.prevVec) {
        const size = getCanvasSize();
        const pos = getCanvasPos(clientX, clientY);
        const curVec = arcballVec(pos.x, pos.y, size.width, size.height);
        cam.rotate(drag.prevVec, curVec);
        drag.prevVec = curVec;
        cam.setSpinAngle(0);
      }
    } else if (drag.mode === 'pan') {
      cam.pan(dx, dy);
    }
  }, [getCanvasSize, getCanvasPos]);

  const onPointerUp = useCallback((clientX, clientY, button) => {
    const drag = dragRef.current;
    if (!drag.active) return;

    const wasDraggingGizmo = drag.mode === 'gizmo';
    drag.active = false;
    drag.mode = null;
    drag.prevVec = null;

    const canvas = canvasRef.current;
    if (canvas) {
      const hovered = useGizmoStore.getState().hoveredAxis;
      canvas.style.cursor = hovered ? CURSOR_POINTER : CURSOR_GRAB;
    }

    if (wasDraggingGizmo && button === 0) {
      const dist = Math.hypot(clientX - drag.startX, clientY - drag.startY);
      if (dist < 5) {
        let axisToSnap = useGizmoStore.getState().hoveredAxis;
        
        // If no axis is currently hovered (e.g., on touch screens without mousemove),
        // perform a hit test right now at the tap location.
        if (!axisToSnap && canvas) {
          const pos = getCanvasPos(clientX, clientY);
          const interaction = new GizmoInteraction(canvas);
          const clickableAxes = useGizmoStore.getState().clickableAxes;
          axisToSnap = interaction.hitTest(pos.x, pos.y, clickableAxes);
        }

        if (axisToSnap) {
          useCameraStore.getState().snapToAxis(axisToSnap);
        }
      }
    }
  }, [canvasRef, getCanvasPos]);

  const onPointerHover = useCallback((clientX, clientY) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const pos = getCanvasPos(clientX, clientY);
    const interaction = new GizmoInteraction(canvas);
    const clickableAxes = useGizmoStore.getState().clickableAxes;
    const hovered = interaction.hitTest(pos.x, pos.y, clickableAxes);
    useGizmoStore.getState().setHoveredAxis(hovered);
    if (canvas) {
      canvas.style.cursor = hovered ? CURSOR_POINTER : CURSOR_GRAB;
    }
  }, [canvasRef, getCanvasPos]);

  const onWheel = useCallback((e) => {
    e.preventDefault();
    useCameraStore.getState().zoom(e.deltaY);
  }, []);

  const onContextMenu = useCallback((e) => {
    e.preventDefault();
    const drag = dragRef.current;
    if (Math.hypot(e.clientX - drag.startX, e.clientY - drag.startY) < 5) {
      useCameraStore.getState().snapOpposite();
    }
  }, []);

  const onKeyDown = useCallback((e) => {
    const map = {
      '1': 'X',
      '2': 'Y',
      '3': 'Z',
      '4': '-X',
      '5': '-Y',
      '6': '-Z',
    };
    if (map[e.key]) {
      useCameraStore.getState().snapToAxis(map[e.key]);
      e.preventDefault();
    }
    if (e.key.toLowerCase() === 'r') {
      useCameraStore.getState().reset();
      e.preventDefault();
    }
  }, []);

  return {
    onPointerDown,
    onPointerMove,
    onPointerUp,
    onPointerHover,
    onWheel,
    onContextMenu,
    onKeyDown,
  };
}