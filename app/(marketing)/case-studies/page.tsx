import type { Metadata } from 'next';
import Script from 'next/script';
import { Section } from '../../components/Section';
import { Container } from '../../components/Container';
import { Card } from '../../components/Card';
import { siteConfig } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Études de cas',
  description: 'Quelques projets accompagnés par Market-IA : performance SEO, activation ads et conversion.',
};

const cases = [
  {
    name: 'Scale-up SaaS B2B',
    challenge: 'Industrialiser le contenu multilocal pour 6 pays en 8 semaines.',
    result: '+78% de trafic organique qualifié, +32% de MQL sur 3 mois.',
  },
  {
    name: 'Retail durable',
    challenge: 'Automatiser la production d’annonces social ads personnalisées.',
    result: '-25% CPA et +3,2 pts de taux de conversion en 6 semaines.',
  },
  {
    name: 'Fintech B2B',
    challenge: 'Optimiser le tunnel démo > devis avec des landing pages IA + CRO.',
    result: '+18% de prise de rendez-vous et -30% de temps de production.',
  },
];

export default function CaseStudiesPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: siteConfig.url },
      { '@type': 'ListItem', position: 2, name: 'Études de cas', item: `${siteConfig.url}/case-studies` },
    ],
  };

  return (
    <>
      <Section>
        <Container className="max-w-4xl">
          <h1 className="text-4xl font-bold text-slate-900">Études de cas Market-IA</h1>
          <p className="mt-4 text-base text-slate-600">
            Quelques projets récents menés avec notre approche Humain + IA. Contactez-nous pour obtenir les détails chiffrés et méthodologiques.
          </p>
        </Container>
      </Section>
      <Section className="pt-0">
        <Container className="grid gap-8 lg:grid-cols-3">
          {cases.map((caseStudy) => (
            <Card key={caseStudy.name} className="bg-white">
              <h2 className="text-xl font-semibold text-slate-900">{caseStudy.name}</h2>
              <p className="mt-3 text-sm text-slate-500">Challenge</p>
              <p className="text-sm text-slate-600">{caseStudy.challenge}</p>
              <p className="mt-4 text-sm text-slate-500">Résultats</p>
              <p className="text-sm font-semibold text-slate-900">{caseStudy.result}</p>
            </Card>
          ))}
        </Container>
      </Section>
      <Script id="case-studies-breadcrumb" type="application/ld+json">
        {JSON.stringify(jsonLd)}
      </Script>
    </>
  );
}
