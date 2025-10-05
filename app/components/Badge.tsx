import { clsx } from 'clsx';

type BadgeProps = React.HTMLAttributes<HTMLSpanElement> & {
  variant?: 'primary' | 'accent' | 'neutral';
};

const variants = {
  primary: 'bg-primary/10 text-primary border border-primary/20',
  accent: 'bg-accent/10 text-accent border border-accent/20',
  neutral: 'bg-slate-200 text-slate-700 border border-slate-300',
} satisfies Record<NonNullable<BadgeProps['variant']>, string>;

export function Badge({ className, variant = 'primary', ...props }: BadgeProps) {
  return (
    <span
      className={clsx('inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide', variants[variant], className)}
      {...props}
    />
  );
}
