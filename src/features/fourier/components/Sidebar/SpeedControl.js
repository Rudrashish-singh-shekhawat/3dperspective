// src/features/fourier/components/Sidebar/SpeedControl.js
import React, { useState, useEffect } from 'react';
import { useAnimationStore } from '../../state/AnimationStore';

/**
 * Speed slider row.
 * Replicates the original <div id="speed-row">...</div>.
 * The slider maps 1–100 to an animation speed value.
 * Display shows multiplier relative to the default speed (20).
 */
export function SpeedControl() {
  const animationSpeed = useAnimationStore((s) => s.animationSpeed);
  const setSpeedFromSlider = useAnimationStore((s) => s.setSpeedFromSlider);

  // Local slider value derived from store (store speed = value/1000)
  const [sliderValue, setSliderValue] = useState(() => {
    // Initialise from current animation speed (default 0.02 => 20)
    return Math.round(animationSpeed * 1000);
  });

  // Keep local state in sync if the store changes externally
  useEffect(() => {
    setSliderValue(Math.round(animationSpeed * 1000));
  }, [animationSpeed]);

  const handleSliderChange = (e) => {
    const val = parseInt(e.target.value, 10);
    setSliderValue(val);
    setSpeedFromSlider(val); // updates store: animationSpeed = val/1000
  };

  const displayMultiplier = (sliderValue / 20).toFixed(1) + '×';

  return (
    <div
      id="speed-row"
      className="flex flex-shrink-0 items-center gap-2.5 border-b border-white/5 bg-white/[0.012] px-4 py-3"
    >
      <label className="w-11 whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.08em] text-ink-dim">
        Speed
      </label>
      <input
        type="range"
        id="speed-slider"
        min="1"
        max="100"
        value={sliderValue}
        onChange={handleSliderChange}
        className="h-0.75 flex-1 cursor-pointer appearance-none rounded-full bg-gradient-to-r from-blue to-purple opacity-70 outline-none transition-opacity hover:opacity-100 
                   [&::-webkit-slider-thumb]:h-3.5 [&::-webkit-slider-thumb]:w-3.5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-0 [&::-webkit-slider-thumb]:bg-[radial-gradient(circle_at_35%_35%,#7ab8ff,#4d9fff)] [&::-webkit-slider-thumb]:shadow-[0_0_8px_rgba(77,159,255,0.5),0_0_2px_rgba(77,159,255,0.8)] [&::-webkit-slider-thumb]:transition-all hover:[&::-webkit-slider-thumb]:scale-110 active:[&::-webkit-slider-thumb]:cursor-grabbing 
                   [&::-moz-range-track]:h-0.75 [&::-moz-range-track]:rounded-full [&::-moz-range-track]:border-0 [&::-moz-range-track]:bg-gradient-to-r [&::-moz-range-track]:from-blue [&::-moz-range-track]:to-purple [&::-moz-range-thumb]:h-3.5 [&::-moz-range-thumb]:w-3.5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-[radial-gradient(circle_at_35%_35%,#7ab8ff,#4d9fff)] [&::-moz-range-thumb]:shadow-[0_0_8px_rgba(77,159,255,0.5),0_0_2px_rgba(77,159,255,0.8)]"
      />
      <span
        id="speed-val"
        className="w-[34px] text-right font-mono text-[10px] font-medium text-blue [text-shadow:0_0_10px_rgba(77,159,255,0.3)]"
      >
        {displayMultiplier}
      </span>
    </div>
  );
}