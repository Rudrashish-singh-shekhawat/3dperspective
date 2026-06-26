// src/engine/gizmo/GizmoHitTest.js

/**
 * Checks if a point (px, py) is inside a circle at (cx, cy) with radius r.
 * Useful for hit‑testing gizmo handles and other circular interactive elements.
 * 
 * @param {number} px - pointer x
 * @param {number} py - pointer y
 * @param {number} cx - circle centre x
 * @param {number} cy - circle centre y
 * @param {number} r  - circle radius
 * @returns {boolean}
 */
export function pointInCircle(px, py, cx, cy, r) {
  const dx = px - cx;
  const dy = py - cy;
  return dx * dx + dy * dy <= r * r;
}