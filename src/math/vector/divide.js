// src/math/vector/divide.js
/**
 * Divide a vector by a scalar, or divide two vectors component-wise.
 * If b is a number, returns scalar division.
 * If b is an array, returns component-wise division.
 * @param {number[]} a
 * @param {number[]|number} b
 * @returns {number[]}
 */
export function divide(a, b) {
  if (typeof b === 'number') {
    return [a[0] / b, a[1] / b, a[2] / b];
  }
  return [a[0] / b[0], a[1] / b[1], a[2] / b[2]];
}