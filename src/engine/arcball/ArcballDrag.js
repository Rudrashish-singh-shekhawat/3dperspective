// src/engine/arcball/ArcballDrag.js

export class ArcballDrag {
  constructor() {
    this.active = false;
    this.startX = 0;
    this.startY = 0;
  }

  start(clientX, clientY) {
    this.active = true;
    this.startX = clientX;
    this.startY = clientY;
  }

  end() {
    this.active = false;
  }
}