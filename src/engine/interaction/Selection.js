// src/engine/interaction/Selection.js

/**
 * Placeholder for managing selection interactions (e.g., click-to-select
 * an epicycle arm or a UI element).
 * Not present in the original code; can be implemented for future features.
 */
export class SelectionManager {
  constructor(canvas, camera) {
    this.canvas = canvas;
    this.camera = camera;
    this.selected = null;
  }

  select(target) {
    this.selected = target;
  }

  deselect() {
    this.selected = null;
  }

  isSelected(target) {
    return this.selected === target;
  }

  handleClick(clientX, clientY) {
    // Future: hit test against selectable objects
    return null;
  }
}