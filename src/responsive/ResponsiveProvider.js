// src/responsive/ResponsiveProvider.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import { breakpoints } from './breakpoints';

export const ResponsiveContext = createContext({
  breakpoint: 'desktop',
  layout: 'desktop',
  isTouch: false,
});

export function ResponsiveProvider({ children }) {
  const [breakpoint, setBreakpoint] = useState(() => {
    if (typeof window === 'undefined') return 'desktop';
    const w = window.innerWidth;
    if (w < breakpoints.mobile) return 'mobile';
    if (w < breakpoints.tablet) return 'tablet';
    return 'desktop';
  });

  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    const check = () => {
      setIsTouch('ontouchstart' in window || navigator.maxTouchPoints > 0);
    };
    check();

    const handleResize = () => {
      const w = window.innerWidth;
      if (w < breakpoints.mobile) setBreakpoint('mobile');
      else if (w < breakpoints.tablet) setBreakpoint('tablet');
      else setBreakpoint('desktop');
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const layout = isTouch ? 'touch' : breakpoint;

  return (
    <ResponsiveContext.Provider value={{ breakpoint, layout, isTouch }}>
      {children}
    </ResponsiveContext.Provider>
  );
}

export const useResponsive = () => useContext(ResponsiveContext);