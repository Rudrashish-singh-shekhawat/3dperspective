// src/app/ThemeProvider.js
import React from 'react';

export function ThemeProvider({ children }) {
  // The app uses a single dark theme – all styling is in globals.css.
  // This provider exists for future theme switching.
  return <>{children}</>;
}