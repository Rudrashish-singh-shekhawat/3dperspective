// src/services/ExportService.js
import { exportSVG } from '../features/fourier/services/ExportSVG';
import { useFourierStore } from '../features/fourier/state/FourierStore';

/**
 * Application‑level export service.
 * Orchestrates exports of the Fourier path as SVG, and the circles configuration as JSON.
 * This is the service used by the toolbar buttons.
 */
export const ExportService = {
  /**
   * Export the current 2D path as an SVG file.
   * @param {string} [filename='fourier-path.svg'] - The file name.
   */
  exportPathAsSVG(filename = 'fourier-path.svg') {
    const path = useFourierStore.getState().path;
    if (!path || path.length < 2) {
      console.warn('ExportService: No path to export.');
      return;
    }
    exportSVG(path, filename);
  },

  /**
   * Export the current circles configuration as a JSON file.
   * @param {string} [filename='fourier-circles.json'] - The file name.
   */
  exportCirclesAsJSON(filename = 'fourier-circles.json') {
    const circles = useFourierStore.getState().circles;
    if (!circles || circles.length === 0) {
      console.warn('ExportService: No circles to export.');
      return;
    }
    const json = JSON.stringify(circles, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
};