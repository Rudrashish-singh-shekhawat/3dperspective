// src/features/fourier/components/Sidebar/AddButton.js
import React, { useEffect } from 'react';
import { useFourierStore } from '../../state/FourierStore';

/**
 * "Add arm" button.
 * Matches the large dashed button from the reference design.
 */
export function AddButton() {
  const addCircle = useFourierStore((s) => s.addCircle);
  const circles = useFourierStore((s) => s.circles);
  const resetPath = useFourierStore((s) => s.resetPath);

  const handleAdd = () => {
    const nextFreq = circles.length > 0 ? Math.max(...circles.map(c => Math.abs(c.freq))) + 2 : 1;
    const nextRad = 100 * (4 / (nextFreq * Math.PI));
    addCircle({ radius: nextRad, freq: nextFreq, phase: 0 });
    resetPath();

    setTimeout(() => {
      const listEl = document.getElementById('arm-list');
      if (listEl) {
        listEl.scrollTop = listEl.scrollHeight;
      }
    }, 10);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'n') {
        e.preventDefault();
        handleAdd();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [circles]); // Re-bind on circles change to get latest freq, though state getter is better

  return (
    <button
      className="group mt-1 flex w-full cursor-pointer items-center justify-center gap-2 rounded-[10px] border-2 border-dashed border-white/10 bg-white/[0.015] px-4 py-3 text-[12px] font-medium tracking-[0.04em] text-ink-dim outline-none transition-all duration-[240ms] ease-[cubic-bezier(0.22,0.61,0.36,1)] hover:gap-2.5 hover:border-white/[0.16] hover:bg-white/[0.035] hover:text-[#c8c8d8]"
      id="btnAddArm"
      title="Add arm (Ctrl+N)"
      onClick={handleAdd}
    >
      <span className="flex h-[22px] w-[22px] items-center justify-center rounded-full bg-white/5 text-[16px] leading-none transition-all duration-[240ms] ease-[cubic-bezier(0.22,0.61,0.36,1)]">
        +
      </span>
      Add Arm
    </button>
  );
}