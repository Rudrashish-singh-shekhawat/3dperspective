// src/responsive/touch.js

export function getTouchCapabilities() {
  if (typeof window === 'undefined') return { maxPoints: 0, pressure: false };
  return {
    maxPoints: navigator.maxTouchPoints || 0,
    pressure: 'ontouchstart' in window && 'force' in TouchEvent.prototype,
  };
}

export function touchEventCoords(e) {
  if (e.touches && e.touches.length > 0) {
    return { x: e.touches[0].clientX, y: e.touches[0].clientY };
  }
  if (e.changedTouches && e.changedTouches.length > 0) {
    return { x: e.changedTouches[0].clientX, y: e.changedTouches[0].clientY };
  }
  return { x: 0, y: 0 };
}

export function isTouchOnly() {
  return 'ontouchstart' in window && !window.matchMedia('(pointer: fine)').matches;
}