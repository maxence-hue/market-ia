import type { Metadata } from 'next';
import Script from 'next/script';
import { Section } from '../components/Section';
import { Container } from '../components/Container';
import { Card } from '../components/Card';
import { FormContact } from '../components/FormContact';
import { siteConfig } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Discutons de vos enjeux marketing IA : bookez un diagnostic de 30 minutes avec un consultant Market-IA.',
};

export default function ContactPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: siteConfig.url },
      { '@type': 'ListItem', position: 2, name: 'Contact', item: `${siteConfig.url}/contact` },
    ],
  };

  return (
    <>
      <Section>
        <Container className="grid gap-10 lg:grid-cols-[1fr_1fr]">
          <div>
            <h1 className="text-4xl font-bold text-slate-900">Planifions votre prochain sprint marketing</h1>
            <p className="mt-4 text-base text-slate-600">
              Remplissez le formulaire et un consultant vous répond sous 24h ouvrées pour organiser un diagnostic gratuit.
            </p>
            <Card className="mt-6 bg-white">
              <h2 className="text-lg font-semibold text-slate-900">Nos coordonnées</h2>
              <ul className="mt-4 space-y-3 text-sm text-slate-600">
                <li>
                  Email :{' '}
                  <a href={`mailto:${siteConfig.email}`} className="text-primary">
                    {siteConfig.email}
                  </a>
                </li>
                <li>
                  Téléphone :{' '}
                  <a href={`tel:${siteConfig.telephone}`} className="text-primary">
                    {siteConfig.telephone}
                  </a>
                </li>
                <li>
                  Adresse : {siteConfig.address.street}, {siteConfig.address.postalCode} {siteConfig.address.city}
                </li>
              </ul>
            </Card>
          </div>
          <Card className="bg-white">
            <h2 className="text-lg font-semibold text-slate-900">Dites-nous tout</h2>
            <p className="mt-2 text-sm text-slate-600">Plus vous êtes précis, plus nous préparons un diagnostic utile.</p>
            <div className="mt-6">
              <FormContact />
            </div>
          </Card>
        </Container>
      </Section>
      <Script id="contact-breadcrumb" type="application/ld+json">
        {JSON.stringify(jsonLd)}
      </Script>
    </>
  );
}
