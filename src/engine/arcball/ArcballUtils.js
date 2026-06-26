// src/engine/arcball/ArcballUtils.js

/**
 * Clamps a value between min and max.
 */
export function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

/**
 * Returns the sign of a number: 1 for positive, -1 for negative, 0 for zero.
 */
export function sign(value) {
  return value > 0 ? 1 : value < 0 ? -1 : 0;
}