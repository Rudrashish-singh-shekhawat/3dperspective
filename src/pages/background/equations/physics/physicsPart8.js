export const physicsPart8 = {
  // ==========================================
  // Carnot Diagram
  // ==========================================
  carnot: (ctx, x, y, graphWidth, graphHeight, formulaLabel, prog, opacity, globalTime, helpers) => {
    const { drawChalkLine, drawChalkText, CYAN, PURPLE } = helpers;
    const lx = x + 25;
    const cy = y + 10;
    const lw = graphWidth - 40;
    const lh = graphHeight * 0.5;

    const ox = lx;
    const oy = cy + lh / 2;

    if (prog > 0.1) {
      drawChalkLine(ctx, [{ x: ox, y: oy }, { x: ox + lw, y: oy }], opacity * 0.4, 1);
      drawChalkLine(ctx, [{ x: ox, y: oy }, { x: ox, y: oy - lh - 10 }], opacity * 0.4, 1);
      drawChalkText(ctx, 'P', ox - 14, oy - lh - 6, opacity * 0.5, 10);
      drawChalkText(ctx, 'V', ox + lw - 2, oy + 12, opacity * 0.5, 10);
    }

    const pA = { x: ox + lw * 0.2, y: oy - lh * 0.8 };
    const pB = { x: ox + lw * 0.42, y: oy - lh * 0.58 };
    const pC = { x: ox + lw * 0.75, y: oy - lh * 0.22 };
    const pD = { x: ox + lw * 0.48, y: oy - lh * 0.35 };

    if (prog > 0.3) {
      drawChalkLine(ctx, [pA, pB], opacity, 1.5, CYAN);
      drawChalkLine(ctx, [pD, pC], opacity, 1.5, CYAN);
      drawChalkLine(ctx, [pB, pC], opacity, 1.5, PURPLE);
      drawChalkLine(ctx, [pA, pD], opacity, 1.5, PURPLE);

      drawChalkText(ctx, 'T_H', pA.x + 8, pA.y - 4, opacity * 0.5, 9, CYAN);
      drawChalkText(ctx, 'T_C', pC.x - 14, pC.y + 8, opacity * 0.5, 9, CYAN);
    }

    if (prog > 0.6) {
      const tVal = (globalTime * 0.006) % 1.0;
      let px = pA.x, py = pA.y;
      let color = CYAN;

      if (tVal < 0.25) {
        const u = tVal / 0.25;
        px = pA.x + (pB.x - pA.x) * u;
        py = pA.y + (pB.y - pA.y) * u;
        color = CYAN;
      } else if (tVal < 0.5) {
        const u = (tVal - 0.25) / 0.25;
        px = pB.x + (pC.x - pB.x) * u;
        py = pB.y + (pC.y - pB.y) * u;
        color = PURPLE;
      } else if (tVal < 0.75) {
        const u = (tVal - 0.5) / 0.25;
        px = pC.x + (pD.x - pC.x) * u;
        py = pC.y + (pD.y - pC.y) * u;
        color = CYAN;
      } else {
        const u = (tVal - 0.75) / 0.25;
        px = pD.x + (pA.x - pD.x) * u;
        py = pD.y + (pA.y - pD.y) * u;
        color = PURPLE;
      }

      ctx.beginPath();
      ctx.arc(px, py, 3.5, 0, Math.PI * 2);
      ctx.fillStyle = `${color}${opacity})`;
      ctx.fill();
    }
  },
  // ==========================================
  // Transverse Diagram
  // ==========================================
  transverse: (ctx, x, y, graphWidth, graphHeight, formulaLabel, prog, opacity, globalTime, helpers) => {
    const { drawChalkLine, drawChalkArrow, CYAN, PURPLE, WHITE } = helpers;
    const lx = x + 15;
    const ly = y + 10;
    const lw = graphWidth - 30;

    if (prog > 0.1) {
      drawChalkLine(ctx, [{ x: lx, y: ly }, { x: lx + lw, y: ly }], opacity * 0.35, 1);
    }

    if (prog > 0.3) {
      const dots = 14;
      const step = lw / dots;
      const amp = graphHeight * 0.32;

      const wavePts = [];
      for (let i = 0; i <= 40; i++) {
        const u = i / 40;
        const wx = lx + u * lw;
        const wy = ly - Math.sin(globalTime * 0.05 - u * Math.PI * 4) * amp;
        wavePts.push({ x: wx, y: wy });
      }
      drawChalkLine(ctx, wavePts, opacity * 0.5, 1.0, PURPLE);

      for (let i = 0; i <= dots; i++) {
        const px = lx + i * step;
        const py = ly - Math.sin(globalTime * 0.05 - (i / dots) * Math.PI * 4) * amp;

        ctx.beginPath();
        ctx.arc(px, py, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = `${CYAN}${opacity})`;
        ctx.fill();

        if (i === 7) {
          drawChalkArrow(ctx, px, py, px, py - 12 * Math.sin(globalTime * 0.1), opacity * 0.8, 1, WHITE);
        }
      }
    }
  },
  // ==========================================
  // Induction Diagram
  // ==========================================
  induction: (ctx, x, y, graphWidth, graphHeight, formulaLabel, prog, opacity, globalTime, helpers) => {
    const { drawChalkLine, drawChalkText, drawChalkArrow, WHITE, CYAN, PURPLE } = helpers;
    const cx = x + graphWidth / 2;
    const cy = y + 10;

    const osc = Math.sin(globalTime * 0.04);
    const magX = cx - 35 + osc * 24;
    const magY = cy;

    if (prog > 0.1) {
      const mw = 36, mh = 14;
      drawChalkLine(ctx, [
        { x: magX - mw / 2, y: magY - mh / 2 },
        { x: magX + mw / 2, y: magY - mh / 2 },
        { x: magX + mw / 2, y: magY + mh / 2 },
        { x: magX - mw / 2, y: magY + mh / 2 },
        { x: magX - mw / 2, y: magY - mh / 2 }
      ], opacity, 1.5, WHITE);
      drawChalkLine(ctx, [{ x: magX, y: magY - mh / 2 }, { x: magX, y: magY + mh / 2 }], opacity * 0.8, 1);
      drawChalkText(ctx, 'S', magX - 12, magY - 4, opacity, 10, WHITE);
      drawChalkText(ctx, 'N', magX + 4, magY - 4, opacity, 10, WHITE);
    }

    if (prog > 0.3) {
      const loopX = cx + 38;
      const rx = 10, ry = 22;

      ctx.save();
      ctx.beginPath();
      ctx.ellipse(loopX, cy, rx, ry, 0, 0, Math.PI * 2);
      ctx.strokeStyle = `${WHITE}${opacity * 0.65})`;
      ctx.lineWidth = 1.6;
      ctx.stroke();
      ctx.restore();

      const velocity = Math.cos(globalTime * 0.04);
      if (Math.abs(velocity) > 0.25) {
        const isGoingRight = velocity > 0;
        const pulseCol = isGoingRight ? CYAN : PURPLE;
        drawChalkArrow(ctx, loopX, cy - ry, loopX + (isGoingRight ? 2 : -2), cy - ry, opacity, 2, pulseCol);
        drawChalkText(ctx, 'I', loopX - 3, cy - ry - 12, opacity, 10, pulseCol);
      }
    }

    if (prog > 0.6) {
      const fLoop1 = [];
      for (let a = 0; a <= Math.PI * 2; a += 0.2) {
        fLoop1.push({
          x: magX + 18 + Math.cos(a) * 18,
          y: magY + Math.sin(a) * 14
        });
      }
      drawChalkLine(ctx, fLoop1, opacity * 0.3, 1, CYAN);
    }
  },
  // ==========================================
  // Photoelectric Diagram
  // ==========================================
  photoelectric: (ctx, x, y, graphWidth, graphHeight, formulaLabel, prog, opacity, globalTime, helpers) => {
    const { drawChalkLine, drawChalkText, drawChalkArrow, CYAN, PURPLE } = helpers;
    const cx = x + graphWidth / 2;
    const cy = y + 10;
    const dX = 35;
    const phH = graphHeight * 0.4;

    if (prog > 0.1) {
      drawChalkLine(ctx, [{ x: cx - dX, y: cy - phH }, { x: cx - dX, y: cy + phH }], opacity, 2.2, PURPLE);
      drawChalkLine(ctx, [{ x: cx + dX, y: cy - phH }, { x: cx + dX, y: cy + phH }], opacity, 2.2, CYAN);

      drawChalkText(ctx, 'Emitter', cx - dX - 38, cy + phH + 4, opacity * 0.5, 9);
      drawChalkText(ctx, 'Collector', cx + dX - 10, cy + phH + 4, opacity * 0.5, 9);
    }

    if (prog > 0.4) {
      const pCount = 3;
      for (let i = 0; i < pCount; i++) {
        const wavePts = [];
        const startX = cx - dX - 38;
        const startY = cy - 25 + i * 20;
        const phase = globalTime * 0.15;

        for (let j = 0; j <= 12; j++) {
          const u = j / 12;
          const px = startX + u * 35;
          const py = startY + Math.sin(u * Math.PI * 4 - phase) * 5;
          wavePts.push({ x: px, y: py });
        }
        drawChalkLine(ctx, wavePts, opacity, 1, PURPLE);
      }
    }

    if (prog > 0.6) {
      const eCount = 3;
      for (let i = 0; i < eCount; i++) {
        const ePhase = (globalTime * 0.015 + i * 0.33) % 1.0;
        const ex = cx - dX + ePhase * (dX * 2);
        const ey = cy - 15 + i * 15;

        ctx.beginPath();
        ctx.arc(ex, ey, 2, 0, Math.PI * 2);
        ctx.fillStyle = `${CYAN}${opacity})`;
        ctx.fill();

        drawChalkArrow(ctx, ex, ey, ex + 8, ey, opacity * 0.7, 1.0, CYAN);
      }
      drawChalkText(ctx, 'e⁻', cx, cy - 26, opacity, 10, CYAN);
    }
  },
  // ==========================================
  // Spacetime Diagram
  // ==========================================
  spacetime: (ctx, x, y, graphWidth, graphHeight, formulaLabel, prog, opacity, globalTime, helpers) => {
    const { drawChalkLine, drawChalkText, drawChalkArrow, CYAN, PURPLE } = helpers;
    const cx = x + graphWidth / 2;
    const cy = y + 10;
    const massR = 12;

    if (prog > 0.1) {
      for (let r = 10; r <= graphWidth * 0.45; r += 14) {
        const circlePts = [];
        for (let a = 0; a <= Math.PI * 2 + 0.1; a += 0.2) {
          const distToMass = r;
          const warp = 1 + 10 / (distToMass + 2);
          const px = cx + r * warp * Math.cos(a);
          const py = cy + r * warp * Math.sin(a) * 0.65;
          circlePts.push({ x: px, y: py });
        }
        drawChalkLine(ctx, circlePts, opacity * 0.3, 1, PURPLE);
      }
    }

    if (prog > 0.4) {
      const bodyPts = [];
      for (let a = 0; a <= Math.PI * 2 + 0.1; a += 0.4) {
        bodyPts.push({ x: cx + massR * Math.cos(a), y: cy + massR * Math.sin(a) });
      }
      drawChalkLine(ctx, bodyPts, opacity, 1.8, PURPLE);
      drawChalkText(ctx, 'M', cx - 4, cy - 4, opacity, 10, PURPLE);
    }

    if (prog > 0.6) {
      const satAngle = globalTime * 0.025;
      const r = graphWidth * 0.3;
      const satX = cx + r * Math.cos(satAngle);
      const satY = cy + r * Math.sin(satAngle) * 0.65;

      ctx.beginPath();
      ctx.arc(satX, satY, 3, 0, Math.PI * 2);
      ctx.fillStyle = `${CYAN}${opacity})`;
      ctx.fill();

      const vAngle = satAngle + Math.PI / 2;
      drawChalkArrow(ctx, satX, satY, satX + Math.cos(vAngle) * 14, satY + Math.sin(vAngle) * 14 * 0.65, opacity, 1, CYAN);
    }
  }
};
