// src/features/fourier/math/DFT.js
/**
 * Discrete Fourier Transform (DFT) implementation.
 * Converts a series of complex time-domain samples into frequency-domain coefficients.
 * This can be used for automatic circle generation from a user-drawn path.
 *
 * @param {Array<{x: number, y: number}>} samples - Complex points where x is real, y is imaginary.
 * @returns {Array<{freq: number, radius: number, phase: number}>} Coefficients sorted by descending amplitude.
 */
export function dft(samples) {
  const N = samples.length;
  const coefficients = [];

  for (let k = 0; k < N; k++) {
    let re = 0;
    let im = 0;
    for (let n = 0; n < N; n++) {
      const angle = (2 * Math.PI * k * n) / N;
      const cosA = Math.cos(angle);
      const sinA = Math.sin(angle);
      const xn = samples[n].x;
      const yn = samples[n].y;
      re += xn * cosA + yn * sinA;
      im += -xn * sinA + yn * cosA;
    }
    re /= N;
    im /= N;
    const radius = Math.sqrt(re * re + im * im);
    const phase = Math.atan2(im, re);
    coefficients.push({
      freq: k,
      radius,
      phase,
    });
  }

  // Sort by descending amplitude (skip DC if desired)
  return coefficients.sort((a, b) => b.radius - a.radius);
}