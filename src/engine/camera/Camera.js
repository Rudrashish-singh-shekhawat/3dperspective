// src/engine/camera/Camera.js
import { qNorm, qMul, qSlerp, qAxisAngle, qConj } from '../../math/quaternion';
import { rotateV } from '../../math/quaternion/rotateVector';
import { dot, cross, normalize } from '../../math/vector';
import { AXIS_VECTORS } from '../../app/Config';
import { quatFromMatrixRows } from '../../math/quaternion/fromMatrix';

export class Camera {
  constructor() {
    // Default orientation from original: qMul(qAxisAngle([1,0,0], PI/4), qAxisAngle([0,0,1], -PI/4))
    const q1 = qAxisAngle([1, 0, 0], Math.PI / 4);
    const q2 = qAxisAngle([0, 0, 1], -Math.PI / 4);
    this.targetQuat = qNorm(qMul(q1, q2));
    this.currentQuat = [...this.targetQuat];

    this.scale = 1.2;
    this.panX = 0;
    this.panY = 0;

    // Spin momentum
    this.spinAngle = 0;
    this.spinAxis = [1, 0, 0];
    this.friction = 0.94;

    // Snapping
    this.isSnapping = false;
    this.lastFront = '';
    this.lastUp = '';
  }

  reset() {
    const q1 = qAxisAngle([1, 0, 0], Math.PI / 4);
    const q2 = qAxisAngle([0, 0, 1], -Math.PI / 4);
    this.targetQuat = qNorm(qMul(q1, q2));
    this.isSnapping = true;
    this.spinAngle = 0;
  }

  // Project a world point to screen coordinates
  project(x, y, z) {
    const p = rotateV([x, y, z], this.currentQuat);
    return { x: p[0], y: -p[2], z: p[1] };
  }

  // Rotate using arcball vector pair
  rotate(prevArcVec, curArcVec) {
    const angle = Math.acos(Math.max(-1, Math.min(1, dot(prevArcVec, curArcVec))));
    if (angle < 0.001) return;
    const camAxis = normalize(cross(prevArcVec, curArcVec));
    const qRot = qAxisAngle(camAxis, angle);
    this.targetQuat = qNorm(qMul(qRot, this.targetQuat));
    this.spinAxis = camAxis;
    this.spinAngle = angle;
  }

  // Roll around camera's own forward axis
  roll(deltaX) {
    const qRoll = qAxisAngle([0, 1, 0], deltaX * 0.008);
    this.targetQuat = qNorm(qMul(qRoll, this.targetQuat));
    this.spinAngle = 0;
  }

  // Pan
  pan(dx, dy) {
    this.panX += dx;
    this.panY += dy;
  }

  // Zoom
  zoom(deltaY) {
    this.scale *= Math.exp((deltaY < 0 ? 1 : -1) * 0.05);
  }

  // Update camera interpolation (called each frame)
  update() {
    // Spin momentum
    if (this.spinAngle > 0.001) {
      this.spinAngle *= this.friction;
      this.targetQuat = qNorm(qMul(qAxisAngle(this.spinAxis, this.spinAngle), this.targetQuat));
    }

    // Ensure consistent sign for slerp
    if (dot(this.currentQuat, this.targetQuat) < 0) {
      this.targetQuat = [-this.targetQuat[0], -this.targetQuat[1], -this.targetQuat[2], -this.targetQuat[3]];
    }
    this.currentQuat = qNorm(qSlerp(this.currentQuat, this.targetQuat, 0.15));

    const d = Math.abs(dot(this.currentQuat, this.targetQuat));
    if (this.isSnapping && d > 0.99999) {
      this.currentQuat = [...this.targetQuat];
      this.isSnapping = false;
    }
  }

  // Get strict orientation (which axis is front/up)
  getOrientation() {
    return getStrictOrientation(this.currentQuat, this.lastFront, this.lastUp);
  }

  // Snap to a specific axis
  snapToAxis(targetFaceName) {
    snapToAxis(this, targetFaceName);
  }

  // Snap to opposite face
  snapOpposite() {
    const { front } = this.getOrientation();
    const opp = front.startsWith('-') ? front.slice(1) : '-' + front;
    this.snapToAxis(opp);
  }
}

// Helper: determine which world axis faces the viewer
function getStrictOrientation(q, prevFront = '', prevUp = '') {
  const invQ = qConj(q);
  const faceNormal = rotateV([0, -1, 0], invQ); // face pointing towards viewer
  const camUp = rotateV([0, 0, 1], invQ);      // screen UP

  let bestFront = 'Z', maxFrontDot = -Infinity;
  for (const [name, v] of Object.entries(AXIS_VECTORS)) {
    const bias = name === prevFront ? 0.02 : 0;
    const d = dot(faceNormal, v) + bias;
    if (d > maxFrontDot) { maxFrontDot = d; bestFront = name; }
  }

  let bestUp = 'Y', maxUpDot = -Infinity;
  const oppFront = bestFront.startsWith('-') ? bestFront.slice(1) : '-' + bestFront;
  for (const [name, v] of Object.entries(AXIS_VECTORS)) {
    if (name === bestFront || name === oppFront) continue;
    const bias = name === prevUp ? 0.02 : 0;
    const d = dot(camUp, v) + bias;
    if (d > maxUpDot) { maxUpDot = d; bestUp = name; }
  }
  return { front: bestFront, up: bestUp };
}

// Snap the camera's target quaternion to a face
function snapToAxis(cam, targetFaceName) {
  const current = getStrictOrientation(cam.currentQuat, cam.lastFront, cam.lastUp);
  if (current.front === targetFaceName) return;

  const F_current = AXIS_VECTORS[current.front];
  const F_target = AXIS_VECTORS[targetFaceName];
  const U_current = AXIS_VECTORS[current.up];

  const d = dot(F_current, F_target);
  let qRot;
  if (Math.abs(d) < 0.999) {
    const angle = Math.acos(Math.max(-1, Math.min(1, d)));
    const axis = normalize(cross(F_current, F_target));
    qRot = qAxisAngle(axis, angle);
  } else if (d < -0.999) {
    qRot = qAxisAngle(normalize([...U_current]), Math.PI);
  } else {
    return;
  }

  const newUpRaw = rotateV(U_current, qRot);
  let U_target = [0, 0, 1];
  let maxDot = -Infinity;
  for (const [, v] of Object.entries(AXIS_VECTORS)) {
    const dd = dot(v, newUpRaw);
    if (dd > maxDot) { maxDot = dd; U_target = [...v]; }
  }

  const camAway = [-F_target[0], -F_target[1], -F_target[2]];
  const R_target = normalize(cross(camAway, U_target));

  cam.targetQuat = qNorm(quatFromMatrixRows(R_target, camAway, U_target));
  cam.isSnapping = true;
  cam.spinAngle = 0;
}