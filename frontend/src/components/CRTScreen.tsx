import { ReactNode } from 'react';
import { motion } from 'motion/react';

interface CRTScreenProps {
  children: ReactNode;
  isActive?: boolean;
}

export function CRTScreen({ children, isActive = false }: CRTScreenProps) {
  return (
    <div className="relative">
      {/* Screen bezel */}
      <div className="bg-[#1a2942] border-8 border-[#0f1829] p-4"
        style={{
          boxShadow: 'inset 0 0 20px rgba(0, 0, 0, 0.8), inset 0 4px 8px rgba(255, 107, 53, 0.2)'
        }}
      >
        {/* CRT screen with scanlines */}
        <div 
          className="relative crt-screen w-full h-full overflow-hidden"
          style={{
            boxShadow: 'inset 0 0 40px rgba(0, 0, 0, 0.3)'
          }}
        >
          {/* Content */}
          <div className="relative z-20 w-full h-full">
            {children}
          </div>
          
          {/* Animated scanline */}
          {isActive && (
            <motion.div
              className="absolute left-0 right-0 h-2 bg-gradient-to-b from-transparent via-white to-transparent opacity-20 z-30 pointer-events-none"
              animate={{
                top: ['-5%', '105%'],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'linear',
              }}
            />
          )}
          
          {/* Screen curvature effect */}
          <div 
            className="absolute inset-0 pointer-events-none z-30"
            style={{
              background: 'radial-gradient(circle at center, transparent 60%, rgba(0, 0, 0, 0.3) 100%)'
            }}
          />
        </div>
      </div>
    </div>
  );
}
