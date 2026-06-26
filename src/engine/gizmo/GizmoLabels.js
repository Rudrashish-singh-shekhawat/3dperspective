// src/engine/gizmo/GizmoLabels.js

/**
 * Draws the axis labels (e.g., +X, −Y) next to the gizmo handles.
 * Extracted from GizmoRenderer for clarity.
 */
export class GizmoLabels {
  draw(ctx, px, py, axis, isHovered) {
    ctx.fillStyle = axis.positive ? '#ffffff' : '#ffffffaa';
    ctx.font = axis.positive
      ? "bold 10px 'SF Mono', monospace"
      : "8px 'SF Mono', monospace";
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(axis.label ?? axis.name, px, py + (axis.positive ? 0.5 : 0));
  }
}

