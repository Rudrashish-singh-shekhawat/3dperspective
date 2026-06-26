// src/hooks/useLocalStorage.js
import { useState, useCallback } from 'react';

/**
 * A hook for reading and writing values to localStorage,
 * similar to useState but persisted.
 *
 * @param {string} key - The localStorage key.
 * @param {*} initialValue - The default value if none is stored.
 * @returns {[*, Function]} The stored value and a setter function.
 */
export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = useCallback(
    (value) => {
      try {
        const valueToStore =
          value instanceof Function ? value(storedValue) : value;
        setStoredValue(valueToStore);
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      } catch (error) {
        console.warn(`Error setting localStorage key "${key}":`, error);
      }
    },
    [key, storedValue]
  );

  return [storedValue, setValue];
}