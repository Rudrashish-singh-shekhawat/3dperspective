import { LABEL_SIZE, getCenter } from './physicsHelpers';

export const physicsPart5 = {
  // ==========================================
  // Circuit Diagram
  // ==========================================
  circuit: (ctx, x, y, graphWidth, graphHeight, formulaLabel, prog, opacity, globalTime, helpers) => {
    const { drawChalkLine, drawChalkText, drawChalkArrow, CYAN, PURPLE, drawParticle } = helpers;
    const { cx, cy } = getCenter(x, y, graphWidth);
    const cw = graphWidth * 0.7;
    const ch = graphHeight * 0.55;

    const leftX = cx - cw / 2;
    const rightX = cx + cw / 2;
    const topY = cy - ch / 2;
    const botY = cy + ch / 2;

    if (prog > 0.1) {
      // Wires
      drawChalkLine(ctx, [{ x: leftX, y: topY }, { x: leftX, y: cy - 10 }], opacity * 0.5, 1.2);
      drawChalkLine(ctx, [{ x: leftX, y: cy + 10 }, { x: leftX, y: botY }], opacity * 0.5, 1.2);

      // Battery
      drawChalkLine(ctx, [{ x: leftX - 12, y: cy - 4 }, { x: leftX + 12, y: cy - 4 }], opacity, 2.0, PURPLE);
      drawChalkLine(ctx, [{ x: leftX - 6, y: cy + 4 }, { x: leftX + 6, y: cy + 4 }], opacity, 1.2, CYAN);
      drawChalkText(ctx, '+', leftX + 16, cy - 8, opacity * 0.8, LABEL_SIZE, PURPLE);
      drawChalkText(ctx, '-', leftX + 12, cy + 8, opacity * 0.8, LABEL_SIZE, CYAN);
      drawChalkText(ctx, 'E (EMF)', leftX - 25, cy - 10, opacity, LABEL_SIZE, PURPLE);
    }

    if (prog > 0.3) {
      // Resistor
      const resY1 = cy - 20;
      const resY2 = cy + 20;
      drawChalkLine(ctx, [{ x: rightX, y: topY }, { x: rightX, y: resY1 }], opacity * 0.5, 1.2);
      drawChalkLine(ctx, [{ x: rightX, y: resY2 }, { x: rightX, y: botY }], opacity * 0.5, 1.2);

      const resPts = [{ x: rightX, y: resY1 }];
      const count = 5;
      const step = (resY2 - resY1) / count;
      for (let i = 0; i < count; i++) {
        const ry = resY1 + (i + 0.5) * step;
        const rx = rightX + (i % 2 === 0 ? 8 : -8);
        resPts.push({ x: rx, y: ry });
      }
      resPts.push({ x: rightX, y: resY2 });
      drawChalkLine(ctx, resPts, opacity * 0.8, 1.5, CYAN);
      drawChalkText(ctx, 'R', rightX + 12, cy, opacity, LABEL_SIZE, CYAN);
    }

    if (prog > 0.5) {
      drawChalkLine(ctx, [{ x: leftX, y: topY }, { x: rightX, y: topY }], opacity * 0.5, 1.2);
      drawChalkLine(ctx, [{ x: leftX, y: botY }, { x: rightX, y: botY }], opacity * 0.5, 1.2);

      // Physics: E-field in the wire drives current
      drawChalkArrow(ctx, cx - 15, topY - 12, cx + 15, topY - 12, opacity * 0.7, 1, PURPLE);
      drawChalkText(ctx, 'E field', cx - 15, topY - 16, opacity * 0.7, LABEL_SIZE - 2, PURPLE);
    }

    if (prog > 0.7) {
      const perim = cw * 2 + ch * 2;
      const tVal = (globalTime * 0.05) % perim;
      const numCharges = 8;
      
      for (let k = 0; k < numCharges; k++) {
        let d = (tVal + k * (perim / numCharges)) % perim;
        let px, py;
        if (d < cw) { px = leftX + d; py = topY; }
        else if (d < cw + ch) { px = rightX; py = topY + (d - cw); }
        else if (d < cw * 2 + ch) { px = rightX - (d - (cw + ch)); py = botY; }
        else { px = leftX; py = botY - (d - (cw * 2 + ch)); }

        drawParticle(ctx, px, py, opacity, CYAN);
      }
      drawChalkText(ctx, 'I (drift)', cx - 15, topY + 14, opacity * 0.9, LABEL_SIZE, CYAN);
    }
  },
  // ==========================================
  // Logic Diagram
  // ==========================================
  logic: (ctx, x, y, graphWidth, graphHeight, formulaLabel, prog, opacity, globalTime, helpers) => {
    const { drawChalkLine, drawChalkText, CYAN, PURPLE } = helpers;
    const cx = x + graphWidth / 2;
    const cy = y + 10;
    const gw = 45;
    const gh = 32;

    if (prog > 0.1) {
      drawChalkLine(ctx, [{ x: cx - gw, y: cy - 10 }, { x: cx - gw * 0.4, y: cy - 10 }], opacity * 0.8, 1.2, PURPLE);
      drawChalkLine(ctx, [{ x: cx - gw, y: cy + 10 }, { x: cx - gw * 0.4, y: cy + 10 }], opacity * 0.8, 1.2, PURPLE);
      drawChalkText(ctx, 'A', cx - gw - 12, cy - 14, opacity, LABEL_SIZE, PURPLE);
      drawChalkText(ctx, 'B', cx - gw - 12, cy + 4, opacity, LABEL_SIZE, PURPLE);
      
      drawChalkText(ctx, 'AND Gate', cx - 20, cy - gh / 2 - 10, opacity * 0.8, LABEL_SIZE - 1, 'rgba(255, 255, 255, ');
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
  // ==========================================
  // Lens Diagram (Real Image Optics)
  // ==========================================
  lens: (ctx, x, y, graphWidth, graphHeight, formulaLabel, prog, opacity, globalTime, helpers) => {
    const { drawChalkLine, drawChalkText, drawChalkArrow, WHITE, CYAN, PURPLE } = helpers;
    const { cx, cy } = getCenter(x, y, graphWidth);

    if (prog > 0.1) {
      // Principal axis
      ctx.save();
      ctx.setLineDash([4, 4]);
      drawChalkLine(ctx, [{ x: x + 5, y: cy }, { x: x + graphWidth - 5, y: cy }], opacity * 0.35, 1);
      ctx.restore();

      // Draw biconvex lens
      const lensPts1 = [];
      const lensPts2 = [];
      const lh = graphHeight * 0.42;
      for (let a = -Math.PI / 4; a <= Math.PI / 4; a += 0.1) {
        lensPts1.push({ x: cx - 6 + Math.cos(a) * 15, y: cy + Math.sin(a) * lh * 1.5 });
        lensPts2.push({ x: cx + 6 - Math.cos(a) * 15, y: cy + Math.sin(a) * lh * 1.5 });
      }
      drawChalkLine(ctx, lensPts1, opacity * 0.7, 1.5, PURPLE);
      drawChalkLine(ctx, lensPts2, opacity * 0.7, 1.5, PURPLE);

      // Focus
      const fDist = graphWidth * 0.28;
      drawChalkLine(ctx, [{ x: cx + fDist, y: cy - 3 }, { x: cx + fDist, y: cy + 3 }], opacity * 0.5, 1);
      drawChalkText(ctx, 'F', cx + fDist - 4, cy + 12, opacity * 0.6, LABEL_SIZE);
      drawChalkLine(ctx, [{ x: cx - fDist, y: cy - 3 }, { x: cx - fDist, y: cy + 3 }], opacity * 0.5, 1);
      drawChalkText(ctx, 'F', cx - fDist - 4, cy + 12, opacity * 0.6, LABEL_SIZE);
    }

    const fDist = graphWidth * 0.28;
    // Object parameters
    const objX = cx - fDist * 1.4; // Object outside F
    const objH = 20;
    const objY = cy - objH;
    
    // Lens equations: 1/f = 1/v - 1/u (u is negative here)
    const u = -(cx - objX);
    const f = fDist;
    const v = 1 / (1/f + 1/u); // Image distance
    const mag = v / u; // Magnification
    
    const imgX = cx + v;
    const imgY = cy - (objH * mag); // Negative mag means inverted

    if (prog > 0.3) {
      // Draw object
      drawChalkArrow(ctx, objX, cy, objX, objY, opacity, 1.5, WHITE);
      drawChalkText(ctx, 'Object', objX - 15, objY - 6, opacity, LABEL_SIZE - 2, WHITE);
    }
    
    if (prog > 0.6) {
      // Draw image
      drawChalkArrow(ctx, imgX, cy, imgX, imgY, opacity, 1.5, PURPLE);
      drawChalkText(ctx, 'Real Image', imgX - 15, imgY + 12, opacity, LABEL_SIZE - 2, PURPLE);
    }

    if (prog > 0.6) {
      const t = (globalTime * 0.012) % 1.0;
      if (t < 0.5) {
        // Ray 1: Parallel to axis, then through focus
        const ut = t * 2;
        const r1x = objX + (cx - objX) * ut;
        drawChalkLine(ctx, [{ x: r1x, y: objY }, { x: r1x + 1, y: objY }], opacity * 0.9, 3, CYAN);
        
        // Ray 2: Through optical center (straight line)
        const r2x = objX + (cx - objX) * ut;
        const r2y = objY + (cy - objY) * ut;
        drawChalkLine(ctx, [{ x: r2x, y: r2y }, { x: r2x + 1, y: r2y }], opacity * 0.9, 3, CYAN);
      } else {
        const ut = (t - 0.5) * 2;
        // Ray 1 continues: from lens (cx, objY) through Focus (cx+f, cy) to image (imgX, imgY)
        const r1x = cx + (imgX - cx) * ut;
        const r1y = objY + (imgY - objY) * ut;
        drawChalkLine(ctx, [{ x: r1x, y: r1y }, { x: r1x + 1, y: r1y }], opacity * 0.9, 2.5, CYAN);
        
        // Ray 2 continues: from optical center (cx, cy) to image (imgX, imgY)
        const r2x = cx + (imgX - cx) * ut;
        const r2y = cy + (imgY - cy) * ut;
        drawChalkLine(ctx, [{ x: r2x, y: r2y }, { x: r2x + 1, y: r2y }], opacity * 0.9, 2.5, CYAN);
      }
    }
  }
};
