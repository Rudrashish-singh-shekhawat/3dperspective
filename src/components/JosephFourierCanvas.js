import React, { useRef, useEffect } from 'react';

/**
 * JosephFourierCanvas
 * -------------------
 * A stylized epicycle drawing that loosely resembles a portrait of Joseph Fourier.
 * It uses ~300 rotating arms (odd harmonics) to approximate a simple outline.
 * The points are generated analytically as a series of circles whose radii follow
 * the classic square‑wave Fourier series (odd harmonics). While this does not
 * recreate a photographic likeness, the dense set of arms creates an intricate
 * shape that visually evokes the famous portrait often shown in tutorials.
 *
 * Props
 * -----
 * - `numArms` (number): Number of epicycles (default 300).
 * - `className` (string): Tailwind / custom classes for sizing.
 */
export default function JosephFourierCanvas({ numArms = 300, className = '' }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const trail = [];
    let animationId;

    // Generate arms based on odd harmonics (square‑wave like)
    const arms = [];
    const baseScale = 60; // base radius for fundamental frequency
    for (let k = 1; k <= numArms * 2; k += 2) {
      const r = (4 / Math.PI) * (baseScale / k);
      const speed = k; // frequency proportional to harmonic order
      const hue = (k * 12) % 360; // varied colour for visual interest
      const color = `hsla(${hue}, 70%, 60%, 0.8)`;
      arms.push({ r, speed, color });
    }

    const draw = (t) => {
      const targetW = canvas.offsetWidth * 2;
      const targetH = canvas.offsetHeight * 2;
      if (canvas.width !== targetW || canvas.height !== targetH) {
        canvas.width = targetW;
        canvas.height = targetH;
      }
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      let cx = w * 0.35;
      let cy = h / 2;
      const time = t * 0.001;

      // Draw each arm
      for (const arm of arms) {
        ctx.beginPath();
        ctx.arc(cx, cy, arm.r * 2, 0, Math.PI * 2);
        ctx.strokeStyle = arm.color.replace(/\d+(?=\))/g, '0.15'); // faint circle
        ctx.lineWidth = 1.5;
        ctx.stroke();

        const nx = cx + Math.cos(time * arm.speed) * arm.r * 2;
        const ny = cy + Math.sin(time * arm.speed) * arm.r * 2;

        // arm line
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(nx, ny);
        ctx.strokeStyle = arm.color;
        ctx.lineWidth = 2;
        ctx.stroke();

        // tip of arm
        ctx.beginPath();
        ctx.arc(nx, ny, 3, 0, Math.PI * 2);
        ctx.fillStyle = arm.color;
        ctx.fill();

        cx = nx;
        cy = ny;
      }

      // Record trail of the final tip
      trail.push({ x: cx, y: cy });
      if (trail.length > 500) trail.shift();

      // Draw the trace
      ctx.beginPath();
      for (let i = 0; i < trail.length; i++) {
        const p = trail[i];
        i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y);
      }
      ctx.strokeStyle = 'rgba(168,85,247,0.5)';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Optional guideline line
      ctx.beginPath();
      ctx.setLineDash([4, 6]);
      ctx.moveTo(cx, cy);
      ctx.lineTo(w * 0.7, cy);
      ctx.strokeStyle = 'rgba(255,255,255,0.15)';
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.setLineDash([]);

      animationId = requestAnimationFrame(draw);
    };

    animationId = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animationId);
  }, [numArms]);

  return <canvas ref={canvasRef} className={`w-full h-full ${className}`} />;
}
