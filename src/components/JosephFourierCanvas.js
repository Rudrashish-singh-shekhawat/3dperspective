import React, { useRef, useEffect, useState } from 'react';
import { getBaseEpicyclesAsync } from '../utils/fourierMath';
import { FIBONACCI_TERMS, findClosestFibIndex } from './JosephFourierCanvas/fourierConstants';
import { drawTrail, drawEpicycles } from './JosephFourierCanvas/drawHelpers';

export default function JosephFourierCanvas({ className = '' }) {
    const canvasRef = useRef(null);

    // React state for sync with slider UI
    const [sliderN, setSliderN] = useState(1);
    const [isPlaying, setIsPlaying] = useState(true);
    const [autoProgress, setAutoProgress] = useState(true);

    // Mutable ref for high-performance animation thread variables
    const stateRef = useRef({
        fibIndex: 0,
        n: FIBONACCI_TERMS[0],
        time: 0,
        isHolding: false,
        holdTimer: 0,
        isPlaying: true,
        autoProgress: true
    });

    // Handle slider change from UI (allows any value from 1 to 2048)
    const handleSliderChange = (e) => {
        const val = parseInt(e.target.value);
        setSliderN(val);
        
        stateRef.current.n = val;
        stateRef.current.fibIndex = findClosestFibIndex(val);
        
        // LOCK to manual constant value: disable Fibonacci auto-progress
        stateRef.current.autoProgress = false;
        setAutoProgress(false);
        
        // Do not reset time here! This allows the arms to continue rotating seamlessly
        stateRef.current.isHolding = false;
        
        // Keep the arms rotating
        setIsPlaying(true);
        stateRef.current.isPlaying = true;
    };

    // Handle play/pause
    const togglePlay = () => {
        const nextPlaying = !isPlaying;
        setIsPlaying(nextPlaying);
        stateRef.current.isPlaying = nextPlaying;
        
        if (nextPlaying) {
            // When resuming, restore automatic Fibonacci progression
            stateRef.current.autoProgress = true;
            setAutoProgress(true);
            stateRef.current.time = 0;
            stateRef.current.isHolding = false;
        }
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let animationId;
        
        // Track whether canvas is visible in viewport
        let isIntersecting = true;
        let observer;

        const checkScrollIntersection = () => {
            if (!isIntersecting) {
                const rect = canvas.getBoundingClientRect();
                const viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
                const visible = !(rect.bottom < 0 || rect.top - viewHeight >= 0);
                if (visible) {
                    isIntersecting = true;
                }
            }
        };

        if (window.IntersectionObserver) {
            observer = new IntersectionObserver(
                ([entry]) => {
                    isIntersecting = entry.isIntersecting;
                },
                { threshold: 0.0 }
            );
            observer.observe(canvas);
        } else {
            // Fallback for environments where IntersectionObserver is missing or fails
            window.addEventListener('scroll', checkScrollIntersection, { passive: true });
            window.addEventListener('resize', checkScrollIntersection, { passive: true });
            checkScrollIntersection();
        }
        
        const NUM_SAMPLES = 2048;

        // Cache coordinates of the trail for current n
        let lastCachedN = -1;
        let lastCachedW = -1;
        let lastCachedH = -1;
        let cachedPathX = new Float32Array(801);
        let cachedPathY = new Float32Array(801);

        let lastFrameTime = performance.now();
        let lastSyncedN = 1;
        let lastSyncedAutoProgress = true;

        // Load epicycles asynchronously so we don't freeze the page rendering
        let rawEpicycles = [];
        let bounds = null;

        getBaseEpicyclesAsync(NUM_SAMPLES).then((result) => {
            rawEpicycles = result.epicycles;
            bounds = result.bounds;
            lastFrameTime = performance.now();
            animationId = requestAnimationFrame(draw);
        });

        const draw = (timestamp) => {
            const dtRaw = (timestamp - lastFrameTime) / 1000;
            lastFrameTime = timestamp;
            const dt = Math.min(dtRaw, 0.1);

            // Skip rendering & calculations when off-screen to save mobile CPU/GPU
            if (!isIntersecting) {
                animationId = requestAnimationFrame(draw);
                return;
            }

            // Safety check for async loaded data
            if (rawEpicycles.length === 0 || !bounds) {
                animationId = requestAnimationFrame(draw);
                return;
            }

            // Responsive sizing (double resolution for crisp rendering)
            const targetW = canvas.offsetWidth * 2;
            const targetH = canvas.offsetHeight * 2;
            if (canvas.width !== targetW || canvas.height !== targetH) {
                canvas.width = targetW;
                canvas.height = targetH;
            }

            const w = canvas.width;
            const h = canvas.height;
            ctx.clearRect(0, 0, w, h);

            const cx = w / 2;
            const cy = h / 2;

            const scale = Math.min(w / bounds.width, h / bounds.height) * 0.75;
            
            // Map unscaled to current size
            const activeEpicycles = rawEpicycles.slice(0, NUM_SAMPLES).map(epi => ({
                ...epi,
                amp: epi.baseAmp * scale
            }));

            const state = stateRef.current;

            // Update thread speed & sequence transitions
            if (state.isPlaying) {
                const currentSpeed = 0.2; // Constant speed: completes in 5s
                
                if (state.autoProgress) {
                    // --- FIBONACCI MODE ---
                    if (!state.isHolding) {
                        state.time += currentSpeed * dt;

                        if (state.time >= 1.0) {
                            state.time = 1.0;
                            if (state.fibIndex < FIBONACCI_TERMS.length - 1) {
                                state.fibIndex++;
                                state.n = FIBONACCI_TERMS[state.fibIndex];
                                state.time = 0;
                            } else {
                                // Completed full detail! Hold for 5s
                                state.isHolding = true;
                                state.holdTimer = performance.now();
                            }
                        }
                    } else {
                        if (performance.now() - state.holdTimer > 5000) {
                            state.fibIndex = 0;
                            state.n = FIBONACCI_TERMS[0];
                            state.time = 0;
                            state.isHolding = false;
                        }
                    }
                } else {
                    // --- FIXED / CONSTANT MODE ---
                    state.time += currentSpeed * dt;
                    // Time grows indefinitely! This allows the arms to keep spinning 
                    // and tracing the fully drawn shape forever.
                }
            }

            // Sync values to React states
            if (state.n !== lastSyncedN) {
                lastSyncedN = state.n;
                setSliderN(state.n);
            }
            if (state.autoProgress !== lastSyncedAutoProgress) {
                lastSyncedAutoProgress = state.autoProgress;
                setAutoProgress(state.autoProgress);
            }

            const currentN = state.n;
            const currentTime = state.time;

            // Cache full 800-point path coordinates for the current "n"
            // Optimization: Zero-allocation typed arrays + incremental calculation
            if (currentN !== lastCachedN || w !== lastCachedW || h !== lastCachedH) {
                const totalSamples = 800;
                let startEpi = 0;

                if (w !== lastCachedW || h !== lastCachedH) {
                    lastCachedN = 0; // Force full recalculation on resize
                }

                if (currentN > lastCachedN && lastCachedN > 0) {
                    // Incremental addition of new epicycles
                    startEpi = lastCachedN;
                } else {
                    // Full recalculation
                    for (let s = 0; s <= totalSamples; s++) {
                        cachedPathX[s] = cx;
                        cachedPathY[s] = cy;
                    }
                }

                const limit = Math.min(currentN, activeEpicycles.length);
                if (startEpi < limit) {
                    for (let s = 0; s <= totalSamples; s++) {
                        const theta = 2 * Math.PI * (s / totalSamples);
                        let x = cachedPathX[s];
                        let y = cachedPathY[s];
                        for (let i = startEpi; i < limit; i++) {
                            const epi = activeEpicycles[i];
                            const angle = epi.freq * theta + epi.phase;
                            x += epi.amp * Math.cos(angle);
                            y += epi.amp * Math.sin(angle);
                        }
                        cachedPathX[s] = x;
                        cachedPathY[s] = y;
                    }
                }
                
                lastCachedN = currentN;
                lastCachedW = w;
                lastCachedH = h;
            }

            // --- DRAWING ---
            
            // 1. Draw progressive trail
            if (lastCachedN > 0) {
                drawTrail(ctx, cachedPathX, cachedPathY, currentTime);
            }

            // 2. Draw rotating epicycle apparatus (hidden if holding in auto-play mode)
            drawEpicycles(ctx, cx, cy, currentTime, currentN, activeEpicycles, state.isHolding, state.autoProgress);

            // 3. Draw text label showing current arm count in the top-left corner
            ctx.save();
            ctx.font = "bold 20px monospace";
            ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
            ctx.textAlign = "left";
            ctx.textBaseline = "top";
            ctx.fillText(`Arms: ${currentN}`, 20, 20);
            ctx.restore();

            animationId = requestAnimationFrame(draw);
        };

        return () => {
            if (observer) observer.disconnect();
            window.removeEventListener('scroll', checkScrollIntersection);
            window.removeEventListener('resize', checkScrollIntersection);
            cancelAnimationFrame(animationId);
        };
    }, []);

    return (
        <div className="flex flex-col gap-4 w-full">
            {/* Canvas Wrapper */}
            <div className={`relative w-full bg-[#0c0f0d]/80 rounded-xl overflow-hidden border border-white/10 shadow-2xl backdrop-blur-sm ${className}`}>
                <canvas ref={canvasRef} className="w-full h-full" />
            </div>

            {/* Interactive Controls Panel */}
            <div className="flex flex-col justify-center px-4 py-4 bg-white/5 rounded-xl border border-white/10 backdrop-blur-md">
                <input
                    type="range"
                    min="1"
                    max="2048"
                    value={sliderN}
                    onChange={handleSliderChange}
                    className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-purple-500 hover:bg-white/20 transition-all pointer-events-auto"
                />
            </div>
        </div>
    );
}
