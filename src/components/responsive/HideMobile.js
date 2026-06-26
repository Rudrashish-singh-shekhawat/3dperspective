// src/components/responsive/HideMobile.js
import React from 'react';
import { useResponsive } from '../../responsive/useResponsive';

/**
 * Hides its children when the current breakpoint is 'mobile'.
 * Renders on tablet and desktop.
 */
export function HideMobile({ children }) {
  const { breakpoint } = useResponsive();
  if (breakpoint === 'mobile') return null;
  return <>{children}</>;
}