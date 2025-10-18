import { motion } from 'motion/react';

interface IndicatorLightsProps {
  active?: boolean;
}

export function IndicatorLights({ active = false }: IndicatorLightsProps) {
  const lights = [
    { color: '#DC143C', label: 'RED' },
    { color: '#FFD700', label: 'GOLD' },
    { color: '#32CD32', label: 'GREEN' },
    { color: '#FFD700', label: 'GOLD' },
    { color: '#DC143C', label: 'RED' },
  ];

  return (
    <div className="flex gap-3 justify-center items-center py-4">
      {lights.map((light, i) => (
        <div key={i} className="flex flex-col items-center gap-1">
          <motion.div
            className="w-6 h-6 rounded-full border-2 border-[#1a1a1a]"
            style={{
              backgroundColor: active ? light.color : '#333',
              boxShadow: active 
                ? `0 0 10px ${light.color}, inset 0 2px 4px rgba(255,255,255,0.4)` 
                : 'inset 0 2px 4px rgba(0,0,0,0.5)'
            }}
            animate={active ? {
              opacity: [0.6, 1, 0.6],
            } : {}}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        </div>
      ))}
    </div>
  );
}
