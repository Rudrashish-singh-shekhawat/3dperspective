import { useRef } from 'react';

export function usePendulumPhysics(initialL) {
  const physicsRef = useRef({
    theta: Math.PI / 4,
    omega: 0,
    l: initialL,
    pivotX: 0,
    pivotY: 0,
    trail: [],
    maxTrailLength: 80,
    drawProgress: 0,
    drawSpeed: 0.0015
  });

  const updatePhysics = (dt, width, height) => {
    const state = physicsRef.current;
    state.l = Math.min(height * 0.25, 200);
    state.pivotX = width * 0.5;
    state.pivotY = height * 0.5;

    if (state.drawProgress < 1) {
      state.drawProgress += state.drawSpeed;
    } else {
      // Real Physics (RK4 Integration)
      const pixelsPerMeter = 100; // 100 pixels = 1 meter
      const L_meters = state.l / pixelsPerMeter;
      const gravity = 9.81;
      const friction = 0.02; // Air resistance / friction at pivot

      // Acceleration function: d^2(theta)/dt^2 = -(g/L) * sin(theta) - friction * d(theta)/dt
      const getAlpha = (th, om) => -(gravity / L_meters) * Math.sin(th) - friction * om;

      const k1_omega = getAlpha(state.theta, state.omega);
      const k1_theta = state.omega;

      const k2_omega = getAlpha(state.theta + 0.5 * dt * k1_theta, state.omega + 0.5 * dt * k1_omega);
      const k2_theta = state.omega + 0.5 * dt * k1_omega;

      const k3_omega = getAlpha(state.theta + 0.5 * dt * k2_theta, state.omega + 0.5 * dt * k2_omega);
      const k3_theta = state.omega + 0.5 * dt * k2_omega;

      const k4_omega = getAlpha(state.theta + dt * k3_theta, state.omega + dt * k3_omega);
      const k4_theta = state.omega + dt * k3_omega;

      state.omega += (dt / 6) * (k1_omega + 2 * k2_omega + 2 * k3_omega + k4_omega);
      state.theta += (dt / 6) * (k1_theta + 2 * k2_theta + 2 * k3_theta + k4_theta);

      const px = state.pivotX + state.l * Math.sin(state.theta);
      const py = state.pivotY + state.l * Math.cos(state.theta);

      state.trail.push({ x: px, y: py });
      if (state.trail.length > state.maxTrailLength) {
        state.trail.shift();
      }
    }
  };

  return { physicsRef, updatePhysics };
}
