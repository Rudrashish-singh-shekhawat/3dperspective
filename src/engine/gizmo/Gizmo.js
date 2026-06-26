// src/engine/gizmo/Gizmo.js
import { GizmoRenderer } from './GizmoRenderer';
import { GizmoInteraction } from './GizmoInteraction';
import { GizmoState } from './GizmoState';

/**
 * Main Gizmo manager.
 * Handles rendering the axis handles and click/hover interaction.
 */
export class Gizmo {
  constructor(canvas, camera) {
    this.canvas = canvas;
    this.camera = camera;
    this.renderer = new GizmoRenderer();
    this.interaction = new GizmoInteraction(canvas, camera);
    this.state = new GizmoState();
  }

  draw(ctx, w, h, currentQuat, hoveredAxis) {
    this.renderer.draw(ctx, w, h, currentQuat, hoveredAxis, this.state.clickableAxes);
  }

  /**
   * Returns the axis name if the pointer is over a gizmo handle, else null.
   */
  hitTest(clientX, clientY) {
    return this.interaction.hitTest(clientX, clientY, this.state.clickableAxes);
  }

  /**
   * Returns true if the pointer is near the gizmo.
   */
  isNearGizmo(clientX, clientY) {
    return this.interaction.isNearGizmo(clientX, clientY);
  }
}