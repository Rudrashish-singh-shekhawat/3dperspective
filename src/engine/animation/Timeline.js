// src/engine/animation/Timeline.js

/**
 * Manages a sequence of keyframes for animating a value over time.
 * Not present in the original code; useful for future camera or UI animations.
 */
export class Timeline {
  constructor({ duration = 1000, onUpdate, onComplete } = {}) {
    this.duration = duration;
    this.onUpdate = onUpdate;
    this.onComplete = onComplete;
    this.elapsed = 0;
    this.playing = false;
  }

  play() {
    this.playing = true;
    this.elapsed = 0;
  }

  pause() {
    this.playing = false;
  }

  stop() {
    this.playing = false;
    this.elapsed = 0;
  }

  update(dt) {
    if (!this.playing) return;
    this.elapsed += dt;
    const t = Math.min(this.elapsed / this.duration, 1);
    this.onUpdate && this.onUpdate(t);
    if (t === 1) {
      this.playing = false;
      this.onComplete && this.onComplete();
    }
  }
}