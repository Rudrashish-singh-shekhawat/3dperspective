// src/features/fourier/state/FourierStore.js
import { create } from 'zustand';
import { MAX_PATH_LENGTH, DEFAULT_CIRCLES } from '../../../app/Config';
import { useAnimationStore } from './AnimationStore';

export const useFourierStore = create((set) => ({
  circles: [...DEFAULT_CIRCLES],
  path: [], // most recent point first [{x, y, t}, ...]
  isolatedCircleIndices: [],
  showReal: true,
  showImaginary: true,
  showIsolatedReal: true,
  showIsolatedImag: true,

  toggleShowReal: () => set((state) => ({ showReal: !state.showReal })),
  toggleShowImaginary: () => set((state) => ({ showImaginary: !state.showImaginary })),

  toggleShowIsolatedReal: () => set((state) => ({ showIsolatedReal: !state.showIsolatedReal })),
  toggleShowIsolatedImag: () => set((state) => ({ showIsolatedImag: !state.showIsolatedImag })),

  nextId: 3,

  toggleIsolatedCircle: (id) => set((state) => {
    const isIsolated = state.isolatedCircleIndices.includes(id);
    if (isIsolated) {
      return { isolatedCircleIndices: state.isolatedCircleIndices.filter(i => i !== id) };
    } else {
      return { isolatedCircleIndices: [...state.isolatedCircleIndices, id] };
    }
  }),

  clearIsolated: () => set({ isolatedCircleIndices: [] }),

  addCircle: (circle) =>
    set((state) => {
      useAnimationStore.getState().resetTime();
      return { 
        circles: [...state.circles, { ...circle, id: state.nextId }],
        nextId: state.nextId + 1,
        path: []
      };
    }),

  removeCircle: (index) =>
    set((state) => {
      useAnimationStore.getState().resetTime();
      const removedCircle = state.circles[index];
      const newIsolated = removedCircle 
        ? state.isolatedCircleIndices.filter(id => id !== removedCircle.id)
        : state.isolatedCircleIndices;
      return {
        circles: state.circles.filter((_, i) => i !== index),
        isolatedCircleIndices: newIsolated,
        path: [], // clear path when circles change
      };
    }),

  updateCircle: (index, prop, value) =>
    set((state) => {
      useAnimationStore.getState().resetTime();
      const updated = [...state.circles];
      updated[index] = { ...updated[index], [prop]: value };
      return { circles: updated, path: [] };
    }),

  clearAll: () => {
    useAnimationStore.getState().resetTime();
    set({ circles: [], path: [] });
  },

  setCircles: (circles) => set((state) => {
    useAnimationStore.getState().resetTime();
    let nextId = state.nextId;
    const newCircles = circles.map(c => {
      if (c.id !== undefined) return c;
      const cWithId = { ...c, id: nextId };
      nextId++;
      return cWithId;
    });
    return { circles: newCircles, path: [], nextId };
  }),

  addToPath: (point) =>
    set((state) => {
      const newPath = [point, ...state.path];
      if (newPath.length > MAX_PATH_LENGTH) newPath.pop();
      return { path: newPath };
    }),

  resetPath: () => set({ path: [] }),
}));