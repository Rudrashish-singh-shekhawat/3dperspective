// src/engine/hooks/useViewport.js
import { useCallback } from 'react';
import { useCameraStore } from '../camera/CameraState';

/**
 * Hook that provides viewport state (zoom, pan) and direct setters.
 * In the original code, scale, panX, panY are stored on the camera object.
 * This hook exposes them for components that need to read or modify the viewport.
 */
export function useViewport() {
  const scale = useCameraStore((s) => s.scale);
  const panX = useCameraStore((s) => s.panX);
  const panY = useCameraStore((s) => s.panY);
  const zoom = useCameraStore((s) => s.zoom);   // multiplicative zoom step
  const pan = useCameraStore((s) => s.pan);     // additive pan step

  // Directly set scale (e.g. from a slider)
  const setScale = useCallback((newScale) => {
    useCameraStore.setState((prev) => ({
      camera: { ...prev.camera, scale: newScale },
    }));
  }, []);

  // Directly set pan offsets
  const setPan = useCallback((newPanX, newPanY) => {
    useCameraStore.setState((prev) => ({
      camera: { ...prev.camera, panX: newPanX, panY: newPanY },
    }));
  }, []);

  return { scale, panX, panY, zoom, pan, setScale, setPan };
}