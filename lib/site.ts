export const siteConfig = {
  name: 'Market-IA',
  description:
    "Market-IA combine l'expertise humaine et la puissance de l'IA pour produire des stratégies marketing performantes, plus vite et à coût optimisé.",
  url: 'https://www.market-ia.com',
  ogImage: '/images/og-market-ia.svg',
  email: 'contact@market-ia.com',
  telephone: '+33 1 84 80 00 00',
  address: {
    street: '10 Rue de l\'Innovation',
    postalCode: '75010',
    city: 'Paris',
    country: 'France',
  },
  social: {
    linkedin: '#',
    twitter: '#',
    youtube: '#',
  },
};

export const navigation = {
  main: [
    { name: 'Accueil', href: '/' },
    { name: 'Services', href: '/services' },
    { name: 'Tarifs', href: '/pricing' },
    { name: 'Blog', href: '/blog' },
    { name: 'À propos', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ],
  services: [
    {
      name: 'Stratégie de contenu IA-assistée',
      description: 'Audits, guidelines éditoriales et calendars orchestrés avec l’IA.',
      href: '/services/strategie-contenu-ia-assistee',
    },
    {
      name: 'Production SEO multilocale',
      description: 'Pages localisées et optimisées SEO pour accélérer votre visibilité.',
      href: '/services/production-seo-multilocale',
    },
    {
      name: 'Social ads créatives IA-assistées',
      description: 'Concepts créatifs et déclinaisons multi-formats générées avec copilotage IA.',
      href: '/services/social-ads-creatives-ia-assistees',
    },
    {
      name: 'Landing pages & CRO',
      description: 'Conception et optimisation continue de landing pages pilotées par la data.',
      href: '/services/landing-pages-cro',
    },
  ],
};
