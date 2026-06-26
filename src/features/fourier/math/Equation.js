import React, { useState, useEffect, useRef } from 'react';

const TYPE_SPEED = 70;   // ms per char when typing forward
const ERASE_SPEED = 35;  // ms per char when erasing backward

const GOLDEN_ANGLE = 137.507764;

function generateAccentColor(id, index) {
  const finalId = id !== undefined ? id : index;
  const hue = (finalId * GOLDEN_ANGLE) % 360;
  return `hsl(${hue}, 80%, 65%)`;
}

/**
 * Build a structured array of "segments" for a single term.
 * Each segment = { text, className }.
 * This lets us render colored JSX AND count characters without string parsing.
 */
function buildTermSegments(c, index) {
  const amp = c.radius.toFixed(1);
  const phaseVal = c.phase;
  const segments = [];
  const accentColor = generateAccentColor(c.id, index);

  if (index > 0) {
    segments.push({ text: ' + ', cls: 'text-ink-mute' });
  }
  segments.push({ text: amp, style: { color: accentColor, textShadow: `0 0 8px ${accentColor}40` } });
  segments.push({ text: 'sin(', cls: 'text-ink-dim' });
  segments.push({ text: `${c.freq}t`, cls: 'text-green' });

  if (phaseVal !== 0) {
    const phaseStr = phaseVal > 0
      ? ` + ${phaseVal.toFixed(2)}`
      : ` − ${Math.abs(phaseVal).toFixed(2)}`;
    segments.push({ text: phaseStr, cls: 'text-purple' });
  }

  segments.push({ text: ')', cls: 'text-ink-dim' });

  return segments;
}

/**
 * Compute the total character count of a segments array.
 */
function segmentsLength(segments) {
  return segments.reduce((sum, s) => sum + s.text.length, 0);
}

/**
 * Render segments with a character limit (clip after `limit` chars).
 */
function renderSegments(segments, limit) {
  let remaining = limit;
  return segments.map((seg, i) => {
    if (remaining <= 0) return null;
    const visible = seg.text.slice(0, remaining);
    remaining -= visible.length;
    return (
      <span key={i} className={seg.cls} style={seg.style}>{visible}</span>
    );
  });
}

/**
 * EquationDisplay — renders the Fourier equation with a character-by-character
 * typewriter effect.
 *
 * Architecture:
 *  - Works with structured term objects (segments), never parses strings.
 *  - A single `visibleChars` counter controls how much text is shown.
 *  - On add/initial: types forward from the existing prefix length.
 *  - On remove: erases backward to the new total length.
 *  - On slider change: updates instantly (no animation).
 *  - Blinking cursor shown only during animation.
 */
export function EquationDisplay({ circles, maxTerms }) {
  const targetCircles = maxTerms ? circles.slice(0, maxTerms) : circles;

  // The "committed" list of terms from the previous stable state
  const prevCountRef = useRef(0);
  const prevTotalCharsRef = useRef(0);

  // Animation state
  const [visibleChars, setVisibleChars] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const intervalRef = useRef(null);

  // Snapshot the terms we're currently rendering (includes outgoing terms during erase)
  const [renderCircles, setRenderCircles] = useState(targetCircles);

  // Build all segments for the current render
  const allSegments = renderCircles.map((c, i) => buildTermSegments(c, i));

  useEffect(() => {
    const prevCount = prevCountRef.current;
    const prevTotalChars = prevTotalCharsRef.current;
    const newCount = targetCircles.length;

    // Clear any running animation
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    // Empty state
    if (newCount === 0) {
      setRenderCircles([]);
      setVisibleChars(0);
      setIsTyping(false);
      prevCountRef.current = 0;
      prevTotalCharsRef.current = 0;
      return;
    }

    if (newCount > prevCount) {
      // ADDING (or initial mount when prevCount = 0)
      setRenderCircles(targetCircles);

      // Compute new total
      const newSegments = targetCircles.map((c, i) => buildTermSegments(c, i));
      const newTotal = newSegments.reduce((sum, segs) => sum + segmentsLength(segs), 0);

      // Start from the old total (or 0 for initial mount)
      const startFrom = prevCount === 0 ? 0 : prevTotalChars;
      let current = startFrom;

      setVisibleChars(startFrom);
      setIsTyping(true);

      intervalRef.current = setInterval(() => {
        current++;
        setVisibleChars(current);
        if (current >= newTotal) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
          setIsTyping(false);
          prevCountRef.current = newCount;
          prevTotalCharsRef.current = newTotal;
        }
      }, TYPE_SPEED);

    } else if (newCount < prevCount) {
      // REMOVING — keep old circles visible, erase backward
      // renderCircles is still the old set; we erase into the new total
      const newSegments = targetCircles.map((c, i) => buildTermSegments(c, i));
      const newTotal = newSegments.reduce((sum, segs) => sum + segmentsLength(segs), 0);

      let current = prevTotalChars;
      setVisibleChars(current);
      setIsTyping(true);

      intervalRef.current = setInterval(() => {
        current--;
        setVisibleChars(current);
        if (current <= newTotal) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
          setIsTyping(false);
          // Now swap to the new circles
          setRenderCircles(targetCircles);
          setVisibleChars(newTotal);
          prevCountRef.current = newCount;
          prevTotalCharsRef.current = newTotal;
        }
      }, ERASE_SPEED);

    } else {
      // SAME count — slider change, snap instantly
      setRenderCircles(targetCircles);
      const newSegments = targetCircles.map((c, i) => buildTermSegments(c, i));
      const newTotal = newSegments.reduce((sum, segs) => sum + segmentsLength(segs), 0);
      setVisibleChars(newTotal);
      prevCountRef.current = newCount;
      prevTotalCharsRef.current = newTotal;
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [circles, maxTerms]);

  // Render
  if (renderCircles.length === 0) {
    return <span className="text-ink-mute">0</span>;
  }

  // Distribute visibleChars across the term segments
  let charsLeft = visibleChars;
  const termNodes = allSegments.map((segments, termIdx) => {
    const termLen = segmentsLength(segments);
    if (charsLeft <= 0) return null;
    const show = Math.min(charsLeft, termLen);
    charsLeft -= show;
    return (
      <span key={termIdx} className="inline-block whitespace-nowrap">
        {renderSegments(segments, show)}
      </span>
    );
  });

  return (
    <span className="inline">
      {termNodes}
      {maxTerms && circles.length > maxTerms && (
        <span className="text-ink-mute inline-block ml-1 font-bold"> + ...</span>
      )}
      {isTyping && (
        <span
          className="inline-block w-[2px] h-[1em] align-text-bottom ml-px"
          style={{
            backgroundColor: 'var(--color-ink)',
            animation: 'blink 0.5s step-end infinite',
          }}
        />
      )}
    </span>
  );
}