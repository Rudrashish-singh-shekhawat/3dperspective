// src/engine/arcball/ArcballEvents.js
import { ArcballDrag } from './ArcballDrag';

/**
 * Binds mouse/touch events to Arcball controller.
 * Replicates the original event handling but scoped to arcball rotation.
 */
export class ArcballEvents {
  constructor(arcball, canvas) {
    this.arcball = arcball;
    this.canvas = canvas;
    this.drag = new ArcballDrag();
    this._bound = false;
  }

  bind() {
    if (this._bound) return;
    const canvas = this.canvas;

    // We'll use the same pointer handling as the global CameraEvents,
    // but scoped only to arcball rotation. This is here for modularity.
    canvas.addEventListener('mousedown', this._onMouseDown);
    window.addEventListener('mousemove', this._onMouseMove);
    window.addEventListener('mouseup', this._onMouseUp);
    canvas.addEventListener('touchstart', this._onTouchStart, { passive: false });
    window.addEventListener('touchmove', this._onTouchMove, { passive: false });
    window.addEventListener('touchend', this._onTouchEnd);

    this._bound = true;
  }

  unbind() {
    if (!this._bound) return;
    const canvas = this.canvas;
    canvas.removeEventListener('mousedown', this._onMouseDown);
    window.removeEventListener('mousemove', this._onMouseMove);
    window.removeEventListener('mouseup', this._onMouseUp);
    canvas.removeEventListener('touchstart', this._onTouchStart);
    window.removeEventListener('touchmove', this._onTouchMove);
    window.removeEventListener('touchend', this._onTouchEnd);
    this._bound = false;
  }

  _onMouseDown = (e) => {
    // Only handle left mouse button for rotation
    if (e.button !== 0) return;
    this.arcball.controller.startDrag(e.clientX, e.clientY, this.canvas.width, this.canvas.height);
    this.drag.start(e);
  };

  _onMouseMove = (e) => {
    if (!this.drag.active) return;
    this.arcball.controller.updateDrag(e.clientX, e.clientY, this.canvas.width, this.canvas.height);
  };

  _onMouseUp = () => {
    this.arcball.controller.endDrag();
    this.drag.end();
  };

  _onTouchStart = (e) => {
    if (e.touches.length !== 1) return;
    const touch = e.touches[0];
    this.arcball.controller.startDrag(touch.clientX, touch.clientY, this.canvas.width, this.canvas.height);
    this.drag.start(touch);
    e.preventDefault();
  };

  _onTouchMove = (e) => {
    if (!this.drag.active || e.touches.length !== 1) return;
    const touch = e.touches[0];
    this.arcball.controller.updateDrag(touch.clientX, touch.clientY, this.canvas.width, this.canvas.height);
    e.preventDefault();
  };

  _onTouchEnd = () => {
    this.arcball.controller.endDrag();
    this.drag.end();
  };
}