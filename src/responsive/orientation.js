// src/responsive/orientation.js

export function getOrientation() {
  if (typeof window === 'undefined') return 'landscape';
  return window.innerWidth > window.innerHeight ? 'landscape' : 'portrait';
}

export function isPortrait() {
  return getOrientation() === 'portrait';
}

export function isLandscape() {
  return getOrientation() === 'landscape';
}