// src/features/fourier/components/BottomPanel/AnalysisPanel.js
import React from 'react';

function Metric({ label, value, color }) {
  return (
    <div className="flex flex-col gap-1 p-2.5 rounded-md bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-colors">
      <span className="font-mono text-[9px] uppercase tracking-wider text-ink-dim">{label}</span>
      <span className={`font-mono text-xs font-semibold ${color}`}>{value}</span>
    </div>
  );
}

export function AnalysisPanel() {
  return (
    <div className="flex flex-col h-full w-full p-4 border-l border-white/5 bg-panel-solid/40">
      <div className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-ink mb-4 pb-2 border-b border-white/10 flex items-center justify-between">
        <span>Analysis</span>
        <div className="w-1.5 h-1.5 rounded-full bg-blue animate-pulse"></div>
      </div>
      
      <div className="flex flex-col gap-2 overflow-hidden">
        <Metric label="Fundamental Freq" value="1.00 Hz" color="text-blue" />
        <Metric label="Peak Amplitude" value="127.32" color="text-green" />
        <Metric label="Harmonics" value="6 Active" color="text-purple" />
        <Metric label="Signal Energy" value="84.2%" color="text-red" />
        
        <div className="mt-2 p-3 rounded-md bg-black/20 border border-white/5">
          <div className="flex justify-between items-end mb-2">
            <span className="font-mono text-[9px] text-ink-mute uppercase tracking-widest">Convergence</span>
            <span className="font-mono text-[10px] text-green">Good</span>
          </div>
          <div className="w-full bg-white/5 h-1 rounded-full overflow-hidden">
            <div className="bg-gradient-to-r from-blue via-green to-purple h-full w-[85%] rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
}