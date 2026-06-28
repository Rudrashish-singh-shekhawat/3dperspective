export const curvesPart5 = {
  // Category: Trigonometry
  unitCircle: {
    formulaLabel: 'Unit Circle: cos²(θ) + sin²(θ) = 1',
    graph: (u, t, w, h, cx, cy) => {
      const ox = cx + w / 2;
      const angle = u * Math.PI * 2;
      const r = h * 0.42;
      return { x: ox + r * Math.cos(angle), y: cy + r * Math.sin(angle) };
    }
  },
  trigRatios: {
    formulaLabel: 'Trig Ratios: sinθ = O/H, cosθ = A/H',
    graph: (u, t, w, h, cx, cy) => {
      const ox = cx + w / 2 - 20;
      const x1 = ox, y1 = cy + h * 0.25;
      const x2 = ox + w * 0.5, y2 = cy + h * 0.25;
      const x3 = ox, y3 = cy - h * 0.35;
      if (u < 0.33) {
        return { x: x1 + (x2 - x1) * (u / 0.33), y: y1 };
      } else if (u < 0.66) {
        const su = (u - 0.33) / 0.33;
        return { x: x2 + (x3 - x2) * su, y: y1 + (y3 - y1) * su };
      } else {
        const su = (u - 0.66) / 0.34;
        return { x: x3, y: y3 + (y1 - y3) * su };
      }
    }
  },
  eulerFormula: {
    formulaLabel: 'Euler: e^(iθ) = cos θ + i sin θ',
    graph: (u, t, w, h, cx, cy) => {
      const ox = cx + w / 2;
      if (u < 0.75) {
        const angle = (u / 0.75) * Math.PI * 2;
        return { x: ox + h * 0.4 * Math.cos(angle), y: cy + h * 0.4 * Math.sin(angle) };
      } else {
        const angle = t * 1.5;
        const su = (u - 0.75) / 0.25;
        return { x: ox + su * h * 0.4 * Math.cos(angle), y: cy + su * h * 0.4 * Math.sin(angle) };
      }
    }
  },
  eulerIdentity: {
    formulaLabel: 'Euler Identity: e^(iπ) + 1 = 0',
    graph: (u, t, w, h, cx, cy) => {
      const ox = cx + w / 2;
      if (u < 0.8) {
        const angle = (u / 0.8) * Math.PI * 2;
        return { x: ox + h * 0.4 * Math.cos(angle), y: cy + h * 0.4 * Math.sin(angle) };
      } else {
        const su = (u - 0.8) / 0.2;
        return { x: ox - su * h * 0.4, y: cy };
      }
    }
  },
  complexPlane: {
    formulaLabel: 'Complex Plane: Real & Imaginary axes',
    graph: (u, t, w, h, cx, cy) => {
      const ox = cx + w / 2;
      if (u < 0.5) {
        return { x: ox - w / 2 + u * 2 * w, y: cy };
      } else {
        return { x: ox, y: cy - h / 2 + (u - 0.5) * 2 * h };
      }
    }
  },
  phasorDiagram: {
    formulaLabel: 'Phasor: V(t) = V₀ e^(i(ωt + φ))',
    graph: (u, t, w, h, cx, cy) => {
      const ox = cx + w / 2;
      const angle = t * 1.8;
      return { x: ox + u * h * 0.42 * Math.cos(angle), y: cy - u * h * 0.42 * Math.sin(angle) };
    }
  },
  fourierSeriesMath: {
    formulaLabel: 'Fourier: f(t) = a₀/2 + Σ a_n cos(nωt)',
    graph: (u, t, w, h, cx, cy) => {
      const ox = cx + w / 3;
      const R1 = h * 0.25;
      const p1 = { x: ox + R1 * Math.cos(t), y: cy + R1 * Math.sin(t) };
      const p2 = { x: p1.x + (R1 / 3) * Math.cos(3 * t), y: p1.y + (R1 / 3) * Math.sin(3 * t) };
      if (u < 0.5) {
        return { x: ox + u * 2 * (p1.x - ox), y: cy + u * 2 * (p1.y - cy) };
      } else {
        return { x: p1.x + (u - 0.5) * 2 * (p2.x - p1.x), y: p1.y + (u - 0.5) * 2 * (p2.y - p1.y) };
      }
    }
  },
  fourierTransform: {
    formulaLabel: 'Fourier Transform: Spectrum Analysis',
    graph: (u, t, w, h, cx, cy) => {
      const ox = cx + w / 2;
      if (u < 0.5) {
        const su = u / 0.5;
        return { x: cx + su * w * 0.45, y: cy - 16 - (Math.sin(su * Math.PI * 4) + Math.sin(su * Math.PI * 8)) * h * 0.1 };
      } else {
        const su = (u - 0.5) / 0.5;
        let py = cy + 20;
        const peak1 = Math.max(0, 1 - Math.abs(su - 0.3) * 20);
        const peak2 = Math.max(0, 1 - Math.abs(su - 0.7) * 20);
        py -= (peak1 * h * 0.3 + peak2 * h * 0.2);
        return { x: ox + 10 + su * w * 0.4, y: py };
      }
    }
  },
  taylorSeries: {
    formulaLabel: 'Taylor Series approximation expansion',
    graph: (u, t, w, h, cx, cy) => {
      if (u < 0.5) {
        const su = u / 0.5;
        return { x: cx + su * w, y: cy - Math.exp((su - 0.5) * 2) * h * 0.15 };
      } else {
        const su = (u - 0.5) / 0.5;
        const nx = (su - 0.5) * 2;
        const approx = 1 + nx + (nx * nx) / 2 + (nx * nx * nx) / 6;
        const clampedApprox = Math.max(-10, Math.min(10, approx));
        return { x: cx + su * w, y: cy - clampedApprox * h * 0.15 };
      }
    }
  },
  maclaurinSeries: {
    formulaLabel: 'Maclaurin expansion centered at 0',
    graph: (u, t, w, h, cx, cy) => {
      if (u < 0.5) {
        const su = u / 0.5;
        return { x: cx + su * w, y: cy - Math.cos((su - 0.5) * Math.PI * 2) * h * 0.28 };
      } else {
        const su = (u - 0.5) / 0.5;
        const nx = (su - 0.5) * Math.PI * 2;
        const approx = 1 - (nx * nx) / 2 + (nx * nx * nx * nx) / 24;
        const clampedApprox = Math.max(-10, Math.min(10, approx));
        return { x: cx + su * w, y: cy - clampedApprox * h * 0.28 };
      }
    }
  },
  // Category: Linear Algebra
  matrix: {
    formulaLabel: 'Matrix grid array dimension indices',
    graph: (u, t, w, h, cx, cy) => {
      const ox = cx + w / 2;
      const bw = w * 0.42;
      const bh = h * 0.6;
      if (u < 0.25) {
        return { x: ox - bw / 2 + 6, y: cy - bh / 2 + (u / 0.25) * bh };
      } else if (u < 0.5) {
        return { x: ox + bw / 2 - 6, y: cy - bh / 2 + ((u - 0.25) / 0.25) * bh };
      } else {
        const idx = Math.floor((u - 0.5) / 0.5 * 4);
        const r = Math.floor(idx / 2);
        const c = idx % 2;
        return { x: ox - bw / 4 + c * bw / 2, y: cy - bh / 4 + r * bh / 2 };
      }
    }
  },
  matrixMultiplication: {
    formulaLabel: 'Matrix Product: row × column dots',
    graph: (u, t, w, h, cx, cy) => {
      const ox = cx + w / 2;
      if (u < 0.3) {
        return { x: ox - w * 0.42 + (u / 0.3) * w * 0.3, y: cy - 12 };
      } else if (u < 0.6) {
        return { x: ox + w * 0.2, y: cy - h * 0.3 + ((u - 0.3) / 0.3) * h * 0.6 };
      } else {
        return { x: ox + w * 0.35, y: cy };
      }
    }
  },
  eigenvectors: {
    formulaLabel: 'Eigenvector A v = λ v',
    graph: (u, t, w, h, cx, cy) => {
      const ox = cx + w / 2;
      if (u < 0.5) {
        const su = u / 0.5;
        return { x: ox + su * w * 0.3, y: cy - su * h * 0.3 };
      } else {
        const su = (u - 0.5) / 0.5;
        return { x: ox + su * w * 0.44, y: cy - su * h * 0.44 };
      }
    }
  },
  eigenvalues: {
    formulaLabel: 'Eigenvalue characteristic equation',
    graph: (u, t, w, h, cx, cy) => {
      const ox = cx + w / 2;
      if (u < 0.5) {
        const su = u / 0.5;
        return { x: ox - w * 0.35 + su * w * 0.7, y: cy };
      } else {
        const su = (u - 0.5) / 0.5;
        return { x: ox - w * 0.35 + su * w * 0.7, y: cy - su * h * 0.3 };
      }
    }
  },
  determinant: {
    formulaLabel: 'Determinant: det(A) (Area Scale)',
    graph: (u, t, w, h, cx, cy) => {
      const ox = cx + w / 2;
      const v1 = { x: w * 0.35, y: -h * 0.12 };
      const v2 = { x: w * 0.12, y: -h * 0.42 };
      if (u < 0.25) {
        return { x: ox + (u / 0.25) * v1.x, y: cy + (u / 0.25) * v1.y };
      } else if (u < 0.5) {
        return { x: ox + v1.x + ((u - 0.25) / 0.25) * v2.x, y: cy + v1.y + ((u - 0.25) / 0.25) * v2.y };
      } else if (u < 0.75) {
        return { x: ox + v1.x + v2.x - ((u - 0.5) / 0.25) * v1.x, y: cy + v1.y + v2.y - ((u - 0.5) / 0.25) * v1.y };
      } else {
        return { x: ox + v2.x - ((u - 0.75) / 0.25) * v2.x, y: cy + v2.y - ((u - 0.75) / 0.25) * v2.y };
      }
    }
  },
  vectorProjection: {
    formulaLabel: 'Projection: proj_b(a) projection vector',
    graph: (u, t, w, h, cx, cy) => {
      const ox = cx + w / 2;
      const a = { x: w * 0.32, y: -h * 0.44 };
      const b = { x: w * 0.44, y: -h * 0.12 };
      const dot = (a.x * b.x + a.y * b.y) / (b.x * b.x + b.y * b.y);
      const proj = { x: b.x * dot, y: b.y * dot };
      if (u < 0.33) {
        return { x: ox + (u / 0.33) * a.x, y: cy + (u / 0.33) * a.y };
      } else if (u < 0.66) {
        return { x: ox + (u - 0.33) / 0.33 * b.x, y: cy + (u - 0.33) / 0.33 * b.y };
      } else {
        const su = (u - 0.66) / 0.34;
        return { x: ox + a.x + (proj.x - a.x) * su, y: cy + a.y + (proj.y - a.y) * su };
      }
    }
  },
  dotProduct: {
    formulaLabel: 'Dot Product: a · b = |a||b| cosθ',
    graph: (u, t, w, h, cx, cy) => {
      const ox = cx + w / 2;
      const v1 = { x: w * 0.32, y: -h * 0.32 };
      const v2 = { x: w * 0.42, y: 0 };
      if (u < 0.5) {
        return { x: ox + (u / 0.5) * v1.x, y: cy + (u / 0.5) * v1.y };
      } else {
        return { x: ox + ((u - 0.5) / 0.5) * v2.x, y: cy };
      }
    }
  },
  crossProduct: {
    formulaLabel: 'Cross Product: a × b = |a||b| sinθ n',
    graph: (u, t, w, h, cx, cy) => {
      const ox = cx + w / 2;
      const a = { x: w * 0.26, y: h * 0.16 };
      const b = { x: w * 0.36, y: -h * 0.06 };
      const cross = { x: 0, y: -h * 0.44 };
      if (u < 0.33) {
        return { x: ox + (u / 0.33) * a.x, y: cy + (u / 0.33) * a.y };
      } else if (u < 0.66) {
        return { x: ox + (u - 0.33) / 0.33 * b.x, y: cy + (u - 0.33) / 0.33 * b.y };
      } else {
        return { x: ox + (u - 0.66) / 0.34 * cross.x, y: cy + (u - 0.66) / 0.34 * cross.y };
      }
    }
  },
  basisVectors: {
    formulaLabel: 'Basis: standard unit vectors i & j',
    graph: (u, t, w, h, cx, cy) => {
      const ox = cx + w / 2;
      if (u < 0.5) {
        return { x: ox + (u / 0.5) * w * 0.28, y: cy };
      } else {
        return { x: ox, y: cy - ((u - 0.5) / 0.5) * h * 0.28 };
      }
    }
  },
  coordinateTransformation: {
    formulaLabel: 'Transformation coordinate rotation matrix',
    graph: (u, t, w, h, cx, cy) => {
      const ox = cx + w / 2;
      const angle = Math.PI / 6;
      if (u < 0.5) {
        const su = u / 0.5;
        const rx = (su - 0.5) * w * 0.8;
        return { x: ox + rx * Math.cos(angle), y: cy + rx * Math.sin(angle) };
      } else {
        const su = (u - 0.5) / 0.5;
        const ry = (su - 0.5) * h * 0.8;
        return { x: ox - ry * Math.sin(angle), y: cy + ry * Math.cos(angle) };
      }
    }
  }
};
