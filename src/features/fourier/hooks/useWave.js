// src/features/fourier/hooks/useWave.js
import { useMemo } from 'react';
import { useFourierStore } from '../state/FourierStore';
import { getPathAmplitude } from '../math/WaveMath';

/**
 * Hook that provides wave‑related data for the oscilloscope and 2D graph.
 * Computes the maximum amplitude from the current path so that renderers
 * can scale the X and Y waveforms appropriately.
 */
export function useWave() {
  const path = useFourierStore((s) => s.path);

  const { maxAmp, maxX, maxY } = useMemo(
    () => getPathAmplitude(path),
    [path]
  );

  return {
    path,
    maxAmp,
    maxX,
    maxY,
  };
}