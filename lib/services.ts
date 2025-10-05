import fs from 'node:fs/promises';
import path from 'node:path';
import matter from 'gray-matter';

export type Service = {
  slug: string;
  title: string;
  excerpt: string;
  hero: string;
  benefits: { title: string; description: string }[];
  deliverables: string[];
  process: { title: string; description: string }[];
  faq: { question: string; answer: string }[];
  body: string;
};

const SERVICES_DIR = path.join(process.cwd(), 'content', 'services');

export async function getServiceSlugs() {
  const files = await fs.readdir(SERVICES_DIR);
  return files.filter((file) => file.endsWith('.md')).map((file) => file.replace(/\.md$/, ''));
}

export async function getServices(): Promise<Service[]> {
  const slugs = await getServiceSlugs();
  const services = await Promise.all(slugs.map((slug) => getService(slug)));
  return services.sort((a, b) => a.title.localeCompare(b.title));
}

export async function getService(slug: string): Promise<Service> {
  const filePath = path.join(SERVICES_DIR, `${slug}.md`);
  const file = await fs.readFile(filePath, 'utf-8');
  const { data, content } = matter(file);
  const {
    title,
    excerpt,
    hero,
    benefits = [],
    deliverables = [],
    process = [],
    faq = [],
  } = data as Partial<Service> & { title: string; excerpt: string; hero: string };

  return {
    slug,
    title,
    excerpt,
    hero,
    benefits,
    deliverables,
    process,
    faq,
    body: content,
  };
}
