// src/engine/camera/CameraRotate.js
import { useCameraStore } from './CameraState';
import { arcballVec } from '../canvas/Coordinate';

/**
 * Hook for arcball rotation.
 * Returns functions to start and update rotation.
 * Original logic: on drag start, store prevArcVec; on move, compute new arcball vector,
 * then camera.rotate(prev, cur).
 */
export function useCameraRotate() {
  const rotate = useCameraStore((s) => s.rotate);

  const startRotation = (clientX, clientY, canvasWidth, canvasHeight) => {
    const vec = arcballVec(clientX, clientY, canvasWidth, canvasHeight);
    return vec; // caller stores this as prevVec
  };

  const updateRotation = (prevVec, clientX, clientY, canvasWidth, canvasHeight) => {
    const curVec = arcballVec(clientX, clientY, canvasWidth, canvasHeight);
    rotate(prevVec, curVec);
    return curVec; // new prevVec for next frame
  };

  return { startRotation, updateRotation };
}