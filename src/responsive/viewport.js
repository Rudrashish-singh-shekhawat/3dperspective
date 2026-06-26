// src/responsive/viewport.js

export function getViewportWidth() {
  return window.innerWidth;
}

export function getViewportHeight() {
  return window.innerHeight;
}

export function getViewportSize() {
  return {
    width: window.innerWidth,
    height: window.innerHeight,
  };
}