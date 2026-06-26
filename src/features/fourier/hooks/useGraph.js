// src/features/fourier/hooks/useGraph.js
import { useMemo } from 'react';
import { useFourierStore } from '../state/FourierStore';
import { getPathAmplitude } from '../math/WaveMath';

/**
 * Hook that provides data for the 2D graph canvas (oscilloscope + parametric shape).
 * Returns the path points and the maximum amplitude for scaling the views.
 */
export function useGraph() {
  const path = useFourierStore((state) => state.path);
  const circles = useFourierStore((state) => state.circles);
  const isolatedCircleIndices = useFourierStore((state) => state.isolatedCircleIndices);
  const showReal = useFourierStore((state) => state.showReal);
  const showImaginary = useFourierStore((state) => state.showImaginary);
  const showIsolatedReal = useFourierStore((state) => state.showIsolatedReal);
  const showIsolatedImag = useFourierStore((state) => state.showIsolatedImag);

  const { maxAmp, maxX, maxY } = useMemo(
    () => getPathAmplitude(path),
    [path]
  );

  return {
    path,
    circles,
    isolatedCircleIndices,
    showReal,
    showImaginary,
    showIsolatedReal,
    showIsolatedImag,
    maxAmp,
    maxX,
    maxY,
  };
}