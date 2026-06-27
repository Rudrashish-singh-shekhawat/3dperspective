import React from 'react';

export default function Background() {
  // A lightweight SVG grid texture to replace expensive CSS repeating-linear-gradients
  const svgGrid = `url("data:image/svg+xml,%3Csvg width='40' height='40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M 40 0 L 0 0 0 40' fill='none' stroke='rgba(255,255,255,0.03)' stroke-width='1'/%3E%3Cpath d='M 20 0 L 20 40 M 0 20 L 40 20' fill='none' stroke='rgba(255,255,255,0.01)' stroke-width='0.5'/%3E%3C/svg%3E")`;

  return (
    <div 
      className="absolute inset-0 z-0 pointer-events-none"
      style={{
        backgroundColor: '#0a0a0a',
        backgroundImage: `
          radial-gradient(circle at 50% 50%, transparent 20%, rgba(0,0,0,0.8) 120%),
          radial-gradient(circle at 30% 40%, rgba(255,255,255,0.03) 0%, transparent 40%),
          radial-gradient(circle at 70% 60%, rgba(255,255,255,0.02) 0%, transparent 50%),
          ${svgGrid}
        `,
        backgroundSize: '100% 100%, 100% 100%, 100% 100%, 40px 40px',
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
