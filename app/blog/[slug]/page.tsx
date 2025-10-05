import type { Metadata } from 'next';
import Script from 'next/script';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Section } from '../../components/Section';
import { Container } from '../../components/Container';
import { TOC } from '../../components/TOC';
import { getBlogPost, getBlogSlugs } from '@/lib/mdx';
import { siteConfig } from '@/lib/site';

export async function generateStaticParams() {
  const slugs = await getBlogSlugs();
  return slugs.map((slug) => ({ slug }));
}

type BlogPageProps = {
  params: { slug: string };
};

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const post = await getBlogPost(params.slug).catch(() => null);
  if (!post) {
    return { title: 'Article non trouvé' };
  }
  return {
    title: post.frontMatter.title,
    description: post.frontMatter.description,
    authors: [{ name: post.frontMatter.author }],
    openGraph: {
      type: 'article',
      title: post.frontMatter.title,
      description: post.frontMatter.description,
      publishedTime: post.frontMatter.date,
      url: `${siteConfig.url}/blog/${post.slug}`,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPageProps) {
  const post = await getBlogPost(params.slug).catch(() => null);
  if (!post) {
    notFound();
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.frontMatter.title,
    description: post.frontMatter.description,
    author: {
      '@type': 'Person',
      name: post.frontMatter.author,
    },
    datePublished: post.frontMatter.date,
    mainEntityOfPage: `${siteConfig.url}/blog/${post.slug}`,
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      logo: {
        '@type': 'ImageObject',
        url: `${siteConfig.url}${siteConfig.ogImage}`,
      },
    },
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: siteConfig.url },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${siteConfig.url}/blog` },
      { '@type': 'ListItem', position: 3, name: post.frontMatter.title, item: `${siteConfig.url}/blog/${post.slug}` },
    ],
  };

  return (
    <>
      <Section className="pb-0">
        <Container className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">{new Date(post.frontMatter.date).toLocaleDateString('fr-FR')}</p>
          <h1 className="mt-4 text-4xl font-bold text-white">{post.frontMatter.title}</h1>
          <div className="mt-3 flex flex-wrap gap-3 text-sm text-slate-300">
            <span>Par {post.frontMatter.author}</span>
            <span>•</span>
            <span>{post.readingTime} min de lecture</span>
          </div>
        </Container>
      </Section>
      <Section className="pt-0">
        <Container className="flex gap-12">
          <article className="prose max-w-none flex-1">
            {post.content}
            <div className="mt-12 rounded-2xl border border-white/10 bg-white/10 p-6 text-slate-200 shadow-lg shadow-primary/10">
              <h2 className="text-lg font-semibold text-white">Aller plus loin</h2>
              <p className="mt-3 text-sm text-slate-200">
                Parlons de la mise en œuvre de ces tactiques pour votre organisation.
              </p>
              <Link href="/contact" className="mt-4 inline-flex items-center rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-primary/30 transition hover:bg-primary/90">
                Demander un diagnostic
              </Link>
            </div>
          </article>
          <TOC headings={post.headings} />
        </Container>
      </Section>
      <Section background="muted">
        <Container className="max-w-3xl text-center">
          <h2 className="text-2xl font-semibold text-white">S’abonner à Market-IA Insights</h2>
          <p className="mt-3 text-sm text-slate-300">
            Recevez les prochains articles et frameworks IA dans votre boîte mail.
          </p>
          <form className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <label htmlFor="article-email" className="sr-only">
              Email
            </label>
            <input
              id="article-email"
              type="email"
              placeholder="Votre email professionnel"
              className="w-full rounded-full border border-white/10 bg-night-800/80 px-4 py-2 text-sm text-white placeholder:text-slate-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:w-72"
            />
            <button
              type="button"
              className="rounded-full bg-primary px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-primary/30 transition hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              S’abonner
            </button>
          </form>
        </Container>
      </Section>
      <Script id={`blogpost-${post.slug}-jsonld`} type="application/ld+json">
        {JSON.stringify(jsonLd)}
      </Script>
      <Script id={`blogpost-${post.slug}-breadcrumb`} type="application/ld+json">
        {JSON.stringify(breadcrumbJsonLd)}
      </Script>
    </>
  );
}
