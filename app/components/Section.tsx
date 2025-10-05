import { clsx } from 'clsx';

type SectionProps = React.HTMLAttributes<HTMLElement> & {
  background?: 'default' | 'muted' | 'dark';
};

export function Section({ className, children, background = 'default', ...props }: SectionProps) {
  const backgroundClasses = {
    default: 'bg-transparent',
    muted: 'bg-white/5 backdrop-blur border-y border-white/5',
    dark: 'bg-night-800/70 text-slate-50 backdrop-blur border-y border-white/10',
  } satisfies Record<NonNullable<SectionProps['background']>, string>;

  return (
    <section className={clsx('relative py-16 sm:py-20', backgroundClasses[background], className)} {...props}>
      {children}
    </section>
  );
}
