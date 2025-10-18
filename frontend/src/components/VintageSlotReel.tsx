import { ReactNode } from 'react';

interface VintageSlotReelProps {
  children: ReactNode;
  isSpinning?: boolean;
}

export function VintageSlotReel({ children, isSpinning = false }: VintageSlotReelProps) {
  return (
    <div className="relative">
      {/* Outer wood frame */}
      <div className="wood-texture border-8 border-[#4a3219] p-4">
        {/* Inner brass frame */}
        <div className="metallic-brass border-4 border-[#8B6914] p-2">
          {/* Reel window */}
          <div 
            className="relative w-full h-full bg-[#FFF8DC] border-4 border-[#1a1a1a] overflow-hidden"
            style={{
              boxShadow: 'inset 0 0 20px rgba(0,0,0,0.3)'
            }}
          >
            {/* Content */}
            <div className={`w-full h-full flex items-center justify-center ${isSpinning ? 'animate-pulse' : ''}`}>
              {children}
            </div>

            {/* Glass reflection effect */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-white/20 to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
