'use client';

import { Disclosure } from '@headlessui/react';
import { MinusSmallIcon, PlusSmallIcon } from '@heroicons/react/24/outline';

type FAQItem = {
  question: string;
  answer: string;
};

type FAQProps = {
  items: FAQItem[];
};

export function FAQ({ items }: FAQProps) {
  if (items.length === 0) return null;

  return (
    <dl className="space-y-4">
      {items.map((item) => (
        <Disclosure key={item.question}>
          {({ open }) => (
            <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
              <dt>
                <Disclosure.Button className="flex w-full items-center justify-between px-4 py-3 text-left text-base font-semibold text-slate-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
                  <span>{item.question}</span>
                  {open ? (
                    <MinusSmallIcon className="h-5 w-5 text-primary" aria-hidden />
                  ) : (
                    <PlusSmallIcon className="h-5 w-5 text-primary" aria-hidden />
                  )}
                </Disclosure.Button>
              </dt>
              <Disclosure.Panel as="dd" className="border-t border-slate-100 px-4 py-4 text-sm text-slate-600">
                {item.answer}
              </Disclosure.Panel>
            </div>
          )}
        </Disclosure>
      ))}
    </dl>
  );
}
