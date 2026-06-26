// src/features/fourier/components/Sidebar/ArmList.js
import React, { useRef, useEffect } from 'react';
import { useFourierStore } from '../../state/FourierStore';
import { ArmCard } from './ArmCard';

/**
 * Scrollable container for epicycle arm cards.
 * Renders a list of ArmCard components based on the circles array.
 * Includes the AddButton at the bottom.
 */
export function ArmList() {
  const circles = useFourierStore((s) => s.circles);
  const removeCircle = useFourierStore((s) => s.removeCircle);
  const listRef = useRef(null);
  const prevLength = useRef(circles.length);

  // Auto-scroll to bottom only when a new arm is added (not removed)
  useEffect(() => {
    if (listRef.current && circles.length > prevLength.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
    prevLength.current = circles.length;
  }, [circles.length]);

  return (
    <div id="arm-list" ref={listRef} className="flex-1 min-h-0 overflow-y-auto px-1 py-1 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {circles.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-2 rounded-[14px] border-2 border-dashed border-white/5 p-6 text-center animate-fadeSlideIn">
          <p className="text-[12px] text-ink-mute">
            No arms configured.<br/>
            Click <strong>ADD</strong> above to begin.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-1">
          {circles.map((circle, i) => (
            <ArmCard
              key={circle.id}
              index={i}
              circle={circle}
              onRemove={() => removeCircle(i)}
            />
          ))}
        </div>
      )}
    </div>
  );
}