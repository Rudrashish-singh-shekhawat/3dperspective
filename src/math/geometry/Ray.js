// src/math/geometry/Ray.js
import { subtract, normalize } from '../vector';

/**
 * Represents a ray in 3D space: origin + t * direction.
 */
export class Ray {
  constructor(origin = [0, 0, 0], direction = [0, 0, 1]) {
    this.origin = origin;
    this.direction = normalize(direction);
  }

  /** Get point at parameter t along the ray */
  at(t) {
    return [
      this.origin[0] + this.direction[0] * t,
      this.origin[1] + this.direction[1] * t,
      this.origin[2] + this.direction[2] * t,
    ];
  }
}