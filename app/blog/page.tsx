import type { Metadata } from 'next';
import Script from 'next/script';
import { Section } from '../components/Section';
import { Container } from '../components/Container';
import { BlogCard } from '../components/BlogCard';
import { getAllBlogPosts } from '@/lib/mdx';
import { siteConfig } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Blog IA & marketing',
  description: 'Analyses, méthodes et retours d’expérience pour intégrer l’IA dans vos opérations marketing.',
};

export default async function BlogPage() {
  const posts = await getAllBlogPosts();
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: siteConfig.url },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${siteConfig.url}/blog` },
    ],
  };

  return (
    <>
      <Section>
        <Container className="max-w-3xl text-center">
          <h1 className="text-4xl font-bold text-slate-900">Le blog Market-IA</h1>
          <p className="mt-4 text-base text-slate-600">
            Articles, frameworks et insights pour piloter vos campagnes avec l’IA, sans perdre la maîtrise.
          </p>
        </Container>
      </Section>
      <Section className="pt-0">
        <Container className="grid gap-8 lg:grid-cols-3">
          {posts.map((post) => (
            <BlogCard key={post.slug} {...post} />
          ))}
        </Container>
      </Section>
      <Section background="muted">
        <Container className="max-w-3xl text-center">
          <h2 className="text-2xl font-semibold text-slate-900">Recevez nos analyses IA & marketing</h2>
          <p className="mt-3 text-sm text-slate-600">
            Inscrivez-vous pour recevoir un condensé mensuel de bonnes pratiques (aucun spam).
          </p>
          <form className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <label htmlFor="blog-email" className="sr-only">
              Email
            </label>
            <input
              id="blog-email"
              type="email"
              placeholder="Votre email professionnel"
              className="w-full rounded-full border border-slate-200 px-4 py-2 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:w-72"
            />
            <button
              type="button"
              className="rounded-full bg-primary px-5 py-2 text-sm font-semibold text-white transition hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              S’abonner
            </button>
          </form>
        </Container>
      </Section>
      <Script id="blog-breadcrumb" type="application/ld+json">
        {JSON.stringify(jsonLd)}
      </Script>
    </>
  );
}
