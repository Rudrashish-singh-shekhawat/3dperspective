import { useRef, useEffect } from 'react';
import { Renderer } from '../renderer/Renderer';
import { useFourierStore } from '../../features/fourier/state/FourierStore';
import { useAnimationStore } from '../../features/fourier/state/AnimationStore';
import { useCameraStore } from '../camera/CameraState';
import { useGizmoStore } from '../gizmo/GizmoState';

/**
 * Hook that initialises the main Renderer and provides a draw function.
 * It fetches the latest state directly from Zustand to avoid closure traps.
 */
export function useRenderer(canvasRef) {
  const rendererRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    rendererRef.current = new Renderer(ctx);
  }, [canvasRef]);

  const draw = () => {
    if (!rendererRef.current) return;
    
    // Fetch latest state directly to avoid closure issues
    const state = {
      circles: useFourierStore.getState().circles,
      path: useFourierStore.getState().path,
      isolatedCircleIndices: useFourierStore.getState().isolatedCircleIndices,
      time: useAnimationStore.getState().time,
      isPlaying: useAnimationStore.getState().isPlaying,
      animationSpeed: useAnimationStore.getState().animationSpeed,
      currentQuat: useCameraStore.getState().currentQuat,
      targetQuat: useCameraStore.getState().targetQuat,
      scale: useCameraStore.getState().scale,
      panX: useCameraStore.getState().panX,
      panY: useCameraStore.getState().panY,
      hoveredAxis: useGizmoStore.getState().hoveredAxis,
      clickableAxes: useGizmoStore.getState().clickableAxes,
    };
    
    rendererRef.current.draw(state);
  };

  return { draw };
}