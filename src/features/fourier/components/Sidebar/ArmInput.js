// src/features/fourier/components/Sidebar/ArmInput.js
import React, { useRef, useCallback, useEffect, useState } from 'react';

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
  const holdRef = useRef(null);
  const inputRef = useRef(null);
  const containerRef = useRef(null);

  const [isTyping, setIsTyping] = useState(false);
  const lastClickRef = useRef({ time: 0, timeout: null });
  const lastTouchTimeRef = useRef(0);
  const scrubRef = useRef(null);
  const handleMouseMoveRef = useRef(null);
  const handleMouseUpRef = useRef(null);

  // Compute fill percentage
  const fillPercent = Math.min(100, Math.max(0, ((value - min) / (max - min)) * 100));
  const stepNum = parseFloat(step);

  const valueRef = useRef(value);
  useEffect(() => { valueRef.current = value; }, [value]);

  const applyStep = useCallback((dir) => {
    let newVal = valueRef.current + dir * stepNum;
    newVal = Math.min(max, Math.max(min, newVal));
    if (precision === 0) newVal = Math.round(newVal);
    onChange(newVal);
  }, [stepNum, min, max, precision, onChange]);

  const startHold = useCallback((dir) => {
    applyStep(dir);
    let delay = 280;
    const tick = () => {
      applyStep(dir);
      delay = Math.max(50, delay * 0.85);
      holdRef.current = setTimeout(tick, delay);
    };
    holdRef.current = setTimeout(tick, delay);
  }, [applyStep]);

  const stopHold = useCallback(() => {
    if (holdRef.current) {
      clearTimeout(holdRef.current);
      holdRef.current = null;
    }
  }, []);

  // Clean up on unmount
  useEffect(() => () => stopHold(), [stopHold]);

  // Core drag logic
  const handleMove = useCallback((clientX, clientY, e) => {
    // Clear any pending single-click timer to avoid entering typing mode while dragging
    clearTimeout(lastClickRef.current.timeout);
    if (!scrubRef.current) return;
    if (scrubRef.current.isScrolling) return;

    const dx = clientX - scrubRef.current.startX;
    const dy = clientY - scrubRef.current.startY;

    // Detect drag threshold (Biased towards vertical scrolling for better UX)
    if (!scrubRef.current.isDragging) {
      if (Math.abs(dy) > 2) {
        // Fast detection for scrolling intent
        scrubRef.current.isScrolling = true;
        return;
      } else if (Math.abs(dx) > 15) {
        // Deliberate detection for scrubbing intent
        scrubRef.current.isDragging = true;
        clearTimeout(lastClickRef.current.timeout);
        setIsTyping(false);
      } else {
        return; // Wait for one of the thresholds to be met
      }
    }

    if (e && e.cancelable) {
      e.preventDefault();
    }

    // Smooth, highly precise dragging based on the input's step size
    const valueChange = dx * stepNum * 0.05;

    let newVal = scrubRef.current.startValue + valueChange;
    newVal = Math.min(max, Math.max(min, newVal));
    if (precision === 0) newVal = Math.round(newVal);

    onChange(newVal);
  }, [min, max, precision, stepNum, onChange]);

  const handleUp = useCallback(() => {
    if (scrubRef.current) {
      scrubRef.current = null;
    }
    // Only detach mouse listeners using refs to avoid stale closures
    if (handleMouseMoveRef.current) {
      window.removeEventListener('mousemove', handleMouseMoveRef.current);
    }
    if (handleMouseUpRef.current) {
      window.removeEventListener('mouseup', handleMouseUpRef.current);
    }
  }, []);

  // Mouse specific wrappers
  const handleMouseMove = useCallback((e) => handleMove(e.clientX, e.clientY, e), [handleMove]);
  const handleMouseUp = useCallback((e) => handleUp(), [handleUp]);

  useEffect(() => {
    handleMouseMoveRef.current = handleMouseMove;
    handleMouseUpRef.current = handleMouseUp;
  }, [handleMouseMove, handleMouseUp]);



  const handleDown = useCallback((clientX, clientY, isTouch, e) => {
    // Ignore clicks on stepper buttons
    if (e.target.closest('button')) return;

    // If already typing, ignore clicks so the user can interact natively without triggering a scrub
    if (isTyping) return;

    const now = Date.now();
    const lastClick = lastClickRef.current;

    const isDoubleClick = now - lastClick.time < 300;

    if (isDoubleClick) {
      clearTimeout(lastClick.timeout);
      lastClick.time = 0;
      if (isTouch) {
        setIsTyping(true);
        scrubRef.current = null;
        if (inputRef.current) {
          inputRef.current.readOnly = false;
          inputRef.current.type = "number";
          inputRef.current.style.pointerEvents = 'auto';
          inputRef.current.focus();
        }
      } else {
        // For mouse double click keep existing scrub behavior
        if (containerRef.current) {
          scrubRef.current = {
            startX: clientX,
            startY: clientY,
            startValue: value,
            isDragging: true,
            isScrolling: false
          };
        }
        setIsTyping(false);
      }
      if (e.cancelable) e.preventDefault();
    } else {
      // Single click
      clearTimeout(lastClick.timeout);
      lastClick.time = now;
      
      if (isTouch && containerRef.current) {
        scrubRef.current = {
          startX: clientX,
          startY: clientY,
          startValue: value,
          isDragging: false,
          isScrolling: false
        };
      } else {
        scrubRef.current = null;
      }

      if (!isTouch) {
        // Only set a timer for mouse interactions
        lastClick.timeout = setTimeout(() => {
          if (!scrubRef.current || (!scrubRef.current.isDragging && !scrubRef.current.isScrolling)) {
            setIsTyping(true);
            scrubRef.current = null;
          }
        }, 300);
      }
      
      // Prevent default to stop native selection logic, but NOT for touch so scrolling works
      if (!isTouch && e.cancelable) e.preventDefault();
    }

    // Attach dynamic mouse listeners to window
    if (!isTouch) {
      if (handleMouseMoveRef.current) {
        window.removeEventListener('mousemove', handleMouseMoveRef.current);
      }
      if (handleMouseUpRef.current) {
        window.removeEventListener('mouseup', handleMouseUpRef.current);
      }
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
  }, [value, isTyping, handleMouseMove, handleMouseUp]);



  const handleMouseDown = useCallback((e) => {
    // If there was a touch event recently, ignore the simulated mousedown
    if (Date.now() - lastTouchTimeRef.current < 1000) {
      return;
    }
    handleDown(e.clientX, e.clientY, false, e);
  }, [handleDown]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (handleMouseMoveRef.current) {
        window.removeEventListener('mousemove', handleMouseMoveRef.current);
      }
      if (handleMouseUpRef.current) {
        window.removeEventListener('mouseup', handleMouseUpRef.current);
      }
    };
  }, []);

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
  }, [isTyping]);

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

  const handleDownRef = useRef(null);
  const handleMoveRef = useRef(null);
  const handleUpRef = useRef(null);

  useEffect(() => {
    handleDownRef.current = handleDown;
    handleMoveRef.current = handleMove;
    handleUpRef.current = handleUp;
  }, [handleDown, handleMove, handleUp]);

  // Add active non-passive touch listeners directly via DOM ref to allow preventDefault during horizontal drag
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onTouchStart = (e) => {
      lastTouchTimeRef.current = Date.now();
      if (e.touches && e.touches.length > 0) {
        const now = Date.now();
        const lastClick = lastClickRef.current;
        const isDoubleClick = now - lastClick.time < 300;
        if (isDoubleClick) {
          if (e.cancelable) e.preventDefault();
        }
        if (handleDownRef.current) {
          handleDownRef.current(e.touches[0].clientX, e.touches[0].clientY, true, e);
        }
      }
    };

    const onTouchMove = (e) => {
      lastTouchTimeRef.current = Date.now();
      if (!scrubRef.current) return;
      if (e.touches && e.touches.length > 0) {
        const dy = e.touches[0].clientY - scrubRef.current.startY;
        
        // Vertical-scroll guard: pick up vertical intent VERY quickly
        if (!scrubRef.current.isDragging && Math.abs(dy) > 5) {
          scrubRef.current.isScrolling = true;
          return; // Allow native scroll, do not preventDefault
        }

        if (handleMoveRef.current) {
          handleMoveRef.current(e.touches[0].clientX, e.touches[0].clientY, e);
        }
      }
    };

    const onTouchEnd = (e) => {
      lastTouchTimeRef.current = Date.now();
      if (scrubRef.current && !scrubRef.current.isScrolling) {
        if (e.cancelable) e.preventDefault();
      }
      if (handleUpRef.current) {
        handleUpRef.current();
      }
    };

    el.addEventListener('touchstart', onTouchStart, { passive: false });
    el.addEventListener('touchmove', onTouchMove, { passive: false });
    el.addEventListener('touchend', onTouchEnd, { passive: false });
    el.addEventListener('touchcancel', onTouchEnd, { passive: false });

    return () => {
      el.removeEventListener('touchstart', onTouchStart);
      el.removeEventListener('touchmove', onTouchMove);
      el.removeEventListener('touchend', onTouchEnd);
      el.removeEventListener('touchcancel', onTouchEnd);
    };
  }, []);

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