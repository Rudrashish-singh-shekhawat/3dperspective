export const curvesPart2 = {
  // Category: Coordinate Geometry
  cartesianPlane: {
    formulaLabel: 'Cartesian Plane: (x, y) ∈ ℝ²',
    graph: (u, t, w, h, cx, cy) => {
      const ox = cx + w / 2;
      if (u < 0.5) {
        return { x: ox - w / 2 + u * 2 * w, y: cy };
      } else {
        return { x: ox, y: cy - h / 2 + (u - 0.5) * 2 * h };
      }
    }
  },
  straightLine: {
    formulaLabel: 'Straight Line: y = m x + c',
    graph: (u, t, w, h, cx, cy) => {
      return { x: cx + u * w, y: cy + h * 0.25 - u * h * 0.5 };
    }
  },
  parallelLines: {
    formulaLabel: 'Parallel Lines: L₁ || L₂ => m₁ = m₂',
    graph: (u, t, w, h, cx, cy) => {
      const ox = cx + w / 2;
      if (u < 0.5) {
        const su = u / 0.5;
        return { x: ox - w / 2 + su * w, y: cy - 12 - (su - 0.5) * h * 0.4 };
      } else {
        const su = (u - 0.5) / 0.5;
        return { x: ox - w / 2 + su * w, y: cy + 12 - (su - 0.5) * h * 0.4 };
      }
    }
  },
  perpendicularLines: {
    formulaLabel: 'Perpendicular: L₁ ⊥ L₂ => m₁m₂ = -1',
    graph: (u, t, w, h, cx, cy) => {
      const ox = cx + w / 2;
      if (u < 0.5) {
        const su = u / 0.5;
        return { x: ox - w / 2 + su * w, y: cy - (su - 0.5) * h * 0.3 };
      } else {
        const su = (u - 0.5) / 0.5;
        return { x: ox - h * 0.3 * (su - 0.5), y: cy - w / 2 + su * w };
      }
    }
  },
  distanceFormula: {
    formulaLabel: 'Distance: d = √((Δx)² + (Δy)²)',
    graph: (u, t, w, h, cx, cy) => {
      const ox = cx + w / 2;
      const x1 = ox - w * 0.28, y1 = cy + h * 0.25;
      const x2 = ox + w * 0.28, y2 = cy - h * 0.25;
      if (u < 0.5) {
        const su = u / 0.5;
        return { x: x1 + (x2 - x1) * su, y: y1 + (y2 - y1) * su };
      } else if (u < 0.75) {
        const su = (u - 0.5) / 0.25;
        return { x: x1 + (x2 - x1) * su, y: y1 };
      } else {
        const su = (u - 0.75) / 0.25;
        return { x: x2, y: y1 + (y2 - y1) * su };
      }
    }
  },
  midpointFormula: {
    formulaLabel: 'Midpoint M = ((x₁+x₂)/2, (y₁+y₂)/2)',
    graph: (u, t, w, h, cx, cy) => {
      const ox = cx + w / 2;
      const x1 = ox - w * 0.35, y1 = cy + h * 0.2;
      const x2 = ox + w * 0.35, y2 = cy - h * 0.2;
      if (u < 0.9) {
        const su = u / 0.9;
        return { x: x1 + (x2 - x1) * su, y: y1 + (y2 - y1) * su };
      } else {
        const mx = (x1 + x2) / 2;
        const my = (y1 + y2) / 2;
        const angle = ((u - 0.9) / 0.1) * Math.PI * 2;
        return { x: mx + 3.5 * Math.cos(angle), y: my + 3.5 * Math.sin(angle) };
      }
    }
  },
  circle: {
    formulaLabel: 'Circle: (x-h)² + (y-k)² = r²',
    graph: (u, t, w, h, cx, cy) => {
      const ox = cx + w / 2;
      const angle = u * Math.PI * 2;
      const r = h * 0.42;
      return { x: ox + r * Math.cos(angle), y: cy + r * Math.sin(angle) };
    }
  },
  ellipseMath: {
    formulaLabel: 'Ellipse: x²/a² + y²/b² = 1',
    graph: (u, t, w, h, cx, cy) => {
      const ox = cx + w / 2;
      const angle = u * Math.PI * 2;
      return { x: ox + w * 0.42 * Math.cos(angle), y: cy + h * 0.3 * Math.sin(angle) };
    }
  },
  hyperbolaMath: {
    formulaLabel: 'Hyperbola: x²/a² - y²/b² = 1',
    graph: (u, t, w, h, cx, cy) => {
      const ox = cx + w / 2;
      if (u < 0.5) {
        const su = u / 0.5;
        const lt = (su - 0.5) * 2.8;
        return { x: ox - Math.cosh(lt) * w * 0.15, y: cy + Math.sinh(lt) * h * 0.3 };
      } else {
        const su = (u - 0.5) / 0.5;
        const lt = (su - 0.5) * 2.8;
        return { x: ox + Math.cosh(lt) * w * 0.15, y: cy + Math.sinh(lt) * h * 0.3 };
      }
    }
  },
  parabolaMath: {
    formulaLabel: 'Parabola: y² = 4ax',
    graph: (u, t, w, h, cx, cy) => {
      const lt = (u - 0.5) * 2;
      return { x: cx + w / 2 + (lt * lt) * w * 0.45 - 15, y: cy + lt * h * 0.4 };
    }
  },
  conicSections: {
    formulaLabel: 'Conic Sections: Ellipse, Parabola, Hyperbola',
    graph: (u, t, w, h, cx, cy) => {
      const ox = cx + w / 2;
      if (u < 0.5) {
        const su = u / 0.5;
        const rx = w * 0.28 * (1 - su);
        const ry = cy - h * 0.45 + su * h * 0.45;
        return { x: ox + rx * Math.cos(t * 3), y: ry };
      } else {
        const su = (u - 0.5) / 0.5;
        const rx = w * 0.28 * su;
        const ry = cy + su * h * 0.45;
        return { x: ox + rx * Math.cos(t * 3), y: ry };
      }
    }
  },
  polarCoordinates: {
    formulaLabel: 'Polar: (r, θ) where r = f(θ)',
    graph: (u, t, w, h, cx, cy) => {
      const ox = cx + w / 2;
      const angle = u * Math.PI * 5;
      const r = u * h * 0.42;
      return { x: ox + r * Math.cos(angle), y: cy + r * Math.sin(angle) };
    }
  }
};
