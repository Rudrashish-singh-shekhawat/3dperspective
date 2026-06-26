// src/features/fourier/math/FFT.js
/**
 * Fast Fourier Transform (FFT) — radix‑2 Cooley–Tukey, in‑place.
 * Converts an array of complex time‑domain samples (length must be a power of 2)
 * into frequency‑domain coefficients.
 *
 * Each sample is an object {x (real), y (imag)}.
 * Returns an array of {freq, radius, phase} sorted by descending radius.
 *
 * If the input length is not a power of 2, this function automatically
 * zero‑pads to the next power of 2.
 */

function nextPowerOfTwo(n) {
  let p = 1;
  while (p < n) p <<= 1;
  return p;
}

export function fft(samples) {
  const N = samples.length;
  const M = nextPowerOfTwo(N);
  // Build complex array (real, imag) pairs, zero‑padded
  const re = new Float64Array(M);
  const im = new Float64Array(M);
  for (let i = 0; i < N; i++) {
    re[i] = samples[i].x;
    im[i] = samples[i].y;
  }
  // Bit‑reversal permutation
  let j = 0;
  for (let i = 0; i < M; i++) {
    if (i < j) {
      [re[i], re[j]] = [re[j], re[i]];
      [im[i], im[j]] = [im[j], im[i]];
    }
    let m = M >> 1;
    while (m >= 1 && j & m) {
      j -= m;
      m >>= 1;
    }
    j += m;
  }
  // Cooley–Tukey
  for (let len = 2; len <= M; len <<= 1) {
    const halfLen = len >> 1;
    const ang = -2 * Math.PI / len;
    const wRe = Math.cos(ang);
    const wIm = Math.sin(ang);
    for (let i = 0; i < M; i += len) {
      let curRe = 1, curIm = 0;
      for (let k = 0; k < halfLen; k++) {
        const i1 = i + k;
        const i2 = i1 + halfLen;
        const tRe = curRe * re[i2] - curIm * im[i2];
        const tIm = curRe * im[i2] + curIm * re[i2];
        re[i2] = re[i1] - tRe;
        im[i2] = im[i1] - tIm;
        re[i1] += tRe;
        im[i1] += tIm;
        const nwRe = curRe * wRe - curIm * wIm;
        const nwIm = curRe * wIm + curIm * wRe;
        curRe = nwRe;
        curIm = nwIm;
      }
    }
  }
  // Convert to coefficients
  const coeffs = [];
  const scale = 1 / M;
  for (let k = 0; k < M; k++) {
    const real = re[k] * scale;
    const imag = im[k] * scale;
    const radius = Math.sqrt(real * real + imag * imag);
    const phase = Math.atan2(imag, real);
    coeffs.push({ freq: k, radius, phase });
  }
  return coeffs.sort((a, b) => b.radius - a.radius);
}