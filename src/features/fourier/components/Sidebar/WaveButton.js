import React, { useState, useRef, useEffect } from 'react';
import { useFourierStore } from '../../state/FourierStore';
import { ChevronDown } from 'lucide-react';

/**
 * "Wave" button dropdown.
 * Replaces the old SQR button. Loads one of 4 preset waves: SQR, SAW, TRI, RND.
 */
export function WaveButton() {
  const setCircles = useFourierStore((s) => s.setCircles);

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

  const loadWave = (type) => {
    const wave = [];
    const numArms = 6;
    
    if (type === 'SQR') {
      for (let i = 0; i < numArms; i++) {
        const freq = 1 + i * 2;
        wave.push({ radius: 100 * (4 / (freq * Math.PI)), freq, phase: 0 });
      }
    } else if (type === 'SAW') {
      for (let i = 0; i < numArms; i++) {
        const freq = i + 1;
        const sign = i % 2 === 0 ? 1 : -1; // alternating signs for standard sawtooth
        wave.push({ radius: 100 * (2 / (freq * Math.PI)), freq, phase: sign < 0 ? Math.PI : 0 });
      }
    } else if (type === 'TRI') {
      for (let i = 0; i < numArms; i++) {
        const freq = 1 + i * 2;
        // Triangle: 1/n^2, alternating sign
        const sign = i % 2 === 0 ? 1 : -1;
        wave.push({ radius: 100 * (8 / (freq * freq * Math.PI * Math.PI)), freq, phase: sign < 0 ? Math.PI : 0 });
      }
    } else if (type === 'RND') {
      for (let i = 0; i < numArms; i++) {
        const freq = Math.floor(Math.random() * 5) + 1; // 1 to 5
        const radius = Math.random() * 80 + 20; // 20 to 100
        const phase = Math.random() * Math.PI * 2;
        wave.push({ radius, freq, phase });
      }
    }
    
    setCircles(wave);
    setIsOpen(false);
  };

  return (
    <div className="relative flex-1 flex z-50" ref={containerRef}>
      <button
        className="btn flex h-8 flex-1 items-center justify-center gap-1.5 rounded-md border border-white/10 bg-white/[0.02] font-mono text-[9px] uppercase tracking-[0.06em] text-ink-dim transition-all duration-200 hover:-translate-y-px hover:border-white/20 hover:bg-white/[0.04] hover:text-ink hover:shadow-[0_2px_8px_rgba(0,0,0,0.3)]"
        title="Load wave preset"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>WAVE</span>
        <ChevronDown size={12} className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-[calc(100%+4px)] right-0 w-full min-w-[80px] rounded-md border border-white/10 bg-[#161618] shadow-xl overflow-hidden z-50 py-1">
          <button 
            onClick={() => loadWave('SQR')}
            className="w-full text-left px-3 py-1.5 text-[10px] font-mono tracking-wider text-cyan/70 hover:bg-cyan/10 hover:text-cyan transition-colors"
          >
            SQR
          </button>
          <button 
            onClick={() => loadWave('SAW')}
            className="w-full text-left px-3 py-1.5 text-[10px] font-mono tracking-wider text-green/70 hover:bg-green/10 hover:text-green transition-colors"
          >
            SAW
          </button>
          <button 
            onClick={() => loadWave('TRI')}
            className="w-full text-left px-3 py-1.5 text-[10px] font-mono tracking-wider text-purple/70 hover:bg-purple/10 hover:text-purple transition-colors"
          >
            TRI
          </button>
          <button 
            onClick={() => loadWave('RND')}
            className="w-full text-left px-3 py-1.5 text-[10px] font-mono tracking-wider text-amber/70 hover:bg-amber/10 hover:text-amber transition-colors"
          >
            RND
          </button>
        </div>
      )}
    </div>
  );
}
