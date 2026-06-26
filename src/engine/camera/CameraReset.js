// src/engine/camera/CameraReset.js
import { useCameraStore } from './CameraState';

/**
 * Hook that returns a function to reset the camera to its default orientation.
 * The original default is a quaternion combining a rotation around X (45°) and Z (-45°).
 */
export function useCameraReset() {
  const reset = useCameraStore((s) => s.reset);
  return reset;
}