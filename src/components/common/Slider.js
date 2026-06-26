// src/components/common/Slider.js
import React from 'react';

/**
 * Reusable slider input component with consistent styling.
 * Mirrors the custom‑styled range input used in the sidebar speed control.
 */
export function Slider({
  label,
  min = 1,
  max = 100,
  value,
  onChange,
  displayValue,
  id,
  className = '',
}) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {label && (
        <label
          htmlFor={id}
          className="whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.08em] text-ink-dim"
        >
          {label}
        </label>
      )}
      <input
        type="range"
        id={id}
        min={min}
        max={max}
        value={value}
        onChange={onChange}
        className="h-0.75 flex-1 cursor-pointer appearance-none rounded-full bg-gradient-to-r from-blue to-purple opacity-70 outline-none transition-opacity hover:opacity-100 
                   [&::-webkit-slider-thumb]:h-3.5 [&::-webkit-slider-thumb]:w-3.5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-0 [&::-webkit-slider-thumb]:bg-[radial-gradient(circle_at_35%_35%,#7ab8ff,#4d9fff)] [&::-webkit-slider-thumb]:shadow-[0_0_8px_rgba(77,159,255,0.5),0_0_2px_rgba(77,159,255,0.8)] [&::-webkit-slider-thumb]:transition-all hover:[&::-webkit-slider-thumb]:scale-110 active:[&::-webkit-slider-thumb]:cursor-grabbing 
                   [&::-moz-range-track]:h-0.75 [&::-moz-range-track]:rounded-full [&::-moz-range-track]:border-0 [&::-moz-range-track]:bg-gradient-to-r [&::-moz-range-track]:from-blue [&::-moz-range-track]:to-purple [&::-moz-range-thumb]:h-3.5 [&::-moz-range-thumb]:w-3.5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-[radial-gradient(circle_at_35%_35%,#7ab8ff,#4d9fff)] [&::-moz-range-thumb]:shadow-[0_0_8px_rgba(77,159,255,0.5),0_0_2px_rgba(77,159,255,0.8)]"
      />
      {displayValue !== undefined && (
        <span className="w-[34px] text-right font-mono text-[10px] font-medium text-blue [text-shadow:0_0_10px_rgba(77,159,255,0.3)]">
          {displayValue}
        </span>
      )}
    </div>
  );
}