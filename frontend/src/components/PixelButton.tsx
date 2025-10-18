import { ButtonHTMLAttributes, ReactNode } from 'react';

interface PixelButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent';
  children: ReactNode;
  glow?: boolean;
}

export function PixelButton({ 
  variant = 'primary', 
  children, 
  glow = false,
  className = '',
  disabled,
  ...props 
}: PixelButtonProps) {
  const baseStyles = 'px-6 py-3 border-4 transition-all duration-100 active:translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:translate-y-0';
  
  const variants = {
    primary: 'bg-[#ff00ff] border-[#ff00ff] text-white hover:bg-[#cc00cc] shadow-[4px_4px_0_#cc00cc]',
    secondary: 'bg-[#00ffff] border-[#00ffff] text-[#0a0014] hover:bg-[#00cccc] shadow-[4px_4px_0_#00cccc]',
    accent: 'bg-[#ffff00] border-[#ffff00] text-[#0a0014] hover:bg-[#cccc00] shadow-[4px_4px_0_#cccc00]'
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${glow ? 'neon-glow' : ''} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
