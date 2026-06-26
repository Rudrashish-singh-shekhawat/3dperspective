// src/components/responsive/ShowMobile.js
import React from 'react';
import { useResponsive } from '../../responsive/useResponsive';

/**
 * Renders its children only when the current breakpoint is 'mobile' or smaller.
 */
export function ShowMobile({ children }) {
  const { breakpoint } = useResponsive();
  if (breakpoint !== 'mobile') return null;
  return <>{children}</>;
}