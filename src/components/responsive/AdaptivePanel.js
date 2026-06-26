// src/components/responsive/AdaptivePanel.js
import React from 'react';
import { useResponsive } from '../../responsive/useResponsive';

/**
 * Renders a panel (e.g. bottom panel or sidebar) with different styles
 * depending on the current breakpoint.
 *
 * Accepts `desktop`, `tablet`, `mobile` props for custom rendering.
 * Falls back to a default panel if no breakpoint-specific version is given.
 */
export function AdaptivePanel({
  children,
  desktop,
  tablet,
  mobile,
  className = '',
}) {
  const { breakpoint } = useResponsive();

  let content = children;
  if (breakpoint === 'desktop' && desktop !== undefined) content = desktop;
  else if (breakpoint === 'tablet' && tablet !== undefined) content = tablet;
  else if (breakpoint === 'mobile' && mobile !== undefined) content = mobile;

  return (
    <div className={`pointer-events-auto bg-panel/70 backdrop-blur-md ${className}`}>
      {content}
    </div>
  );
}