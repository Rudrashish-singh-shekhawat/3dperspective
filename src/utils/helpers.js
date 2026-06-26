// src/utils/helpers.js

/**
 * Miscellaneous helper functions used throughout the app.
 */

/**
 * Generates a unique identifier string.
 * Uses crypto.randomUUID() if available, otherwise a fallback.
 */
export function generateId() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  // Fallback for older environments
  return Date.now().toString(36) + '_' + Math.random().toString(36).substr(2, 9);
}

/**
 * No‑operation function, useful as a default callback.
 */
export function noop() {}

/**
 * Returns true if value is null or undefined.
 */
export function isNil(value) {
  return value === null || value === undefined;
}

/**
 * Returns a new object containing only the specified keys from obj.
 */
export function pick(obj, keys) {
  return keys.reduce((acc, key) => {
    if (obj && key in obj) acc[key] = obj[key];
    return acc;
  }, {});
}

/**
 * Returns a new object excluding the specified keys.
 */
export function omit(obj, keys) {
  const result = { ...obj };
  keys.forEach((key) => {
    delete result[key];
  });
  return result;
}