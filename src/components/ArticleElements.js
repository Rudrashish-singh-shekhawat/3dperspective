import React from 'react';

/* ─── Section divider ─── */
export function Divider() {
  return <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />;
}

/* ─── Section heading ─── */
export function SectionHead({ icon: Icon, color, title, subtitle }) {
  const colors = {
    blue: 'bg-blue/10 border-blue/20 text-blue shadow-[0_0_20px_rgba(59,130,246,0.1)]',
    purple: 'bg-purple/10 border-purple/20 text-purple shadow-[0_0_20px_rgba(168,85,247,0.1)]',
    green: 'bg-green/10 border-green/20 text-green shadow-[0_0_20px_rgba(34,197,94,0.1)]',
    amber: 'bg-yellow/10 border-yellow/20 text-yellow shadow-[0_0_20px_rgba(234,179,8,0.1)]',
    pink: 'bg-pink/10 border-pink/20 text-pink shadow-[0_0_20px_rgba(236,72,153,0.1)]',
    red: 'bg-red/10 border-red/20 text-red shadow-[0_0_20px_rgba(239,68,68,0.1)]',
  };
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-3 sm:gap-4">
        <div className={`shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl flex items-center justify-center border ${colors[color]}`}>
          <Icon size={20} className="sm:w-6 sm:h-6" />
        </div>
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight leading-snug">{title}</h2>
      </div>
      {subtitle && <p className="text-white/60 ml-14 sm:ml-16 text-xs sm:text-sm font-mono uppercase tracking-widest">{subtitle}</p>}
    </div>
  );
}

/* ─── Info card ─── */
export function InfoCard({ icon: Icon, title, children, accent = 'blue' }) {
  const accents = {
    blue: 'border-blue/20 hover:bg-blue/80 hover:border-blue/80',
    purple: 'border-purple/20 hover:bg-purple/80 hover:border-purple/80',
    green: 'border-green/20 hover:bg-green/80 hover:border-green/80',
    amber: 'border-yellow/20 hover:bg-yellow/80 hover:border-yellow/80',
    pink: 'border-pink/20 hover:bg-pink/80 hover:border-pink/80',
  };
  return (
    <div className={`group p-5 md:p-6 rounded-2xl bg-white/[0.02] border ${accents[accent]} transition-all duration-500 ease-in-out flex flex-col gap-3 cursor-default`}>
      <div className="flex items-center gap-3">
        <Icon size={20} className="text-white/60 group-hover:text-white transition-all duration-500 ease-in-out" />
        <h4 className="font-semibold text-white group-hover:text-white transition-all duration-500 ease-in-out">{title}</h4>
      </div>
      <p className="text-white/60 leading-relaxed text-[15px] group-hover:text-white/80 transition-all duration-500 ease-in-out">{children}</p>
    </div>
  );
}
