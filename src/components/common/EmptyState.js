// src/components/common/EmptyState.js
import React from 'react';

/**
 * A placeholder component shown when a list or view has no items.
 * Uses the same muted style as the original "NO ARMS" message in the sidebar.
 */
export function EmptyState({
  message = 'Nothing to show',
  icon = null,
  className = '',
}) {
  return (
    <div
      className={`px-4 py-6 text-center font-mono text-[10px] tracking-[0.08em] text-ink-mute ${className}`}
    >
      {icon && <div className="mb-2 flex justify-center">{icon}</div>}
      <p>{message}</p>
    </div>
  );
}