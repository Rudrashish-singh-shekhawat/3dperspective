import React, { useEffect, useRef } from 'react';
import { equations } from './equationsData';
import { curves, mathDiagrams } from './cuve';
import { physicsDiagrams } from './physicscurve';

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
    let slots = [];
    const items = [];
    const smudges = [];
    const FONT_FAMILY = "'Patrick Hand', cursive";
    let globalTime = 0;

    const addSmudge = (item) => {
      smudges.push(new ChalkSmudge(item));
      if (smudges.length > 20) {
        smudges.shift();
      }
    };

    const smudgeCache = new Map();

    class ChalkSmudge {
      constructor(item) {
        this.type = item.type;
        this.x = item.x;
        this.y = item.y;
        // Visible whitish chalk stain opacity
        this.opacity = Math.random() * 0.04 + 0.04;
        this.maxLife = 700 + Math.random() * 400;
        this.life = this.maxLife;

        this.itemWidth = item.itemWidth;
        this.itemHeight = item.itemHeight;

        // Cache dimensions
        const smearW = this.type === 'equation' ? this.itemWidth + 60 : item.graphWidth + 80;
        const smearH = this.type === 'equation' ? this.itemHeight * 2.2 : item.graphHeight * 1.4;
        this.smearW = smearW;
        this.smearH = smearH;

        // Render entirely to an offscreen canvas once (cache per type/equation)
        const cacheKey = item.equation || item.diagramType || item.formulaLabel || 'unknown';
        this.margin = 20;

        if (smudgeCache.has(cacheKey)) {
          this.cachedCanvas = smudgeCache.get(cacheKey);
        } else {
          const margin = this.margin;
          const cw = smearW + margin * 2;
          const ch = smearH + margin * 2;
          
          const oc = document.createElement('canvas');
          oc.width = cw;
          oc.height = ch;
          const octx = oc.getContext('2d');
          
          const grad = octx.createLinearGradient(margin, ch/2, margin + smearW, ch/2);
          grad.addColorStop(0, 'rgba(240, 240, 245, 0)');
          grad.addColorStop(0.2, `rgba(240, 240, 245, 0.12)`);
          grad.addColorStop(0.8, `rgba(240, 240, 245, 0.12)`);
          grad.addColorStop(1, 'rgba(240, 240, 245, 0)');
          
          octx.fillStyle = grad;
          octx.fillRect(margin, margin, smearW, smearH);

          const ox = margin + 20;
          const oy = ch / 2;

          if (this.type === 'equation') {
            drawChalkText(octx, item.equation, ox, oy, 0.45, item.fontSize);
            drawChalkText(octx, item.equation, ox + 0.8, oy - 0.6, 0.25, item.fontSize);
            drawChalkText(octx, item.equation, ox - 0.8, oy + 0.6, 0.25, item.fontSize);
          } else if (this.type === 'graph') {
            drawAxes(octx, ox, oy, item.graphWidth, item.graphHeight, 1.0, 0.3);
            drawChalkText(octx, item.formulaLabel, ox + 12, oy - item.graphHeight / 2 - 16, 0.3, 13);
            if (item.cachedPoints && item.cachedPoints.length > 1) {
              const localPts = item.cachedPoints.map(p => ({ x: p.x - item.x + ox, y: p.y - item.y + oy }));
              drawChalkLine(octx, localPts, 0.45, 1.6);
              const shifted1 = localPts.map(p => ({ x: p.x + 0.8, y: p.y - 0.5 }));
              drawChalkLine(octx, shifted1, 0.25, 2.0);
              const shifted2 = localPts.map(p => ({ x: p.x - 0.8, y: p.y + 0.5 }));
              drawChalkLine(octx, shifted2, 0.25, 2.0);
            }
          } else if (this.type === 'diagram') {
            drawDiagram(octx, item.diagramType, ox, oy, item.graphWidth, item.graphHeight, item.formulaLabel, 1.0, 0.4);
            drawDiagram(octx, item.diagramType, ox + 0.8, oy - 0.5, item.graphWidth, item.graphHeight, item.formulaLabel, 1.0, 0.2);
          }
          
          this.cachedCanvas = oc;
          smudgeCache.set(cacheKey, oc);
        }
      }

      update() {
        this.life--;
      }

      draw(ctx) {
        const ageRatio = this.life / this.maxLife;
        const currentOpacity = this.opacity * ageRatio;
        if (currentOpacity <= 0.005) return;

        ctx.save();
        ctx.globalAlpha = currentOpacity;
        ctx.drawImage(this.cachedCanvas, this.x - 20 - this.margin, this.y - this.smearH / 2 - this.margin);
        ctx.restore();
      }
    }



    const WHITE = 'rgba(255, 255, 255, ';
    const CYAN = 'rgba(100, 220, 255, ';
    const PURPLE = 'rgba(210, 100, 255, ';

    // Draw chalk text — solid white or colored, continuous, with subtle texture
    const drawChalkText = (ctx, text, x, y, opacity, fontSize, colorPrefix = WHITE) => {
      if (opacity <= 0.01 || !text) return;
      ctx.save();
      ctx.font = `${fontSize}px ${FONT_FAMILY}`;
      ctx.textAlign = 'left';
      ctx.textBaseline = 'middle';

      // Main solid fill
      ctx.fillStyle = `${colorPrefix}${opacity * 0.85})`;
      ctx.fillText(text, x, y);

      // A second slightly offset pass for chalk thickness variation
      ctx.fillStyle = `${colorPrefix}${opacity * 0.3})`;
      ctx.fillText(text, x + 0.4, y - 0.3);

      ctx.restore();
    };

    // Draw chalk line for graphs — solid white/colored, continuous
    const drawChalkLine = (ctx, points, opacity, thickness = 1.5, colorPrefix = WHITE, limit = points.length) => {
      if (limit < 2 || opacity <= 0.01) return;
      ctx.save();

      // Main path — solid continuous
      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);
      for (let i = 1; i < limit; i++) {
        ctx.lineTo(points[i].x, points[i].y);
      }
      ctx.strokeStyle = `${colorPrefix}${opacity * 0.8})`;
      ctx.lineWidth = thickness;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.stroke();

      // Subtle second pass with slight offset for chalk width
      ctx.beginPath();
      ctx.moveTo(points[0].x + 0.3, points[0].y + 0.3);
      for (let i = 1; i < limit; i++) {
        ctx.lineTo(points[i].x + 0.3, points[i].y + 0.3);
      }
      ctx.strokeStyle = `${colorPrefix}${opacity * 0.25})`;
      ctx.lineWidth = thickness + 0.5;
      ctx.stroke();

      ctx.restore();
    };

    // Draw axes for graphs
    const drawAxes = (ctx, ox, oy, w, h, progress, opacity) => {
      const p = Math.min(1, progress * 3.5);
      if (p <= 0) return;

      const rightX = ox + w + 10;
      const topY = oy - h / 2 - 10;

      // X axis
      drawChalkLine(ctx, [
        { x: ox - 10 * p, y: oy },
        { x: ox + (w + 10) * p, y: oy }
      ], opacity * 0.4, 1);

      // Y axis
      drawChalkLine(ctx, [
        { x: ox, y: oy + (h / 2 + 10) * p },
        { x: ox, y: oy - (h / 2 + 10) * p }
      ], opacity * 0.4, 1);

      if (p >= 1) {
        // X arrow
        drawChalkLine(ctx, [
          { x: rightX - 5, y: oy - 3 },
          { x: rightX, y: oy },
          { x: rightX - 5, y: oy + 3 }
        ], opacity * 0.35, 1);
        // Y arrow
        drawChalkLine(ctx, [
          { x: ox - 3, y: topY + 5 },
          { x: ox, y: topY },
          { x: ox + 3, y: topY + 5 }
        ], opacity * 0.35, 1);

        drawChalkText(ctx, 'x', rightX - 4, oy + 14, opacity * 0.4, 12);
        drawChalkText(ctx, 'y', ox - 14, topY + 4, opacity * 0.4, 12);
      }
    };

    const drawChalkArrow = (ctx, x1, y1, x2, y2, opacity, thickness = 1.5, colorPrefix = WHITE) => {
      drawChalkLine(ctx, [{ x: x1, y: y1 }, { x: x2, y: y2 }], opacity, thickness, colorPrefix);

      const angle = Math.atan2(y2 - y1, x2 - x1);
      const headLen = 6;
      const p1 = {
        x: x2 - headLen * Math.cos(angle - Math.PI / 6),
        y: y2 - headLen * Math.sin(angle - Math.PI / 6)
      };
      const p2 = {
        x: x2 - headLen * Math.cos(angle + Math.PI / 6),
        y: y2 - headLen * Math.sin(angle + Math.PI / 6)
      };
      drawChalkLine(ctx, [p1, { x: x2, y: y2 }, p2], opacity, thickness, colorPrefix);
    };

    const drawDiagram = (ctx, diagramType, x, y, graphWidth, graphHeight, formulaLabel, prog, opacity) => {
      if (prog > 0.1) {
        const labelChars = Math.floor(formulaLabel.length * Math.min(1, prog * 1.5));
        drawChalkText(ctx, formulaLabel.substring(0, labelChars), x, y - graphHeight / 2 - 16, opacity * 0.75, 13);
      }

      const helpers = { drawChalkLine, drawChalkText, drawChalkArrow, WHITE, CYAN, PURPLE };

      const physicsFn = physicsDiagrams[diagramType];
      if (physicsFn) {
        physicsFn(ctx, x, y, graphWidth, graphHeight, formulaLabel, prog, opacity, globalTime, helpers);
        return;
      }

      const mathFn = mathDiagrams[diagramType];
      if (mathFn) {
        mathFn(ctx, x, y, graphWidth, graphHeight, formulaLabel, prog, opacity, globalTime, helpers);
        return;
      }
    };

    // Measure writing width at a fractional character index
    const getWritingWidth = (text, progress, fontSize) => {
      const idx = Math.floor(progress);
      const frac = progress - idx;
      ctx.save();
      ctx.font = `${fontSize}px ${FONT_FAMILY}`;
      const baseWidth = ctx.measureText(text.substring(0, Math.min(idx, text.length))).width;
      if (idx < text.length) {
        const charW = ctx.measureText(text.charAt(idx)).width;
        ctx.restore();
        return baseWidth + charW * frac;
      }
      ctx.restore();
      return baseWidth;
    };

    const getBounds = (type, x, y, fontSize, graphWidth, graphHeight, itemWidth, itemHeight) => {
      if (type === 'equation') {
        return {
          x: x,
          y: y - fontSize * 0.8,
          w: itemWidth,
          h: fontSize * 1.6
        };
      } else {
        return {
          x: x,
          y: y - graphHeight / 2 - 20,
          w: graphWidth,
          h: graphHeight + 40
        };
      }
    };

    const isOverlapping = (item, testX, testY) => {
      const boundsA = getBounds(
        item.type,
        testX,
        testY,
        item.fontSize,
        item.graphWidth,
        item.graphHeight,
        item.itemWidth,
        item.itemHeight
      );

      const buffer = 45; // Minimum space gap between items

      for (const other of items) {
        if (other === item || other.x === undefined || other.y === undefined) continue;

        const boundsB = getBounds(
          other.type,
          other.x,
          other.y,
          other.fontSize,
          other.graphWidth,
          other.graphHeight,
          other.itemWidth,
          other.itemHeight
        );

        if (
          boundsA.x - buffer < boundsB.x + boundsB.w &&
          boundsA.x + boundsA.w + buffer > boundsB.x &&
          boundsA.y - buffer < boundsB.y + boundsB.h &&
          boundsA.y + boundsA.h + buffer > boundsB.y
        ) {
          return true;
        }
      }
      return false;
    };

    class ChalkItem {
      constructor() {
        this.state = 'WAITING';
        this.life = 0;
        this.reset();
      }

      reset() {
        this.state = 'SPAWNING';
        this.life = 0;
        this.waitDelay = Math.random() * 150 + 50;
        
        const rand = Math.random();
        this.type = rand > 0.65 ? 'equation' : (rand > 0.3 ? 'graph' : 'diagram');
        this.opacity = Math.random() * 0.15 + 0.30; // Increased opacity to make them whiter

        const currentW = width || window.innerWidth;
        const currentH = height || window.innerHeight;
        const isMobile = currentW < 768;

        // 1. Calculate properties first so bounds check functions correctly
        if (this.type === 'equation') {
          this.equation = equations[Math.floor(Math.random() * equations.length)];
          this.fontSize = isMobile ? Math.min(18, Math.max(12, Math.random() * 4 + 12)) : Math.min(24, Math.max(16, Math.random() * 6 + 16));
          ctx.save();
          ctx.font = `${this.fontSize}px ${FONT_FAMILY}`;
          this.itemWidth = ctx.measureText(this.equation).width;
          
          // Shrink font size if equation exceeds screen width on mobile
          if (isMobile && this.itemWidth > 0 && this.itemWidth > currentW - 60) {
            this.fontSize = this.fontSize * ((currentW - 60) / this.itemWidth);
            ctx.font = `${this.fontSize}px ${FONT_FAMILY}`;
            this.itemWidth = ctx.measureText(this.equation).width;
          }
          ctx.restore();
          
          this.itemHeight = this.fontSize * 1.5;
          this.charsWritten = 0;
          this.writeSpeed = Math.random() * 0.08 + 0.04;

          // Cache text render to avoid fillText calls per frame
          const cacheKey = 'text_' + this.equation + '_' + this.fontSize.toFixed(1);
          if (smudgeCache.has(cacheKey)) {
            this.cachedTextCanvas = smudgeCache.get(cacheKey);
          } else {
            const tc = document.createElement('canvas');
            tc.width = this.itemWidth + 20;
            tc.height = this.fontSize * 3;
            const tctx = tc.getContext('2d');
            drawChalkText(tctx, this.equation, 10, tc.height / 2, 1.0, this.fontSize);
            this.cachedTextCanvas = tc;
            smudgeCache.set(cacheKey, tc);
          }
        } else if (this.type === 'graph') {
          const graphs = Object.keys(curves);
          this.graphType = graphs[Math.floor(Math.random() * graphs.length)];
          this.graphProgress = 0;
          this.graphSpeed = Math.random() * 0.003 + 0.002;
          this.cachedPoints = []; // Precalculated coordinates

          let baseWidth = Math.min(220, Math.max(140, Math.random() * 80 + 140));
          if (isMobile) baseWidth *= 0.65;
          this.graphWidth = baseWidth;
          this.graphHeight = this.graphWidth * 0.6;
          this.itemWidth = this.graphWidth;
          this.itemHeight = this.graphHeight + 40;

          const curveData = curves[this.graphType];
          this.formulaLabel = curveData ? curveData.formulaLabel : '';
        } else if (this.type === 'diagram') {
          const diagrams = [
            'circular', 'pendulum', 'optics', 'prism', 'cell', 'thermo',
            'fbd', 'waves', 'doubleSlit', 'capacitor', 'bohr',
            'magnetic', 'circuit', 'logic', 'lens', 'pythagorean',
            'newton2', 'projectile', 'roadBanking', 'springMass', 'damped',
            'doppler', 'streamline', 'carnot', 'transverse', 'induction',
            'photoelectric', 'spacetime', 'polar', 'tangent', 'integral',
            'fourierSeries', 'argand'
          ];
          this.diagramType = diagrams[Math.floor(Math.random() * diagrams.length)];
          this.diagramProgress = 0;
          this.diagramSpeed = Math.random() * 0.003 + 0.002;

          let baseWidth = Math.min(220, Math.max(140, Math.random() * 80 + 140));
          if (isMobile) baseWidth *= 0.65;
          this.graphWidth = baseWidth;
          this.graphHeight = this.graphWidth * 0.7;
          this.itemWidth = this.graphWidth;
          this.itemHeight = this.graphHeight + 35; // margin for title

          if (this.diagramType === 'circular') this.formulaLabel = 'Circular Motion';
          else if (this.diagramType === 'pendulum') this.formulaLabel = 'Simple Pendulum';
          else if (this.diagramType === 'optics') this.formulaLabel = 'Refraction';
          else if (this.diagramType === 'prism') this.formulaLabel = 'Optics: Prism';
          else if (this.diagramType === 'cell') this.formulaLabel = 'Electrolytic Cell';
          else if (this.diagramType === 'thermo') this.formulaLabel = 'dQ = dU + dW';
          else if (this.diagramType === 'fbd') this.formulaLabel = 'Free Body Diagram';
          else if (this.diagramType === 'waves') this.formulaLabel = 'Standing Waves';
          else if (this.diagramType === 'doubleSlit') this.formulaLabel = 'Double Slit Interference';
          else if (this.diagramType === 'capacitor') this.formulaLabel = 'Electric Field / Capacitor';
          else if (this.diagramType === 'bohr') this.formulaLabel = 'Bohr Atom Model';
          else if (this.diagramType === 'magnetic') this.formulaLabel = 'Solenoid Magnetic Field';
          else if (this.diagramType === 'circuit') this.formulaLabel = 'Schematic Circuit';
          else if (this.diagramType === 'logic') this.formulaLabel = 'Logic Gate (AND)';
          else if (this.diagramType === 'lens') this.formulaLabel = 'Ray Optics: Lens';
          else if (this.diagramType === 'pythagorean') this.formulaLabel = 'Pythagorean Theorem';
          else if (this.diagramType === 'newton2') this.formulaLabel = "Newton's Second Law";
          else if (this.diagramType === 'projectile') this.formulaLabel = 'Projectile Motion';
          else if (this.diagramType === 'roadBanking') this.formulaLabel = 'Banking of Roads';
          else if (this.diagramType === 'springMass') this.formulaLabel = 'Spring-Mass System';
          else if (this.diagramType === 'damped') this.formulaLabel = 'Damped Oscillation';
          else if (this.diagramType === 'doppler') this.formulaLabel = 'Doppler Effect';
          else if (this.diagramType === 'streamline') this.formulaLabel = 'Streamline Flow';
          else if (this.diagramType === 'carnot') this.formulaLabel = 'Carnot PV Cycle';
          else if (this.diagramType === 'transverse') this.formulaLabel = 'Transverse Wave';
          else if (this.diagramType === 'induction') this.formulaLabel = 'Electromagnetic Induction';
          else if (this.diagramType === 'photoelectric') this.formulaLabel = 'Photoelectric Effect';
          else if (this.diagramType === 'spacetime') this.formulaLabel = 'Spacetime Curvature';
          else if (this.diagramType === 'polar') this.formulaLabel = 'Polar Coordinates';
          else if (this.diagramType === 'tangent') this.formulaLabel = 'Tangent as Derivative';
          else if (this.diagramType === 'integral') this.formulaLabel = 'Definite Integral Area';
          else if (this.diagramType === 'fourierSeries') this.formulaLabel = 'Fourier Series (Square Wave)';
          else if (this.diagramType === 'argand') this.formulaLabel = 'Argand Complex Plane';
        }

        // 2. Search for a non-overlapping random coordinate
        const margin = 45;
        let attemptX = 0;
        let attemptY = 0;
        let found = false;

        for (let attempts = 0; attempts < 30; attempts++) {
          if (this.type === 'equation') {
            attemptX = margin + Math.random() * Math.max(10, currentW - this.itemWidth - margin * 2);
            attemptY = margin + Math.random() * Math.max(10, currentH - this.itemHeight - margin * 2);
          } else {
            attemptX = margin + Math.random() * Math.max(10, currentW - this.itemWidth - margin * 2);
            attemptY = margin + this.itemHeight / 2 + Math.random() * Math.max(10, currentH - this.itemHeight - margin * 2);
          }

          if (!isOverlapping(this, attemptX, attemptY)) {
            found = true;
            break;
          }
        }

        this.x = attemptX;
        this.y = attemptY;

        // 3. Precalculate graph curve points to prevent array allocation and math recalculations inside the render loop
        if (this.type === 'graph') {
          this.cachedPoints = [];
          const numPts = Math.floor(this.graphWidth);
          for (let i = 0; i <= numPts; i++) {
            const u = i / this.graphWidth;
            let px = this.x + i, py = this.y;
            const t = u * Math.PI * 4;

            const curveFn = curves[this.graphType]?.graph;
            if (curveFn) {
              const res = curveFn(u, t, this.graphWidth, this.graphHeight, this.x, this.y);
              if (typeof res === 'object') {
                px = res.x;
                py = res.y;
              } else {
                py = this.y + res;
              }
            }
            this.cachedPoints.push({ x: px, y: py });
          }
        }
      }

      update() {
        this.life++;
        if (this.state === 'WAITING' || this.state === 'SPAWNING') {
          if (this.life > this.waitDelay) { this.state = 'DRAWING'; this.life = 0; }
        } else if (this.state === 'DRAWING') {
          if (this.type === 'equation') {
            this.charsWritten += this.writeSpeed;
            if (this.charsWritten >= this.equation.length + 15) { this.state = 'RESTING'; this.life = 0; }
          } else if (this.type === 'graph') {
            this.graphProgress += this.graphSpeed;
            if (this.graphProgress >= 1.15) { this.state = 'RESTING'; this.life = 0; }
          } else if (this.type === 'diagram') {
            this.diagramProgress += this.diagramSpeed;
            if (this.diagramProgress >= 1.15) { this.state = 'RESTING'; this.life = 0; }
          }
        } else if (this.state === 'RESTING') {
          if (this.life > 400 + Math.random() * 200) { this.state = 'ERASING'; this.life = 0; this.eraseFrames = 60 + Math.random() * 40; }
        } else if (this.state === 'ERASING') {
          if (this.life > this.eraseFrames) {
            addSmudge(this);
            this.reset();
          }
        }
      }

      draw() {
        if (this.state === 'WAITING' || this.state === 'SPAWNING' || this.x === undefined) return;

        let opacity = this.opacity;
        let eraseProgress = 0;

        if (this.state === 'ERASING') {
          eraseProgress = this.life / this.eraseFrames;
          opacity = this.opacity * (1 - eraseProgress);
        }

        if (this.type === 'equation') {
          const fullText = this.equation;
          const writingWidth = getWritingWidth(fullText, Math.min(this.charsWritten, fullText.length), this.fontSize);

          ctx.save();
          ctx.globalAlpha = opacity;
          ctx.beginPath();
          ctx.rect(this.x - 5, this.y - this.fontSize * 1.2, writingWidth + 5, this.fontSize * 2.4);
          ctx.clip();
          if (this.cachedTextCanvas) {
            ctx.drawImage(this.cachedTextCanvas, this.x - 10, this.y - this.cachedTextCanvas.height / 2);
          } else {
            drawChalkText(ctx, fullText, this.x, this.y, 1.0, this.fontSize);
          }
          ctx.restore();

        } else if (this.type === 'graph') {
          drawAxes(ctx, this.x, this.y, this.graphWidth, this.graphHeight, this.graphProgress, opacity);

          if (this.graphProgress > 0.3) {
            const curveProg = Math.min(1, (this.graphProgress - 0.3) / 0.7);

            const labelChars = Math.floor(this.formulaLabel.length * curveProg);
            drawChalkText(ctx, this.formulaLabel.substring(0, labelChars), this.x + 12, this.y - this.graphHeight / 2 - 16, opacity * 0.75, 13);

            const drawPtsCount = Math.floor(this.cachedPoints.length * curveProg);
            if (drawPtsCount > 1) {
              drawChalkLine(ctx, this.cachedPoints, opacity, 1.8, WHITE, drawPtsCount);
            }
          }
        } else if (this.type === 'diagram') {
          drawDiagram(ctx, this.diagramType, this.x, this.y, this.graphWidth, this.graphHeight, this.formulaLabel, this.diagramProgress, opacity);
        }
      }
    }

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
      // Cap DPR to 1 on mobile to prevent GPU strain, maximum 2 on desktop
      const dpr = isMobile ? 1 : Math.min(2, window.devicePixelRatio || 1);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);

      const area = width * height;
      // Ensure enough items on mobile so it doesn't look empty, but kept low enough to prevent lag
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
          item.reset();
        } else {
          // Adjust position to fit within new dimensions if resized
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

      // Render smudges first, so new chalk is written on top of them!
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

      items.forEach(p => {
        try {
          p.update();
          p.draw();
        } catch (e) {
          console.error("Error drawing chalk item:", e);
          p.reset();
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
