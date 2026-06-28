import React, { useEffect, useRef } from 'react';

export default function SquareWaveCanvas({ terms = 7, className = '' }) {
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
      ctx.strokeStyle = 'rgba(255,255,255,0.08)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      for (let x = 0; x < w; x++) {
        const phase = ((x / w) * 4 * Math.PI + t * 0.001) % (2 * Math.PI);
        const y = phase < Math.PI ? h * 0.25 : h * 0.75;
        x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.stroke();
      ctx.strokeStyle = '#a855f7';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      for (let x = 0; x < w; x++) {
        let val = 0;
        for (let n = 0; n < terms; n++) {
          const k = 2 * n + 1;
          val += (1 / k) * Math.sin(k * ((x / w) * 4 * Math.PI + t * 0.001));
        }
        const y = h / 2 - val * (h * 0.28);
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
  }, [terms]);

  return <canvas ref={ref} className={`w-full h-full ${className}`} />;
}
