import React, { useState, useRef, useEffect } from 'react';
import { useFourierStore } from '../../state/FourierStore';
import { ChevronDown } from 'lucide-react';

/**
 * "Sort" button dropdown.
 * Sorts the circles array by AMP (radius), FREQ (freq), or PHASE (phase).
 */
export function SortButton() {
  const circles = useFourierStore((s) => s.circles);
  const setCircles = useFourierStore((s) => s.setCircles);
  const resetPath = useFourierStore((s) => s.resetPath);

  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleSort = (type) => {
    let sorted = [...circles];
    if (type === 'AMP') {
      // Sort by descending amplitude (radius)
      sorted.sort((a, b) => b.radius - a.radius);
    } else if (type === 'FREQ') {
      // Sort by ascending frequency magnitude
      sorted.sort((a, b) => Math.abs(a.freq) - Math.abs(b.freq));
    } else if (type === 'PHASE') {
      // Sort by phase
      sorted.sort((a, b) => a.phase - b.phase);
    }
    
    setCircles(sorted);
    resetPath();
    setIsOpen(false);
  };

  return (
    <div className="relative flex-1 flex z-50" ref={containerRef}>
      <button
        className="btn flex h-8 flex-1 items-center justify-center gap-1.5 rounded-md border border-white/10 bg-white/[0.02] font-mono text-[9px] uppercase tracking-[0.06em] text-ink-dim transition-all duration-200 hover:-translate-y-px hover:border-white/20 hover:bg-white/[0.04] hover:text-ink hover:shadow-[0_2px_8px_rgba(0,0,0,0.3)]"
        title="Sort arms"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>SORT</span>
        <ChevronDown size={12} className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-[calc(100%+4px)] left-0 w-full min-w-[80px] rounded-md border border-white/10 bg-[#161618] shadow-xl overflow-hidden z-50 py-1">
          <button 
            onClick={() => handleSort('AMP')}
            className="w-full text-left px-3 py-1.5 text-[10px] font-mono tracking-wider text-blue/70 hover:bg-blue/10 hover:text-blue transition-colors"
          >
            AMP
          </button>
          <button 
            onClick={() => handleSort('FREQ')}
            className="w-full text-left px-3 py-1.5 text-[10px] font-mono tracking-wider text-green/70 hover:bg-green/10 hover:text-green transition-colors"
          >
            FREQ
          </button>
          <button 
            onClick={() => handleSort('PHASE')}
            className="w-full text-left px-3 py-1.5 text-[10px] font-mono tracking-wider text-purple/70 hover:bg-purple/10 hover:text-purple transition-colors"
          >
            PHASE
          </button>
        </div>
      )}
    </div>
  );
}