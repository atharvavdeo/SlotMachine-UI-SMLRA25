import { motion } from 'motion/react';

export function ChasingLights() {
  const lights = Array.from({ length: 40 });
  
  return (
    <div className="absolute -inset-2 overflow-hidden pointer-events-none">
      {/* Top lights */}
      <div className="absolute top-0 left-0 right-0 h-4 flex">
        {lights.map((_, i) => (
          <motion.div
            key={`top-${i}`}
            className="w-4 h-4 mx-1"
            style={{
              background: i % 3 === 0 ? '#ff6b35' : i % 3 === 1 ? '#ffd700' : '#ff69b4',
              borderRadius: '50%',
            }}
            animate={{
              opacity: [0.3, 1, 0.3],
              boxShadow: [
                '0 0 2px currentColor',
                '0 0 8px currentColor, 0 0 12px currentColor',
                '0 0 2px currentColor',
              ],
            }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              delay: i * 0.05,
            }}
          />
        ))}
      </div>
      
      {/* Bottom lights */}
      <div className="absolute bottom-0 left-0 right-0 h-4 flex">
        {lights.map((_, i) => (
          <motion.div
            key={`bottom-${i}`}
            className="w-4 h-4 mx-1"
            style={{
              background: i % 3 === 0 ? '#ffd700' : i % 3 === 1 ? '#ff69b4' : '#ff6b35',
              borderRadius: '50%',
            }}
            animate={{
              opacity: [0.3, 1, 0.3],
              boxShadow: [
                '0 0 2px currentColor',
                '0 0 8px currentColor, 0 0 12px currentColor',
                '0 0 2px currentColor',
              ],
            }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              delay: i * 0.05 + 0.3,
            }}
          />
        ))}
      </div>
      
      {/* Left lights */}
      <div className="absolute top-0 left-0 bottom-0 w-4 flex flex-col">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={`left-${i}`}
            className="w-4 h-4 my-1"
            style={{
              background: i % 3 === 0 ? '#ff69b4' : i % 3 === 1 ? '#ff6b35' : '#ffd700',
              borderRadius: '50%',
            }}
            animate={{
              opacity: [0.3, 1, 0.3],
              boxShadow: [
                '0 0 2px currentColor',
                '0 0 8px currentColor, 0 0 12px currentColor',
                '0 0 2px currentColor',
              ],
            }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              delay: i * 0.05 + 0.15,
            }}
          />
        ))}
      </div>
      
      {/* Right lights */}
      <div className="absolute top-0 right-0 bottom-0 w-4 flex flex-col">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={`right-${i}`}
            className="w-4 h-4 my-1"
            style={{
              background: i % 3 === 0 ? '#ffd700' : i % 3 === 1 ? '#ff6b35' : '#ff69b4',
              borderRadius: '50%',
            }}
            animate={{
              opacity: [0.3, 1, 0.3],
              boxShadow: [
                '0 0 2px currentColor',
                '0 0 8px currentColor, 0 0 12px currentColor',
                '0 0 2px currentColor',
              ],
            }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              delay: i * 0.05 + 0.45,
            }}
          />
        ))}
      </div>
    </div>
  );
}
