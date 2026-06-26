// src/math/utils/degrees.js

/**
 * Converts an angle from radians to degrees.
 * @param {number} radians
 * @returns {number}
 */
export function degrees(radians) {
  return radians * (180 / Math.PI);
}