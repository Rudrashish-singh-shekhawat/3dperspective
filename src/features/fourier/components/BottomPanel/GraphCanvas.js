// src/features/fourier/components/BottomPanel/GraphCanvas.js
import React, { useRef, useEffect, useCallback } from 'react';
import { useGraph } from '../../hooks/useGraph';
import { WaveRenderer } from '../../canvas/WaveRenderer';
import { MAX_PATH_LENGTH } from '../../../../app/Config';

export function GraphCanvas() {
  const canvasRef = useRef(null);
  const { path, maxAmp, circles, isolatedCircleIndices, showReal, showImaginary, showIsolatedReal, showIsolatedImag } = useGraph();
  const waveRendererRef = useRef(new WaveRenderer());

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (!parent) return;

    // Resize canvas to fill parent
    if (canvas.width !== parent.clientWidth || canvas.height !== parent.clientHeight) {
      canvas.width = parent.clientWidth;
      canvas.height = parent.clientHeight;
    }

    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (path.length < 2) return;

    // Draw oscilloscope waves
    waveRendererRef.current.draw(
      ctx,
      path,
      canvas.width,
      canvas.height,
      MAX_PATH_LENGTH,
      circles,
      isolatedCircleIndices,
      showReal,
      showImaginary,
      showIsolatedReal,
      showIsolatedImag
    );
  }, [path, circles, isolatedCircleIndices, showReal, showImaginary, showIsolatedReal, showIsolatedImag]);

  useEffect(() => {
    draw();
  }, [draw, path, maxAmp, circles, isolatedCircleIndices, showReal, showImaginary, showIsolatedReal, showIsolatedImag]);

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
        id="graph-2d"
        ref={canvasRef}
        className="block w-full h-full absolute inset-0"
      />
    </div>
  );
}