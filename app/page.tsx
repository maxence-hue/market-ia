import Link from 'next/link';
import { Container } from './components/Container';
import { Section } from './components/Section';
import { Badge } from './components/Badge';
import { Card } from './components/Card';
import { Testimonial } from './components/Testimonial';
import { BlogCard } from './components/BlogCard';
import { getAllBlogPosts } from '@/lib/mdx';
import { getServices } from '@/lib/services';
import { ArrowRightIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

const advantages = [
  {
    title: 'Qualité senior',
    description: 'Un binôme consultant + IA pour garantir des livrables stratégiques et actionnables.',
  },
  {
    title: 'Vitesse x3',
    description: 'Des workflows automatisés qui compressent vos délais de production à quelques jours.',
  },
  {
    title: 'Coût optimisé',
    description: 'Site web évolutif 99€ HT / mois, packs SEO 69€ ou 99€, landing page 790€ : vous savez où va chaque euro.',
  },
  {
    title: 'Transparence totale',
    description: 'Retouches illimitées sous 48 h, reporting temps réel et accès à tous nos prompts et workflows.',
  },
];

const workflow = [
  {
    title: 'Brief humain ultra ciblé',
    description: 'On co-construit un brief détaillé à partir de vos objectifs et de vos données internes.',
  },
  {
    title: 'Copilotage IA personnalisé',
    description: 'Nos consultants orchestrent les meilleurs outils IA pour prototyper les livrables.',
  },
  {
    title: 'Validation senior & QA',
    description: 'Chaque production est relue, optimisée et testée avant livraison finale.',
  },
];

const testimonials = [
  {
    quote:
      'Market-IA a divisé par deux notre temps de lancement de campagnes tout en améliorant le ROI sur nos audiences prioritaires.',
    author: 'Amélie Laurent',
    role: 'CMO, Fintech NovaPay',
  },
  {
    quote: 'Le duo humain + IA est redoutable. Nous avons lancé 12 landing pages localisées en 3 semaines.',
    author: 'Martin Lefèvre',
    role: 'Growth Lead, TravelUp',
  },
  {
    quote: 'Une équipe pédagogue qui partage ses méthodes. On voit exactement où va notre budget.',
    author: 'Sofia Mendes',
    role: 'Head of Marketing, SaaSFlow',
  },
];

const logos = ['NovaPay', 'TravelUp', 'SaaSFlow', 'GreenSupply', 'Helios Bank'];

export default async function HomePage() {
  const [posts, services] = await Promise.all([getAllBlogPosts(), getServices()]);
  const latestPosts = posts.slice(0, 3);

  return (
    <>
      <Section className="relative overflow-hidden">
        <div
          className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/40 via-transparent to-accent/20 blur-2xl"
          aria-hidden
        />
        <Container className="grid items-center gap-12 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <Badge>Humain + IA</Badge>
            <h1 className="mt-6 text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Accélérez votre marketing avec l’alliance Humain + IA
            </h1>
            <p className="mt-6 text-lg text-slate-300">
              La qualité d’une agence senior, la vitesse de l’IA, à tarif optimisé. Abonnement site web dès 99€ HT / mois, packs SEO 69€ ou 99€, landing page 790€ : Market-IA conçoit et pilote vos campagnes avec des experts certifiés et des modèles IA sécurisés.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/contact"
                className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                Demander un devis
              </Link>
              <Link
                href="/pricing"
                className="rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:border-primary hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                Voir nos offres
              </Link>
              <div className="flex items-center gap-2 text-sm text-slate-300">
                <CheckCircleIcon className="h-5 w-5 text-accent" aria-hidden />
                <span>Satisfaction client 4,9/5</span>
              </div>
            </div>
            <dl className="mt-10 grid gap-6 sm:grid-cols-3">
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wide text-slate-400">Brief {'>'} livrables</dt>
                <dd className="mt-1 text-2xl font-semibold text-white">4 jours</dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wide text-slate-400">Temps gagné</dt>
                <dd className="mt-1 text-2xl font-semibold text-white">x3</dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wide text-slate-400">Équipe dédiée</dt>
                <dd className="mt-1 text-2xl font-semibold text-white">Consultant + IA Strategist</dd>
              </div>
            </dl>
          </div>
          <div className="relative hidden h-full rounded-3xl border border-white/10 bg-night-800/70 p-6 shadow-[0_35px_65px_-45px_rgba(34,211,238,0.8)] backdrop-blur lg:block">
            <div className="grid h-full place-content-center gap-6 text-center">
              <div className="rounded-2xl border border-primary/30 bg-primary/10/50 px-6 py-8">
                <p className="text-sm font-semibold uppercase tracking-wide text-accent">Copilotage IA</p>
                <p className="mt-3 text-2xl font-semibold text-white">Opérations marketing pilotées par prompts documentés</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/10 px-6 py-8 shadow-lg shadow-primary/10">
                <p className="text-sm font-semibold uppercase tracking-wide text-slate-300">Livrables inclus</p>
                <ul className="mt-4 space-y-3 text-sm text-slate-200">
                  <li className="flex items-center justify-center gap-2">
                    <CheckCircleIcon className="h-5 w-5 text-accent" aria-hidden />
                    Content briefs & plans éditoriaux
                  </li>
                  <li className="flex items-center justify-center gap-2">
                    <CheckCircleIcon className="h-5 w-5 text-accent" aria-hidden />
                    Variations créatives multicanales
                  </li>
                  <li className="flex items-center justify-center gap-2">
                    <CheckCircleIcon className="h-5 w-5 text-accent" aria-hidden />
                    Tests A/B automatisés & reporting
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section background="muted">
        <Container className="grid gap-8 lg:grid-cols-4">
          {advantages.map((advantage) => (
            <Card key={advantage.title}>
              <h3 className="text-lg font-semibold text-white">{advantage.title}</h3>
              <p className="mt-3 text-sm text-slate-300">{advantage.description}</p>
            </Card>
          ))}
        </Container>
      </Section>

      <Section>
        <Container className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <Badge variant="accent">Méthode</Badge>
            <h2 className="mt-4 text-3xl font-bold text-white">Comment on travaille</h2>
            <p className="mt-4 text-base text-slate-300">
              Une méthodologie itérative qui combine recherche humaine, prototypage IA et validation senior pour garantir des livrables fiables.
            </p>
            <ul className="mt-8 space-y-6">
              {workflow.map((step, index) => (
                <li key={step.title} className="flex gap-4">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full border border-primary/30 bg-primary/20 text-sm font-semibold text-white shadow-inner shadow-primary/40">
                    {index + 1}
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold text-white">{step.title}</h3>
                    <p className="mt-2 text-sm text-slate-300">{step.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/10 p-6 shadow-lg shadow-primary/10 backdrop-blur">
            <h3 className="text-lg font-semibold text-white">Cas clients récents</h3>
            <div className="mt-6 space-y-6 text-slate-200">
              {['Scale-up SaaS', 'Retail durable', 'Fintech B2B'].map((caseName) => (
                <div key={caseName} className="rounded-2xl border border-dashed border-white/20 px-4 py-5">
                  <p className="text-sm font-semibold text-accent">{caseName}</p>
                  <p className="mt-2 text-sm">Résultats disponibles sur demande.</p>
                </div>
              ))}
            </div>
            <Link
              href="/(marketing)/case-studies"
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-accent"
            >
              Voir les études de cas
              <ArrowRightIcon className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </Container>
      </Section>

      <Section background="muted">
        <Container>
          <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
            <div>
              <Badge variant="neutral">Ils avancent avec nous</Badge>
              <h2 className="mt-4 text-2xl font-semibold text-white">Des scale-ups, ETI et équipes marketing ambitieuses</h2>
            </div>
            <Link href="/contact" className="text-sm font-semibold text-accent hover:underline">
              Planifier un échange
            </Link>
          </div>
          <div className="mt-8 grid gap-6 sm:grid-cols-3 lg:grid-cols-5">
            {logos.map((logo) => (
              <div
                key={logo}
                className="flex h-20 items-center justify-center rounded-2xl border border-white/10 bg-white/10 text-sm font-semibold text-slate-200"
              >
                {logo}
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <Badge variant="accent">Services</Badge>
              <h2 className="mt-4 text-3xl font-bold text-white">Vos chantiers prioritaires</h2>
              <p className="mt-3 text-base text-slate-300">Découvrez comment Market-IA active chaque levier pour générer croissance et efficacité.</p>
            </div>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-sm font-semibold text-accent"
            >
              Explorer tous les services
              <ArrowRightIcon className="h-4 w-4" aria-hidden />
            </Link>
          </div>
          <div className="mt-10 grid gap-6 lg:grid-cols-4">
            {services.map((service) => (
              <Card key={service.slug} className="h-full">
                <h3 className="text-lg font-semibold text-white">{service.title}</h3>
                <p className="mt-3 text-sm text-slate-300">{service.excerpt}</p>
                <Link href={`/services/${service.slug}`} className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-accent">
                  En savoir plus
                  <ArrowRightIcon className="h-4 w-4" aria-hidden />
                </Link>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      <Section background="muted">
        <Container>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <Badge variant="neutral">Insights IA + marketing</Badge>
              <h2 className="mt-4 text-3xl font-bold text-white">Restez en tête grâce à notre blog</h2>
            </div>
            <Link href="/blog" className="text-sm font-semibold text-accent hover:underline">
              Voir tous les articles
            </Link>
          </div>
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {latestPosts.map((post) => (
              <BlogCard key={post.slug} {...post} showTags={false} />
            ))}
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <Badge variant="accent">Feedbacks</Badge>
          <h2 className="mt-4 text-3xl font-bold text-white">Ce que disent nos clients</h2>
          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            {testimonials.map((testimonial) => (
              <Testimonial key={testimonial.author} {...testimonial} />
            ))}
          </div>
        </Container>
      </Section>

      <Section background="dark">
        <Container className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
          <div>
            <h2 className="text-3xl font-bold">Prêt à décupler vos résultats marketing ?</h2>
            <p className="mt-3 max-w-xl text-base text-slate-200">
              Bookez un atelier diagnostic de 30 minutes pour identifier les quick wins IA sur votre acquisition et votre conversion.
            </p>
          </div>
          <Link
            href="/contact"
            className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/40 transition hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Programmer un atelier
          </Link>
        </Container>
      </Section>
    </>
  );
}
