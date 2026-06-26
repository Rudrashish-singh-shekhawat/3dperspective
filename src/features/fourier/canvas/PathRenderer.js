// src/features/fourier/canvas/PathRenderer.js
import { project } from '../../../engine/camera/CameraProjection';
import { MAX_PATH_LENGTH, PATH_Z_SCALE } from '../../../app/Config';

/**
 * Renders the 3D spiral path trail of the epicycle pen.
 * The path is stored as an array of { x, y, t } points,
 * with Z displacement based on time difference from current frame.
 * Replicates the path‑drawing part of the original drawEpicycles().
 */
export class PathRenderer {
  /**
   * @param {CanvasRenderingContext2D} ctx
   * @param {number} scale - viewport scale factor
   * @param {Array} path - path points (most recent first)
   * @param {number} time - current animation time
   * @param {number[]} currentQuat - camera orientation quaternion
   */
  draw(ctx, scale, path, time, currentQuat) {
    if (!path || path.length < 2) return;

    // Project all points with Z = time difference * scale
    const pts = path.map((pt) => {
      const dT = time - pt.t;                       // time ago
      const p = project(pt.x, pt.y, dT * PATH_Z_SCALE, currentQuat);
      return { sx: p.x * scale, sy: p.y * scale, age: dT };
    });

    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    // Draw trail with fade based on age
    for (let i = 0; i < pts.length - 1; i++) {
      const alpha = Math.max(0, 1 - pts[i].age / (MAX_PATH_LENGTH * 0.02)); // original uses maxPathLength*animationSpeed approx
      ctx.beginPath();
      ctx.moveTo(pts[i].sx, pts[i].sy);
      ctx.lineTo(pts[i + 1].sx, pts[i + 1].sy);
      ctx.strokeStyle = `rgba(62,207,142,${alpha * 0.9})`;
      ctx.lineWidth = 1.5 + alpha * 0.8;
      ctx.stroke();
    }

    // Head dot (most recent point, bright green)
    if (pts.length > 0) {
      ctx.beginPath();
      ctx.arc(pts[0].sx, pts[0].sy, 3.5, 0, Math.PI * 2);
      ctx.fillStyle = '#3ecf8e';
      ctx.fill();
    }
  }
}