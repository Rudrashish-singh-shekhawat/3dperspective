import React, { useEffect, useRef } from 'react';

export default function EpicycleCanvas({ className = '' }) {
  const ref = useRef(null);
  
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const trail = [];
    let id;
    const arms = [
      { r: 60, speed: 1, color: 'rgba(168,85,247,0.8)' },
      { r: 30, speed: 3, color: 'rgba(59,130,246,0.7)' },
      { r: 15, speed: -5, color: 'rgba(34,197,94,0.6)' },
      { r: 8, speed: 7, color: 'rgba(251,191,36,0.5)' },
    ];

    const dpr = Math.min(2, window.devicePixelRatio || 1);
    let currentW = canvas.offsetWidth;
    let currentH = canvas.offsetHeight;
    const resizeObserver = new ResizeObserver(entries => {
      for (let entry of entries) {
        currentW = entry.contentRect.width;
        currentH = entry.contentRect.height;
      }
    });
    resizeObserver.observe(canvas);

    let isIntersecting = true;
    const observer = new IntersectionObserver(([entry]) => {
      isIntersecting = entry.isIntersecting;
    }, { threshold: 0.05 });
    observer.observe(canvas);

    const draw = (t) => {
      if (!isIntersecting) {
        id = requestAnimationFrame(draw);
        return;
      }
      const targetW = currentW * dpr;
      const targetH = currentH * dpr;
      if (canvas.width !== targetW || canvas.height !== targetH) {
        canvas.width = targetW;
        canvas.height = targetH;
        ctx.scale(dpr, dpr);
      }
      const w = currentW;
      const h = currentH;
      ctx.clearRect(0, 0, w, h);
      let cx = w * 0.35, cy = h / 2;
      const time = t * 0.001;
      for (const arm of arms) {
        ctx.beginPath();
        ctx.arc(cx, cy, arm.r * 2, 0, Math.PI * 2);
        ctx.strokeStyle = arm.color.replace(/[\d.]+\)$/, '0.15)');
        ctx.lineWidth = 1.5;
        ctx.stroke();
        const nx = cx + Math.cos(time * arm.speed) * arm.r * 2;
        const ny = cy + Math.sin(time * arm.speed) * arm.r * 2;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(nx, ny);
        ctx.strokeStyle = arm.color;
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(nx, ny, 4, 0, Math.PI * 2);
        ctx.fillStyle = arm.color;
        ctx.fill();
        cx = nx; cy = ny;
      }
      trail.push({ x: cx, y: cy });
      if (trail.length > 500) trail.shift();
      ctx.beginPath();
      for (let i = 0; i < trail.length; i++) {
        const p = trail[i];
        i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y);
      }
      ctx.strokeStyle = 'rgba(168,85,247,0.5)';
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.beginPath();
      ctx.setLineDash([4, 6]);
      ctx.moveTo(cx, cy);
      ctx.lineTo(w * 0.7, cy);
      ctx.strokeStyle = 'rgba(255,255,255,0.15)';
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.setLineDash([]);
      id = requestAnimationFrame(draw);
    };
    id = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(id);
      resizeObserver.disconnect();
      observer.disconnect();
    };
  }, []);

  return <canvas ref={ref} className={`w-full h-full ${className}`} />;
}
