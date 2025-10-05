import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { siteConfig } from '@/lib/site';

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — Agence marketing augmentée par l'IA`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  openGraph: {
    title: `${siteConfig.name} — Agence marketing augmentée par l'IA`,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    images: [{ url: siteConfig.ogImage, width: 1200, height: 630, alt: `${siteConfig.name} hero` }],
    locale: 'fr_FR',
    type: 'website',
  },
  icons: {
    icon: '/favicon.svg',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteConfig.name} — Agence marketing augmentée par l'IA`,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
  alternates: {
    canonical: '/',
  },
};

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: siteConfig.name,
  url: siteConfig.url,
  logo: `${siteConfig.url}${siteConfig.ogImage}`,
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'sales',
    email: siteConfig.email,
    telephone: siteConfig.telephone,
  },
  address: {
    '@type': 'PostalAddress',
    streetAddress: siteConfig.address.street,
    addressLocality: siteConfig.address.city,
    postalCode: siteConfig.address.postalCode,
    addressCountry: siteConfig.address.country,
  },
  sameAs: Object.values(siteConfig.social),
};

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: siteConfig.name,
  url: siteConfig.url,
  potentialAction: {
    '@type': 'SearchAction',
    target: `${siteConfig.url}/blog?query={search_term_string}`,
    'query-input': 'required name=search_term_string',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body className="relative min-h-screen text-slate-100">
        <Header />
        <main className="relative z-10">{children}</main>
        <Footer />
        <Script id="market-ia-organization" type="application/ld+json">
          {JSON.stringify(organizationJsonLd)}
        </Script>
        <Script id="market-ia-website" type="application/ld+json">
          {JSON.stringify(websiteJsonLd)}
        </Script>
      </body>
    </html>
  );
}
