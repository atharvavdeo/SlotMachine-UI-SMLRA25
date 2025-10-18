import { motion } from 'motion/react';

export function SpinningCoin() {
  return (
    <motion.div
      animate={{ 
        rotateY: [0, 360],
      }}
      transition={{ 
        duration: 2, 
        repeat: Infinity, 
        ease: "linear" 
      }}
      className="w-32 h-32"
    >
      {/* Pixel art coin */}
      <svg viewBox="0 0 64 64" className="w-full h-full">
        {/* Coin outer circle */}
        <circle cx="32" cy="32" r="28" fill="#ffff00" stroke="#ff00ff" strokeWidth="3" />
        <circle cx="32" cy="32" r="24" fill="#ffcc00" stroke="#ff00ff" strokeWidth="2" />
        
        {/* Dollar sign */}
        <path d="M 28 16 L 28 48 M 36 16 L 36 48" stroke="#ff00ff" strokeWidth="3" strokeLinecap="square" />
        <path d="M 24 22 L 40 22 M 24 32 L 40 32 M 24 42 L 40 42" stroke="#ff00ff" strokeWidth="3" strokeLinecap="square" />
        
        {/* Pixel details */}
        <rect x="20" y="20" width="4" height="4" fill="#ff00ff" />
        <rect x="40" y="20" width="4" height="4" fill="#ff00ff" />
        <rect x="20" y="40" width="4" height="4" fill="#ff00ff" />
        <rect x="40" y="40" width="4" height="4" fill="#ff00ff" />
      </svg>
    </motion.div>
  );
}
