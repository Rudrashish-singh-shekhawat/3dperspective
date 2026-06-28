import { LABEL_SIZE, getCenter } from './physicsHelpers';

export const physicsPart6 = {
  // ==========================================
  // Newton2 Diagram
  // ==========================================
  newton2: (ctx, x, y, graphWidth, graphHeight, formulaLabel, prog, opacity, globalTime, helpers) => {
    const { drawChalkLine, drawChalkText, drawChalkArrow, WHITE, CYAN, PURPLE } = helpers;
    const { cx, cy } = getCenter(x, y, graphWidth);
    
    // Physics: F = ma. Animate force increasing -> accel increasing -> speed increasing
    const cycle = (globalTime * 0.015) % Math.PI;
    const forceMag = Math.max(0, Math.sin(cycle)) * 50; 
    const mass = 10;
    const accelMag = forceMag / mass; // F = ma
    
    // Velocity integrates acceleration
    const velMag = Math.max(0, -Math.cos(cycle) + 1) * 20; 
    
    const boxX = cx - 40 + velMag;
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
      drawChalkText(ctx, `${mass}kg`, boxX - 12, boxY - 14, opacity * 0.8, LABEL_SIZE, WHITE);
    }
    
    if (prog > 0.4 && forceMag > 2) {
      // Force vector
      drawChalkArrow(ctx, boxX + 12, boxY, boxX + 12 + forceMag, boxY, opacity, 1.6, CYAN);
      drawChalkText(ctx, `ΣF`, boxX + 16 + forceMag, boxY - 5, opacity, LABEL_SIZE, CYAN);
    }
    
    if (prog > 0.7 && accelMag > 0.2) {
      // Acceleration vector
      drawChalkArrow(ctx, boxX - 10, boxY - 20, boxX - 10 + accelMag * 4, boxY - 20, opacity * 0.8, 1.2, PURPLE);
      drawChalkText(ctx, `a`, boxX - 10 + accelMag * 4 + 4, boxY - 25, opacity * 0.8, LABEL_SIZE, PURPLE);
      
      // Formula
      drawChalkText(ctx, 'ΣF = ma', cx - 20, cy - 20, opacity * 0.9, LABEL_SIZE, WHITE);
    }
  },
  // ==========================================
  // Projectile Diagram
  // ==========================================
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
    const initialAngle = Math.PI / 4;
    const v0 = 25;

    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      const px = lx + (v0 * Math.cos(initialAngle)) * t * 2;
      const py = ly - ((v0 * Math.sin(initialAngle)) * t * 2 - 0.5 * 9.8 * Math.pow(t * 2, 2));
      trajPts.push({ x: px, y: py });
    }

    if (prog > 0.3) {
      for (let i = 0; i < trajPts.length - 1; i += 2) {
        drawChalkLine(ctx, [trajPts[i], trajPts[i + 1]], opacity * 0.45, 1, WHITE);
      }
    }

    if (prog > 0.5) {
      const tVal = (globalTime * 0.005) % 1.0;
      const px = lx + (v0 * Math.cos(initialAngle)) * tVal * 2;
      const py = ly - ((v0 * Math.sin(initialAngle)) * tVal * 2 - 0.5 * 9.8 * Math.pow(tVal * 2, 2));

      ctx.beginPath();
      ctx.arc(px, py, 3, 0, Math.PI * 2);
      ctx.fillStyle = `${CYAN}${opacity})`;
      ctx.fill();

      // Velocity Components (vx, vy)
      const vx = v0 * Math.cos(initialAngle);
      const vy = v0 * Math.sin(initialAngle) - 9.8 * tVal * 2;
      drawChalkArrow(ctx, px, py, px + vx, py, opacity, 1.2, CYAN);
      drawChalkArrow(ctx, px, py, px, py - vy, opacity, 1.2, PURPLE);
      drawChalkText(ctx, 'v_x', px + vx, py - 10, opacity * 0.8, 9, CYAN);
      drawChalkText(ctx, 'v_y', px - 15, py - vy, opacity * 0.8, 9, PURPLE);
    }
  },
  // ==========================================
  // Road Banking Diagram
  // ==========================================
  roadBanking: (ctx, x, y, graphWidth, graphHeight, formulaLabel, prog, opacity, globalTime, helpers) => {
    const { drawChalkLine, drawChalkText, drawChalkArrow, CYAN, PURPLE, WHITE } = helpers;
    const { cx, cy } = getCenter(x, y, graphWidth);
    const slopeW = graphWidth - 50;
    const slopeH = graphHeight * 0.45;
    const angle = Math.atan2(slopeH, slopeW);
    const boxW = 24, boxH = 16;
    
    // Centers
    const bcy = cy + 10;
    const boxCx = cx;
    const boxCy = bcy - slopeH / 2 - boxH / 2;

    if (prog > 0.1) {
      drawChalkLine(ctx, [{ x: cx - slopeW / 2, y: bcy }, { x: cx + slopeW / 2, y: bcy }], opacity * 0.4, 1);
      drawChalkLine(ctx, [{ x: cx - slopeW / 2, y: bcy }, { x: cx + slopeW / 2, y: bcy - slopeH }], opacity * 0.6, 1.5);
      drawChalkText(ctx, 'θ', cx + slopeW / 2 - 20, bcy - 5, opacity * 0.6, LABEL_SIZE);
    }
    
    if (prog > 0.3) {
      ctx.save();
      ctx.translate(boxCx, boxCy);
      ctx.rotate(-angle);
      drawChalkLine(ctx, [
        { x: -boxW / 2, y: -boxH / 2 }, { x: boxW / 2, y: -boxH / 2 },
        { x: boxW / 2, y: boxH / 2 }, { x: -boxW / 2, y: boxH / 2 }, { x: -boxW / 2, y: -boxH / 2 }
      ], opacity, 1.5, WHITE);
      ctx.restore();
    }
    
    const mg = 35;
    if (prog > 0.5) {
      // Weight
      drawChalkArrow(ctx, boxCx, boxCy, boxCx, boxCy + mg, opacity, 1.5, PURPLE);
      drawChalkText(ctx, 'mg', boxCx + 5, boxCy + mg + 5, opacity, LABEL_SIZE, PURPLE);

      // Normal Force (N = mg / cos(theta) so N cos = mg and N sin = Fc)
      const nMag = mg / Math.cos(angle);
      const nx = boxCx - Math.sin(angle) * nMag;
      const ny = boxCy - Math.cos(angle) * nMag;
      drawChalkArrow(ctx, boxCx, boxCy, nx, ny, opacity, 1.5, CYAN);
      drawChalkText(ctx, 'N', nx - 10, ny - 5, opacity, LABEL_SIZE, CYAN);
    }
    
    if (prog > 0.7) {
      // Physics: Decompose N into vertical and horizontal
      const nMag = mg / Math.cos(angle);
      const nx = boxCx - Math.sin(angle) * nMag;
      const ny = boxCy - Math.cos(angle) * nMag;
      
      // Vertical component N cos(theta)
      drawChalkArrow(ctx, boxCx, boxCy, boxCx, ny, opacity * 0.5, 1, CYAN);
      ctx.save(); ctx.setLineDash([3,3]); ctx.strokeStyle=`rgba(255,255,255,${opacity*0.3})`;
      ctx.beginPath(); ctx.moveTo(nx, ny); ctx.lineTo(boxCx, ny); ctx.stroke(); ctx.restore();
      drawChalkText(ctx, 'N cosθ', boxCx + 4, ny + 10, opacity * 0.7, LABEL_SIZE - 1, CYAN);

      // Horizontal component N sin(theta) which IS the centripetal force
      drawChalkArrow(ctx, boxCx, boxCy, nx, boxCy, opacity * 0.8, 1.5, WHITE);
      ctx.save(); ctx.setLineDash([3,3]); ctx.strokeStyle=`rgba(255,255,255,${opacity*0.3})`;
      ctx.beginPath(); ctx.moveTo(nx, ny); ctx.lineTo(nx, boxCy); ctx.stroke(); ctx.restore();
      
      drawChalkText(ctx, 'F_c = N sinθ', nx - 35, boxCy + 15, opacity * 0.9, LABEL_SIZE, WHITE);
    }
  }
};
