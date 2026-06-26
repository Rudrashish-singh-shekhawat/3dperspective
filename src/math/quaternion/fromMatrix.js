// src/math/quaternion/fromMatrix.js
/**
 * Creates a quaternion from the three rows of a 3×3 rotation matrix.
 * Original: function quatFromMatrixRows(r0, r1, r2)
 * @param {number[]} r0 - First row of the rotation matrix [m00, m01, m02]
 * @param {number[]} r1 - Second row [m10, m11, m12]
 * @param {number[]} r2 - Third row [m20, m21, m22]
 * @returns {number[]} Normalised quaternion [x, y, z, w]
 */
export function quatFromMatrixRows(r0, r1, r2) {
  const tr = r0[0] + r1[1] + r2[2];
  let x, y, z, w;

  if (tr > 0) {
    const s = Math.sqrt(tr + 1.0) * 2;
    w = 0.25 * s;
    x = (r2[1] - r1[2]) / s;
    y = (r0[2] - r2[0]) / s;
    z = (r1[0] - r0[1]) / s;
  } else if (r0[0] > r1[1] && r0[0] > r2[2]) {
    const s = Math.sqrt(1.0 + r0[0] - r1[1] - r2[2]) * 2;
    w = (r2[1] - r1[2]) / s;
    x = 0.25 * s;
    y = (r0[1] + r1[0]) / s;
    z = (r2[0] + r0[2]) / s;
  } else if (r1[1] > r2[2]) {
    const s = Math.sqrt(1.0 + r1[1] - r0[0] - r2[2]) * 2;
    w = (r0[2] - r2[0]) / s;
    x = (r0[1] + r1[0]) / s;
    y = 0.25 * s;
    z = (r1[2] + r2[1]) / s;
  } else {
    const s = Math.sqrt(1.0 + r2[2] - r0[0] - r1[1]) * 2;
    w = (r1[0] - r0[1]) / s;
    x = (r2[0] + r0[2]) / s;
    y = (r1[2] + r2[1]) / s;
    z = 0.25 * s;
  }

  // Normalise (original code calls qNorm on the result)
  const len = Math.sqrt(x * x + y * y + z * z + w * w);
  return len < 1e-10 ? [0, 0, 0, 1] : [x / len, y / len, z / len, w / len];
}