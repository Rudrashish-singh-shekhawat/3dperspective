import React from 'react';

export default function Background() {
  return (
    <div 
      className="absolute inset-0 z-0 pointer-events-none"
      style={{
        backgroundColor: '#0a0a0a',
        backgroundImage: `
          radial-gradient(circle at 50% 50%, transparent 20%, rgba(0,0,0,0.8) 120%),
          radial-gradient(circle at 30% 40%, rgba(255,255,255,0.03) 0%, transparent 40%),
          radial-gradient(circle at 70% 60%, rgba(255,255,255,0.02) 0%, transparent 50%),
          repeating-linear-gradient(45deg, rgba(255,255,255,0.015) 0px, transparent 1px, transparent 4px),
          repeating-linear-gradient(-45deg, rgba(255,255,255,0.01) 0px, transparent 1px, transparent 6px),
          repeating-linear-gradient(90deg, rgba(255,255,255,0.01) 0px, transparent 1px, transparent 3px),
          repeating-linear-gradient(0deg, rgba(255,255,255,0.01) 0px, transparent 1px, transparent 5px)
        `,
        boxShadow: 'inset 0 0 150px rgba(0,0,0,0.9)'
      }}
    >
      {/* Additional purely CSS-based large soft smudges */}
      <div className="absolute inset-0 overflow-hidden opacity-30">
        <div className="absolute top-[10%] left-[20%] w-[50vw] h-[40vh] rounded-[100%] bg-gradient-to-r from-white/[0.02] to-transparent blur-[60px] rotate-12" />
        <div className="absolute top-[50%] left-[60%] w-[40vw] h-[50vh] rounded-[100%] bg-gradient-to-l from-white/[0.015] to-transparent blur-[80px] -rotate-12" />
        <div className="absolute top-[70%] left-[10%] w-[30vw] h-[30vh] rounded-[100%] bg-gradient-to-t from-white/[0.02] to-transparent blur-[50px] rotate-45" />
      </div>
    </div>
  );
}
