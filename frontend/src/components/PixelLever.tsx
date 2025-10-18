import { motion } from 'motion/react';

interface PixelLeverProps {
  isActive: boolean;
  isPulled: boolean;
  onPull: () => void;
  disabled?: boolean;
}

export function PixelLever({ isActive, isPulled, onPull, disabled }: PixelLeverProps) {
  return (
    <div className="flex flex-col items-center gap-4">
      <motion.button
        onClick={onPull}
        disabled={disabled || !isActive}
        className="relative cursor-pointer disabled:cursor-not-allowed"
        animate={{ 
          rotate: isPulled ? 30 : 0,
        }}
        transition={{ 
          type: "spring", 
          stiffness: 300, 
          damping: 10 
        }}
      >
        {/* Lever ball - chunky pixel style */}
        <div className="relative w-20 h-20">
          {/* Outer glow when active */}
          {isActive && !disabled && (
            <motion.div
              className="absolute inset-0 rounded-full"
              animate={{
                boxShadow: [
                  '0 0 20px #ff6b35',
                  '0 0 40px #ff6b35, 0 0 60px #ff9066',
                  '0 0 20px #ff6b35',
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          )}
          
          {/* Ball */}
          <div 
            className={`relative w-full h-full rounded-full ${
              isActive && !disabled
                ? 'pixel-orange-glow'
                : 'bg-gradient-to-br from-[#4a5a6f] to-[#2d4a6f]'
            }`}
            style={{
              boxShadow: isActive && !disabled 
                ? 'inset 0 -8px 0 rgba(0, 0, 0, 0.4), inset 0 8px 0 rgba(255, 255, 255, 0.3)' 
                : 'inset 0 -8px 0 rgba(0, 0, 0, 0.6), inset 0 4px 0 rgba(255, 255, 255, 0.1)'
            }}
          >
            {/* Pixel highlight */}
            <div className="absolute top-4 left-4 w-8 h-8 rounded-full bg-white opacity-40" />
          </div>
        </div>
        
        {/* Lever stick - metallic */}
        <div 
          className="absolute top-full left-1/2 -translate-x-1/2 w-6 h-48 pixel-blue-metal border-4 border-[#0f1829]"
          style={{
            boxShadow: 'inset -2px 0 4px rgba(255, 255, 255, 0.2), inset 2px 0 4px rgba(0, 0, 0, 0.4)'
          }}
        />
        
        {/* Bottom base */}
        <div 
          className="absolute top-full left-1/2 -translate-x-1/2 translate-y-48 w-16 h-8 bg-[#1a2942] border-4 border-[#0f1829]"
          style={{
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.6)'
          }}
        />
      </motion.button>

      {isActive && !disabled && (
        <motion.div
          className="mt-52 px-4 py-2 bg-[#ff6b35] border-4 border-[#e85525] text-[#0a0e1a] text-center"
          animate={{ 
            y: [0, -8, 0],
            boxShadow: [
              '0 0 10px #ff6b35',
              '0 0 20px #ff6b35, 0 0 30px #ff9066',
              '0 0 10px #ff6b35',
            ]
          }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          PULL ME!
        </motion.div>
      )}
    </div>
  );
}
