// src/engine/renderer/LabelRenderer.js
import { project } from '../camera/CameraProjection';

/**
 * Renders a text label at a 3D world position.
 * Takes care of projecting the position and applying styling.
 */
export class LabelRenderer {
  /**
   * @param {CanvasRenderingContext2D} ctx
   * @param {number} scale - viewport scale
   * @param {number} x - world X
   * @param {number} y - world Y (away)
   * @param {number} z - world Z (up)
   * @param {string} text - label string
   * @param {string} fillStyle - CSS colour
   * @param {string} [font='10px JetBrains Mono, monospace']
   * @param {number[]} currentQuat - camera quaternion
   * @param {object} [offsets={x:0, y:0}] - screen-space offset
   */
  draw(ctx, scale, x, y, z, text, fillStyle, font, currentQuat, offsets = { x: 0, y: 0 }) {
    const p = project(x, y, z, currentQuat);
    const sx = p.x * scale + offsets.x;
    const sy = p.y * scale + offsets.y;

    ctx.save();
    ctx.font = font || '10px JetBrains Mono, monospace';
    ctx.fillStyle = fillStyle;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, sx, sy);
    ctx.restore();
  }
}