import React, { useEffect, useRef } from 'react';
import { usePendulumPhysics } from '../../hooks/usePendulumPhysics';
import {
  drawChalkLine,
  drawChalkCircle,
  drawChalkText,
  drawChalkArc,
  drawChalkArrow
} from '../../utils/chalkHelpers';

export default function Pendulum() {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -1000, y: -1000, active: false });

  // Initialize pendulum length state using ref-based hook
  const { physicsRef, updatePhysics } = usePendulumPhysics(200);

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
    };
    window.addEventListener('resize', handleResize);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const dt = 1/60; // Assuming 60 FPS
      updatePhysics(dt, width, height);

      const state = physicsRef.current;
      const { pivotX, pivotY, l, theta, trail, drawProgress } = state;

      const px = pivotX + l * Math.sin(theta);
      const py = pivotY + l * Math.cos(theta);

      // Handle drawing animation phase
      if (drawProgress < 1) {
        // 1. Draw support and pivot (0 - 0.2)
        if (drawProgress > 0) {
          const p1 = Math.min(1, drawProgress / 0.2);
          drawChalkLine(ctx, pivotX - 60 * p1, pivotY, pivotX + 60 * p1, pivotY, 0.4);
          drawChalkCircle(ctx, pivotX, pivotY, 6, 0.4 * p1);
          
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
          
          drawChalkLine(ctx, pivotX, pivotY, currentX, currentY, 0.2);
          
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
          drawChalkCircle(ctx, px, py, 18, 0.35 * p4, true);
          
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
              drawChalkArc(ctx, pivotX, pivotY, arcRadius, currentStringAngle, verticalAngle, 0.5);
            } else {
              drawChalkArc(ctx, pivotX, pivotY, arcRadius, verticalAngle, currentStringAngle, 0.5);
            }
            
            if (p5 > 0.5) { // Show theta symbol halfway through arc drawing
              const textAngle = Math.PI / 2 - theta / 2;
              const textX = pivotX + (arcRadius + 15) * Math.cos(textAngle) - 5;
              const textY = pivotY + (arcRadius + 15) * Math.sin(textAngle) + 5;
              drawChalkText(ctx, 'θ', textX, textY, 0.8 * (p5 - 0.5) * 2);
            }
          }
        }

        // 6. Draw Force Vectors (0.85 - 1.0)
        if (drawProgress > 0.85) {
          const p6 = Math.min(1, (drawProgress - 0.85) / 0.15);
          const vecLength = 55 * p6;
          const forceAngle = Math.atan2(py - pivotY, px - pivotX);
          
          drawChalkArrow(ctx, px, py, Math.PI / 2, vecLength, 'mg', 0.6 * p6, true);
          drawChalkArrow(ctx, px, py, forceAngle + Math.PI, vecLength, 'T', 0.6 * p6, false);
          drawChalkArrow(ctx, px, py, forceAngle, vecLength, 'mg cos θ', 0.5 * p6, true);
          
          if (Math.abs(theta) > 0.05) {
            const restoringAngle = forceAngle + Math.sign(theta) * (Math.PI / 2);
            drawChalkArrow(ctx, px, py, restoringAngle, vecLength * Math.sin(Math.abs(theta)), 'mg sin θ', 0.7 * p6, false);
          }
        }
        
      } else {
        // Draw trailing path
        for (let j = 1; j < trail.length; j++) {
          const alphaVal = (j / trail.length) * 0.15;
          drawChalkLine(ctx, trail[j - 1].x, trail[j - 1].y, trail[j].x, trail[j].y, alphaVal);
        }

        drawChalkLine(ctx, pivotX, pivotY, px, py, 0.2);
        
        // Draw rigid support (horizontal line)
        drawChalkLine(ctx, pivotX - 60, pivotY, pivotX + 60, pivotY, 0.4);

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
            drawChalkArc(ctx, pivotX, pivotY, arcRadius, stringAngle, verticalAngle, 0.5);
          } else {
            drawChalkArc(ctx, pivotX, pivotY, arcRadius, verticalAngle, stringAngle, 0.5);
          }
          
          // Position theta text
          const textAngle = Math.PI / 2 - theta / 2;
          const textX = pivotX + (arcRadius + 15) * Math.cos(textAngle) - 5;
          const textY = pivotY + (arcRadius + 15) * Math.sin(textAngle) + 5;
          drawChalkText(ctx, 'θ', textX, textY, 0.8);
        }

        drawChalkCircle(ctx, pivotX, pivotY, 6, 0.4);
        drawChalkCircle(ctx, px, py, 18, 0.35, true);

        // Draw Force Vectors on the Bob
        const vecLength = 55;
        const forceAngle = Math.atan2(py - pivotY, px - pivotX);
        
        // 1. mg (Gravity straight down)
        drawChalkArrow(ctx, px, py, Math.PI / 2, vecLength, 'mg', 0.6, true);
        
        // 2. T (Tension towards pivot)
        drawChalkArrow(ctx, px, py, forceAngle + Math.PI, vecLength, 'T', 0.6, false);
        
        // 3. mg cos θ (Radial outward component)
        drawChalkArrow(ctx, px, py, forceAngle, vecLength, 'mg cos θ', 0.5, true);
        
        // 4. mg sin θ (Restoring tangential component)
        if (Math.abs(theta) > 0.05) {
          const restoringAngle = forceAngle + Math.sign(theta) * (Math.PI / 2);
          drawChalkArrow(ctx, px, py, restoringAngle, vecLength * Math.sin(Math.abs(theta)), 'mg sin θ', 0.7, false);
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
