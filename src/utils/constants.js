// src/utils/constants.js

/**
 * Application‑wide constants.
 * Feature‑specific constants (like MAX_PATH_LENGTH, AXES) live in app/Config.js.
 * This file holds shared keys, limits, and identifiers.
 */

// localStorage keys
export const STORAGE_KEY_PRESETS = 'fourier3d_presets';
export const STORAGE_KEY_PREFERENCES = 'fourier3d_prefs';

// Default slider range (used by SpeedControl)
export const SPEED_SLIDER_MIN = 1;
export const SPEED_SLIDER_MAX = 100;
export const DEFAULT_SPEED_SLIDER_VALUE = 20; // maps to animationSpeed = 0.02

// Misc
export const APP_VERSION = '1.0.0';