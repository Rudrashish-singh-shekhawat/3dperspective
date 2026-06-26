// src/engine/renderer/AxisRenderer.js
import { project } from '../camera/CameraProjection';

/**
 * Renders the three world-space axes (X, Y, Z) with radial fade.
 * Extracted from GridRenderer for separate use if needed.
 */
export class AxisRenderer {
  draw(ctx, scale, panX, panY, currentQuat) {
    const w = ctx.canvas.width;
    const h = ctx.canvas.height;
    const R = (Math.max(w, h) / scale) * 1.6;
    const fadeR = Math.max(w, h) * 0.65;

    function radFade(innerCol, outerCol) {
      const g = ctx.createRadialGradient(-panX, -panY, 0, -panX, -panY, fadeR);
      g.addColorStop(0, innerCol);
      g.addColorStop(1, outerCol);
      return g;
    }

    ctx.lineWidth = 1;

    // X axis (red)
    ctx.beginPath();
    const x1 = project(-R, 0, 0, currentQuat);
    const x2 = project(R, 0, 0, currentQuat);
    ctx.moveTo(x1.x * scale, x1.y * scale);
    ctx.lineTo(x2.x * scale, x2.y * scale);
    ctx.strokeStyle = radFade('rgba(244,124,90,0.5)', 'rgba(244,124,90,0)');
    ctx.stroke();

    // Y axis (green) – world Y is “away”
    ctx.beginPath();
    const y1 = project(0, -R, 0, currentQuat);
    const y2 = project(0, R, 0, currentQuat);
    ctx.moveTo(y1.x * scale, y1.y * scale);
    ctx.lineTo(y2.x * scale, y2.y * scale);
    ctx.strokeStyle = radFade('rgba(62,207,142,0.5)', 'rgba(62,207,142,0)');
    ctx.stroke();

    // Z axis (blue) – world Z is “up”
    ctx.beginPath();
    const z1 = project(0, 0, -R, currentQuat);
    const z2 = project(0, 0, R, currentQuat);
    ctx.moveTo(z1.x * scale, z1.y * scale);
    ctx.lineTo(z2.x * scale, z2.y * scale);
    ctx.strokeStyle = radFade('rgba(77,159,255,0.5)', 'rgba(77,159,255,0)');
    ctx.stroke();
  }
}