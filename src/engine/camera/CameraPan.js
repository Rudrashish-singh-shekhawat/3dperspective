// src/engine/camera/CameraPan.js
import { useCameraStore } from './CameraState';

/**
 * Hook for panning the camera view.
 * Returns a handler that applies delta panning.
 * Original behaviour: right-mouse drag pans, increment panX/panY.
 */
export function useCameraPan() {
  const pan = useCameraStore((s) => s.pan);

  const handlePan = (dx, dy) => {
    pan(dx, dy);
  };

  return handlePan;
}