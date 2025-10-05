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
        'rounded-2xl border border-white/10 bg-white/10 p-6 text-slate-100 shadow-[0_20px_45px_-30px_rgba(139,92,246,0.7)] backdrop-blur transition hover:-translate-y-1 hover:shadow-[0_25px_55px_-25px_rgba(34,211,238,0.4)]',
        className,
      )}
      {...(props as Record<string, unknown>)}
    />
  );
}
