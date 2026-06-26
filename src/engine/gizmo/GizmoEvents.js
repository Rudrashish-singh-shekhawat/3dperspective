// src/engine/gizmo/GizmoEvents.js

/**
 * Gizmo-specific DOM events (hover detection).
 * The original code checks hover inside the global mousemove handler.
 * This module extracts that logic so it can be used independently.
 */
export class GizmoEvents {
  constructor(canvas, gizmo, onHoverChange) {
    this.canvas = canvas;
    this.gizmo = gizmo;
    this.onHoverChange = onHoverChange || (() => {});
    this._bound = false;
  }

  bind() {
    if (this._bound) return;
    this.canvas.addEventListener('mousemove', this._onMouseMove);
    this.canvas.addEventListener('mouseleave', this._onMouseLeave);
    this._bound = true;
  }

  unbind() {
    if (!this._bound) return;
    this.canvas.removeEventListener('mousemove', this._onMouseMove);
    this.canvas.removeEventListener('mouseleave', this._onMouseLeave);
    this._bound = false;
  }

  _onMouseMove = (e) => {
    const rect = this.canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const hovered = this.gizmo.hitTest(x, y);
    this.onHoverChange(hovered);
  };

  _onMouseLeave = () => {
    this.onHoverChange(null);
  };
}