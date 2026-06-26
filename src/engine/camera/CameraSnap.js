// src/engine/camera/CameraSnap.js
import { useCameraStore } from './CameraState';

/**
 * Hook for snapping the camera to axis-aligned views.
 * Original behaviour: key presses 1-6 snap to ±X, ±Y, ±Z; right-click snaps to opposite face;
 * pressing R resets to default orientation.
 */
export function useCameraSnap() {
  const snapToAxis = useCameraStore((s) => s.snapToAxis);
  const snapOpposite = useCameraStore((s) => s.snapOpposite);
  const reset = useCameraStore((s) => s.reset);

  const handleKeyDown = (e) => {
    const map = {
      '1': 'X',
      '2': 'Y',
      '3': 'Z',
      '4': '-X',
      '5': '-Y',
      '6': '-Z',
    };
    if (map[e.key]) {
      snapToAxis(map[e.key]);
      e.preventDefault();
    }
    if (e.key.toLowerCase() === 'r') {
      reset();
      e.preventDefault();
    }
  };

  const handleContextMenu = (e) => {
    e.preventDefault();
    snapOpposite();
  };

  return { handleKeyDown, handleContextMenu };
}