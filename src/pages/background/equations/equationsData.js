export const equations = [
  // --- CIRCULAR MOTION & KINEMATICS ---
  'a_c = v² / r',
  'F_c = m·v² / r',
  'ω = dθ / dt',
  'v = ω × r',
  'a_t = α × r',
  'x = x₀ + v₀t + ½at²',
  'v = v₀ + at',
  'v² = v₀² + 2a(x - x₀)',
  's = ut + ½at²',
  's = ((u + v)/2)·t',

  // --- NEWTON\'S LAWS OF MOTION ---
  'ΣF = m·a',
  'F₁₂ = -F₂₁',
  'p = m·v',
  'F = dp / dt',
  'f_s ≤ μ_s N',
  'f_k = μ_k N',
  'W = F · d = F d cos(θ)',
  'P = dW / dt = F · v',

  // --- SIMPLE HARMONIC MOTION ---
  'd²x/dt² + ω²x = 0',
  'x(t) = A cos(ωt + φ)',
  'v(t) = -Aω sin(ωt + φ)',
  'a(t) = -Aω² cos(ωt + φ)',
  'v = ±ω√(A² - x²)',
  'T = 2π√(m / k)',
  'T = 2π√(L / g)',
  'E_total = ½kA²',

  // --- WAVE OPTICS & RAY OPTICS ---
  'Path Diff = d sin(θ) = mλ',
  'Path Diff = d sin(θ) = (m + ½)λ',
  'I(θ) = 4I₀ cos²(φ / 2)',
  'β = λD / d',
  '1/f = 1/v + 1/u',
  'n₁ sin(θ₁) = n₂ sin(θ₂)',
  '1/f = (n - 1)(1/R₁ - 1/R₂)',
  'P = 1/f = P₁ + P₂',
  'sin(θ_c) = 1 / n',
  'm = -v / u = h_i / h_o',

  // --- THERMODYNAMICS ---
  'dU = dQ - dW',
  'PV = nRT',
  'W = ∫ P dV',
  'PV^γ = constant',
  'dS = dQ_rev / T',
  'C_p - C_v = R',
  'ΔS_univ = ΔS_sys + ΔS_surr ≥ 0',
  'η = 1 - T_C / T_H',

  // --- MODERN PHYSICS ---
  'E = hν = h c / λ',
  'K_max = hν - Φ',
  'λ = h / p = h / (m·v)',
  'Δx Δp ≥ ℏ / 2',
  'iℏ ∂Ψ/∂t = ĤΨ',
  'N(t) = N₀ e^(-λt)',
  'T_half = ln(2) / λ',
  'E² = (pc)² + (m₀c²)²',

  // --- ELECTROLYTIC EFFECT & NERNST ---
  'm = Z · I · t',
  'm ∝ Q',
  'F_const = N_A · e',
  'E = E° - (RT / nF) ln(Q)',
  'ΔG = -n F E_cell',
  'Λ_m = 1000 κ / M',

  // --- MODULATION ---
  's(t) = [A_c + m(t)] cos(2π f_c t)',
  'm = A_m / A_c',
  'f_USB = f_c + f_m',
  'f_LSB = f_c - f_m',
  's_FM(t) = A_c cos(2π f_c t + β sin(2π f_m t))',

  // --- GEOMETRIC SHAPES (MATH) ---
  'x² + y² = R²',
  '(x-h)² + (y-k)² = r²',
  'x²/a² + y²/b² = 1',
  'e = √(1 - b²/a²)',
  'x²/a² - y²/b² = 1',
  'e = √(1 + b²/a²)',
  'y² = 4ax',
  'x² = 4ay',
  'y = ax² + bx + c',
  'y = mx + c',
  'y - y₁ = m(x - x₁)',
  'Ax + By + C = 0',

  // --- COMPLEX & IMAGINARY NUMBERS ---
  'e^(iθ) = cos(θ) + i sin(θ)',
  'e^(iπ) + 1 = 0',
  'z = x + i y',
  'i² = -1',
  '|z| = √(x² + y²)',
  'z* = x - i y',
  'Re(z) = ½(z + z*)',
  'Im(z) = 1/(2i) (z - z*)',

  // --- EXPONENTIALS & TAN X ---
  'e^x = Σ (x^n / n!)',
  'd/dx(e^x) = e^x',
  'tan(x) = sin(x) / cos(x)',
  'd/dx(tan(x)) = sec²(x)',
  '∫ tan(x) dx = ln|sec(x)|',
  'tan(A + B) = (tan A + tan B) / (1 - tan A tan B)',

  // --- DIFFERENTIAL EQUATIONS & INTEGRALS ---
  'dy/dx = k·y',
  'd²y/dx² + P(x) dy/dx + Q(x) y = 0',
  '∫₀^∞ e^(-x²) dx = √π / 2',
  '∇·E = ρ / ε₀',
  '∇ × E = -∂B / ∂t',
  '∇·B = 0',
  '∇ × B = μ₀J + μ₀ε₀ ∂E/∂t',
  'Σₙ₌₁^∞ 1/n² = π² / 6'
];
