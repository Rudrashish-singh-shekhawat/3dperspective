// src/math/quaternion/toMatrix.js
/**
 * Converts a quaternion to a 3×3 rotation matrix.
 * The matrix is returned as an array of three row arrays.
 * This is the inverse of `quatFromMatrixRows`.
 *
 * @param {number[]} q - Quaternion [x, y, z, w] (normalised)
 * @returns {number[][]} 3×3 rotation matrix [ [m00, m01, m02], [m10, m11, m12], [m20, m21, m22] ]
 */
export function quatToMatrix(q) {
  const [x, y, z, w] = q;
  const xx = x * x, yy = y * y, zz = z * z;
  const xy = x * y, xz = x * z, yz = y * z;
  const wx = w * x, wy = w * y, wz = w * z;

  return [
    [1 - 2 * (yy + zz),     2 * (xy - wz),       2 * (xz + wy)],
    [2 * (xy + wz),         1 - 2 * (xx + zz),   2 * (yz - wx)],
    [2 * (xz - wy),         2 * (yz + wx),       1 - 2 * (xx + yy)],
  ];
}