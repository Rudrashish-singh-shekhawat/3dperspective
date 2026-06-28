import React, { useEffect, useRef } from 'react';

export default function SineWaveCanvas({ color = '#3b82f6', frequency = 1, amplitude = 1, className = '' }) {
  const ref = useRef(null);
  
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let id;

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
      ctx.strokeStyle = color;
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      for (let x = 0; x < w; x++) {
        const y = h / 2 + Math.sin((x / w) * Math.PI * 2 * frequency + t * 0.002) * (h / 2 - 10) * amplitude;
        x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.stroke();
      id = requestAnimationFrame(draw);
    };
    id = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(id);
      resizeObserver.disconnect();
      observer.disconnect();
    };
  }, [color, frequency, amplitude]);

  return <canvas ref={ref} className={`w-full h-full ${className}`} />;
}
