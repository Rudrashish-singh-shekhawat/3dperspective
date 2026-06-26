// src/responsive/layoutConfig.js
import { DesktopLayout } from '../layouts/DesktopLayout';
import { TabletLayout } from '../layouts/TabletLayout';
import { MobileLayout } from '../layouts/MobileLayout';
import { TouchLayout } from '../layouts/TouchLayout';

export const layoutMap = {
  desktop: DesktopLayout,
  tablet: TabletLayout,
  mobile: MobileLayout,
  touch: TouchLayout,
};

export function getLayoutComponent(layout) {
  return layoutMap[layout] || DesktopLayout;
}