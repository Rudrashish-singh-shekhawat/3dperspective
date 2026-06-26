// src/engine/gizmo/GizmoState.js
import { create } from 'zustand';

/**
 * Gizmo state managed via Zustand.
 * Tracks which axis is currently hovered and holds the list of clickable axes
 * (positions computed each frame by GizmoRenderer).
 */
export const useGizmoStore = create((set) => ({
  hoveredAxis: null,
  clickableAxes: [],

  setHoveredAxis: (axis) => set({ hoveredAxis: axis }),
  setClickableAxes: (axes) => set({ clickableAxes: axes }),
}));