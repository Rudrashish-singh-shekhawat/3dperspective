// src/engine/arcball/ArcballMath.js
import { normalize } from '../../math/vector/normalize';
import { cross } from '../../math/vector/cross';
import { dot } from '../../math/vector/dot';

/**
 * Pure math functions for arcball rotation.
 * Original code from arcballVec and quatFromVecs.
 */
export class ArcballMath {
  /**
   * Map screen coordinates to a unit vector on the arcball sphere.
   * Adapted from original arcballVec function.
   */
  arcballVec(clientX, clientY, canvasWidth, canvasHeight) {
    const cx = canvasWidth * 0.5;
    const cy = canvasHeight * 0.5;
    const r = Math.min(cx, cy);
    let x = (clientX - cx) / r;
    let y = -(clientY - cy) / r; // invert Y

    const r2 = x * x + y * y;
    const z = r2 <= 0.5 ? Math.sqrt(1.0 - r2) : 0.5 / Math.sqrt(r2);
    const len = Math.sqrt(x * x + y * y + z * z);

    // Convert arcball space (X=Right, Y=Up, Z=Front) to camera space (X=Right, Y=Away, Z=Up)
    return [x / len, -z / len, y / len];
  }

  /**
   * Compute a quaternion that rotates from vector a to vector b.
   * Original function quatFromVecs.
   */
  quatFromVecs(a, b) {
    const d = Math.min(1, Math.max(-1, dot(a, b)));
    if (d > 0.999999) return [0, 0, 0, 1];
    if (d < -0.999999) {
      let axis = normalize([a[1], -a[0], 0]);
      if (Math.hypot(axis[0], axis[1]) < 1e-6) {
        axis = normalize([0, a[2], -a[1]]);
      }
      return this.qAxisAngle(axis, Math.PI);
    }
    return this.qAxisAngle(normalize(cross(a, b)), Math.acos(d));
  }

  /**
   * Quaternion from axis and angle.
   */
  qAxisAngle(axis, angle) {
    const h = angle * 0.5;
    const s = Math.sin(h);
    const c = Math.cos(h);
    return [axis[0] * s, axis[1] * s, axis[2] * s, c];
  }
}