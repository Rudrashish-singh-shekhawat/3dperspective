// src/components/responsive/HideDesktop.js
import React from 'react';
import { useResponsive } from '../../responsive/useResponsive';

/**
 * Hides its children when the current breakpoint is 'desktop'.
 * Renders on tablet and mobile.
 */
export function HideDesktop({ children }) {
  const { breakpoint } = useResponsive();
  if (breakpoint === 'desktop') return null;
  return <>{children}</>;
}