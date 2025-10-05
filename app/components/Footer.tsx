import Link from 'next/link';
import { Container } from './Container';
import { navigation, siteConfig } from '@/lib/site';

const legalLinks = [
  { name: 'Mentions légales', href: '#' },
  { name: 'Politique de confidentialité', href: '#' },
  { name: 'Conditions générales', href: '#' },
];

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-night-900/80 backdrop-blur">
      <Container className="py-12">
        <div className="grid gap-10 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <Link href="/" className="text-2xl font-bold text-white">
              Market-IA
            </Link>
            <p className="mt-4 max-w-md text-sm text-slate-300">{siteConfig.description}</p>
            <div className="mt-6 flex gap-4 text-sm text-slate-400">
              <a href={`mailto:${siteConfig.email}`} className="transition hover:text-primary">
                {siteConfig.email}
              </a>
              <a href={`tel:${siteConfig.telephone}`} className="transition hover:text-primary">
                {siteConfig.telephone}
              </a>
            </div>
            <div className="mt-6 flex gap-3 text-sm text-slate-400">
              <a href={siteConfig.social.linkedin} aria-label="LinkedIn Market-IA" className="transition hover:text-primary">
                LinkedIn
              </a>
              <a href={siteConfig.social.twitter} aria-label="Twitter Market-IA" className="transition hover:text-primary">
                Twitter
              </a>
              <a href={siteConfig.social.youtube} aria-label="YouTube Market-IA" className="transition hover:text-primary">
                YouTube
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-400">Navigation</h3>
            <ul className="mt-4 space-y-2 text-sm text-slate-300">
              {navigation.main.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="transition hover:text-primary">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-400">Restez informé·e</h3>
            <p className="mt-4 text-sm text-slate-300">Abonnez-vous pour recevoir nos ressources IA & marketing.</p>
            <form className="mt-4 flex gap-2">
              <label htmlFor="newsletter-email" className="sr-only">
                Email
              </label>
              <input
                id="newsletter-email"
                type="email"
                placeholder="Votre email"
                className="w-full rounded-full border border-white/10 bg-night-800/80 px-4 py-2 text-sm text-white placeholder:text-slate-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              />
              <button
                type="button"
                className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-primary/30 transition hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                S&apos;abonner
              </button>
            </form>
          </div>
        </div>
        <div className="mt-10 flex flex-col justify-between gap-4 border-t border-white/10 pt-6 text-xs text-slate-400 sm:flex-row">
          <p>© {new Date().getFullYear()} Market-IA. Tous droits réservés.</p>
          <div className="flex flex-wrap gap-3">
            {legalLinks.map((link) => (
              <Link key={link.name} href={link.href} className="transition hover:text-primary">
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
