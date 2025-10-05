import { forwardRef } from 'react';
import { clsx } from 'clsx';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
};

const sizeClasses = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-sm font-medium',
  lg: 'px-6 py-3 text-base font-semibold',
};

const variantClasses = {
  primary:
    'bg-primary text-white shadow-subtle hover:bg-primary/90 focus-visible:outline-primary disabled:bg-primary/40 disabled:cursor-not-allowed',
  secondary:
    'bg-white text-primary border border-primary/20 hover:border-primary focus-visible:outline-primary disabled:opacity-60 disabled:cursor-not-allowed',
  ghost:
    'bg-transparent text-slate-900 hover:bg-slate-100 focus-visible:outline-primary disabled:opacity-60 disabled:cursor-not-allowed',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => (
    <button
      ref={ref}
      className={clsx(
        'inline-flex items-center justify-center rounded-full transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2',
        sizeClasses[size],
        variantClasses[variant],
        className,
      )}
      {...props}
    />
  ),
);

Button.displayName = 'Button';
