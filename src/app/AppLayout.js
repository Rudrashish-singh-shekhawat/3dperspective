// src/app/AppLayout.js
import React from 'react';
import { useResponsive } from '../responsive/useResponsive';
import { DesktopLayout } from '../layouts/DesktopLayout';

export function AppLayout() {
  const { layout } = useResponsive(); // returns 'desktop' | 'tablet' | 'mobile' | 'touch'

  const LayoutComponent = {
    desktop: DesktopLayout,
    tablet: DesktopLayout,
    mobile: DesktopLayout, // Unify with DesktopLayout
    touch: DesktopLayout,  // Unify with DesktopLayout
  }[layout] || DesktopLayout;

  return <LayoutComponent />;
}