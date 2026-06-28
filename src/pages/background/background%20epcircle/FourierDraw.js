import React, { useEffect, useRef } from 'react';
import { useFourierDrawState, STAGES, generatePathColor } from './useFourierDrawState';

export default function FourierDraw() {
    const trailCanvasRef = useRef(null);
    const mainCanvasRef = useRef(null);
    
    const stateRef = useFourierDrawState(trailCanvasRef, mainCanvasRef);

    useEffect(() => {
        const trailCanvas = trailCanvasRef.current;
        const mainCanvas = mainCanvasRef.current;
        if (!trailCanvas || !mainCanvas) return;
        const trailCtx = trailCanvas.getContext('2d', { alpha: true });
        const mainCtx = mainCanvas.getContext('2d', { alpha: true });
        
        let animationFrameId;
        const SPEED = 0.02; // Draw very slowly

        function render(timestamp) {
            const state = stateRef.current;

            // Safety check for async loaded data
            if (!state.activeEpicycles || state.activeEpicycles.length === 0) {
                animationFrameId = requestAnimationFrame(render);
                return;
            }

            const dtRaw = (timestamp - state.lastFrameTime) / 1000;
            state.lastFrameTime = timestamp;
            const dt = Math.min(dtRaw, 0.1);

            mainCtx.clearRect(0, 0, state.width, state.height);

            const cx = state.width / 2;
            const cy = state.height / 2;
            const epicycles = state.activeEpicycles;
            const epiCount = epicycles.length;

            // 1. UPDATE STATE MACHINE
            if (state.currentStage === STAGES.INITIAL_WAIT) {
                const elapsed = performance.now() - state.stageTimer;
                if (elapsed > 3000) {
                    state.currentStage = STAGES.DRAWING_CIRCLE;
                }
            } else if (state.currentStage === STAGES.DRAWING_CIRCLE) {
                state.circleDrawPercent += 0.02; // Circ. completes in 50 frames (~0.8s)
                if (state.circleDrawPercent >= 1.0) {
                    state.circleDrawPercent = 1.0;
                    state.currentStage = STAGES.DRAWING_ARM;
                    state.armDrawPercent = 0.0;
                }
            } else if (state.currentStage === STAGES.DRAWING_ARM) {
                state.armDrawPercent += 0.03; // Arm completes in 33 frames (~0.5s)
                if (state.armDrawPercent >= 1.0) {
                    state.armDrawPercent = 1.0;
                    state.currentStage = STAGES.ADDING_ARMS;
                    state.visibleArmsCount = 1;
                }
            } else if (state.currentStage === STAGES.ADDING_ARMS) {
                // First 30 arms are added slowly, then the rest are added fast
                if (state.visibleArmsCount <= 30) {
                    state.visibleArmsCount += 0.15; // ~0.1 seconds per arm, total ~3 seconds
                } else {
                    state.visibleArmsCount += 120; // Fast batch add
                }
                if (state.visibleArmsCount >= epiCount) {
                    state.visibleArmsCount = epiCount;
                    state.currentStage = STAGES.DRAWING;
                    state.time = 0;
                    trailCtx.clearRect(0, 0, state.width, state.height);
                    
                    // Initialize first tip coordinates at time = 0
                    let tx = cx;
                    let ty = cy;
                    for (let i = 0; i < epiCount; i++) {
                        const epi = epicycles[i];
                        tx += epi.amp * Math.cos(epi.phase);
                        ty += epi.amp * Math.sin(epi.phase);
                    }
                    state.lastTipX = tx;
                    state.lastTipY = ty;
                }
            } else if (state.currentStage === STAGES.DRAWING) {
                // Draw path slowly - no tail fade
                const dTime = SPEED * dt;
                const steps = Math.ceil(dTime * 1000);
                const stepSize = dTime / (steps || 1);
                
                let finalTipX = state.lastTipX;
                let finalTipY = state.lastTipY;
                let reachedEnd = false;

                for (let step = 0; step < steps; step++) {
                    state.time += stepSize;
                    if (state.time >= 1.0) {
                        state.time = 1.0;
                        reachedEnd = true;
                    }
                    const theta = 2 * Math.PI * state.time;

                    let x = cx;
                    let y = cy;
                    for (let i = 0; i < epiCount; i++) {
                        const epi = epicycles[i];
                        const angle = epi.freq * theta + epi.phase;
                        x += epi.amp * Math.cos(angle);
                        y += epi.amp * Math.sin(angle);
                    }

                    if (finalTipX !== undefined) {
                        trailCtx.strokeStyle = state.pathColor;
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

                state.lastTipX = finalTipX;
                state.lastTipY = finalTipY;

                if (reachedEnd) {
                    state.currentStage = STAGES.ERASING_EPICYCLES;
                    state.stageTimer = performance.now();
                }
            } else if (state.currentStage === STAGES.ERASING_EPICYCLES) {
                // Fade out epicycles over 1.5 seconds while trail remains
                const elapsed = performance.now() - state.stageTimer;
                if (elapsed > 1500) {
                    state.currentStage = STAGES.DRAWING_ONLY;
                    state.stageTimer = performance.now();
                }
            } else if (state.currentStage === STAGES.DRAWING_ONLY) {
                // Arms and circles disappear, drawing remains for 20 seconds
                const elapsed = performance.now() - state.stageTimer;
                if (elapsed > 20000) { // 20 seconds
                    state.currentStage = STAGES.FADING_OUT;
                    
                    // Reset time to 0 to trace the path again for erasing
                    state.time = 0;
                    // Reset final tip to the very beginning of the path
                    let tx = cx;
                    let ty = cy;
                    for (let i = 0; i < epiCount; i++) {
                        const epi = epicycles[i];
                        tx += epi.amp * Math.cos(epi.phase);
                        ty += epi.amp * Math.sin(epi.phase);
                    }
                    state.lastTipX = tx;
                    state.lastTipY = ty;
                }
            } else if (state.currentStage === STAGES.FADING_OUT) {
                // Erase path using destination-out
                const ERASE_SPEED = 0.3; // 3.3 seconds to erase
                const dTime = ERASE_SPEED * dt;
                const steps = Math.ceil(dTime * 1000);
                const stepSize = dTime / (steps || 1);
                
                let finalTipX = state.lastTipX;
                let finalTipY = state.lastTipY;
                let reachedEnd = false;

                for (let step = 0; step < steps; step++) {
                    state.time += stepSize;
                    if (state.time >= 1.0) {
                        state.time = 1.0;
                        reachedEnd = true;
                    }
                    const theta = 2 * Math.PI * state.time;

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
                        trailCtx.strokeStyle = state.pathColor;
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

                state.lastTipX = finalTipX;
                state.lastTipY = finalTipY;

                if (reachedEnd) {
                    state.currentStage = STAGES.WAIT_BEFORE_RESTART;
                    state.stageTimer = performance.now();
                    trailCtx.clearRect(0, 0, state.width, state.height);
                }
            } else if (state.currentStage === STAGES.WAIT_BEFORE_RESTART) {
                const elapsed = performance.now() - state.stageTimer;
                if (elapsed > 3000) {
                    state.currentStage = STAGES.DRAWING_CIRCLE;
                    state.circleDrawPercent = 0.0;
                    state.armDrawPercent = 0.0;
                    state.visibleArmsCount = 1;
                    state.time = 0;
                    state.pathColor = generatePathColor();
                }
            }

            // 2. RENDER STAGE CONTENT
            // Draw trail onto main canvas (with alpha if fading out)
            if (state.currentStage === STAGES.DRAWING || state.currentStage === STAGES.ERASING_EPICYCLES || state.currentStage === STAGES.DRAWING_ONLY || state.currentStage === STAGES.FADING_OUT) {
                mainCtx.drawImage(trailCanvas, 0, 0);
            }

            // Render arms and circles based on current stage
            if (epiCount > 0) {
                const mainEpi = epicycles[0];

                if (state.currentStage === STAGES.ERASING_EPICYCLES) {
                    const elapsed = performance.now() - state.stageTimer;
                    const alpha = Math.max(0, 1 - elapsed / 1500);
                    mainCtx.globalAlpha = alpha;
                }

                if (state.currentStage === STAGES.DRAWING_CIRCLE) {
                    // Draw drawing main circle arc
                    mainCtx.beginPath();
                    mainCtx.arc(cx, cy, mainEpi.amp, 0, Math.PI * 2 * state.circleDrawPercent);
                    mainCtx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
                    mainCtx.lineWidth = 2.5;
                    mainCtx.stroke();
                } 
                
                else if (state.currentStage === STAGES.DRAWING_ARM) {
                    // Draw full main circle
                    mainCtx.beginPath();
                    mainCtx.arc(cx, cy, mainEpi.amp, 0, Math.PI * 2);
                    mainCtx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
                    mainCtx.lineWidth = 2.5;
                    mainCtx.stroke();

                    // Draw drawing main arm
                    const angle = mainEpi.phase;
                    const nextX = cx + mainEpi.amp * Math.cos(angle) * state.armDrawPercent;
                    const nextY = cy + mainEpi.amp * Math.sin(angle) * state.armDrawPercent;
                    
                    mainCtx.beginPath();
                    mainCtx.moveTo(cx, cy);
                    mainCtx.lineTo(nextX, nextY);
                    mainCtx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
                    mainCtx.lineWidth = 2.0;
                    mainCtx.stroke();
                } 
                
                else if (state.currentStage === STAGES.ADDING_ARMS || state.currentStage === STAGES.DRAWING || state.currentStage === STAGES.ERASING_EPICYCLES) {
                    const theta = 2 * Math.PI * state.time;

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
                    const limit = (state.currentStage === STAGES.ADDING_ARMS) 
                        ? Math.min(Math.floor(state.visibleArmsCount), epiCount) 
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

                if (state.currentStage === STAGES.ERASING_EPICYCLES) {
                    mainCtx.globalAlpha = 1.0; // Reset alpha
                }
            }

            // Draw handwritten name label below drawing
            if (state.currentStage === STAGES.DRAWING_ONLY || state.currentStage === STAGES.FADING_OUT) {
                const textStr = "Joseph Fourier";
                mainCtx.save();
                
                // Use a different elegant cursive font
                mainCtx.font = "italic 40px 'Dancing Script', 'Great Vibes', 'Pacifico', cursive";
                const textWidth = mainCtx.measureText(textStr).width;
                const textX = cx - textWidth / 2;
                const textY = cy + state.drawingHeight / 2 + 30;

                let writeProgress = 1.0;

                if (state.currentStage === STAGES.DRAWING_ONLY) {
                    const elapsed = performance.now() - state.stageTimer;
                    // Write from left to right over 2.5 seconds
                    writeProgress = Math.min(1.0, elapsed / 2500); 
                } else if (state.currentStage === STAGES.FADING_OUT) {
                    // Erase from right to left perfectly in sync with the path erasing
                    writeProgress = Math.max(0, 1.0 - state.time); 
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
