// src/engine/gizmo/GizmoAnimation.js

/**
 * Handles visual feedback for gizmo interactions (hover, press, snap animations).
 * Currently a placeholder for future expandability; hover effects are handled
 * directly in GizmoRenderer via the hoveredAxis parameter.
 */
export class GizmoAnimation {
  constructor() {
    this.hoverScale = 1.2;
    this.pressScale = 0.9;
  }

  getHandleScale(isHovered, isPressed) {
    if (isPressed) return this.pressScale;
    if (isHovered) return this.hoverScale;
    return 1.0;
  }
}