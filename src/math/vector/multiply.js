// src/math/vector/multiply.js
/**
 * Multiply a vector by a scalar, or multiply two vectors component-wise.
 * If b is a number, returns scalar multiplication.
 * If b is an array, returns component-wise product.
 * @param {number[]} a
 * @param {number[]|number} b
 * @returns {number[]}
 */
export function multiply(a, b) {
  if (typeof b === 'number') {
    return [a[0] * b, a[1] * b, a[2] * b];
  }
  return [a[0] * b[0], a[1] * b[1], a[2] * b[2]];
}