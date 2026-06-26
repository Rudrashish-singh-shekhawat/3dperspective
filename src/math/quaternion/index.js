// src/math/quaternion/index.js

export { qMul } from './multiply';
export { qNorm } from './normalize';
export { qInv } from './inverse';
export { qConj } from './conjugate';
export { rotateV } from './rotateVector';
export { qAxisAngle } from './fromAxisAngle';
export { quatFromMatrixRows } from './fromMatrix';
export { quatToMatrix } from './toMatrix';
export { qSlerp } from './slerp';
export { quatFromVecs } from './fromVectors';