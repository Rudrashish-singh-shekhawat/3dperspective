export const curves = {
  // --- ORIGINAL COMPILATION CURVES ---

  // ==========================================
  // name: sine
  // ==========================================
  sine: {
    formulaLabel: 'ψ(x,t) = A sin(kx - ωt)',
    graph: (u, t, w, h) => -Math.sin(t) * h * 0.4
  },

  // ==========================================
  // name: decay
  // ==========================================
  decay: {
    formulaLabel: 'x(t) = X₀ e^(-γt) cos(ωt)',
    graph: (u, t, w, h) => -Math.sin(t * 2.2) * h * 0.4 * Math.exp(-t * 0.25)
  },

  // ==========================================
  // name: fourier
  // ==========================================
  fourier: {
    formulaLabel: 'f(x) = Σ [a_n cos(nx) + b_n sin(nx)]',
    graph: (u, t, w, h) => {
      const f = Math.sin(t) + Math.sin(3 * t) / 3 + Math.sin(5 * t) / 5;
      return -f * h * 0.35;
    }
  },

  // ==========================================
  // name: gaussian
  // ==========================================
  gaussian: {
    formulaLabel: 'P(x) = 1/(σ√(2π)) e^(-x²/(2σ²))',
    graph: (u, t, w, h) => {
      const nx = (u - 0.5) * 5;
      return -Math.exp(-nx * nx) * h * 0.45;
    }
  },

  // ==========================================
  // name: projectile
  // ==========================================
  projectile: {
    formulaLabel: 'y = x tan(θ) - gx² / (2v₀² cos²θ)',
    graph: (u, t, w, h) => h * 0.3 - (h * 0.75) * 4 * u * (1 - u)
  },

  // ==========================================
  // name: planck
  // ==========================================
  planck: {
    formulaLabel: 'B_λ(λ, T) = 2hc² / [λ⁵ (e^(hc/λkT) - 1)]',
    graph: (u, t, w, h) => {
      const nx = u * 4 + 0.15;
      const val = 15 * Math.pow(nx, -3.5) / (Math.exp(3 / nx) - 1);
      return h * 0.35 - val * h * 0.55;
    }
  },

  // ==========================================
  // name: beats
  // ==========================================
  beats: {
    formulaLabel: 'ψ(t) = 2A cos(Δω t/2) cos(ω_avg t)',
    graph: (u, t, w, h) => {
      const env = Math.cos((u - 0.5) * Math.PI * 2);
      const car = Math.sin(u * Math.PI * 24);
      return -env * car * h * 0.42;
    }
  },

  // ==========================================
  // name: packet
  // ==========================================
  packet: {
    formulaLabel: 'Ψ(x,0) = C e^(-x²/a²) e^(ik₀x)',
    graph: (u, t, w, h) => {
      const nx = (u - 0.5) * 5;
      const env = Math.exp(-nx * nx * 0.8);
      const car = Math.cos(nx * 12);
      return -env * car * h * 0.42;
    }
  },

  // ==========================================
  // name: lissajous
  // ==========================================
  lissajous: {
    formulaLabel: 'x = A sin(at), y = B sin(bt + δ)',
    graph: (u, t, w, h, cx, cy) => {
      const lt = u * Math.PI * 2;
      return {
        x: cx + w / 2 + Math.sin(3 * lt) * w * 0.4,
        y: cy + Math.sin(4 * lt + Math.PI / 4) * h * 0.45
      };
    }
  },

  // ==========================================
  // name: relativity
  // ==========================================
  relativity: {
    formulaLabel: 'γ = 1 / √(1 - v²/c²)',
    graph: (u, t, w, h) => {
      const vc = u * 0.93;
      const gamma = 1 / Math.sqrt(1 - vc * vc);
      return h * 0.35 - (gamma - 1) * h * 0.4;
    }
  },

  // ==========================================
  // name: circular
  // ==========================================
  circular: {
    formulaLabel: 'x = R cos(ωt), y = R sin(ωt)',
    graph: (u, t, w, h, cx, cy) => {
      const lt = u * Math.PI * 2;
      return {
        x: cx + w / 2 + Math.cos(lt) * h * 0.45,
        y: cy + Math.sin(lt) * h * 0.45
      };
    }
  },

  // ==========================================
  // name: ellipse
  // ==========================================
  ellipse: {
    formulaLabel: 'x²/a² + y²/b² = 1',
    graph: (u, t, w, h, cx, cy) => {
      const lt = u * Math.PI * 2;
      return {
        x: cx + w / 2 + Math.cos(lt) * w * 0.4,
        y: cy + Math.sin(lt) * h * 0.3
      };
    }
  },

  // ==========================================
  // name: hyperbola
  // ==========================================
  hyperbola: {
    formulaLabel: 'x²/a² - y²/b² = 1',
    graph: (u, t, w, h, cx, cy) => {
      const lt = Math.max(-3, Math.min(3, (u - 0.5) * 3));
      return {
        x: cx + w / 2 + Math.cosh(lt) * w * 0.15,
        y: cy + Math.sinh(lt) * h * 0.3
      };
    }
  },

  // ==========================================
  // name: tanx
  // ==========================================
  tanx: {
    formulaLabel: 'y = tan(x)',
    graph: (u, t, w, h) => {
      const lt = (u - 0.5) * Math.PI * 0.9;
      const val = Math.tan(lt);
      return -Math.max(-5, Math.min(5, val)) * h * 0.15;
    }
  },

  // ==========================================
  // name: thermo
  // ==========================================
  thermo: {
    formulaLabel: 'Carnot: W = ∮ P dV',
    graph: (u, t, w, h, cx, cy) => {
      const lu = u * Math.PI * 2;
      return {
        x: cx + w * (0.5 + 0.35 * Math.cos(lu) - 0.1 * Math.sin(lu)),
        y: cy + h * (0.1 - 0.35 * Math.sin(lu) - 0.15 * Math.cos(lu))
      };
    }
  },

  // ==========================================
  // name: optics
  // ==========================================
  optics: {
    formulaLabel: 'Diffraction: I = I₀ (sin(β)/β)²',
    graph: (u, t, w, h) => {
      const nx = (u - 0.5) * 15;
      const val = nx === 0 ? 1 : Math.pow(Math.sin(nx) / nx, 2);
      return h * 0.35 - val * h * 0.7;
    }
  },

  // ==========================================
  // name: kinematics
  // ==========================================
  kinematics: {
    formulaLabel: 'v(t) = v₀ + a t',
    graph: (u, t, w, h) => h * 0.2 - u * h * 0.45
  },

  // ==========================================
  // name: eulers
  // ==========================================
  eulers: {
    formulaLabel: 'e^(iφ) = cos(φ) + i sin(φ)',
    graph: (u, t, w, h) => {
      const lt = u * Math.PI * 6;
      return -Math.sin(lt) * h * 0.35 * (1 - u * 0.5);
    }
  },

  // ==========================================
  // name: straight
  // ==========================================
  straight: {
    formulaLabel: 'y = m x + c',
    graph: (u, t, w, h) => h * 0.2 - (u - 0.5) * h * 0.6
  },

  // ==========================================
  // name: exponential
  // ==========================================
  exponential: {
    formulaLabel: 'y = A e^(k x)',
    graph: (u, t, w, h) => {
      const val = Math.exp((u - 0.5) * 3);
      return h * 0.35 - val * h * 0.18;
    }
  },

  // ==========================================
  // name: epicycle
  // ==========================================
  epicycle: {
    formulaLabel: 'r(θ) = cos(3θ)',
    graph: (u, t, w, h, cx, cy) => {
      const a = u * Math.PI * 2;
      const r = h * 0.35 * (1 - Math.cos(a * 3));
      return {
        x: cx + w / 2 + r * Math.cos(a),
        y: cy - r * Math.sin(a)
      };
    }
  },

  // ==========================================
  // name: spiral
  // ==========================================
  spiral: {
    formulaLabel: 'r = aθ',
    graph: (u, t, w, h, cx, cy) => {
      const a = u * Math.PI * 6.5;
      const r = u * h * 0.45;
      return {
        x: cx + w / 2 + r * Math.cos(a),
        y: cy - r * Math.sin(a)
      };
    }
  },

  // --- NEW USER MATHEMATICS TOPICS ---

  // Category: Coordinate Geometry

  // ==========================================
  // name: cartesianPlane
  // ==========================================
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

  // ==========================================
  // name: straightLine
  // ==========================================
  straightLine: {
    formulaLabel: 'Straight Line: y = m x + c',
    graph: (u, t, w, h, cx, cy) => {
      return { x: cx + u * w, y: cy + h * 0.25 - u * h * 0.5 };
    }
  },

  // ==========================================
  // name: parallelLines
  // ==========================================
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

  // ==========================================
  // name: perpendicularLines
  // ==========================================
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

  // ==========================================
  // name: distanceFormula
  // ==========================================
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

  // ==========================================
  // name: midpointFormula
  // ==========================================
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

  // ==========================================
  // name: circle
  // ==========================================
  circle: {
    formulaLabel: 'Circle: (x-h)² + (y-k)² = r²',
    graph: (u, t, w, h, cx, cy) => {
      const ox = cx + w / 2;
      const angle = u * Math.PI * 2;
      const r = h * 0.42;
      return { x: ox + r * Math.cos(angle), y: cy + r * Math.sin(angle) };
    }
  },

  // ==========================================
  // name: ellipseMath
  // ==========================================
  ellipseMath: {
    formulaLabel: 'Ellipse: x²/a² + y²/b² = 1',
    graph: (u, t, w, h, cx, cy) => {
      const ox = cx + w / 2;
      const angle = u * Math.PI * 2;
      return { x: ox + w * 0.42 * Math.cos(angle), y: cy + h * 0.3 * Math.sin(angle) };
    }
  },

  // ==========================================
  // name: hyperbolaMath
  // ==========================================
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

  // ==========================================
  // name: parabolaMath
  // ==========================================
  parabolaMath: {
    formulaLabel: 'Parabola: y² = 4ax',
    graph: (u, t, w, h, cx, cy) => {
      const lt = (u - 0.5) * 2;
      return { x: cx + w / 2 + (lt * lt) * w * 0.45 - 15, y: cy + lt * h * 0.4 };
    }
  },

  // ==========================================
  // name: conicSections
  // ==========================================
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

  // ==========================================
  // name: polarCoordinates
  // ==========================================
  polarCoordinates: {
    formulaLabel: 'Polar: (r, θ) where r = f(θ)',
    graph: (u, t, w, h, cx, cy) => {
      const ox = cx + w / 2;
      const angle = u * Math.PI * 5;
      const r = u * h * 0.42;
      return { x: ox + r * Math.cos(angle), y: cy + r * Math.sin(angle) };
    }
  },

  // Category: Calculus

  // ==========================================
  // name: limitApproaching
  // ==========================================
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

  // ==========================================
  // name: derivativeTangent
  // ==========================================
  derivativeTangent: {
    formulaLabel: "Derivative: f'(x) = dy/dx (Tangent)",
    graph: (u, t, w, h, cx, cy) => {
      const px = cx + u * w;
      const py = cy - Math.sin(u * Math.PI * 1.5) * h * 0.3;
      return { x: px, y: py };
    }
  },

  // ==========================================
  // name: differentiation
  // ==========================================
  differentiation: {
    formulaLabel: 'Differentiation: d/dx(xⁿ) = n·xⁿ⁻¹',
    graph: (u, t, w, h, cx, cy) => {
      const px = cx + u * w;
      const py = cy + h * 0.2 - (u * u) * h * 0.55;
      return { x: px, y: py };
    }
  },

  // ==========================================
  // name: integrationArea
  // ==========================================
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

  // ==========================================
  // name: definiteIntegral
  // ==========================================
  definiteIntegral: {
    formulaLabel: 'Definite Integral: Area from a to b',
    graph: (u, t, w, h, cx, cy) => {
      const px = cx + u * w;
      return { x: px, y: cy - (Math.sin(u * Math.PI) * 0.3 + 0.2) * h };
    }
  },

  // ==========================================
  // name: indefiniteIntegral
  // ==========================================
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

  // ==========================================
  // name: differentialEquation
  // ==========================================
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

  // ==========================================
  // name: partialDiffEq
  // ==========================================
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

  // ==========================================
  // name: gradient
  // ==========================================
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

  // ==========================================
  // name: divergence
  // ==========================================
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

  // ==========================================
  // name: curl
  // ==========================================
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

  // ==========================================
  // name: vectorField
  // ==========================================
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
  },

  // Category: Functions

  // ==========================================
  // name: linearFunction
  // ==========================================
  linearFunction: {
    formulaLabel: 'Linear Function: f(x) = ax + b',
    graph: (u, t, w, h, cx, cy) => {
      return { x: cx + u * w, y: cy + h * 0.2 - u * h * 0.4 };
    }
  },

  // ==========================================
  // name: quadraticFunction
  // ==========================================
  quadraticFunction: {
    formulaLabel: 'Quadratic: f(x) = ax² + bx + c',
    graph: (u, t, w, h, cx, cy) => {
      return { x: cx + u * w, y: cy + h * 0.35 - Math.pow((u - 0.5) * 2, 2) * h * 0.6 };
    }
  },

  // ==========================================
  // name: cubicFunction
  // ==========================================
  cubicFunction: {
    formulaLabel: 'Cubic Function: f(x) = ax³ + bx² + cx + d',
    graph: (u, t, w, h, cx, cy) => {
      return { x: cx + u * w, y: cy - Math.pow((u - 0.5) * 2.2, 3) * h * 0.1 };
    }
  },

  // ==========================================
  // name: polynomial
  // ==========================================
  polynomial: {
    formulaLabel: 'Polynomial: P(x) = Σ a_k x^k',
    graph: (u, t, w, h, cx, cy) => {
      return { x: cx + u * w, y: cy - Math.sin(u * Math.PI * 3) * h * 0.28 };
    }
  },

  // ==========================================
  // name: rationalFunction
  // ==========================================
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

  // ==========================================
  // name: logarithmicFunction
  // ==========================================
  logarithmicFunction: {
    formulaLabel: 'Logarithmic Function: f(x) = ln(x)',
    graph: (u, t, w, h, cx, cy) => {
      const nx = u * 0.96 + 0.04;
      return { x: cx + u * w, y: cy - Math.log(nx) * h * 0.25 };
    }
  },

  // ==========================================
  // name: exponentialFunction
  // ==========================================
  exponentialFunction: {
    formulaLabel: 'Exponential Function: f(x) = e^x',
    graph: (u, t, w, h, cx, cy) => {
      return { x: cx + u * w, y: cy + h * 0.32 - Math.exp((u - 0.5) * 3) * h * 0.15 };
    }
  },

  // ==========================================
  // name: sineCurve
  // ==========================================
  sineCurve: {
    formulaLabel: 'Sine Curve: f(x) = sin(x)',
    graph: (u, t, w, h, cx, cy) => {
      return { x: cx + u * w, y: cy - Math.sin(u * Math.PI * 4) * h * 0.38 };
    }
  },

  // ==========================================
  // name: cosineCurve
  // ==========================================
  cosineCurve: {
    formulaLabel: 'Cosine Curve: f(x) = cos(x)',
    graph: (u, t, w, h, cx, cy) => {
      return { x: cx + u * w, y: cy - Math.cos(u * Math.PI * 4) * h * 0.38 };
    }
  },

  // ==========================================
  // name: tangentCurve
  // ==========================================
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

  // ==========================================
  // name: cotangent
  // ==========================================
  cotangent: {
    formulaLabel: 'Cotangent Curve: f(x) = cot(x)',
    graph: (u, t, w, h, cx, cy) => {
      const ox = cx + w / 2;
      const lt = (u - 0.5) * Math.PI * 0.82;
      return { x: ox - w * 0.4 + u * w * 0.8, y: cy + (1 / Math.tan(lt)) * h * 0.08 };
    }
  },

  // ==========================================
  // name: secant
  // ==========================================
  secant: {
    formulaLabel: 'Secant Curve: f(x) = sec(x)',
    graph: (u, t, w, h, cx, cy) => {
      const ox = cx + w / 2;
      const lt = (u - 0.5) * Math.PI * 0.8;
      const val = 1 / Math.cos(lt);
      return { x: ox - w * 0.4 + u * w * 0.8, y: cy - val * h * 0.12 };
    }
  },

  // ==========================================
  // name: cosecant
  // ==========================================
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

  // ==========================================
  // name: absoluteValue
  // ==========================================
  absoluteValue: {
    formulaLabel: 'Absolute Value: f(x) = |x|',
    graph: (u, t, w, h, cx, cy) => {
      return { x: cx + u * w, y: cy + h * 0.35 - Math.abs(u - 0.5) * h * 0.8 };
    }
  },

  // ==========================================
  // name: piecewiseFunction
  // ==========================================
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
  },

  // Category: Trigonometry

  // ==========================================
  // name: unitCircle
  // ==========================================
  unitCircle: {
    formulaLabel: 'Unit Circle: cos²(θ) + sin²(θ) = 1',
    graph: (u, t, w, h, cx, cy) => {
      const ox = cx + w / 2;
      const angle = u * Math.PI * 2;
      const r = h * 0.42;
      return { x: ox + r * Math.cos(angle), y: cy + r * Math.sin(angle) };
    }
  },

  // ==========================================
  // name: trigRatios
  // ==========================================
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

  // ==========================================
  // name: eulerFormula
  // ==========================================
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

  // ==========================================
  // name: eulerIdentity
  // ==========================================
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

  // ==========================================
  // name: complexPlane
  // ==========================================
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

  // ==========================================
  // name: phasorDiagram
  // ==========================================
  phasorDiagram: {
    formulaLabel: 'Phasor: V(t) = V₀ e^(i(ωt + φ))',
    graph: (u, t, w, h, cx, cy) => {
      const ox = cx + w / 2;
      const angle = t * 1.8;
      return { x: ox + u * h * 0.42 * Math.cos(angle), y: cy - u * h * 0.42 * Math.sin(angle) };
    }
  },

  // ==========================================
  // name: fourierSeriesMath
  // ==========================================
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

  // ==========================================
  // name: fourierTransform
  // ==========================================
  fourierTransform: {
    formulaLabel: 'Fourier Transform: Spectrum Analysis',
    graph: (u, t, w, h, cx, cy) => {
      const ox = cx + w / 2;
      if (u < 0.5) {
        // Time domain signal
        const su = u / 0.5;
        return { x: cx + su * w * 0.45, y: cy - 16 - (Math.sin(su * Math.PI * 4) + Math.sin(su * Math.PI * 8)) * h * 0.1 };
      } else {
        // Frequency domain (Sinc-like peaks for the fourier transform)
        const su = (u - 0.5) / 0.5;
        let py = cy + 20;
        
        // Define peaks at specific frequencies corresponding to the time domain signal
        const peak1 = Math.max(0, 1 - Math.abs(su - 0.3) * 20);
        const peak2 = Math.max(0, 1 - Math.abs(su - 0.7) * 20);
        
        py -= (peak1 * h * 0.3 + peak2 * h * 0.2);
        
        return { x: ox + 10 + su * w * 0.4, y: py };
      }
    }
  },

  // ==========================================
  // name: taylorSeries
  // ==========================================
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

  // ==========================================
  // name: maclaurinSeries
  // ==========================================
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

  // ==========================================
  // name: matrix
  // ==========================================
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

  // ==========================================
  // name: matrixMultiplication
  // ==========================================
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

  // ==========================================
  // name: eigenvectors
  // ==========================================
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

  // ==========================================
  // name: eigenvalues
  // ==========================================
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

  // ==========================================
  // name: determinant
  // ==========================================
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

  // ==========================================
  // name: vectorProjection
  // ==========================================
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

  // ==========================================
  // name: dotProduct
  // ==========================================
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

  // ==========================================
  // name: crossProduct
  // ==========================================
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

  // ==========================================
  // name: basisVectors
  // ==========================================
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

  // ==========================================
  // name: coordinateTransformation
  // ==========================================
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
  },

  // Category: Complex Numbers

  // ==========================================
  // name: imaginaryAxis
  // ==========================================
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

  // ==========================================
  // name: complexPlaneComplex
  // ==========================================
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

  // ==========================================
  // name: polarForm
  // ==========================================
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

  // ==========================================
  // name: eulerRepresentation
  // ==========================================
  eulerRepresentation: {
    formulaLabel: 'Euler Representation: z = r e^(iθ)',
    graph: (u, t, w, h, cx, cy) => {
      const ox = cx + w / 2;
      const angle = u * Math.PI * 6.5;
      const r = u * h * 0.42;
      return { x: ox + r * Math.cos(angle), y: cy - r * Math.sin(angle) };
    }
  },

  // ==========================================
  // name: rootsOfUnity
  // ==========================================
  rootsOfUnity: {
    formulaLabel: 'Roots of Unity: zⁿ = 1 discrete angles',
    graph: (u, t, w, h, cx, cy) => {
      const ox = cx + w / 2;
      const angle = u * Math.PI * 2;
      const r = h * 0.42;
      return { x: ox + r * Math.cos(angle), y: cy + r * Math.sin(angle) };
    }
  },

  // ==========================================
  // name: argandDiagram
  // ==========================================
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

  // ==========================================
  // name: bellCurve
  // ==========================================
  bellCurve: {
    formulaLabel: 'Bell Curve (Normal distribution shape)',
    graph: (u, t, w, h, cx, cy) => {
      const nx = (u - 0.5) * 5;
      return { x: cx + u * w, y: cy - Math.exp(-nx * nx / 2) * h * 0.45 };
    }
  },

  // ==========================================
  // name: gaussianDistribution
  // ==========================================
  gaussianDistribution: {
    formulaLabel: 'Gaussian distribution probability density',
    graph: (u, t, w, h, cx, cy) => {
      const nx = (u - 0.5) * 6;
      return { x: cx + u * w, y: cy - Math.exp(-nx * nx / 3.5) * h * 0.48 };
    }
  },

  // ==========================================
  // name: histogram
  // ==========================================
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

  // ==========================================
  // name: scatterPlot
  // ==========================================
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

  // ==========================================
  // name: boxPlot
  // ==========================================
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

  // ==========================================
  // name: probabilityTree
  // ==========================================
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

  // ==========================================
  // name: binomialDistribution
  // ==========================================
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

  // ==========================================
  // name: normalDistribution
  // ==========================================
  normalDistribution: {
    formulaLabel: 'Normal Distribution confidence bands',
    graph: (u, t, w, h, cx, cy) => {
      const nx = (u - 0.5) * 5;
      return { x: cx + u * w, y: cy - Math.exp(-nx * nx / 2) * h * 0.45 };
    }
  },

  // Category: Topology & Geometry

  // ==========================================
  // name: triangle
  // ==========================================
  triangle: {
    formulaLabel: 'Triangle: Area = ½ b h',
    graph: (u, t, w, h, cx, cy) => {
      const ox = cx + w / 2;
      const x1 = ox - w * 0.36, y1 = cy + h * 0.3;
      const x2 = ox + w * 0.36, y2 = cy + h * 0.3;
      const x3 = ox, y3 = cy - h * 0.36;
      if (u < 0.33) {
        return { x: x1 + (x2 - x1) * (u / 0.33), y: y1 };
      } else if (u < 0.66) {
        return { x: x2 + (x3 - x2) * ((u - 0.33) / 0.33), y: y1 + (y3 - y1) * ((u - 0.33) / 0.33) };
      } else {
        return { x: x3 + (x1 - x3) * ((u - 0.66) / 0.34), y: y3 + (y1 - y3) * ((u - 0.66) / 0.34) };
      }
    }
  },

  // ==========================================
  // name: pythagoreanTheorem
  // ==========================================
  pythagoreanTheorem: {
    formulaLabel: 'Pythagorean: a² + b² = c²',
    graph: (u, t, w, h, cx, cy) => {
      const ox = cx + w / 2 - 15;
      const aLen = h * 0.28;
      const bLen = h * 0.38;
      const pA = { x: ox, y: cy - aLen };
      const pB = { x: ox, y: cy };
      const pC = { x: ox + bLen, y: cy };
      if (u < 0.33) {
        return { x: pA.x, y: pA.y + (u / 0.33) * aLen };
      } else if (u < 0.66) {
        return { x: pB.x + ((u - 0.33) / 0.33) * bLen, y: pB.y };
      } else {
        const su = (u - 0.66) / 0.34;
        return { x: pC.x + (pA.x - pC.x) * su, y: pC.y + (pA.y - pC.y) * su };
      }
    }
  },

  // ==========================================
  // name: square
  // ==========================================
  square: {
    formulaLabel: 'Square: Area = s² (4 equal sides)',
    graph: (u, t, w, h, cx, cy) => {
      const side = h * 0.7;
      const half = side / 2;
      const ox = cx + w / 2;
      if (u < 0.25) {
        return { x: ox - half + (u / 0.25) * side, y: cy - half };
      } else if (u < 0.5) {
        return { x: ox + half, y: cy - half + ((u - 0.25) / 0.25) * side };
      } else if (u < 0.75) {
        return { x: ox + half - ((u - 0.5) / 0.25) * side, y: cy + half };
      } else {
        return { x: ox - half, y: cy + half - ((u - 0.75) / 0.25) * side };
      }
    }
  },

  // ==========================================
  // name: rectangle
  // ==========================================
  rectangle: {
    formulaLabel: 'Rectangle: Area = w · h',
    graph: (u, t, w, h, cx, cy) => {
      const rw = w * 0.72;
      const rh = h * 0.5;
      const ox = cx + w / 2;
      if (u < 0.25) {
        return { x: ox - rw / 2 + (u / 0.25) * rw, y: cy - rh / 2 };
      } else if (u < 0.5) {
        return { x: ox + rw / 2, y: cy - rh / 2 + ((u - 0.25) / 0.25) * rh };
      } else if (u < 0.75) {
        return { x: ox + rw / 2 - ((u - 0.5) / 0.25) * rw, y: cy + rh / 2 };
      } else {
        return { x: ox - rw / 2, y: cy + rh / 2 - ((u - 0.75) / 0.25) * rh };
      }
    }
  },

  // ==========================================
  // name: pentagon
  // ==========================================
  pentagon: {
    formulaLabel: 'Pentagon: Regular 5-gon geometry',
    graph: (u, t, w, h, cx, cy) => {
      const ox = cx + w / 2;
      const r = h * 0.44;
      const sides = 5;
      const idx = Math.floor(u * sides);
      const su = (u * sides) - idx;
      const a1 = (idx / sides) * Math.PI * 2 - Math.PI / 2;
      const a2 = ((idx + 1) / sides) * Math.PI * 2 - Math.PI / 2;
      return {
        x: ox + r * (Math.cos(a1) + (Math.cos(a2) - Math.cos(a1)) * su),
        y: cy + r * (Math.sin(a1) + (Math.sin(a2) - Math.sin(a1)) * su)
      };
    }
  },

  // ==========================================
  // name: hexagon
  // ==========================================
  hexagon: {
    formulaLabel: 'Hexagon: Regular 6-gon shape',
    graph: (u, t, w, h, cx, cy) => {
      const ox = cx + w / 2;
      const r = h * 0.44;
      const sides = 6;
      const idx = Math.floor(u * sides);
      const su = (u * sides) - idx;
      const a1 = (idx / sides) * Math.PI * 2 - Math.PI / 2;
      const a2 = ((idx + 1) / sides) * Math.PI * 2 - Math.PI / 2;
      return {
        x: ox + r * (Math.cos(a1) + (Math.cos(a2) - Math.cos(a1)) * su),
        y: cy + r * (Math.sin(a1) + (Math.sin(a2) - Math.sin(a1)) * su)
      };
    }
  },

  // ==========================================
  // name: cube
  // ==========================================
  cube: {
    formulaLabel: 'Cube: Volume = s³ wireframe mesh',
    graph: (u, t, w, h, cx, cy) => {
      const ox = cx + w / 2;
      const s = h * 0.35;
      const project = (x3d, y3d, z3d) => {
        return { x: ox + x3d + z3d * 0.4, y: cy + y3d - z3d * 0.3 };
      };
      const pts = [
        project(-s, -s, -s), project(s, -s, -s), project(s, s, -s), project(-s, s, -s),
        project(-s, -s, -s),
        project(-s, -s, s), project(s, -s, s), project(s, s, s), project(-s, s, s),
        project(-s, -s, s)
      ];
      const idx = Math.floor(u * 9);
      const su = (u * 9) - idx;
      const p1 = pts[idx];
      const p2 = pts[idx + 1];
      return { x: p1.x + (p2.x - p1.x) * su, y: p1.y + (p2.y - p1.y) * su };
    }
  },

  // ==========================================
  // name: sphere
  // ==========================================
  sphere: {
    formulaLabel: 'Sphere: Volume = 4/3 π r³ circles',
    graph: (u, t, w, h, cx, cy) => {
      const ox = cx + w / 2;
      const r = h * 0.44;
      if (u < 0.4) {
        const angle = (u / 0.4) * Math.PI * 2;
        return { x: ox + r * Math.cos(angle), y: cy + r * Math.sin(angle) };
      } else if (u < 0.7) {
        const angle = ((u - 0.4) / 0.3) * Math.PI * 2;
        return { x: ox + r * Math.cos(angle), y: cy + r * 0.3 * Math.sin(angle) };
      } else {
        const angle = ((u - 0.7) / 0.3) * Math.PI * 2;
        return { x: ox + r * 0.3 * Math.cos(angle), y: cy + r * Math.sin(angle) };
      }
    }
  },

  // ==========================================
  // name: cylinder
  // ==========================================
  cylinder: {
    formulaLabel: 'Cylinder: Volume = π r² h representation',
    graph: (u, t, w, h, cx, cy) => {
      const ox = cx + w / 2;
      const r = w * 0.24;
      const ch = h * 0.55;
      if (u < 0.3) {
        const angle = (u / 0.3) * Math.PI * 2;
        return { x: ox + r * Math.cos(angle), y: cy - ch / 2 + r * 0.28 * Math.sin(angle) };
      } else if (u < 0.6) {
        const angle = ((u - 0.3) / 0.3) * Math.PI * 2;
        return { x: ox + r * Math.cos(angle), y: cy + ch / 2 + r * 0.28 * Math.sin(angle) };
      } else if (u < 0.8) {
        const su = (u - 0.6) / 0.2;
        return { x: ox - r, y: cy - ch / 2 + su * ch };
      } else {
        const su = (u - 0.8) / 0.2;
        return { x: ox + r, y: cy - ch / 2 + su * ch };
      }
    }
  },

  // ==========================================
  // name: cone
  // ==========================================
  cone: {
    formulaLabel: 'Cone: Volume = ⅓ π r² h wireframe',
    graph: (u, t, w, h, cx, cy) => {
      const ox = cx + w / 2;
      const r = w * 0.24;
      const ch = h * 0.6;
      if (u < 0.4) {
        const angle = (u / 0.4) * Math.PI * 2;
        return { x: ox + r * Math.cos(angle), y: cy + ch / 2 + r * 0.28 * Math.sin(angle) };
      } else if (u < 0.7) {
        const su = (u - 0.4) / 0.3;
        return { x: ox - r + su * r, y: cy + ch / 2 - su * ch };
      } else {
        const su = (u - 0.7) / 0.3;
        return { x: ox + su * r, y: cy - ch / 2 + su * ch };
      }
    }
  },

  // ==========================================
  // name: torus
  // ==========================================
  torus: {
    formulaLabel: 'Torus: V = 2 π² R r² donuts',
    graph: (u, t, w, h, cx, cy) => {
      const ox = cx + w / 2;
      const r1 = h * 0.42;
      const r2 = h * 0.22;
      if (u < 0.5) {
        const angle = (u / 0.5) * Math.PI * 2;
        return { x: ox + r1 * Math.cos(angle), y: cy + r1 * 0.35 * Math.sin(angle) };
      } else {
        const angle = ((u - 0.5) / 0.5) * Math.PI * 2;
        return { x: ox + r2 * Math.cos(angle), y: cy + r2 * 0.35 * Math.sin(angle) };
      }
    }
  },

  // ==========================================
  // name: mobiusStrip
  // ==========================================
  mobiusStrip: {
    formulaLabel: 'Möbius Strip: non-orientable surface',
    graph: (u, t, w, h, cx, cy) => {
      const ox = cx + w / 2;
      const angle = u * Math.PI * 2;
      const r = h * 0.35 * (1 + 0.35 * Math.cos(angle / 2));
      return { x: ox + r * Math.cos(angle), y: cy + r * Math.sin(angle) * 0.6 + Math.sin(angle / 2) * h * 0.12 };
    }
  }
};

export const mathDiagrams = {

  // ==========================================
  // name: pythagorean
  // ==========================================
  pythagorean: (ctx, x, y, graphWidth, graphHeight, formulaLabel, prog, opacity, globalTime, helpers) => {
    const { drawChalkLine, drawChalkText, WHITE, CYAN, PURPLE } = helpers;
    const cx = x + graphWidth / 2 - 12;
    const cy = y + 20;
    const aLen = graphHeight * 0.28;
    const bLen = graphHeight * 0.38;

    const pA = { x: cx, y: cy - aLen };
    const pB = { x: cx, y: cy };
    const pC = { x: cx + bLen, y: cy };

    if (prog > 0.1) {
      drawChalkLine(ctx, [pA, pB, pC, pA], opacity, 1.5, WHITE);
      drawChalkLine(ctx, [{ x: cx, y: cy - 4 }, { x: cx + 4, y: cy - 4 }, { x: cx + 4, y: cy }], opacity * 0.5, 1);

      drawChalkText(ctx, 'a', cx - 12, cy - aLen / 2 - 4, opacity * 0.8, 11, PURPLE);
      drawChalkText(ctx, 'b', cx + bLen / 2 - 4, cy + 6, opacity * 0.8, 11, CYAN);
      drawChalkText(ctx, 'c', cx + bLen / 2 - 12, cy - aLen / 2 - 12, opacity * 0.8, 11, WHITE);
    }

    if (prog > 0.3) {
      drawChalkLine(ctx, [
        { x: cx, y: cy - aLen },
        { x: cx - aLen, y: cy - aLen },
        { x: cx - aLen, y: cy },
        { x: cx, y: cy }
      ], opacity * 0.45, 1.0, PURPLE);

      drawChalkLine(ctx, [
        { x: cx, y: cy },
        { x: cx, y: cy + bLen },
        { x: cx + bLen, y: cy + bLen },
        { x: cx + bLen, y: cy }
      ], opacity * 0.45, 1.0, CYAN);
    }

    const pD = { x: pA.x + aLen, y: pA.y - bLen };
    const pE = { x: pC.x + aLen, y: pC.y - bLen };

    if (prog > 0.7) {
      drawChalkLine(ctx, [pA, pD, pE, pC], opacity * 0.45, 1.0, WHITE);
      drawChalkText(ctx, 'a² + b² = c²', cx + bLen * 0.5 - 20, cy + bLen + 15, opacity, 11, WHITE);
    }

    if (prog > 0.7) {
      const t = (globalTime * 0.015) % 1.0;
      const sy_a = (cy - aLen) + aLen * t;
      drawChalkLine(ctx, [{ x: cx - aLen, y: sy_a }, { x: cx - aLen, y: sy_a + 2 }], opacity * 0.8, 2.5, PURPLE);

      const sx_b = cx + bLen * t;
      drawChalkLine(ctx, [{ x: sx_b, y: cy + bLen }, { x: sx_b + 2, y: cy + bLen }], opacity * 0.8, 2.5, CYAN);

      const sx_c = pA.x + (pD.x - pA.x) * t;
      const sy_c = pA.y + (pD.y - pA.y) * t;
      drawChalkLine(ctx, [{ x: sx_c, y: sy_c }, { x: sx_c + 2, y: sy_c + 2 }], opacity * 0.8, 2.5, WHITE);
    }
  },

  // ==========================================
  // name: polar
  // ==========================================
  polar: (ctx, x, y, graphWidth, graphHeight, formulaLabel, prog, opacity, globalTime, helpers) => {
    const { drawChalkLine, drawChalkText, CYAN, PURPLE } = helpers;
    const cx = x + graphWidth / 2;
    const cy = y + 10;
    const maxR = graphHeight * 0.42;

    if (prog > 0.1) {
      drawChalkLine(ctx, [{ x: cx - maxR - 10, y: cy }, { x: cx + maxR + 10, y: cy }], opacity * 0.3, 1);
      drawChalkLine(ctx, [{ x: cx, y: cy - maxR - 10 }, { x: cx, y: cy + maxR + 10 }], opacity * 0.3, 1);

      for (let r = 15; r <= maxR; r += 16) {
        const circPts = [];
        for (let a = 0; a <= Math.PI * 2 + 0.1; a += 0.25) {
          circPts.push({ x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) });
        }
        drawChalkLine(ctx, circPts, opacity * 0.25, 0.8, PURPLE);
      }
    }

    if (prog > 0.4) {
      const angle = globalTime * 0.015;
      const r = maxR * 0.85;
      const px = cx + r * Math.cos(angle);
      const py = cy - r * Math.sin(angle);

      drawChalkLine(ctx, [{ x: cx, y: cy }, { x: px, y: py }], opacity * 0.65, 1.2, CYAN);

      ctx.beginPath();
      ctx.arc(px, py, 3, 0, Math.PI * 2);
      ctx.fillStyle = `${CYAN}${opacity})`;
      ctx.fill();

      const arcPts = [];
      for (let a = 0; a <= angle % (Math.PI * 2); a += 0.1) {
        arcPts.push({ x: cx + 12 * Math.cos(a), y: cy - 12 * Math.sin(a) });
      }
      if (arcPts.length > 1) {
        drawChalkLine(ctx, arcPts, opacity * 0.7, 1.0, PURPLE);
      }
      drawChalkText(ctx, 'θ', cx + 15 * Math.cos(angle * 0.5) + 2, cy - 15 * Math.sin(angle * 0.5) - 4, opacity * 0.8, 10, PURPLE);
      drawChalkText(ctx, '(r, θ)', px + 4, py - 6, opacity, 11, CYAN);
    }
  },

  // ==========================================
  // name: tangent
  // ==========================================
  tangent: (ctx, x, y, graphWidth, graphHeight, formulaLabel, prog, opacity, globalTime, helpers) => {
    const { drawChalkLine, drawChalkText, CYAN, PURPLE } = helpers;
    const lx = x + 15;
    const cy = y + 10;
    const lw = graphWidth - 30;
    const lh = graphHeight * 0.35;

    if (prog > 0.1) {
      drawChalkLine(ctx, [{ x: lx, y: cy }, { x: lx + lw, y: cy }], opacity * 0.35, 1);
      drawChalkLine(ctx, [{ x: lx, y: cy - lh - 5 }, { x: lx, y: cy + lh + 5 }], opacity * 0.35, 1);
    }

    const sinePts = [];
    const steps = 40;
    for (let i = 0; i <= steps; i++) {
      const u = i / steps;
      const px = lx + u * lw;
      const py = cy - Math.sin(u * Math.PI * 3.5) * lh;
      sinePts.push({ x: px, y: py });
    }

    if (prog > 0.3) {
      drawChalkLine(ctx, sinePts, opacity * 0.65, 1.5, 'rgba(255, 255, 255, ');
    }

    if (prog > 0.5) {
      const tVal = (globalTime * 0.005) % 1.0;
      const px = lx + tVal * lw;
      const py = cy - Math.sin(tVal * Math.PI * 3.5) * lh;

      ctx.beginPath();
      ctx.arc(px, py, 3, 0, Math.PI * 2);
      ctx.fillStyle = `${CYAN}${opacity})`;
      ctx.fill();

      const slope = -Math.cos(tVal * Math.PI * 3.5) * lh * (Math.PI * 3.5 / lw);
      const tAngle = Math.atan(slope);
      const segW = 18;
      const tx1 = px - segW * Math.cos(tAngle);
      const ty1 = py - segW * Math.sin(tAngle);
      const tx2 = px + segW * Math.cos(tAngle);
      const ty2 = py + segW * Math.sin(tAngle);

      drawChalkLine(ctx, [{ x: tx1, y: ty1 }, { x: tx2, y: ty2 }], opacity, 1.8, CYAN);
      drawChalkText(ctx, "dy/dx = f'(x)", px - 12, py - lh - 8, opacity, 10, PURPLE);
    }
  },

  // ==========================================
  // name: integral
  // ==========================================
  integral: (ctx, x, y, graphWidth, graphHeight, formulaLabel, prog, opacity, globalTime, helpers) => {
    const { drawChalkLine, drawChalkText, WHITE, CYAN, PURPLE } = helpers;
    const lx = x + 20;
    const cy = y + 10;
    const lw = graphWidth - 35;
    const lh = graphHeight * 0.5;

    const ox = lx;
    const oy = cy + lh / 2;

    if (prog > 0.1) {
      drawChalkLine(ctx, [{ x: ox, y: oy }, { x: ox + lw, y: oy }], opacity * 0.35, 1);
      drawChalkLine(ctx, [{ x: ox, y: oy }, { x: ox, y: oy - lh - 10 }], opacity * 0.35, 1);
    }

    const curvePts = [];
    const steps = 30;
    const intA = lw * 0.2;
    const intB = lw * 0.8;

    for (let i = 0; i <= steps; i++) {
      const u = i / steps;
      const px = ox + u * lw;
      const nx = u * 2.2;
      const py = oy - (nx * nx * 0.2 + 0.15) * lh;
      curvePts.push({ x: px, y: py });
    }

    if (prog > 0.3) {
      drawChalkLine(ctx, curvePts, opacity * 0.8, 1.6, CYAN);
    }

    if (prog > 0.4) {
      const colCount = 6;
      const colW = (intB - intA) / colCount;
      const drawAmp = Math.min(1, (prog - 0.4) / 0.6);
      const sweepX = intA + ((globalTime * 0.45) % (intB - intA));

      for (let i = 0; i < colCount; i++) {
        const rx = ox + intA + i * colW;
        const midX = rx + colW / 2;
        const midU = (midX - ox) / lw;
        const midNX = midU * 2.2;
        const ry = oy - (midNX * midNX * 0.2 + 0.15) * lh;

        if (rx + colW <= ox + sweepX) {
          drawChalkLine(ctx, [
            { x: rx, y: oy },
            { x: rx, y: ry },
            { x: rx + colW, y: ry },
            { x: rx + colW, y: oy }
          ], opacity * 0.32 * drawAmp, 1.0, PURPLE);
        }
      }

      drawChalkLine(ctx, [{ x: ox + sweepX, y: oy }, { x: ox + sweepX, y: oy - lh - 4 }], opacity * 0.5, 1, WHITE);
      drawChalkText(ctx, '∫ f(x)dx', ox + intA + 8, oy - lh - 14, opacity, 11, CYAN);
    }
  },

  // ==========================================
  // name: fourierSeries
  // ==========================================
  fourierSeries: (ctx, x, y, graphWidth, graphHeight, formulaLabel, prog, opacity, globalTime, helpers) => {
    const { drawChalkLine, drawChalkText, CYAN, PURPLE } = helpers;
    const cx = x + graphWidth * 0.32;
    const cy = y + 10;

    if (prog > 0.1) {
      drawChalkLine(ctx, [{ x: cx + 45, y: cy }, { x: x + graphWidth - 10, y: cy }], opacity * 0.35, 1);
    }

    const R1 = graphHeight * 0.26;
    const t = globalTime * 0.025;

    const p1 = {
      x: cx + R1 * Math.cos(t),
      y: cy + R1 * Math.sin(t)
    };
    const p2 = {
      x: p1.x + (R1 / 3) * Math.cos(3 * t),
      y: p1.y + (R1 / 3) * Math.sin(3 * t)
    };
    const p3 = {
      x: p2.x + (R1 / 5) * Math.cos(5 * t),
      y: p2.y + (R1 / 5) * Math.sin(5 * t)
    };

    if (prog > 0.3) {
      ctx.beginPath(); ctx.arc(cx, cy, R1, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.22})`; ctx.stroke();
      drawChalkLine(ctx, [{ x: cx, y: cy }, p1], opacity * 0.65, 1.2, CYAN);

      ctx.beginPath(); ctx.arc(p1.x, p1.y, R1 / 3, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.22})`; ctx.stroke();
      drawChalkLine(ctx, [p1, p2], opacity * 0.65, 1.0, CYAN);

      ctx.beginPath(); ctx.arc(p2.x, p2.y, R1 / 5, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.22})`; ctx.stroke();
      drawChalkLine(ctx, [p2, p3], opacity * 0.65, 1.0, CYAN);
    }

    if (prog > 0.6) {
      const tracePts = [];
      const startX = cx + 45;
      const endX = x + graphWidth - 15;
      const traceW = endX - startX;

      drawChalkLine(ctx, [p3, { x: startX, y: p3.y }], opacity * 0.5, 1, PURPLE);

      ctx.beginPath();
      ctx.arc(p3.x, p3.y, 3, 0, Math.PI * 2);
      ctx.fillStyle = `${CYAN}${opacity})`;
      ctx.fill();

      for (let i = 0; i <= 30; i++) {
        const u = i / 30;
        const pastT = t - u * (Math.PI * 1.5);
        const val = R1 * Math.sin(pastT) + (R1 / 3) * Math.sin(3 * pastT) + (R1 / 5) * Math.sin(5 * pastT);
        tracePts.push({
          x: startX + u * traceW,
          y: cy + val
        });
      }
      drawChalkLine(ctx, tracePts, opacity, 1.5, PURPLE);
    }
  },

  // ==========================================
  // name: argand
  // ==========================================
  argand: (ctx, x, y, graphWidth, graphHeight, formulaLabel, prog, opacity, globalTime, helpers) => {
    const { drawChalkLine, drawChalkText, WHITE, CYAN, PURPLE } = helpers;
    const cx = x + graphWidth / 2;
    const cy = y + 10;
    const maxR = graphHeight * 0.42;

    if (prog > 0.1) {
      drawChalkLine(ctx, [{ x: cx - maxR - 10, y: cy }, { x: cx + maxR + 10, y: cy }], opacity * 0.35, 1);
      drawChalkLine(ctx, [{ x: cx, y: cy - maxR - 10 }, { x: cx + maxR + 10, y: cy + maxR + 10 }], opacity * 0.35, 1);
      drawChalkText(ctx, 'Re', cx + maxR + 12, cy - 6, opacity * 0.5, 10);
      drawChalkText(ctx, 'Im', cx - 14, cy - maxR - 14, opacity * 0.5, 10);
    }

    if (prog > 0.4) {
      const angle = globalTime * 0.015;
      const rx = maxR * 0.88 * Math.cos(angle);
      const ry = maxR * 0.88 * Math.sin(angle);

      const px = cx + rx;
      const py = cy - ry;

      drawChalkLine(ctx, [{ x: cx, y: cy }, { x: px, y: py }], opacity, 1.8, WHITE);
      drawChalkText(ctx, 'z = x + iy', px + 4, py - 6, opacity, 11, WHITE);

      ctx.save();
      ctx.setLineDash([3, 3]);
      drawChalkLine(ctx, [{ x: px, y: py }, { x: px, y: cy }], opacity * 0.5, 1, PURPLE);
      drawChalkLine(ctx, [{ x: px, y: py }, { x: cx, y: py }], opacity * 0.5, 1, CYAN);
      ctx.restore();

      drawChalkText(ctx, 'x', cx + rx / 2 - 4, cy + 8, opacity * 0.8, 10, CYAN);
      drawChalkText(ctx, 'y', cx - 12, cy - ry / 2 - 4, opacity * 0.8, 10, PURPLE);
    }
  }
};

