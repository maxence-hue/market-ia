import Link from 'next/link';
import Script from 'next/script';
import type { Metadata } from 'next';
import { Section } from '../components/Section';
import { Container } from '../components/Container';
import { Card } from '../components/Card';
import { Badge } from '../components/Badge';
import { getServices } from '@/lib/services';
import { siteConfig } from '@/lib/site';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

export const metadata: Metadata = {
  title: 'Services IA marketing',
  description:
    'Découvrez nos abonnements site web, packs SEO hybrides, pilotage social media, automatisations n8n et campagnes de backlinks orchestrées.',
};

export default async function ServicesPage() {
  const services = await getServices();
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Accueil',
        item: siteConfig.url,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Services',
        item: `${siteConfig.url}/services`,
      },
    ],
  };

  return (
    <>
      <Section className="pb-0">
        <Container className="max-w-4xl">
          <Badge variant="accent">Nos expertises</Badge>
          <h1 className="mt-4 text-4xl font-bold text-white">Services marketing augmentés par l’IA</h1>
          <p className="mt-4 text-base text-slate-300">
            Des abonnements transparents : site web évolutif dès 99€ HT / mois, packs SEO hybrides, social media copilote, landing pages 790€ et automatisations n8n sur-mesure.
          </p>
        </Container>
      </Section>
      <Section className="pt-0">
        <Container className="grid gap-8 lg:grid-cols-2">
          {services.map((service) => (
            <Card key={service.slug} className="flex h-full flex-col justify-between">
              <div>
                <h2 className="text-2xl font-semibold text-white">{service.title}</h2>
                <p className="mt-3 text-sm text-slate-300">{service.excerpt}</p>
                <ul className="mt-6 space-y-2 text-sm text-slate-200">
                  {service.benefits.slice(0, 3).map((benefit) => (
                    <li key={benefit.title} className="flex items-start gap-2">
                      <span aria-hidden className="mt-1 h-2 w-2 rounded-full bg-accent" />
                      <div>
                        <p className="font-semibold text-white">{benefit.title}</p>
                        <p className="text-slate-300">{benefit.description}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <Link href={`/services/${service.slug}`} className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-accent">
                Détails de l’offre
                <ArrowRightIcon className="h-4 w-4" aria-hidden />
              </Link>
            </Card>
          ))}
        </Container>
      </Section>
      <Script id="services-breadcrumb" type="application/ld+json">
        {JSON.stringify(jsonLd)}
      </Script>
    </>
  );
}
