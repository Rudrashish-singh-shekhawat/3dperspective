export const physicsPart7 = {
  // ==========================================
  // Spring Mass Diagram
  // ==========================================
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
  // ==========================================
  // Damped Diagram
  // ==========================================
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
  // ==========================================
  // Doppler Diagram
  // ==========================================
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
  // ==========================================
  // Streamline Diagram
  // ==========================================
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
  }
};
