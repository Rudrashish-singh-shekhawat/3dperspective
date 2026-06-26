// src/features/fourier/components/Sidebar/ArmCard.js
import React, { useState } from 'react';
import { useFourierStore } from '../../state/FourierStore';
import { ArmInput } from './ArmInput';
import { ArmDelete } from './ArmDelete';

const GOLDEN_ANGLE = 137.507764;

/**
 * Generate a unique accent color for each arm using golden-angle distribution.
 * Produces infinite non-repeating hues.
 */
function generateAccent(index) {
  const hue = (index * GOLDEN_ANGLE) % 360;
  return {
    color: `hsl(${hue}, 80%, 65%)`,
    glow: `hsla(${hue}, 80%, 65%, 0.35)`,
    glowStrong: `hsla(${hue}, 80%, 65%, 0.5)`,
  };
}

/**
 * A single epicycle arm card.
 * Premium design with golden-angle accent colors, fill-bar inputs,
 * SVG cross delete button, and radial glow hover effects.
 */
export function ArmCard({ index, circle, onRemove }) {
  const updateCircle = useFourierStore((s) => s.updateCircle);
  const resetPath = useFourierStore((s) => s.resetPath);
  const [isRemoving, setIsRemoving] = useState(false);

  const accent = generateAccent(circle.id !== undefined ? circle.id : index);

  const handleInputChange = (prop, value) => {
    updateCircle(index, prop, value);
    resetPath();
  };

  const handleRemove = () => {
    setIsRemoving(true);
    // Wait for animation to finish, then actually remove
    setTimeout(() => {
      onRemove();
    }, 280);
  };

  return (
    <div
      className={`group/card relative mx-2.5 my-1 rounded-[10px] border border-white/[0.06] border-l-[3px] bg-white/[0.02] px-4 py-2.5 transition-all duration-[240ms] ease-[cubic-bezier(0.22,0.61,0.36,1)] animate-fadeSlideIn overflow-visible
                 hover:translate-x-0.5 hover:border-white/[0.12] hover:bg-white/[0.028] hover:shadow-[0_6px_24px_rgba(0,0,0,0.35),inset_0_0_0_1px_rgba(255,255,255,0.02)]
                 ${isRemoving ? 'arm-card-removing' : ''}`}
      style={{
        borderLeftColor: accent.color,
        '--accent': accent.color,
        '--accent-glow': accent.glow,
      }}
    >
      {/* Radial glow overlay on hover */}
      <div
        className="absolute inset-0 rounded-[10px] pointer-events-none opacity-0 group-hover/card:opacity-50 transition-opacity duration-[240ms]"
        style={{
          background: `radial-gradient(ellipse 100% 100% at 0% 0%, ${accent.glow} 0%, transparent 70%)`,
        }}
      />

      {/* Header: badge + delete */}
      <div className="relative z-[1] mb-2 flex items-center justify-between">
        <span
          className="inline-flex items-center gap-[7px] rounded-full border border-white/5 bg-white/[0.025] px-2 py-0.5 font-mono text-[10px] font-medium uppercase tracking-[0.08em]"
          style={{ color: accent.color }}
        >
          <span
            className="inline-block h-[7px] w-[7px] rounded-full"
            style={{
              backgroundColor: accent.color,
              boxShadow: `0 0 8px ${accent.glowStrong}`,
            }}
          />
          ARM {String(index + 1).padStart(2, '0')}
        </span>
        <ArmDelete onRemove={handleRemove} />
      </div>

      {/* Fields grid */}
      <div className="relative z-[1] flex flex-col gap-1.5">
        <div className="flex flex-col gap-[3px]">
          <label className="font-mono text-[9px] font-semibold uppercase tracking-[0.11em] text-[#5ba3ff] [text-shadow:0_0_10px_rgba(91,163,255,0.4)]">
            AMP
          </label>
          <ArmInput
            value={circle.radius}
            onChange={(v) => handleInputChange('radius', v)}
            step={1}
            min={0.1}
            max={300}
            color="#5ba3ff"
            precision={1}
          />
        </div>
        <div className="flex flex-col gap-[3px]">
          <label className="font-mono text-[9px] font-semibold uppercase tracking-[0.11em] text-green [text-shadow:0_0_10px_rgba(62,207,142,0.4)]">
            FREQ
          </label>
          <ArmInput
            value={circle.freq}
            onChange={(v) => handleInputChange('freq', v)}
            step={1}
            min={1}
            max={12}
            color="#3ecf8e"
            precision={0}
          />
        </div>
        <div className="flex flex-col gap-[3px]">
          <label className="font-mono text-[9px] font-semibold uppercase tracking-[0.11em] text-purple [text-shadow:0_0_10px_rgba(167,139,250,0.4)]">
            PHASE
          </label>
          <ArmInput
            value={circle.phase}
            onChange={(v) => handleInputChange('phase', v)}
            step={0.1}
            min={0}
            max={6.283}
            color="#a78bfa"
            precision={3}
          />
        </div>
      </div>
    </div>
  );
}