export const mathDiagramsPart2 = {
  integral: (ctx, x, y, graphWidth, graphHeight, formulaLabel, prog, opacity, globalTime, helpers) => {
    const { drawChalkLine, drawChalkText, WHITE, CYAN, PURPLE } = helpers;
    const lx = x + 20;
    const cy = y + 10;
    const lw = graphWidth - 35;
    const lh = graphHeight * 0.5;

    const ox = lx;
    const oy = cy + lh / 2;

    if (prog > 0.1) {
      drawChalkLine(ctx, [{ x: ox, y: oy }, { x: ox + lw, y: oy }], opacity * 0.35, 1);
      drawChalkLine(ctx, [{ x: ox, y: oy }, { x: ox, y: oy - lh - 10 }], opacity * 0.35, 1);
    }

    const curvePts = [];
    const steps = 30;
    const intA = lw * 0.2;
    const intB = lw * 0.8;

    for (let i = 0; i <= steps; i++) {
      const u = i / steps;
      const px = ox + u * lw;
      const nx = u * 2.2;
      const py = oy - (nx * nx * 0.2 + 0.15) * lh;
      curvePts.push({ x: px, y: py });
    }

    if (prog > 0.3) {
      drawChalkLine(ctx, curvePts, opacity * 0.8, 1.6, CYAN);
    }

    if (prog > 0.4) {
      const colCount = 6;
      const colW = (intB - intA) / colCount;
      const drawAmp = Math.min(1, (prog - 0.4) / 0.6);
      const sweepX = intA + ((globalTime * 0.45) % (intB - intA));

      for (let i = 0; i < colCount; i++) {
        const rx = ox + intA + i * colW;
        const midX = rx + colW / 2;
        const midU = (midX - ox) / lw;
        const midNX = midU * 2.2;
        const ry = oy - (midNX * midNX * 0.2 + 0.15) * lh;

        if (rx + colW <= ox + sweepX) {
          drawChalkLine(ctx, [
            { x: rx, y: oy },
            { x: rx, y: ry },
            { x: rx + colW, y: ry },
            { x: rx + colW, y: oy }
          ], opacity * 0.32 * drawAmp, 1.0, PURPLE);
        }
      }

      drawChalkLine(ctx, [{ x: ox + sweepX, y: oy }, { x: ox + sweepX, y: oy - lh - 4 }], opacity * 0.5, 1, WHITE);
      drawChalkText(ctx, '∫ f(x)dx', ox + intA + 8, oy - lh - 14, opacity, 11, CYAN);
    }
  },

  fourierSeries: (ctx, x, y, graphWidth, graphHeight, formulaLabel, prog, opacity, globalTime, helpers) => {
    const { drawChalkLine, drawChalkText, CYAN, PURPLE } = helpers;
    const cx = x + graphWidth * 0.32;
    const cy = y + 10;

    if (prog > 0.1) {
      drawChalkLine(ctx, [{ x: cx + 45, y: cy }, { x: x + graphWidth - 10, y: cy }], opacity * 0.35, 1);
    }

    const R1 = graphHeight * 0.26;
    const t = globalTime * 0.025;

    const p1 = {
      x: cx + R1 * Math.cos(t),
      y: cy + R1 * Math.sin(t)
    };
    const p2 = {
      x: p1.x + (R1 / 3) * Math.cos(3 * t),
      y: p1.y + (R1 / 3) * Math.sin(3 * t)
    };
    const p3 = {
      x: p2.x + (R1 / 5) * Math.cos(5 * t),
      y: p2.y + (R1 / 5) * Math.sin(5 * t)
    };

    if (prog > 0.3) {
      ctx.beginPath(); ctx.arc(cx, cy, R1, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.22})`; ctx.stroke();
      drawChalkLine(ctx, [{ x: cx, y: cy }, p1], opacity * 0.65, 1.2, CYAN);

      ctx.beginPath(); ctx.arc(p1.x, p1.y, R1 / 3, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.22})`; ctx.stroke();
      drawChalkLine(ctx, [p1, p2], opacity * 0.65, 1.0, CYAN);

      ctx.beginPath(); ctx.arc(p2.x, p2.y, R1 / 5, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.22})`; ctx.stroke();
      drawChalkLine(ctx, [p2, p3], opacity * 0.65, 1.0, CYAN);
    }

    if (prog > 0.6) {
      const tracePts = [];
      const startX = cx + 45;
      const endX = x + graphWidth - 15;
      const traceW = endX - startX;

      drawChalkLine(ctx, [p3, { x: startX, y: p3.y }], opacity * 0.5, 1, PURPLE);

      ctx.beginPath();
      ctx.arc(p3.x, p3.y, 3, 0, Math.PI * 2);
      ctx.fillStyle = `${CYAN}${opacity})`;
      ctx.fill();

      for (let i = 0; i <= 30; i++) {
        const u = i / 30;
        const pastT = t - u * (Math.PI * 1.5);
        const val = R1 * Math.sin(pastT) + (R1 / 3) * Math.sin(3 * pastT) + (R1 / 5) * Math.sin(5 * pastT);
        tracePts.push({
          x: startX + u * traceW,
          y: cy + val
        });
      }
      drawChalkLine(ctx, tracePts, opacity, 1.5, PURPLE);
    }
  },

  argand: (ctx, x, y, graphWidth, graphHeight, formulaLabel, prog, opacity, globalTime, helpers) => {
    const { drawChalkLine, drawChalkText, WHITE, CYAN, PURPLE } = helpers;
    const cx = x + graphWidth / 2;
    const cy = y + 10;
    const maxR = graphHeight * 0.42;

    if (prog > 0.1) {
      drawChalkLine(ctx, [{ x: cx - maxR - 10, y: cy }, { x: cx + maxR + 10, y: cy }], opacity * 0.35, 1);
      drawChalkLine(ctx, [{ x: cx, y: cy - maxR - 10 }, { x: cx + maxR + 10, y: cy + maxR + 10 }], opacity * 0.35, 1);
      drawChalkText(ctx, 'Re', cx + maxR + 12, cy - 6, opacity * 0.5, 10);
      drawChalkText(ctx, 'Im', cx - 14, cy - maxR - 14, opacity * 0.5, 10);
    }

    if (prog > 0.4) {
      const angle = globalTime * 0.015;
      const rx = maxR * 0.88 * Math.cos(angle);
      const ry = maxR * 0.88 * Math.sin(angle);

      const px = cx + rx;
      const py = cy - ry;

      drawChalkLine(ctx, [{ x: cx, y: cy }, { x: px, y: py }], opacity, 1.8, WHITE);
      drawChalkText(ctx, 'z = x + iy', px + 4, py - 6, opacity, 11, WHITE);

      ctx.save();
      ctx.setLineDash([3, 3]);
      drawChalkLine(ctx, [{ x: px, y: py }, { x: px, y: cy }], opacity * 0.5, 1, PURPLE);
      drawChalkLine(ctx, [{ x: px, y: py }, { x: cx, y: py }], opacity * 0.5, 1, CYAN);
      ctx.restore();

      drawChalkText(ctx, 'x', cx + rx / 2 - 4, cy + 8, opacity * 0.8, 10, CYAN);
      drawChalkText(ctx, 'y', cx - 12, cy - ry / 2 - 4, opacity * 0.8, 10, PURPLE);
    }
  }
};
