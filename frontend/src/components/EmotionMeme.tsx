import { motion } from 'motion/react';

interface EmotionMemeProps {
  emotion: string;
  isSpinning?: boolean;
  memeImageUrl?: string | null;
}

// Mock meme data for different emotions
const memeData: Record<string, { title: string; emoji: string; color: string }> = {
  happy: { title: 'PURE JOY!', emoji: '😄', color: '#ffff00' },
  sad: { title: 'BIG MOOD', emoji: '😢', color: '#00ffff' },
  angry: { title: 'MAD LAD!', emoji: '😠', color: '#ff0000' },
  surprised: { title: 'OMG WOW!', emoji: '😲', color: '#ff00ff' },
  neutral: { title: 'POKER FACE', emoji: '😐', color: '#888888' },
  fear: { title: 'SPOOKED!', emoji: '😨', color: '#9966ff' },
  disgust: { title: 'EWW!', emoji: '🤢', color: '#00ff88' },
  default: { title: 'VIBES!', emoji: '✨', color: '#00ffff' }
};

export function EmotionMeme({ emotion, isSpinning = false, memeImageUrl = null }: EmotionMemeProps) {
  const meme = memeData[emotion] || memeData.default;

  if (isSpinning) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center gap-2 overflow-hidden">
        <motion.div
          className="flex flex-col gap-4"
          animate={{ y: [-100, 0, 100] }}
          transition={{ duration: 0.3, repeat: Infinity, ease: "linear" }}
        >
          {Object.values(memeData).map((m, i) => (
            <div key={i} className="text-6xl opacity-50 blur-sm">
              {m.emoji}
            </div>
          ))}
        </motion.div>
      </div>
    );
  }

  // If we have a meme image URL, display the actual meme
  if (memeImageUrl) {
    return (
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
        className="w-full h-full flex items-center justify-center p-2"
      >
        <img 
          src={memeImageUrl} 
          alt={`${emotion} meme`}
          className="max-w-full max-h-full object-contain"
          style={{ 
            filter: `drop-shadow(0 0 20px ${meme.color})`
          }}
        />
      </motion.div>
    );
  }

  // Fallback to emoji display
  return (
    <motion.div
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
      className="w-full h-full flex flex-col items-center justify-center gap-4 p-4"
    >
      {/* Meme emoji in pixel style */}
      <motion.div
        className="text-8xl"
        animate={{ 
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 0.5, repeat: Infinity }}
        style={{ 
          filter: `drop-shadow(0 0 20px ${meme.color})`
        }}
      >
        {meme.emoji}
      </motion.div>
      
      {/* Meme title */}
      <div 
        className="text-center px-4 py-2 border-4"
        style={{ 
          borderColor: meme.color,
          color: meme.color,
          textShadow: `0 0 10px ${meme.color}`
        }}
      >
        {meme.title}
      </div>
      
      {/* Decorative pixels */}
      <div className="flex gap-2 mt-2">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="w-2 h-2"
            style={{ backgroundColor: meme.color }}
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ 
              duration: 1, 
              repeat: Infinity, 
              delay: i * 0.2 
            }}
          />
        ))}
      </div>
    </motion.div>
  );
}
