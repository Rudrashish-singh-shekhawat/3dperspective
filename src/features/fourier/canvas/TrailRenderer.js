// src/features/fourier/canvas/TrailRenderer.js
import { project } from '../../../engine/camera/CameraProjection';

/**
 * Renders a fading trail of the pen tip in 3D.
 * Similar to PathRenderer but may draw a thick, semi‑transparent ribbon
 * or a series of dots. In the original code the path is drawn as a line
 * in the 3D view, but we can provide an alternative renderer here.
 */
export class TrailRenderer {
  draw(ctx, scale, path, time, currentQuat) {
    if (!path || path.length < 2) return;

    const trail = path.map(pt => {
      const dT = time - pt.t;
      const p = project(pt.x, pt.y, dT * 55, currentQuat);
      return { sx: p.x * scale, sy: p.y * scale, age: dT };
    });

    for (let i = 0; i < trail.length - 1; i++) {
      const alpha = Math.max(0, 1 - trail[i].age / 8);
      ctx.beginPath();
      ctx.moveTo(trail[i].sx, trail[i].sy);
      ctx.lineTo(trail[i + 1].sx, trail[i + 1].sy);
      ctx.strokeStyle = `rgba(62,207,142,${alpha * 0.5})`;
      ctx.lineWidth = 2;
      ctx.stroke();
    }
  }
}