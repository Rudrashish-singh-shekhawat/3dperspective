// src/engine/hooks/useAnimation.js
import { useCallback } from 'react';
import { useAnimationLoop } from '../animation/AnimationLoop';
import { useCamera } from './useCamera';
import { useAnimationStore } from '../../features/fourier/state/AnimationStore';
import { useRenderer } from './useRenderer';

import { useFourierScene } from '../../features/fourier/canvas/FourierScene';

/**
 * Master animation hook.
 * Sets up the render loop, advances time if playing, updates camera (slerp),
 * and calls the renderer to draw the scene.
 */
export function useAnimation(canvasRef) {
  const { draw } = useRenderer(canvasRef);
  const camera = useCamera();
  const isPlaying = useAnimationStore((s) => s.isPlaying);
  const animationSpeed = useAnimationStore((s) => s.animationSpeed);
  const incrementTime = useAnimationStore((s) => s.incrementTime);
  const scene = useFourierScene();

  const onFrame = useCallback(() => {
    if (isPlaying) {
      incrementTime(animationSpeed); // time += speed (original per‑frame, not delta)
      scene.update();
    }
    camera.update(); // spin decay + slerp
    draw();
  }, [isPlaying, animationSpeed, camera, draw, incrementTime, scene]);

  useAnimationLoop(onFrame);
}