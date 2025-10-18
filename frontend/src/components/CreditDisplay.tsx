import { motion } from 'motion/react';

interface CreditDisplayProps {
  credits: number;
  wins: number;
}

export function CreditDisplay({ credits, wins }: CreditDisplayProps) {
  return (
    <div className="flex gap-4 justify-center">
      {/* Credits */}
      <div className="flex flex-col items-center gap-1">
        <div className="text-[#DAA520] text-[8px]">CREDITS</div>
        <div className="bg-[#1a1a1a] border-4 border-[#B8860B] px-6 py-2 min-w-[100px]">
          <motion.div
            key={credits}
            initial={{ scale: 1.5, color: '#FFD700' }}
            animate={{ scale: 1, color: '#DC143C' }}
            className="text-center"
          >
            {credits}
          </motion.div>
        </div>
      </div>

      {/* Wins */}
      <div className="flex flex-col items-center gap-1">
        <div className="text-[#DAA520] text-[8px]">WINS</div>
        <div className="bg-[#1a1a1a] border-4 border-[#B8860B] px-6 py-2 min-w-[100px]">
          <motion.div
            key={wins}
            initial={{ scale: 1.5, color: '#FFD700' }}
            animate={{ scale: 1, color: '#DC143C' }}
            className="text-center"
          >
            {wins}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
