// src/engine/renderer/LineRenderer.js
import { project } from '../camera/CameraProjection';

/**
 * Renders a single line segment between two 3D world-space points.
 */
export class LineRenderer {
  draw(ctx, scale, x1, y1, z1, x2, y2, z2, strokeStyle, lineWidth, currentQuat) {
    const p1 = project(x1, y1, z1, currentQuat);
    const p2 = project(x2, y2, z2, currentQuat);

    ctx.beginPath();
    ctx.moveTo(p1.x * scale, p1.y * scale);
    ctx.lineTo(p2.x * scale, p2.y * scale);
    ctx.strokeStyle = strokeStyle;
    ctx.lineWidth = lineWidth;
    ctx.stroke();
  }
}