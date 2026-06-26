// src/features/fourier/canvas/FourierCanvas.js
import React, { useRef, useEffect } from 'react';
import { useRenderer } from '../../../engine/hooks/useRenderer';
import { useAnimation } from '../../../engine/hooks/useAnimation';
import { usePointer } from '../../../engine/hooks/usePointer';
import { useResize } from '../../../engine/hooks/useResize';
import { EquationDisplay } from '../math/Equation';
import { useCameraStore } from '../../../engine/camera/CameraState';
import { useFourierStore } from '../state/FourierStore';

/**
 * Main Fourier 3D canvas component.
 * Combines the main viewport canvas, graph canvas, HUD overlay,
 * and wires together renderer, animation, camera, and pointer interactions.
 */
export function FourierCanvas() {
  const canvasRef = useRef(null);
  const graphCanvasRef = useRef(null);
  const viewportRef = useRef(null);
  const isTouchingCanvasRef = useRef(false);

  // Initialise renderer and animation loop
  useRenderer(canvasRef);
  useAnimation(canvasRef); // drives the loop

  // Pointer handling (rotate, pan, gizmo, wheel, keys)
  const { 
    onPointerDown, onPointerMove, onPointerUp, onPointerHover,
    onWheel, onContextMenu, onKeyDown
  } = usePointer(canvasRef);

  // Resize
  useResize(canvasRef, graphCanvasRef, viewportRef);

  // Attach pointer events directly to the canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Mouse
    const onMouseDown = (e) => {
      onPointerDown(e.clientX, e.clientY, e.button, e.shiftKey);
    };
    const onMouseMove = (e) => {
      if (!e.buttons) {
        onPointerHover(e.clientX, e.clientY);
      } else {
        onPointerMove(e.clientX, e.clientY, e.shiftKey);
      }
    };
    const onMouseUp = (e) => {
      onPointerUp(e.clientX, e.clientY, e.button);
    };

    // Touch (single and multi-finger)
    let initialPinchDist = null;
    let lastPinchCenter = null;

    const onTouchStart = (e) => {
      isTouchingCanvasRef.current = true;
      if (e.touches.length === 1) {
        const t = e.touches[0];
        onPointerDown(t.clientX, t.clientY, 0, false);
      } else if (e.touches.length === 2) {
        // Cancel any active single-finger drag
        onPointerUp(e.touches[0].clientX, e.touches[0].clientY, 0);
        
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        initialPinchDist = Math.hypot(dx, dy);
        lastPinchCenter = {
          x: (e.touches[0].clientX + e.touches[1].clientX) / 2,
          y: (e.touches[0].clientY + e.touches[1].clientY) / 2
        };
      }
      if (e.cancelable) e.preventDefault();
    };
    
    const onTouchMove = (e) => {
      if (!isTouchingCanvasRef.current) return;
      if (e.touches.length === 1) {
        const t = e.touches[0];
        onPointerMove(t.clientX, t.clientY, false);
      } else if (e.touches.length === 2 && initialPinchDist !== null && lastPinchCenter !== null) {
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        const dist = Math.hypot(dx, dy);
        
        // Pinch zoom (simulate wheel)
        const zoomDelta = initialPinchDist - dist;
        if (Math.abs(zoomDelta) > 1) {
          onWheel({ deltaY: zoomDelta * 3, preventDefault: () => {} });
          initialPinchDist = dist;
        }
 
        // 2-finger Pan
        const center = {
          x: (e.touches[0].clientX + e.touches[1].clientX) / 2,
          y: (e.touches[0].clientY + e.touches[1].clientY) / 2
        };
        const panX = center.x - lastPinchCenter.x;
        const panY = center.y - lastPinchCenter.y;
        
        useCameraStore.getState().pan(panX, panY);
        lastPinchCenter = center;
      }
      if (e.cancelable) e.preventDefault();
    };
    
    const onTouchEnd = (e) => {
      if (e.touches.length === 0) {
        isTouchingCanvasRef.current = false;
        if (e.changedTouches.length > 0) {
          const t = e.changedTouches[0];
          onPointerUp(t.clientX, t.clientY, 0);
        }
        initialPinchDist = null;
        lastPinchCenter = null;
      } else if (e.touches.length === 1) {
        initialPinchDist = null;
        lastPinchCenter = null;
      }
    };

    canvas.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    canvas.addEventListener('touchstart', onTouchStart, { passive: false });
    window.addEventListener('touchmove', onTouchMove, { passive: false });
    window.addEventListener('touchend', onTouchEnd);
    canvas.addEventListener('wheel', onWheel, { passive: false });
    canvas.addEventListener('contextmenu', onContextMenu);
    window.addEventListener('keydown', onKeyDown);

    return () => {
      canvas.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      canvas.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      canvas.removeEventListener('wheel', onWheel);
      canvas.removeEventListener('contextmenu', onContextMenu);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [canvasRef, onPointerDown, onPointerMove, onPointerUp, onPointerHover, onWheel, onContextMenu, onKeyDown]);

  return (
    <div
      id="viewport"
      ref={viewportRef}
      className="absolute inset-0"
    >
      <canvas
        id="c"
        ref={canvasRef}
        className="block h-full w-full outline-none"
      />
      <canvas
        id="graph-2d"
        ref={graphCanvasRef}
        className="hidden"
        onContextMenu={(e) => e.preventDefault()}
      />
      <HUD />
    </div>
  );
}

/**
 * Heads-up display (equation overlay, view label, tip).
 * Rendered as a separate component because it is purely presentational.
 */
function HUD() {
  const circles = useFourierStore((s) => s.circles);
  const [showFullEqMobile, setShowFullEqMobile] = React.useState(false);
  const [hasInteracted, setHasInteracted] = React.useState(false);
  const eqRef = React.useRef(null);

  React.useEffect(() => {
    if (!showFullEqMobile) return;

    const handleOutsideClick = (e) => {
      if (eqRef.current && !eqRef.current.contains(e.target)) {
        setShowFullEqMobile(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('touchstart', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('touchstart', handleOutsideClick);
    };
  }, [showFullEqMobile]);

  React.useEffect(() => {
    const handleInteract = () => setHasInteracted(true);
    const canvas = document.getElementById('c');
    if (canvas) {
      canvas.addEventListener('mousedown', handleInteract, { once: true });
      canvas.addEventListener('touchstart', handleInteract, { once: true });
      canvas.addEventListener('wheel', handleInteract, { once: true });
    }
    return () => {
      if (canvas) {
        canvas.removeEventListener('mousedown', handleInteract);
        canvas.removeEventListener('touchstart', handleInteract);
        canvas.removeEventListener('wheel', handleInteract);
      }
    };
  }, []);

  return (
    <div id="hud" className="pointer-events-none absolute inset-0">
      <div id="eq-overlay"
        ref={eqRef}
        onClick={() => setShowFullEqMobile(!showFullEqMobile)}
        className={`pointer-events-auto cursor-pointer absolute left-1/2 top-4 -translate-x-1/2 border border-white/10 bg-[rgba(11,11,10,0.72)] backdrop-blur-md transition-all duration-300 ease-[cubic-bezier(0.22,0.61,0.36,1)] shadow-[0_8px_32px_rgba(0,0,0,0.5)] z-40
          ${showFullEqMobile 
            ? 'w-[85vw] max-w-[340px] flex flex-col gap-2 rounded-xl p-4 whitespace-normal text-center' 
            : 'flex max-w-[calc(100%-75px)] md:max-w-[calc(100%-160px)] items-center gap-1.5 sm:gap-2 rounded-lg px-3 py-1.5 sm:px-5 sm:py-2 whitespace-nowrap'
          }`}
      >
        {showFullEqMobile ? (
          <div className="flex flex-col items-center w-full gap-2">
            <span className="font-mono text-[9px] tracking-[0.1em] text-ink-mute uppercase font-black border-b border-white/5 pb-1 w-full text-center">
              Equation f(t)
            </span>
            <div className="font-mono text-[11px] leading-relaxed text-[#e4e4ec] break-all select-text py-1">
              <EquationDisplay circles={circles} />
            </div>
            <span className="text-[8px] text-ink-mute font-mono tracking-wider mt-1 opacity-60">
              (TAP TO CLOSE)
            </span>
          </div>
        ) : (
          <>
            <span id="eq-label" className="flex-shrink-0 font-mono text-[10px] tracking-[0.08em] text-ink-mute font-bold">f(t)</span>
            <div className="items-center gap-1.5 sm:gap-2.5 hidden md:flex">
              <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.08em] text-ink-mute">=</span>
              <div id="eq-text" className="overflow-hidden text-ellipsis font-mono text-[10px] sm:text-[11px] leading-none text-ink-dim max-w-[180px] md:max-w-[380px] lg:max-w-[400px]">
                <EquationDisplay circles={circles} maxTerms={3} />
              </div>
            </div>
          </>
        )}
      </div>
      <div id="view-label"
        className="absolute right-4 md:right-6 bottom-[18px] font-mono text-[10px] uppercase tracking-[0.12em] text-ink-mute">PERSPECTIVE</div>
      <div id="tip"
        className={`absolute bottom-[18px] left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-[10px] tracking-[0.06em] text-ink-mute transition-opacity duration-1000 ${hasInteracted ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        Drag — rotate &nbsp;·&nbsp; Shift+drag — roll &nbsp;·&nbsp; Scroll — zoom &nbsp;·&nbsp; Right-drag — pan
      </div>
    </div>
  );
}