// src/engine/canvas/Resize.js

export function resizeCanvas(canvas, viewport) {
  if (!canvas || !viewport) return;
  canvas.width = viewport.clientWidth;
  canvas.height = viewport.clientHeight;
}

export function resizeGraphCanvas(canvas, parent) {
  if (!canvas || !parent) return;
  if (canvas.width !== parent.clientWidth || canvas.height !== parent.clientHeight) {
    canvas.width = parent.clientWidth;
    canvas.height = parent.clientHeight;
  }
}