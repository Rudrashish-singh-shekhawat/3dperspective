// src/features/fourier/canvas/FourierRenderer.js
import { GridRenderer } from '../../../engine/renderer/GridRenderer';
import { EpicycleRenderer } from './EpicycleRenderer';
import { PathRenderer } from './PathRenderer';

/**
 * Specialised renderer for the Fourier scene.
 * Combines grid, epicycles, and path drawing in the correct order.
 */
export class FourierRenderer {
  constructor(ctx) {
    this.ctx = ctx;
    this.gridRenderer = new GridRenderer();
    this.epicycleRenderer = new EpicycleRenderer();
    this.pathRenderer = new PathRenderer();
  }

  draw(state) {
    const ctx = this.ctx;
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.save();
    ctx.translate(ctx.canvas.width / 2 + state.panX, ctx.canvas.height / 2 + state.panY);

    // 1. Grid plane and axes
    this.gridRenderer.draw(ctx, state.scale, state.panX, state.panY, state.currentQuat);

    // 2. Epicycles (circles, arms, dots)
    this.epicycleRenderer.draw(ctx, state.scale, state.circles, state.time);

    // 3. Path trail (3D spiral)
    this.pathRenderer.draw(ctx, state.scale, state.path, state.time);

    ctx.restore();
  }
}