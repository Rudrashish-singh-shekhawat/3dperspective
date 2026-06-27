import React, { useEffect, useRef } from 'react';

// --- 1. COMPLEX NUMBER CLASS ---
class Complex {
    constructor(re, im) {
        this.re = re;
        this.im = im;
    }
    add(c) { return new Complex(this.re + c.re, this.im + c.im); }
    sub(c) { return new Complex(this.re - c.re, this.im - c.im); }
    mul(c) { return new Complex(this.re * c.re - this.im * c.im, this.re * c.im + this.im * c.re); }
    mag() { return Math.sqrt(this.re * this.re + this.im * this.im); }
    phase() { return Math.atan2(this.im, this.re); }
}

function fft(x) {
    const N = x.length;
    if (N <= 1) return x;
    const even = new Array(N / 2);
    const odd = new Array(N / 2);
    for (let i = 0; i < N / 2; i++) {
        even[i] = x[i * 2];
        odd[i] = x[i * 2 + 1];
    }
    const fftEven = fft(even);
    const fftOdd = fft(odd);
    const T = new Array(N);
    for (let k = 0; k < N / 2; k++) {
        const theta = -2 * Math.PI * k / N;
        const exp = new Complex(Math.cos(theta), Math.sin(theta));
        const t = exp.mul(fftOdd[k]);
        T[k] = fftEven[k].add(t);
        T[k + N / 2] = fftEven[k].sub(t);
    }
    return T;
}

const FOURIER_PATH = "M978.141,416.063c7.732-7.25,21.793,1.315,26.098,1.45c14.066,0.442,28.632-1.293,34.314-0.725c9.666,0.966,32.381,0.725,39.147-3.142c0,0-2.9-0.967-6.767-1.45c-3.866-0.483-6.766-2.9-12.565-2.9c-3.057,0-12.083,3.383-14.016,3.383c-1.934,0-8.216-3.866-15.949-2.9c-7.732,0.967-13.049,5.286-16.915,5.286l-5.8,2.93c6.766,5.8,18.365,12.566,31.897,11.599c13.532-0.966,13.049,0,27.064-8.216c14.017-8.216,18.366-12.566,16.433,1.45c-1.933,14.016,8.699-11.116,8.699-11.116s2.741-9.988,0-22.715c-1.931-8.964-15.466-16.432-19.332-20.298c0,0-11.437-31.415-13.532-42.531c-1.291-6.849,12.083,2.417,19.332,6.766c7.25,4.35,26.099-7.249,30.448-10.149s-3.384-9.666-9.253-9.753c-3.54,2.867-7.693,5.403-15.396,5.403c-10.633,0-28.031-5.8-28.031-5.8c0.483-9.504-5.958-26.259,4.995-35.281c16.264-13.397,25.36-15.109,37.535-10.149c4.35,1.771,22.393,25.615,22.393,25.615s-9.668,12.888-12.889,11.599c-3.221-1.288-16.109-14.821-21.909-14.821s-23.198,2.577-25.132,6.443c-1.934,3.867-5.154,15.466-2.577,12.244s7.733-6.444,7.733-6.444c0.819,2.97,3.605,6.928,7.249,6.928c4.271,0,7.733-3.029,7.733-6.766c0-1.413-0.497-2.722-1.343-3.806c0.463-0.04,0.91-0.061,1.343-0.061c6.766,0,22.231,11.599,22.231,11.599s26.581,8.7,26.581,18.366c0,9.666,0.643,23.356,0.643,23.356s30.931,2.577,33.508-15.466s-12.887-43.82-5.154-43.82c7.733,0,22.557-21.261,22.557-21.261s-7.732,6.444-25.135,8.374c7.732-2.578,18.044-25.776,18.044-36.086c0-10.31,5.154-15.466-18.044-25.776c15.465-7.733,15.465-38.664-2.577-61.862c-18.043-23.199-25.775-7.733-25.775-7.733s9.024-25.127-7.085-41.237c-15.678-15.679-31.579-10.314-31.579-10.314s3.227-19.972-17.396-27.705c-20.621-7.733-39.953,18.043-35.443,7.732c5.166-11.808-14.176-36.086-14.176-36.086s2.577,18.043-10.31,28.998c-18.526,15.749-33.514-14.182-56.712-16.76c-23.198-2.578-30.931,12.889-30.931,12.889s-5.434-9.285-25.126-1.285c-20.622,8.377-19.978,23.198-19.978,23.198s-14.174-1.932-32.219,10.956c-18.045,12.888-15.472,36.726-15.472,36.726s-13.022,5.827-23.198,23.198c-10.95,18.692-5.154,48.974-5.154,48.974s-12.889,10.311-15.466,25.776c-2.577,15.466,15.466,33.509,15.466,33.509s-12.889,5.155-15.466,12.888c-2.577,7.733,0,28.354,20.62,43.819c-7.732,12.888,0,28.354,5.156,38.664c5.156,10.31,25.775,15.466,25.775,15.466s12.889,20.621,2.579,23.198c-10.31,2.577-23.199,7.734-23.199,25.777s-15.465,69.595-20.621,90.216c-20.622,5.155-28.353,28.354-28.353,28.354s2.577,10.31-12.889,15.465c-15.465,5.156-56.707,43.818-64.439,54.13c-7.732,10.312-43.82,33.509-56.708,51.551c-12.889,18.045-53.11,87.379-54.13,136.613c-1.125,54.294-4.029,128.715-2.577,134.035c1.452,5.319,25.777,7.736,43.822,12.892c18.044,5.156,76.041,29.643,101.816,34.798c25.775,5.156,68.306,25.777,81.194,24.488c12.889-1.29,11.6-41.243,11.6-48.976c0-7.733-6.443-37.377-7.733-50.264s-2.577-36.087,0-50.263c2.577-14.177,10.312-37.373,9.022-47.685c-1.289-10.312-16.576-35.107-14.178-33.51c34.797,23.198,14.178,94.083,14.178,108.259c0,14.177,6.443,68.308,1.288,106.972s5.156,27.064,27.065,34.798c21.909,7.732,70.885,5.153,118.57,9.021c47.687,3.866,112.124,2.739,131.456-6.283c0-11.6,2.901-29.803,1.934-42.53c-0.969-12.729-3.221-58.155-3.221-60.733c0-2.579-12.887-1.29-12.887-1.29s-4.648,12.185-9.022,15.466c-7.732,5.8-28.354,5.154-31.577,0s-9.664-23.196,0.646-32.219c10.311-9.022,23.056-9.347,28.353-1.934c6.445,9.021,21.266,8.377,21.266,8.377s-4.511-27.712-7.087-37.376c-2.577-9.664-16.754-43.816-18.043-48.973c-1.289-5.155-6.445-29.644-9.022-33.51s-12.889-2.579-16.755-1.289c-3.866,1.289-1.752,9.707-10.31,16.755c-10.956,9.022-28.062-0.977-30.288-5.8c-3.866-8.376,0-28.998,14.177-30.287c14.176-1.29,17.398-0.644,19.978,7.089s14.176-1.936,14.176-4.512c0-2.577-15.465-37.377-21.908-50.264s-19.332-45.109-27.065-54.13c-7.732-9.021-15.466-2.577-15.466-2.577s1.934,16.756-5.799,26.422c-3.601,4.498-25.929,11.886-30.288-0.646c-5.156-14.819-6.443-25.775,7.733-30.931c14.176-5.154,18.688,3.866,25.131-3.866c5.219-6.261,9.666-9.666,3.223-21.909c-1.2-2.282,0.002-9.022-10.31-11.6s-19.332-18.042-22.554-33.508c-2.904-13.937-21.263-60.574-27.708-70.885s-3.867-28.353-7.733-30.931c-3.867-2.578-28.356-18.043-45.109-25.776c-16.753-7.733-28.353-19.331-33.508-32.22s-6.443-18.044,0-24.488c0,0,25.773,22.554,28.351,28.998s48.976,38.664,52.842,43.819c3.867,5.155,11.6,23.199,11.602,26.421c0,0,25.775,29.643,32.219,37.375c6.443,7.733,11.76,34.638,19.492,51.391s21.75,25.938,34.637,22.071s56.547-6.285,66.856-11.438c10.31-5.154,4.833-25.132,2.899-53.163c-1.795-26.034,11.439-43.658,15.306-55.257l10.312-11.599c13.047,4.027,26.58,9.826,27.064,47.685c0.149,11.599,18.043,61.863,19.332,72.173c1.29,10.311,1.29,27.063,3.867,29.643c2.576,2.578,32.219,28.354,37.374,28.354c1.29,20.622,2.577,42.528,3.866,60.573s7.894,68.146,2.737,79.744c-5.155,11.6-19.49,24.648-23.356,37.537c-3.867,12.889-21.909,50.264-27.064,57.996c-5.156,7.733-17.883,9.506-18.045,15.466s10.312,10.31,10.312,27.064s1.288,42.53,1.288,50.264c0,7.732,2.254,24.648,2.254,31.092c0,0,67.986-7.57,89.894-19.332s64.763-57.996,64.763-57.996c12.889-9.021,40.275-25.937,38.986-37.535c-2.122-19.093-6.334-101.612-7.089-108.422c-1.288-11.599-18.687-68.146-27.709-72.012s-56.706-100.526-61.86-105.681c-5.154-5.155-48.976-24.487-55.419-27.064c-6.443-2.579-27.064-92.794-27.064-95.372c0,0-47.041-31.575-48.33-36.086c-1.29-4.511,13.853-98.754,11.599-100.526c-5.477,40.759-21.91,112.771-58.646,131.454c-18.042,7.733-51.547,14.825-95.366-13.528c-43.82-28.354-67.017-36.731-82.482-47.042c-15.465-10.311-16.111-26.42-16.111-34.153c-14.178-1.289-16.749-6.44-21.265-16.11c-6.983-14.954-16.753-18.688-21.909-34.153c-5.156-15.466-5.16-38.024,10.306-30.292c15.466,7.733,20.625,12.893,28.358,30.936c7.732,18.043,9.658-1.289,9.666-19.332c0.003-8.374,1.289-10.956,5.799-14.822s43.495-10.149,43.495-10.149c10.149-13.532,27.548-25.131,43.014-25.131c15.465,0,26.581,11.116,28.031,15.465c1.449,4.35-4.673,13.694-8.699,15.466c-3.957,1.741-9.666,5.799-23.199,6.766c-13.532,0.967-23.198-1.933-30.931-1.933c6.285-8.86,12.226-11.388,18.094-14.975l0.271,0.476c0,4.271,3.895,7.733,8.699,7.733s8.7-3.462,8.7-7.733c0-1.068-0.244-2.084-0.684-3.009l1.584-0.213c6.027,0.915,11.665,3.223,16.498,6.123c4.833,2.899,12.405,2.738,14.338-3.062c1.934-5.799-1.772-12.87-1.772-24.487c0-7.25,3.384-11.277,2.417-14.177c-0.967-2.899-19.336-3.552-32.864-3.222c-19.815,0.483-37.214,8.216-47.847,14.016l-35.281,27.548c0-10.311,11.597-33.834-1.292-38.99s-18.042-28.354-15.465-36.087c15.465,7.733,39.957,14.825,46.4,9.67c6.443-5.155-28.354-5.8-30.931-26.42c-2.577-20.62,18.635,12.244,34.154,12.244c17.399,0-23.198-17.399-13.532-27.709c6.417-6.845,22.229-25.132,22.229-25.132s-1.608,35.441,28.034,30.287c29.641-5.155,47.686-21.91,51.552-27.065c18.045-1.289,15.468,3.867,29.644,11.599c14.177,7.733,24.488,36.086,18.045,46.397l10.313-24.487c5.155-11.599,7.742,27.065,21.918,33.509c14.177,6.443,27.08,3.866,27.08,3.866c1.288,7.088,3.894,36.087,4.539,42.53c-10.954-15.465-11.579-20.943-20.399-26.259c-8.82-5.316-32.019-5.8-40.476-1.934c-8.458,3.867-16.19,19.332-16.19,27.065c0,0-1.934,6.283,0,10.633c1.933,4.35,9.609,34.934,11.277,39.47c3.144,8.539,10.471,24.325,11.438,30.125c0.967,5.799,4.028,16.271-3.867,19.332c-9.707,3.762-8.699,1.933-4.832-4.833c3.866-6.767-2.37-7.766-5.316-1.45c-3.384,7.25-11.116,11.599-15.949,7.733s0.967-10.149,0-12.083s-14.499-2.9-15.466,3.866c-0.967,6.767-10.251,5.259-13.532-0.966c-4.671-8.861,6.285-16.271,6.285-21.104c-7.733,5.8-18.332,11.868-27.709,21.909c-13.691,14.66-20.815,42.976-19.979,45.108C968.151,426.212,970.407,423.312,978.141,416.063z";

// Pre-compute the unscaled, pure FFT data ONCE globally so we never re-run FFT on resize.
let cachedBaseEpicycles = null;
let cachedBaseBounds = null;

function getBaseEpicycles(numSamples) {
    if (cachedBaseEpicycles && cachedBaseEpicycles.length === numSamples) {
        return { epicycles: cachedBaseEpicycles, bounds: cachedBaseBounds };
    }

    const svgPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
    svgPath.setAttribute("d", FOURIER_PATH);
    const totalLen = svgPath.getTotalLength();
    
    const rawPoints = [];
    let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
    
    for (let i = 0; i < numSamples; i++) {
        const pt = svgPath.getPointAtLength((i / numSamples) * totalLen);
        rawPoints.push(new Complex(pt.x, pt.y));
        if (pt.x < minX) minX = pt.x;
        if (pt.x > maxX) maxX = pt.x;
        if (pt.y < minY) minY = pt.y;
        if (pt.y > maxY) maxY = pt.y;
    }

    const cx = (minX + maxX) / 2;
    const cy = (minY + maxY) / 2;
    const centered = rawPoints.map(p => new Complex(p.re - cx, p.im - cy));

    const X = fft(centered);
    const epicycles = [];
    for (let k = 0; k < numSamples; k++) {
        let freq = k < numSamples / 2 ? k : k - numSamples;
        let c = new Complex(X[k].re / numSamples, X[k].im / numSamples);
        epicycles.push({
            freq: freq,
            baseAmp: c.mag(),
            phase: c.phase()
        });
    }

    cachedBaseEpicycles = epicycles.sort((a, b) => b.baseAmp - a.baseAmp);
    cachedBaseBounds = { width: maxX - minX, height: maxY - minY };
    
    return { epicycles: cachedBaseEpicycles, bounds: cachedBaseBounds };
}

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

        function resize() {
            engineState.width = mainCanvas.width = trailCanvas.width = window.innerWidth;
            engineState.height = mainCanvas.height = trailCanvas.height = window.innerHeight;
            trailCtx.clearRect(0, 0, engineState.width, engineState.height);
            loadShape();
        }

        function loadShape() {
            if (engineState.width === 0 || engineState.height === 0) return;
            const { epicycles, bounds } = getBaseEpicycles(NUM_SAMPLES);
            
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
        }

        window.addEventListener('resize', resize);
        resize();

        function render(timestamp) {
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
                    engineState.lastTip = { x: tx, y: ty };
                }
            } else if (currentStage === STAGES.DRAWING) {
                // Draw path slowly - no tail fade
                const dTime = SPEED * dt;
                const steps = Math.ceil(dTime * 1000);
                const stepSize = dTime / (steps || 1);
                
                let finalTip = engineState.lastTip;
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

                    if (finalTip) {
                        trailCtx.strokeStyle = engineState.pathColor;
                        trailCtx.lineWidth = 1.0;
                        trailCtx.lineCap = 'round';
                        trailCtx.lineJoin = 'round';
                        trailCtx.beginPath();
                        trailCtx.moveTo(finalTip.x, finalTip.y);
                        trailCtx.lineTo(x, y);
                        trailCtx.stroke();
                    }
                    
                    finalTip = { x, y };
                    
                    if (reachedEnd) break;
                }

                engineState.lastTip = finalTip;

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
                    engineState.lastTip = { x: tx, y: ty };
                }
            } else if (currentStage === STAGES.FADING_OUT) {
                // Erase path using destination-out
                const ERASE_SPEED = 0.3; // 3.3 seconds to erase
                const dTime = ERASE_SPEED * dt;
                const steps = Math.ceil(dTime * 1000);
                const stepSize = dTime / (steps || 1);
                
                let finalTip = engineState.lastTip;
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

                    if (finalTip) {
                        trailCtx.globalCompositeOperation = 'destination-out';
                        trailCtx.strokeStyle = 'rgba(255, 255, 255, 1.0)';
                        trailCtx.lineWidth = 3.0; // slightly thicker to catch anti-aliasing
                        trailCtx.lineCap = 'round';
                        trailCtx.lineJoin = 'round';
                        trailCtx.beginPath();
                        trailCtx.moveTo(finalTip.x, finalTip.y);
                        trailCtx.lineTo(x, y);
                        trailCtx.stroke();
                        trailCtx.globalCompositeOperation = 'source-over'; // restore
                    }
                    
                    finalTip = { x, y };
                    
                    if (reachedEnd) break;
                }

                engineState.lastTip = finalTip;

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
