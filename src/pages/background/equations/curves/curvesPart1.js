export const curvesPart1 = {
  sine: {
    formulaLabel: 'ψ(x,t) = A sin(kx - ωt)',
    graph: (u, t, w, h) => -Math.sin(t) * h * 0.4
  },
  decay: {
    formulaLabel: 'x(t) = X₀ e^(-γt) cos(ωt)',
    graph: (u, t, w, h) => -Math.sin(t * 2.2) * h * 0.4 * Math.exp(-t * 0.25)
  },
  fourier: {
    formulaLabel: 'f(x) = Σ [a_n cos(nx) + b_n sin(nx)]',
    graph: (u, t, w, h) => {
      const f = Math.sin(t) + Math.sin(3 * t) / 3 + Math.sin(5 * t) / 5;
      return -f * h * 0.35;
    }
  },
  gaussian: {
    formulaLabel: 'P(x) = 1/(σ√(2π)) e^(-x²/(2σ²))',
    graph: (u, t, w, h) => {
      const nx = (u - 0.5) * 5;
      return -Math.exp(-nx * nx) * h * 0.45;
    }
  },
  projectile: {
    formulaLabel: 'y = x tan(θ) - gx² / (2v₀² cos²θ)',
    graph: (u, t, w, h) => h * 0.3 - (h * 0.75) * 4 * u * (1 - u)
  },
  planck: {
    formulaLabel: 'B_λ(λ, T) = 2hc² / [λ⁵ (e^(hc/λkT) - 1)]',
    graph: (u, t, w, h) => {
      const nx = u * 4 + 0.15;
      const val = 15 * Math.pow(nx, -3.5) / (Math.exp(3 / nx) - 1);
      return h * 0.35 - val * h * 0.55;
    }
  },
  beats: {
    formulaLabel: 'ψ(t) = 2A cos(Δω t/2) cos(ω_avg t)',
    graph: (u, t, w, h) => {
      const env = Math.cos((u - 0.5) * Math.PI * 2);
      const car = Math.sin(u * Math.PI * 24);
      return -env * car * h * 0.42;
    }
  },
  packet: {
    formulaLabel: 'Ψ(x,0) = C e^(-x²/a²) e^(ik₀x)',
    graph: (u, t, w, h) => {
      const nx = (u - 0.5) * 5;
      const env = Math.exp(-nx * nx * 0.8);
      const car = Math.cos(nx * 12);
      return -env * car * h * 0.42;
    }
  },
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
  relativity: {
    formulaLabel: 'γ = 1 / √(1 - v²/c²)',
    graph: (u, t, w, h) => {
      const vc = u * 0.93;
      const gamma = 1 / Math.sqrt(1 - vc * vc);
      return h * 0.35 - (gamma - 1) * h * 0.4;
    }
  },
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
  tanx: {
    formulaLabel: 'y = tan(x)',
    graph: (u, t, w, h) => {
      const lt = (u - 0.5) * Math.PI * 0.9;
      const val = Math.tan(lt);
      return -Math.max(-5, Math.min(5, val)) * h * 0.15;
    }
  },
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
  optics: {
    formulaLabel: 'Diffraction: I = I₀ (sin(β)/β)²',
    graph: (u, t, w, h) => {
      const nx = (u - 0.5) * 15;
      const val = nx === 0 ? 1 : Math.pow(Math.sin(nx) / nx, 2);
      return h * 0.35 - val * h * 0.7;
    }
  },
  kinematics: {
    formulaLabel: 'v(t) = v₀ + a t',
    graph: (u, t, w, h) => h * 0.2 - u * h * 0.45
  },
  eulers: {
    formulaLabel: 'e^(iφ) = cos(φ) + i sin(φ)',
    graph: (u, t, w, h) => {
      const lt = u * Math.PI * 6;
      return -Math.sin(lt) * h * 0.35 * (1 - u * 0.5);
    }
  },
  straight: {
    formulaLabel: 'y = m x + c',
    graph: (u, t, w, h) => h * 0.2 - (u - 0.5) * h * 0.6
  },
  exponential: {
    formulaLabel: 'y = A e^(k x)',
    graph: (u, t, w, h) => {
      const val = Math.exp((u - 0.5) * 3);
      return h * 0.35 - val * h * 0.18;
    }
  },
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
  }
};
