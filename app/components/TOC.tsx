'use client';

import { useEffect, useState } from 'react';

export type Heading = {
  id: string;
  text: string;
  level: number;
};

type TOCProps = {
  headings: Heading[];
};

export function TOC({ headings }: TOCProps) {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
            break;
          }
        }
      },
      { rootMargin: '-40% 0px -40% 0px', threshold: [0, 1] },
    );

    headings.forEach((heading) => {
      const element = document.getElementById(heading.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <nav aria-label="Table des matières" className="sticky top-24 hidden h-max w-64 shrink-0 border-l border-slate-200 pl-6 lg:block">
      <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">Sommaire</p>
      <ul className="mt-4 space-y-2 text-sm">
        {headings.map((heading) => (
          <li key={heading.id} style={{ marginLeft: (heading.level - 2) * 12 }}>
            <a
              href={`#${heading.id}`}
              className={`block rounded-md px-2 py-1 transition hover:bg-primary/10 hover:text-primary ${
                activeId === heading.id ? 'bg-primary/10 font-semibold text-primary' : 'text-slate-600'
              }`}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
