// src/engine/camera/CameraController.js
import { useCameraStore } from './CameraState';

export function useCameraController() {
  const rotate = useCameraStore((s) => s.rotate);
  const roll = useCameraStore((s) => s.roll);
  const pan = useCameraStore((s) => s.pan);
  const zoom = useCameraStore((s) => s.zoom);
  const reset = useCameraStore((s) => s.reset);
  const snapToAxis = useCameraStore((s) => s.snapToAxis);
  const snapOpposite = useCameraStore((s) => s.snapOpposite);
  const update = useCameraStore((s) => s.update);
  const project = useCameraStore((s) => s.project);

  return { rotate, roll, pan, zoom, reset, snapToAxis, snapOpposite, update, project };
}