// src/engine/animation/Spring.js

/**
 * Simple spring simulation for smooth UI transitions.
 * Not present in the original code; can be used for future animations
 * like smooth zooming or panel opening.
 */
export class Spring {
  constructor(config = {}) {
    this.position = config.initial || 0;
    this.target = config.initial || 0;
    this.velocity = 0;
    this.stiffness = config.stiffness || 0.1;
    this.damping = config.damping || 0.8;
  }

  setTarget(value) {
    this.target = value;
  }

  update() {
    const force = (this.target - this.position) * this.stiffness;
    this.velocity += force;
    this.velocity *= this.damping;
    this.position += this.velocity;
    return this.position;
  }
}