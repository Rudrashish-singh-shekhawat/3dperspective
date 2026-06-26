// src/engine/gizmo/GizmoUtils.js

/**
 * Helper functions for the gizmo.
 */

/**
 * Returns the opposite axis name.
 * e.g. 'X' -> '-X', '-Y' -> 'Y'
 */
export function oppAxis(name) {
  return name.startsWith('-') ? name.slice(1) : '-' + name;
}

/**
 * Sorts a list of axes by their screen depth (z-coordinate) so that
 * axes closer to the viewer are drawn last (painter's algorithm).
 */
export function sortAxesByDepth(axes) {
  return [...axes].sort((a, b) => b.p.z - a.p.z);
}