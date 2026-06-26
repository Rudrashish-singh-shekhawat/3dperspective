// src/engine/renderer/CurveRenderer.js
import { project } from '../camera/CameraProjection';

/**
 * Renders a 3D curve defined by an array of world-space points.
 * Points are projected and connected with line segments.
 */
export class CurveRenderer {
  /**
   * @param {CanvasRenderingContext2D} ctx
   * @param {number} scale - viewport scale
   * @param {Array<{x: number, y: number, z: number}>} points - world coordinates
   * @param {string} strokeStyle - CSS colour
   * @param {number} lineWidth
   * @param {number[]} currentQuat - camera quaternion
   * @param {boolean} [closed=false] - whether to close the curve
   */
  draw(ctx, scale, points, strokeStyle, lineWidth, currentQuat, closed = false) {
    if (points.length < 2) return;

    ctx.save();
    ctx.beginPath();
    const first = project(points[0].x, points[0].y, points[0].z, currentQuat);
    ctx.moveTo(first.x * scale, first.y * scale);

    for (let i = 1; i < points.length; i++) {
      const p = project(points[i].x, points[i].y, points[i].z, currentQuat);
      ctx.lineTo(p.x * scale, p.y * scale);
    }

    if (closed) {
      ctx.closePath();
    }

    ctx.strokeStyle = strokeStyle;
    ctx.lineWidth = lineWidth;
    ctx.stroke();
    ctx.restore();
  }
}