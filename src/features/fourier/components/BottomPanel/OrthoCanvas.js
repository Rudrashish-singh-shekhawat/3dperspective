// src/features/fourier/components/BottomPanel/OrthoCanvas.js
import React, { useRef, useEffect, useCallback } from 'react';
import { useGraph } from '../../hooks/useGraph';
import { GraphRenderer } from '../../canvas/GraphRenderer';

/**
 * Renders the 2D orthographic projection from the Z-axis (time axis).
 * This plots the parametric shape (X vs Y).
 */
export function OrthoCanvas() {
  const canvasRef = useRef(null);
  const { path, maxAmp } = useGraph();
  const graphRendererRef = useRef(new GraphRenderer());

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (!parent) return;

    if (canvas.width !== parent.clientWidth || canvas.height !== parent.clientHeight) {
      canvas.width = parent.clientWidth;
      canvas.height = parent.clientHeight;
    }

    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (path.length < 2) return;

    // Draw parametric shape (orthographic projection)
    graphRendererRef.current.draw(ctx, path, canvas.width, canvas.height);
  }, [path]);

  useEffect(() => {
    draw();
  }, [draw, path, maxAmp]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (!parent) return;

    const observer = new ResizeObserver(() => {
      draw();
    });
    observer.observe(parent);

    return () => {
      observer.disconnect();
    };
  }, [draw]);

  return (
    <div className="w-full h-full relative">
      <canvas
        id="ortho-canvas"
        ref={canvasRef}
        className="block w-full h-full absolute inset-0"
      />
      {/* Axis Labels Overlay */}
      <div className="absolute top-1/2 right-4 -translate-y-1/2 pointer-events-none">
        <span className="font-mono text-[9px] uppercase tracking-wider text-ink-mute/70">Re</span>
      </div>
      <div className="absolute top-4 left-1/2 -translate-x-1/2 pointer-events-none">
        <span className="font-mono text-[9px] uppercase tracking-wider text-ink-mute/70">Im</span>
      </div>
    </div>
  );
}
