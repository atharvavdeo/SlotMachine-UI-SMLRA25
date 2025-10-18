import { motion } from 'motion/react';

interface PixelButtonPanelProps {
  buttons: Array<{
    label: string;
    onClick: () => void;
    disabled?: boolean;
    color?: 'orange' | 'gold' | 'green' | 'red';
  }>;
}

export function PixelButtonPanel({ buttons }: PixelButtonPanelProps) {
  const colorStyles = {
    orange: {
      bg: 'pixel-orange-glow',
      border: 'border-[#e85525]',
      text: 'text-[#0a0e1a]',
      shadow: '0 4px 0 #e85525',
      glow: '0 0 10px #ff6b35'
    },
    gold: {
      bg: 'bg-gradient-to-b from-[#ffd700] to-[#daa520]',
      border: 'border-[#b8860b]',
      text: 'text-[#0a0e1a]',
      shadow: '0 4px 0 #b8860b',
      glow: '0 0 10px #ffd700'
    },
    green: {
      bg: 'bg-gradient-to-b from-[#00ff88] to-[#00cc66]',
      border: 'border-[#00aa55]',
      text: 'text-[#0a0e1a]',
      shadow: '0 4px 0 #00aa55',
      glow: '0 0 10px #00ff88'
    },
    red: {
      bg: 'bg-gradient-to-b from-[#ff6b6b] to-[#e85555]',
      border: 'border-[#cc4444]',
      text: 'text-[#fff]',
      shadow: '0 4px 0 #cc4444',
      glow: '0 0 10px #ff6b6b'
    }
  };

  return (
    <div className="flex flex-wrap gap-3 justify-center">
      {buttons.map((button, index) => {
        const style = colorStyles[button.color || 'orange'];
        
        return (
          <motion.button
            key={index}
            onClick={button.onClick}
            disabled={button.disabled}
            className={`
              px-6 py-3 border-4 ${style.bg} ${style.border} ${style.text}
              transition-all duration-100
              disabled:opacity-40 disabled:cursor-not-allowed
              active:translate-y-1
              disabled:active:translate-y-0
            `}
            style={{
              boxShadow: button.disabled ? 'none' : style.shadow,
            }}
            whileHover={!button.disabled ? {
              boxShadow: [style.shadow, `${style.shadow}, ${style.glow}`, style.shadow],
            } : {}}
            transition={{ duration: 0.3 }}
          >
            {button.label}
          </motion.button>
        );
      })}
    </div>
  );
}
