// src/math/quaternion/slerp.js
import { qNorm } from './normalize';

/**
 * Spherical linear interpolation between two quaternions.
 * Original: function qSlerp(a, b, t)
 * @param {number[]} a - Start quaternion [x, y, z, w]
 * @param {number[]} b - End quaternion [x, y, z, w]
 * @param {number} t - Interpolation factor (0 to 1)
 * @returns {number[]} Interpolated quaternion
 */
export function qSlerp(a, b, t) {
  let [ax, ay, az, aw] = a;
  let [bx, by, bz, bw] = b;

  // Compute the cosine of the angle between the two quaternions
  let d = ax * bx + ay * by + az * bz + aw * bw;

  // If negative, take the opposite hemisphere to get the shorter path
  if (d < 0) {
    bx = -bx;
    by = -by;
    bz = -bz;
    bw = -bw;
    d = -d;
  }

  // If they are nearly identical, use linear interpolation to avoid division by zero
  if (d > 0.9995) {
    return qNorm([
      ax + t * (bx - ax),
      ay + t * (by - ay),
      az + t * (bz - az),
      aw + t * (bw - aw),
    ]);
  }

  // Standard slerp
  const th0 = Math.acos(d);
  const sinTh = Math.sin(th0);
  const s0 = Math.sin((1 - t) * th0) / sinTh;
  const s1 = Math.sin(t * th0) / sinTh;

  return [
    ax * s0 + bx * s1,
    ay * s0 + by * s1,
    az * s0 + bz * s1,
    aw * s0 + bw * s1,
  ];
}