// src/math/geometry/Circle.js
/**
 * Represents a circle in 3D space.
 * Used for geometric calculations, not rendering.
 */
export class Circle {
  constructor(center = [0, 0, 0], normal = [0, 0, 1], radius = 1) {
    this.center = center;
    this.normal = normal;
    this.radius = radius;
  }

  /** Check if a point is on the circle's circumference (within epsilon) */
  containsPoint(point, epsilon = 0.001) {
    const [px, py, pz] = point;
    const [cx, cy, cz] = this.center;
    const dist = Math.sqrt((px - cx) ** 2 + (py - cy) ** 2 + (pz - cz) ** 2);
    return Math.abs(dist - this.radius) < epsilon;
  }
}