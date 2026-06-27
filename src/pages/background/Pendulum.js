import React, { useEffect, useRef } from 'react';

export default function Pendulum() {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -1000, y: -1000, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let width = canvas.offsetWidth;
    let height = canvas.offsetHeight;
    const dpr = window.devicePixelRatio || 1;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    // Pendulum physics
    let theta = Math.PI / 4;
    let omega = 0;
    const l = Math.min(height * 0.25, 200); // Length of the pendulum (reduced size)
    const g = 0.5;
    const damping = 0.9996;

    let pivotX = width * 0.5;
    let pivotY = height * 0.5; // Perfectly centered mathematically

    const trail = [];
    const maxTrailLength = 80;

    // Helpers
    const drawChalkLine = (x1, y1, x2, y2, opacity) => {
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.9})`; // Much brighter
      ctx.lineWidth = 4; // Thicker
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.5})`;
      ctx.lineWidth = 2;
      ctx.setLineDash([1, 3]);
      ctx.stroke();
      ctx.setLineDash([]);
    };

    const drawChalkCircle = (cx, cy, r, opacity, fill = false) => {
      if (fill) {
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity * 0.3})`;
        ctx.fill();
      }
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.9})`;
      ctx.lineWidth = 4;
      ctx.stroke();
    };

    const drawChalkText = (text, x, y, opacity, size = 18) => {
      ctx.font = `italic ${size}px 'Times New Roman', serif`;
      ctx.fillStyle = `rgba(255, 255, 255, ${opacity * 0.9})`;
      ctx.fillText(text, x, y);
    };

    const drawChalkArc = (cx, cy, r, startAngle, endAngle, opacity) => {
      ctx.beginPath();
      ctx.arc(cx, cy, r, startAngle, endAngle, startAngle > endAngle);
      ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.7})`;
      ctx.lineWidth = 2;
      ctx.stroke();
    };

    const drawChalkArrow = (x, y, angle, length, label, opacity, dashed = false) => {
      const endX = x + Math.cos(angle) * length;
      const endY = y + Math.sin(angle) * length;

      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(endX, endY);
      ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.9})`;
      ctx.lineWidth = 2;
      if (dashed) ctx.setLineDash([4, 4]);
      ctx.stroke();
      ctx.setLineDash([]);

      // Arrowhead
      const headlen = 8;
      ctx.beginPath();
      ctx.moveTo(endX, endY);
      ctx.lineTo(endX - headlen * Math.cos(angle - Math.PI / 6), endY - headlen * Math.sin(angle - Math.PI / 6));
      ctx.moveTo(endX, endY);
      ctx.lineTo(endX - headlen * Math.cos(angle + Math.PI / 6), endY - headlen * Math.sin(angle + Math.PI / 6));
      ctx.stroke();

      if (label) {
        // Offset text slightly from arrowhead
        const textX = endX + Math.cos(angle) * 20 - 10;
        const textY = endY + Math.sin(angle) * 20 + 5;
        drawChalkText(label, textX, textY, opacity, 16);
      }
    };

    // Mouse interactions
    const handleMouseMove = (e) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      mouseRef.current.active = true;
    };
    const handleMouseLeave = () => {
      mouseRef.current.active = false;
      mouseRef.current.x = -1000;
      mouseRef.current.y = -1000;
    };
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    const handleResize = () => {
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
      pivotX = width * 0.5;
      pivotY = height * 0.5;
    };
    window.addEventListener('resize', handleResize);

    let drawProgress = 0;
    const drawSpeed = 0.0015; // Scaled down to compensate for 60fps frame rate

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Handle drawing animation phase
      if (drawProgress < 1) {
        drawProgress += drawSpeed;
        
        // Fix position while drawing
        const px = pivotX + l * Math.sin(theta);
        const py = pivotY + l * Math.cos(theta);

        // 1. Draw support and pivot (0 - 0.2)
        if (drawProgress > 0) {
          const p1 = Math.min(1, drawProgress / 0.2);
          drawChalkLine(pivotX - 60 * p1, pivotY, pivotX + 60 * p1, pivotY, 0.4);
          drawChalkCircle(pivotX, pivotY, 6, 0.4 * p1);
          
          if (drawProgress < 0.2) { // Chalk dust
            ctx.fillStyle = `rgba(255,255,255,0.8)`;
            ctx.beginPath();
            ctx.arc(pivotX + 60 * p1, pivotY + (Math.random()-0.5)*4, 2, 0, Math.PI*2);
            ctx.fill();
          }
        }

        // 2. Draw equilibrium dashed line (0.2 - 0.4)
        if (drawProgress > 0.2) {
          const p2 = Math.min(1, (drawProgress - 0.2) / 0.2);
          const currentEqY = pivotY + (l + 30) * p2;
          
          ctx.beginPath();
          ctx.moveTo(pivotX, pivotY);
          ctx.lineTo(pivotX, currentEqY);
          ctx.strokeStyle = `rgba(255, 255, 255, 0.3)`;
          ctx.lineWidth = 2;
          ctx.setLineDash([8, 8]);
          ctx.stroke();
          ctx.setLineDash([]);
          
          if (drawProgress < 0.4) {
            ctx.fillStyle = `rgba(255,255,255,0.8)`;
            ctx.beginPath();
            ctx.arc(pivotX + (Math.random()-0.5)*4, currentEqY, 2, 0, Math.PI*2);
            ctx.fill();
          }
        }

        // 3. Draw string (0.4 - 0.6)
        if (drawProgress > 0.4) {
          const p3 = Math.min(1, (drawProgress - 0.4) / 0.2);
          const currentX = pivotX + (px - pivotX) * p3;
          const currentY = pivotY + (py - pivotY) * p3;
          
          drawChalkLine(pivotX, pivotY, currentX, currentY, 0.2);
          
          if (drawProgress < 0.6) {
            ctx.fillStyle = `rgba(255,255,255,0.8)`;
            ctx.beginPath();
            ctx.arc(currentX + (Math.random()-0.5)*2, currentY + (Math.random()-0.5)*2, 2, 0, Math.PI*2);
            ctx.fill();
          }
        }

        // 4. Draw Bob (0.6 - 0.7)
        if (drawProgress > 0.6) {
          const p4 = Math.min(1, (drawProgress - 0.6) / 0.1);
          drawChalkCircle(px, py, 18, 0.35 * p4, true);
          
          if (drawProgress < 0.7) {
            ctx.fillStyle = `rgba(255,255,255,0.8)`;
            ctx.beginPath();
            ctx.arc(px + Math.cos(p4 * Math.PI * 6) * 18, py + Math.sin(p4 * Math.PI * 6) * 18, 2, 0, Math.PI*2);
            ctx.fill();
          }
        }

        // 5. Draw Arc and Theta (0.7 - 0.85)
        if (drawProgress > 0.7) {
          const p5 = Math.min(1, (drawProgress - 0.7) / 0.15);
          const arcRadius = l * 0.35;
          const verticalAngle = Math.PI / 2;
          const stringAngle = Math.PI / 2 - theta;
          
          if (Math.abs(theta) > 0.05) {
            const currentStringAngle = verticalAngle + (stringAngle - verticalAngle) * p5;
            if (theta > 0) {
              drawChalkArc(pivotX, pivotY, arcRadius, currentStringAngle, verticalAngle, 0.5);
            } else {
              drawChalkArc(pivotX, pivotY, arcRadius, verticalAngle, currentStringAngle, 0.5);
            }
            
            if (p5 > 0.5) { // Show theta symbol halfway through arc drawing
              const textAngle = Math.PI / 2 - theta / 2;
              const textX = pivotX + (arcRadius + 15) * Math.cos(textAngle) - 5;
              const textY = pivotY + (arcRadius + 15) * Math.sin(textAngle) + 5;
              drawChalkText('θ', textX, textY, 0.8 * (p5 - 0.5) * 2);
            }
          }
        }

        // 6. Draw Force Vectors (0.85 - 1.0)
        if (drawProgress > 0.85) {
          const p6 = Math.min(1, (drawProgress - 0.85) / 0.15);
          const vecLength = 55 * p6; // Animate length growing (reduced size)
          const forceAngle = Math.atan2(py - pivotY, px - pivotX);
          
          drawChalkArrow(px, py, Math.PI / 2, vecLength, 'mg', 0.6 * p6, true);
          drawChalkArrow(px, py, forceAngle + Math.PI, vecLength, 'T', 0.6 * p6, false);
          drawChalkArrow(px, py, forceAngle, vecLength, 'mg cos θ', 0.5 * p6, true);
          
          if (Math.abs(theta) > 0.05) {
            const restoringAngle = forceAngle + Math.sign(theta) * (Math.PI / 2);
            drawChalkArrow(px, py, restoringAngle, vecLength * Math.sin(Math.abs(theta)), 'mg sin θ', 0.7 * p6, false);
          }
        }
        
      } else {
        // Real Physics (RK4 Integration)
        const dt = 1/60; // Assuming 60 FPS
        const pixelsPerMeter = 100; // 100 pixels = 1 meter
        const L_meters = l / pixelsPerMeter;
        const gravity = 9.81;
        const friction = 0.02; // Air resistance / friction at pivot

        // Acceleration function: d^2(theta)/dt^2 = -(g/L) * sin(theta) - friction * d(theta)/dt
        const getAlpha = (th, om) => -(gravity / L_meters) * Math.sin(th) - friction * om;

        const k1_omega = getAlpha(theta, omega);
        const k1_theta = omega;

        const k2_omega = getAlpha(theta + 0.5 * dt * k1_theta, omega + 0.5 * dt * k1_omega);
        const k2_theta = omega + 0.5 * dt * k1_omega;

        const k3_omega = getAlpha(theta + 0.5 * dt * k2_theta, omega + 0.5 * dt * k2_omega);
        const k3_theta = omega + 0.5 * dt * k2_omega;

        const k4_omega = getAlpha(theta + dt * k3_theta, omega + dt * k3_omega);
        const k4_theta = omega + dt * k3_omega;

        omega += (dt / 6) * (k1_omega + 2 * k2_omega + 2 * k3_omega + k4_omega);
        theta += (dt / 6) * (k1_theta + 2 * k2_theta + 2 * k3_theta + k4_theta);

        const px = pivotX + l * Math.sin(theta);
        const py = pivotY + l * Math.cos(theta);

        trail.push({ x: px, y: py });
        if (trail.length > maxTrailLength) {
          trail.shift();
        }

        for (let j = 1; j < trail.length; j++) {
          const alphaVal = (j / trail.length) * 0.15;
          drawChalkLine(trail[j - 1].x, trail[j - 1].y, trail[j].x, trail[j].y, alphaVal);
        }

        drawChalkLine(pivotX, pivotY, px, py, 0.2);
        
        // Draw rigid support (horizontal line)
        drawChalkLine(pivotX - 60, pivotY, pivotX + 60, pivotY, 0.4);

        // Draw equilibrium position (vertical dashed line)
        ctx.beginPath();
        ctx.moveTo(pivotX, pivotY);
        ctx.lineTo(pivotX, pivotY + l + 30);
        ctx.strokeStyle = `rgba(255, 255, 255, 0.3)`;
        ctx.lineWidth = 2;
        ctx.setLineDash([8, 8]);
        ctx.stroke();
        ctx.setLineDash([]);

        // Draw theta arc and text
        const arcRadius = l * 0.35;
        const verticalAngle = Math.PI / 2;
        const stringAngle = Math.PI / 2 - theta;
        
        if (Math.abs(theta) > 0.05) { // Only draw if angle is large enough to see
          if (theta > 0) {
            drawChalkArc(pivotX, pivotY, arcRadius, stringAngle, verticalAngle, 0.5);
          } else {
            drawChalkArc(pivotX, pivotY, arcRadius, verticalAngle, stringAngle, 0.5);
          }
          
          // Position theta text
          const textAngle = Math.PI / 2 - theta / 2;
          const textX = pivotX + (arcRadius + 15) * Math.cos(textAngle) - 5;
          const textY = pivotY + (arcRadius + 15) * Math.sin(textAngle) + 5;
          drawChalkText('θ', textX, textY, 0.8);
        }

        drawChalkCircle(pivotX, pivotY, 6, 0.4);
        drawChalkCircle(px, py, 18, 0.35, true);

        // Draw Force Vectors on the Bob
        const vecLength = 55; // Reduced size
        const forceAngle = Math.atan2(py - pivotY, px - pivotX); // Angle from pivot to bob
        
        // 1. mg (Gravity straight down)
        drawChalkArrow(px, py, Math.PI / 2, vecLength, 'mg', 0.6, true);
        
        // 2. T (Tension towards pivot)
        drawChalkArrow(px, py, forceAngle + Math.PI, vecLength, 'T', 0.6, false);
        
        // 3. mg cos θ (Radial outward component)
        drawChalkArrow(px, py, forceAngle, vecLength, 'mg cos θ', 0.5, true);
        
        // 4. mg sin θ (Restoring tangential component)
        if (Math.abs(theta) > 0.05) {
          const restoringAngle = forceAngle + Math.sign(theta) * (Math.PI / 2);
          drawChalkArrow(px, py, restoringAngle, vecLength * Math.sin(Math.abs(theta)), 'mg sin θ', 0.7, false);
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute -top-32 -bottom-48 left-0 right-0 w-full pointer-events-none z-[1]"
      style={{ height: 'calc(100% + 20rem)' }}
    />
  );
}
