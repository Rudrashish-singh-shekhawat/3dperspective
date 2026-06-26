// src/features/fourier/canvas/EpicycleRenderer.js
import { project } from '../../../engine/camera/CameraProjection';

const CIRCLE_SEGS = 64;

/**
 * Renders the epicycle circles, arms, and tip dots.
 * Replicates the original drawEpicycles() function.
 */
export class EpicycleRenderer {
  /**
   * @param {CanvasRenderingContext2D} ctx
   * @param {number} scale - viewport scale factor
   * @param {Array} circles - array of { radius, freq, phase }
   * @param {number} time - current animation time
   * @param {number[]} currentQuat - camera orientation quaternion
   */
  draw(ctx, scale, circles, time, currentQuat, isolatedCircleIndices = []) {
    if (!circles || circles.length === 0) return;

    let cx = 0, cy = 0; // pen position

    const hasIsolation = isolatedCircleIndices && isolatedCircleIndices.length > 0;

    for (let i = 0; i < circles.length; i++) {
      const r = circles[i].radius;
      const freq = circles[i].freq;
      const phase = circles[i].phase;
      const idForColor = circles[i].id !== undefined ? circles[i].id : i;
      const hue = (idForColor * 137.507764) % 360; // colour hue per arm card

      const isIsolated = hasIsolation && isolatedCircleIndices.includes(idForColor);

      let circleAlpha = 0.18;
      let circleWidth = 0.8;
      let armAlpha = 0.75;
      let armWidth = 1.5;

      if (hasIsolation) {
        if (isIsolated) {
          circleAlpha = 0.45;
          circleWidth = 1.6;
          armAlpha = 1.0;
          armWidth = 3.0;
        } else {
          circleAlpha = 0.03;
          armAlpha = 0.12;
        }
      }

      const angle = (time * freq + phase);
      const nx = cx + r * Math.cos(angle);
      const ny = cy + r * Math.sin(angle);

      // --- Draw circle outline ---
      ctx.beginPath();
      for (let k = 0; k <= CIRCLE_SEGS; k++) {
        const theta = (k / CIRCLE_SEGS) * Math.PI * 2;
        const px = cx + r * Math.cos(theta - phase);
        const py = cy + r * Math.sin(theta - phase);
        const pr = project(px, py, 0, currentQuat);
        if (k === 0) ctx.moveTo(pr.x * scale, pr.y * scale);
        else ctx.lineTo(pr.x * scale, pr.y * scale);
      }
      ctx.closePath();
      ctx.strokeStyle = `rgba(255, 255, 255, ${circleAlpha})`;
      ctx.lineWidth = circleWidth;
      ctx.stroke();

      // --- Draw arm (phasor) ---
      const p1 = project(cx, cy, 0, currentQuat);
      const p2 = project(nx, ny, 0, currentQuat);
      ctx.beginPath();
      ctx.moveTo(p1.x * scale, p1.y * scale);
      ctx.lineTo(p2.x * scale, p2.y * scale);
      ctx.strokeStyle = `hsla(${hue},80%,65%,${armAlpha})`;
      ctx.lineWidth = armWidth;
      ctx.stroke();

      // --- Tip dot ---
      ctx.beginPath();
      ctx.arc(p2.x * scale, p2.y * scale, 2, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(${hue},85%,70%,0.9)`;
      ctx.fill();

      // Advance pen
      cx = nx;
      cy = ny;
    }
  }
}