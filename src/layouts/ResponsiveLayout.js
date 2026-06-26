// src/layouts/ResponsiveLayout.js
import React from 'react';
import { useResponsive } from '../responsive/useResponsive';
import { layoutMap } from '../responsive/layoutConfig';

/**
 * Renders the appropriate layout component based on the current breakpoint/touch status.
 * Falls back to DesktopLayout if no match is found.
 */
export function ResponsiveLayout() {
  const { layout } = useResponsive();
  const LayoutComponent = layoutMap[layout] || layoutMap.desktop;

  return <LayoutComponent />;
}