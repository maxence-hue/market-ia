import type { Metadata } from 'next';
import Script from 'next/script';
import Image from 'next/image';
import { Section } from '../components/Section';
import { Container } from '../components/Container';
import { Card } from '../components/Card';
import { Badge } from '../components/Badge';
import { siteConfig } from '@/lib/site';

export const metadata: Metadata = {
  title: 'À propos',
  description:
    "Market-IA est une agence marketing hybride qui combine expertise humaine et intelligence artificielle pour livrer des résultats rapides et mesurables.",
};

const principles = [
  {
    title: 'Qualité mesurable',
    description: 'Nous évaluons chaque livrable sur des critères objectifs (SEO, engagement, conversion) et ajustons en continu.',
  },
  {
    title: 'Honnêteté radicale',
    description: 'Transparence sur les prompts, les itérations IA et les limites des modèles utilisés.',
  },
  {
    title: 'Pilotage data-driven',
    description: 'Nos décisions sont guidées par vos KPIs et par des boucles de feedback rapide.',
  },
  {
    title: 'Vitesse responsable',
    description: 'Automatiser oui, mais toujours avec un contrôle humain et une gouvernance des données stricte.',
  },
];

export default function AboutPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: siteConfig.url },
      { '@type': 'ListItem', position: 2, name: 'À propos', item: `${siteConfig.url}/about` },
    ],
  };

  return (
    <>
      <Section>
        <Container className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div>
            <Badge variant="accent">Manifesto</Badge>
            <h1 className="mt-4 text-4xl font-bold text-slate-900">L’alliance du cerveau humain et de l’IA, sans compromis</h1>
            <p className="mt-4 text-base text-slate-600">
              Market-IA est née d’un constat : les équipes marketing doivent aller plus vite sans sacrifier la pertinence. Nous avons construit des méthodes où l’IA augmente les experts au lieu de les remplacer.
            </p>
            <p className="mt-3 text-base text-slate-600">
              Nos consultants orchestrent des modèles propriétaires, des outils IA de pointe et des process qualité robustes pour livrer des campagnes, contenus et expériences qui performent.
            </p>
          </div>
          <div className="relative h-80 w-full overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-primary/10 via-accent/10 to-white">
            <Image src="/images/team-collaboration.svg" alt="Équipe Market-IA" fill className="object-cover mix-blend-multiply" />
          </div>
        </Container>
      </Section>
      <Section background="muted">
        <Container>
          <h2 className="text-3xl font-bold text-slate-900">Nos principes</h2>
          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            {principles.map((principle) => (
              <Card key={principle.title} className="bg-white">
                <h3 className="text-xl font-semibold text-slate-900">{principle.title}</h3>
                <p className="mt-3 text-sm text-slate-600">{principle.description}</p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>
      <Section>
        <Container className="grid gap-8 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl font-bold text-slate-900">Une équipe pluridisciplinaire</h2>
            <p className="mt-4 text-base text-slate-600">
              Consultants marketing senior, data strategists, prompt engineers et UX writers travaillent ensemble pour orchestrer vos projets.
            </p>
            <p className="mt-3 text-base text-slate-600">
              Nous cultivons une culture d’apprentissage continu : chaque mission nourrit notre base de connaissances IA, partagée avec nos clients.
            </p>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900">Ce qui nous anime</h3>
            <ul className="mt-4 space-y-3 text-sm text-slate-600">
              <li className="flex items-start gap-2">
                <span aria-hidden className="mt-1 h-2 w-2 rounded-full bg-primary" />
                Partager des workflows IA responsables et documentés.
              </li>
              <li className="flex items-start gap-2">
                <span aria-hidden className="mt-1 h-2 w-2 rounded-full bg-primary" />
                Alignement business : chaque livrable est relié à un KPI.
              </li>
              <li className="flex items-start gap-2">
                <span aria-hidden className="mt-1 h-2 w-2 rounded-full bg-primary" />
                Transmission : nous formons vos équipes à nos méthodes IA.
              </li>
            </ul>
          </div>
        </Container>
      </Section>
      <Script id="about-breadcrumb" type="application/ld+json">
        {JSON.stringify(jsonLd)}
      </Script>
    </>
  );
}
