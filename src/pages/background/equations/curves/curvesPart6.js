export const curvesPart6 = {
  // Category: Complex Numbers
  imaginaryAxis: {
    formulaLabel: 'Imaginary: z = x + iy with i² = -1',
    graph: (u, t, w, h, cx, cy) => {
      const ox = cx + w / 2;
      if (u < 0.5) {
        return { x: ox - w / 2 + u * 2 * w, y: cy };
      } else {
        return { x: ox, y: cy - h / 2 + (u - 0.5) * 2 * h };
      }
    }
  },
  complexPlaneComplex: {
    formulaLabel: 'Complex Plane: ℂ coordinates',
    graph: (u, t, w, h, cx, cy) => {
      const ox = cx + w / 2;
      if (u < 0.7) {
        const su = u / 0.7;
        return { x: ox - w / 3 + su * w * 0.6, y: cy };
      } else {
        const su = (u - 0.7) / 0.3;
        return { x: ox + su * w * 0.25, y: cy - su * h * 0.3 };
      }
    }
  },
  polarForm: {
    formulaLabel: 'Polar Form: z = r e^(iθ) complex vector',
    graph: (u, t, w, h, cx, cy) => {
      const ox = cx + w / 2;
      const angle = Math.PI / 4;
      const r = h * 0.42;
      if (u < 0.7) {
        return { x: ox + (u / 0.7) * r * Math.cos(angle), y: cy - (u / 0.7) * r * Math.sin(angle) };
      } else {
        const su = (u - 0.7) / 0.3;
        return { x: ox + 18 * Math.cos(su * angle), y: cy - 18 * Math.sin(su * angle) };
      }
    }
  },
  eulerRepresentation: {
    formulaLabel: 'Euler Representation: z = r e^(iθ)',
    graph: (u, t, w, h, cx, cy) => {
      const ox = cx + w / 2;
      const angle = u * Math.PI * 6.5;
      const r = u * h * 0.42;
      return { x: ox + r * Math.cos(angle), y: cy - r * Math.sin(angle) };
    }
  },
  rootsOfUnity: {
    formulaLabel: 'Roots of Unity: zⁿ = 1 discrete angles',
    graph: (u, t, w, h, cx, cy) => {
      const ox = cx + w / 2;
      const angle = u * Math.PI * 2;
      const r = h * 0.42;
      return { x: ox + r * Math.cos(angle), y: cy + r * Math.sin(angle) };
    }
  },
  argandDiagram: {
    formulaLabel: 'Argand Diagram z = x + iy component projections',
    graph: (u, t, w, h, cx, cy) => {
      const ox = cx + w / 2;
      const rx = w * 0.32;
      const ry = h * 0.36;
      const px = ox + rx;
      const py = cy - ry;
      if (u < 0.4) {
        return { x: ox + (u / 0.4) * rx, y: cy - (u / 0.4) * ry };
      } else if (u < 0.7) {
        const su = (u - 0.4) / 0.3;
        return { x: px, y: py + su * ry };
      } else {
        const su = (u - 0.7) / 0.3;
        return { x: px - su * rx, y: py };
      }
    }
  },
  // Category: Probability & Statistics
  bellCurve: {
    formulaLabel: 'Bell Curve (Normal distribution shape)',
    graph: (u, t, w, h, cx, cy) => {
      const nx = (u - 0.5) * 5;
      return { x: cx + u * w, y: cy - Math.exp(-nx * nx / 2) * h * 0.45 };
    }
  },
  gaussianDistribution: {
    formulaLabel: 'Gaussian distribution probability density',
    graph: (u, t, w, h, cx, cy) => {
      const nx = (u - 0.5) * 6;
      return { x: cx + u * w, y: cy - Math.exp(-nx * nx / 3.5) * h * 0.48 };
    }
  },
  histogram: {
    formulaLabel: 'Histogram: discrete bin frequencies',
    graph: (u, t, w, h, cx, cy) => {
      const bars = 6;
      const barW = w * 0.85 / bars;
      const heights = [0.22, 0.45, 0.78, 0.62, 0.38, 0.18];
      const idx = Math.min(bars - 1, Math.floor(u * bars));
      const su = (u * bars) - idx;
      const bx = cx + w * 0.08 + idx * barW;
      const by = cy + h * 0.35;
      const bh = heights[idx] * h * 0.65;
      if (su < 0.25) {
        return { x: bx, y: by - (su / 0.25) * bh };
      } else if (su < 0.75) {
        return { x: bx + (su - 0.25) / 0.5 * barW, y: by - bh };
      } else {
        return { x: bx + barW, y: by - bh + (su - 0.75) / 0.25 * bh };
      }
    }
  },
  scatterPlot: {
    formulaLabel: 'Scatter Plot with Linear Regression line',
    graph: (u, t, w, h, cx, cy) => {
      if (u < 0.5) {
        const su = u / 0.5;
        return { x: cx + su * w, y: cy + h * 0.25 - su * h * 0.55 };
      } else {
        const pts = [
          { x: 0.12, y: 0.22 }, { x: 0.26, y: 0.14 }, { x: 0.38, y: -0.08 },
          { x: 0.55, y: -0.06 }, { x: 0.72, y: -0.25 }, { x: 0.86, y: -0.34 }
        ];
        const su = (u - 0.5) / 0.5;
        const idx = Math.floor(su * pts.length);
        const p = pts[idx % pts.length];
        const rx = cx + p.x * w;
        const ry = cy + p.y * h;
        const circleU = (su * pts.length) - idx;
        return { x: rx + 2 * Math.cos(circleU * Math.PI * 2), y: ry + 2 * Math.sin(circleU * Math.PI * 2) };
      }
    }
  },
  boxPlot: {
    formulaLabel: 'Box Plot: min, Q1, median, Q3, max',
    graph: (u, t, w, h, cx, cy) => {
      const ox = cx + w / 2;
      const q1 = ox - w * 0.2;
      const q2 = ox;
      const q3 = ox + w * 0.2;
      const minVal = ox - w * 0.4;
      const maxVal = ox + w * 0.4;
      if (u < 0.2) {
        return { x: q1 + (u / 0.2) * (q3 - q1), y: cy - 14 };
      } else if (u < 0.4) {
        return { x: q1 + ((u - 0.2) / 0.2) * (q3 - q1), y: cy + 14 };
      } else if (u < 0.5) {
        return { x: q2, y: cy - 14 + ((u - 0.4) / 0.1) * 28 };
      } else if (u < 0.6) {
        return { x: minVal + ((u - 0.5) / 0.1) * (q1 - minVal), y: cy };
      } else if (u < 0.7) {
        return { x: q3 + ((u - 0.6) / 0.1) * (maxVal - q3), y: cy };
      } else {
        return { x: minVal, y: cy - 6 + ((u - 0.7) / 0.3) * 12 };
      }
    }
  },
  probabilityTree: {
    formulaLabel: 'Probability Tree branching pathways',
    graph: (u, t, w, h, cx, cy) => {
      const ox = cx + w / 4;
      if (u < 0.33) {
        return { x: ox + (u / 0.33) * w * 0.25, y: cy + (u / 0.33) * h * 0.25 };
      } else if (u < 0.66) {
        return { x: ox + (u - 0.33) / 0.33 * w * 0.25, y: cy - (u - 0.33) / 0.33 * h * 0.25 };
      } else {
        return { x: ox + w * 0.25 + (u - 0.66) / 0.34 * w * 0.2, y: cy - h * 0.25 - (u - 0.66) / 0.34 * h * 0.15 };
      }
    }
  },
  binomialDistribution: {
    formulaLabel: 'Binomial distribution stem probabilities',
    graph: (u, t, w, h, cx, cy) => {
      const count = 7;
      const heights = [0.06, 0.2, 0.48, 0.72, 0.5, 0.24, 0.09];
      const idx = Math.min(count - 1, Math.floor(u * count));
      const su = (u * count) - idx;
      const bx = cx + w * 0.1 + idx * (w * 0.8 / count);
      const by = cy + h * 0.35;
      const bh = heights[idx] * h * 0.65;
      return { x: bx, y: by - su * bh };
    }
  },
  normalDistribution: {
    formulaLabel: 'Normal Distribution confidence bands',
    graph: (u, t, w, h, cx, cy) => {
      const nx = (u - 0.5) * 5;
      return { x: cx + u * w, y: cy - Math.exp(-nx * nx / 2) * h * 0.45 };
    }
  }
};
