// src/engine/canvas/Renderer.js
import { Scene } from './Scene';
import { useRenderLoop } from './RenderLoop';
import { useCallback } from 'react';

/**
 * Top-level renderer that ties the scene, camera state and animation loop together.
 * Called from the main canvas component.
 */
export function useRenderer(canvasRef, graphCanvasRef, viewportRef, state) {
  const { engineCtx, graphCtx, resize } = useCanvasEngine(canvasRef, graphCanvasRef, viewportRef);

  const scene = engineCtx ? new Scene(engineCtx, state) : null;

  const draw = useCallback(() => {
    if (!scene || !engineCtx) return;
    scene.draw(state.scale, state.panX, state.panY, state.currentQuat);
    // 2D graph rendering is handled separately
  }, [scene, engineCtx, state]);

  const update = useCallback((dt) => {
    // dt is in ms; original used fixed speed, but we keep it flexible
    // Update time
    if (state.isPlaying) {
      state.time += state.animationSpeed; // animationSpeed is fixed per frame, not delta
    }
    // Camera smoothing (slerp) is handled inside the camera module; we just update here
    // (camera update will be done via a hook in the canvas component)
  }, [state]);

  useRenderLoop(state.isPlaying, update, draw);

  return { resize };
}