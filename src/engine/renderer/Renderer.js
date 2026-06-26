// src/engine/renderer/Renderer.js
import { GridRenderer } from './GridRenderer';
import { EpicycleRenderer } from '../../features/fourier/canvas/EpicycleRenderer';
import { PathRenderer } from '../../features/fourier/canvas/PathRenderer';
import { GizmoRenderer } from '../gizmo/GizmoRenderer';

export class Renderer {
  constructor(ctx) {
    this.ctx = ctx;
    this.gridRenderer = new GridRenderer();
    this.epicycleRenderer = new EpicycleRenderer();
    this.pathRenderer = new PathRenderer();
    this.gizmoRenderer = new GizmoRenderer();
  }

  draw(state) {
    const ctx = this.ctx;
    const w = ctx.canvas.width;
    const h = ctx.canvas.height;

    ctx.clearRect(0, 0, w, h);
    ctx.save();
    ctx.translate(w / 2 + state.panX, h / 2 + state.panY);

    // Grid
    this.gridRenderer.draw(ctx, state.scale, state.panX, state.panY, state.currentQuat);

    // Epicycles – PASS currentQuat and isolatedCircleIndices
    this.epicycleRenderer.draw(ctx, state.scale, state.circles, state.time, state.currentQuat, state.isolatedCircleIndices);

    // Path – PASS currentQuat
    this.pathRenderer.draw(ctx, state.scale, state.path, state.time, state.currentQuat);

    ctx.restore();

    // Gizmo
    this.gizmoRenderer.draw(
      ctx,
      w,
      h,
      state.currentQuat,
      state.hoveredAxis,
      state.clickableAxes
    );
  }
}