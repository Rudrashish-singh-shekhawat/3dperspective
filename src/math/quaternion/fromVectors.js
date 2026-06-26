// src/math/quaternion/fromVectors.js
import { dot, cross, normalize } from '../vector';
import { qAxisAngle } from './fromAxisAngle';

/**
 * Calculates the quaternion rotation from vector a to vector b.
 * Gracefully handles the 180-degree edge case where vectors are directly opposing.
 */
export function quatFromVecs(a, b) {
  const d = Math.min(1, Math.max(-1, dot(a, b)));
  if (d > 0.999999) return [0, 0, 0, 1];
  if (d < -0.999999) {
    let ax = normalize([a[1], -a[0], 0]);
    if (Math.hypot(ax[0], ax[1]) < 1e-6) ax = normalize([0, a[2], -a[1]]);
    return qAxisAngle(ax, Math.PI);
  }
  return qAxisAngle(normalize(cross(a, b)), Math.acos(d));
}
