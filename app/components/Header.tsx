'use client';

import { Fragment, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Dialog, Transition, Menu } from '@headlessui/react';
import { Bars3Icon, XMarkIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import { navigation } from '@/lib/site';
import { clsx } from 'clsx';

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-night-900/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="text-xl font-semibold text-white" aria-label="Accueil Market-IA">
          Market-IA
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium text-slate-200 lg:flex" aria-label="Navigation principale">
          {navigation.main.map((item) => {
            if (item.name === 'Services') {
              return (
                <Menu as="div" className="relative" key={item.name}>
                  <Menu.Button className="inline-flex items-center gap-1 rounded-full px-3 py-2 text-sm transition hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
                    Services
                    <ChevronDownIcon className="h-4 w-4" aria-hidden />
                  </Menu.Button>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="opacity-0 -translate-y-1"
                    enterTo="opacity-100 translate-y-0"
                    leave="transition ease-in duration-150"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Menu.Items className="absolute left-0 mt-3 w-80 rounded-2xl border border-white/10 bg-night-900/95 p-3 shadow-lg backdrop-blur focus:outline-none">
                      <div className="space-y-2">
                        {navigation.services.map((service) => (
                          <Menu.Item key={service.href}>
                            {({ active }) => (
                              <Link
                                href={service.href}
                                className={clsx(
                                  'block rounded-xl px-3 py-2 text-sm transition',
                                  active ? 'bg-primary/20 text-white' : 'text-slate-200',
                                )}
                              >
                                <span className="block font-semibold">{service.name}</span>
                                <span className="mt-1 block text-xs text-slate-400">{service.description}</span>
                              </Link>
                            )}
                          </Menu.Item>
                        ))}
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>
              );
            }

            return (
              <Link
                key={item.name}
                href={item.href}
                className={clsx(
                  'rounded-full px-3 py-2 transition hover:bg-white/10',
                  pathname === item.href ? 'bg-primary/20 text-white' : 'text-slate-200',
                )}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>
        <div className="hidden lg:flex">
          <Link
            href="/contact"
            className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-primary/40 transition hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            Demander un devis
          </Link>
        </div>
        <div className="lg:hidden">
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className="inline-flex items-center justify-center rounded-full p-2 text-slate-100 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            aria-label="Ouvrir le menu"
          >
            <Bars3Icon className="h-6 w-6" aria-hidden />
          </button>
        </div>
      </div>

      <Transition show={mobileOpen} as={Fragment}>
        <Dialog as="div" className="lg:hidden" onClose={setMobileOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-200"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 z-40 bg-black/40" aria-hidden />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full"
          >
            <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full max-w-sm overflow-y-auto bg-night-900 px-6 py-6 shadow-xl">
              <div className="flex items-center justify-between">
                <Link href="/" className="text-lg font-semibold text-white">
                  Market-IA
                </Link>
                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  className="rounded-full p-2 text-slate-100 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                  aria-label="Fermer le menu"
                >
                  <XMarkIcon className="h-6 w-6" aria-hidden />
                </button>
              </div>
              <nav className="mt-10 space-y-6" aria-label="Navigation mobile">
                {navigation.main.map((item) => (
                  <div key={item.name}>
                    {item.name === 'Services' ? (
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Services</p>
                        <ul className="mt-3 space-y-3">
                          {navigation.services.map((service) => (
                            <li key={service.href}>
                              <Link
                                href={service.href}
                                className="block rounded-xl border border-white/10 px-4 py-3 text-sm text-slate-200 hover:border-primary hover:text-white"
                                onClick={() => setMobileOpen(false)}
                              >
                                <span className="block font-semibold">{service.name}</span>
                                <span className="mt-1 block text-xs text-slate-400">{service.description}</span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : (
                      <Link
                        href={item.href}
                        className="block rounded-full px-4 py-2 text-sm font-medium text-slate-200 hover:bg-white/10"
                        onClick={() => setMobileOpen(false)}
                      >
                        {item.name}
                      </Link>
                    )}
                  </div>
                ))}
              </nav>
              <div className="mt-10">
                <Link
                  href="/contact"
                  onClick={() => setMobileOpen(false)}
                  className="block rounded-full bg-primary px-4 py-3 text-center text-sm font-semibold text-white shadow-lg shadow-primary/40 transition hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                >
                  Demander un devis
                </Link>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </Dialog>
      </Transition>
    </header>
  );
}
