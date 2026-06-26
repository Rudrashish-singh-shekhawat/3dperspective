// src/engine/arcball/Arcball.js
import { ArcballMath } from './ArcballMath';
import { ArcballController } from './ArcballController';
import { ArcballEvents } from './ArcballEvents';
import { ArcballDrag } from './ArcballDrag';
import { ArcballUtils } from './ArcballUtils';

/**
 * Facade class for arcball rotation.
 * Encapsulates arcball math, state, and event binding.
 */
export class Arcball {
  constructor(camera, canvas) {
    this.camera = camera;
    this.canvas = canvas;
    this.math = new ArcballMath();
    this.controller = new ArcballController(camera);
    this.drag = new ArcballDrag();
    this.events = new ArcballEvents(this, canvas);
  }
}