import { LABEL_SIZE, getCenter, drawCircle } from './physicsHelpers';

export const physicsPart3 = {
  // ==========================================
  // Fbd Diagram
  // ==========================================
  fbd: (ctx, x, y, graphWidth, graphHeight, formulaLabel, prog, opacity, globalTime, helpers) => {
    const { drawChalkLine, drawChalkText, drawChalkArrow, WHITE, CYAN, PURPLE } = helpers;
    const { cx, cy } = getCenter(x, y, graphWidth);
    const slopeW = graphWidth - 40;
    const slopeH = graphHeight * 0.55;
    
    // Physics: Normal force N = mg cos(theta)
    const angle = Math.atan2(slopeH, slopeW);
    const boxW = 28;
    const boxH = 22;
    const wLength = 40; // mg vector length
    
    // Accurate vector lengths based on physics equations
    const nLength = wLength * Math.cos(angle); 
    const fParallel = wLength * Math.sin(angle);
    const friction = fParallel * 0.6; // kinetic friction
    
    // Centers for box
    const bcy = cy + 10;
    
    if (prog > 0.1) {
      drawChalkLine(ctx, [{ x: cx - slopeW / 2, y: bcy + slopeH / 2 }, { x: cx + slopeW / 2, y: bcy - slopeH / 2 }], opacity * 0.5, 1.5);
      drawChalkLine(ctx, [{ x: cx - slopeW / 2, y: bcy + slopeH / 2 }, { x: cx + slopeW / 2, y: bcy + slopeH / 2 }], opacity * 0.3, 1);
    }
    
    if (prog > 0.3) {
      ctx.save();
      ctx.translate(cx, bcy);
      ctx.rotate(-angle);
      drawChalkLine(ctx, [
        { x: -boxW / 2, y: -boxH }, { x: boxW / 2, y: -boxH },
        { x: boxW / 2, y: 0 }, { x: -boxW / 2, y: 0 }, { x: -boxW / 2, y: -boxH }
      ], opacity * 0.8, 1.5, WHITE);
      ctx.restore();
    }
    
    if (prog > 0.5) {
      // Weight (mg)
      drawChalkArrow(ctx, cx, bcy - boxH/2, cx, bcy - boxH/2 + wLength, opacity, 1.5, CYAN);
      drawChalkText(ctx, 'mg', cx + 4, bcy - boxH/2 + wLength + 6, opacity, LABEL_SIZE, CYAN);

      // Normal force (mg cosθ)
      const nx = cx + Math.cos(angle - Math.PI / 2) * nLength;
      const ny = bcy - boxH/2 + Math.sin(angle - Math.PI / 2) * nLength;
      drawChalkArrow(ctx, cx, bcy - boxH/2, nx, ny, opacity, 1.5, PURPLE);
      drawChalkText(ctx, 'N', nx - 12, ny - 6, opacity, LABEL_SIZE, PURPLE);
    }
    
    if (prog > 0.7) {
      // Friction opposing motion
      const fricAngle = angle + Math.PI;
      const fx = cx + Math.cos(fricAngle) * friction;
      const fy = bcy - boxH/2 + Math.sin(fricAngle) * friction;
      drawChalkArrow(ctx, cx, bcy - boxH/2, fx, fy, opacity * 0.8, 1.5, PURPLE);
      drawChalkText(ctx, 'f', fx - 10, fy - 6, opacity * 0.8, LABEL_SIZE, PURPLE);

      // mg sin(theta) component
      const mgxx = cx + Math.cos(angle) * fParallel;
      const mgxy = bcy - boxH/2 + Math.sin(angle) * fParallel;
      drawChalkArrow(ctx, cx, bcy - boxH/2, mgxx, mgxy, opacity * 0.8, 1.2, WHITE);
      drawChalkText(ctx, 'mg sinθ', mgxx + 4, mgxy + 8, opacity * 0.8, LABEL_SIZE, WHITE);
    }
  },
  // ==========================================
  // Waves Diagram
  // ==========================================
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
  // ==========================================
  // Double Slit Diagram
  // ==========================================
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

      // Physics: Real Huygens wavelets expand as complete circles
      ctx.save();
      ctx.beginPath();
      ctx.rect(slitBarrierX + 2, sy - graphHeight, graphWidth, graphHeight * 2);
      ctx.clip(); // Only show waves to the right of the barrier

      for (let r = ripplePhase; r <= maxRadius; r += 10) {
        if (r <= 0) continue;
        const op = opacity * 0.45 * (1 - r / maxRadius);
        
        ctx.save();
        ctx.beginPath();
        ctx.arc(slitBarrierX, s1y, r, 0, Math.PI * 2);
        ctx.strokeStyle = `${PURPLE}${op})`;
        ctx.lineWidth = 1.0;
        ctx.stroke();
        ctx.restore();

        ctx.save();
        ctx.beginPath();
        ctx.arc(slitBarrierX, s2y, r, 0, Math.PI * 2);
        ctx.strokeStyle = `${CYAN}${op})`;
        ctx.lineWidth = 1.0;
        ctx.stroke();
        ctx.restore();
      }
      ctx.restore();
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
  }
};
