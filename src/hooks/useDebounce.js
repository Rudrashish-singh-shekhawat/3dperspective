// src/hooks/useDebounce.js
import { useState, useEffect } from 'react';

/**
 * Debounces a value by a specified delay.
 * Returns the debounced value, which only updates after the input has stopped changing
 * for `delay` milliseconds.
 *
 * @param {*} value - The value to debounce.
 * @param {number} delay - Delay in milliseconds (default 300).
 * @returns {*} The debounced value.
 */
export function useDebounce(value, delay = 300) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // Set up a timeout to update the debounced value
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cleanup on value or delay change
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}