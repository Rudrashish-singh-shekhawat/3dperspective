export const curvesPart7 = {
  // Category: Topology & Geometry
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
