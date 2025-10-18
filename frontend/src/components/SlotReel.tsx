import { ReactNode } from 'react';

interface SlotReelProps {
  children: ReactNode;
  isSpinning?: boolean;
  glowColor?: string;
}

export function SlotReel({ children, isSpinning = false, glowColor = '#ff00ff' }: SlotReelProps) {
  return (
    <div 
      className="relative w-full h-full border-8 bg-[#1a0a2e] overflow-hidden"
      style={{ 
        borderColor: glowColor,
        boxShadow: `0 0 20px ${glowColor}, inset 0 0 20px rgba(0,0,0,0.5)`
      }}
    >
      {/* Scanline effect */}
      <div className="absolute inset-0 pointer-events-none z-10">
        <div className="w-full h-full" style={{
          background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.1) 2px, rgba(0,0,0,0.1) 4px)'
        }} />
      </div>
      
      {/* Content */}
      <div className={`w-full h-full flex items-center justify-center ${isSpinning ? 'animate-pulse' : ''}`}>
        {children}
      </div>
    </div>
  );
}
