import type { Metadata } from 'next';
import Script from 'next/script';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import { Section } from '../../components/Section';
import { Container } from '../../components/Container';
import { Badge } from '../../components/Badge';
import { Card } from '../../components/Card';
import { FAQ } from '../../components/FAQ';
import { BlogCard } from '../../components/BlogCard';
import { getService, getServiceSlugs } from '@/lib/services';
import { getAllBlogPosts } from '@/lib/mdx';
import { siteConfig } from '@/lib/site';

export async function generateStaticParams() {
  const slugs = await getServiceSlugs();
  return slugs.map((slug) => ({ slug }));
}

type ServicePageProps = {
  params: { slug: string };
};

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const service = await getService(params.slug).catch(() => null);
  if (!service) {
    return {
      title: 'Service non trouvé',
    };
  }
  return {
    title: service.title,
    description: service.excerpt,
  };
}

export default async function ServicePage({ params }: ServicePageProps) {
  const service = await getService(params.slug).catch(() => null);
  if (!service) {
    notFound();
  }

  const relatedPosts = service.relatedTag
    ? (await getAllBlogPosts()).filter((post) => post.tags.includes(service.relatedTag!)).slice(0, 3)
    : [];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: siteConfig.url },
      { '@type': 'ListItem', position: 2, name: 'Services', item: `${siteConfig.url}/services` },
      {
        '@type': 'ListItem',
        position: 3,
        name: service.title,
        item: `${siteConfig.url}/services/${service.slug}`,
      },
    ],
  };

  return (
    <>
      <Section className="pb-0">
        <Container className="max-w-4xl space-y-6">
          <Badge variant="accent">{service.hero}</Badge>
          <h1 className="text-4xl font-bold text-white">{service.title}</h1>
          <p className="text-base text-slate-300">{service.excerpt}</p>
        </Container>
      </Section>
      <Section className="pt-0">
        <Container className="grid gap-10 lg:grid-cols-[2fr_1fr]">
          <div className="prose max-w-none">
            <ReactMarkdown>{service.body}</ReactMarkdown>
            <h2>Bénéfices clés</h2>
            <ul>
              {service.benefits.map((benefit) => (
                <li key={benefit.title}>
                  <strong>{benefit.title}.</strong> {benefit.description}
                </li>
              ))}
            </ul>
            <h2>Processus collaboratif</h2>
            <ol>
              {service.process.map((step) => (
                <li key={step.title}>
                  <strong>{step.title}.</strong> {step.description}
                </li>
              ))}
            </ol>
          </div>
          <aside className="space-y-6">
            <Card>
              <h2 className="text-lg font-semibold text-white">Livrables types</h2>
              <ul className="mt-4 space-y-2 text-sm text-slate-200">
                {service.deliverables.map((deliverable) => (
                  <li key={deliverable} className="flex items-start gap-2">
                    <span aria-hidden className="mt-1 h-2 w-2 rounded-full bg-accent" />
                    {deliverable}
                  </li>
                ))}
              </ul>
            </Card>
            <Card>
              <h2 className="text-lg font-semibold text-white">Pourquoi Market-IA ?</h2>
              <p className="mt-3 text-sm text-slate-300">
                Nos consultants orchestrent des modèles IA documentés, entraînés sur votre contexte, avec des garde-fous qualité.
              </p>
              <Link
                href="/contact"
                className="mt-6 inline-flex items-center rounded-full bg-primary px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-primary/30 transition hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                Discuter de ce service
              </Link>
            </Card>
            <FAQ items={service.faq} />
          </aside>
        </Container>
      </Section>
      {relatedPosts.length > 0 ? (
        <Section background="muted" className="pt-0">
          <Container>
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <Badge variant="accent">Ressources</Badge>
                <h2 className="mt-4 text-3xl font-bold text-white">Aller plus loin sur ce sujet</h2>
                <p className="mt-2 text-base text-slate-300">
                  Explorez nos analyses et retours d’expérience pour maximiser l’impact de cette offre.
                </p>
              </div>
              <Link href="/blog" className="text-sm font-semibold text-accent hover:underline">
                Voir tous les articles
              </Link>
            </div>
            <div className="mt-10 grid gap-6 lg:grid-cols-3">
              {relatedPosts.map((post) => (
                <BlogCard key={post.slug} {...post} showTags={false} />
              ))}
            </div>
          </Container>
        </Section>
      ) : null}
      <Script id={`service-${service.slug}-breadcrumb`} type="application/ld+json">
        {JSON.stringify(jsonLd)}
      </Script>
    </>
  );
}
