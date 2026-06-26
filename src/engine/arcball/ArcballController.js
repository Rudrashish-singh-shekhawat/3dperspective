// src/engine/arcball/ArcballController.js
import { ArcballMath } from './ArcballMath';

/**
 * Handles arcball interaction state and updates the camera.
 * Stores the previous arcball vector for rotation calculations.
 */
export class ArcballController {
  constructor(camera) {
    this.camera = camera;
    this.math = new ArcballMath();
    this.prevVec = null;
  }

  startDrag(clientX, clientY, canvasWidth, canvasHeight) {
    this.prevVec = this.math.arcballVec(clientX, clientY, canvasWidth, canvasHeight);
  }

  updateDrag(clientX, clientY, canvasWidth, canvasHeight) {
    if (!this.prevVec) return;
    const curVec = this.math.arcballVec(clientX, clientY, canvasWidth, canvasHeight);
    this.camera.rotate(this.prevVec, curVec);
    this.prevVec = curVec;
  }

  endDrag() {
    this.prevVec = null;
  }
}