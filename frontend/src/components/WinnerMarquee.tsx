import { motion } from 'motion/react';

interface WinnerMarqueeProps {
  show: boolean;
  emotion: string;
}

export function WinnerMarquee({ show, emotion }: WinnerMarqueeProps) {
  if (!show) return null;

  return (
    <motion.div
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
      className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50"
    >
      <div className="relative">
        {/* Outer glow */}
        <motion.div
          className="absolute inset-0 blur-xl"
          animate={{ 
            opacity: [0.5, 1, 0.5],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          <div className="w-full h-full bg-[#ffff00]" />
        </motion.div>
        
        {/* Main sign */}
        <div className="relative bg-[#0a0014] border-8 border-[#ffff00] px-8 py-4"
          style={{
            boxShadow: '0 0 30px #ffff00, inset 0 0 20px rgba(255,255,0,0.2)'
          }}
        >
          <motion.div
            className="text-[#ffff00] text-center whitespace-nowrap"
            animate={{ 
              textShadow: [
                '0 0 10px #ffff00',
                '0 0 20px #ffff00, 0 0 30px #ffff00',
                '0 0 10px #ffff00'
              ]
            }}
            transition={{ duration: 0.5, repeat: Infinity }}
          >
            <div className="mb-2">★ WINNER! ★</div>
            <div className="text-[8px] text-[#00ffff]">EMOTIONAL JACKPOT</div>
            <div className="text-[8px] text-[#ff00ff] mt-1">{emotion.toUpperCase()}</div>
          </motion.div>
        </div>
        
        {/* Corner decorations */}
        <div className="absolute -top-2 -left-2 w-4 h-4 bg-[#ff00ff] border-2 border-[#ffff00]" />
        <div className="absolute -top-2 -right-2 w-4 h-4 bg-[#ff00ff] border-2 border-[#ffff00]" />
        <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-[#ff00ff] border-2 border-[#ffff00]" />
        <div className="absolute -bottom-2 -right-2 w-4 h-4 bg-[#ff00ff] border-2 border-[#ffff00]" />
      </div>
    </motion.div>
  );
}
