// src/engine/canvas/Coordinate.js
import { rotateV } from '../../math/quaternion/rotateVector';

/**
 * Projects a 3D world point onto the 2D canvas using the current camera quaternion.
 * The coordinate system is:
 *   - World X → screen right
 *   - World Y → screen away (depth)
 *   - World Z → screen up
 *
 * After rotation by currentQuat, the returned object is:
 *   x = rotated X (horizontal)
 *   y = -rotated Z (vertical, negated because canvas Y goes down)
 *   z = rotated Y (depth, for sorting)
 */
export function project(x, y, z, currentQuat) {
  const p = rotateV([x, y, z], currentQuat);
  return {
    x: p[0],          // screen X
    y: -p[2],         // screen Y (negated)
    z: p[1]           // depth
  };
}

/**
 * Converts screen coordinates (relative to canvas) to an arcball vector.
 * Assumes the canvas is square and centred. Original arcballVec logic.
 */
export function arcballVec(relativeX, relativeY, canvasWidth, canvasHeight) {
  let x = (relativeX - canvasWidth * 0.5) / (canvasWidth * 0.5);
  let y = -(relativeY - canvasHeight * 0.5) / (canvasHeight * 0.5);
  
  const r2 = x * x + y * y;
  const z_arc = r2 <= 0.5 ? Math.sqrt(1.0 - r2) : 0.5 / Math.sqrt(r2);
  const len = Math.sqrt(x * x + y * y + z_arc * z_arc);
  
  // Map arcball (x:Right, y:Up, z_arc:Front) to Camera Space (X:Right, Y:Away, Z:Up)
  return [x / len, -z_arc / len, y / len];
}