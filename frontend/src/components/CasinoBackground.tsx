import { motion } from 'motion/react';

export function CasinoBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Deep casino background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e1a] via-[#1a1a2e] to-[#0a0e1a]" />
      
      {/* Casino carpet floor */}
      <div className="absolute bottom-0 left-0 right-0 h-1/3 casino-carpet opacity-40" 
        style={{
          transform: 'perspective(500px) rotateX(60deg)',
          transformOrigin: 'bottom'
        }}
      />
      
      {/* Background slot machines - left side */}
      <div className="absolute left-0 top-1/4 w-1/4 h-1/2 opacity-20">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={`left-${i}`}
            className="absolute w-16 h-24 bg-gradient-to-b from-[#6b2d8a] to-[#4a1a6a] border-2 border-[#ff69b4]"
            style={{
              left: `${i * 30}%`,
              top: `${i * 25}%`,
            }}
            animate={{
              boxShadow: [
                '0 0 10px rgba(255, 105, 180, 0.3)',
                '0 0 20px rgba(255, 105, 180, 0.6)',
                '0 0 10px rgba(255, 105, 180, 0.3)',
              ]
            }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
          >
            <div className="w-full h-8 bg-[#ff69b4] mt-2 opacity-50" />
          </motion.div>
        ))}
      </div>
      
      {/* Background slot machines - right side */}
      <div className="absolute right-0 top-1/4 w-1/4 h-1/2 opacity-20">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={`right-${i}`}
            className="absolute w-16 h-24 bg-gradient-to-b from-[#1a4a6f] to-[#0f2942] border-2 border-[#00ff88]"
            style={{
              right: `${i * 30}%`,
              top: `${i * 25}%`,
            }}
            animate={{
              boxShadow: [
                '0 0 10px rgba(0, 255, 136, 0.3)',
                '0 0 20px rgba(0, 255, 136, 0.6)',
                '0 0 10px rgba(0, 255, 136, 0.3)',
              ]
            }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}
          >
            <div className="w-full h-8 bg-[#00ff88] mt-2 opacity-50" />
          </motion.div>
        ))}
      </div>
      
      {/* Atmospheric light rays */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-1 h-full bg-gradient-to-b from-[#ff69b4] via-transparent to-transparent opacity-10 blur-xl" />
        <div className="absolute top-0 right-1/4 w-1 h-full bg-gradient-to-b from-[#00ff88] via-transparent to-transparent opacity-10 blur-xl" />
        <div className="absolute top-0 left-1/2 w-2 h-full bg-gradient-to-b from-[#ffd700] via-transparent to-transparent opacity-15 blur-2xl" />
      </div>
      
      {/* Walking pixel characters */}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={`char-${i}`}
          className="absolute bottom-[15%] w-8 h-12"
          initial={{ x: -50 }}
          animate={{ 
            x: '100vw',
          }}
          transition={{
            duration: 30 + i * 10,
            repeat: Infinity,
            delay: i * 7,
            ease: 'linear'
          }}
        >
          {/* Simple pixel character silhouette */}
          <svg viewBox="0 0 16 24" className="w-full h-full opacity-30">
            <rect x="6" y="0" width="4" height="6" fill="#1a2942" />
            <rect x="4" y="6" width="8" height="8" fill="#1a2942" />
            <rect x="6" y="14" width="4" height="6" fill="#1a2942" />
            <rect x="2" y="8" width="3" height="4" fill="#1a2942" />
            <rect x="11" y="8" width="3" height="4" fill="#1a2942" />
            <rect x="4" y="20" width="3" height="4" fill="#1a2942" />
            <rect x="9" y="20" width="3" height="4" fill="#1a2942" />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}
