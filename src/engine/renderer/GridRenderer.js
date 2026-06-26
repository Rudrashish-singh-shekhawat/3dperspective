// src/engine/renderer/GridRenderer.js
import { project } from '../camera/CameraProjection';
import { qInv } from '../../math/quaternion/inverse';
import { rotateV } from '../../math/quaternion/rotateVector';
import { niceTick, fmtLabel } from '../../utils/formatter';

export class GridRenderer {
  draw(ctx, scale, panX, panY, currentQuat) {
    const major = niceTick(100, scale);
    const minor = major / 5;
    const w = ctx.canvas.width;
    const h = ctx.canvas.height;

    // World-space bounds
    const R = (Math.max(w, h) / scale) * 1.6;

    // Inverse quaternion to bring screen offset back to world
    const invQ = qInv(currentQuat);
    const centerArr = rotateV([-panX / scale, 0, panY / scale], invQ);
    const center = { x: centerArr[0], y: centerArr[1], z: centerArr[2] };

    // World grid extents
    const x0 = Math.floor((center.x - R) / minor) * minor;
    const x1 = Math.ceil((center.x + R) / minor) * minor;
    const y0 = Math.floor((center.y - R) / minor) * minor;
    const y1 = Math.ceil((center.y + R) / minor) * minor;

    const fadeR = Math.max(w, h) * 0.65;

    // Radial fade helper: original creates gradient centred at (-panX, -panY) on screen
    function radFade(innerCol, outerCol) {
      const g = ctx.createRadialGradient(-panX, -panY, 0, -panX, -panY, fadeR);
      g.addColorStop(0, innerCol);
      g.addColorStop(1, outerCol);
      return g;
    }

    ctx.lineWidth = 0.5;

    // Minor grid
    ctx.beginPath();
    for (let i = x0; i <= x1; i += minor) {
      if (Math.abs(i % major) < minor * 0.01) continue;
      const p1 = project(i, y0, 0, currentQuat);
      const p2 = project(i, y1, 0, currentQuat);
      ctx.moveTo(p1.x * scale, p1.y * scale);
      ctx.lineTo(p2.x * scale, p2.y * scale);
    }
    for (let j = y0; j <= y1; j += minor) {
      if (Math.abs(j % major) < minor * 0.01) continue;
      const p1 = project(x0, j, 0, currentQuat);
      const p2 = project(x1, j, 0, currentQuat);
      ctx.moveTo(p1.x * scale, p1.y * scale);
      ctx.lineTo(p2.x * scale, p2.y * scale);
    }
    ctx.strokeStyle = radFade('rgba(255,255,255,0.07)', 'rgba(255,255,255,0)');
    ctx.stroke();

    // Major grid
    ctx.beginPath();
    for (let i = x0; i <= x1; i += major) {
      if (Math.abs(i) < major * 0.01) continue;
      const p1 = project(i, y0, 0, currentQuat);
      const p2 = project(i, y1, 0, currentQuat);
      ctx.moveTo(p1.x * scale, p1.y * scale);
      ctx.lineTo(p2.x * scale, p2.y * scale);
    }
    for (let j = y0; j <= y1; j += major) {
      if (Math.abs(j) < major * 0.01) continue;
      const p1 = project(x0, j, 0, currentQuat);
      const p2 = project(x1, j, 0, currentQuat);
      ctx.moveTo(p1.x * scale, p1.y * scale);
      ctx.lineTo(p2.x * scale, p2.y * scale);
    }
    ctx.strokeStyle = radFade('rgba(255,255,255,0.12)', 'rgba(255,255,255,0)');
    ctx.stroke();

    // Axes
    ctx.lineWidth = 1;
    // X axis (red)
    ctx.beginPath();
    const xA1 = project(x0, 0, 0, currentQuat);
    const xA2 = project(x1, 0, 0, currentQuat);
    ctx.moveTo(xA1.x * scale, xA1.y * scale);
    ctx.lineTo(xA2.x * scale, xA2.y * scale);
    ctx.strokeStyle = radFade('rgba(244,124,90,0.5)', 'rgba(244,124,90,0)');
    ctx.stroke();
    // Y axis (green) - world Y is away, so project with y varying
    ctx.beginPath();
    const yA1 = project(0, y0, 0, currentQuat);
    const yA2 = project(0, y1, 0, currentQuat);
    ctx.moveTo(yA1.x * scale, yA1.y * scale);
    ctx.lineTo(yA2.x * scale, yA2.y * scale);
    ctx.strokeStyle = radFade('rgba(62,207,142,0.5)', 'rgba(62,207,142,0)');
    ctx.stroke();
    // Z axis (blue) - world Z is up, so project with z varying (use z0, z1 from y range)
    ctx.beginPath();
    const zA1 = project(0, 0, y0, currentQuat);
    const zA2 = project(0, 0, y1, currentQuat);
    ctx.moveTo(zA1.x * scale, zA1.y * scale);
    ctx.lineTo(zA2.x * scale, zA2.y * scale);
    ctx.strokeStyle = radFade('rgba(77,159,255,0.5)', 'rgba(77,159,255,0)');
    ctx.stroke();

    // Axis labels (world X and Y only)
    ctx.font = '10px JetBrains Mono, monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    const labelStep = major;
    // X labels
    for (let i = Math.ceil(x0 / labelStep) * labelStep; i <= x1; i += labelStep) {
      if (Math.abs(i) < labelStep * 0.01) continue;
      const sp = project(i, 0, 0, currentQuat);
      const sx = sp.x * scale;
      const sy = sp.y * scale;
      const dist = Math.hypot(sx + panX, sy + panY);
      if (dist > fadeR * 0.9) continue;
      const alpha = Math.max(0, 1 - dist / (fadeR * 0.8)) * 0.55;
      ctx.fillStyle = `rgba(244,124,90,${alpha})`;
      ctx.fillText(fmtLabel(i), sx, sy + 13);
    }
    // Y (world Y) labels
    for (let j = Math.ceil(y0 / labelStep) * labelStep; j <= y1; j += labelStep) {
      if (Math.abs(j) < labelStep * 0.01) continue;
      const sp = project(0, j, 0, currentQuat);
      const sx = sp.x * scale;
      const sy = sp.y * scale;
      const dist = Math.hypot(sx + panX, sy + panY);
      if (dist > fadeR * 0.9) continue;
      const alpha = Math.max(0, 1 - dist / (fadeR * 0.8)) * 0.55;
      ctx.fillStyle = `rgba(62,207,142,${alpha})`;
      ctx.fillText(fmtLabel(j), sx - 16, sy);
    }
  }
}