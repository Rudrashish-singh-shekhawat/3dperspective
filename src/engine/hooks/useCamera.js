// src/engine/hooks/useCamera.js
import { useCameraStore } from '../camera/CameraState';

/**
 * Hook that provides camera state and controls for React components.
 * Wraps the Zustand camera store with convenience functions.
 */
export function useCamera() {
  const currentQuat = useCameraStore((s) => s.currentQuat);
  const targetQuat = useCameraStore((s) => s.targetQuat);
  const scale = useCameraStore((s) => s.scale);
  const panX = useCameraStore((s) => s.panX);
  const panY = useCameraStore((s) => s.panY);
  const isSnapping = useCameraStore((s) => s.isSnapping);

  const rotate = useCameraStore((s) => s.rotate);
  const roll = useCameraStore((s) => s.roll);
  const pan = useCameraStore((s) => s.pan);
  const zoom = useCameraStore((s) => s.zoom);
  const update = useCameraStore((s) => s.update);
  const reset = useCameraStore((s) => s.reset);
  const snapToAxis = useCameraStore((s) => s.snapToAxis);
  const snapOpposite = useCameraStore((s) => s.snapOpposite);
  const project = useCameraStore((s) => s.project);

  return {
    // State
    currentQuat,
    targetQuat,
    scale,
    panX,
    panY,
    isSnapping,
    // Actions
    rotate,
    roll,
    pan,
    zoom,
    update,
    reset,
    snapToAxis,
    snapOpposite,
    project,
  };
}