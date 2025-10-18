import { motion } from 'motion/react';

interface WinBannerProps {
  show: boolean;
  emotion: string;
}

export function WinBanner({ show, emotion }: WinBannerProps) {
  if (!show) return null;

  return (
    <motion.div
      initial={{ scale: 0, y: -100 }}
      animate={{ scale: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
      className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50"
    >
      <div className="relative">
        {/* Main banner */}
        <div className="red-gradient border-8 border-[#FFD700] px-12 py-6"
          style={{
            boxShadow: '0 8px 24px rgba(0,0,0,0.5), inset 0 4px 8px rgba(255,215,0,0.3)'
          }}
        >
          <motion.div
            className="text-[#FFD700] text-center"
            animate={{ 
              scale: [1, 1.05, 1],
            }}
            transition={{ duration: 0.5, repeat: Infinity }}
          >
            <div className="mb-2">★ ★ ★ WINNER! ★ ★ ★</div>
            <div className="text-[10px] text-[#FFF8DC] mt-2">
              EMOTION: {emotion.toUpperCase()}
            </div>
          </motion.div>
        </div>
        
        {/* Corner ornaments */}
        <div className="absolute -top-3 -left-3 w-6 h-6 metallic-gold border-2 border-[#8B6914] rotate-45" />
        <div className="absolute -top-3 -right-3 w-6 h-6 metallic-gold border-2 border-[#8B6914] rotate-45" />
        <div className="absolute -bottom-3 -left-3 w-6 h-6 metallic-gold border-2 border-[#8B6914] rotate-45" />
        <div className="absolute -bottom-3 -right-3 w-6 h-6 metallic-gold border-2 border-[#8B6914] rotate-45" />
      </div>
    </motion.div>
  );
}
