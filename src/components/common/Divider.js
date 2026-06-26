// src/components/common/Divider.js
import React from 'react';

/**
 * A thin horizontal or vertical divider.
 * Uses the rule colour from the design system.
 */
export function Divider({ direction = 'horizontal', className = '' }) {
  const base = 'border-rule';
  const directionClasses =
    direction === 'vertical'
      ? 'h-full w-px border-l'
      : 'w-full h-px border-t';

  return <div className={`${base} ${directionClasses} ${className}`} />;
}