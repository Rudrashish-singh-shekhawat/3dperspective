// src/math/vector/project.js
import { dot } from './dot';
import { multiply } from './multiply';

/**
 * Project vector a onto vector b.
 * Returns the component of a in the direction of b.
 * @param {number[]} a - The vector to project.
 * @param {number[]} b - The vector to project onto.
 * @returns {number[]} The projected vector.
 */
export function project(a, b) {
  const bLenSq = dot(b, b);
  if (bLenSq === 0) return [0, 0, 0];
  const scalar = dot(a, b) / bLenSq;
  return multiply(b, scalar);
}