// src/features/fourier/canvas/GraphRenderer.js

/**
 * Renders the 2D parametric shape (orthographic projection) on the Ortho sidebar.
 * The shape is drawn from the path points, using (x, y) as the coordinates.
 */
export class GraphRenderer {
  /**
   * @param {CanvasRenderingContext2D} ctx
   * @param {Array} path - path points (most recent first) with {x, y}
   * @param {number} pWidth - panel canvas width
   * @param {number} pHeight - panel canvas height
   */
  draw(ctx, path, pWidth, pHeight) {
    if (path.length < 2) return;

    // Determine amplitude scaling for the shape
    let maxAmp = 0.001;
    for (let i = 0; i < path.length; i++) {
      maxAmp = Math.max(maxAmp, Math.abs(path[i].x), Math.abs(path[i].y));
    }

    // Shape area occupies most of the available space, centered
    const shapeSize = Math.min(pWidth * 0.8, pHeight * 0.8);
    const shapeCx = pWidth / 2;
    const shapeCy = pHeight / 2;
    const shapeScale = (shapeSize / 2) / maxAmp;

    // Draw grid
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'rgba(255,255,255,0.03)';
    ctx.beginPath();
    const gridStep = 40;
    // Vertical grid lines
    for (let x = shapeCx % gridStep; x < pWidth; x += gridStep) {
      ctx.moveTo(x, 0);
      ctx.lineTo(x, pHeight);
    }
    // Horizontal grid lines
    for (let y = shapeCy % gridStep; y < pHeight; y += gridStep) {
      ctx.moveTo(0, y);
      ctx.lineTo(pWidth, y);
    }
    ctx.stroke();

    // Axis lines (crosshairs)
    ctx.beginPath();
    ctx.moveTo(shapeCx - shapeSize / 2, shapeCy);
    ctx.lineTo(shapeCx + shapeSize / 2, shapeCy);
    ctx.moveTo(shapeCx, shapeCy - shapeSize / 2);
    ctx.lineTo(shapeCx, shapeCy + shapeSize / 2);
    ctx.strokeStyle = 'rgba(255,255,255,0.15)';
    ctx.lineWidth = 1;
    ctx.stroke();

    // Draw the parametric shape
    ctx.beginPath();
    for (let i = 0; i < path.length; i++) {
      const pt = path[i];
      const xPos = shapeCx + pt.x * shapeScale;
      const yPos = shapeCy - pt.y * shapeScale;
      if (i === 0) ctx.moveTo(xPos, yPos);
      else ctx.lineTo(xPos, yPos);
    }
    
    // Glow effect
    ctx.shadowBlur = 10;
    ctx.shadowColor = 'rgba(62,207,142,0.5)';
    ctx.strokeStyle = 'rgba(62,207,142,0.9)'; // Green
    ctx.lineWidth = 1.5;
    ctx.stroke();
    
    // Reset shadow
    ctx.shadowBlur = 0;
  }
}