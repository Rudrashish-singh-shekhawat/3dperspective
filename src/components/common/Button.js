// src/components/common/Button.js
import React from 'react';

/**
 * Reusable button component with consistent styling.
 * Can be used as a standard button or an icon button.
 */
export function Button({
  children,
  onClick,
  variant = 'default', // 'default' | 'icon' | 'danger' | 'primary'
  size = 'md',
  disabled = false,
  className = '',
  title,
  id,
  ...props
}) {
  const baseClasses =
    'inline-flex items-center justify-center gap-1.5 rounded-md border transition-all duration-200 font-mono uppercase tracking-[0.06em] outline-none focus:outline-none';

  const sizeClasses = {
    sm: 'h-6 px-3 text-[9px]',
    md: 'h-8 px-4 text-[10px]',
    lg: 'h-10 px-5 text-[12px]',
  };

  const variantClasses = {
    default:
      'border-white/10 bg-white/[0.02] text-ink-dim hover:-translate-y-px hover:border-white/20 hover:bg-white/[0.04] hover:text-ink hover:shadow-[0_2px_8px_rgba(0,0,0,0.3)] active:translate-y-0 active:border-blue/50 active:bg-blue/10 active:text-blue active:shadow-[0_0_12px_rgba(77,159,255,0.15),inset_0_0_12px_rgba(77,159,255,0.06)] active:animate-borderPulse',
    icon: 'border-transparent text-ink-mute hover:-translate-y-px hover:border-white/10 hover:bg-white/[0.05] hover:text-ink active:border-blue/20 active:bg-blue/10 active:text-blue active:shadow-[0_0_10px_rgba(77,159,255,0.1)]',
    danger:
      'border-white/10 bg-white/[0.02] text-ink-dim hover:-translate-y-px hover:border-red/50 hover:bg-red/10 hover:text-red hover:shadow-[0_0_14px_rgba(244,124,90,0.12)] active:translate-y-0 active:border-blue/50 active:bg-blue/10 active:text-blue',
    primary:
      'border-blue/40 bg-blue/10 text-blue hover:-translate-y-px hover:border-blue/60 hover:bg-blue/20 hover:shadow-[0_0_12px_rgba(77,159,255,0.2)] active:translate-y-0',
  };

  const classes = [
    baseClasses,
    sizeClasses[size] || sizeClasses.md,
    variantClasses[variant] || variantClasses.default,
    className,
  ].join(' ');

  return (
    <button
      id={id}
      className={classes}
      onClick={onClick}
      disabled={disabled}
      title={title}
      {...props}
    >
      {children}
    </button>
  );
}