import { clsx } from 'clsx';

type BadgeProps = React.HTMLAttributes<HTMLSpanElement> & {
  variant?: 'primary' | 'accent' | 'neutral';
};

const variants = {
  primary: 'border border-primary/30 bg-primary/20 text-white shadow-lg shadow-primary/20',
  accent: 'border border-accent/30 bg-accent/20 text-white shadow-lg shadow-accent/10',
  neutral: 'border border-white/10 bg-white/10 text-slate-200',
} satisfies Record<NonNullable<BadgeProps['variant']>, string>;

export function Badge({ className, variant = 'primary', ...props }: BadgeProps) {
  return (
    <span
      className={clsx('inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide', variants[variant], className)}
      {...props}
    />
  );
}
