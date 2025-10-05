import { clsx } from 'clsx';

type ContainerProps = React.HTMLAttributes<HTMLDivElement> & {
  width?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
};

const widths: Record<NonNullable<ContainerProps['width']>, string> = {
  sm: 'max-w-2xl',
  md: 'max-w-3xl',
  lg: 'max-w-5xl',
  xl: 'max-w-6xl',
  full: 'max-w-none',
};

export function Container({ className, width = 'xl', ...props }: ContainerProps) {
  return (
    <div className={clsx('mx-auto w-full px-4 sm:px-6 lg:px-8', widths[width], className)} {...props} />
  );
}
