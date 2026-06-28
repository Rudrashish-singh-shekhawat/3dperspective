export const mathDiagramsPart1 = {
  pythagorean: (ctx, x, y, graphWidth, graphHeight, formulaLabel, prog, opacity, globalTime, helpers) => {
    const { drawChalkLine, drawChalkText, WHITE, CYAN, PURPLE } = helpers;
    const cx = x + graphWidth / 2 - 12;
    const cy = y + 20;
    const aLen = graphHeight * 0.28;
    const bLen = graphHeight * 0.38;

    const pA = { x: cx, y: cy - aLen };
    const pB = { x: cx, y: cy };
    const pC = { x: cx + bLen, y: cy };

    if (prog > 0.1) {
      drawChalkLine(ctx, [pA, pB, pC, pA], opacity, 1.5, WHITE);
      drawChalkLine(ctx, [{ x: cx, y: cy - 4 }, { x: cx + 4, y: cy - 4 }, { x: cx + 4, y: cy }], opacity * 0.5, 1);

      drawChalkText(ctx, 'a', cx - 12, cy - aLen / 2 - 4, opacity * 0.8, 11, PURPLE);
      drawChalkText(ctx, 'b', cx + bLen / 2 - 4, cy + 6, opacity * 0.8, 11, CYAN);
      drawChalkText(ctx, 'c', cx + bLen / 2 - 12, cy - aLen / 2 - 12, opacity * 0.8, 11, WHITE);
    }

    if (prog > 0.3) {
      drawChalkLine(ctx, [
        { x: cx, y: cy - aLen },
        { x: cx - aLen, y: cy - aLen },
        { x: cx - aLen, y: cy },
        { x: cx, y: cy }
      ], opacity * 0.45, 1.0, PURPLE);

      drawChalkLine(ctx, [
        { x: cx, y: cy },
        { x: cx, y: cy + bLen },
        { x: cx + bLen, y: cy + bLen },
        { x: cx + bLen, y: cy }
      ], opacity * 0.45, 1.0, CYAN);
    }

    const pD = { x: pA.x + aLen, y: pA.y - bLen };
    const pE = { x: pC.x + aLen, y: pC.y - bLen };

    if (prog > 0.7) {
      drawChalkLine(ctx, [pA, pD, pE, pC], opacity * 0.45, 1.0, WHITE);
      drawChalkText(ctx, 'a² + b² = c²', cx + bLen * 0.5 - 20, cy + bLen + 15, opacity, 11, WHITE);
    }

    if (prog > 0.7) {
      const t = (globalTime * 0.015) % 1.0;
      const sy_a = (cy - aLen) + aLen * t;
      drawChalkLine(ctx, [{ x: cx - aLen, y: sy_a }, { x: cx - aLen, y: sy_a + 2 }], opacity * 0.8, 2.5, PURPLE);

      const sx_b = cx + bLen * t;
      drawChalkLine(ctx, [{ x: sx_b, y: cy + bLen }, { x: sx_b + 2, y: cy + bLen }], opacity * 0.8, 2.5, CYAN);

      const sx_c = pA.x + (pD.x - pA.x) * t;
      const sy_c = pA.y + (pD.y - pA.y) * t;
      drawChalkLine(ctx, [{ x: sx_c, y: sy_c }, { x: sx_c + 2, y: sy_c + 2 }], opacity * 0.8, 2.5, WHITE);
    }
  },

  polar: (ctx, x, y, graphWidth, graphHeight, formulaLabel, prog, opacity, globalTime, helpers) => {
    const { drawChalkLine, drawChalkText, CYAN, PURPLE } = helpers;
    const cx = x + graphWidth / 2;
    const cy = y + 10;
    const maxR = graphHeight * 0.42;

    if (prog > 0.1) {
      drawChalkLine(ctx, [{ x: cx - maxR - 10, y: cy }, { x: cx + maxR + 10, y: cy }], opacity * 0.3, 1);
      drawChalkLine(ctx, [{ x: cx, y: cy - maxR - 10 }, { x: cx, y: cy + maxR + 10 }], opacity * 0.3, 1);

      for (let r = 15; r <= maxR; r += 16) {
        const circPts = [];
        for (let a = 0; a <= Math.PI * 2 + 0.1; a += 0.25) {
          circPts.push({ x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) });
        }
        drawChalkLine(ctx, circPts, opacity * 0.25, 0.8, PURPLE);
      }
    }

    if (prog > 0.4) {
      const angle = globalTime * 0.015;
      const r = maxR * 0.85;
      const px = cx + r * Math.cos(angle);
      const py = cy - r * Math.sin(angle);

      drawChalkLine(ctx, [{ x: cx, y: cy }, { x: px, y: py }], opacity * 0.65, 1.2, CYAN);

      ctx.beginPath();
      ctx.arc(px, py, 3, 0, Math.PI * 2);
      ctx.fillStyle = `${CYAN}${opacity})`;
      ctx.fill();

      const arcPts = [];
      for (let a = 0; a <= angle % (Math.PI * 2); a += 0.1) {
        arcPts.push({ x: cx + 12 * Math.cos(a), y: cy - 12 * Math.sin(a) });
      }
      if (arcPts.length > 1) {
        drawChalkLine(ctx, arcPts, opacity * 0.7, 1.0, PURPLE);
      }
      drawChalkText(ctx, 'θ', cx + 15 * Math.cos(angle * 0.5) + 2, cy - 15 * Math.sin(angle * 0.5) - 4, opacity * 0.8, 10, PURPLE);
      drawChalkText(ctx, '(r, θ)', px + 4, py - 6, opacity, 11, CYAN);
    }
  },

  tangent: (ctx, x, y, graphWidth, graphHeight, formulaLabel, prog, opacity, globalTime, helpers) => {
    const { drawChalkLine, drawChalkText, CYAN, PURPLE } = helpers;
    const lx = x + 15;
    const cy = y + 10;
    const lw = graphWidth - 30;
    const lh = graphHeight * 0.35;

    if (prog > 0.1) {
      drawChalkLine(ctx, [{ x: lx, y: cy }, { x: lx + lw, y: cy }], opacity * 0.35, 1);
      drawChalkLine(ctx, [{ x: lx, y: cy - lh - 5 }, { x: lx, y: cy + lh + 5 }], opacity * 0.35, 1);
    }

    const sinePts = [];
    const steps = 40;
    for (let i = 0; i <= steps; i++) {
      const u = i / steps;
      const px = lx + u * lw;
      const py = cy - Math.sin(u * Math.PI * 3.5) * lh;
      sinePts.push({ x: px, y: py });
    }

    if (prog > 0.3) {
      drawChalkLine(ctx, sinePts, opacity * 0.65, 1.5, 'rgba(255, 255, 255, ');
    }

    if (prog > 0.5) {
      const tVal = (globalTime * 0.005) % 1.0;
      const px = lx + tVal * lw;
      const py = cy - Math.sin(tVal * Math.PI * 3.5) * lh;

      ctx.beginPath();
      ctx.arc(px, py, 3, 0, Math.PI * 2);
      ctx.fillStyle = `${CYAN}${opacity})`;
      ctx.fill();

      const slope = -Math.cos(tVal * Math.PI * 3.5) * lh * (Math.PI * 3.5 / lw);
      const tAngle = Math.atan(slope);
      const segW = 18;
      const tx1 = px - segW * Math.cos(tAngle);
      const ty1 = py - segW * Math.sin(tAngle);
      const tx2 = px + segW * Math.cos(tAngle);
      const ty2 = py + segW * Math.sin(tAngle);

      drawChalkLine(ctx, [{ x: tx1, y: ty1 }, { x: tx2, y: ty2 }], opacity, 1.8, CYAN);
      drawChalkText(ctx, "dy/dx = f'(x)", px - 12, py - lh - 8, opacity, 10, PURPLE);
    }
  }
};
