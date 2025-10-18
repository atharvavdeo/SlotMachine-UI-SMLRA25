import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

interface Coin {
  id: number;
  x: number;
  delay: number;
  duration: number;
  size: number;
}

export function FallingCoins({ isActive = false }: { isActive?: boolean }) {
  const [coins, setCoins] = useState<Coin[]>([]);

  useEffect(() => {
    // Generate initial coins
    const initialCoins = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 3,
      duration: 4 + Math.random() * 3,
      size: 20 + Math.random() * 20,
    }));
    setCoins(initialCoins);
  }, []);

  if (!isActive) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {coins.map((coin) => (
        <motion.div
          key={coin.id}
          className="absolute"
          style={{
            left: `${coin.x}%`,
            top: '-10%',
            width: coin.size,
            height: coin.size,
          }}
          animate={{
            y: ['0vh', '120vh'],
            rotateZ: [0, 720],
            scale: [1, 0.5],
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: coin.duration,
            delay: coin.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          {/* Pixel art coin */}
          <svg viewBox="0 0 32 32" className="w-full h-full">
            <circle cx="16" cy="16" r="14" fill="#ffd700" stroke="#ffaa00" strokeWidth="2" />
            <circle cx="16" cy="16" r="10" fill="#ffea00" />
            <text 
              x="16" 
              y="22" 
              textAnchor="middle" 
              fill="#ff6b35" 
              style={{ fontSize: '16px', fontFamily: 'Press Start 2P', fontWeight: 'bold' }}
            >
              $
            </text>
            {/* Shine effect */}
            <ellipse cx="12" cy="10" rx="4" ry="6" fill="rgba(255, 255, 255, 0.4)" />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}
