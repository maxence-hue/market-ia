import type { Metadata } from 'next';
import Script from 'next/script';
import { Section } from '../components/Section';
import { Container } from '../components/Container';
import { PricingTable } from '../components/PricingTable';
import { FAQ } from '../components/FAQ';
import { siteConfig } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Tarifs et plans',
  description: "Plans Starter, Pro et Scale pour accélérer votre marketing avec l'IA et l'expertise Market-IA.",
};

const plans = [
  {
    name: 'Starter',
    description: 'Idéal pour structurer un socle IA marketing sur un périmètre prioritaire.',
    price: '2 900€',
    features: ['Atelier cadrage IA', 'Production de 4 livrables / mois', 'Reporting mensuel', 'Accès aux templates prompts'],
  },
  {
    name: 'Pro',
    description: 'Pour accélérer vos contenus, campagnes et tests A/B sur plusieurs marchés.',
    price: '4 900€',
    badge: 'Populaire',
    features: [
      'Squad dédiée consultant + IA strategist',
      'Production de 8 livrables / mois',
      'Workflows IA personnalisés',
      'Tests & dashboards hebdomadaires',
    ],
  },
  {
    name: 'Scale',
    description: 'Pour industrialiser votre marketing multi-pays et multi-offres.',
    price: 'Sur devis',
    features: ['Équipe pluridisciplinaire', 'Production illimitée sous SLA', 'Pilotage data & CRO avancé', 'Intégration outils internes'],
  },
];

const faqItems = [
  {
    question: 'Quels sont vos délais de livraison ?',
    answer: 'Selon le plan choisi, nous livrons les premiers outputs en 4 à 7 jours ouvrés après validation du brief.',
  },
  {
    question: 'Qui possède les livrables ? ',
    answer: 'Vous conservez 100% des droits sur les contenus, prompts et assets produits dans le cadre de la mission.',
  },
  {
    question: 'Comment garantissez-vous la confidentialité ? ',
    answer: 'Nous travaillons avec des environnements IA sécurisés et signons un NDA systématique.',
  },
  {
    question: 'Quelles données utilisez-vous ? ',
    answer: 'Nous n’entraînons jamais de modèle sur vos données sans accord écrit. Nous utilisons vos insights pour contextualiser les prompts.',
  },
];

export default function PricingPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: siteConfig.url },
      { '@type': 'ListItem', position: 2, name: 'Tarifs', item: `${siteConfig.url}/pricing` },
    ],
  };

  return (
    <>
      <Section>
        <Container className="max-w-4xl text-center">
          <h1 className="text-4xl font-bold text-white">Plans transparents, valeur maximale</h1>
          <p className="mt-4 text-base text-slate-300">
            Choisissez l’intensité qui correspond à vos objectifs. Chaque plan inclut un accompagnement humain senior et des workflows IA documentés.
          </p>
        </Container>
      </Section>
      <Section className="pt-0">
        <Container>
          <PricingTable plans={plans} />
        </Container>
      </Section>
      <Section background="muted">
        <Container className="max-w-3xl">
          <h2 className="text-3xl font-bold text-white">FAQ</h2>
          <p className="mt-3 text-base text-slate-300">
            Nos réponses aux questions les plus fréquentes sur nos offres et modalités de collaboration.
          </p>
          <div className="mt-8">
            <FAQ items={faqItems} />
          </div>
        </Container>
      </Section>
      <Script id="pricing-breadcrumb" type="application/ld+json">
        {JSON.stringify(jsonLd)}
      </Script>
    </>
  );
}
