// src/features/fourier/services/ImportJSON.js

/**
 * Reads a JSON file from the user's device and parses it into an array of circles.
 * The expected format is an array of objects with { radius, freq, phase }.
 * Calls the provided callback with the parsed circles, or an empty array on error.
 *
 * @param {File} file - The file object from an <input type="file"> or drag-and-drop.
 * @param {(circles: Array) => void} onSuccess - Callback with parsed circles.
 * @param {(error: Error) => void} [onError] - Optional error callback.
 */
export function importJSON(file, onSuccess, onError) {
  if (!file) return;

  const reader = new FileReader();

  reader.onload = (e) => {
    try {
      const text = e.target.result;
      const data = JSON.parse(text);
      if (!Array.isArray(data)) {
        throw new Error('JSON content must be an array of circle objects');
      }
      // Basic validation: each item must have radius, freq, phase
      const circles = data.map((item, idx) => {
        const radius = parseFloat(item.radius);
        const freq = parseFloat(item.freq);
        const phase = parseFloat(item.phase);
        if (isNaN(radius) || isNaN(freq) || isNaN(phase)) {
          throw new Error(`Invalid circle at index ${idx}: requires numeric radius, freq, phase`);
        }
        return { radius, freq, phase };
      });
      onSuccess(circles);
    } catch (err) {
      console.error('ImportJSON error:', err);
      if (onError) onError(err);
      else onSuccess([]);
    }
  };

  reader.onerror = () => {
    const err = new Error('Failed to read file');
    console.error(err);
    if (onError) onError(err);
    else onSuccess([]);
  };

  reader.readAsText(file);
}