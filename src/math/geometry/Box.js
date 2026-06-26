// src/math/geometry/Box.js

/**
 * Represents an axis-aligned bounding box (AABB) or an oriented bounding box.
 * For simplicity, this is an AABB defined by minimum and maximum corners.
 */
export class Box {
  constructor(min = [0, 0, 0], max = [1, 1, 1]) {
    this.min = min;
    this.max = max;
  }

  /** Get the center of the box */
  getCenter() {
    return [
      (this.min[0] + this.max[0]) / 2,
      (this.min[1] + this.max[1]) / 2,
      (this.min[2] + this.max[2]) / 2,
    ];
  }

  /** Get the extent (half-size) in each dimension */
  getExtent() {
    return [
      (this.max[0] - this.min[0]) / 2,
      (this.max[1] - this.min[1]) / 2,
      (this.max[2] - this.min[2]) / 2,
    ];
  }

  /** Check if a point is inside the box (including boundaries) */
  containsPoint(point) {
    return (
      point[0] >= this.min[0] && point[0] <= this.max[0] &&
      point[1] >= this.min[1] && point[1] <= this.max[1] &&
      point[2] >= this.min[2] && point[2] <= this.max[2]
    );
  }
}