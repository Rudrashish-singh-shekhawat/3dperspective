import { LABEL_SIZE, getCenter } from './physicsHelpers';

export const physicsPart4 = {
  // ==========================================
  // Capacitor Diagram
  // ==========================================
  capacitor: (ctx, x, y, graphWidth, graphHeight, formulaLabel, prog, opacity, globalTime, helpers) => {
    const { drawChalkLine, drawChalkText, drawChalkArrow, CYAN, PURPLE } = helpers;
    const { cx, cy } = getCenter(x, y, graphWidth);
    const pw = graphWidth * 0.65;
    const p1y = cy - 18;
    const p2y = cy + 18;

    if (prog > 0.1) {
      drawChalkLine(ctx, [{ x: cx - pw / 2, y: p1y }, { x: cx + pw / 2, y: p1y }], opacity, 2.2, PURPLE);
      drawChalkLine(ctx, [{ x: cx - pw / 2, y: p2y }, { x: cx + pw / 2, y: p2y }], opacity, 2.2, CYAN);

      const signCount = 6;
      for (let i = 0; i < signCount; i++) {
        const sx = cx - pw / 2 + (i + 0.5) * (pw / signCount);
        drawChalkText(ctx, '+', sx - 3, p1y - 12, opacity * 0.8, LABEL_SIZE, PURPLE);
        drawChalkText(ctx, '-', sx - 3, p2y + 12, opacity * 0.8, LABEL_SIZE, CYAN);
      }
    }

    if (prog > 0.4) {
      // Physics: E-field vectors animated as expanding arrows, not moving charges
      const arrowCount = 5;
      const phase = (globalTime * 0.05) % Math.PI;
      const fieldStrength = Math.abs(Math.sin(phase));
      const arrowLen = (p2y - p1y - 8) * fieldStrength;

      for (let i = 0; i < arrowCount; i++) {
        const ax = cx - pw / 2 + (i + 0.5) * (pw / arrowCount);
        if (arrowLen > 2) {
          drawChalkArrow(ctx, ax, p1y + 4, ax, p1y + 4 + arrowLen, opacity * 0.7, 1.2, CYAN);
        }
      }
    }

    if (prog > 0.7) {
      // Circuit connections
      drawChalkLine(ctx, [{ x: cx - pw / 2, y: p1y }, { x: cx - pw / 2 - 12, y: p1y }, { x: cx - pw / 2 - 12, y: cy }, { x: cx - 20, y: cy }], opacity * 0.45, 1);
      drawChalkLine(ctx, [{ x: cx + pw / 2, y: p2y }, { x: cx + pw / 2 + 12, y: p2y }, { x: cx + pw / 2 + 12, y: cy }, { x: cx + 20, y: cy }], opacity * 0.45, 1);

      drawChalkText(ctx, 'E Field', cx + pw / 2 + 4, cy - 10, opacity * 0.75, LABEL_SIZE, CYAN);
    }
  },
  // ==========================================
  // Bohr Diagram
  // ==========================================
  bohr: (ctx, x, y, graphWidth, graphHeight, formulaLabel, prog, opacity, globalTime, helpers) => {
    const { drawChalkLine, drawChalkText, drawChalkArrow, WHITE, CYAN, PURPLE } = helpers;
    const cx = x + graphWidth / 2;
    const cy = y + 10;

    if (prog > 0.1) {
      const nucPts = [];
      for (let a = 0; a <= Math.PI * 2 + 0.1; a += 0.5) {
        nucPts.push({ x: cx + 6 * Math.cos(a), y: cy + 6 * Math.sin(a) });
      }
      drawChalkLine(ctx, nucPts, opacity, 1.5, PURPLE);
      drawChalkText(ctx, '+', cx - 3, cy, opacity, 10, PURPLE);
    }

    const r1 = graphHeight * 0.22;
    const r2 = graphHeight * 0.44;

    if (prog > 0.3) {
      ctx.save();
      ctx.setLineDash([3, 4]);
      ctx.beginPath();
      ctx.arc(cx, cy, r1, 0, Math.PI * 2);
      ctx.strokeStyle = `${WHITE}${opacity * 0.4})`;
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(cx, cy, r2, 0, Math.PI * 2);
      ctx.strokeStyle = `${WHITE}${opacity * 0.4})`;
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.restore();

      drawChalkText(ctx, 'n=1', cx + r1 + 3, cy - 8, opacity * 0.4, LABEL_SIZE - 2);
      drawChalkText(ctx, 'n=2', cx + r2 + 3, cy - 8, opacity * 0.4, LABEL_SIZE - 2);
      
      // Disclaimer
      drawChalkText(ctx, 'Bohr Model (Simplified)', cx - 40, cy + r2 + 15, opacity * 0.6, LABEL_SIZE - 2, CYAN);
    }

    if (prog > 0.6) {
      const cycle = globalTime % 200;
      const isJumping = cycle > 140;

      if (isJumping) {
        const jumpT = (cycle - 140) / 60;
        const currentR = r2 - (r2 - r1) * Math.min(1, jumpT * 1.5);
        const angle = -Math.PI / 4 + jumpT * (Math.PI * 0.4);
        const ex = cx + currentR * Math.cos(angle);
        const ey = cy + currentR * Math.sin(angle);

        ctx.beginPath();
        ctx.arc(ex, ey, 3, 0, Math.PI * 2);
        ctx.fillStyle = `${CYAN}${opacity})`;
        ctx.fill();

        drawChalkArrow(ctx, cx + r2 * Math.cos(-Math.PI / 4), cy + r2 * Math.sin(-Math.PI / 4), cx + r1 * Math.cos(Math.PI * 0.15), cy + r1 * Math.sin(Math.PI * 0.15), opacity * 0.5, 1.0, CYAN);

        if (jumpT > 0.4) {
          const photonT = (jumpT - 0.4) / 0.6;
          const pAngle = Math.PI / 5;
          const photonPts = [];
          const startDist = r1;
          const pLength = 35;
          const currentDist = startDist + photonT * 40;

          for (let i = 0; i <= 15; i++) {
            const u = i / 15;
            const d = currentDist + u * pLength;
            const wAmp = 4 * Math.sin(u * Math.PI * 5 + globalTime * 0.25);
            const px = cx + d * Math.cos(pAngle) - wAmp * Math.sin(pAngle);
            const py = cy + d * Math.sin(pAngle) + wAmp * Math.cos(pAngle);
            photonPts.push({ x: px, y: py });
          }
          drawChalkLine(ctx, photonPts, opacity * (1 - photonT * 0.4), 1.0, CYAN);
          drawChalkText(ctx, 'hν', cx + (currentDist + 15) * Math.cos(pAngle) - 12, cy + (currentDist + 15) * Math.sin(pAngle) - 8, opacity * (1 - photonT), 9, CYAN);
        }
      } else {
        const eAngle = globalTime * 0.025;
        const ex = cx + r2 * Math.cos(eAngle);
        const ey = cy + r2 * Math.sin(eAngle);

        ctx.beginPath();
        ctx.arc(ex, ey, 3, 0, Math.PI * 2);
        ctx.fillStyle = `${CYAN}${opacity})`;
        ctx.fill();
      }
    }
  },
  // ==========================================
  // Magnetic Diagram
  // ==========================================
  magnetic: (ctx, x, y, graphWidth, graphHeight, formulaLabel, prog, opacity, globalTime, helpers) => {
    const { drawChalkLine, drawChalkText, drawChalkArrow, WHITE, CYAN, PURPLE } = helpers;
    const cx = x + graphWidth / 2;
    const cy = y + 10;
    const sw = graphWidth * 0.65;
    const sh = graphHeight * 0.22;

    if (prog > 0.1) {
      const loopCount = 6;
      const step = sw / loopCount;
      const loopPts = [];
      const phase = (globalTime * 0.08) % 1.0;

      for (let i = 0; i < loopCount; i++) {
        const lx = cx - sw / 2 + i * step;
        for (let a = -Math.PI / 2; a <= Math.PI * 1.5; a += 0.2) {
          const px = lx + step * (a + Math.PI / 2) / (Math.PI * 2);
          const py = cy + sh * Math.sin(a);
          loopPts.push({ x: px, y: py });
        }
        drawChalkLine(ctx, loopPts, opacity * 0.7, 1.5, WHITE);

        const pulseAngle = -Math.PI / 2 + phase * Math.PI * 2;
        const px = lx + step * (pulseAngle + Math.PI / 2) / (Math.PI * 2);
        const py = cy + sh * Math.sin(pulseAngle);
        drawChalkLine(ctx, [{ x: px - 1, y: py }, { x: px + 1, y: py }], opacity * 0.9, 3.5, PURPLE);

        loopPts.length = 0;
      }
      
      // Physics: Right-hand rule (Current I in wire creates B loops)
      drawChalkArrow(ctx, cx - sw / 2 - 10, cy, cx + sw / 2 + 10, cy, opacity * 0.8, 2.0, CYAN);
      drawChalkText(ctx, 'I', cx + sw / 2 + 15, cy - 6, opacity, LABEL_SIZE, CYAN);
    }

    if (prog > 0.4) {
      const bW = sw * 1.1;
      const bH = graphHeight * 0.42;

      for (let offset = 0; offset < 2; offset++) {
        const sizeMult = 0.85 + 0.15 * Math.sin(globalTime * 0.02 + offset * Math.PI);

        const topLoop = [];
        for (let a = 0; a <= Math.PI * 2; a += 0.15) {
          topLoop.push({
            x: cx + bW * 0.5 * sizeMult * Math.cos(a),
            y: cy - sh / 2 + bH * sizeMult * Math.sin(a)
          });
        }
        drawChalkLine(ctx, topLoop, opacity * 0.4, 1.0, CYAN);

        const botLoop = [];
        for (let a = 0; a <= Math.PI * 2; a += 0.15) {
          botLoop.push({
            x: cx + bW * 0.5 * sizeMult * Math.cos(a),
            y: cy + sh / 2 - bH * sizeMult * Math.sin(a)
          });
        }
        drawChalkLine(ctx, botLoop, opacity * 0.4, 1.0, CYAN);
      }

      drawChalkArrow(ctx, cx - sw / 2 - 15, cy, cx + sw / 2 + 20, cy, opacity * 0.7, 1.2, PURPLE);
      drawChalkText(ctx, 'B', cx + sw / 2 + 24, cy - 6, opacity, 11, PURPLE);
    }

    if (prog > 0.7) {
      drawChalkArrow(ctx, cx - 2, cy - sh / 2 - 3, cx + 5, cy - sh / 2 - 3, opacity * 0.8, 1, CYAN);
      drawChalkArrow(ctx, cx + 2, cy + sh/2 + 3, cx - 5, cy + sh/2 + 3, opacity * 0.8, 1, CYAN);
    }
  }
};
