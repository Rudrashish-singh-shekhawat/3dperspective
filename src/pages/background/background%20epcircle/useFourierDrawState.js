import { useRef, useEffect } from 'react';
import { getBaseEpicyclesAsync } from '../../../utils/fourierMath';

export const STAGES = {
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

export function generatePathColor() {
    const hue = Math.floor(Math.random() * 360);
    return `hsl(${hue}, 100%, 75%)`;
}

export function useFourierDrawState(trailCanvasRef, mainCanvasRef) {
    const stateRef = useRef({
        currentStage: STAGES.INITIAL_WAIT,
        circleDrawPercent: 0.0,
        armDrawPercent: 0.0,
        visibleArmsCount: 1,
        time: 0,
        stageTimer: performance.now(),
        width: 0,
        height: 0,
        activeEpicycles: [],
        lastTip: null,
        lastFrameTime: performance.now(),
        drawingHeight: 0,
        pathColor: 'rgba(255, 255, 255, 0.95)',
        lastTipX: 0,
        lastTipY: 0
    });

    useEffect(() => {
        const trailCanvas = trailCanvasRef.current;
        const mainCanvas = mainCanvasRef.current;
        if (!trailCanvas || !mainCanvas) return;
        const trailCtx = trailCanvas.getContext('2d', { alpha: true });

        const NUM_SAMPLES = 2048;
        const NUM_VECTORS = 2048;

        let lastWidth = 0;
        let lastHeight = 0;

        function loadShape() {
            const state = stateRef.current;
            if (state.width === 0 || state.height === 0) return;
            
            getBaseEpicyclesAsync(NUM_SAMPLES).then(({ epicycles, bounds }) => {
                const scale = Math.min(
                    state.width / bounds.width,
                    state.height / bounds.height
                ) * 0.7;

                state.activeEpicycles = epicycles.slice(0, NUM_VECTORS).map(epi => ({
                    ...epi,
                    amp: epi.baseAmp * scale
                }));
                
                state.drawingHeight = bounds.height * scale;
                state.lastTip = null;
            });
        }

        function resize() {
            const newWidth = window.innerWidth;
            const newHeight = window.innerHeight;

            const widthChanged = Math.abs(newWidth - lastWidth) > 30;
            const heightChanged = Math.abs(newHeight - lastHeight) > 250;

            if (lastWidth !== 0 && !widthChanged && !heightChanged) return;

            lastWidth = newWidth;
            lastHeight = newHeight;

            const state = stateRef.current;
            state.width = mainCanvas.width = trailCanvas.width = newWidth;
            state.height = mainCanvas.height = trailCanvas.height = newHeight;
            trailCtx.clearRect(0, 0, state.width, state.height);
            loadShape();
        }

        window.addEventListener('resize', resize);
        resize();

        return () => {
            window.removeEventListener('resize', resize);
        };
    }, [trailCanvasRef, mainCanvasRef]);

    return stateRef;
}
