import { clsx } from 'clsx';
import type { ComponentPropsWithoutRef, ElementType } from 'react';

type CardProps<T extends ElementType> = {
  as?: T;
  className?: string;
} & Omit<ComponentPropsWithoutRef<T>, 'as' | 'className'>;

export function Card<T extends ElementType = 'div'>({ as, className, ...props }: CardProps<T>) {
  const Component = (as ?? 'div') as ElementType;
  return (
    <Component
      className={clsx(
        'rounded-2xl border border-slate-200 bg-white/80 p-6 shadow-sm backdrop-blur transition hover:-translate-y-1 hover:shadow-subtle',
        className,
      )}
      {...(props as Record<string, unknown>)}
    />
  );
}
