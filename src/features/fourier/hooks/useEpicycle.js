// src/features/fourier/hooks/useEpicycle.js
import { useFourierStore } from '../state/FourierStore';
import { useAnimationStore } from '../state/AnimationStore';
import { computeEpicycleChain, computeEndpoint } from '../math/EpicycleMath';

/**
 * Hook that provides epicycle‑specific derived data:
 * the full chain of arm segments and the final endpoint.
 * Re‑uses the time and circles from the global stores.
 */
export function useEpicycle() {
  const circles = useFourierStore((s) => s.circles);
  const time = useAnimationStore((s) => s.time);

  // Computed chain: array of segments {start, end, radius, freq, phase}
  const chain = computeEpicycleChain(circles, time);

  // Final pen position
  const endpoint = computeEndpoint(circles, time);

  return {
    chain,
    endpoint,
  };
}