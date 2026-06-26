
// src/engine/renderer/CircleRenderer.js
import { project } from '../camera/CameraProjection';

/**
 * Renders a circle in 3D world space by projecting points onto the canvas.
 * Used for generic circles (e.g., orbit rings, selection highlights).
 */
export class CircleRenderer {
  /**
   * @param {CanvasRenderingContext2D} ctx
   * @param {number} scale - current viewport scale
   * @param {number} cx - world X centre
   * @param {number} cy - world Y centre (away from camera)
   * @param {number} cz - world Z centre (up)
   * @param {number} radius - circle radius in world units
   * @param {string} strokeStyle - CSS colour
   * @param {number} lineWidth
   * @param {number[]} currentQuat - camera orientation quaternion
   * @param {number} [segments=64] - number of line segments
   */
  draw(ctx, scale, cx, cy, cz, radius, strokeStyle, lineWidth, currentQuat, segments = 64) {
    ctx.save();
    ctx.beginPath();
    for (let i = 0; i <= segments; i++) {
      const angle = (i / segments) * Math.PI * 2;
      const wx = cx + radius * Math.cos(angle);
      const wy = cy + radius * Math.sin(angle);
      const wz = cz;
      const p = project(wx, wy, wz, currentQuat);
      const sx = p.x * scale;
      const sy = p.y * scale;
      if (i === 0) ctx.moveTo(sx, sy);
      else ctx.lineTo(sx, sy);
    }
    ctx.strokeStyle = strokeStyle;
    ctx.lineWidth = lineWidth;
    ctx.stroke();
    ctx.restore();
  }
}