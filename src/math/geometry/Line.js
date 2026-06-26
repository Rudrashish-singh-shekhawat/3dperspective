// src/math/geometry/Line.js
import { subtract, normalize } from '../vector';

/**
 * Represents an infinite line in 3D space defined by a point and a direction.
 */
export class Line {
  constructor(point = [0, 0, 0], direction = [0, 0, 1]) {
    this.point = point;
    this.direction = normalize(direction);
  }

  /** Get a point at parameter t along the line */
  at(t) {
    return [
      this.point[0] + this.direction[0] * t,
      this.point[1] + this.direction[1] * t,
      this.point[2] + this.direction[2] * t,
    ];
  }

  /** Compute the closest point on this line to another point */
  closestPointTo(target) {
    const p = this.point;
    const d = this.direction;
    const t = (target[0] - p[0]) * d[0] + (target[1] - p[1]) * d[1] + (target[2] - p[2]) * d[2];
    return this.at(t);
  }

  /** Distance from this line to a point */
  distanceTo(target) {
    const closest = this.closestPointTo(target);
    const dx = target[0] - closest[0];
    const dy = target[1] - closest[1];
    const dz = target[2] - closest[2];
    return Math.sqrt(dx * dx + dy * dy + dz * dz);
  }
}