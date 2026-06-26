// src/engine/gizmo/GizmoSnap.js
import { useCameraStore } from '../camera/CameraState';

/**
 * When a gizmo handle is clicked, we trigger a camera snap to that axis.
 * This hook provides that handler.
 */
export function useGizmoSnap() {
  const snapToAxis = useCameraStore((s) => s.snapToAxis);

  const handleGizmoClick = (axisName) => {
    snapToAxis(axisName);
  };

  return handleGizmoClick;
}