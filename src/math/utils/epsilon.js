// src/math/utils/epsilon.js

/**
 * A small value used for floating-point comparisons.
 * Any difference smaller than this is considered zero.
 */
export const EPSILON = 1e-8;

/**
 * Checks if a value is effectively zero within EPSILON.
 * @param {number} value
 * @returns {boolean}
 */
export function isZero(value) {
  return Math.abs(value) < EPSILON;
}

/**
 * Checks if two numbers are equal within EPSILON.
 * @param {number} a
 * @param {number} b
 * @returns {boolean}
 */
export function approxEqual(a, b) {
  return Math.abs(a - b) < EPSILON;
}