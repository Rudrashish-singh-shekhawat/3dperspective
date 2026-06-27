
import React, { useEffect, useRef } from 'react';
import './FourierStandalone.css';

export default function FourierStandalone() {
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;


    let animationId;
    try {
      
    
    } catch(e) { console.error(e); }
    return () => {
      if (animationId) cancelAnimationFrame(animationId);
    };

  }, []);

  return (
    <div className="fourier-container flex flex-col md:flex-row w-full h-full overflow-hidden bg-surface text-ink font-sans antialiased">
      

  <div id="sidebar"
    className="relative z-10 flex h-[40%] md:h-full w-full md:w-[280px] flex-shrink-0 flex-col overflow-hidden border-b md:border-b-0 md:border-r border-white/10 bg-panel backdrop-blur-2xl before:absolute before:left-0 before:right-0 before:top-0 before:z-[1] before:h-[2px] before:bg-gradient-to-r before:from-blue before:via-green before:to-purple before:bg-[length:300%_100%] before:content-[''] before:animate-gradientShift after:absolute after:right-0 after:top-0 after:h-full after:w-px after:bg-gradient-to-b after:from-[rgba(77,159,255,0.15)] after:via-[rgba(62,207,142,0.08)] after:to-[rgba(167,139,250,0.15)] after:content-['']">
    <div id="sidebar-header" className="border-b border-rule px-5 py-5 pb-4">
      <h1 className="font-mono text-[18px] font-semibold leading-none tracking-[-0.02em]">Fourier<span
          className="bg-gradient-to-r from-blue via-green to-purple bg-[length:200%_200%] bg-clip-text font-bold text-transparent animate-gradientShift">·</span>3D
      </h1>
      <p
        className="relative mt-2.5 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-dim after:ml-2 after:inline-block after:h-1.5 after:w-1.5 after:rounded-full after:bg-green after:align-middle after:content-[''] after:shadow-[0_0_8px_rgba(62,207,142,0.5)] after:animate-glowPulseGreen">
        Epicycle workspace</p>
    </div>



    <div id="speed-row"
      className="flex flex-shrink-0 items-center gap-2.5 border-b border-white/5 bg-white/[0.012] px-4 py-3">
      <label className="w-11 whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.08em] text-ink-dim">Speed</label>
      <input type="range" id="speed-slider" min="1" max="100" value="20"
        className="h-0.75 flex-1 cursor-pointer appearance-none rounded-full bg-gradient-to-r from-blue to-purple opacity-70 outline-none transition-opacity hover:opacity-100 [&::-webkit-slider-thumb]:h-3.5 [&::-webkit-slider-thumb]:w-3.5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-0 [&::-webkit-slider-thumb]:bg-[radial-gradient(circle_at_35%_35%,#7ab8ff,#4d9fff)] [&::-webkit-slider-thumb]:shadow-[0_0_8px_rgba(77,159,255,0.5),0_0_2px_rgba(77,159,255,0.8)] [&::-webkit-slider-thumb]:transition-all hover:[&::-webkit-slider-thumb]:scale-110 active:[&::-webkit-slider-thumb]:cursor-grabbing [&::-moz-range-track]:h-0.75 [&::-moz-range-track]:rounded-full [&::-moz-range-track]:border-0 [&::-moz-range-track]:bg-gradient-to-r [&::-moz-range-track]:from-blue [&::-moz-range-track]:to-purple [&::-moz-range-thumb]:h-3.5 [&::-moz-range-thumb]:w-3.5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-[radial-gradient(circle_at_35%_35%,#7ab8ff,#4d9fff)] [&::-moz-range-thumb]:shadow-[0_0_8px_rgba(77,159,255,0.5),0_0_2px_rgba(77,159,255,0.8)]" />
      <span id="speed-val"
        className="w-[34px] text-right font-mono text-[10px] font-medium text-blue [text-shadow:0_0_10px_rgba(77,159,255,0.3)]">1.0×</span>
    </div>

    <div id="add-row" className="flex flex-shrink-0 gap-1.5 border-b border-white/5 px-4 py-3">
      <button
        className="btn btn-add flex h-8 flex-1 items-center justify-center gap-1.5 rounded-md border border-white/10 bg-white/[0.02] font-mono text-[10px] uppercase tracking-[0.06em] text-ink-dim transition-all duration-200 hover:-translate-y-px hover:border-green/50 hover:bg-green/10 hover:text-green hover:shadow-[0_0_14px_rgba(62,207,142,0.12)]"
        id="btn-add">
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.6"
          strokeLinecap="round">
          <line x1="5" y1="1" x2="5" y2="9" />
          <line x1="1" y1="5" x2="9" y2="5" />
        </svg>
        Add arm
      </button>
      <button
        className="btn flex h-8 flex-1 items-center justify-center gap-1.5 rounded-md border border-white/10 bg-white/[0.02] font-mono text-[10px] uppercase tracking-[0.06em] text-ink-dim transition-all duration-200 hover:-translate-y-px hover:border-white/20 hover:bg-white/[0.04] hover:text-ink hover:shadow-[0_2px_8px_rgba(0,0,0,0.3)]"
        id="btn-sort" title="Sort arms by amplitude">
        <svg width="11" height="11" viewBox="0 0 11 11" fill="none" stroke="currentColor" strokeWidth="1.4"
          strokeLinecap="round">
          <line x1="1" y1="2" x2="10" y2="2" />
          <line x1="1" y1="5" x2="7" y2="5" />
          <line x1="1" y1="8" x2="4" y2="8" />
        </svg>
      </button>
      <button
        className="btn flex h-8 flex-1 items-center justify-center gap-1.5 rounded-md border border-white/10 bg-white/[0.02] font-mono text-[9px] uppercase tracking-[0.06em] text-ink-dim transition-all duration-200 hover:-translate-y-px hover:border-white/20 hover:bg-white/[0.04] hover:text-ink hover:shadow-[0_2px_8px_rgba(0,0,0,0.3)]"
        id="btn-square" title="Load square wave preset">SQR</button>
    </div>

    <div id="arm-list"
      className="flex-1 overflow-y-auto py-1 [scrollbar-width:thin] [scrollbar-color:rgba(77,159,255,0.2)_transparent] [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded [&::-webkit-scrollbar-thumb]:bg-gradient-to-b [&::-webkit-scrollbar-thumb]:from-[rgba(77,159,255,0.3)] [&::-webkit-scrollbar-thumb]:to-[rgba(167,139,250,0.3)]">
    </div>

    <div id="stats-bar" className="flex flex-shrink-0 border-t border-white/5 bg-white/[0.012]">
      <div className="stat flex-1 border-r border-white/5 px-3 py-2.5 text-center transition-colors hover:bg-white/[0.02]">
        <span
          className="stat-val block font-mono text-[14px] font-semibold text-ink [text-shadow:0_0_16px_rgba(77,159,255,0.2)]"
          id="stat-arms">3</span>
        <span className="stat-key mt-0.5 block font-mono text-[8px] uppercase tracking-[0.14em] text-ink-mute">Arms</span>
      </div>
      <div className="stat flex-1 border-r border-white/5 px-3 py-2.5 text-center transition-colors hover:bg-white/[0.02]">
        <span
          className="stat-val block font-mono text-[14px] font-semibold text-ink [text-shadow:0_0_16px_rgba(77,159,255,0.2)]"
          id="stat-amp">0</span>
        <span className="stat-key mt-0.5 block font-mono text-[8px] uppercase tracking-[0.14em] text-ink-mute">Max
          amp</span>
      </div>
      <div className="stat flex-1 px-3 py-2.5 text-center transition-colors hover:bg-white/[0.02]">
        <span
          className="stat-val block font-mono text-[14px] font-semibold text-ink [text-shadow:0_0_16px_rgba(77,159,255,0.2)]"
          id="stat-pts">0</span>
        <span className="stat-key mt-0.5 block font-mono text-[8px] uppercase tracking-[0.14em] text-ink-mute">Pts</span>
      </div>
    </div>


  </div>

  <div className="flex flex-col flex-1 h-full overflow-hidden">
    <main className="flex flex-1 overflow-hidden w-full relative">
      <div id="viewport" className="absolute inset-0">
        <canvas id="c" className="block h-full w-full outline-none" onContextMenu={(e) => e.preventDefault()}></canvas>
        <div id="hud" className="pointer-events-none absolute inset-0">
          <div id="eq-overlay"
            className="pointer-events-none absolute left-1/2 top-4 flex max-w-[calc(100%-160px)] -translate-x-1/2 items-baseline gap-2.5 overflow-hidden whitespace-nowrap rounded-lg border border-white/10 bg-[rgba(11,11,10,0.72)] px-5 py-2 backdrop-blur-md">
            <span id="eq-label" className="flex-shrink-0 font-mono text-[10px] tracking-[0.08em] text-ink-mute">f(t)</span>
            <div id="eq-text" className="overflow-hidden text-ellipsis font-mono text-[11px] leading-none text-ink-dim">
            </div>
          </div>
          <div id="view-label"
            className="absolute right-20 top-4 font-mono text-[10px] uppercase tracking-[0.12em] text-ink-mute">PERSPECTIVE
          </div>
          <div id="tip"
            className="absolute bottom-[18px] left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-[10px] tracking-[0.06em] text-ink-mute">
            Drag — rotate &nbsp;·&nbsp; Shift+drag — roll &nbsp;·&nbsp; Scroll — zoom &nbsp;·&nbsp; Right-drag — pan
          </div>
          {/*  Unified Bottom Overlay Wrapper  */}
          <div className="absolute bottom-0 left-0 w-full flex flex-col z-20 pointer-events-none">
            <div id="taskbar"
              className="pointer-events-auto relative flex h-14 md:h-8 flex-shrink-0 items-center justify-between border-t border-white/5 bg-panel/80 backdrop-blur-md px-4 z-30 transition-colors">
              <div id="taskbar-resizer"
                className="absolute left-0 right-0 top-[-2px] h-[4px] cursor-ns-resize hover:bg-blue/40 active:bg-blue/60 z-30 transition-colors"
                style={{ display: "none" }}></div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.14em] text-ink-dim">
                  <span
                    className="h-1.5 w-1.5 rounded-full bg-green shadow-[0_0_8px_rgba(62,207,142,0.5)] animate-glowPulseGreen"></span>
                  System Online
                </div>
              </div>

              <div id="taskbar-center" className="flex items-center gap-1.5">
                <button
                  className="btn flex h-6 px-3 items-center justify-center gap-1.5 overflow-hidden rounded-md border border-white/10 bg-white/[0.02] font-mono text-[9px] uppercase tracking-[0.06em] text-ink-dim transition-all duration-200 hover:-translate-y-px hover:border-white/20 hover:bg-white/[0.04] hover:text-ink hover:shadow-[0_2px_8px_rgba(0,0,0,0.3)] active:translate-y-0 active:border-blue/50 active:bg-blue/10 active:text-blue active:shadow-[0_0_12px_rgba(77,159,255,0.15),inset_0_0_12px_rgba(77,159,255,0.06)] active:animate-borderPulse"
                  id="btn-play" title="Play">
                  <svg width="8" height="9" viewBox="0 0 9 10" fill="currentColor">
                    <path d="M0 0L9 5L0 10Z" />
                  </svg>
                </button>
                <button
                  className="btn flex h-6 px-3 items-center justify-center gap-1.5 overflow-hidden rounded-md border border-white/10 bg-white/[0.02] font-mono text-[9px] uppercase tracking-[0.06em] text-ink-dim transition-all duration-200 hover:-translate-y-px hover:border-white/20 hover:bg-white/[0.04] hover:text-ink hover:shadow-[0_2px_8px_rgba(0,0,0,0.3)] active:translate-y-0 active:border-blue/50 active:bg-blue/10 active:text-blue active:shadow-[0_0_12px_rgba(77,159,255,0.15),inset_0_0_12px_rgba(77,159,255,0.06)] active:animate-borderPulse"
                  id="btn-pause" title="Pause">
                  <svg width="8" height="9" viewBox="0 0 9 10" fill="currentColor">
                    <rect x="0" y="0" width="3" height="10" />
                    <rect x="6" y="0" width="3" height="10" />
                  </svg>
                </button>
                <button
                  className="btn flex h-6 px-3 items-center justify-center gap-1.5 overflow-hidden rounded-md border border-white/10 bg-white/[0.02] font-mono text-[9px] uppercase tracking-[0.06em] text-ink-dim transition-all duration-200 hover:-translate-y-px hover:border-white/20 hover:bg-white/[0.04] hover:text-ink hover:shadow-[0_2px_8px_rgba(0,0,0,0.3)] active:translate-y-0 active:border-blue/50 active:bg-blue/10 active:text-blue active:shadow-[0_0_12px_rgba(77,159,255,0.15),inset_0_0_12px_rgba(77,159,255,0.06)] active:animate-borderPulse"
                  id="btn-reset" title="Reset">
                  <svg width="10" height="10" viewBox="0 0 11 11" fill="none" stroke="currentColor" strokeWidth="1.5"
                    strokeLinecap="round">
                    <path d="M10 5.5A4.5 4.5 0 1 1 5.5 1" />
                    <polyline points="5.5,1 8.5,1 8.5,4" />
                  </svg>
                </button>
                <button
                  className="btn btn-danger flex h-6 px-3 items-center justify-center gap-1.5 overflow-hidden rounded-md border border-white/10 bg-white/[0.02] font-mono text-[9px] uppercase tracking-[0.06em] text-ink-dim transition-all duration-200 hover:-translate-y-px hover:border-white/20 hover:bg-white/[0.04] hover:text-ink hover:shadow-[0_2px_8px_rgba(0,0,0,0.3)] active:translate-y-0 active:border-blue/50 active:bg-blue/10 active:text-blue active:shadow-[0_0_12px_rgba(77,159,255,0.15),inset_0_0_12px_rgba(77,159,255,0.06)] active:animate-borderPulse hover:border-red/50 hover:bg-red/10 hover:text-red hover:shadow-[0_0_14px_rgba(244,124,90,0.12)]"
                  id="btn-clear" title="Clear arms">
                  <svg width="9" height="10" viewBox="0 0 10 11" fill="none" stroke="currentColor" strokeWidth="1.4"
                    strokeLinecap="round">
                    <polyline points="1,3 9,3" />
                    <path d="M2 3V9a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1V3" />
                    <path d="M3.5 3V2a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v1" />
                  </svg>
                </button>
              </div>

              <div id="taskbar-right" className="flex items-center gap-0.75">
                <button
                  className="icon-btn flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-md border border-transparent text-ink-mute transition-all duration-200 hover:-translate-y-px hover:border-white/10 hover:bg-white/[0.05] hover:text-ink active:border-blue/20 active:bg-blue/10 active:text-blue active:shadow-[0_0_10px_rgba(77,159,255,0.1)]"
                  id="btn-settings" title="Settings">
                  <svg width="11" height="11" viewBox="0 0 15 15" fill="none" stroke="currentColor" strokeWidth="1.3"
                    strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="7.5" cy="7.5" r="2" />
                    <path
                      d="M7.5 1v1.5M7.5 12.5V14M1 7.5h1.5M12.5 7.5H14M2.7 2.7l1.06 1.06M11.24 11.24l1.06 1.06M2.7 12.3l1.06-1.06M11.24 3.76l1.06-1.06" />
                  </svg>
                </button>
                <button
                  className="icon-btn flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-md border border-transparent text-ink-mute transition-all duration-200 hover:-translate-y-px hover:border-white/10 hover:bg-white/[0.05] hover:text-ink active:border-blue/20 active:bg-blue/10 active:text-blue active:shadow-[0_0_10px_rgba(77,159,255,0.1)]"
                  id="btn-params" title="Parameters">
                  <svg width="11" height="11" viewBox="0 0 15 15" fill="none" stroke="currentColor" strokeWidth="1.3"
                    strokeLinecap="round">
                    <line x1="2" y1="4" x2="13" y2="4" />
                    <line x1="2" y1="7.5" x2="13" y2="7.5" />
                    <line x1="2" y1="11" x2="13" y2="11" />
                    <circle cx="5" cy="4" r="1.5" fill="currentColor" strokeWidth="1.3" />
                    <circle cx="9" cy="7.5" r="1.5" fill="currentColor" strokeWidth="1.3" />
                    <circle cx="6" cy="11" r="1.5" fill="currentColor" strokeWidth="1.3" />
                  </svg>
                </button>
                <button
                  className="icon-btn flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-md border border-transparent text-ink-mute transition-all duration-200 hover:-translate-y-px hover:border-white/10 hover:bg-white/[0.05] hover:text-ink active:border-blue/20 active:bg-blue/10 active:text-blue active:shadow-[0_0_10px_rgba(77,159,255,0.1)]"
                  id="btn-chart" title="Toggle path">
                  <svg width="11" height="11" viewBox="0 0 15 15" fill="none" stroke="currentColor" strokeWidth="1.3"
                    strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="1,12 4,8 7,10 10,5 14,3" />
                    <rect x="1" y="1" width="13" height="13" rx="1" strokeOpacity="0.3" />
                  </svg>
                </button>
                <button
                  className="icon-btn flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-md border border-transparent text-ink-mute transition-all duration-200 hover:-translate-y-px hover:border-white/10 hover:bg-white/[0.05] hover:text-ink active:border-blue/20 active:bg-blue/10 active:text-blue active:shadow-[0_0_10px_rgba(77,159,255,0.1)]"
                  id="btn-export" title="Export SVG path">
                  <svg width="11" height="11" viewBox="0 0 15 15" fill="none" stroke="currentColor" strokeWidth="1.3"
                    strokeLinecap="round" strokeLinejoin="round">
                    <path d="M8 2H3a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h9a1 1 0 0 0 1-1V7" />
                    <polyline points="10,1 14,1 14,5" />
                    <line x1="6" y1="9" x2="14" y2="1" />
                  </svg>
                </button>
              </div>
            </div>

            <div id="bottom-panel"
              className="pointer-events-auto w-full bg-panel/70 backdrop-blur-md transition-[height,border-color] duration-300 overflow-hidden border-t border-transparent flex"
              style={{ height: "0px" }}>
              {/*  Left Inner Sidebar  */}
              <div id="bp-sidebar-left"
                className="h-full border-white/5 bg-panel-solid/40 flex-shrink-0 transition-all duration-300 overflow-hidden"
                style={{ width: "0px", borderRightWidth: "0px", borderRightStyle: "solid" }}>
                <div className="w-64 p-4">
                  <div className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-ink">Graph Settings
                  </div>
                  <div className="text-[9px] text-ink-mute font-mono mt-2 whitespace-nowrap">Display options for the 2D
                    graph.</div>
                </div>
              </div>

              {/*  Center Canvas Area  */}
              <div className="flex-1 h-full relative overflow-hidden">
                <canvas id="graph-2d" className="block w-full h-full absolute inset-0"></canvas>
              </div>

              {/*  Right Inner Sidebar  */}
              <div id="bp-sidebar-right"
                className="h-full border-white/5 bg-panel-solid/40 flex-shrink-0 transition-all duration-300 overflow-hidden"
                style={{ width: "0px", borderLeftWidth: "0px", borderLeftStyle: "solid" }}>
                <div className="w-64 p-4">
                  <div className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-ink">Analysis</div>
                  <div className="text-[9px] text-ink-mute font-mono mt-2 whitespace-nowrap">Frequency metrics and
                    parameters.</div>
                </div>
              </div>
            </div>
          </div>
    </div></div></main>
  </div>

  
    </div>
  );
}
