// src/utils/validator.js

/**
 * Validates an individual circle object.
 * Returns an array of error messages; empty if valid.
 *
 * @param {object} circle - { radius, freq, phase }
 * @returns {string[]} Array of error strings.
 */
export function validateCircle(circle) {
  const errors = [];

  if (!circle || typeof circle !== 'object') {
    return ['Circle must be an object with radius, freq, phase.'];
  }

  if (typeof circle.radius !== 'number' || isNaN(circle.radius)) {
    errors.push('Radius must be a number.');
  } else if (circle.radius < 0) {
    errors.push('Radius must be non‑negative.');
  }

  if (typeof circle.freq !== 'number' || isNaN(circle.freq)) {
    errors.push('Frequency must be a number.');
  } else if (circle.freq < 0) {
    errors.push('Frequency must be non‑negative.');
  }

  if (typeof circle.phase !== 'number' || isNaN(circle.phase)) {
    errors.push('Phase must be a number.');
  }

  return errors;
}

/**
 * Validates an array of circles.
 * Returns an array of error messages for each invalid circle, keyed by index.
 *
 * @param {Array} circles
 * @returns {Object[]} Array of { index, errors } for circles with validation errors.
 */
export function validateCircles(circles) {
  const result = [];
  if (!Array.isArray(circles)) {
    return [{ index: -1, errors: ['Circles must be an array.'] }];
  }

  circles.forEach((circle, i) => {
    const errors = validateCircle(circle);
    if (errors.length > 0) {
      result.push({ index: i, errors });
    }
  });

  return result;
}