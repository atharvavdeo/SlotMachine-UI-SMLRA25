import { motion } from 'motion/react';

interface GameUIOverlayProps {
  highScore: number;
  credits: number;
  level: number;
}

export function GameUIOverlay({ highScore, credits, level }: GameUIOverlayProps) {
  return (
    <div className="fixed inset-0 pointer-events-none z-40">
      {/* Top right - High Score */}
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="absolute top-8 right-8 bg-[#0a0e1a] border-4 border-[#ff6b35] p-4"
        style={{
          boxShadow: '0 0 20px rgba(255, 107, 53, 0.5), inset 0 0 10px rgba(255, 107, 53, 0.2)'
        }}
      >
        <div className="text-[#ffd700] text-[8px] mb-2">HIGH SCORE</div>
        <motion.div
          className="text-[#ff6b35] text-center"
          animate={{ 
            textShadow: [
              '0 0 5px #ff6b35',
              '0 0 15px #ff6b35',
              '0 0 5px #ff6b35',
            ]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {highScore.toString().padStart(6, '0')}
        </motion.div>
      </motion.div>
      
      {/* Top left - Level */}
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="absolute top-8 left-8 bg-[#0a0e1a] border-4 border-[#00ff88] p-4"
        style={{
          boxShadow: '0 0 20px rgba(0, 255, 136, 0.5), inset 0 0 10px rgba(0, 255, 136, 0.2)'
        }}
      >
        <div className="text-[#ffd700] text-[8px] mb-2">LEVEL</div>
        <div className="text-[#00ff88] text-center">
          {level}
        </div>
      </motion.div>
      
      {/* Bottom left - Credits */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="absolute bottom-8 left-8 bg-[#0a0e1a] border-4 border-[#ffd700] p-4 px-6"
        style={{
          boxShadow: '0 0 20px rgba(255, 215, 0, 0.5), inset 0 0 10px rgba(255, 215, 0, 0.2)'
        }}
      >
        <div className="text-[#ff6b35] text-[8px] mb-2">CREDITS</div>
        <div className="text-[#ffd700] text-center">
          {credits.toString().padStart(2, '0')}
        </div>
      </motion.div>
      
      {/* Pixel art corner decorations */}
      <div className="absolute top-0 left-0 w-16 h-16 border-l-4 border-t-4 border-[#ff6b35]" />
      <div className="absolute top-0 right-0 w-16 h-16 border-r-4 border-t-4 border-[#ff6b35]" />
      <div className="absolute bottom-0 left-0 w-16 h-16 border-l-4 border-b-4 border-[#ff6b35]" />
      <div className="absolute bottom-0 right-0 w-16 h-16 border-r-4 border-b-4 border-[#ff6b35]" />
    </div>
  );
}
