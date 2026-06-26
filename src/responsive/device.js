// src/responsive/device.js

export function isTouchDevice() {
  return (
    'ontouchstart' in window ||
    navigator.maxTouchPoints > 0
  );
}

export function getUserAgent() {
  return navigator.userAgent;
}

export function isMobileUserAgent() {
  return /Mobi|Android/i.test(navigator.userAgent);
}