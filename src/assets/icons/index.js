// src/assets/icons/index.js
import React from 'react';

/**
 * All SVG icons used throughout the application.
 * Extracted from the original HTML inline SVGs.
 * Each icon is a React component accepting a `className` prop.
 */

export const IconAdd = ({ className = '', ...props }) => (
  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor"
       strokeWidth="1.6" strokeLinecap="round" className={className} {...props}>
    <line x1="5" y1="1" x2="5" y2="9" />
    <line x1="1" y1="5" x2="9" y2="5" />
  </svg>
);

export const IconSort = ({ className = '', ...props }) => (
  <svg width="11" height="11" viewBox="0 0 11 11" fill="none" stroke="currentColor"
       strokeWidth="1.4" strokeLinecap="round" className={className} {...props}>
    <line x1="1" y1="2" x2="10" y2="2" />
    <line x1="1" y1="5" x2="7" y2="5" />
    <line x1="1" y1="8" x2="4" y2="8" />
  </svg>
);

export const IconPlay = ({ className = '', ...props }) => (
  <svg width="8" height="9" viewBox="0 0 9 10" fill="currentColor" className={className} {...props}>
    <path d="M0 0L9 5L0 10Z" />
  </svg>
);

export const IconPause = ({ className = '', ...props }) => (
  <svg width="8" height="9" viewBox="0 0 9 10" fill="currentColor" className={className} {...props}>
    <rect x="0" y="0" width="3" height="10" />
    <rect x="6" y="0" width="3" height="10" />
  </svg>
);

export const IconReset = ({ className = '', ...props }) => (
  <svg width="10" height="10" viewBox="0 0 11 11" fill="none" stroke="currentColor"
       strokeWidth="1.5" strokeLinecap="round" className={className} {...props}>
    <path d="M10 5.5A4.5 4.5 0 1 1 5.5 1" />
    <polyline points="5.5,1 8.5,1 8.5,4" />
  </svg>
);

export const IconClear = ({ className = '', ...props }) => (
  <svg width="9" height="10" viewBox="0 0 10 11" fill="none" stroke="currentColor"
       strokeWidth="1.4" strokeLinecap="round" className={className} {...props}>
    <polyline points="1,3 9,3" />
    <path d="M2 3V9a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1V3" />
    <path d="M3.5 3V2a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v1" />
  </svg>
);

export const IconSettings = ({ className = '', ...props }) => (
  <svg width="11" height="11" viewBox="0 0 15 15" fill="none" stroke="currentColor"
       strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
    <circle cx="7.5" cy="7.5" r="2" />
    <path d="M7.5 1v1.5M7.5 12.5V14M1 7.5h1.5M12.5 7.5H14M2.7 2.7l1.06 1.06M11.24 11.24l1.06 1.06M2.7 12.3l1.06-1.06M11.24 3.76l1.06-1.06" />
  </svg>
);

export const IconParams = ({ className = '', ...props }) => (
  <svg width="11" height="11" viewBox="0 0 15 15" fill="none" stroke="currentColor"
       strokeWidth="1.3" strokeLinecap="round" className={className} {...props}>
    <line x1="2" y1="4" x2="13" y2="4" />
    <line x1="2" y1="7.5" x2="13" y2="7.5" />
    <line x1="2" y1="11" x2="13" y2="11" />
    <circle cx="5" cy="4" r="1.5" fill="currentColor" strokeWidth="1.3" />
    <circle cx="9" cy="7.5" r="1.5" fill="currentColor" strokeWidth="1.3" />
    <circle cx="6" cy="11" r="1.5" fill="currentColor" strokeWidth="1.3" />
  </svg>
);

export const IconChart = ({ className = '', ...props }) => (
  <svg width="11" height="11" viewBox="0 0 15 15" fill="none" stroke="currentColor"
       strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
    <polyline points="1,12 4,8 7,10 10,5 14,3" />
    <rect x="1" y="1" width="13" height="13" rx="1" strokeOpacity="0.3" />
  </svg>
);

export const IconExport = ({ className = '', ...props }) => (
  <svg width="11" height="11" viewBox="0 0 15 15" fill="none" stroke="currentColor"
       strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
    <path d="M8 2H3a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h9a1 1 0 0 0 1-1V7" />
    <polyline points="10,1 14,1 14,5" />
    <line x1="6" y1="9" x2="14" y2="1" />
  </svg>
);