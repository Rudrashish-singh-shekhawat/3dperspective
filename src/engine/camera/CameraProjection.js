// src/engine/camera/CameraProjection.js
import { rotateV } from '../../math/quaternion/rotateVector';

/**
 * Projects a 3D world point into screen coordinates using a camera quaternion.
 * The coordinate mapping:
 *   World X → screen right  (x)
 *   World Y → depth (z)     — used for sorting
 *   World Z → screen up     — negated to match canvas Y
 *
 * @param {number} x - World X
 * @param {number} y - World Y (away from viewer)
 * @param {number} z - World Z (up)
 * @param {number[]} quat - Camera orientation quaternion [x, y, z, w]
 * @returns {{ x: number, y: number, z: number }} Screen coordinates
 */
export function project(x, y, z, quat) {
  const p = rotateV([x, y, z], quat);
  return {
    x: p[0],    // horizontal screen position
    y: -p[2],   // vertical screen position (canvas Y goes down)
    z: p[1]     // depth (positive = further from camera)
  };
}