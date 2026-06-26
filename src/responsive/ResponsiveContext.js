// src/responsive/ResponsiveContext.js
import { createContext } from 'react';

export const ResponsiveContext = createContext({
  breakpoint: 'desktop',
  layout: 'desktop',
  isTouch: false,
});