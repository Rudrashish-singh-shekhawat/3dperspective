// src/math/matrix/Matrix4.js

/**
 * A 4×4 matrix class for 3D transformations.
 * Stored as a flat array in column-major order:
 * [m00, m10, m20, m30, m01, m11, m21, m31, m02, m12, m22, m32, m03, m13, m23, m33]
 *
 * This is compatible with WebGL conventions and the math used for camera transforms.
 */
export class Matrix4 {
  constructor(elements) {
    if (elements) {
      this.elements = [...elements];
    } else {
      // Identity matrix
      this.elements = [
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1,
      ];
    }
  }

  /** Access element at row i, column j (0-based) */
  get(i, j) {
    return this.elements[j * 4 + i];
  }

  /** Set element at row i, column j (0-based) */
  set(i, j, value) {
    this.elements[j * 4 + i] = value;
    return this;
  }

  /** Reset to identity matrix */
  identity() {
    this.elements = [
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1,
    ];
    return this;
  }

  /** Multiply this matrix by another Matrix4 (immutable) */
  multiply(other) {
    const a = this.elements;
    const b = other.elements;
    const result = new Array(16);
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        let sum = 0;
        for (let k = 0; k < 4; k++) {
          sum += a[k * 4 + i] * b[j * 4 + k];
        }
        result[j * 4 + i] = sum;
      }
    }
    return new Matrix4(result);
  }

  /** Transpose (immutable) */
  transpose() {
    const m = this.elements;
    return new Matrix4([
      m[0], m[4], m[8],  m[12],
      m[1], m[5], m[9],  m[13],
      m[2], m[6], m[10], m[14],
      m[3], m[7], m[11], m[15],
    ]);
  }

  /** Invert (immutable). Returns null if singular. */
  invert() {
    const m = this.elements;
    const inv = new Array(16);
    const det = this.determinant();
    if (Math.abs(det) < 1e-10) return null;

    const invDet = 1.0 / det;
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        // Cofactor
        const sub = [];
        let idx = 0;
        for (let k = 0; k < 4; k++) {
          if (k === i) continue;
          for (let l = 0; l < 4; l++) {
            if (l === j) continue;
            sub.push(m[l * 4 + k]);
          }
        }
        const det3x3 =
          sub[0] * (sub[4] * sub[8] - sub[5] * sub[7]) -
          sub[1] * (sub[3] * sub[8] - sub[5] * sub[6]) +
          sub[2] * (sub[3] * sub[7] - sub[4] * sub[6]);
        inv[i * 4 + j] = ((i + j) % 2 === 0 ? det3x3 : -det3x3) * invDet;
      }
    }
    return new Matrix4(inv);
  }

  /** Compute determinant */
  determinant() {
    const m = this.elements;
    const [
      m00, m01, m02, m03,
      m10, m11, m12, m13,
      m20, m21, m22, m23,
      m30, m31, m32, m33,
    ] = m;

    // Laplacian expansion along first column (column-major, so first column is m00,m10,m20,m30)
    return (
      m00 * (
        m11 * (m22 * m33 - m23 * m32) -
        m12 * (m21 * m33 - m23 * m31) +
        m13 * (m21 * m32 - m22 * m31)
      ) -
      m10 * (
        m01 * (m22 * m33 - m23 * m32) -
        m02 * (m21 * m33 - m23 * m31) +
        m03 * (m21 * m32 - m22 * m31)
      ) +
      m20 * (
        m01 * (m12 * m33 - m13 * m32) -
        m02 * (m11 * m33 - m13 * m31) +
        m03 * (m11 * m32 - m12 * m31)
      ) -
      m30 * (
        m01 * (m12 * m23 - m13 * m22) -
        m02 * (m11 * m23 - m13 * m21) +
        m03 * (m11 * m22 - m12 * m21)
      )
    );
  }

  /** Convert to flat array */
  toArray() {
    return [...this.elements];
  }
}