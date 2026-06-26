// src/features/fourier/components/BottomPanel/GraphSettings.js
import React from 'react';
import { useFourierStore } from '../../state/FourierStore';

const EyeIcon = ({ isOpen }) => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    {isOpen ? (
      <>
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
      </>
    ) : (
      <>
        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
        <line x1="1" y1="1" x2="23" y2="23" />
      </>
    )}
  </svg>
);

const GOLDEN_ANGLE = 137.507764;

function generateAccent(index) {
  const hue = (index * GOLDEN_ANGLE) % 360;
  return {
    color: `hsl(${hue}, 80%, 65%)`,
    glow: `hsla(${hue}, 80%, 65%, 0.08)`,
    glowStrong: `hsla(${hue}, 80%, 65%, 0.5)`,
  };
}

export function GraphSettings() {
  const circles = useFourierStore((s) => s.circles);
  const isolatedCircleIndices = useFourierStore((s) => s.isolatedCircleIndices);
  const toggleIsolatedCircle = useFourierStore((s) => s.toggleIsolatedCircle);
  const showReal = useFourierStore((s) => s.showReal);
  const showImaginary = useFourierStore((s) => s.showImaginary);
  const toggleShowReal = useFourierStore((s) => s.toggleShowReal);
  const toggleShowImaginary = useFourierStore((s) => s.toggleShowImaginary);
  const showIsolatedReal = useFourierStore((s) => s.showIsolatedReal);
  const showIsolatedImag = useFourierStore((s) => s.showIsolatedImag);
  const toggleShowIsolatedReal = useFourierStore((s) => s.toggleShowIsolatedReal);
  const toggleShowIsolatedImag = useFourierStore((s) => s.toggleShowIsolatedImag);

  return (
    <div className="flex flex-col h-full w-full p-4 border-r border-white/5 bg-panel-solid/40">
      <div className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-ink mb-4 pb-2 border-b border-white/10 flex items-center justify-between">
        <span>Waves</span>
        <span className="text-[9px] text-ink-mute">{circles.length} Active</span>
      </div>
      
      <div className="flex flex-col flex-1 min-h-0 gap-2 overflow-y-auto pr-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        
        {/* Real Legend Card */}
        <div className={`flex justify-between items-center p-2.5 rounded-md bg-white/[0.02] border border-white/5 transition-opacity ${!showReal ? 'opacity-50' : 'opacity-100'}`}>
          <span className="font-mono text-[9px] font-semibold text-blue uppercase tracking-widest">
            Real (X)
          </span>
          <div className="flex items-center gap-3">
            <div className={`w-8 h-0.5 bg-blue ${showReal ? 'shadow-[0_0_8px_rgba(77,159,255,0.6)]' : ''} rounded-full`}></div>
            <button 
              onClick={toggleShowReal}
              className={`p-1 -mr-1 rounded hover:bg-white/10 transition-colors ${showReal ? 'text-blue' : 'text-ink-mute hover:text-ink'}`}
              title={showReal ? "Hide Main Real wave" : "Show Main Real wave"}
            >
              <EyeIcon isOpen={showReal} />
            </button>
          </div>
        </div>

        {/* Imaginary Legend Card */}
        <div className={`flex justify-between items-center p-2.5 rounded-md bg-white/[0.02] border border-white/5 mb-2 transition-opacity ${!showImaginary ? 'opacity-50' : 'opacity-100'}`}>
          <span className="font-mono text-[9px] font-semibold text-purple uppercase tracking-widest">
            Imaginary (Y)
          </span>
          <div className="flex items-center gap-3">
            <div className={`w-8 h-0.5 bg-purple ${showImaginary ? 'shadow-[0_0_8px_rgba(167,139,250,0.6)]' : ''} rounded-full`}></div>
            <button 
              onClick={toggleShowImaginary}
              className={`p-1 -mr-1 rounded hover:bg-white/10 transition-colors ${showImaginary ? 'text-purple' : 'text-ink-mute hover:text-ink'}`}
              title={showImaginary ? "Hide Main Imaginary wave" : "Show Main Imaginary wave"}
            >
              <EyeIcon isOpen={showImaginary} />
            </button>
          </div>
        </div>

        <div className="flex justify-between items-center mb-1 mt-1">
          <div className="font-mono text-[9px] text-ink-mute uppercase tracking-widest">
            Harmonics
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={toggleShowIsolatedReal}
              className={`flex items-center gap-1.5 p-1 rounded hover:bg-white/10 transition-colors ${showIsolatedReal ? 'text-cyan' : 'text-ink-mute hover:text-ink'}`}
              title={showIsolatedReal ? "Hide Isolated Real waves" : "Show Isolated Real waves"}
            >
              <span className="text-[8px] uppercase font-mono font-bold tracking-widest">Real</span>
              <EyeIcon isOpen={showIsolatedReal} />
            </button>
            <button 
              onClick={toggleShowIsolatedImag}
              className={`flex items-center gap-1.5 p-1 rounded hover:bg-white/10 transition-colors ${showIsolatedImag ? 'text-amber' : 'text-ink-mute hover:text-ink'}`}
              title={showIsolatedImag ? "Hide Isolated Imaginary waves" : "Show Isolated Imaginary waves"}
            >
              <span className="text-[8px] uppercase font-mono font-bold tracking-widest">Imag</span>
              <EyeIcon isOpen={showIsolatedImag} />
            </button>
          </div>
        </div>
        {circles.map((circle, idx) => {
          const isIsolated = isolatedCircleIndices.includes(circle.id);
          const accent = generateAccent(circle.id !== undefined ? circle.id : idx);
          
          return (
            <div 
              key={circle.id !== undefined ? circle.id : idx} 
              className={`flex flex-col p-2.5 rounded-md border transition-all ${isIsolated ? '' : 'border-white/5 bg-white/[0.02] hover:bg-white/[0.04]'}`}
              style={isIsolated ? {
                borderColor: accent.color,
                backgroundColor: accent.glow,
                boxShadow: `0 0 12px ${accent.glow}`,
              } : {}}
            >
              <div className="flex justify-between items-center mb-1.5">
                <span 
                  className={`font-mono text-[9px] font-semibold uppercase tracking-widest transition-colors ${isIsolated ? '' : 'text-ink'}`}
                  style={isIsolated ? { color: accent.color } : {}}
                >
                  Wave {idx + 1}
                </span>
                <div className="flex items-center gap-3">
                  <span className="font-mono text-[9px] text-blue">
                    f = {circle.freq}
                  </span>
                  <div className="flex gap-1">
                    <button 
                      onClick={() => toggleIsolatedCircle(circle.id)}
                      className={`p-1 -mr-1 rounded hover:bg-white/10 transition-colors ${isIsolated ? '' : 'text-ink-mute hover:text-ink'}`}
                      style={isIsolated ? { color: accent.color } : {}}
                      title={isIsolated ? "Show all waves" : "Isolate wave"}
                    >
                      <EyeIcon isOpen={isIsolated} />
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="font-mono text-[9px] text-ink-mute">
                  Amp: {circle.radius?.toFixed(1) || '0.0'}
                </span>
                <span className="font-mono text-[9px] text-ink-mute">
                  Phase: {circle.phase?.toFixed(2) || '0.00'}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}