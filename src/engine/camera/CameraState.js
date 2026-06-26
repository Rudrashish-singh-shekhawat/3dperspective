// src/engine/camera/CameraState.js
import { create } from 'zustand';
import { qNorm, qMul, qSlerp, qAxisAngle, qConj, quatFromVecs } from '../../math/quaternion';
import { rotateV } from '../../math/quaternion/rotateVector';
import { dot, cross, normalize } from '../../math/vector';
import { AXIS_VECTORS } from '../../app/Config';
import { quatFromMatrixRows } from '../../math/quaternion/fromMatrix';

const q1 = qAxisAngle([1, 0, 0], Math.PI / 4);
const q2 = qAxisAngle([0, 0, 1], -Math.PI / 4);
const DEFAULT_QUAT = qNorm(qMul(q1, q2));

export const useCameraStore = create((set, get) => ({
  currentQuat: [...DEFAULT_QUAT],
  targetQuat: [...DEFAULT_QUAT],
  scale: 1.2,
  panX: 0,
  panY: 0,
  isSnapping: false,
  spinAngle: 0,
  spinAxis: [1, 0, 0],
  lastFront: '',
  lastUp: '',

  // ---------- actions ----------
  setSnapping: (value) => set({ isSnapping: value }),
  setSpinAngle: (value) => set({ spinAngle: value }),

  project: (x, y, z) => {
    const p = rotateV([x, y, z], get().currentQuat);
    return { x: p[0], y: -p[2], z: p[1] };
  },

  rotate: (prevVec, curVec) => {
    const qRot = quatFromVecs(prevVec, curVec);
    // Extract angle for spin inertia
    const angle = 2 * Math.acos(Math.min(1, Math.max(-1, qRot[3])));
    if (angle < 0.001) return;
    const s = Math.sqrt(1 - qRot[3] * qRot[3]);
    const camAxis = s < 0.001 ? [1, 0, 0] : [qRot[0] / s, qRot[1] / s, qRot[2] / s];

    set((state) => ({
      targetQuat: qNorm(qMul(qRot, state.targetQuat)),
      spinAxis: camAxis,
      spinAngle: angle,
    }));
  },

  roll: (deltaX) => {
    // Roll around true camera forward (which maps to [0, -1, 0] in our world due to Coordinate mapping)
    const state = get();
    const invQ = qConj(state.targetQuat);
    const camForward = rotateV([0, -1, 0], invQ);
    const qRoll = qAxisAngle(camForward, deltaX * 0.008);
    set((state) => ({
      targetQuat: qNorm(qMul(qRoll, state.targetQuat)),
      spinAngle: 0,
    }));
  },

  pan: (dx, dy) => set((state) => ({
    panX: state.panX + dx,
    panY: state.panY + dy,
  })),

  zoom: (deltaY) => set((state) => ({
    scale: state.scale * Math.exp((deltaY < 0 ? 1 : -1) * 0.05),
  })),

  update: () => {
    const state = get();
    let target = state.targetQuat;
    let spin = state.spinAngle;

    if (spin > 0.001) {
      spin *= 0.94;
      target = qNorm(qMul(qAxisAngle(state.spinAxis, spin), target));
    }

    if (dot(state.currentQuat, target) < 0) {
      target = [-target[0], -target[1], -target[2], -target[3]];
    }

    const newQuat = qNorm(qSlerp(state.currentQuat, target, 0.15));
    const d = Math.abs(dot(newQuat, target));
    const snapping = state.isSnapping && d > 0.99999 ? false : state.isSnapping;

    set({
      currentQuat: newQuat,
      targetQuat: target,
      spinAngle: spin,
      isSnapping: snapping,
    });
  },

  reset: () => set({
    targetQuat: [...DEFAULT_QUAT],
    isSnapping: true,
    spinAngle: 0,
  }),

  snapToAxis: (targetFaceName) => {
    const { currentQuat, lastFront, lastUp } = get();
    const invQ = qConj(currentQuat);
    const faceNormal = rotateV([0, -1, 0], invQ);
    const camUp = rotateV([0, 0, 1], invQ);

    let bestFront = 'Z', maxFrontDot = -Infinity;
    for (const [name, v] of Object.entries(AXIS_VECTORS)) {
      const bias = name === lastFront ? 0.02 : 0;
      const d = dot(faceNormal, v) + bias;
      if (d > maxFrontDot) { maxFrontDot = d; bestFront = name; }
    }

    let bestUp = 'Y', maxUpDot = -Infinity;
    const oppFront = bestFront.startsWith('-') ? bestFront.slice(1) : '-' + bestFront;
    for (const [name, v] of Object.entries(AXIS_VECTORS)) {
      if (name === bestFront || name === oppFront) continue;
      const bias = name === lastUp ? 0.02 : 0;
      const d = dot(camUp, v) + bias;
      if (d > maxUpDot) { maxUpDot = d; bestUp = name; }
    }

    if (bestFront === targetFaceName) return;

    const F_current = AXIS_VECTORS[bestFront];
    const F_target = AXIS_VECTORS[targetFaceName];
    const U_current = AXIS_VECTORS[bestUp];

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
    const newTargetQuat = qNorm(quatFromMatrixRows(R_target, camAway, U_target));

    set({
      targetQuat: newTargetQuat,
      isSnapping: true,
      spinAngle: 0,
      lastFront: targetFaceName,
      lastUp: bestUp,
    });
  },

  snapOpposite: () => {
    const { currentQuat, lastFront, lastUp } = get();
    const invQ = qConj(currentQuat);
    const faceNormal = rotateV([0, -1, 0], invQ);
    let bestFront = 'Z', maxFrontDot = -Infinity;
    for (const [name, v] of Object.entries(AXIS_VECTORS)) {
      const bias = name === lastFront ? 0.02 : 0;
      const d = dot(faceNormal, v) + bias;
      if (d > maxFrontDot) { maxFrontDot = d; bestFront = name; }
    }
    const opp = bestFront.startsWith('-') ? bestFront.slice(1) : '-' + bestFront;
    get().snapToAxis(opp);
  },
}));