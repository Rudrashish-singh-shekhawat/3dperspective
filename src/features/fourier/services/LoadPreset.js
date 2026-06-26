// src/features/fourier/services/LoadPreset.js
import { STORAGE_KEY_PRESETS } from '../../../utils/constants';

/**
 * Loads a saved preset from localStorage by name and returns the circles array.
 *
 * @param {string} name - The name of the preset to load.
 * @returns {Array|null} The circles array if found, or null.
 */
export function loadPreset(name) {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_PRESETS);
    if (!raw) return null;

    const presets = JSON.parse(raw);
    const preset = presets.find((p) => p.name === name);
    if (!preset) return null;

    return JSON.parse(JSON.stringify(preset.circles)); // deep clone
  } catch (err) {
    console.error('LoadPreset failed:', err);
    return null;
  }
}

/**
 * Returns the list of all saved preset names.
 * @returns {Array<string>}
 */
export function getPresetNames() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_PRESETS);
    if (!raw) return [];
    const presets = JSON.parse(raw);
    return presets.map((p) => p.name);
  } catch {
    return [];
  }
}