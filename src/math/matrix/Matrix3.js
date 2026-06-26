// src/math/matrix/Matrix3.js

/**
 * A 3×3 matrix class for basic operations.
 * Stored as a flat array in row-major order:
 * [m00, m01, m02, m10, m11, m12, m20, m21, m22]
 */
export class Matrix3 {
  constructor(elements) {
    if (elements) {
      this.elements = [...elements];
    } else {
      this.elements = [
        1, 0, 0,
        0, 1, 0,
        0, 0, 1,
      ];
    }
  }

  /** Access element at row i, column j (0-based) */
  get(i, j) {
    return this.elements[i * 3 + j];
  }

  /** Set element at row i, column j (0-based) */
  set(i, j, value) {
    this.elements[i * 3 + j] = value;
  }

  /** Reset to identity matrix */
  identity() {
    this.elements = [
      1, 0, 0,
      0, 1, 0,
      0, 0, 1,
    ];
    return this;
  }

  /** Multiply this matrix by another Matrix3 (immutable, returns new Matrix3) */
  multiply(other) {
    const a = this.elements;
    const b = other.elements;
    const result = new Array(9);
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        let sum = 0;
        for (let k = 0; k < 3; k++) {
          sum += a[i * 3 + k] * b[k * 3 + j];
        }
        result[i * 3 + j] = sum;
      }
    }
    return new Matrix3(result);
  }

  /** Transpose (immutable) */
  transpose() {
    const m = this.elements;
    return new Matrix3([
      m[0], m[3], m[6],
      m[1], m[4], m[7],
      m[2], m[5], m[8],
    ]);
  }

  /** Convert to flat array */
  toArray() {
    return [...this.elements];
  }
}