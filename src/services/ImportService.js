// src/services/ImportService.js
import { importJSON } from '../features/fourier/services/ImportJSON';
import { useFourierStore } from '../features/fourier/state/FourierStore';

/**
 * Application‑level import service.
 * Handles importing circles configuration from a JSON file
 * and updating the Fourier store.
 */
export const ImportService = {
  /**
   * Import circles from a file and replace the current set.
   * @param {File} file - The file from an <input type="file">.
   * @param {Function} [onSuccess] - Called with the imported circles array.
   * @param {Function} [onError] - Called with an error message.
   */
  importCirclesFromFile(file, onSuccess, onError) {
    importJSON(
      file,
      (circles) => {
        useFourierStore.getState().setCircles(circles);
        if (onSuccess) onSuccess(circles);
      },
      (error) => {
        console.error('ImportService failed:', error);
        if (onError) onError(error);
      }
    );
  }
};