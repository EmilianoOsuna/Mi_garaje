import React from 'react';
import { cn } from '../../utils/cn';

const Button = React.forwardRef(({ className, variant = 'primary', size = 'md', ...props }, ref) => {
  const variants = {
    primary:
      'bg-primary text-white shadow-sm hover:bg-primary-hover active:bg-primary-active active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none',
    secondary:
      'bg-transparent border border-secondary/20 text-secondary hover:bg-secondary/5 active:bg-secondary/10',
    ghost: 'bg-transparent text-brand-on-surface hover:bg-brand-on-surface/5 active:bg-brand-on-surface/10',
  };

  const sizes = {
    sm: 'min-h-9 px-3 py-1.5 text-xs',
    md: 'min-h-11 px-6 py-2.5 text-sm font-medium',
    lg: 'min-h-12 px-8 py-3 text-base font-semibold',
  };

  return (
    <button
      ref={ref}
      className={cn(
        'inline-flex items-center justify-center rounded-lg transition-colors duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-surface',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    />
  );
});

Button.displayName = 'Button';

export default Button;
