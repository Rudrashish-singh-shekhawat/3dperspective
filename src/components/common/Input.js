// src/components/common/Input.js
import React from 'react';

/**
 * Reusable text/number input with the project's dark theme styling.
 * Uses the same classes as the original arm card fields.
 */
export function Input({
  type = 'text',
  value,
  onChange,
  placeholder = '',
  step,
  min,
  max,
  className = '',
  ...props
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      step={step}
      min={min}
      max={max}
      className={`w-full appearance-none rounded-[5px] border border-white/10 bg-black/30 px-2 py-1.5 font-mono text-[11px] text-ink outline-none transition-all duration-200 [appearance:textfield] focus:border-blue/40 focus:bg-black/45 focus:shadow-[0_0_12px_rgba(77,159,255,0.1),inset_0_0_8px_rgba(77,159,255,0.04)] hover:border-white/10 ${className}`}
      {...props}
    />
  );
}