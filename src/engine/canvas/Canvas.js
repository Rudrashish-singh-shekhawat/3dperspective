// src/engine/canvas/Canvas.js
import React, { useRef, useEffect } from 'react';

export function Canvas({ id, className, onContextReady }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (onContextReady) onContextReady(canvas, ctx);
  }, [onContextReady]);

  return (
    <canvas
      id={id}
      ref={canvasRef}
      className={className}
      onContextMenu={(e) => e.preventDefault()}
    />
  );
}