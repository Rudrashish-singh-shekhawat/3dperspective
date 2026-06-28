export function drawTrail(ctx, cachedPathX, cachedPathY, currentTime) {
    const totalSamples = 800;
    const drawCount = Math.floor(currentTime * totalSamples);
    const limitCount = Math.min(drawCount, 800);
    
    ctx.beginPath();
    ctx.moveTo(cachedPathX[0], cachedPathY[0]);
    for (let i = 1; i <= limitCount; i++) {
        ctx.lineTo(cachedPathX[i], cachedPathY[i]);
    }
    ctx.strokeStyle = 'rgba(168, 85, 247, 0.8)'; // Glowing purple
    ctx.lineWidth = 2.5;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.stroke();
}

export function drawEpicycles(ctx, cx, cy, currentTime, currentN, activeEpicycles, stateIsHolding, stateAutoProgress) {
    if (!stateIsHolding || !stateAutoProgress) {
        const theta = 2 * Math.PI * currentTime;
        let vx = cx;
        let vy = cy;

        const limit = Math.min(currentN, activeEpicycles.length);
        for (let i = 0; i < limit; i++) {
            const epi = activeEpicycles[i];
            if (!epi) continue;
            
            // Draw circle (adaptive opacity to prevent clutter)
            ctx.beginPath();
            ctx.arc(vx, vy, epi.amp, 0, Math.PI * 2);
            const circleOpacity = i < 5 ? 0.15 : (i < 30 ? 0.06 : 0.02);
            ctx.strokeStyle = `rgba(255, 255, 255, ${circleOpacity})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();

            const angle = epi.freq * theta + epi.phase;
            const nextX = vx + epi.amp * Math.cos(angle);
            const nextY = vy + epi.amp * Math.sin(angle);

            // Draw arm vector line
            const hue = (epi.freq * 12) % 360;
            ctx.beginPath();
            ctx.moveTo(vx, vy);
            ctx.lineTo(nextX, nextY);
            const armOpacity = i < 10 ? 0.65 : 0.3;
            ctx.strokeStyle = `hsla(${hue}, 70%, 60%, ${armOpacity})`;
            ctx.lineWidth = i < 10 ? 1.5 : 1.0;
            ctx.stroke();

            // Draw vector tip for the active end of the chain
            if (i === limit - 1) {
                ctx.beginPath();
                ctx.arc(nextX, nextY, 4, 0, Math.PI * 2);
                ctx.fillStyle = `hsla(${hue}, 80%, 65%, 0.95)`;
                ctx.fill();
            }

            vx = nextX;
            vy = nextY;
        }
    }
}
