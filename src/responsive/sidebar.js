// src/responsive/sidebar.js

export function getSidebarWidth(breakpoint) {
  switch (breakpoint) {
    case 'mobile':
      return 0; // hidden on mobile
    case 'tablet':
      return 240;
    case 'desktop':
    default:
      return 280;
  }
}

export function isSidebarVisible(breakpoint) {
  return breakpoint !== 'mobile';
}

export function isSidebarCollapsible(breakpoint) {
  return breakpoint === 'tablet';
}