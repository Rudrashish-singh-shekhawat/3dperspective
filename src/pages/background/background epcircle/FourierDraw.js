import React, { useEffect, useRef } from 'react';

import { getBaseEpicyclesAsync } from '../../../utils/fourierMath';

export default function FourierDraw() {
    const trailCanvasRef = useRef(null);
    const mainCanvasRef = useRef(null);
    
    useEffect(() => {
        const trailCanvas = trailCanvasRef.current;
        const mainCanvas = mainCanvasRef.current;
        const trailCtx = trailCanvas.getContext('2d', { alpha: true });
        const mainCtx = mainCanvas.getContext('2d', { alpha: true });
        
        let animationFrameId;
        const NUM_SAMPLES = 2048;
        const NUM_VECTORS = 2048; // Restored to 2048 arms
        const SPEED = 0.02; // Draw very slowly
        
        const STAGES = {
            INITIAL_WAIT: 'INITIAL_WAIT',
            DRAWING_CIRCLE: 'DRAWING_CIRCLE',
            DRAWING_ARM: 'DRAWING_ARM',
            ADDING_ARMS: 'ADDING_ARMS',
            DRAWING: 'DRAWING',
            ERASING_EPICYCLES: 'ERASING_EPICYCLES',
            DRAWING_ONLY: 'DRAWING_ONLY',
            FADING_OUT: 'FADING_OUT',
            WAIT_BEFORE_RESTART: 'WAIT_BEFORE_RESTART'
        };

        let currentStage = STAGES.INITIAL_WAIT;
        let circleDrawPercent = 0.0;
        let armDrawPercent = 0.0;
        let visibleArmsCount = 1;
        let time = 0;
        let stageTimer = performance.now();

        function generatePathColor() {
            const hue = Math.floor(Math.random() * 360);
            return `hsl(${hue}, 100%, 75%)`;
        }

        const engineState = {
            width: 0,
            height: 0,
            activeEpicycles: [],
            lastTip: null,
            lastFrameTime: performance.now(),
            drawingHeight: 0,
            pathColor: 'rgba(255, 255, 255, 0.95)' // Always white for the first drawing
        };

        let lastWidth = 0;
        let lastHeight = 0;

        function resize() {
            const newWidth = window.innerWidth;
            const newHeight = window.innerHeight;

            const widthChanged = Math.abs(newWidth - lastWidth) > 30;
            const heightChanged = Math.abs(newHeight - lastHeight) > 250;

            if (lastWidth !== 0 && !widthChanged && !heightChanged) return;

            lastWidth = newWidth;
            lastHeight = newHeight;

            engineState.width = mainCanvas.width = trailCanvas.width = newWidth;
            engineState.height = mainCanvas.height = trailCanvas.height = newHeight;
            trailCtx.clearRect(0, 0, engineState.width, engineState.height);
            loadShape();
        }

        function loadShape() {
            if (engineState.width === 0 || engineState.height === 0) return;
            
            getBaseEpicyclesAsync(NUM_SAMPLES).then(({ epicycles, bounds }) => {
                const scale = Math.min(
                    engineState.width / bounds.width,
                    engineState.height / bounds.height
                ) * 0.7;

                engineState.activeEpicycles = epicycles.slice(0, NUM_VECTORS).map(epi => ({
                    ...epi,
                    amp: epi.baseAmp * scale
                }));
                
                engineState.drawingHeight = bounds.height * scale;
                engineState.lastTip = null;
            });
        }

        window.addEventListener('resize', resize);
        resize();

        function render(timestamp) {
            // Safety check for async loaded data
            if (engineState.activeEpicycles.length === 0) {
                animationFrameId = requestAnimationFrame(render);
                return;
            }

            const dtRaw = (timestamp - engineState.lastFrameTime) / 1000;
            engineState.lastFrameTime = timestamp;
            const dt = Math.min(dtRaw, 0.1);

            mainCtx.clearRect(0, 0, engineState.width, engineState.height);

            const cx = engineState.width / 2;
            const cy = engineState.height / 2;
            const epicycles = engineState.activeEpicycles;
            const epiCount = epicycles.length;

            // 1. UPDATE STATE MACHINE
            if (currentStage === STAGES.INITIAL_WAIT) {
                const elapsed = performance.now() - stageTimer;
                if (elapsed > 3000) {
                    currentStage = STAGES.DRAWING_CIRCLE;
                }
            } else if (currentStage === STAGES.DRAWING_CIRCLE) {
                circleDrawPercent += 0.02; // Circ. completes in 50 frames (~0.8s)
                if (circleDrawPercent >= 1.0) {
                    circleDrawPercent = 1.0;
                    currentStage = STAGES.DRAWING_ARM;
                    armDrawPercent = 0.0;
                }
            } else if (currentStage === STAGES.DRAWING_ARM) {
                armDrawPercent += 0.03; // Arm completes in 33 frames (~0.5s)
                if (armDrawPercent >= 1.0) {
                    armDrawPercent = 1.0;
                    currentStage = STAGES.ADDING_ARMS;
                    visibleArmsCount = 1;
                }
            } else if (currentStage === STAGES.ADDING_ARMS) {
                // First 30 arms are added slowly, then the rest are added fast
                if (visibleArmsCount <= 30) {
                    visibleArmsCount += 0.15; // ~0.1 seconds per arm, total ~3 seconds
                } else {
                    visibleArmsCount += 120; // Fast batch add
                }
                if (visibleArmsCount >= epiCount) {
                    visibleArmsCount = epiCount;
                    currentStage = STAGES.DRAWING;
                    time = 0;
                    trailCtx.clearRect(0, 0, engineState.width, engineState.height);
                    
                    // Initialize first tip coordinates at time = 0
                    let tx = cx;
                    let ty = cy;
                    for (let i = 0; i < epiCount; i++) {
                        const epi = epicycles[i];
                        tx += epi.amp * Math.cos(epi.phase);
                        ty += epi.amp * Math.sin(epi.phase);
                    }
                    engineState.lastTipX = tx;
                    engineState.lastTipY = ty;
                }
            } else if (currentStage === STAGES.DRAWING) {
                // Draw path slowly - no tail fade
                const dTime = SPEED * dt;
                const steps = Math.ceil(dTime * 1000);
                const stepSize = dTime / (steps || 1);
                
                let finalTipX = engineState.lastTipX;
                let finalTipY = engineState.lastTipY;
                let reachedEnd = false;

                for (let step = 0; step < steps; step++) {
                    time += stepSize;
                    if (time >= 1.0) {
                        time = 1.0;
                        reachedEnd = true;
                    }
                    const theta = 2 * Math.PI * time;

                    let x = cx;
                    let y = cy;
                    for (let i = 0; i < epiCount; i++) {
                        const epi = epicycles[i];
                        const angle = epi.freq * theta + epi.phase;
                        x += epi.amp * Math.cos(angle);
                        y += epi.amp * Math.sin(angle);
                    }

                    if (finalTipX !== undefined) {
                        trailCtx.strokeStyle = engineState.pathColor;
                        trailCtx.lineWidth = 1.0;
                        trailCtx.lineCap = 'round';
                        trailCtx.lineJoin = 'round';
                        trailCtx.beginPath();
                        trailCtx.moveTo(finalTipX, finalTipY);
                        trailCtx.lineTo(x, y);
                        trailCtx.stroke();
                    }
                    
                    finalTipX = x;
                    finalTipY = y;
                    
                    if (reachedEnd) break;
                }

                engineState.lastTipX = finalTipX;
                engineState.lastTipY = finalTipY;

                if (reachedEnd) {
                    currentStage = STAGES.ERASING_EPICYCLES;
                    stageTimer = performance.now();
                }
            } else if (currentStage === STAGES.ERASING_EPICYCLES) {
                // Fade out epicycles over 1.5 seconds while trail remains
                const elapsed = performance.now() - stageTimer;
                if (elapsed > 1500) {
                    currentStage = STAGES.DRAWING_ONLY;
                    stageTimer = performance.now();
                }
            } else if (currentStage === STAGES.DRAWING_ONLY) {
                // Arms and circles disappear, drawing remains for 20 seconds
                const elapsed = performance.now() - stageTimer;
                if (elapsed > 20000) { // 20 seconds
                    currentStage = STAGES.FADING_OUT;
                    
                    // Reset time to 0 to trace the path again for erasing
                    time = 0;
                    // Reset final tip to the very beginning of the path
                    let tx = cx;
                    let ty = cy;
                    for (let i = 0; i < epiCount; i++) {
                        const epi = epicycles[i];
                        tx += epi.amp * Math.cos(epi.phase);
                        ty += epi.amp * Math.sin(epi.phase);
                    }
                    engineState.lastTipX = tx;
                    engineState.lastTipY = ty;
                }
            } else if (currentStage === STAGES.FADING_OUT) {
                // Erase path using destination-out
                const ERASE_SPEED = 0.3; // 3.3 seconds to erase
                const dTime = ERASE_SPEED * dt;
                const steps = Math.ceil(dTime * 1000);
                const stepSize = dTime / (steps || 1);
                
                let finalTipX = engineState.lastTipX;
                let finalTipY = engineState.lastTipY;
                let reachedEnd = false;

                for (let step = 0; step < steps; step++) {
                    time += stepSize;
                    if (time >= 1.0) {
                        time = 1.0;
                        reachedEnd = true;
                    }
                    const theta = 2 * Math.PI * time;

                    let x = cx;
                    let y = cy;
                    for (let i = 0; i < epiCount; i++) {
                        const epi = epicycles[i];
                        const angle = epi.freq * theta + epi.phase;
                        x += epi.amp * Math.cos(angle);
                        y += epi.amp * Math.sin(angle);
                    }

                    if (finalTipX !== undefined) {
                        // Thicker erase line to ensure clean removal
                        trailCtx.strokeStyle = engineState.pathColor;
                        trailCtx.lineWidth = 3.0; 
                        trailCtx.lineCap = 'round';
                        trailCtx.lineJoin = 'round';
                        trailCtx.globalCompositeOperation = 'destination-out';
                        trailCtx.beginPath();
                        trailCtx.moveTo(finalTipX, finalTipY);
                        trailCtx.lineTo(x, y);
                        trailCtx.stroke();
                        trailCtx.globalCompositeOperation = 'source-over';
                    }
                    
                    finalTipX = x;
                    finalTipY = y;
                    
                    if (reachedEnd) break;
                }

                engineState.lastTipX = finalTipX;
                engineState.lastTipY = finalTipY;

                if (reachedEnd) {
                    currentStage = STAGES.WAIT_BEFORE_RESTART;
                    stageTimer = performance.now();
                    trailCtx.clearRect(0, 0, engineState.width, engineState.height);
                }
            } else if (currentStage === STAGES.WAIT_BEFORE_RESTART) {
                const elapsed = performance.now() - stageTimer;
                if (elapsed > 3000) {
                    currentStage = STAGES.DRAWING_CIRCLE;
                    circleDrawPercent = 0.0;
                    armDrawPercent = 0.0;
                    visibleArmsCount = 1;
                    time = 0;
                    engineState.pathColor = generatePathColor();
                }
            }

            // 2. RENDER STAGE CONTENT
            // Draw trail onto main canvas (with alpha if fading out)
            if (currentStage === STAGES.DRAWING || currentStage === STAGES.ERASING_EPICYCLES || currentStage === STAGES.DRAWING_ONLY || currentStage === STAGES.FADING_OUT) {
                mainCtx.drawImage(trailCanvas, 0, 0);
            }

            // Render arms and circles based on current stage
            if (epiCount > 0) {
                const mainEpi = epicycles[0];

                if (currentStage === STAGES.ERASING_EPICYCLES) {
                    const elapsed = performance.now() - stageTimer;
                    const alpha = Math.max(0, 1 - elapsed / 1500);
                    mainCtx.globalAlpha = alpha;
                }

                if (currentStage === STAGES.DRAWING_CIRCLE) {
                    // Draw drawing main circle arc
                    mainCtx.beginPath();
                    mainCtx.arc(cx, cy, mainEpi.amp, 0, Math.PI * 2 * circleDrawPercent);
                    mainCtx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
                    mainCtx.lineWidth = 2.5;
                    mainCtx.stroke();
                } 
                
                else if (currentStage === STAGES.DRAWING_ARM) {
                    // Draw full main circle
                    mainCtx.beginPath();
                    mainCtx.arc(cx, cy, mainEpi.amp, 0, Math.PI * 2);
                    mainCtx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
                    mainCtx.lineWidth = 2.5;
                    mainCtx.stroke();

                    // Draw drawing main arm
                    const angle = mainEpi.phase;
                    const nextX = cx + mainEpi.amp * Math.cos(angle) * armDrawPercent;
                    const nextY = cy + mainEpi.amp * Math.sin(angle) * armDrawPercent;
                    
                    mainCtx.beginPath();
                    mainCtx.moveTo(cx, cy);
                    mainCtx.lineTo(nextX, nextY);
                    mainCtx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
                    mainCtx.lineWidth = 2.0;
                    mainCtx.stroke();
                } 
                
                else if (currentStage === STAGES.ADDING_ARMS || currentStage === STAGES.DRAWING || currentStage === STAGES.ERASING_EPICYCLES) {
                    const theta = 2 * Math.PI * time;

                    // Draw full main circle
                    mainCtx.beginPath();
                    mainCtx.arc(cx, cy, mainEpi.amp, 0, Math.PI * 2);
                    mainCtx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
                    mainCtx.lineWidth = 2.5;
                    mainCtx.stroke();

                    // Draw connecting arms chain (optimized to skip sub-pixel line segments)
                    let vx = cx;
                    let vy = cy;
                    let lastX = vx;
                    let lastY = vy;
                    const limit = (currentStage === STAGES.ADDING_ARMS) 
                        ? Math.min(Math.floor(visibleArmsCount), epiCount) 
                        : epiCount;

                    mainCtx.beginPath();
                    mainCtx.moveTo(vx, vy);
                    for (let i = 0; i < limit; i++) {
                        const epi = epicycles[i];
                        const angle = epi.freq * theta + epi.phase;
                        const nextX = vx + epi.amp * Math.cos(angle);
                        const nextY = vy + epi.amp * Math.sin(angle);
                        
                        const dx = nextX - lastX;
                        const dy = nextY - lastY;
                        // Only draw a line segment if it spans more than ~0.7px, or if it is the absolute final tip
                        if (dx * dx + dy * dy > 0.5 || i === limit - 1) {
                            mainCtx.lineTo(nextX, nextY);
                            lastX = nextX;
                            lastY = nextY;
                        }
                        vx = nextX;
                        vy = nextY;
                    }
                    mainCtx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
                    mainCtx.lineWidth = 2.0;
                    mainCtx.stroke();
                }

                if (currentStage === STAGES.ERASING_EPICYCLES) {
                    mainCtx.globalAlpha = 1.0; // Reset alpha
                }
            }

            // Draw handwritten name label below drawing
            if (currentStage === STAGES.DRAWING_ONLY || currentStage === STAGES.FADING_OUT) {
                const textStr = "Joseph Fourier";
                mainCtx.save();
                
                // Use a different elegant cursive font
                mainCtx.font = "italic 40px 'Dancing Script', 'Great Vibes', 'Pacifico', cursive";
                const textWidth = mainCtx.measureText(textStr).width;
                const textX = cx - textWidth / 2;
                const textY = cy + engineState.drawingHeight / 2 + 30;

                let writeProgress = 1.0;

                if (currentStage === STAGES.DRAWING_ONLY) {
                    const elapsed = performance.now() - stageTimer;
                    // Write from left to right over 2.5 seconds
                    writeProgress = Math.min(1.0, elapsed / 2500); 
                } else if (currentStage === STAGES.FADING_OUT) {
                    // Erase from right to left perfectly in sync with the path erasing
                    writeProgress = Math.max(0, 1.0 - time); 
                }
                
                // Create a clipping rectangle that grows/shrinks horizontally
                mainCtx.beginPath();
                mainCtx.rect(textX - 10, textY - 20, (textWidth + 20) * writeProgress, 100);
                mainCtx.clip();

                mainCtx.globalAlpha = 0.95;
                mainCtx.fillStyle = 'rgba(235, 235, 235, 1.0)'; // off-white
                mainCtx.textAlign = 'left';
                mainCtx.textBaseline = 'top';
                mainCtx.fillText(textStr, textX, textY);
                
                mainCtx.restore();
            }

            animationFrameId = requestAnimationFrame(render);
        }

        animationFrameId = requestAnimationFrame(render);

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <div className="absolute inset-0 pointer-events-none z-[-1] overflow-hidden bg-transparent">
            <canvas ref={trailCanvasRef} className="absolute inset-0 w-full h-full" style={{ zIndex: 1 }} />
            <canvas ref={mainCanvasRef} className="absolute inset-0 w-full h-full" style={{ zIndex: 2 }} />
        </div>
    );
}
