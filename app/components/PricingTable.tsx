import { Button } from './Button';
import { Card } from './Card';

type PricingPlan = {
  name: string;
  price: string;
  description: string;
  features: string[];
  badge?: string;
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
              <span className="ml-1 text-base font-medium text-slate-300">HT / mois</span>
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
          <Button className="mt-8 w-full" aria-label={`Demander un devis pour l'offre ${plan.name}`}>
            Demander un devis
          </Button>
        </Card>
      ))}
    </div>
  );
}
