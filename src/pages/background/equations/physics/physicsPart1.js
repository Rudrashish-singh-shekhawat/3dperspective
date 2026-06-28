import { LABEL_SIZE, getCenter, drawCircle } from './physicsHelpers';

export const physicsPart1 = {
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
    const { drawChalkLine, drawChalkText, drawChalkArrow, CYAN, PURPLE } = helpers;
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
  }
};
