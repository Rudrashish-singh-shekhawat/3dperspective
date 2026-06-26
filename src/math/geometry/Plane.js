// src/math/geometry/Plane.js
/**
 * Represents a plane in 3D space defined by a normal and a point.
 */
export class Plane {
  constructor(normal = [0, 0, 1], point = [0, 0, 0]) {
    this.normal = normal;
    this.point = point;
  }

  /** Signed distance from a point to the plane */
  distanceToPoint(point) {
    const [px, py, pz] = point;
    const [nx, ny, nz] = this.normal;
    const [ox, oy, oz] = this.point;
    return (nx * (px - ox) + ny * (py - oy) + nz * (pz - oz)) /
           Math.sqrt(nx * nx + ny * ny + nz * nz);
  }
}