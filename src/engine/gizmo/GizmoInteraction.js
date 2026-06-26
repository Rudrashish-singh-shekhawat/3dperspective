// src/engine/gizmo/GizmoInteraction.js

/**
 * Handles hit testing for the gizmo axis handles.
 * Used to determine which axis the pointer is hovering over.
 */
export class GizmoInteraction {
  constructor(canvas, camera) {
    this.canvas = canvas;
    this.camera = camera;
    this.gizmoMargin = 70; // same as GizmoRenderer
  }

  /**
   * Test if a screen point (relative to canvas) hits any axis handle.
   * @param {number} clientX - pointer X relative to canvas
   * @param {number} clientY - pointer Y relative to canvas
   * @param {Array} clickableAxes - array of { name, x, y, r }
   * @returns {string|null} axis name if hit, else null
   */
  hitTest(clientX, clientY, clickableAxes) {
    // Check if near gizmo at all
    if (!this.isNearGizmo(clientX, clientY)) return null;

    // Check each axis handle (iterate in reverse for front-to-back)
    for (let i = clickableAxes.length - 1; i >= 0; i--) {
      const axis = clickableAxes[i];
      const dx = clientX - axis.x;
      const dy = clientY - axis.y;
      if (dx * dx + dy * dy <= axis.r * axis.r) {
        return axis.name;
      }
    }
    return null;
  }

  /**
   * Returns true if the pointer is within the gizmo's bounding circle.
   * @param {number} clientX - pointer X relative to canvas
   * @param {number} clientY - pointer Y relative to canvas
   * @returns {boolean}
   */
  isNearGizmo(clientX, clientY) {
    const cx = this.canvas.width - this.gizmoMargin;
    const cy = this.gizmoMargin;
    const dist = Math.hypot(clientX - cx, clientY - cy);
    return dist < 65; // original: distToGizmo < 65
  }
}