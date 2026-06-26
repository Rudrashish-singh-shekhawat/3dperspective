import React from 'react';
import { useFourierStore } from '../../state/FourierStore';
import { EquationDisplay } from '../../math/Equation';

/**
 * Displays the current epicycle equation in the sidebar.
 */
export function EquationBar() {
  const circles = useFourierStore((s) => s.circles);

  return (
    <div className="flex-shrink-0 border-t border-white/5 bg-white/[0.012] px-4 py-2">
      <div className="font-mono text-[11px] leading-none text-ink-dim truncate">
        <span className="text-ink-mute">f(t) = </span>
        <EquationDisplay circles={circles} />
      </div>
    </div>
  );
}