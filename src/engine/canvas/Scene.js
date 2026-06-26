// src/engine/canvas/Scene.js
import { GridRenderer } from '../renderer/GridRenderer';
import { EpicycleRenderer } from '../../features/fourier/canvas/EpicycleRenderer';
import { PathRenderer } from '../../features/fourier/canvas/PathRenderer';
import { GizmoRenderer } from '../gizmo/GizmoRenderer';

export class Scene {
  constructor(ctx, state) {
    this.ctx = ctx;
    this.state = state; // contains circles, path, camera state, etc.
    this.gridRenderer = new GridRenderer();
    this.epicycleRenderer = new EpicycleRenderer();
    this.pathRenderer = new PathRenderer();
    this.gizmoRenderer = new GizmoRenderer();
  }

  draw(scale, panX, panY, currentQuat) {
    const ctx = this.ctx;
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.save();
    // Center translation (original: translate(canvas.width/2+panX, canvas.height/2+panY))
    ctx.translate(ctx.canvas.width / 2 + panX, ctx.canvas.height / 2 + panY);

    // 1. Grid and axes
    this.gridRenderer.draw(ctx, scale, panX, panY, currentQuat);

    // 2. Epicycles and path
    const { circles, path, time } = this.state;
    this.epicycleRenderer.draw(ctx, scale, circles, time);
    this.pathRenderer.draw(ctx, scale, path, time);

    ctx.restore();

    // 3. Gizmo (drawn in screen space)
    this.gizmoRenderer.draw(ctx, ctx.canvas.width, ctx.canvas.height, currentQuat, this.state.hoveredAxis);
  }
}