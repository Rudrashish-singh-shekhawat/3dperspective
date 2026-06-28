export const drawChalkLine = (ctx, x1, y1, x2, y2, opacity) => {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.9})`; // Much brighter
  ctx.lineWidth = 4; // Thicker
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.5})`;
  ctx.lineWidth = 2;
  ctx.setLineDash([1, 3]);
  ctx.stroke();
  ctx.setLineDash([]);
};

export const drawChalkCircle = (ctx, cx, cy, r, opacity, fill = false) => {
  if (fill) {
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 255, 255, ${opacity * 0.3})`;
    ctx.fill();
  }
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.9})`;
  ctx.lineWidth = 4;
  ctx.stroke();
};

export const drawChalkText = (ctx, text, x, y, opacity, size = 18) => {
  ctx.font = `italic ${size}px 'Times New Roman', serif`;
  ctx.fillStyle = `rgba(255, 255, 255, ${opacity * 0.9})`;
  ctx.fillText(text, x, y);
};

export const drawChalkArc = (ctx, cx, cy, r, startAngle, endAngle, opacity) => {
  ctx.beginPath();
  ctx.arc(cx, cy, r, startAngle, endAngle, startAngle > endAngle);
  ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.7})`;
  ctx.lineWidth = 2;
  ctx.stroke();
};

export const drawChalkArrow = (ctx, x, y, angle, length, label, opacity, dashed = false) => {
  const endX = x + Math.cos(angle) * length;
  const endY = y + Math.sin(angle) * length;

  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(endX, endY);
  ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.9})`;
  ctx.lineWidth = 2;
  if (dashed) ctx.setLineDash([4, 4]);
  ctx.stroke();
  ctx.setLineDash([]);

  // Arrowhead
  const headlen = 8;
  ctx.beginPath();
  ctx.moveTo(endX, endY);
  ctx.lineTo(endX - headlen * Math.cos(angle - Math.PI / 6), endY - headlen * Math.sin(angle - Math.PI / 6));
  ctx.moveTo(endX, endY);
  ctx.lineTo(endX - headlen * Math.cos(angle + Math.PI / 6), endY - headlen * Math.sin(angle + Math.PI / 6));
  ctx.stroke();

  if (label) {
    // Offset text slightly from arrowhead
    const textX = endX + Math.cos(angle) * 20 - 10;
    const textY = endY + Math.sin(angle) * 20 + 5;
    drawChalkText(ctx, label, textX, textY, opacity, 16);
  }
};
