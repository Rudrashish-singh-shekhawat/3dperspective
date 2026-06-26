// src/math/utils/random.js

/**
 * Returns a random floating-point number between min and max (inclusive of min, exclusive of max).
 * @param {number} [min=0]
 * @param {number} [max=1]
 * @returns {number}
 */
export function randomBetween(min = 0, max = 1) {
  return Math.random() * (max - min) + min;
}

/**
 * Returns a random integer between min and max (inclusive of both).
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
export function randomIntBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}