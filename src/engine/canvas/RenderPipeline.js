// src/engine/canvas/RenderPipeline.js

/**
 * The RenderPipeline manages the order of drawing steps for the 3D scene.
 * It collects all drawable elements and renders them in sequence.
 * This is an optional abstraction that can replace direct calls in Scene.draw().
 */
export class RenderPipeline {
  constructor(ctx) {
    this.ctx = ctx;
    this.stages = [];
  }

  addStage(stage) {
    this.stages.push(stage);
  }

  draw(state) {
    const ctx = this.ctx;
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.save();
    ctx.translate(ctx.canvas.width / 2 + state.panX, ctx.canvas.height / 2 + state.panY);
    
    for (const stage of this.stages) {
      if (stage.beforeRestore !== false) {
        // default: draw inside the translated coordinate system
      }
      stage.draw(ctx, state);
    }
    
    ctx.restore();
  }
}