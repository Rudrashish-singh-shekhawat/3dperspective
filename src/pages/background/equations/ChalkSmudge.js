import { drawChalkText, drawAxes, drawChalkLine, drawDiagram } from './chalkboardHelpers';

export class ChalkSmudge {
  constructor(item, smudgeCache, physicsDiagrams, mathDiagrams) {
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
        drawDiagram(octx, item.diagramType, ox, oy, item.graphWidth, item.graphHeight, item.formulaLabel, 1.0, 0.4, 0, physicsDiagrams, mathDiagrams);
        drawDiagram(octx, item.diagramType, ox + 0.8, oy - 0.5, item.graphWidth, item.graphHeight, item.formulaLabel, 1.0, 0.2, 0, physicsDiagrams, mathDiagrams);
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
