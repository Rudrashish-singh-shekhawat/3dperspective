import {
  FONT_FAMILY,
  WHITE,
  drawChalkText,
  drawChalkLine,
  drawAxes,
  drawDiagram,
  getWritingWidth
} from './chalkboardHelpers';

export function getBounds(type, x, y, fontSize, graphWidth, graphHeight, itemWidth, itemHeight) {
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
}

export function isOverlapping(item, testX, testY, items) {
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
}

export class ChalkItem {
  constructor() {
    this.state = 'WAITING';
    this.life = 0;
  }

  reset(ctx, width, height, isMobile, equations, curves, smudgeCache, items) {
    this.state = 'SPAWNING';
    this.life = 0;
    this.waitDelay = Math.random() * 150 + 50;
    
    const rand = Math.random();
    this.type = rand > 0.65 ? 'equation' : (rand > 0.3 ? 'graph' : 'diagram');
    this.opacity = Math.random() * 0.15 + 0.30;

    if (this.type === 'equation') {
      this.equation = equations[Math.floor(Math.random() * equations.length)];
      this.fontSize = isMobile 
        ? Math.min(18, Math.max(12, Math.random() * 4 + 12)) 
        : Math.min(24, Math.max(16, Math.random() * 6 + 16));
      
      ctx.save();
      ctx.font = `${this.fontSize}px ${FONT_FAMILY}`;
      this.itemWidth = ctx.measureText(this.equation).width;
      
      if (isMobile && this.itemWidth > 0 && this.itemWidth > width - 60) {
        this.fontSize = this.fontSize * ((width - 60) / this.itemWidth);
        ctx.font = `${this.fontSize}px ${FONT_FAMILY}`;
        this.itemWidth = ctx.measureText(this.equation).width;
      }
      ctx.restore();
      
      this.itemHeight = this.fontSize * 1.5;
      this.charsWritten = 0;
      this.writeSpeed = Math.random() * 0.08 + 0.04;

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
      this.cachedPoints = [];

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
      this.itemHeight = this.graphHeight + 35;

      const mapping = {
        circular: 'Circular Motion', pendulum: 'Simple Pendulum', optics: 'Refraction',
        prism: 'Optics: Prism', cell: 'Electrolytic Cell', thermo: 'dQ = dU + dW',
        fbd: 'Free Body Diagram', waves: 'Standing Waves', doubleSlit: 'Double Slit Interference',
        capacitor: 'Electric Field / Capacitor', bohr: 'Bohr Atom Model', magnetic: 'Solenoid Magnetic Field',
        circuit: 'Schematic Circuit', logic: 'Logic Gate (AND)', lens: 'Ray Optics: Lens',
        pythagorean: 'Pythagorean Theorem', newton2: "Newton's Second Law", projectile: 'Projectile Motion',
        roadBanking: 'Banking of Roads', springMass: 'Spring-Mass System', damped: 'Damped Oscillation',
        doppler: 'Doppler Effect', streamline: 'Streamline Flow', carnot: 'Carnot PV Cycle',
        transverse: 'Transverse Wave', induction: 'Electromagnetic Induction', photoelectric: 'Photoelectric Effect',
        spacetime: 'Spacetime Curvature', polar: 'Polar Coordinates', tangent: 'Tangent as Derivative',
        integral: 'Definite Integral Area', fourierSeries: 'Fourier Series (Square Wave)', argand: 'Argand Complex Plane'
      };
      this.formulaLabel = mapping[this.diagramType] || '';
    }

    const margin = 45;
    let attemptX = 0;
    let attemptY = 0;
    let found = false;

    for (let attempts = 0; attempts < 30; attempts++) {
      if (this.type === 'equation') {
        attemptX = margin + Math.random() * Math.max(10, width - this.itemWidth - margin * 2);
        attemptY = margin + Math.random() * Math.max(10, height - this.itemHeight - margin * 2);
      } else {
        attemptX = margin + Math.random() * Math.max(10, width - this.itemWidth - margin * 2);
        attemptY = margin + this.itemHeight / 2 + Math.random() * Math.max(10, height - this.itemHeight - margin * 2);
      }

      if (!isOverlapping(this, attemptX, attemptY, items)) {
        found = true;
        break;
      }
    }

    this.x = attemptX;
    this.y = attemptY;

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

  update(curves, addSmudge) {
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
        return true; // Request reset
      }
    }
    return false;
  }

  draw(ctx, globalTime, physicsDiagrams, mathDiagrams) {
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
      drawDiagram(ctx, this.diagramType, this.x, this.y, this.graphWidth, this.graphHeight, this.formulaLabel, this.diagramProgress, opacity, globalTime, physicsDiagrams, mathDiagrams);
    }
  }
}
