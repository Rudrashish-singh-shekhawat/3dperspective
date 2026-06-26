// src/features/fourier/services/SavePreset.js
import { STORAGE_KEY_PRESETS } from '../../../utils/constants';

/**
 * Saves the current circles array to localStorage as a named preset.
 * Presets are stored as an array of { name, circles, timestamp } objects.
 *
 * @param {string} name - A user‑friendly name for the preset.
 * @param {Array} circles - The current circles array to save.
 * @returns {boolean} True if saved successfully.
 */
export function savePreset(name, circles) {
  if (!name || !circles) return false;

  try {
    const raw = localStorage.getItem(STORAGE_KEY_PRESETS);
    const presets = raw ? JSON.parse(raw) : [];

    // Replace existing preset with the same name, or add new one
    const existingIndex = presets.findIndex((p) => p.name === name);
    const entry = {
      name,
      circles: JSON.parse(JSON.stringify(circles)), // deep clone
      timestamp: Date.now(),
    };

    if (existingIndex >= 0) {
      presets[existingIndex] = entry;
    } else {
      presets.push(entry);
    }

    localStorage.setItem(STORAGE_KEY_PRESETS, JSON.stringify(presets));
    return true;
  } catch (err) {
    console.error('SavePreset failed:', err);
    return false;
  }
}