// src/responsive/useResponsive.js
import { useContext } from 'react';
import { ResponsiveContext } from './ResponsiveContext';

export function useResponsive() {
  return useContext(ResponsiveContext);
}