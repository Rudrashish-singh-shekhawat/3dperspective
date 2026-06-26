// src/features/fourier/canvas/WaveRenderer.js

const GOLDEN_ANGLE = 137.507764;

function generateAccent(id) {
  const hue = (id * GOLDEN_ANGLE) % 360;
  return {
    color: `hsl(${hue}, 80%, 65%)`,
    glow: `hsla(${hue}, 80%, 65%, 0.5)`
  };
}

/**
 * Renders the oscilloscope‑style X and Y wave graphs on the 2D canvas.
 * The original draw2DGraph() function draws two waves (real = X, imaginary = Y)
 * and a parametric shape. This renderer focuses on the wave part.
 */
export class WaveRenderer {
  /**
   * @param {CanvasRenderingContext2D} ctx
   * @param {Array} path - path points (most recent first) with {x, y, t}
   * @param {number} pWidth - panel canvas width
   * @param {number} pHeight - panel canvas height
   * @param {number} maxPathLength - total number of points to display
   */
  draw(ctx, path, pWidth, pHeight, maxPathLength, circles = [], isolatedCircleIndices = [], showReal = true, showImaginary = true, showIsolatedReal = true, showIsolatedImag = true) {
    if (path.length < 2) return;

    // Determine amplitude scaling stably using active circles sum
    const maxAmp = circles.reduce((sum, c) => sum + c.radius, 0) || 0.001;

    const oscWidth = pWidth; // Use full width now that Ortho is moved
    const yMid = pHeight / 2;
    const yScale = (pHeight * 0.4) / maxAmp;

    // Draw grid
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'rgba(255,255,255,0.03)';
    ctx.beginPath();
    // Vertical grid lines
    const gridStepX = 50;
    for (let x = 0; x < oscWidth; x += gridStepX) {
      ctx.moveTo(x, 0);
      ctx.lineTo(x, pHeight);
    }
    // Horizontal grid lines
    const gridStepY = 50;
    for (let y = yMid % gridStepY; y < pHeight; y += gridStepY) {
      ctx.moveTo(0, y);
      ctx.lineTo(oscWidth, y);
    }
    ctx.stroke();

    // Center line (Time axis)
    ctx.beginPath();
    ctx.moveTo(0, yMid);
    ctx.lineTo(oscWidth, yMid);
    ctx.strokeStyle = 'rgba(255,255,255,0.15)';
    ctx.lineWidth = 1;
    ctx.stroke();

    // Helper to draw one component
    const drawComponent = (color, glowColor, key, isolatedIdx = null, lineWidth = 1.5) => {
      ctx.beginPath();
      for (let i = 0; i < path.length; i++) {
        const pt = path[i];
        
        let val;

        if (isolatedIdx !== null && circles[isolatedIdx]) {
           const circle = circles[isolatedIdx];
           const angle = (pt.t * circle.freq + circle.phase);
           val = key === 'x' ? circle.radius * Math.cos(angle) : circle.radius * Math.sin(angle);
        } else {
           val = pt[key];
        }

        const xPos = oscWidth - (i / (maxPathLength - 1)) * oscWidth;
        const yPos = yMid - (val * yScale);
        if (i === 0) ctx.moveTo(xPos, yPos);
        else ctx.lineTo(xPos, yPos);
      }

      // Glow effect
      ctx.shadowBlur = glowColor ? 10 : 0;
      ctx.shadowColor = glowColor || 'transparent';
      ctx.strokeStyle = color;
      ctx.lineWidth = lineWidth;
      ctx.lineJoin = 'round';
      
      const isDotted = key === 'x';
      if (isDotted) {
        ctx.setLineDash([1, 5]);
        ctx.lineCap = 'round';
      } else {
        ctx.setLineDash([]);
        ctx.lineCap = 'butt';
      }

      ctx.stroke();
      
      // Reset
      ctx.shadowBlur = 0;
      if (isDotted) {
        ctx.setLineDash([]);
        ctx.lineCap = 'butt';
      }
    };

    // Draw main path normally (unchanged)
    if (showReal) drawComponent('rgba(77,159,255,0.9)', 'rgba(77,159,255,0.5)', 'x', null, 1.5);
    if (showImaginary) drawComponent('rgba(167,139,250,0.9)', 'rgba(167,139,250,0.5)', 'y', null, 1.5);

    // Draw all isolated paths bright and thick on top
    for (const id of isolatedCircleIndices) {
      const idx = circles.findIndex(c => c.id === id);
      if (idx !== -1) {
        const accent = generateAccent(id);
        if (showIsolatedReal) drawComponent(accent.color, accent.glow, 'x', idx, 2.5);
        if (showIsolatedImag) drawComponent(accent.color, accent.glow, 'y', idx, 2.5);
      }
    }
  }
}