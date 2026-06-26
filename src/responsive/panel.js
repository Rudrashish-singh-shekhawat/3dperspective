// src/responsive/panel.js

export function getPanelHeight(breakpoint) {
  switch (breakpoint) {
    case 'mobile':
      return 0.35; // 35% of viewport height
    case 'tablet':
      return 0.3;
    case 'desktop':
    default:
      return 0.25;
  }
}

export function isPanelResizable(breakpoint) {
  return breakpoint !== 'mobile';
}

export function getDefaultPanelSidebarWidth(breakpoint) {
  switch (breakpoint) {
    case 'mobile':
      return 0;
    case 'tablet':
      return 200;
    case 'desktop':
    default:
      return 256;
  }
}