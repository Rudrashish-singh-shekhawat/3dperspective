// src/components/responsive/ShowTablet.js
import React from 'react';
import { useResponsive } from '../../responsive/useResponsive';

/**
 * Renders its children only when the current breakpoint is 'tablet'.
 */
export function ShowTablet({ children }) {
  const { breakpoint } = useResponsive();
  if (breakpoint !== 'tablet') return null;
  return <>{children}</>;
}