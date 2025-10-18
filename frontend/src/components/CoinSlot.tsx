import { motion } from 'motion/react';
import { Coins } from 'lucide-react';
import { useState } from 'react';

interface CoinSlotProps {
  onCoinInsert: () => void;
  disabled?: boolean;
}

export function CoinSlot({ onCoinInsert, disabled }: CoinSlotProps) {
  const [showCoin, setShowCoin] = useState(false);

  const handleClick = () => {
    if (disabled) return;
    
    setShowCoin(true);
    setTimeout(() => {
      onCoinInsert();
      setShowCoin(false);
    }, 600);
  };

  return (
    <div className="relative flex flex-col items-center gap-2">
      {/* Coin slot opening */}
      <button
        onClick={handleClick}
        disabled={disabled}
        className="relative metallic-brass border-4 border-[#8B6914] w-32 h-12 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed hover:brightness-110 transition-all"
      >
        <Coins className="w-6 h-6 text-[#1a1a1a]" />
        <span className="text-[#1a1a1a] text-[8px]">INSERT COIN</span>
        
        {/* Coin slot opening visual */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-2 bg-[#1a1a1a] border-2 border-[#8B6914]" />
      </button>

      {/* Animated coin */}
      {showCoin && (
        <motion.div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full metallic-gold border-2 border-[#B8860B]"
          initial={{ y: -100, rotateZ: 0, opacity: 0 }}
          animate={{ y: 50, rotateZ: 720, opacity: [0, 1, 0] }}
          transition={{ duration: 0.6 }}
        >
          <div className="w-full h-full flex items-center justify-center text-[#8B6914]">$</div>
        </motion.div>
      )}

      <div className="text-[#DAA520] text-[8px] text-center">
        1 COIN = 1 PLAY
      </div>
    </div>
  );
}
