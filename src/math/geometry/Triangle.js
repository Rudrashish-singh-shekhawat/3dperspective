// src/math/geometry/Triangle.js
import { subtract, cross, normalize } from '../vector';

/**
 * Represents a triangle in 3D space defined by three vertices.
 */
export class Triangle {
  constructor(a = [0, 0, 0], b = [1, 0, 0], c = [0, 1, 0]) {
    this.a = a;
    this.b = b;
    this.c = c;
  }

  /** Compute the face normal (right‑handed, assumes CCW winding). */
  getNormal() {
    const ab = subtract(this.b, this.a);
    const ac = subtract(this.c, this.a);
    return normalize(cross(ab, ac));
  }

  /** Compute the triangle's area. */
  getArea() {
    const ab = subtract(this.b, this.a);
    const ac = subtract(this.c, this.a);
    const crossProd = cross(ab, ac);
    return 0.5 * Math.hypot(...crossProd);
  }
}