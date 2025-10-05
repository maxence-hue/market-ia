import { clsx } from 'clsx';

type SectionProps = React.HTMLAttributes<HTMLElement> & {
  background?: 'default' | 'muted' | 'dark';
};

export function Section({ className, children, background = 'default', ...props }: SectionProps) {
  const backgroundClasses = {
    default: 'bg-transparent',
    muted: 'bg-slate-100',
    dark: 'bg-dark text-slate-50',
  } satisfies Record<NonNullable<SectionProps['background']>, string>;

  return (
    <section className={clsx('py-16 sm:py-20', backgroundClasses[background], className)} {...props}>
      {children}
    </section>
  );
}
