// src/engine/gizmo/GizmoOrientation.js
import { AXIS_VECTORS } from '../../app/Config';
import { rotateV } from '../../math/quaternion/rotateVector';

/**
 * Maps axis names to screen-space positions by applying the camera quaternion.
 * Used by GizmoRenderer to sort axes by depth.
 *
 * @param {number[]} currentQuat - Camera orientation quaternion [x,y,z,w]
 * @returns {Array} Array of objects { name, dir, color, positive, p: {x, y, z} }
 */
export function getScreenAxes(currentQuat) {
  const axes = [
    { name: 'X',  dir: [ 1, 0, 0], color: '#ff3b4d', positive: true },
    { name: 'Y',  dir: [ 0, 1, 0], color: '#5ec940', positive: true },
    { name: 'Z',  dir: [ 0, 0, 1], color: '#3d8eff', positive: true },
    { name: '-X', dir: [-1, 0, 0], color: '#ff8899', positive: false },
    { name: '-Y', dir: [ 0,-1, 0], color: '#a3e07a', positive: false },
    { name: '-Z', dir: [ 0, 0,-1], color: '#8dbeff', positive: false },
  ];

  return axes.map((axis) => {
    const v = rotateV(axis.dir, currentQuat);
    return {
      ...axis,
      p: { x: v[0], y: -v[2], z: v[1] }, // screen Y inverted
    };
  });
}