// src/math/geometry/Sphere.js

/**
 * Represents a sphere in 3D space.
 */
export class Sphere {
  constructor(center = [0, 0, 0], radius = 1) {
    this.center = center;
    this.radius = radius;
  }

  /** Check if a point is inside or on the sphere */
  containsPoint(point) {
    const dx = point[0] - this.center[0];
    const dy = point[1] - this.center[1];
    const dz = point[2] - this.center[2];
    return dx * dx + dy * dy + dz * dz <= this.radius * this.radius;
  }
}