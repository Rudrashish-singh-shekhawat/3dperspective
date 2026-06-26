// src/engine/camera/CameraZoom.js
import { useCameraStore } from './CameraState';

/**
 * Hook for zooming the camera view.
 * Original behaviour: scroll wheel calls camera.zoom(deltaY).
 */
export function useCameraZoom() {
  const zoom = useCameraStore((s) => s.zoom);

  const handleZoom = (deltaY) => {
    zoom(deltaY);
  };

  return handleZoom;
}