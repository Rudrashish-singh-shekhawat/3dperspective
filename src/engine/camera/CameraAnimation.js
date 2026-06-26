// src/engine/camera/CameraAnimation.js
import { useCameraStore } from './CameraState';

/**
 * Hook that returns the camera update function.
 * Call this inside the animation loop each frame to smoothly interpolate
 * the current quaternion towards the target and apply spin decay.
 */
export function useCameraAnimation() {
  const update = useCameraStore((s) => s.update);
  return update;
}