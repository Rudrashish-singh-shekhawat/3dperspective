// src/math/matrix/Rotation.js
import { Matrix4 } from './Matrix4';

/**
 * Returns a 4×4 rotation matrix about the X axis.
 * @param {number} angle - Rotation angle in radians
 * @returns {Matrix4}
 */
export function rotationX(angle) {
  const c = Math.cos(angle);
  const s = Math.sin(angle);
  return new Matrix4([
    1, 0, 0, 0,
    0, c, s, 0,
    0, -s, c, 0,
    0, 0, 0, 1,
  ]);
}

/**
 * Returns a 4×4 rotation matrix about the Y axis.
 * @param {number} angle - Rotation angle in radians
 * @returns {Matrix4}
 */
export function rotationY(angle) {
  const c = Math.cos(angle);
  const s = Math.sin(angle);
  return new Matrix4([
    c, 0, -s, 0,
    0, 1, 0, 0,
    s, 0, c, 0,
    0, 0, 0, 1,
  ]);
}

/**
 * Returns a 4×4 rotation matrix about the Z axis.
 * @param {number} angle - Rotation angle in radians
 * @returns {Matrix4}
 */
export function rotationZ(angle) {
  const c = Math.cos(angle);
  const s = Math.sin(angle);
  return new Matrix4([
    c, s, 0, 0,
    -s, c, 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 1,
  ]);
}