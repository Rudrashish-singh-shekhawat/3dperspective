import React, { useEffect, useRef } from 'react';
import { equations } from './equationsData';
import { curves, mathDiagrams } from './cuve';
import { physicsDiagrams } from './physicscurve';
import { ChalkSmudge } from './ChalkSmudge';
import { ChalkItem } from './ChalkItem';

export default function EquationsBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Load a clean, readable handwriting font
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Patrick+Hand&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    
    let width, height;
    let lastWidth = 0;
    let lastHeight = 0;
    let animationFrameId;
    const items = [];
    const smudges = [];
    let globalTime = 0;
    const smudgeCache = new Map();

    const addSmudge = (item) => {
      smudges.push(new ChalkSmudge(item, smudgeCache, physicsDiagrams, mathDiagrams));
      if (smudges.length > 20) {
        smudges.shift();
      }
    };

    const resize = () => {
      const parent = canvas.parentElement;
      const newWidth = parent ? parent.offsetWidth : window.innerWidth;
      const newHeight = parent ? parent.offsetHeight : window.innerHeight;

      const widthChanged = Math.abs(newWidth - lastWidth) > 30;
      const heightChanged = Math.abs(newHeight - lastHeight) > 250;

      if (lastWidth !== 0 && !widthChanged && !heightChanged) return;

      lastWidth = newWidth;
      lastHeight = newHeight;
      width = newWidth;
      height = newHeight;

      const isMobile = width < 768;
      const dpr = isMobile ? 1 : Math.min(2, window.devicePixelRatio || 1);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);

      const area = width * height;
      const targetCount = isMobile 
        ? Math.max(6, Math.min(12, Math.floor(area / 50000))) 
        : Math.max(5, Math.min(18, Math.floor(area / 180000)));

      while (items.length < targetCount) {
        const item = new ChalkItem();
        item.life = -Math.random() * 800;
        items.push(item);
      }
      while (items.length > targetCount) {
        items.pop();
      }

      items.forEach((item) => {
        if (item.x === undefined || item.y === undefined) {
          item.reset(ctx, width, height, isMobile, equations, curves, smudgeCache, items);
        } else {
          if (item.type === 'equation') {
            item.x = Math.max(20, Math.min(item.x, width - item.itemWidth - 20));
            item.y = Math.max(20, Math.min(item.y, height - item.itemHeight - 20));
          } else {
            item.x = Math.max(20, Math.min(item.x, width - item.itemWidth - 20));
            item.y = Math.max(item.itemHeight / 2 + 20, Math.min(item.y, height - item.itemHeight / 2 - 20));
          }
        }
      });
    };

    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const { width: newWidth, height: newHeight } = entry.contentRect;
        const widthChanged = Math.abs(newWidth - lastWidth) > 30;
        const heightChanged = Math.abs(newHeight - lastHeight) > 250;
        
        if (lastWidth === 0 || widthChanged || heightChanged) {
          resize();
        }
      }
    });

    if (canvas.parentElement) {
      resizeObserver.observe(canvas.parentElement);
    } else {
      window.addEventListener('resize', resize);
    }

    resize();

    const render = () => {
      globalTime++;

      ctx.clearRect(0, 0, width, height);

      // Render smudges first
      for (let i = smudges.length - 1; i >= 0; i--) {
        const s = smudges[i];
        try {
          s.update();
          if (s.life <= 0) {
            smudges.splice(i, 1);
          } else {
            s.draw(ctx);
          }
        } catch (e) {
          console.error("Error drawing smudge:", e);
          smudges.splice(i, 1);
        }
      }

      const isMobile = width < 768;
      items.forEach(p => {
        try {
          const shouldReset = p.update(curves, addSmudge);
          if (shouldReset) {
            p.reset(ctx, width, height, isMobile, equations, curves, smudgeCache, items);
          }
          p.draw(ctx, globalTime, physicsDiagrams, mathDiagrams);
        } catch (e) {
          console.error("Error drawing chalk item:", e);
          p.reset(ctx, width, height, isMobile, equations, curves, smudgeCache, items);
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      resizeObserver.disconnect();
      cancelAnimationFrame(animationFrameId);
      if (document.head.contains(link)) document.head.removeChild(link);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
    />
  );
}
