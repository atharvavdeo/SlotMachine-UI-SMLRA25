import { ButtonHTMLAttributes, ReactNode } from 'react';

interface VintageButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'red' | 'gold' | 'green';
  children: ReactNode;
  size?: 'small' | 'medium' | 'large';
}

export function VintageButton({ 
  variant = 'red', 
  children, 
  size = 'medium',
  className = '',
  disabled,
  ...props 
}: VintageButtonProps) {
  const baseStyles = 'border-4 transition-all duration-100 active:translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:translate-y-0';
  
  const sizes = {
    small: 'px-3 py-2 text-[8px]',
    medium: 'px-4 py-3 text-[10px]',
    large: 'px-6 py-4 text-[12px]'
  };

  const variants = {
    red: 'red-gradient border-[#660000] text-[#FFD700] shadow-[0_4px_0_#660000]',
    gold: 'metallic-gold border-[#B8860B] text-[#1a1a1a] shadow-[0_4px_0_#B8860B]',
    green: 'bg-gradient-to-b from-[#228B22] to-[#006400] border-[#004d00] text-[#FFD700] shadow-[0_4px_0_#004d00]'
  };

  return (
    <button
      className={`${baseStyles} ${sizes[size]} ${variants[variant]} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
