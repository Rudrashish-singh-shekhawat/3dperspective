// src/components/common/IconButton.js
import React from 'react';
import { Button } from './Button';

/**
 * Icon button – a specialised button for icon‑only use,
 * with a square aspect ratio and centered content.
 */
export function IconButton({
  children,
  onClick,
  variant = 'icon',
  size = 'md',
  active = false,
  className = '',
  title,
  id,
  ...props
}) {
  const sizeClasses = {
    sm: 'h-5 w-5',
    md: 'h-6 w-6',
    lg: 'h-8 w-8',
  };

  const activeClass = active ? 'bg-white/[0.15] text-white' : '';

  return (
    <Button
      id={id}
      onClick={onClick}
      variant={variant}
      size={size}
      title={title}
      className={`${sizeClasses[size] || sizeClasses.md} ${activeClass} ${className}`}
      {...props}
    >
      {children}
    </Button>
  );
}