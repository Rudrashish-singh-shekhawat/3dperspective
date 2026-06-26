// src/components/common/Modal.js
import React, { useEffect, useRef } from 'react';

/**
 * A generic modal dialog with backdrop overlay.
 * Uses portal to render at the document root.
 * Handles click outside and Escape key to close.
 */
export function Modal({ isOpen, onClose, title, children, className = '' }) {
  const overlayRef = useRef(null);

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Prevent body scroll while open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target === overlayRef.current) onClose();
  };

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
    >
      <div
        className={`relative w-full max-w-md rounded-xl border border-white/10 bg-panel-solid shadow-2xl ${className}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/5 px-5 py-4">
          <h2 className="font-mono text-[14px] font-semibold text-ink">{title}</h2>
          <button
            onClick={onClose}
            className="flex h-6 w-6 items-center justify-center rounded-md border border-transparent text-ink-mute transition hover:border-white/10 hover:bg-white/5 hover:text-ink"
          >
            ×
          </button>
        </div>

        {/* Body */}
        <div className="px-5 py-4 text-sm text-ink-dim">
          {children}
        </div>
      </div>
    </div>
  );
}