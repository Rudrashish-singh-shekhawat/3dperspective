// src/components/common/Card.js
import React from 'react';

/**
 * A styled card container used throughout the app.
 * Mimics the arm card styling but is generic.
 */
export function Card({ children, className = '', ...props }) {
  return (
    <div
      className={`rounded-lg border border-white/5 bg-white/[0.015] px-4 py-3.5 transition-all duration-200 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}