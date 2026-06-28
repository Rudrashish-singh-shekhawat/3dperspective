export const curvesPart4 = {
  // Category: Functions
  linearFunction: {
    formulaLabel: 'Linear Function: f(x) = ax + b',
    graph: (u, t, w, h, cx, cy) => {
      return { x: cx + u * w, y: cy + h * 0.2 - u * h * 0.4 };
    }
  },
  quadraticFunction: {
    formulaLabel: 'Quadratic: f(x) = ax² + bx + c',
    graph: (u, t, w, h, cx, cy) => {
      return { x: cx + u * w, y: cy + h * 0.35 - Math.pow((u - 0.5) * 2, 2) * h * 0.6 };
    }
  },
  cubicFunction: {
    formulaLabel: 'Cubic Function: f(x) = ax³ + bx² + cx + d',
    graph: (u, t, w, h, cx, cy) => {
      return { x: cx + u * w, y: cy - Math.pow((u - 0.5) * 2.2, 3) * h * 0.1 };
    }
  },
  polynomial: {
    formulaLabel: 'Polynomial: P(x) = Σ a_k x^k',
    graph: (u, t, w, h, cx, cy) => {
      return { x: cx + u * w, y: cy - Math.sin(u * Math.PI * 3) * h * 0.28 };
    }
  },
  rationalFunction: {
    formulaLabel: 'Rational: f(x) = P(x) / Q(x)',
    graph: (u, t, w, h, cx, cy) => {
      const ox = cx + w / 2;
      if (u < 0.5) {
        const su = u / 0.5;
        const nx = (su - 0.99) * 2;
        return { x: ox + nx * w * 0.25, y: cy - (1 / nx) * h * 0.05 };
      } else {
        const su = (u - 0.5) / 0.5;
        const nx = (su + 0.01) * 2;
        return { x: ox + nx * w * 0.25, y: cy - (1 / nx) * h * 0.05 };
      }
    }
  },
  logarithmicFunction: {
    formulaLabel: 'Logarithmic Function: f(x) = ln(x)',
    graph: (u, t, w, h, cx, cy) => {
      const nx = u * 0.96 + 0.04;
      return { x: cx + u * w, y: cy - Math.log(nx) * h * 0.25 };
    }
  },
  exponentialFunction: {
    formulaLabel: 'Exponential Function: f(x) = e^x',
    graph: (u, t, w, h, cx, cy) => {
      return { x: cx + u * w, y: cy + h * 0.32 - Math.exp((u - 0.5) * 3) * h * 0.15 };
    }
  },
  sineCurve: {
    formulaLabel: 'Sine Curve: f(x) = sin(x)',
    graph: (u, t, w, h, cx, cy) => {
      return { x: cx + u * w, y: cy - Math.sin(u * Math.PI * 4) * h * 0.38 };
    }
  },
  cosineCurve: {
    formulaLabel: 'Cosine Curve: f(x) = cos(x)',
    graph: (u, t, w, h, cx, cy) => {
      return { x: cx + u * w, y: cy - Math.cos(u * Math.PI * 4) * h * 0.38 };
    }
  },
  tangentCurve: {
    formulaLabel: 'Tangent Curve: f(x) = tan(x)',
    graph: (u, t, w, h, cx, cy) => {
      const ox = cx + w / 2;
      if (u < 0.5) {
        const su = u / 0.5;
        const lt = (su - 0.5) * Math.PI * 0.85;
        return { x: ox - w * 0.25 + su * w * 0.25, y: cy - Math.tan(lt) * h * 0.14 };
      } else {
        const su = (u - 0.5) / 0.5;
        const lt = (su - 0.5) * Math.PI * 0.85;
        return { x: ox + su * w * 0.25, y: cy - Math.tan(lt) * h * 0.14 };
      }
    }
  },
  cotangent: {
    formulaLabel: 'Cotangent Curve: f(x) = cot(x)',
    graph: (u, t, w, h, cx, cy) => {
      const ox = cx + w / 2;
      const lt = (u - 0.5) * Math.PI * 0.82;
      return { x: ox - w * 0.4 + u * w * 0.8, y: cy + (1 / Math.tan(lt)) * h * 0.08 };
    }
  },
  secant: {
    formulaLabel: 'Secant Curve: f(x) = sec(x)',
    graph: (u, t, w, h, cx, cy) => {
      const ox = cx + w / 2;
      const lt = (u - 0.5) * Math.PI * 0.8;
      const val = 1 / Math.cos(lt);
      return { x: ox - w * 0.4 + u * w * 0.8, y: cy - val * h * 0.12 };
    }
  },
  cosecant: {
    formulaLabel: 'Cosecant Curve: f(x) = csc(x)',
    graph: (u, t, w, h, cx, cy) => {
      const ox = cx + w / 2;
      const lt = (u - 0.5) * Math.PI * 0.8 + Math.PI / 2;
      const val = 1 / Math.sin(lt);
      const clamped = Math.max(-5, Math.min(5, val));
      return { x: ox - w * 0.4 + u * w * 0.8, y: cy - clamped * h * 0.12 };
    }
  },
  absoluteValue: {
    formulaLabel: 'Absolute Value: f(x) = |x|',
    graph: (u, t, w, h, cx, cy) => {
      return { x: cx + u * w, y: cy + h * 0.35 - Math.abs(u - 0.5) * h * 0.8 };
    }
  },
  piecewiseFunction: {
    formulaLabel: 'Piecewise Function: disjoint components',
    graph: (u, t, w, h, cx, cy) => {
      const ox = cx + w / 2;
      if (u < 0.5) {
        const su = u / 0.5;
        return { x: ox - w / 2 + su * w / 2, y: cy - 16 };
      } else {
        const su = (u - 0.5) / 0.5;
        return { x: ox + su * w / 2, y: cy + 16 - su * h * 0.35 };
      }
    }
  }
};
