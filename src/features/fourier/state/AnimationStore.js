// src/features/fourier/state/AnimationStore.js
import { create } from 'zustand';

export const useAnimationStore = create((set) => ({
  time: 0,
  isPlaying: true,
  animationSpeed: 0.02, // original default: 20/1000

  setTime: (t) => set({ time: t }),
  incrementTime: (amount) => set((s) => ({ time: s.time + amount })),
  resetTime: () => set({ time: 0 }),

  play: () => set({ isPlaying: true }),
  pause: () => set({ isPlaying: false }),
  togglePlay: () => set((s) => ({ isPlaying: !s.isPlaying })),

  setSpeed: (speed) => set({ animationSpeed: speed }), // speed in units per frame
  setSpeedFromSlider: (value) =>
    set({ animationSpeed: value / 1000 }), // original: val/1000
}));