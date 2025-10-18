import { motion } from 'motion/react';

interface SlotLeverProps {
  isActive: boolean;
  isPulled: boolean;
  onPull: () => void;
  disabled?: boolean;
}

export function SlotLever({ isActive, isPulled, onPull, disabled }: SlotLeverProps) {
  return (
    <div className="flex flex-col items-center gap-4">
      {/* Lever base */}
      <div className="relative">
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
          {/* Lever handle */}
          <div className={`w-12 h-12 rounded-full border-4 ${
            isActive && !disabled
              ? 'bg-[#ff0000] border-[#ff0000] neon-glow'
              : 'bg-[#666] border-[#444]'
          }`}
          style={{
            boxShadow: isActive && !disabled ? '0 0 20px #ff0000, inset 0 4px 0 rgba(255,255,255,0.3)' : 'inset 0 4px 0 rgba(0,0,0,0.3)'
          }}
          />
          
          {/* Lever stick */}
          <div 
            className={`absolute top-full left-1/2 -translate-x-1/2 w-4 h-32 ${
              isActive && !disabled ? 'bg-[#888]' : 'bg-[#444]'
            }`}
            style={{
              boxShadow: isActive && !disabled ? 'inset -2px 0 0 rgba(255,255,255,0.3), inset 2px 0 0 rgba(0,0,0,0.3)' : 'inset -2px 0 0 rgba(0,0,0,0.3)'
            }}
          />
        </motion.button>
      </div>
      
      {/* Pull text */}
      {isActive && !disabled && (
        <motion.div
          className="text-[#ffff00] text-center"
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          PULL!
        </motion.div>
      )}
    </div>
  );
}
