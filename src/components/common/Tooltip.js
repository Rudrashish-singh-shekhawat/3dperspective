// src/components/common/Tooltip.js
import React, { useState, useRef, useEffect } from 'react';

/**
 * A simple tooltip that appears on hover.
 * Positioned above the child element by default.
 */
export function Tooltip({ children, content, className = '' }) {
  const [visible, setVisible] = useState(false);
  const targetRef = useRef(null);
  const timeoutRef = useRef(null);

  const show = () => {
    timeoutRef.current = setTimeout(() => setVisible(true), 400);
  };
  const hide = () => {
    clearTimeout(timeoutRef.current);
    setVisible(false);
  };

  useEffect(() => {
    return () => clearTimeout(timeoutRef.current);
  }, []);

  return (
    <div
      className="relative inline-flex"
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
    >
      <div ref={targetRef}>{children}</div>
      {visible && (
        <div
          className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-[10px] font-mono text-ink bg-panel border border-white/10 rounded shadow-lg whitespace-nowrap pointer-events-none z-50 ${className}`}
        >
          {content}
        </div>
      )}
    </div>
  );
}