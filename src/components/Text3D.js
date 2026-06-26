import React, { useRef, useEffect, useCallback } from 'react';
import { Camera } from '../engine/camera/Camera';
import { ArcballController } from '../engine/arcball/ArcballController';
import { quatToMatrix } from '../math/quaternion/toMatrix';
import { qAxisAngle, qNorm, qMul } from '../math/quaternion';

/**
 * Text3D – Renders "3D PERSPECTIVE" using CSS 3D Transforms.
 * Powered entirely by the custom src/engine logic for rotation and viewing!
 */
export default function Text3D({ 
  text = '3D', 
  fontSize = 160, 
  isGradient = false, 
  initialRotateY = 0,
  className = '' 
}) {
  const containerRef = useRef(null);
  const wrapperRef = useRef(null);
  
  // Custom Engine instances
  const cameraRef = useRef(new Camera());
  const arcballRef = useRef(new ArcballController(cameraRef.current));
  const dragActive = useRef(false);
  const animRef = useRef(null);

  // Set initial position based on props
  useEffect(() => {
    // Start with default facing forward
    const q1 = qAxisAngle([1, 0, 0], 0);
    // Apply user's initial Y rotation (incline)
    const q2 = qAxisAngle([0, 1, 0], initialRotateY);
    cameraRef.current.targetQuat = qNorm(qMul(q1, q2));
    cameraRef.current.currentQuat = [...cameraRef.current.targetQuat];
  }, [initialRotateY]);

  // ─── Render loop ───
  const updateCSS = useCallback(() => {
    // Engine automatically handles friction, momentum, and snapping!
    
    cameraRef.current.update();
    const M = quatToMatrix(cameraRef.current.currentQuat);
    
    const matrix3d = `matrix3d(
      ${M[0][0]}, ${M[1][0]}, ${M[2][0]}, 0,
      ${M[0][1]}, ${M[1][1]}, ${M[2][1]}, 0,
      ${M[0][2]}, ${M[1][2]}, ${M[2][2]}, 0,
      0, 0, 0, 1
    )`;

    if (containerRef.current) {
      containerRef.current.style.transform = `translate(-50%, -50%) ${matrix3d}`;
    }

    animRef.current = requestAnimationFrame(updateCSS);
  }, []);

  useEffect(() => {
    animRef.current = requestAnimationFrame(updateCSS);
    return () => cancelAnimationFrame(animRef.current);
  }, [updateCSS]);

  // ─── Engine Arcball Interaction ───
  const handlePointerDown = (e) => {
    if (e.button !== 0 && e.type.includes('mouse')) return;
    const el = wrapperRef.current;
    if (!el) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    dragActive.current = true;
    arcballRef.current.startDrag(e.clientX, e.clientY, el.offsetWidth, el.offsetHeight);
  };

  const handlePointerMove = (e) => {
    if (!dragActive.current) return;
    const el = wrapperRef.current;
    if (!el) return;
    arcballRef.current.updateDrag(e.clientX, e.clientY, el.offsetWidth, el.offsetHeight);
  };

  const handlePointerUp = () => {
    dragActive.current = false;
    arcballRef.current.endDrag();
  };

  // Build the perfectly solid 3D text layers
  const renderTextLayers = () => {
    // 200 layers for a flawlessly solid block
    const layers = 200;
    const depth = 50; // Increased depth for more dramatic 3D effect
    const layerElements = [];

    const textStyle = {
      position: 'absolute',
      left: '50%',
      top: '50%',
      fontSize: `${fontSize}px`,
      fontWeight: 900,
      fontFamily: '"Inter", "Arial Black", sans-serif',
      whiteSpace: 'nowrap',
      lineHeight: 1,
      pointerEvents: 'none',
      transformStyle: 'preserve-3d'
    };

    for (let i = 0; i <= layers; i++) {
      const zOffset = -(i / layers) * depth;
      
      const layerStyle = {
        ...textStyle,
        transform: `translate(-50%, -50%) translateZ(${zOffset}px)`,
      };

      const progress = i / layers;

      if (i === 0) {
        if (isGradient) {
          layerStyle.backgroundImage = 'linear-gradient(135deg, #ffffff 0%, #cbd5e1 55%, #64748b 100%)';
          layerStyle.WebkitBackgroundClip = 'text';
          layerStyle.WebkitTextFillColor = 'transparent';
        } else {
          layerStyle.color = '#f8fafc';
        }
      } else if (i === layers) {
        layerStyle.color = '#0f172a'; // very dark slate back plate
      } else {
        // Fake Ambient Occlusion: sides get darker as we go deeper
        const ao = Math.max(0.08, Math.pow(1 - progress, 1.2));
        
        // Deep premium charcoal-slate for both to keep a uniform slab appearance, slightly darker for gradient
        layerStyle.color = isGradient
          ? `rgba(15, 23, 42, ${ao})`
          : `rgba(30, 41, 59, ${ao})`;
        
        // Specular highlight stroke on front edges, solid fill on side walls
        if (progress < 0.08) {
          const specOpacity = (1 - progress / 0.08) * 0.4;
          layerStyle.WebkitTextStroke = `1px rgba(255, 255, 255, ${specOpacity})`;
        } else {
          layerStyle.WebkitTextStroke = `1px ${layerStyle.color}`;
        }
      }

      layerElements.push(
        <div key={i} style={layerStyle} aria-hidden={i !== 0 ? 'true' : 'false'}>
          {text}
        </div>
      );
    }
    return layerElements;
  };

  return (
    <div 
      ref={wrapperRef}
      // Removed overflow-hidden so the text doesn't clip!
      className={`w-full h-full cursor-grab active:cursor-grabbing ${className}`}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      style={{ touchAction: 'none', perspective: '1200px', transformStyle: 'preserve-3d' }}
    >
      <div 
        ref={containerRef}
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transformStyle: 'preserve-3d',
          width: 0,
          height: 0,
        }}
      >
        {renderTextLayers()}
      </div>
    </div>
  );
}
