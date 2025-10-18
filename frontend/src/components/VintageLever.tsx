import { motion } from 'motion/react';

interface VintageLeverProps {
  isActive: boolean;
  isPulled: boolean;
  onPull: () => void;
  disabled?: boolean;
}

export function VintageLever({ isActive, isPulled, onPull, disabled }: VintageLeverProps) {
  return (
    <div className="flex flex-col items-center">
      <motion.button
        onClick={onPull}
        disabled={disabled || !isActive}
        className="relative cursor-pointer disabled:cursor-not-allowed"
        animate={{ 
          rotate: isPulled ? 25 : 0,
        }}
        transition={{ 
          type: "spring", 
          stiffness: 300, 
          damping: 10 
        }}
      >
        {/* Lever ball/handle */}
        <div 
          className={`w-16 h-16 rounded-full border-4 ${
            isActive && !disabled
              ? 'bg-gradient-to-br from-[#DC143C] to-[#8B0000] border-[#660000]'
              : 'bg-gradient-to-br from-[#666] to-[#333] border-[#1a1a1a]'
          }`}
          style={{
            boxShadow: isActive && !disabled 
              ? 'inset 0 4px 8px rgba(255,255,255,0.3), inset 0 -4px 8px rgba(0,0,0,0.5), 0 8px 16px rgba(0,0,0,0.4)' 
              : 'inset 0 4px 8px rgba(0,0,0,0.5), 0 4px 8px rgba(0,0,0,0.4)'
          }}
        >
          {/* Shine effect */}
          <div className="absolute top-2 left-2 w-6 h-6 rounded-full bg-white/30 blur-sm" />
        </div>
        
        {/* Lever stick - metallic brass */}
        <div 
          className="absolute top-full left-1/2 -translate-x-1/2 w-6 h-40 metallic-brass border-2 border-[#8B6914]"
        />
      </motion.button>

      {isActive && !disabled && (
        <motion.div
          className="mt-4 text-[#FFD700] text-center text-[8px] bg-[#8B0000] px-3 py-1 border-2 border-[#FFD700]"
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          PULL!
        </motion.div>
      )}
    </div>
  );
}
