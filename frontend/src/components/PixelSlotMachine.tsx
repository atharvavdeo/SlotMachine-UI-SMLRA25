import { ReactNode } from 'react';
import { ChasingLights } from './ChasingLights';

interface PixelSlotMachineProps {
  children: ReactNode;
}

export function PixelSlotMachine({ children }: PixelSlotMachineProps) {
  return (
    <div className="relative">
      {/* Chasing LED lights around the frame */}
      <ChasingLights />
      
      {/* Main machine body - dark metallic blue */}
      <div 
        className="relative pixel-blue-metal border-8 border-[#ff6b35] p-8"
        style={{
          boxShadow: `
            0 0 40px rgba(255, 107, 53, 0.6),
            0 0 80px rgba(255, 107, 53, 0.3),
            inset 0 4px 12px rgba(0, 0, 0, 0.5),
            inset 0 -4px 12px rgba(255, 255, 255, 0.1)
          `
        }}
      >
        {/* Orange glow accent strips */}
        <div className="absolute top-2 left-2 right-2 h-2 pixel-orange-glow" />
        <div className="absolute bottom-2 left-2 right-2 h-2 pixel-orange-glow" />
        <div className="absolute left-2 top-2 bottom-2 w-2 pixel-orange-glow" />
        <div className="absolute right-2 top-2 bottom-2 w-2 pixel-orange-glow" />
        
        {/* Corner rivets */}
        {[
          { top: 4, left: 4 },
          { top: 4, right: 4 },
          { bottom: 4, left: 4 },
          { bottom: 4, right: 4 },
        ].map((pos, i) => (
          <div
            key={i}
            className="absolute w-4 h-4 rounded-full bg-gradient-to-br from-[#8ba7c7] to-[#4a5a6f] border-2 border-[#2d4a6f]"
            style={pos}
          />
        ))}
        
        {children}
      </div>
    </div>
  );
}
