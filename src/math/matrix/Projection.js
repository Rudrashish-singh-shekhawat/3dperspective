// src/math/matrix/Projection.js
import { Matrix4 } from './Matrix4';

/**
 * Builds a 4×4 orthographic projection matrix.
 * This can be used if the renderer ever switches from manual quaternion projection
 * to a matrix‑based pipeline (e.g. WebGL).
 *
 * The original code uses `scale` and `panX`/`panY` in a 2D canvas translation,
 * which is equivalent to an orthographic projection with a certain frustum.
 * This helper replicates that logic in matrix form.
 *
 * @param {number} left - Left edge of the view volume
 * @param {number} right - Right edge
 * @param {number} bottom - Bottom edge
 * @param {number} top - Top edge
 * @param {number} near - Near clipping plane
 * @param {number} far - Far clipping plane
 * @returns {Matrix4}
 */
export function createOrthographic(left, right, bottom, top, near, far) {
  const m = new Matrix4();
  const rl = 1 / (right - left);
  const tb = 1 / (top - bottom);
  const fn = 1 / (far - near);

  m.set(0, 0, 2 * rl);
  m.set(1, 1, 2 * tb);
  m.set(2, 2, -2 * fn);
  m.set(0, 3, -(right + left) * rl);
  m.set(1, 3, -(top + bottom) * tb);
  m.set(2, 3, -(far + near) * fn);
  m.set(3, 3, 1);

  return m;
}

/**
 * Builds a perspective projection matrix.
 * Not used by the original 2D canvas renderer but available for future WebGL features.
 *
 * @param {number} fov - Field of view in radians
 * @param {number} aspect - Aspect ratio (width / height)
 * @param {number} near - Near clipping plane
 * @param {number} far - Far clipping plane
 * @returns {Matrix4}
 */
export function createPerspective(fov, aspect, near, far) {
  const f = 1.0 / Math.tan(fov / 2);
  const nf = 1 / (near - far);
  const m = new Matrix4();

  m.set(0, 0, f / aspect);
  m.set(1, 1, f);
  m.set(2, 2, (far + near) * nf);
  m.set(2, 3, 2 * far * near * nf);
  m.set(3, 2, -1);
  m.set(3, 3, 0);

  return m;
}