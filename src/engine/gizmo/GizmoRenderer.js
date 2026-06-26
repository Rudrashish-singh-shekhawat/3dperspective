// src/engine/gizmo/GizmoRenderer.js
import { AXES } from '../../app/Config';
import { rotateV } from '../../math/quaternion/rotateVector';

const GIZMO_RADIUS = 45;
const AXIS_LENGTH = 35;

/**
 * Draws the axis handles gizmo in screen space (bottom‑right corner).
 * Replicates the original drawGizmo() function.
 */
export class GizmoRenderer {
  draw(ctx, w, h, currentQuat, hoveredAxis, clickableAxes) {
    const cx = w - 70; // gizmoMargin = 70
    const cy = 70;

    // Reset clickable axis list
    clickableAxes.length = 0;

    // Background circle
    ctx.beginPath();
    ctx.arc(cx, cy, GIZMO_RADIUS, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.02)';
    ctx.fill();
    ctx.beginPath();
    ctx.arc(cx, cy, GIZMO_RADIUS, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.lineWidth = 1;
    ctx.stroke();

    // Project all axes to screen
    const points = AXES.map((axis) => {
      const v = rotateV(axis.dir, currentQuat);
      return {
        ...axis,
        p: { x: v[0], y: -v[2], z: v[1] }, // screen coordinates
      };
    }).sort((a, b) => b.p.z - a.p.z); // sort by depth

    const drawList = (list) => {
      list.forEach((axis) => {
        const px = cx + axis.p.x * AXIS_LENGTH;
        const py = cy + axis.p.y * AXIS_LENGTH;
        const radius = axis.positive ? 10 : 8;
        const color = axis.color;
        const name = axis.name;

        // Line from centre to handle
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(px, py);
        ctx.strokeStyle = color;
        ctx.globalAlpha = axis.positive ? 1 : 0.4;
        ctx.lineWidth = axis.positive ? 2 : 1;
        ctx.stroke();
        ctx.globalAlpha = 1;

        clickableAxes.push({ name: name, x: px, y: py, r: radius });
        const isActive = hoveredAxis === name;

        if (isActive) {
          ctx.beginPath();
          ctx.arc(px, py, radius + 4, 0, Math.PI * 2);
          ctx.fillStyle = color;
          ctx.shadowColor = color;
          ctx.shadowBlur = 10;
          ctx.fill();
          ctx.shadowBlur = 0;
        }

        ctx.beginPath();
        ctx.arc(px, py, radius, 0, Math.PI * 2);
        ctx.fillStyle = axis.positive ? color : "#222220";
        ctx.strokeStyle = axis.positive ? "#0e0e0d" : color;
        ctx.lineWidth = 1.5;
        if (axis.positive || isActive) { 
          ctx.fill(); 
        } else { 
          ctx.fill(); 
          ctx.stroke(); 
        }

        ctx.fillStyle = axis.positive ? "#0e0e0d" : color;
        if (isActive && !axis.positive) ctx.fillStyle = "#0e0e0d";

        ctx.font = "600 9px 'JetBrains Mono', monospace";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(name.replace("-", ""), px, py + 0.5);
      });
    };

    // Draw back-facing axes (Z >= 0) first, then front-facing (Z < 0) for correct occlusion
    drawList(points.filter((p) => p.p.z >= 0));
    drawList(points.filter((p) => p.p.z < 0));
  }
}