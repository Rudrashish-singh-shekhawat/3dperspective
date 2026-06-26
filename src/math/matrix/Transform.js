// src/math/matrix/Transform.js
import { Matrix4 } from './Matrix4';

/**
 * Creates a 4×4 translation matrix.
 * @param {number} tx - X translation
 * @param {number} ty - Y translation
 * @param {number} tz - Z translation
 * @returns {Matrix4}
 */
export function translation(tx, ty, tz) {
  return new Matrix4([
    1, 0, 0, tx,
    0, 1, 0, ty,
    0, 0, 1, tz,
    0, 0, 0, 1,
  ]);
}

/**
 * Creates a 4×4 scaling matrix.
 * @param {number} sx - X scale
 * @param {number} sy - Y scale
 * @param {number} sz - Z scale
 * @returns {Matrix4}
 */
export function scaling(sx, sy, sz) {
  return new Matrix4([
    sx, 0, 0, 0,
    0, sy, 0, 0,
    0, 0, sz, 0,
    0, 0, 0, 1,
  ]);
}

/**
 * Combines a translation, rotation (as a quaternion), and scale into a single model matrix.
 * This can be used to position objects in the scene.
 *
 * @param {number[]} position - [x, y, z]
 * @param {number[]} quaternion - [x, y, z, w] (normalized)
 * @param {number[]} scale - [sx, sy, sz]
 * @returns {Matrix4}
 */
export function composeTransform(position, quaternion, scale) {
  // Build rotation matrix from quaternion
  const [x, y, z, w] = quaternion;
  const xx = x * x, yy = y * y, zz = z * z;
  const xy = x * y, xz = x * z, yz = y * z;
  const wx = w * x, wy = w * y, wz = w * z;

  const rot = new Matrix4([
    1 - 2 * (yy + zz),     2 * (xy - wz),       2 * (xz + wy),       0,
    2 * (xy + wz),         1 - 2 * (xx + zz),   2 * (yz - wx),       0,
    2 * (xz - wy),         2 * (yz + wx),       1 - 2 * (xx + yy),  0,
    0,                     0,                   0,                   1,
  ]);

  const scaleMat = new Matrix4([
    scale[0], 0, 0, 0,
    0, scale[1], 0, 0,
    0, 0, scale[2], 0,
    0, 0, 0, 1,
  ]);

  const transMat = new Matrix4([
    1, 0, 0, position[0],
    0, 1, 0, position[1],
    0, 0, 1, position[2],
    0, 0, 0, 1,
  ]);

  // Order: translation * rotation * scale (world space)
  return transMat.multiply(rot).multiply(scaleMat);
} 