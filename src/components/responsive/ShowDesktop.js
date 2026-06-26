// src/components/responsive/ShowDesktop.js
import React from 'react';
import { useResponsive } from '../../responsive/useResponsive';

/**
 * Renders its children only when the current breakpoint is 'desktop' or larger.
 */
export function ShowDesktop({ children }) {
  const { breakpoint } = useResponsive();
  if (breakpoint !== 'desktop') return null;
  return <>{children}</>;
}