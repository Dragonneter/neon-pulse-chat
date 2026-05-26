import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';

interface NeonButtonProps extends Omit<HTMLMotionProps<"button">, "onAnimationStart" | "onDragStart" | "onDragEnd" | "onDrag"> {
  variant?: 'primary' | 'secondary' | 'outline';
  glow?: boolean;
}

export const NeonButton: React.FC<NeonButtonProps> = ({ 
  children, 
  variant = 'primary', 
  glow = true,
  className,
  ...props 
}) => {
  const variants = {
    primary: 'bg-neon-purple text-white hover:bg-neon-purple/90',
    secondary: 'bg-neon-pink text-white hover:bg-neon-pink/90',
    outline: 'border border-neon-purple text-neon-purple hover:bg-neon-purple/10',
  };

  const glowClass = glow ? (variant === 'secondary' ? 'glow-pink' : 'glow-purple') : '';

  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      whileHover={{ scale: 1.02 }}
      className={cn(
        'relative px-6 py-3 rounded-2xl font-bold transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer',
        variants[variant],
        glowClass,
        className
      )}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export const NeonCard: React.FC<{ children: React.ReactNode, className?: string }> = ({ children, className }) => (
  <div className={cn('bg-gray-card rounded-3xl p-4 border border-white/5 neon-border', className)}>
    {children}
  </div>
);