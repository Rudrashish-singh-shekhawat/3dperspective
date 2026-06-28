export const LABEL_SIZE = 11;
export const PARTICLE_RADIUS = 3;
export const DEFAULT_OPACITY = 0.5;

export const getCenter = (x, y, w) => ({ cx: x + w / 2, cy: y + 10 });

export const drawCircle = (ctx, cx, cy, r, opacity, color, fill = false) => {
  ctx.save();
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  if (fill) {
    ctx.fillStyle = color || `rgba(255, 255, 255, ${opacity})`;
    ctx.fill();
  } else {
    ctx.strokeStyle = color || `rgba(255, 255, 255, ${opacity})`;
    ctx.lineWidth = 1.5;
    ctx.stroke();
  }
  ctx.restore();
};

export const drawParticle = (ctx, cx, cy, opacity, color) => {
  drawCircle(ctx, cx, cy, PARTICLE_RADIUS, opacity, color, true);
};
export const helpersExtended = { drawParticle };
