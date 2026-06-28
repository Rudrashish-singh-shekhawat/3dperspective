// ==========================================
// Constants & Helpers
// ==========================================
const LABEL_SIZE = 11;
const PARTICLE_RADIUS = 3;
const DEFAULT_OPACITY = 0.5;

const getCenter = (x, y, w) => ({ cx: x + w / 2, cy: y + 10 });

const drawCircle = (ctx, cx, cy, r, opacity, color, fill = false) => {
  ctx.save();
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  if (fill) {
    ctx.fillStyle = color || `rgba(255, 255, 255, ${opacity})`;
    ctx.fill();
  } else {
    ctx.strokeStyle = color || `rgba(255, 255, 255, ${opacity})`;
    ctx.lineWidth = 1.5;
    ctx.stroke();
  }
  ctx.restore();
};

const drawParticle = (ctx, cx, cy, opacity, color) => {
  drawCircle(ctx, cx, cy, PARTICLE_RADIUS, opacity, color, true);
};

export const physicsDiagrams = {
  // ==========================================
  // Circular Diagram
  // ==========================================
  circular: (ctx, x, y, graphWidth, graphHeight, formulaLabel, prog, opacity, globalTime, helpers) => {
    const { drawChalkLine, drawChalkText, drawChalkArrow, CYAN, PURPLE } = helpers;
    const { cx, cy } = getCenter(x, y, graphWidth);
    const R = graphHeight * 0.35;
    const omega = 0.025; // angular velocity
    const vMag = 30; // visual velocity magnitude
    const theta = globalTime * omega;
    const px = cx + R * Math.cos(theta);
    const py = cy + R * Math.sin(theta);

    if (prog > 0.1) {
      drawCircle(ctx, cx, cy, R, opacity * 0.45 * Math.min(1, (prog - 0.1) / 0.5));
    }
    if (prog > 0.5) {
      drawChalkLine(ctx, [{ x: cx, y: cy }, { x: px, y: py }], opacity * 0.5, 1.2, CYAN);
      drawChalkText(ctx, 'R', cx + (px - cx) * 0.5 - 12, cy + (py - cy) * 0.5 - 6, opacity * 0.5, LABEL_SIZE, CYAN);
    }
    if (prog > 0.7) {
      // Tangential velocity: v = ωR
      const vAngle = theta + Math.PI / 2;
      const vx = px + Math.cos(vAngle) * vMag;
      const vy = py + Math.sin(vAngle) * vMag;
      drawChalkArrow(ctx, px, py, vx, vy, opacity, 1.5, PURPLE);
      drawChalkText(ctx, 'v = ωR', vx + 5, vy - 5, opacity, LABEL_SIZE, PURPLE);

      // Centripetal acceleration: a_c = v²/R
      const ax = px - Math.cos(theta) * 26;
      const ay = py - Math.sin(theta) * 26;
      drawChalkArrow(ctx, px, py, ax, ay, opacity * 0.8, 1.5, CYAN);
      drawChalkText(ctx, 'a_c = v²/R', ax - 25, ay - 10, opacity * 0.8, LABEL_SIZE, CYAN);
    }
  },
  // ==========================================
  // Pendulum Diagram
  // ==========================================
  pendulum: (ctx, x, y, graphWidth, graphHeight, formulaLabel, prog, opacity, globalTime, helpers) => {
    const { drawChalkLine, drawChalkText, drawChalkArrow, CYAN, PURPLE } = helpers;
    const { cx } = getCenter(x, y, graphWidth);
    const cy = y - graphHeight * 0.4;
    
    // Physics: T = 2π√(L/g) -> omega = √(g/L)
    const L = graphHeight * 0.65;
    const g = 0.5; // virtual gravity
    const omega = Math.sqrt(g / L);
    const theta = 0.35 * Math.sin(globalTime * omega * 8.0); // Scaled for visible animation
    
    // Pre-calculate trigonometric functions to save calculations in frame loop
    const sinTheta = Math.sin(theta);
    const cosTheta = Math.cos(theta);
    
    const bx = cx + L * sinTheta;
    const by = cy + L * cosTheta;

    if (prog > 0.1) {
      // Draw ceiling attachment mount
      drawChalkLine(ctx, [{ x: cx - 35, y: cy }, { x: cx + 35, y: cy }], opacity * 0.5, 1.5);
      for (let sx = cx - 30; sx <= cx + 30; sx += 10) {
        drawChalkLine(ctx, [{ x: sx, y: cy }, { x: sx + 4, y: cy - 4 }], opacity * 0.3, 1);
      }
    }
    if (prog > 0.3) {
      // Draw string
      drawChalkLine(ctx, [{ x: cx, y: cy }, { x: bx, y: by }], opacity * 0.6, 1.2, CYAN);
      
      // Draw angle theta (θ) arc at the top pivot
      if (Math.abs(theta) > 0.02) {
        ctx.save();
        ctx.beginPath();
        const startAngle = Math.PI / 2;
        const endAngle = Math.PI / 2 + theta;
        ctx.arc(cx, cy, 25, startAngle, endAngle, theta < 0);
        ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.3})`;
        ctx.lineWidth = 1;
        ctx.stroke();
        
        // Offset label slightly from vertical axis
        const lx = cx + 32 * Math.sin(theta / 2);
        const ly = cy + 32 * Math.cos(theta / 2);
        drawChalkText(ctx, 'θ', lx - 3, ly + 5, opacity * 0.5, LABEL_SIZE - 2);
        ctx.restore();
      }
    }
    if (prog > 0.5) {
      // Draw solid bob with premium chalk outline
      drawCircle(ctx, bx, by, 7, opacity, PURPLE, true);
      drawCircle(ctx, bx, by, 7, opacity * 0.8, 'rgba(255, 255, 255, 0.7)', false);
      
      // Equilibrium dashed line
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx, cy + L);
      ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.35})`;
      ctx.setLineDash([4, 4]);
      ctx.stroke();
      ctx.restore();
    }
    if (prog > 0.7) {
      // Tension force
      const tx = bx - sinTheta * 22;
      const ty = by - cosTheta * 22;
      drawChalkArrow(ctx, bx, by, tx, ty, opacity, 1.5, CYAN);
      drawChalkText(ctx, 'T', tx - 10, ty - 5, opacity, LABEL_SIZE, CYAN);

      // Gravity force
      const gx = bx;
      const gy = by + 25;
      drawChalkArrow(ctx, bx, by, gx, gy, opacity, 1.5, PURPLE);
      drawChalkText(ctx, 'mg', gx + 4, gy + 22, opacity, LABEL_SIZE, PURPLE);
    }
  },
  // ==========================================
  // Optics Diagram (Snell's Law)
  // ==========================================
  optics: (ctx, x, y, graphWidth, graphHeight, formulaLabel, prog, opacity, globalTime, helpers) => {
    const { drawChalkLine, drawChalkText, drawChalkArrow, WHITE, CYAN, PURPLE } = helpers;
    const iy = y + 10;
    const { cx } = getCenter(x, y, graphWidth);

    // Physics: Snell's Law n1*sin(θ1) = n2*sin(θ2)
    const n1 = 1.0; // Air
    const n2 = 1.5; // Glass
    const theta1 = Math.PI / 4; // Incident angle
    const theta2 = Math.asin((n1 / n2) * Math.sin(theta1)); // Refracted angle

    const rayLength = graphWidth * 0.45;
    const rx1 = cx - Math.sin(theta1) * rayLength;
    const ry1 = iy - Math.cos(theta1) * rayLength;
    const rx2 = cx + Math.sin(theta2) * rayLength;
    const ry2 = iy + Math.cos(theta2) * rayLength;

    if (prog > 0.1) {
      drawChalkLine(ctx, [{ x: x, y: iy }, { x: x + graphWidth, y: iy }], opacity * 0.5, 1.5);
      
      // Normal line
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(cx, iy - graphHeight / 2);
      ctx.lineTo(cx, iy + graphHeight / 2);
      ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.35})`;
      ctx.setLineDash([4, 4]);
      ctx.stroke();
      ctx.restore();

      drawChalkText(ctx, `n₁=${n1.toFixed(1)}`, x + 8, iy - 14, opacity * 0.5, LABEL_SIZE);
      drawChalkText(ctx, `n₂=${n2.toFixed(1)}`, x + 8, iy + 14, opacity * 0.5, LABEL_SIZE);
    }

    if (prog > 0.4) {
      drawChalkArrow(ctx, rx1, ry1, cx, iy, opacity, 1.5, CYAN);
      drawChalkText(ctx, 'θ₁', cx - 18, iy - 16, opacity * 0.8, LABEL_SIZE, CYAN);
    }
    if (prog > 0.7) {
      drawChalkArrow(ctx, cx, iy, rx2, ry2, opacity, 1.5, PURPLE);
      drawChalkText(ctx, 'θ₂', cx + 10, iy + 16, opacity * 0.8, LABEL_SIZE, PURPLE);
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
    const nAir = 1.0;
    const nCyan = 1.52; // Shorter wavelength bends more
    const nPurple = 1.54; // Shortest wavelength bends most
    const angleOfIncidence = Math.PI / 4;
    
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
      drawCircle(ctx, midX, batY, 6, opacity, CYAN);
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
  },

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
  },
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
  },
  // ==========================================
  // Circuit Diagram
  // ==========================================
  circuit: (ctx, x, y, graphWidth, graphHeight, formulaLabel, prog, opacity, globalTime, helpers) => {
    const { drawChalkLine, drawChalkText, drawChalkArrow, WHITE, CYAN, PURPLE, drawParticle } = helpers;
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
      
      drawChalkText(ctx, 'AND Gate', cx - 20, cy - gh / 2 - 10, opacity * 0.8, LABEL_SIZE - 1, WHITE);
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
  },
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
  },
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
  },
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
