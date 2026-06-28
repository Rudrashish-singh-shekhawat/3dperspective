import { LABEL_SIZE, drawParticle } from './physicsHelpers';

export const physicsPart2 = {
  // ==========================================
  // Prism Diagram (Wavelength Dispersion)
  // ==========================================
  prism: (ctx, x, y, graphWidth, graphHeight, formulaLabel, prog, opacity, globalTime, helpers) => {
    const { drawChalkLine, drawChalkText, drawChalkArrow, WHITE, CYAN, PURPLE } = helpers;
    const x1 = x + 15, y1 = y + graphHeight * 0.35;
    const x2 = x + graphWidth / 2, y2 = y - graphHeight * 0.4;
    const x3 = x + graphWidth - 15, y3 = y + graphHeight * 0.35;

    if (prog > 0.1) {
      drawChalkLine(ctx, [{ x: x1, y: y1 }, { x: x2, y: y2 }, { x: x3, y: y3 }, { x: x1, y: y1 }], opacity * 0.5, 1.5);
    }

    // Physics: Dispersion angles derived from n(λ)
    // Refractive index differs by wavelength
    const nCyan = 1.52; // Shorter wavelength bends more
    const nPurple = 1.54; // Shortest wavelength bends most
    
    // Abstract geometric representation of Snell's Law through prism
    const hit1X = x + graphWidth * 0.32;
    const hit1Y = y - 2;
    const hit2X = x + graphWidth * 0.68;
    const hit2Y = y + 6;
    
    // Output angles are mathematically separated based on refractive index
    const outAngleCyan = Math.asin(nCyan * Math.sin(Math.PI/6)) - Math.PI/6;
    const outAnglePurple = Math.asin(nPurple * Math.sin(Math.PI/6)) - Math.PI/6;
    
    const rayLength = 35;
    const outX_cyan = hit2X + Math.cos(outAngleCyan) * rayLength;
    const outY_cyan = hit2Y + Math.sin(outAngleCyan) * rayLength;
    const outX_purple = hit2X + Math.cos(outAnglePurple) * rayLength;
    const outY_purple = hit2Y + Math.sin(outAnglePurple) * rayLength;

    if (prog > 0.4) {
      drawChalkArrow(ctx, x, y + 12, hit1X, hit1Y, opacity, 1.5, WHITE);
      drawChalkLine(ctx, [{ x: hit1X, y: hit1Y }, { x: hit2X, y: hit2Y }], opacity, 1.5, CYAN);
    }
    if (prog > 0.7) {
      drawChalkArrow(ctx, hit2X, hit2Y, outX_cyan, outY_cyan, opacity, 1.5, CYAN);
      drawChalkArrow(ctx, hit2X, hit2Y, outX_purple, outY_purple, opacity, 1.5, PURPLE);
      drawChalkText(ctx, 'δ(λ)', hit2X + 12, hit1Y - 8, opacity * 0.75, LABEL_SIZE, PURPLE);
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
  // ==========================================
  // Cell Diagram (Oxidation / Reduction)
  // ==========================================
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
      // Anode (-) Oxidation
      drawChalkLine(ctx, [
        { x: ex1 - 6, y: by + 8 }, { x: ex1 + 6, y: by + 8 },
        { x: ex1 + 6, y: by + bh * 0.85 }, { x: ex1 - 6, y: by + bh * 0.85 }, { x: ex1 - 6, y: by + 8 }
      ], opacity * 0.65, 1.2, CYAN);
      drawChalkText(ctx, '-', ex1 - 3, by - 4, opacity * 0.8, LABEL_SIZE, CYAN);

      // Cathode (+) Reduction
      drawChalkLine(ctx, [
        { x: ex2 - 6, y: by + 8 }, { x: ex2 + 6, y: by + 8 },
        { x: ex2 + 6, y: by + bh * 0.85 }, { x: ex2 - 6, y: by + bh * 0.85 }, { x: ex2 - 6, y: by + 8 }
      ], opacity * 0.65, 1.2, PURPLE);
      drawChalkText(ctx, '+', ex2 - 3, by - 4, opacity * 0.8, LABEL_SIZE, PURPLE);
    }
    if (prog > 0.7) {
      // Wire
      drawChalkLine(ctx, [{ x: ex1, y: by + 8 }, { x: ex1, y: batY }, { x: midX - 6, y: batY }], opacity * 0.45, 1);
      drawChalkLine(ctx, [{ x: ex2, y: by + 8 }, { x: ex2, y: batY }, { x: midX + 6, y: batY }], opacity * 0.45, 1);

      // Load (Bulb or Voltmeter)
      ctx.beginPath();
      ctx.arc(midX, batY, 6, 0, Math.PI * 2);
      ctx.strokeStyle = `${CYAN}${opacity})`;
      ctx.lineWidth = 1.5;
      ctx.stroke();
      drawChalkText(ctx, 'V', midX - 4, batY + 4, opacity, LABEL_SIZE - 2, CYAN);
    }

    if (prog > 0.7) {
      // Physics: Electrons flow through wire from Anode(-) to Cathode(+)
      // Ions flow through electrolyte to balance charge
      const t = (globalTime * 0.01) % 1.0;
      
      // Electron flow (wire)
      const eX = ex1 + (ex2 - ex1) * t;
      const eY = batY;
      drawParticle(ctx, eX, eY, opacity, CYAN);
      drawChalkText(ctx, 'e⁻', eX - 4, eY - 6, opacity * 0.8, LABEL_SIZE - 2, CYAN);
      
      // Ion flow (electrolyte)
      const ionX = ex2 - (ex2 - ex1) * t;
      const ionY = by + bh * 0.65;
      drawParticle(ctx, ionX, ionY, opacity, PURPLE);
      drawChalkText(ctx, '+', ionX - 3, ionY - 5, opacity * 0.8, LABEL_SIZE, PURPLE);
    }
  },
  // ==========================================
  // Thermo Diagram
  // ==========================================
  thermo: (ctx, x, y, graphWidth, graphHeight, formulaLabel, prog, opacity, globalTime, helpers) => {
    const { drawChalkLine, drawChalkText, drawChalkArrow, CYAN, PURPLE, WHITE } = helpers;
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
        { x: cx + cw * 0.5, y: cy + ch * 0.58, dx: -0.2, dy: 0.4 },
        { x: cx + cw * 0.3, y: cy + ch * 0.85, dx: -0.3, dy: 0.2 },
        { x: cx + cw * 0.65, y: cy + ch * 0.82, dx: 0.1, dy: -0.4 }
      ];
      gas.forEach((g, idx) => {
        const jx = g.x + Math.sin(globalTime * 0.1 + idx) * 4;
        const jy = g.y + Math.cos(globalTime * 0.08 + idx) * 4;
        
        // Physics: scale Y proportionally to available volume to show density increase
        const baseMinY = cy + ch * 0.4;
        const baseMaxY = cy + ch;
        const normalizedY = (jy - baseMinY) / (baseMaxY - baseMinY);
        const finalY = pistY + normalizedY * (baseMaxY - pistY);
        
        drawChalkLine(ctx, [{ x: jx, y: finalY }, { x: jx + 0.5, y: finalY }], opacity, 2.5, PURPLE);
      });

      const qY = cy + ch + 12;
      drawChalkArrow(ctx, cx + cw * 0.35, qY, cx + cw * 0.35, cy + ch - 2, opacity * 0.7, 1, CYAN);
      drawChalkText(ctx, 'dQ', cx + cw / 2 - 10, qY + 11, opacity, 11, CYAN);
    }
  }
};
