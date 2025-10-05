import Link from 'next/link';
import { Card } from './Card';

interface BlogCardProps {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  readingTime: string;
  tags: string[];
  showTags?: boolean;
}

export function BlogCard({ slug, title, description, date, author, readingTime, tags, showTags = true }: BlogCardProps) {
  return (
    <Card as="article" className="flex h-full flex-col justify-between">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-primary">{new Date(date).toLocaleDateString('fr-FR')}</p>
        <h3 className="mt-3 text-xl font-semibold text-slate-900">
          <Link href={`/blog/${slug}`} className="hover:text-primary">
            {title}
          </Link>
        </h3>
        <p className="mt-3 text-sm text-slate-600">{description}</p>
      </div>
      <div className="mt-6 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
        <span>{author}</span>
        <span>{readingTime} min de lecture</span>
      </div>
      {showTags && tags.length > 0 ? (
        <div className="mt-4 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span key={tag} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
              #{tag}
            </span>
          ))}
        </div>
      ) : null}
    </Card>
  );
}
