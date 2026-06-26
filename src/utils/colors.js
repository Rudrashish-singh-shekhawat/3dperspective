// src/utils/colors.js
/**
 * Color utility helpers.
 * Converts hex codes to rgba and provides common color functions.
 */

/**
 * Converts a hex color string (e.g. '#4d9fff' or '#4d9fffff' with alpha) to an rgba() string.
 * If the hex already includes alpha, it is used; otherwise defaultAlpha is applied.
 * @param {string} hex - Hex color, with or without leading '#'.
 * @param {number} [alpha=1] - Fallback alpha value (0-1).
 * @returns {string} CSS rgba(...) string.
 */
export function hexToRgba(hex, alpha = 1) {
  let h = hex.replace('#', '');
  if (h.length === 8) {
    // hex includes alpha channel
    const r = parseInt(h.slice(0, 2), 16);
    const g = parseInt(h.slice(2, 4), 16);
    const b = parseInt(h.slice(4, 6), 16);
    const a = parseInt(h.slice(6, 8), 16) / 255;
    return `rgba(${r}, ${g}, ${b}, ${a})`;
  }
  // 6-digit hex
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

/**
 * Converts a hex color to an HSLA string for theme-consistent colouring.
 * @param {string} hex - Hex color.
 * @param {number} [alpha=1] - Alpha value (0-1).
 * @returns {string} CSS hsla(...) string.
 */
export function hexToHsla(hex, alpha = 1) {
  let h = hex.replace('#', '');
  if (h.length === 8) h = h.slice(0, 6); // ignore embedded alpha
  const r = parseInt(h.slice(0, 2), 16) / 255;
  const g = parseInt(h.slice(2, 4), 16) / 255;
  const b = parseInt(h.slice(4, 6), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;

  let hVal = 0;
  let s = 0;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: hVal = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: hVal = ((b - r) / d + 2) / 6; break;
      case b: hVal = ((r - g) / d + 4) / 6; break;
    }
  }

  return `hsla(${Math.round(hVal * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%, ${alpha})`;
}

/**
 * Predefined colour palette from the original Tailwind config.
 */
export const COLORS = {
  ink: '#e8e6df',
  inkDim: '#7a7870',
  inkMute: '#3d3c3a',
  surface: '#0d0d0c',
  panel: 'rgba(14,14,13,0.88)',
  panelSolid: '#0e0e0d',
  rule: '#222220',
  blue: '#4d9fff',
  green: '#3ecf8e',
  red: '#f47c5a',
  purple: '#a78bfa',
  amber: '#f5a623',
  cyan: '#22d3ee',
};