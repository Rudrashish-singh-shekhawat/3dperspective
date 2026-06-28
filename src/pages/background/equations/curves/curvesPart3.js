export const curvesPart3 = {
  // Category: Calculus
  limitApproaching: {
    formulaLabel: 'Limit: lim(x→a) f(x) = L',
    graph: (u, t, w, h, cx, cy) => {
      const px = cx + u * w;
      let py = cy - Math.sin(u * Math.PI) * h * 0.3;
      if (u > 0.48 && u < 0.52) {
        // Leave a visual gap for the limit hole
        return { x: px, y: cy - h * 0.3 + 12 * Math.sin(t) };
      }
      return { x: px, y: py };
    }
  },
  derivativeTangent: {
    formulaLabel: "Derivative: f'(x) = dy/dx (Tangent)",
    graph: (u, t, w, h, cx, cy) => {
      const px = cx + u * w;
      const py = cy - Math.sin(u * Math.PI * 1.5) * h * 0.3;
      return { x: px, y: py };
    }
  },
  differentiation: {
    formulaLabel: 'Differentiation: d/dx(xⁿ) = n·xⁿ⁻¹',
    graph: (u, t, w, h, cx, cy) => {
      const px = cx + u * w;
      const py = cy + h * 0.2 - (u * u) * h * 0.55;
      return { x: px, y: py };
    }
  },
  integrationArea: {
    formulaLabel: 'Integration: Area under curve ∫ f(x)dx',
    graph: (u, t, w, h, cx, cy) => {
      if (u < 0.5) {
        const su = u / 0.5;
        const px = cx + su * w;
        return { x: px, y: cy - (Math.sin(su * Math.PI) * 0.35 + 0.1) * h };
      } else {
        const su = (u - 0.5) / 0.5;
        return { x: cx + (1 - su) * w, y: cy };
      }
    }
  },
  definiteIntegral: {
    formulaLabel: 'Definite Integral: Area from a to b',
    graph: (u, t, w, h, cx, cy) => {
      const px = cx + u * w;
      return { x: px, y: cy - (Math.sin(u * Math.PI) * 0.3 + 0.2) * h };
    }
  },
  indefiniteIntegral: {
    formulaLabel: 'Indefinite Integral: F(x) + C',
    graph: (u, t, w, h, cx, cy) => {
      if (u < 0.33) {
        const su = u / 0.33;
        return { x: cx + su * w, y: cy - 16 - Math.sin(su * Math.PI) * h * 0.22 };
      } else if (u < 0.66) {
        const su = (u - 0.33) / 0.33;
        return { x: cx + su * w, y: cy - Math.sin(su * Math.PI) * h * 0.22 };
      } else {
        const su = (u - 0.66) / 0.34;
        return { x: cx + su * w, y: cy + 16 - Math.sin(su * Math.PI) * h * 0.22 };
      }
    }
  },
  differentialEquation: {
    formulaLabel: 'Differential Eq: dy/dx = f(x, y)',
    graph: (u, t, w, h, cx, cy) => {
      const ox = cx + w / 2;
      const rows = 4, cols = 4;
      const total = rows * cols;
      const idx = Math.floor(u * total);
      const segmentU = (u * total) - idx;
      const r = Math.floor(idx / cols);
      const c = idx % cols;
      const cellX = cx + (c + 0.5) * (w / cols);
      const cellY = cy - h / 2 + (r + 0.5) * (h / rows);
      const dx = cellX - ox;
      const dy = cellY - cy;
      const eps = 1e-6;
      const slope = -dx / (Math.abs(dy) < eps ? eps : dy);
      const angle = Math.atan(slope) + Math.sin(t * 0.1) * 0.3;
      const len = 10;
      return {
        x: cellX + len * Math.cos(angle) * (segmentU - 0.5),
        y: cellY + len * Math.sin(angle) * (segmentU - 0.5)
      };
    }
  },
  partialDiffEq: {
    formulaLabel: 'Wave PDE: ∂²u/∂t² = c² ∂²u/∂x²',
    graph: (u, t, w, h, cx, cy) => {
      const steps = 6;
      const idx = Math.floor(u * steps);
      const su = (u * steps) - idx;
      const gridX = su;
      const gridY = idx / (steps - 1);
      const waveX = cx + gridX * w;
      const waveZ = Math.sin(gridX * Math.PI * 2 + t * 0.1) * Math.cos(gridY * Math.PI) * h * 0.24;
      const waveY = cy + (gridY - 0.5) * h * 0.42 - waveZ;
      return { x: waveX, y: waveY };
    }
  },
  gradient: {
    formulaLabel: 'Gradient: ∇f = (∂f/∂x)i + (∂f/∂y)j',
    graph: (u, t, w, h, cx, cy) => {
      const ox = cx + w / 2;
      const rings = 4;
      const idx = Math.floor(u * rings);
      const su = (u * rings) - idx;
      const rX = w * 0.11 * (idx + 1);
      const rY = h * 0.08 * (idx + 1);
      const angle = su * Math.PI * 2;
      return { x: ox + rX * Math.cos(angle), y: cy + rY * Math.sin(angle) };
    }
  },
  divergence: {
    formulaLabel: 'Divergence: ∇·F = div F',
    graph: (u, t, w, h, cx, cy) => {
      const ox = cx + w / 2;
      const rays = 8;
      const idx = Math.floor(u * rays);
      const su = (u * rays) - idx;
      const angle = (idx / rays) * Math.PI * 2;
      const r = su * h * 0.42 * (1 + 0.15 * Math.sin(t * 0.08));
      return { x: ox + r * Math.cos(angle), y: cy + r * Math.sin(angle) };
    }
  },
  curl: {
    formulaLabel: 'Curl: ∇ × F = curl F',
    graph: (u, t, w, h, cx, cy) => {
      const ox = cx + w / 2;
      const spirals = 4;
      const idx = Math.floor(u * spirals);
      const su = (u * spirals) - idx;
      const baseAngle = (idx / spirals) * Math.PI * 2;
      const angle = baseAngle + su * Math.PI * 1.6 + t * 0.05;
      const r = su * h * 0.42;
      return { x: ox + r * Math.cos(angle), y: cy + r * Math.sin(angle) };
    }
  },
  vectorField: {
    formulaLabel: 'Vector Field: F(x, y) = P i + Q j',
    graph: (u, t, w, h, cx, cy) => {
      const ox = cx + w / 2;
      const count = 9;
      const idx = Math.floor(u * count);
      const su = (u * count) - idx;
      const r = Math.floor(idx / 3);
      const c = idx % 3;
      const cellX = cx + (c + 0.5) * (w / 3);
      const cellY = cy - h / 2 + (r + 0.5) * (h / 3);
      const vx = -(cellY - cy) * 0.18 * Math.cos(t * 0.05);
      const vy = (cellX - ox) * 0.18 * Math.sin(t * 0.05);
      return { x: cellX + vx * (su - 0.5), y: cellY + vy * (su - 0.5) };
    }
  }
};
