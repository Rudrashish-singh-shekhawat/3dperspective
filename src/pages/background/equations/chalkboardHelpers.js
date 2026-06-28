export const FONT_FAMILY = "'Patrick Hand', cursive";
export const WHITE = 'rgba(255, 255, 255, ';
export const CYAN = 'rgba(100, 220, 255, ';
export const PURPLE = 'rgba(210, 100, 255, ';

export const drawChalkText = (ctx, text, x, y, opacity, fontSize, colorPrefix = WHITE) => {
  if (opacity <= 0.01 || !text) return;
  ctx.save();
  ctx.font = `${fontSize}px ${FONT_FAMILY}`;
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';

  // Main solid fill
  ctx.fillStyle = `${colorPrefix}${opacity * 0.85})`;
  ctx.fillText(text, x, y);

  // A second slightly offset pass for chalk thickness variation
  ctx.fillStyle = `${colorPrefix}${opacity * 0.3})`;
  ctx.fillText(text, x + 0.4, y - 0.3);

  ctx.restore();
};

export const drawChalkLine = (ctx, points, opacity, thickness = 1.5, colorPrefix = WHITE, limit = points.length) => {
  if (limit < 2 || opacity <= 0.01) return;
  ctx.save();

  // Main path — solid continuous
  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);
  for (let i = 1; i < limit; i++) {
    ctx.lineTo(points[i].x, points[i].y);
  }
  ctx.strokeStyle = `${colorPrefix}${opacity * 0.8})`;
  ctx.lineWidth = thickness;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.stroke();

  // Subtle second pass with slight offset for chalk width
  ctx.beginPath();
  ctx.moveTo(points[0].x + 0.3, points[0].y + 0.3);
  for (let i = 1; i < limit; i++) {
    ctx.lineTo(points[i].x + 0.3, points[i].y + 0.3);
  }
  ctx.strokeStyle = `${colorPrefix}${opacity * 0.25})`;
  ctx.lineWidth = thickness + 0.5;
  ctx.stroke();

  ctx.restore();
};

export const drawChalkArrow = (ctx, x1, y1, x2, y2, opacity, thickness = 1.5, colorPrefix = WHITE) => {
  drawChalkLine(ctx, [{ x: x1, y: y1 }, { x: x2, y: y2 }], opacity, thickness, colorPrefix);

  const angle = Math.atan2(y2 - y1, x2 - x1);
  const headLen = 6;
  const p1 = {
    x: x2 - headLen * Math.cos(angle - Math.PI / 6),
    y: y2 - headLen * Math.sin(angle - Math.PI / 6)
  };
  const p2 = {
    x: x2 - headLen * Math.cos(angle + Math.PI / 6),
    y: y2 - headLen * Math.sin(angle + Math.PI / 6)
  };
  drawChalkLine(ctx, [p1, { x: x2, y: y2 }, p2], opacity, thickness, colorPrefix);
};

export const drawAxes = (ctx, ox, oy, w, h, progress, opacity) => {
  const p = Math.min(1, progress * 3.5);
  if (p <= 0) return;

  const rightX = ox + w + 10;
  const topY = oy - h / 2 - 10;

  // X axis
  drawChalkLine(ctx, [
    { x: ox - 10 * p, y: oy },
    { x: ox + (w + 10) * p, y: oy }
  ], opacity * 0.4, 1);

  // Y axis
  drawChalkLine(ctx, [
    { x: ox, y: oy + (h / 2 + 10) * p },
    { x: ox, y: oy - (h / 2 + 10) * p }
  ], opacity * 0.4, 1);

  if (p >= 1) {
    // X arrow
    drawChalkLine(ctx, [
      { x: rightX - 5, y: oy - 3 },
      { x: rightX, y: oy },
      { x: rightX - 5, y: oy + 3 }
    ], opacity * 0.35, 1);
    // Y arrow
    drawChalkLine(ctx, [
      { x: ox - 3, y: topY + 5 },
      { x: ox, y: topY },
      { x: ox + 3, y: topY + 5 }
    ], opacity * 0.35, 1);

    drawChalkText(ctx, 'x', rightX - 4, oy + 14, opacity * 0.4, 12);
    drawChalkText(ctx, 'y', ox - 14, topY + 4, opacity * 0.4, 12);
  }
};

export const getWritingWidth = (text, progress, fontSize) => {
  const idx = Math.floor(progress);
  const frac = progress - idx;
  
  // Use a temporary canvas to measure text dimensions
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  ctx.font = `${fontSize}px ${FONT_FAMILY}`;
  const baseWidth = ctx.measureText(text.substring(0, Math.min(idx, text.length))).width;
  if (idx < text.length) {
    const charW = ctx.measureText(text.charAt(idx)).width;
    return baseWidth + charW * frac;
  }
  return baseWidth;
};

export const drawDiagram = (ctx, diagramType, x, y, graphWidth, graphHeight, formulaLabel, prog, opacity, globalTime, physicsDiagrams, mathDiagrams) => {
  if (prog > 0.1) {
    const labelChars = Math.floor(formulaLabel.length * Math.min(1, prog * 1.5));
    drawChalkText(ctx, formulaLabel.substring(0, labelChars), x, y - graphHeight / 2 - 16, opacity * 0.75, 13);
  }

  const helpers = { drawChalkLine, drawChalkText, drawChalkArrow, WHITE, CYAN, PURPLE };

  const physicsFn = physicsDiagrams[diagramType];
  if (physicsFn) {
    physicsFn(ctx, x, y, graphWidth, graphHeight, formulaLabel, prog, opacity, globalTime, helpers);
    return;
  }

  const mathFn = mathDiagrams[diagramType];
  if (mathFn) {
    mathFn(ctx, x, y, graphWidth, graphHeight, formulaLabel, prog, opacity, globalTime, helpers);
    return;
  }
};
