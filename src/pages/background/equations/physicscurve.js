export const physicsDiagrams = {
  circular: (ctx, x, y, graphWidth, graphHeight, formulaLabel, prog, opacity, globalTime, helpers) => {
    const { drawChalkLine, drawChalkText, drawChalkArrow, CYAN, PURPLE } = helpers;
    const cx = x + graphWidth / 2;
    const cy = y + 10;
    const R = graphHeight * 0.35;
    const theta = globalTime * 0.025;
    const px = cx + R * Math.cos(theta);
    const py = cy + R * Math.sin(theta);

    if (prog > 0.1) {
      const circPts = [];
      const maxAngle = Math.PI * 2 * Math.min(1, (prog - 0.1) / 0.5);
      for (let a = 0; a <= maxAngle + 0.05; a += 0.12) {
        circPts.push({ x: cx + R * Math.cos(a), y: cy + R * Math.sin(a) });
      }
      if (circPts.length > 1) {
        drawChalkLine(ctx, circPts, opacity * 0.45, 1.2);
      }
    }
    if (prog > 0.5) {
      drawChalkLine(ctx, [{ x: cx, y: cy }, { x: px, y: py }], opacity * 0.5, 1.2, CYAN);
      drawChalkText(ctx, 'R', cx + (px - cx) * 0.5 - 12, cy + (py - cy) * 0.5 - 6, opacity * 0.5, 11, CYAN);
    }
    if (prog > 0.7) {
      const vAngle = theta + Math.PI / 2;
      const vx = px + Math.cos(vAngle) * 30;
      const vy = py + Math.sin(vAngle) * 30;
      drawChalkArrow(ctx, px, py, vx, vy, opacity, 1.5, PURPLE);
      drawChalkText(ctx, 'v', vx + 5, vy - 5, opacity, 12, PURPLE);

      const ax = px - Math.cos(theta) * 26;
      const ay = py - Math.sin(theta) * 26;
      drawChalkArrow(ctx, px, py, ax, ay, opacity * 0.8, 1.5, CYAN);
      drawChalkText(ctx, 'a_c', ax - 6, ay - 10, opacity * 0.8, 11, CYAN);
    }
  },
  pendulum: (ctx, x, y, graphWidth, graphHeight, formulaLabel, prog, opacity, globalTime, helpers) => {
    const { drawChalkLine, drawChalkText, drawChalkArrow, CYAN, PURPLE } = helpers;
    const cy = y - graphHeight * 0.4;
    const cx = x + graphWidth / 2;
    const theta = 0.35 * Math.sin(globalTime * 0.04);
    const L = graphHeight * 0.65;
    const bx = cx + L * Math.sin(theta);
    const by = cy + L * Math.cos(theta);

    if (prog > 0.1) {
      drawChalkLine(ctx, [{ x: cx - 35, y: cy }, { x: cx + 35, y: cy }], opacity * 0.5, 1.5);
      for (let sx = cx - 30; sx <= cx + 30; sx += 10) {
        drawChalkLine(ctx, [{ x: sx, y: cy }, { x: sx + 4, y: cy - 4 }], opacity * 0.3, 1);
      }
    }
    if (prog > 0.3) {
      drawChalkLine(ctx, [{ x: cx, y: cy }, { x: bx, y: by }], opacity * 0.6, 1.2, CYAN);
    }
    if (prog > 0.5) {
      const bobPts = [];
      for (let a = 0; a <= Math.PI * 2 + 0.1; a += 0.4) {
        bobPts.push({ x: bx + 7 * Math.cos(a), y: by + 7 * Math.sin(a) });
      }
      drawChalkLine(ctx, bobPts, opacity, 1.5, PURPLE);

      const dashedPts = [];
      for (let dy = cy; dy < cy + L; dy += 8) {
        dashedPts.push({ x: cx, y: dy });
        dashedPts.push({ x: cx, y: Math.min(cy + L, dy + 4) });
      }
      for (let k = 0; k < dashedPts.length; k += 2) {
        drawChalkLine(ctx, [dashedPts[k], dashedPts[k + 1]], opacity * 0.35, 1);
      }
    }
    if (prog > 0.7) {
      drawChalkArrow(ctx, bx, by, bx - Math.sin(theta) * 22, by - Math.cos(theta) * 22, opacity, 1.5, CYAN);
      drawChalkText(ctx, 'T', bx - Math.sin(theta) * 22 - 10, by - Math.cos(theta) * 22 - 5, opacity, 11, CYAN);

      drawChalkArrow(ctx, bx, by, bx, by + 25, opacity, 1.5, PURPLE);
      drawChalkText(ctx, 'mg', bx + 4, by + 22, opacity, 11, PURPLE);
    }
  },
  optics: (ctx, x, y, graphWidth, graphHeight, formulaLabel, prog, opacity, globalTime, helpers) => {
    const { drawChalkLine, drawChalkText, drawChalkArrow, WHITE, CYAN, PURPLE } = helpers;
    const iy = y + 10;
    const cx = x + graphWidth / 2;

    if (prog > 0.1) {
      drawChalkLine(ctx, [{ x: x, y: iy }, { x: x + graphWidth, y: iy }], opacity * 0.5, 1.5);
      for (let ny = iy - graphHeight / 2; ny < iy + graphHeight / 2; ny += 10) {
        drawChalkLine(ctx, [{ x: cx, y: ny }, { x: cx, y: ny + 5 }], opacity * 0.35, 1);
      }
      drawChalkText(ctx, 'n₁', x + 8, iy - 14, opacity * 0.5, 12);
      drawChalkText(ctx, 'n₂', x + 8, iy + 14, opacity * 0.5, 12);
    }

    const rx1 = cx - graphWidth * 0.42;
    const ry1 = iy - graphHeight * 0.38;
    const rx2 = cx + graphWidth * 0.28;
    const ry2 = iy + graphHeight * 0.42;

    if (prog > 0.4) {
      drawChalkArrow(ctx, rx1, ry1, cx, iy, opacity, 1.5, CYAN);
      drawChalkText(ctx, 'θ₁', cx - 18, iy - 16, opacity * 0.8, 11, CYAN);
    }
    if (prog > 0.7) {
      drawChalkArrow(ctx, cx, iy, rx2, ry2, opacity, 1.5, PURPLE);
      drawChalkText(ctx, 'θ₂', cx + 10, iy + 16, opacity * 0.8, 11, PURPLE);
    }

    if (prog > 0.7) {
      const t = (globalTime * 0.015) % 1.0;
      if (t < 0.5) {
        const u = t * 2;
        const px = rx1 + (cx - rx1) * u;
        const py = ry1 + (iy - ry1) * u;
        drawChalkLine(ctx, [{ x: px - 2, y: py - 2 }, { x: px + 2, y: py + 2 }], opacity * 0.9, 3, CYAN);
      } else {
        const u = (t - 0.5) * 2;
        const px = cx + (rx2 - cx) * u;
        const py = iy + (ry2 - iy) * u;
        drawChalkLine(ctx, [{ x: px - 2, y: py - 2 }, { x: px + 2, y: py + 2 }], opacity * 0.9, 3, PURPLE);
      }
    }
  },
  prism: (ctx, x, y, graphWidth, graphHeight, formulaLabel, prog, opacity, globalTime, helpers) => {
    const { drawChalkLine, drawChalkText, drawChalkArrow, WHITE, CYAN, PURPLE } = helpers;
    const x1 = x + 15, y1 = y + graphHeight * 0.35;
    const x2 = x + graphWidth / 2, y2 = y - graphHeight * 0.4;
    const x3 = x + graphWidth - 15, y3 = y + graphHeight * 0.35;

    if (prog > 0.1) {
      drawChalkLine(ctx, [{ x: x1, y: y1 }, { x: x2, y: y2 }, { x: x3, y: y3 }, { x: x1, y: y1 }], opacity * 0.5, 1.5);
    }

    const hit1X = x + graphWidth * 0.32;
    const hit1Y = y - 2;
    const hit2X = x + graphWidth * 0.68;
    const hit2Y = y + 6;
    const outX_cyan = x + graphWidth - 5;
    const outY_cyan = y + graphHeight * 0.35;
    const outX_purple = x + graphWidth - 5;
    const outY_purple = y + graphHeight * 0.41;

    if (prog > 0.4) {
      drawChalkArrow(ctx, x, y + 12, hit1X, hit1Y, opacity, 1.5, WHITE);
      drawChalkLine(ctx, [{ x: hit1X, y: hit1Y }, { x: hit2X, y: hit2Y }], opacity, 1.5, CYAN);
    }
    if (prog > 0.7) {
      drawChalkArrow(ctx, hit2X, hit2Y, outX_cyan, outY_cyan, opacity, 1.5, CYAN);
      drawChalkArrow(ctx, hit2X, hit2Y, outX_purple, outY_purple, opacity, 1.5, PURPLE);
      drawChalkText(ctx, 'δ', hit2X + 12, hit1Y - 8, opacity * 0.75, 11, PURPLE);
    }

    if (prog > 0.7) {
      const t = (globalTime * 0.012) % 1.0;
      if (t < 0.33) {
        const u = t * 3;
        const px = x + (hit1X - x) * u;
        const py = (y + 12) + (hit1Y - (y + 12)) * u;
        drawChalkLine(ctx, [{ x: px, y: py }, { x: px + 1, y: py }], opacity, 3.5, WHITE);
      } else if (t < 0.66) {
        const u = (t - 0.33) * 3;
        const px = hit1X + (hit2X - hit1X) * u;
        const py = hit1Y + (hit2Y - hit1Y) * u;
        drawChalkLine(ctx, [{ x: px, y: py }, { x: px + 1, y: py }], opacity, 3, CYAN);
      } else {
        const u = (t - 0.66) * 3;
        const px1 = hit2X + (outX_cyan - hit2X) * u;
        const py1 = hit2Y + (outY_cyan - hit2Y) * u;
        const px2 = hit2X + (outX_purple - hit2X) * u;
        const py2 = hit2Y + (outY_purple - hit2Y) * u;
        drawChalkLine(ctx, [{ x: px1, y: py1 }, { x: px1 + 1, y: py1 }], opacity, 2.5, CYAN);
        drawChalkLine(ctx, [{ x: px2, y: py2 }, { x: px2 + 1, y: py2 }], opacity, 2.5, PURPLE);
      }
    }
  },
  cell: (ctx, x, y, graphWidth, graphHeight, formulaLabel, prog, opacity, globalTime, helpers) => {
    const { drawChalkLine, drawChalkText, drawChalkArrow, CYAN, PURPLE } = helpers;
    const bx = x + 25;
    const by = y - graphHeight * 0.35;
    const bw = graphWidth - 50;
    const bh = graphHeight * 0.75;
    const ex1 = bx + bw * 0.28;
    const ex2 = bx + bw * 0.72;
    const midX = bx + bw / 2;
    const batY = by - 16;

    if (prog > 0.1) {
      drawChalkLine(ctx, [
        { x: bx, y: by },
        { x: bx, y: by + bh },
        { x: bx + bw, y: by + bh },
        { x: bx + bw, y: by }
      ], opacity * 0.5, 1.5);
      drawChalkLine(ctx, [{ x: bx + 4, y: by + bh * 0.35 }, { x: bx + bw - 4, y: by + bh * 0.35 }], opacity * 0.3, 1);
    }
    if (prog > 0.4) {
      drawChalkLine(ctx, [
        { x: ex1 - 6, y: by + 8 },
        { x: ex1 + 6, y: by + 8 },
        { x: ex1 + 6, y: by + bh * 0.85 },
        { x: ex1 - 6, y: by + bh * 0.85 },
        { x: ex1 - 6, y: by + 8 }
      ], opacity * 0.65, 1.2, PURPLE);
      drawChalkText(ctx, '+', ex1 - 3, by - 4, opacity * 0.8, 10, PURPLE);

      drawChalkLine(ctx, [
        { x: ex2 - 6, y: by + 8 },
        { x: ex2 + 6, y: by + 8 },
        { x: ex2 + 6, y: by + bh * 0.85 },
        { x: ex2 - 6, y: by + bh * 0.85 },
        { x: ex2 - 6, y: by + 8 }
      ], opacity * 0.65, 1.2, CYAN);
      drawChalkText(ctx, '-', ex2 - 3, by - 4, opacity * 0.8, 10, CYAN);
    }
    if (prog > 0.7) {
      drawChalkLine(ctx, [{ x: ex1, y: by + 8 }, { x: ex1, y: batY }, { x: midX - 6, y: batY }], opacity * 0.45, 1);
      drawChalkLine(ctx, [{ x: ex2, y: by + 8 }, { x: ex2, y: batY }, { x: midX + 6, y: batY }], opacity * 0.45, 1);

      drawChalkLine(ctx, [{ x: midX - 6, y: batY - 6 }, { x: midX - 6, y: batY + 6 }], opacity * 0.8, 1.5, PURPLE);
      drawChalkLine(ctx, [{ x: midX - 2, y: batY - 3 }, { x: midX - 2, y: batY + 3 }], opacity * 0.8, 1);
      drawChalkLine(ctx, [{ x: midX + 2, y: batY - 6 }, { x: midX + 2, y: batY + 6 }], opacity * 0.8, 1.5, CYAN);
      drawChalkLine(ctx, [{ x: midX + 6, y: batY - 3 }, { x: midX + 6, y: batY + 3 }], opacity * 0.8, 1);

      drawChalkText(ctx, 'M⁺', midX - 18, by + bh * 0.55, opacity, 11, PURPLE);
      drawChalkArrow(ctx, midX - 6, by + bh * 0.55 + 4, ex2 - 8, by + bh * 0.55 + 4, opacity * 0.7, 1, CYAN);
    }

    if (prog > 0.7) {
      const ionT = (globalTime * 0.008) % 1.0;
      const ionX = ex1 + 8 + ionT * (ex2 - ex1 - 16);
      const ionY = by + bh * 0.65;
      drawChalkText(ctx, '•', ionX - 2, ionY, opacity * 0.8, 12, PURPLE);

      const bubbleY = by + bh * 0.8 - ((globalTime * 0.5) % 30);
      drawChalkText(ctx, 'o', ex1 + 2, bubbleY, opacity * 0.5, 7, PURPLE);
      drawChalkText(ctx, 'o', ex2 - 6, bubbleY - 8, opacity * 0.5, 7, CYAN);
    }
  },
  thermo: (ctx, x, y, graphWidth, graphHeight, formulaLabel, prog, opacity, globalTime, helpers) => {
    const { drawChalkLine, drawChalkText, drawChalkArrow, WHITE, CYAN, PURPLE } = helpers;
    const cx = x + 25;
    const cy = y - graphHeight * 0.3;
    const cw = graphWidth - 50;
    const ch = graphHeight * 0.65;

    const pistonOffset = Math.sin(globalTime * 0.03) * 8;
    const pistY = cy + ch * 0.4 + pistonOffset;

    if (prog > 0.1) {
      drawChalkLine(ctx, [
        { x: cx, y: cy },
        { x: cx, y: cy + ch },
        { x: cx + cw, y: cy + ch },
        { x: cx + cw, y: cy }
      ], opacity * 0.5, 1.5);
    }
    if (prog > 0.4) {
      drawChalkLine(ctx, [{ x: cx + 2, y: pistY }, { x: cx + cw - 2, y: pistY }], opacity * 0.8, 3.5, WHITE);
      drawChalkLine(ctx, [{ x: cx + cw / 2, y: pistY }, { x: cx + cw / 2, y: cy - 20 }], opacity * 0.7, 2, WHITE);

      if (pistonOffset < 0) {
        drawChalkArrow(ctx, cx + cw / 2, pistY - 10, cx + cw / 2, cy - 18, opacity * 0.8, 1.2, CYAN);
        drawChalkText(ctx, 'dW', cx + cw / 2 + 6, cy - 10, opacity * 0.8, 11, CYAN);
      } else {
        drawChalkArrow(ctx, cx + cw / 2, cy - 18, cx + cw / 2, pistY - 10, opacity * 0.8, 1.2, PURPLE);
        drawChalkText(ctx, 'dW', cx + cw / 2 + 6, cy - 10, opacity * 0.8, 11, PURPLE);
      }
    }
    if (prog > 0.7) {
      const gas = [
        { x: cx + cw * 0.25, y: cy + ch * 0.65, dx: 0.3, dy: -0.2 },
        { x: cx + cw * 0.45, y: cy + ch * 0.8, dx: -0.4, dy: -0.3 },
        { x: cx + cw * 0.72, y: cy + ch * 0.6, dx: 0.5, dy: 0.1 },
        { x: cx + cw * 0.5, y: cy + ch * 0.58, dx: -0.2, dy: 0.4 }
      ];
      gas.forEach((g, idx) => {
        const jx = g.x + Math.sin(globalTime * 0.1 + idx) * 4;
        const jy = g.y + Math.cos(globalTime * 0.08 + idx) * 4;
        const finalY = Math.max(pistY + 6, Math.min(cy + ch - 4, jy));
        drawChalkLine(ctx, [{ x: jx, y: finalY }, { x: jx + 0.5, y: finalY }], opacity, 2.5, PURPLE);
      });

      const qY = cy + ch + 12;
      drawChalkArrow(ctx, cx + cw * 0.35, qY, cx + cw * 0.35, cy + ch - 2, opacity * 0.7, 1, CYAN);
      drawChalkText(ctx, 'dQ', cx + cw / 2 - 10, qY + 11, opacity, 11, CYAN);
    }
  },
  fbd: (ctx, x, y, graphWidth, graphHeight, formulaLabel, prog, opacity, globalTime, helpers) => {
    const { drawChalkLine, drawChalkText, drawChalkArrow, WHITE, CYAN, PURPLE } = helpers;
    const bx = x + 20;
    const by = y + graphHeight * 0.35;
    const slopeW = graphWidth - 40;
    const slopeH = graphHeight * 0.55;

    if (prog > 0.1) {
      drawChalkLine(ctx, [
        { x: bx, y: by + slopeH },
        { x: bx + slopeW, y: by + slopeH },
        { x: bx, y: by },
        { x: bx, y: by + slopeH }
      ], opacity * 0.5, 1.2);
    }

    const angle = Math.atan2(-slopeH, slopeW);
    const tVal = (globalTime * 0.005) % 1.0;
    const slideDistance = tVal * (slopeW * 0.4);
    const midX = bx + slopeW * 0.25 + Math.cos(angle) * slideDistance;
    const midY = by + slopeH * 0.25 + Math.sin(angle) * slideDistance;

    if (prog > 0.3) {
      ctx.save();
      ctx.translate(midX, midY);
      ctx.rotate(angle);
      const bw = 24, bh = 14;
      drawChalkLine(ctx, [
        { x: -bw / 2, y: -bh },
        { x: bw / 2, y: -bh },
        { x: bw / 2, y: 0 },
        { x: -bw / 2, y: 0 },
        { x: -bw / 2, y: -bh }
      ], opacity * 0.8, 1.5, WHITE);
      ctx.restore();
    }

    if (prog > 0.5) {
      drawChalkArrow(ctx, midX, midY - 6, midX, midY + 28, opacity, 1.5, PURPLE);
      drawChalkText(ctx, 'W', midX + 4, midY + 22, opacity, 10, PURPLE);

      const perpAngle = angle - Math.PI / 2;
      const nx = midX + Math.cos(perpAngle) * 26;
      const ny = midY + Math.sin(perpAngle) * 26;
      drawChalkArrow(ctx, midX, midY - 6, nx, ny, opacity, 1.5, CYAN);
      drawChalkText(ctx, 'N', nx + 4, ny - 4, opacity, 10, CYAN);
    }

    if (prog > 0.7) {
      const fricAngle = angle + Math.PI;
      const fx = midX + Math.cos(fricAngle) * 24;
      const fy = midY + Math.sin(fricAngle) * 24;
      drawChalkArrow(ctx, midX, midY - 6, fx, fy, opacity * 0.8, 1.2, PURPLE);
      drawChalkText(ctx, 'f', fx - 8, fy - 6, opacity * 0.8, 10, PURPLE);

      const ax = midX + Math.cos(angle) * 24;
      const ay = midY + Math.sin(angle) * 24;
      drawChalkArrow(ctx, midX, midY - 6, ax, ay, opacity * 0.8, 1.2, WHITE);
      drawChalkText(ctx, 'a', ax + 4, ay + 4, opacity * 0.8, 10, WHITE);
    }
  },
  waves: (ctx, x, y, graphWidth, graphHeight, formulaLabel, prog, opacity, globalTime, helpers) => {
    const { drawChalkLine, drawChalkText, CYAN, PURPLE } = helpers;
    const lx = x + 15;
    const ly = y + 10;
    const lw = graphWidth - 30;

    if (prog > 0.1) {
      drawChalkLine(ctx, [{ x: lx, y: ly }, { x: lx + lw, y: ly }], opacity * 0.35, 1);
      drawChalkLine(ctx, [{ x: lx, y: ly - 15 }, { x: lx, y: ly + 15 }], opacity * 0.6, 1.5);
      drawChalkLine(ctx, [{ x: lx + lw, y: ly - 15 }, { x: lx + lw, y: ly + 15 }], opacity * 0.6, 1.5);
    }

    if (prog > 0.3) {
      const oscAmp = Math.sin(globalTime * 0.05);
      const amp = graphHeight * 0.32 * oscAmp * Math.min(1, (prog - 0.3) / 0.7);

      const wavePts = [];
      const envelopePts = [];
      const steps = 40;

      for (let i = 0; i <= steps; i++) {
        const u = i / steps;
        const px = lx + u * lw;
        const py = ly - Math.sin(u * Math.PI * 2) * amp;
        wavePts.push({ x: px, y: py });
        envelopePts.push({ x: px, y: ly + Math.sin(u * Math.PI * 2) * (graphHeight * 0.32) });
      }

      drawChalkLine(ctx, wavePts, opacity, 1.6, CYAN);

      if (prog > 0.6) {
        for (let k = 0; k < envelopePts.length - 1; k += 2) {
          drawChalkLine(ctx, [envelopePts[k], envelopePts[k + 1]], opacity * 0.4, 1.0, PURPLE);
          const oppPt1 = { x: envelopePts[k].x, y: ly - (envelopePts[k].y - ly) };
          const oppPt2 = { x: envelopePts[k + 1].x, y: ly - (envelopePts[k + 1].y - ly) };
          drawChalkLine(ctx, [oppPt1, oppPt2], opacity * 0.4, 1.0, PURPLE);
        }

        drawChalkText(ctx, 'N', lx + 2, ly - 20, opacity * 0.5, 10);
        drawChalkText(ctx, 'A', lx + lw * 0.25 - 4, ly + (graphHeight * 0.32) + 6, opacity * 0.8, 10, CYAN);
        drawChalkText(ctx, 'N', lx + lw * 0.5 - 4, ly - 20, opacity * 0.5, 10);
        drawChalkText(ctx, 'A', lx + lw * 0.75 - 4, ly - (graphHeight * 0.32) - 16, opacity * 0.8, 10, CYAN);
        drawChalkText(ctx, 'N', lx + lw - 8, ly - 20, opacity * 0.5, 10);
      }
    }
  },
  doubleSlit: (ctx, x, y, graphWidth, graphHeight, formulaLabel, prog, opacity, globalTime, helpers) => {
    const { drawChalkLine, drawChalkText, WHITE, CYAN, PURPLE } = helpers;
    const sx = x + 15;
    const sy = y + 10;
    const sw = graphWidth - 30;

    const slitBarrierX = sx + sw * 0.25;
    const screenX = sx + sw * 0.85;
    const slitGap = 16;
    const s1y = sy - slitGap / 2;
    const s2y = sy + slitGap / 2;

    if (prog > 0.1) {
      drawChalkLine(ctx, [{ x: slitBarrierX, y: sy - graphHeight / 2 }, { x: slitBarrierX, y: s1y - 3 }], opacity * 0.6, 1.5);
      drawChalkLine(ctx, [{ x: slitBarrierX, y: s1y + 3 }, { x: slitBarrierX, y: s2y - 3 }], opacity * 0.6, 1.5);
      drawChalkLine(ctx, [{ x: slitBarrierX, y: s2y + 3 }, { x: slitBarrierX, y: sy + graphHeight / 2 }], opacity * 0.6, 1.5);

      const wavePhase = (globalTime * 0.25) % 8;
      for (let wx = slitBarrierX - 25 + wavePhase; wx >= sx; wx -= 8) {
        if (wx < slitBarrierX) {
          drawChalkLine(ctx, [{ x: wx, y: sy - 20 }, { x: wx, y: sy + 20 }], opacity * 0.35, 1, WHITE);
        }
      }
    }

    if (prog > 0.3) {
      const maxRadius = sw * 0.6;
      const ripplePhase = (globalTime * 0.15) % 10;

      for (let r = ripplePhase; r <= maxRadius; r += 10) {
        if (r <= 0) continue;
        ctx.save();
        ctx.beginPath();
        ctx.arc(slitBarrierX, s1y, r, -Math.PI / 3, Math.PI / 3);
        ctx.strokeStyle = `${PURPLE}${opacity * 0.45 * (1 - r / maxRadius)})`;
        ctx.lineWidth = 1.0;
        ctx.stroke();
        ctx.restore();

        ctx.save();
        ctx.beginPath();
        ctx.arc(slitBarrierX, s2y, r, -Math.PI / 3, Math.PI / 3);
        ctx.strokeStyle = `${CYAN}${opacity * 0.45 * (1 - r / maxRadius)})`;
        ctx.lineWidth = 1.0;
        ctx.stroke();
        ctx.restore();
      }
    }

    if (prog > 0.7) {
      drawChalkLine(ctx, [{ x: screenX, y: sy - graphHeight / 2 + 5 }, { x: screenX, y: sy + graphHeight / 2 - 5 }], opacity * 0.5, 1);

      const fringePts = [];
      for (let fy = sy - graphHeight / 2 + 10; fy <= sy + graphHeight / 2 - 10; fy += 2) {
        const dy = fy - sy;
        const val = Math.pow(Math.cos(dy * 0.16), 2) * 16;
        fringePts.push({ x: screenX + val, y: fy });
      }
      drawChalkLine(ctx, fringePts, opacity * 0.7, 1.2, CYAN);
    }
  },
  capacitor: (ctx, x, y, graphWidth, graphHeight, formulaLabel, prog, opacity, globalTime, helpers) => {
    const { drawChalkLine, drawChalkText, drawChalkArrow, CYAN, PURPLE } = helpers;
    const cx = x + graphWidth / 2;
    const cy = y + 10;
    const pw = graphWidth * 0.65;
    const p1y = cy - 18;
    const p2y = cy + 18;

    if (prog > 0.1) {
      drawChalkLine(ctx, [{ x: cx - pw / 2, y: p1y }, { x: cx + pw / 2, y: p1y }], opacity, 2.2, PURPLE);
      drawChalkLine(ctx, [{ x: cx - pw / 2, y: p2y }, { x: cx + pw / 2, y: p2y }], opacity, 2.2, CYAN);

      const signCount = 6;
      for (let i = 0; i < signCount; i++) {
        const sx = cx - pw / 2 + (i + 0.5) * (pw / signCount);
        drawChalkText(ctx, '+', sx - 3, p1y - 12, opacity * 0.8, 9, PURPLE);
        drawChalkText(ctx, '-', sx - 3, p2y + 8, opacity * 0.8, 9, CYAN);
      }
    }

    if (prog > 0.4) {
      const arrowCount = 5;
      for (let i = 0; i < arrowCount; i++) {
        const ax = cx - pw / 2 + (i + 0.5) * (pw / arrowCount);
        drawChalkArrow(ctx, ax, p1y + 2, ax, p2y - 2, opacity * 0.6, 1.0, CYAN);

        const dotY = p1y + 4 + ((globalTime * 0.4 + i * 6) % (p2y - p1y - 8));
        drawChalkLine(ctx, [{ x: ax, y: dotY }, { x: ax, y: dotY + 1 }], opacity, 3, PURPLE);
      }
    }

    if (prog > 0.7) {
      drawChalkLine(ctx, [{ x: cx - pw / 2, y: p1y }, { x: cx - pw / 2 - 12, y: p1y }, { x: cx - pw / 2 - 12, y: cy }, { x: cx - 20, y: cy }], opacity * 0.45, 1);
      drawChalkLine(ctx, [{ x: cx + pw / 2, y: p2y }, { x: cx + pw / 2 + 12, y: p2y }, { x: cx + pw / 2 + 12, y: cy }, { x: cx + 20, y: cy }], opacity * 0.45, 1);

      drawChalkLine(ctx, [{ x: cx - 4, y: cy - 6 }, { x: cx - 4, y: cy + 6 }], opacity * 0.8, 1.5, PURPLE);
      drawChalkLine(ctx, [{ x: cx + 4, y: cy - 3 }, { x: cx + 4, y: cy + 3 }], opacity * 0.8, 1.0, CYAN);

      drawChalkText(ctx, 'E', cx + 12, cy - 14, opacity * 0.75, 10);
    }
  },
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

      drawChalkText(ctx, 'n=1', cx + r1 + 3, cy - 8, opacity * 0.4, 9);
      drawChalkText(ctx, 'n=2', cx + r2 + 3, cy - 8, opacity * 0.4, 9);
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
  },
  circuit: (ctx, x, y, graphWidth, graphHeight, formulaLabel, prog, opacity, globalTime, helpers) => {
    const { drawChalkLine, drawChalkText, drawChalkArrow, WHITE, CYAN, PURPLE } = helpers;
    const cx = x + graphWidth / 2;
    const cy = y + 10;
    const cw = graphWidth * 0.7;
    const ch = graphHeight * 0.55;

    const leftX = cx - cw / 2;
    const rightX = cx + cw / 2;
    const topY = cy - ch / 2;
    const botY = cy + ch / 2;

    if (prog > 0.1) {
      drawChalkLine(ctx, [{ x: leftX, y: topY }, { x: leftX, y: cy - 5 }], opacity * 0.5, 1.2);
      drawChalkLine(ctx, [{ x: leftX, y: cy + 5 }, { x: leftX, y: botY }], opacity * 0.5, 1.2);

      drawChalkLine(ctx, [{ x: leftX - 8, y: cy - 4 }, { x: leftX + 8, y: cy - 4 }], opacity, 2.0, PURPLE);
      drawChalkLine(ctx, [{ x: leftX - 4, y: cy + 3 }, { x: leftX + 4, y: cy + 3 }], opacity, 1.2, CYAN);
      drawChalkText(ctx, '+', leftX + 10, cy - 14, opacity * 0.8, 9, PURPLE);
      drawChalkText(ctx, '-', leftX + 8, cy + 6, opacity * 0.8, 9, CYAN);
      drawChalkText(ctx, 'V', leftX - 18, cy - 6, opacity, 10);
    }

    if (prog > 0.3) {
      const resY1 = cy - 20;
      const resY2 = cy + 20;
      drawChalkLine(ctx, [{ x: rightX, y: topY }, { x: rightX, y: resY1 }], opacity * 0.5, 1.2);
      drawChalkLine(ctx, [{ x: rightX, y: resY2 }, { x: rightX, y: botY }], opacity * 0.5, 1.2);

      const resPts = [{ x: rightX, y: resY1 }];
      const count = 5;
      const step = (resY2 - resY1) / count;
      for (let i = 0; i < count; i++) {
        const ry = resY1 + (i + 0.5) * step;
        const rx = rightX + (i % 2 === 0 ? 6 : -6);
        resPts.push({ x: rx, y: ry });
      }
      resPts.push({ x: rightX, y: resY2 });
      drawChalkLine(ctx, resPts, opacity, 1.5, WHITE);
      drawChalkText(ctx, 'R', rightX + 10, cy - 6, opacity, 11);

      drawChalkLine(ctx, [{ x: leftX, y: topY }, { x: rightX, y: topY }], opacity * 0.5, 1.2);
      drawChalkLine(ctx, [{ x: leftX, y: botY }, { x: rightX, y: botY }], opacity * 0.5, 1.2);
    }

    if (prog > 0.7) {
      const flowLength = 2 * (cw + ch);
      const flowSpeed = globalTime * 1.5;
      const chargeCount = 4;

      for (let i = 0; i < chargeCount; i++) {
        const dist = (flowSpeed + i * (flowLength / chargeCount)) % flowLength;
        let px = leftX, py = topY;

        if (dist < cw) {
          px = leftX + dist;
          py = topY;
        } else if (dist < cw + ch) {
          px = rightX;
          py = topY + (dist - cw);
        } else if (dist < cw * 2 + ch) {
          px = rightX - (dist - cw - ch);
          py = botY;
        } else {
          px = leftX;
          py = botY - (dist - cw * 2 - ch);
        }
        drawChalkText(ctx, '•', px - 2, py, opacity * 0.9, 12, CYAN);
      }

      drawChalkArrow(ctx, cx - 10, topY, cx + 15, topY, opacity, 1.2, CYAN);
      drawChalkText(ctx, 'I', cx + 2, topY - 14, opacity, 11, CYAN);
    }
  },
  logic: (ctx, x, y, graphWidth, graphHeight, formulaLabel, prog, opacity, globalTime, helpers) => {
    const { drawChalkLine, drawChalkText, CYAN, PURPLE } = helpers;
    const cx = x + graphWidth / 2;
    const cy = y + 10;
    const gw = 45;
    const gh = 32;

    if (prog > 0.1) {
      drawChalkLine(ctx, [{ x: cx - gw, y: cy - 10 }, { x: cx - gw * 0.4, y: cy - 10 }], opacity * 0.8, 1.2, PURPLE);
      drawChalkLine(ctx, [{ x: cx - gw, y: cy + 10 }, { x: cx - gw * 0.4, y: cy + 10 }], opacity * 0.8, 1.2, PURPLE);
      drawChalkText(ctx, 'A', cx - gw - 12, cy - 14, opacity, 11, PURPLE);
      drawChalkText(ctx, 'B', cx - gw - 12, cy + 4, opacity, 11, PURPLE);
    }

    const backX = cx - gw * 0.4;
    const frontStartVal = gw * 0.15;
    const outStartX = cx + gw * 0.55;

    if (prog > 0.3) {
      drawChalkLine(ctx, [{ x: backX, y: cy - gh / 2 }, { x: backX, y: cy + gh / 2 }], opacity, 1.6);
      drawChalkLine(ctx, [{ x: backX, y: cy - gh / 2 }, { x: cx + frontStartVal, y: cy - gh / 2 }], opacity, 1.6);
      drawChalkLine(ctx, [{ x: backX, y: cy + gh / 2 }, { x: cx + frontStartVal, y: cy + gh / 2 }], opacity, 1.6);

      const domePts = [];
      for (let a = -Math.PI / 2; a <= Math.PI / 2; a += 0.15) {
        domePts.push({
          x: cx + frontStartVal + Math.cos(a) * (gw * 0.4),
          y: cy + Math.sin(a) * (gh / 2)
        });
      }
      drawChalkLine(ctx, domePts, opacity, 1.6);
    }

    if (prog > 0.7) {
      drawChalkLine(ctx, [{ x: outStartX, y: cy }, { x: cx + gw, y: cy }], opacity, 1.2, CYAN);
      drawChalkText(ctx, 'Y', cx + gw + 4, cy - 6, opacity, 11, CYAN);
    }

    if (prog > 0.7) {
      const t = (globalTime * 0.015) % 1.0;
      if (t < 0.4) {
        const u = t / 0.4;
        const px1 = (cx - gw) + (backX - (cx - gw)) * u;
        const px2 = (cx - gw) + (backX - (cx - gw)) * u;
        drawChalkLine(ctx, [{ x: px1 - 2, y: cy - 10 }, { x: px1 + 2, y: cy - 10 }], opacity, 3, PURPLE);
        drawChalkLine(ctx, [{ x: px2 - 2, y: cy + 10 }, { x: px2 + 2, y: cy + 10 }], opacity, 3, PURPLE);
      } else if (t < 0.6) {
        const glowVal = Math.sin((t - 0.4) * Math.PI) * 0.4;
        drawChalkText(ctx, '&', cx - 4, cy - 6, opacity * (0.5 + glowVal), 14, CYAN);
      } else {
        const u = (t - 0.6) / 0.4;
        const px = outStartX + ((cx + gw) - outStartX) * u;
        drawChalkLine(ctx, [{ x: px - 2, y: cy }, { x: px + 2, y: cy }], opacity, 3, CYAN);
      }
    }
  },
  lens: (ctx, x, y, graphWidth, graphHeight, formulaLabel, prog, opacity, globalTime, helpers) => {
    const { drawChalkLine, drawChalkText, drawChalkArrow, WHITE, CYAN, PURPLE } = helpers;
    const cx = x + graphWidth / 2;
    const cy = y + 10;

    if (prog > 0.1) {
      ctx.save();
      ctx.setLineDash([4, 4]);
      drawChalkLine(ctx, [{ x: x + 5, y: cy }, { x: x + graphWidth - 5, y: cy }], opacity * 0.35, 1);
      ctx.restore();

      const lensPts1 = [];
      const lensPts2 = [];
      const lh = graphHeight * 0.42;
      for (let a = -Math.PI / 4; a <= Math.PI / 4; a += 0.1) {
        lensPts1.push({ x: cx - 6 + Math.cos(a) * 15, y: cy + Math.sin(a) * lh * 1.5 });
        lensPts2.push({ x: cx + 6 - Math.cos(a) * 15, y: cy + Math.sin(a) * lh * 1.5 });
      }
      drawChalkLine(ctx, lensPts1, opacity * 0.7, 1.5, PURPLE);
      drawChalkLine(ctx, lensPts2, opacity * 0.7, 1.5, PURPLE);

      const fDist = graphWidth * 0.28;
      drawChalkLine(ctx, [{ x: cx + fDist, y: cy - 3 }, { x: cx + fDist, y: cy + 3 }], opacity * 0.5, 1);
      drawChalkText(ctx, 'F', cx + fDist - 4, cy + 6, opacity * 0.6, 10);
    }

    const fDist = graphWidth * 0.28;
    const ry1 = cy - 14;
    const ry3 = cy + 14;

    if (prog > 0.3) {
      drawChalkArrow(ctx, x + 8, ry1, cx, ry1, opacity, 1.2, CYAN);
      drawChalkArrow(ctx, x + 8, cy, cx, cy, opacity * 0.7, 1.2, WHITE);
      drawChalkArrow(ctx, x + 8, ry3, cx, ry3, opacity, 1.2, CYAN);
    }
    if (prog > 0.6) {
      drawChalkArrow(ctx, cx, ry1, cx + fDist * 1.4, cy + 5, opacity, 1.2, CYAN);
      drawChalkArrow(ctx, cx, cy, cx + fDist * 1.4, cy, opacity * 0.7, 1.2, WHITE);
      drawChalkArrow(ctx, cx, ry3, cx + fDist * 1.4, cy - 5, opacity, 1.2, CYAN);
    }

    if (prog > 0.6) {
      const t = (globalTime * 0.012) % 1.0;
      if (t < 0.5) {
        const u = t * 2;
        const px1 = (x + 8) + (cx - (x + 8)) * u;
        drawChalkLine(ctx, [{ x: px1, y: ry1 }, { x: px1 + 1, y: ry1 }], opacity * 0.9, 3, CYAN);
        drawChalkLine(ctx, [{ x: px1, y: ry3 }, { x: px1 + 1, y: ry3 }], opacity * 0.9, 3, CYAN);
        drawChalkLine(ctx, [{ x: px1, y: cy }, { x: px1 + 1, y: cy }], opacity * 0.8, 3, WHITE);
      } else {
        const u = (t - 0.5) * 2;
        const px1 = cx + (fDist * 1.4) * u;
        const py1 = ry1 + ((cy + 5) - ry1) * u;
        const py3 = ry3 + ((cy - 5) - ry3) * u;
        drawChalkLine(ctx, [{ x: px1, y: py1 }, { x: px1 + 1, y: py1 }], opacity * 0.9, 2.5, CYAN);
        drawChalkLine(ctx, [{ x: px1, y: py3 }, { x: px1 + 1, y: py3 }], opacity * 0.9, 2.5, CYAN);
        drawChalkLine(ctx, [{ x: px1, y: cy }, { x: px1 + 1, y: cy }], opacity * 0.8, 2.5, WHITE);
      }
    }
  },
  newton2: (ctx, x, y, graphWidth, graphHeight, formulaLabel, prog, opacity, globalTime, helpers) => {
    const { drawChalkLine, drawChalkText, drawChalkArrow, WHITE, CYAN, PURPLE } = helpers;
    const cx = x + graphWidth / 2;
    const cy = y + 10;
    const boxX = cx - 25 + Math.sin(globalTime * 0.03) * (graphWidth * 0.22);
    const boxY = cy + 12;

    if (prog > 0.1) {
      drawChalkLine(ctx, [{ x: x + 10, y: cy + 22 }, { x: x + graphWidth - 10, y: cy + 22 }], opacity * 0.5, 1);
      const bw = 24, bh = 18;
      drawChalkLine(ctx, [
        { x: boxX - bw / 2, y: boxY - bh / 2 },
        { x: boxX + bw / 2, y: boxY - bh / 2 },
        { x: boxX + bw / 2, y: boxY + bh / 2 },
        { x: boxX - bw / 2, y: boxY + bh / 2 },
        { x: boxX - bw / 2, y: boxY - bh / 2 }
      ], opacity, 1.5, WHITE);
      drawChalkText(ctx, 'm', boxX - 4, boxY - 4, opacity * 0.8, 10, WHITE);
    }
    if (prog > 0.4) {
      drawChalkArrow(ctx, boxX + 12, boxY, boxX + 38, boxY, opacity, 1.6, CYAN);
      drawChalkText(ctx, 'F', boxX + 42, boxY - 5, opacity, 11, CYAN);
    }
    if (prog > 0.7) {
      drawChalkArrow(ctx, boxX - 10, boxY - 16, boxX + 15, boxY - 16, opacity * 0.8, 1.2, PURPLE);
      drawChalkText(ctx, 'a', boxX + 19, boxY - 21, opacity * 0.8, 10, PURPLE);
    }
  },
  projectile: (ctx, x, y, graphWidth, graphHeight, formulaLabel, prog, opacity, globalTime, helpers) => {
    const { drawChalkLine, drawChalkText, drawChalkArrow, WHITE, CYAN, PURPLE } = helpers;
    const lx = x + 15;
    const ly = y + graphHeight * 0.35;
    const lw = graphWidth - 30;

    if (prog > 0.1) {
      drawChalkLine(ctx, [{ x: lx, y: ly }, { x: lx + lw, y: ly }], opacity * 0.35, 1);
      drawChalkLine(ctx, [{ x: lx, y: ly }, { x: lx, y: ly - graphHeight * 0.65 }], opacity * 0.35, 1);
    }

    const trajPts = [];
    const steps = 30;
    for (let i = 0; i <= steps; i++) {
      const u = i / steps;
      const px = lx + u * lw;
      const py = ly - (graphHeight * 0.6) * 4 * u * (1 - u);
      trajPts.push({ x: px, y: py });
    }

    if (prog > 0.3) {
      for (let i = 0; i < trajPts.length - 1; i += 2) {
        drawChalkLine(ctx, [trajPts[i], trajPts[i + 1]], opacity * 0.45, 1, WHITE);
      }
    }

    if (prog > 0.5) {
      const tVal = (globalTime * 0.005) % 1.0;
      const px = lx + tVal * lw;
      const py = ly - (graphHeight * 0.6) * 4 * tVal * (1 - tVal);

      ctx.beginPath();
      ctx.arc(px, py, 3, 0, Math.PI * 2);
      ctx.fillStyle = `${CYAN}${opacity})`;
      ctx.fill();

      const vSlopeX = lw;
      const vSlopeY = -(graphHeight * 0.6) * 4 * (1 - 2 * tVal);
      const angle = Math.atan2(vSlopeY, vSlopeX);
      drawChalkArrow(ctx, px, py, px + Math.cos(angle) * 22, py + Math.sin(angle) * 22, opacity, 1.2, CYAN);

      drawChalkArrow(ctx, px, py, px, py + 14, opacity * 0.7, 1.0, PURPLE);
      drawChalkText(ctx, 'g', px + 3, py + 12, opacity * 0.7, 9, PURPLE);
    }
  },
  roadBanking: (ctx, x, y, graphWidth, graphHeight, formulaLabel, prog, opacity, globalTime, helpers) => {
    const { drawChalkLine, drawChalkText, drawChalkArrow, WHITE, CYAN, PURPLE } = helpers;
    const cx = x + graphWidth / 2;
    const cy = y + 10;
    const bw = graphWidth * 0.7;
    const bh = graphHeight * 0.5;

    const p1 = { x: cx - bw / 2, y: cy + bh / 2 };
    const p2 = { x: cx + bw / 2, y: cy + bh / 2 };
    const p3 = { x: cx - bw / 2, y: cy - bh / 2 };

    if (prog > 0.1) {
      drawChalkLine(ctx, [p1, p2, p3, p1], opacity * 0.5, 1.2);
      drawChalkText(ctx, 'θ', cx + bw / 2 - 20, cy + bh / 2 - 10, opacity * 0.8, 10);
    }

    const angle = Math.atan2(-bh, bw);
    const bx = cx;
    const by = cy;

    if (prog > 0.3) {
      ctx.save();
      ctx.translate(bx, by);
      ctx.rotate(angle);
      drawChalkLine(ctx, [
        { x: -12, y: -8 },
        { x: 12, y: -8 },
        { x: 12, y: 0 },
        { x: -12, y: 0 },
        { x: -12, y: -8 }
      ], opacity, 1.5, WHITE);
      ctx.restore();
    }

    if (prog > 0.5) {
      drawChalkArrow(ctx, bx, by - 4, bx, by + 26, opacity, 1.5, PURPLE);
      drawChalkText(ctx, 'mg', bx + 4, by + 22, opacity, 10, PURPLE);

      const perpAngle = angle - Math.PI / 2;
      const nx = bx + Math.cos(perpAngle) * 26;
      const ny = by + Math.sin(perpAngle) * 26;
      drawChalkArrow(ctx, bx, by - 4, nx, ny, opacity, 1.5, CYAN);
      drawChalkText(ctx, 'N', nx + 4, ny - 4, opacity, 10, CYAN);
    }

    if (prog > 0.7) {
      drawChalkArrow(ctx, bx, by - 4, bx - 26, by - 4, opacity * 0.7, 1.2, WHITE);
      drawChalkText(ctx, 'F_c', bx - 36, by - 10, opacity * 0.7, 9);
    }
  },
  springMass: (ctx, x, y, graphWidth, graphHeight, formulaLabel, prog, opacity, globalTime, helpers) => {
    const { drawChalkLine, drawChalkText, drawChalkArrow, WHITE, CYAN, PURPLE } = helpers;
    const lx = x + 15;
    const cy = y + 10;
    const lw = graphWidth - 30;
    const wallX = lx;

    const blockX = lx + lw * 0.5 + Math.sin(globalTime * 0.04) * (lw * 0.25);
    const blockY = cy;

    if (prog > 0.1) {
      drawChalkLine(ctx, [{ x: wallX, y: cy - 20 }, { x: wallX, y: cy + 20 }], opacity * 0.6, 1.8);
      drawChalkLine(ctx, [{ x: wallX, y: cy + 10 }, { x: lx + lw, y: cy + 10 }], opacity * 0.4, 1);

      drawChalkLine(ctx, [
        { x: blockX - 10, y: blockY - 10 },
        { x: blockX + 10, y: blockY - 10 },
        { x: blockX + 10, y: blockY + 10 },
        { x: blockX - 10, y: blockY + 10 },
        { x: blockX - 10, y: blockY - 10 }
      ], opacity, 1.5, WHITE);
      drawChalkText(ctx, 'm', blockX - 4, blockY - 4, opacity * 0.8, 10);
    }

    if (prog > 0.3) {
      const sprStart = wallX;
      const sprEnd = blockX - 10;
      const sprW = sprEnd - sprStart;
      const coils = 12;
      const sprPts = [{ x: sprStart, y: cy }];

      for (let i = 0; i <= coils; i++) {
        const u = i / coils;
        const sx = sprStart + u * sprW;
        const sy = cy + (i === 0 || i === coils ? 0 : (i % 2 === 0 ? 8 : -8));
        sprPts.push({ x: sx, y: sy });
      }
      drawChalkLine(ctx, sprPts, opacity * 0.7, 1.2, CYAN);
    }

    if (prog > 0.6) {
      const isExtended = blockX > (lx + lw * 0.5);
      if (isExtended) {
        drawChalkArrow(ctx, blockX - 12, blockY - 14, blockX - 32, blockY - 14, opacity, 1.2, PURPLE);
        drawChalkText(ctx, '-kx', blockX - 45, blockY - 22, opacity, 10, PURPLE);
      } else {
        drawChalkArrow(ctx, blockX + 12, blockY - 14, blockX + 32, blockY - 14, opacity, 1.2, PURPLE);
        drawChalkText(ctx, '-kx', blockX + 22, blockY - 22, opacity, 10, PURPLE);
      }
    }
  },
  damped: (ctx, x, y, graphWidth, graphHeight, formulaLabel, prog, opacity, globalTime, helpers) => {
    const { drawChalkLine, WHITE, CYAN, PURPLE } = helpers;
    const lx = x + 15;
    const cy = y + 10;
    const lw = graphWidth - 30;
    const scaleFactor = graphHeight * 0.4;

    if (prog > 0.1) {
      drawChalkLine(ctx, [{ x: lx, y: cy }, { x: lx + lw, y: cy }], opacity * 0.35, 1);
      drawChalkLine(ctx, [{ x: lx, y: cy - scaleFactor }, { x: lx, y: cy + scaleFactor }], opacity * 0.35, 1);
    }

    const envPtsUpper = [];
    const envPtsLower = [];
    const wavePts = [];
    const steps = 40;
    for (let i = 0; i <= steps; i++) {
      const u = i / steps;
      const px = lx + u * lw;
      const env = scaleFactor * Math.exp(-u * 2);
      envPtsUpper.push({ x: px, y: cy - env });
      envPtsLower.push({ x: px, y: cy + env });

      const py = cy - Math.sin(u * Math.PI * 6) * env;
      wavePts.push({ x: px, y: py });
    }

    if (prog > 0.3) {
      for (let k = 0; k < envPtsUpper.length - 1; k += 2) {
        drawChalkLine(ctx, [envPtsUpper[k], envPtsUpper[k + 1]], opacity * 0.4, 1.0, PURPLE);
        drawChalkLine(ctx, [envPtsLower[k], envPtsLower[k + 1]], opacity * 0.4, 1.0, PURPLE);
      }
    }
    if (prog > 0.5) {
      drawChalkLine(ctx, wavePts, opacity, 1.5, CYAN);

      const tVal = (globalTime * 0.005) % 1.0;
      const idx = Math.floor(tVal * steps);
      if (idx < wavePts.length) {
        const p = wavePts[idx];
        ctx.beginPath();
        ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = `${WHITE}${opacity})`;
        ctx.fill();
      }
    }
  },
  doppler: (ctx, x, y, graphWidth, graphHeight, formulaLabel, prog, opacity, globalTime, helpers) => {
    const { drawChalkLine, drawChalkText, drawChalkArrow, WHITE, CYAN, PURPLE } = helpers;
    const lx = x + 15;
    const cy = y + 10;
    const lw = graphWidth - 30;

    const tVal = (globalTime * 0.004) % 1.0;
    const sourceX = lx + lw * 0.2 + tVal * (lw * 0.6);
    const sourceY = cy;

    if (prog > 0.1) {
      ctx.beginPath();
      ctx.arc(sourceX, sourceY, 3, 0, Math.PI * 2);
      ctx.fillStyle = `${WHITE}${opacity})`;
      ctx.fill();

      drawChalkArrow(ctx, sourceX, sourceY, sourceX + 16, sourceY, opacity, 1.2, CYAN);
      drawChalkText(ctx, 'v_s', sourceX + 18, sourceY - 6, opacity, 9, CYAN);
    }

    if (prog > 0.4) {
      const circleCount = 4;
      for (let i = 0; i < circleCount; i++) {
        const circleAge = ((globalTime * 0.01 + i * 0.25) % 1.0);
        const radius = circleAge * (lw * 0.35);
        if (radius <= 3) continue;

        const cX = sourceX - radius * 0.45;

        ctx.save();
        ctx.beginPath();
        ctx.arc(cX, sourceY, radius, 0, Math.PI * 2);
        ctx.strokeStyle = `${i % 2 === 0 ? CYAN : PURPLE}${opacity * 0.45 * (1 - circleAge)})`;
        ctx.lineWidth = 1.0;
        ctx.stroke();
        ctx.restore();
      }
    }
  },
  streamline: (ctx, x, y, graphWidth, graphHeight, formulaLabel, prog, opacity, globalTime, helpers) => {
    const { drawChalkLine, WHITE, CYAN, PURPLE } = helpers;
    const cx = x + graphWidth / 2;
    const cy = y + 10;
    const R = 15;

    if (prog > 0.1) {
      const obsPts = [];
      for (let a = 0; a <= Math.PI * 2 + 0.1; a += 0.25) {
        obsPts.push({ x: cx + R * Math.cos(a), y: cy + R * Math.sin(a) });
      }
      drawChalkLine(ctx, obsPts, opacity * 0.8, 1.8, PURPLE);
    }

    if (prog > 0.3) {
      const flowW = graphWidth - 20;
      const count = 5;

      for (let j = 0; j < count; j++) {
        const yOffset = (j - (count - 1) / 2) * 12;
        if (Math.abs(yOffset) < 3) continue;

        const linePts = [];
        const steps = 30;

        for (let i = 0; i <= steps; i++) {
          const u = i / steps;
          const px = cx - flowW / 2 + u * flowW;
          const dx = px - cx;

          const distSq = dx * dx + yOffset * yOffset;
          const factor = 1 + (R * R) / distSq;
          const py = cy + yOffset * factor;

          linePts.push({ x: px, y: py });
        }

        drawChalkLine(ctx, linePts, opacity * 0.45, 1.0, CYAN);

        const flowT = (globalTime * 0.015 + j * 0.22) % 1.0;
        const ptIdx = Math.floor(flowT * steps);
        if (ptIdx < linePts.length) {
          const p = linePts[ptIdx];
          ctx.beginPath();
          ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
          ctx.fillStyle = `${WHITE}${opacity})`;
          ctx.fill();
        }
      }
    }
  },
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
