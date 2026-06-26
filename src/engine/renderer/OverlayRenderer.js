// src/engine/renderer/OverlayRenderer.js

/**
 * Renders 2D overlays on top of the 3D canvas (HUD elements).
 * This includes the equation bar, view label, and the tip text.
 */
export class OverlayRenderer {
  /**
   * @param {CanvasRenderingContext2D} ctx
   * @param {object} state - contains equation string, view name, etc.
   */
  draw(ctx, state) {
    this.drawEquationOverlay(ctx, state.equation);
    this.drawViewLabel(ctx, state.viewLabel);
    this.drawTip(ctx, state.tip);
  }

  drawEquationOverlay(ctx, equation) {
    if (!equation) return;
    const w = ctx.canvas.width;
    // Background
    ctx.save();
    ctx.font = '11px JetBrains Mono, monospace';
    const textWidth = ctx.measureText(equation).width;
    const boxWidth = Math.min(textWidth + 40, w - 160);
    const x = (w - boxWidth) / 2;
    const y = 16;

    ctx.fillStyle = 'rgba(11,11,10,0.72)';
    ctx.strokeStyle = 'rgba(255,255,255,0.1)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.roundRect(x, y, boxWidth, 28, 8);
    ctx.fill();
    ctx.stroke();

    // Label + text
    ctx.fillStyle = '#7a7870';
    ctx.font = '10px JetBrains Mono, monospace';
    ctx.fillText('f(t)', x + 10, y + 18);
    ctx.fillStyle = '#7a7870';
    ctx.font = '11px JetBrains Mono, monospace';
    ctx.fillText(equation, x + 40, y + 18);
    ctx.restore();
  }

  drawViewLabel(ctx, viewLabel) {
    if (!viewLabel) return;
    const w = ctx.canvas.width;
    ctx.save();
    ctx.font = '10px JetBrains Mono, monospace';
    ctx.textAlign = 'right';
    ctx.fillStyle = '#3d3c3a';
    ctx.fillText(viewLabel, w - 80, 16);
    ctx.restore();
  }

  drawTip(ctx, tip) {
    if (!tip) return;
    const w = ctx.canvas.width;
    const h = ctx.canvas.height;
    ctx.save();
    ctx.font = '10px JetBrains Mono, monospace';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#3d3c3a';
    ctx.fillText(tip, w / 2, h - 6);
    ctx.restore();
  }
}