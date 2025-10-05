import Link from 'next/link';
import { Card } from './Card';
import { clsx } from 'clsx';

type PricingPlan = {
  name: string;
  price: string;
  description: string;
  features: string[];
  badge?: string;
  billing?: string;
  ctaLabel?: string;
  ctaHref?: string;
};

type PricingTableProps = {
  plans: PricingPlan[];
};

export function PricingTable({ plans }: PricingTableProps) {
  return (
    <div className="grid gap-8 lg:grid-cols-3">
      {plans.map((plan) => (
        <Card key={plan.name} className="flex h-full flex-col">
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-white">{plan.name}</h3>
              {plan.badge ? (
                <span className="rounded-full border border-primary/30 bg-primary/20 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white shadow-lg shadow-primary/20">
                  {plan.badge}
                </span>
              ) : null}
            </div>
            <p className="mt-2 text-sm text-slate-300">{plan.description}</p>
            <p className="mt-6 text-3xl font-bold text-white">
              {plan.price}
              {(() => {
                const billingLabel = plan.billing ?? (plan.price.toLowerCase().includes('sur devis') ? '' : 'HT / mois');
                return billingLabel ? (
                  <span className="ml-1 text-base font-medium text-slate-300">{billingLabel}</span>
                ) : null;
              })()}
            </p>
            <ul className="mt-6 space-y-3 text-sm text-slate-200">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2">
                  <span aria-hidden className="mt-1 h-2 w-2 rounded-full bg-accent" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
          <Link
            href={plan.ctaHref ?? '/contact'}
            aria-label={`Demander un devis pour l'offre ${plan.name}`}
            className={clsx(
              'mt-8 inline-flex w-full items-center justify-center rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-primary/40 transition',
              'hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary',
            )}
          >
            {plan.ctaLabel ?? 'Demander un devis'}
          </Link>
        </Card>
      ))}
    </div>
  );
}
