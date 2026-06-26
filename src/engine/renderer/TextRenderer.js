// src/engine/renderer/TextRenderer.js

/**
 * Renders text directly at a screen position (non-projected).
 * Used for HUD elements, stats, and other 2D overlays drawn in screen space.
 */
export class TextRenderer {
  /**
   * @param {CanvasRenderingContext2D} ctx
   * @param {number} x - screen X
   * @param {number} y - screen Y
   * @param {string} text
   * @param {object} [options]
   * @param {string} [options.font='10px JetBrains Mono, monospace']
   * @param {string} [options.fillStyle='#e8e6df']
   * @param {string} [options.textAlign='left']
   * @param {string} [options.textBaseline='top']
   * @param {number} [options.maxWidth] - optional max width for wrapping
   */
  draw(ctx, x, y, text, options = {}) {
    const {
      font = '10px JetBrains Mono, monospace',
      fillStyle = '#e8e6df',
      textAlign = 'left',
      textBaseline = 'top',
      maxWidth,
    } = options;

    ctx.save();
    ctx.font = font;
    ctx.fillStyle = fillStyle;
    ctx.textAlign = textAlign;
    ctx.textBaseline = textBaseline;

    if (maxWidth) {
      ctx.fillText(text, x, y, maxWidth);
    } else {
      ctx.fillText(text, x, y);
    }
    ctx.restore();
  }
}