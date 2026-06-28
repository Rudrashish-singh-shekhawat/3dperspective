// src/features/fourier/components/Sidebar/ArmInput.js
import React, { useEffect, useState } from 'react';
import { useArmScrub } from './useArmScrub';

/**
 * Numeric input with fill-bar background, +/− stepper buttons, and scrub-to-change logic.
 *
 * Interactions:
 *  - Click = Enables typing mode
 *  - Double-click & Drag = Scrubs the value left/right
 *  - Hover over stepper = Use +/- buttons for precise steps
 *
 * Props:
 *  - value: number
 *  - onChange: (newValue: number) => void
 *  - step: number (increment per click)
 *  - min: number
 *  - max: number
 *  - color: string (hex color for fill bar, e.g. '#5ba3ff')
 *  - precision: number (decimal places for display, default 1)
 */
export function ArmInput({ value, onChange, step = 1, min = 0, max = 300, color = '#5ba3ff', precision = 1 }) {
  const {
    inputRef,
    containerRef,
    isTyping,
    setIsTyping,
    handleMouseDown,
    startHold,
    stopHold
  } = useArmScrub({ value, onChange, step, min, max, precision });

  // Compute fill percentage
  const fillPercent = Math.min(100, Math.max(0, ((value - min) / (max - min)) * 100));

  const formatValue = (val, prec) => prec === 0 ? String(Math.round(val)) : val.toFixed(prec);
  const displayValue = formatValue(value, precision);

  const [inputValue, setInputValue] = useState(displayValue);

  // Sync inputValue when typing mode changes
  useEffect(() => {
    if (!isTyping) {
      setInputValue(displayValue);
    }
  }, [isTyping, displayValue]);

  // Focus when typing is enabled
  useEffect(() => {
    if (isTyping && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isTyping, inputRef]);

  const handleBlur = () => {
    setIsTyping(false);
  };

  const handleChange = (e) => {
    // We only update via direct text entry if in typing mode
    if (!isTyping) return;
    setInputValue(e.target.value);
    const val = parseFloat(e.target.value);
    if (!isNaN(val)) {
      onChange(Math.max(min, val));
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      inputRef.current?.blur();
    }
  };

  return (
    <div
      ref={containerRef}
      onMouseDown={handleMouseDown}
      className={`input-stepper group relative flex items-center bg-black/35 border border-white/[0.08] rounded-md overflow-hidden transition-all duration-150 shadow-[inset_0_1px_2px_rgba(0,0,0,0.4)] focus-within:border-opacity-50 ${!isTyping ? 'cursor-ew-resize' : ''}`}
      style={{
        borderColor: isTyping ? `${color}80` : undefined,
        boxShadow: isTyping ? `0 0 12px ${color}33, inset 0 1px 2px rgba(0,0,0,0.3)` : undefined,
        WebkitTouchCallout: 'none', 
        touchAction: 'pan-y',
        userSelect: 'none'
      }}
    >
      {/* Fill bar */}
      <div
        className="absolute left-0 top-0 bottom-0 rounded-l-[6px] opacity-[0.18] transition-[width] duration-200 ease-out pointer-events-none"
        style={{ width: `${fillPercent}%`, backgroundColor: color }}
      />
      {/* Scan lines overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: 'repeating-linear-gradient(0deg, rgba(255,255,255,0.015) 0px, rgba(255,255,255,0.015) 1px, transparent 1px, transparent 2px)',
          zIndex: 1
        }}
      />
      {/* Input */}
      <input
        ref={inputRef}
        type={isTyping ? "number" : "text"}
        readOnly={!isTyping}
        value={isTyping ? inputValue : displayValue}
        onChange={handleChange}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        onCopy={(e) => !isTyping && e.preventDefault()}
        onCut={(e) => !isTyping && e.preventDefault()}
        onPaste={(e) => !isTyping && e.preventDefault()}
        onContextMenu={(e) => e.preventDefault()}
        onSelect={(e) => {
          if (isTyping) return;
          if (e.target.selectionStart !== e.target.selectionEnd) {
            e.target.selectionStart = e.target.selectionEnd;
          }
        }}
        onDragStart={(e) => e.preventDefault()}
        step={step}
        min={min}
        max={max}
        className={`relative z-[2] flex-1 min-w-0 border-none bg-transparent py-2 pl-[10px] pr-1 font-mono text-[10px] font-medium text-[#e4e4f0] tracking-[0.02em] outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none
                     ${!isTyping ? 'caret-transparent select-none' : 'caret-[#a0a0c0] select-none'}`}
        style={{ textShadow: `0 0 6px ${color}33`, pointerEvents: isTyping ? 'auto' : 'none' }}
      />
      {/* Stepper buttons */}
      <div className="relative z-[2] flex flex-col border-l border-white/6 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-150">
        <button
          type="button"
          className="flex items-center justify-center w-[22px] h-[14px] bg-transparent border-none text-white/45 font-mono text-[11px] leading-none cursor-pointer transition-all duration-100 hover:bg-white/5 hover:text-[#e0e0ea] active:bg-white/15 active:text-white active:scale-110"
          onMouseDown={() => { startHold(1); }}
          onMouseUp={stopHold}
          onMouseLeave={stopHold}
          onTouchStart={() => { startHold(1); }}
          onTouchEnd={stopHold}
        >
          +
        </button>
        <button
          type="button"
          className="flex items-center justify-center w-[22px] h-[14px] bg-transparent border-none text-white/45 font-mono text-[11px] leading-none cursor-pointer transition-all duration-100 hover:bg-white/5 hover:text-[#e0e0ea] active:bg-white/15 active:text-white active:scale-110"
          onMouseDown={() => { startHold(-1); }}
          onMouseUp={stopHold}
          onMouseLeave={stopHold}
          onTouchStart={() => { startHold(-1); }}
          onTouchEnd={stopHold}
        >
          −
        </button>
      </div>
    </div>
  );
}