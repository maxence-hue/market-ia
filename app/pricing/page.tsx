import type { Metadata } from 'next';
import Script from 'next/script';
import { Section } from '../components/Section';
import { Container } from '../components/Container';
import { PricingTable } from '../components/PricingTable';
import { FAQ } from '../components/FAQ';
import { siteConfig } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Tarifs et plans',
  description:
    'Abonnements site web 99€ HT / mois, packs SEO hybrides 69€ et 99€, pilotage social media, landing pages 790€ et automatisations n8n sur mesure.',
};

const plans = [
  {
    name: 'Site web évolutif',
    description: 'Abonnement site vitrine ou e-commerce avec retouches illimitées sous 48 h.',
    price: '99€',
    badge: 'Nouveau',
    features: [
      'Sprint de lancement 10 jours',
      'Retouches design & contenu illimitées',
      'Tracking conversions GA4 + pixels inclus',
      'Hébergement Vercel & maintenance compris',
    ],
  },
  {
    name: 'Pack SEO Focus',
    description: '2 articles premium IA + rédacteur chaque mois pour nourrir votre blog.',
    price: '69€',
    features: [
      'Recherche d’intentions & brief IA',
      'Articles 1 200+ mots optimisés SEO',
      'Visuels IA retouchés',
      'Publication sur votre CMS incluse',
    ],
  },
  {
    name: 'Pack SEO Expansion',
    description: '4 articles premium par mois pour dominer vos mots-clés stratégiques.',
    price: '99€',
    features: [
      'Calendrier éditorial trimestriel',
      'FAQ schema & maillage interne',
      'Rapport positions + recommandations',
      'Options langues supplémentaires +29€/article',
    ],
  },
  {
    name: 'Pilotage SEO augmenté',
    description: 'Command center SEO technique + contenu animé par nos consultants.',
    price: '249€',
    features: [
      'Audit technique & roadmap priorisée',
      'Monitoring Search Console + logs',
      'Revues mensuelles impact/effort',
      'Intégration dashboards Looker Studio',
    ],
  },
  {
    name: 'Social media copilote IA',
    description: 'Stratégie, planification et optimisation d’un canal social à la carte.',
    price: '99€',
    features: [
      'Calendrier éditorial + prompts IA',
      'Rapports hebdo & tests créas',
      'Créations graphiques 29€ l’unité',
      'Vidéos IA scénarisées 99€',
    ],
  },
  {
    name: 'Landing page & CRO',
    description: 'Landing page clé en main + option tracking conversions avancé.',
    price: '790€',
    billing: 'HT / landing',
    features: [
      'Storytelling & design futuriste',
      'Intégration Next.js/Webflow',
      'Tests A/B & heatmaps',
      'Option tracking complet +190€',
    ],
  },
  {
    name: 'Backlinks orchestrés',
    description: 'Campagnes netlinking éditoriales pilotées par IA et experts RP.',
    price: 'Sur devis',
    billing: '',
    features: [
      'Audit netlinking & scoring prospects',
      'Pitchs personnalisés multicanaux',
      'Création d’assets co-brandés',
      'Reporting ROI (trafic & positions)',
    ],
    ctaLabel: 'Obtenir un devis netlinking',
  },
  {
    name: 'Automatisations n8n',
    description: 'Workflows marketing no-code + support et évolutions continues.',
    price: '390€',
    features: [
      'Audit processus & benchmark secteur',
      'Workflows n8n documentés',
      'Monitoring & alertes Slack',
      '10h d’optimisation / mois incluses',
    ],
  },
];

const faqItems = [
  {
    question: 'Les retouches illimitées sont-elles vraiment illimitées ?',
    answer:
      'Oui, pour l’abonnement site web nous traitons toutes vos demandes via un board Kanban avec un délai garanti de 48 h ouvrées.',
  },
  {
    question: 'Puis-je changer de pack SEO en cours de route ? ',
    answer: 'Bien sûr, vous pouvez passer du pack Focus au pack Expansion (ou inversement) chaque mois selon vos besoins.',
  },
  {
    question: 'Comment sont facturées les créations social media ? ',
    answer:
      'Les visuels IA retouchés sont facturés 29€ l’unité et les vidéos 99€. Nous regroupons les livraisons dans une facture mensuelle.',
  },
  {
    question: 'Pouvez-vous connecter les automatisations à nos outils internes ? ',
    answer:
      'Oui, nous développons des connecteurs n8n personnalisés (API, webhooks, scripts) et assurons la maintenance continue.',
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
