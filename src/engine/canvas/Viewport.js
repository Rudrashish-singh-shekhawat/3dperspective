// src/engine/canvas/Viewport.js

export class Viewport {
  constructor() {
    this.scale = 1.2;
    this.panX = 0;
    this.panY = 0;
  }

  zoom(delta) {
    this.scale *= Math.exp(delta * 0.05);
  }

  pan(dx, dy) {
    this.panX += dx;
    this.panY += dy;
  }

  reset() {
    this.scale = 1.2;
    this.panX = 0;
    this.panY = 0;
  }
}