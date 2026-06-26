// src/utils/formatter.js

/**
 * Utility functions for formatting numbers and labels,
 * extracted from the original script's formatNumber, fmtLabel, and niceTick.
 */

/**
 * Formats a number for display in axis labels.
 * Uses k/M suffixes for large numbers, and rounds small numbers nicely.
 */
export function formatNumber(n) {
  if (Math.abs(n) >= 1000000) return (n / 1000000).toFixed(1) + "M";
  if (Math.abs(n) >= 1000) return (n / 1000).toFixed(1) + "k";
  if (Math.abs(n) < 1 && n !== 0) return n.toFixed(2);
  return Math.round(n).toString();
}

/**
 * Returns a nice, human-readable label for an axis tick value.
 * Strips unnecessary trailing zeros after the decimal point.
 */
export function fmtLabel(n) {
  if (n === 0) return '0';
  const a = Math.abs(n);
  if (a >= 1e6) return (n / 1e6).toFixed(1).replace(/\.0$/, '') + 'M';
  if (a >= 1e3) return (n / 1e3).toFixed(1).replace(/\.0$/, '') + 'k';
  if (a < 1) return n.toPrecision(2);
  return Math.round(n).toString();
}

/**
 * Computes a nice tick interval that is at least `targetPx` pixels apart on screen,
 * given the current scale (world units per pixel). The result will be a multiple of
 * 1, 2, 5, or 10 times a power of 10, making axis labels clean and readable.
 *
 * @param {number} targetPx - The desired distance between ticks in screen pixels.
 * @param {number} scale - The viewport scale factor.
 * @returns {number} The tick interval in world units.
 */
export function niceTick(targetPx, scale) {
  const worldPerPx = 1 / scale;
  const desired = targetPx * worldPerPx;
  const pow = Math.pow(10, Math.floor(Math.log10(desired)));
  const candidates = [1, 2, 5, 10];
  for (const m of candidates) {
    if (pow * m >= desired) return pow * m;
  }
  return pow * 10;
}