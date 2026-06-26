/**
 * physics/lightEngine.js
 * ─────────────────────
 * A 2D light-and-shadow simulation engine.
 *
 * Models point-lights & spotlights with physical properties
 * (position, intensity, color, cone angle) and computes
 * text/element shadows cast by those lights onto a surface.
 *
 * Usage:
 *   import { createLight, computeShadow, computeSpotlightCone } from '../physics/lightEngine';
 *
 *   const light = createLight({ x: 500, y: 0, intensity: 1, color: [255,255,255] });
 *   const shadow = computeShadow(light, objectCenter, objectElevation);
 */

/* ─── Light Factory ─── */

/**
 * Create a light source descriptor.
 *
 * @param {object} opts
 * @param {number} opts.x          – X position in viewport px
 * @param {number} opts.y          – Y position in viewport px
 * @param {number} [opts.z=800]    – Height above the page surface (virtual Z axis)
 * @param {number} [opts.intensity=1]   – 0‑1 brightness multiplier
 * @param {number[]} [opts.color=[255,255,255]] – RGB array
 * @param {number} [opts.coneAngle=60]  – Spotlight half-angle in degrees
 * @param {string} [opts.type='spot']   – 'spot' | 'point'
 * @returns {object} light descriptor
 */
export function createLight({
  x = 0,
  y = 0,
  z = 800,
  intensity = 1,
  color = [255, 255, 255],
  coneAngle = 60,
  type = 'spot',
} = {}) {
  return { x, y, z, intensity, color, coneAngle, type };
}

/* ─── Shadow Computation ─── */

/**
 * Compute the CSS `text-shadow` (or `drop-shadow`) values for an object
 * illuminated by a single light source.
 *
 * The shadow is projected onto the "floor" plane (z = 0) using a simple
 * perspective projection from the light position through the object.
 *
 * @param {object} light           – Light descriptor from `createLight`
 * @param {{ x: number, y: number }} objectCenter – center of the element in viewport px
 * @param {number} [objectElevation=20] – virtual height of the text above the floor
 * @returns {{ offsetX: number, offsetY: number, blur: number, opacity: number, color: string }}
 */
export function computeShadow(light, objectCenter, objectElevation = 20) {
  // Vector from light to object (2D projection)
  const dx = objectCenter.x - light.x;
  const dy = objectCenter.y - light.y;

  // Distance between light and object (3D)
  const dist2D = Math.sqrt(dx * dx + dy * dy);
  const dist3D = Math.sqrt(dist2D * dist2D + light.z * light.z);

  // Shadow projection ratio: how far the shadow stretches
  // based on the height ratio  elevation / (lightZ - elevation)
  const effectiveZ = Math.max(light.z - objectElevation, 1);
  const projectionRatio = objectElevation / effectiveZ;

  // Shadow offset — in the direction away from the light
  const offsetX = dx * projectionRatio;
  const offsetY = dy * projectionRatio;

  // Shadow blur increases with distance and decreases with light height
  const blur = Math.max(4, (dist2D * 0.08) + (objectElevation * 0.5));

  // Shadow opacity — falls off with distance and light intensity
  const falloff = Math.max(0.15, 1 - dist3D / 2000);
  const opacity = Math.min(0.85, falloff * light.intensity);

  return {
    offsetX,
    offsetY,
    blur,
    opacity,
    color: `rgba(0, 0, 0, ${opacity.toFixed(3)})`,
  };
}

/**
 * Format a shadow result into a CSS `text-shadow` string.
 * Produces two layers — a crisp near-shadow and a soft far-shadow.
 *
 * @param {object} shadow – result of `computeShadow`
 * @returns {string} CSS text-shadow value
 */
export function formatTextShadow(shadow) {
  const { offsetX, offsetY, blur, opacity } = shadow;
  const near = `${offsetX.toFixed(1)}px ${offsetY.toFixed(1)}px ${blur.toFixed(1)}px rgba(0,0,0,${opacity.toFixed(3)})`;
  const far  = `${(offsetX * 2).toFixed(1)}px ${(offsetY * 2).toFixed(1)}px ${(blur * 2.5).toFixed(1)}px rgba(0,0,0,${(opacity * 0.4).toFixed(3)})`;
  return `${near}, ${far}`;
}

/**
 * Format a shadow result into a CSS `filter: drop-shadow(...)` string.
 * Useful for elements using `background-clip: text` where `text-shadow` doesn't work.
 *
 * @param {object} shadow – result of `computeShadow`
 * @returns {string} CSS filter value
 */
export function formatDropShadow(shadow) {
  const { offsetX, offsetY, blur, opacity } = shadow;
  return `drop-shadow(${offsetX.toFixed(1)}px ${offsetY.toFixed(1)}px ${blur.toFixed(1)}px rgba(0,0,0,${opacity.toFixed(3)}))`;
}

/* ─── Spotlight Cone ─── */

/**
 * Compute a CSS radial-gradient string that renders the visible
 * spotlight cone on the page surface.
 *
 * @param {object} light – Light descriptor
 * @returns {string} CSS background value
 */
export function computeSpotlightCone(light) {
  const { x, y, z, intensity, color, coneAngle } = light;
  const [r, g, b] = color;

  // Cone radius on the surface = z * tan(coneAngle)
  const coneRadiusPx = z * Math.tan((coneAngle * Math.PI) / 180);

  // Elongated ellipse — wider than tall to simulate a cone from above
  const ellipseW = coneRadiusPx;
  const ellipseH = coneRadiusPx * 1.8;

  const bright = (intensity * 0.07).toFixed(3);
  const mid    = (intensity * 0.02).toFixed(3);

  // Two-layer radial gradient for a natural falloff
  return [
    `radial-gradient(ellipse ${ellipseW.toFixed(0)}px ${ellipseH.toFixed(0)}px at ${x}px ${y}px, rgba(${r},${g},${b},${bright}) 0%, rgba(${r},${g},${b},${mid}) 40%, transparent 70%)`,
    `radial-gradient(ellipse ${(ellipseW * 0.6).toFixed(0)}px ${(ellipseH * 0.65).toFixed(0)}px at ${x}px ${y}px, rgba(${r},${g},${b},${(intensity * 0.05).toFixed(3)}) 0%, transparent 60%)`,
  ].join(', ');
}
