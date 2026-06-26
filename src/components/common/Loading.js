// src/components/common/Loading.js
import React from 'react';

/**
 * A minimal loading spinner that matches the design system.
 * Used as a placeholder while asynchronous operations complete.
 */
export function Loading({ size = 24, className = '' }) {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        className="animate-spin"
      >
        <circle
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="2"
          className="text-white/10"
        />
        <path
          d="M12 2a10 10 0 0 1 10 10"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          className="text-blue"
        />
      </svg>
    </div>
  );
}