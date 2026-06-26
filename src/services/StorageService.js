// src/services/StorageService.js

/**
 * A simple wrapper around localStorage for JSON serialisable data.
 * Provides get, set, remove, and clear methods with error handling.
 */
export const StorageService = {
  /**
   * Retrieves and parses a value from localStorage.
   * @param {string} key - The key to read.
   * @param {*} [fallback=null] - Value to return if the key is missing or an error occurs.
   * @returns {*} The parsed value, or fallback.
   */
  get(key, fallback = null) {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : fallback;
    } catch (error) {
      console.warn(`StorageService.get(${key}) failed:`, error);
      return fallback;
    }
  },

  /**
   * Serialises a value and stores it in localStorage.
   * @param {string} key - The key to write.
   * @param {*} value - The value to store.
   * @returns {boolean} True on success, false on error.
   */
  set(key, value) {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.warn(`StorageService.set(${key}) failed:`, error);
      return false;
    }
  },

  /**
   * Removes a key from localStorage.
   * @param {string} key - The key to remove.
   * @returns {boolean} True on success, false on error.
   */
  remove(key) {
    try {
      window.localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.warn(`StorageService.remove(${key}) failed:`, error);
      return false;
    }
  },

  /**
   * Clears all application data from localStorage (use with caution).
   * @returns {boolean} True on success, false on error.
   */
  clear() {
    try {
      window.localStorage.clear();
      return true;
    } catch (error) {
      console.warn('StorageService.clear() failed:', error);
      return false;
    }
  },
};