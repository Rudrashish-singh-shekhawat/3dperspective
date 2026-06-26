// src/features/fourier/services/ExportSVG.js

/**
 * Converts the current path (2D points) into an SVG path string and triggers a download.
 * The path is taken from the FourierStore and is assumed to be an array of {x, y} points.
 */
export function exportSVG(path, filename = 'fourier-path.svg') {
  if (!path || path.length < 2) return;

  // Build SVG path data (move to first point, line to subsequent)
  let d = `M ${path[0].x} ${path[0].y}`;
  for (let i = 1; i < path.length; i++) {
    d += ` L ${path[i].x} ${path[i].y}`;
  }

  // Determine bounding box to set viewBox
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  for (const p of path) {
    if (p.x < minX) minX = p.x;
    if (p.y < minY) minY = p.y;
    if (p.x > maxX) maxX = p.x;
    if (p.y > maxY) maxY = p.y;
  }
  const width = maxX - minX || 100;
  const height = maxY - minY || 100;
  const padding = 20;
  const viewBox = `${minX - padding} ${minY - padding} ${width + 2 * padding} ${height + 2 * padding}`;

  const svgContent = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}">
  <path d="${d}" fill="none" stroke="#3ecf8e" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

  // Trigger download
  const blob = new Blob([svgContent], { type: 'image/svg+xml' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}