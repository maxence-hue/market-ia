import fs from 'node:fs/promises';
import path from 'node:path';
import type { ReactNode } from 'react';
import { compileMDX } from 'next-mdx-remote/rsc';
import matter from 'gray-matter';
import readingTime from 'reading-time';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import type { Pluggable } from 'unified';

export type BlogFrontMatter = {
  title: string;
  description: string;
  date: string;
  author: string;
  tags?: string[];
};

export type BlogPost = {
  slug: string;
  frontMatter: BlogFrontMatter;
  readingTime: string;
  content: ReactNode;
  headings: { id: string; text: string; level: number }[];
};

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog');

const headingRegex = /^ {0,3}(#{2,6})\s+(.+)/gm;

function extractHeadings(content: string) {
  const headings: { id: string; text: string; level: number }[] = [];
  const slugify = (value: string) =>
    value
      .toLowerCase()
      .replace(/[^a-z0-9\u00C0-\u017F\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-');

  let match;
  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length;
    const text = match[2].trim();
    const id = slugify(text);
    headings.push({ id, text, level });
  }
  return headings;
}

export async function getBlogSlugs(): Promise<string[]> {
  const files = await fs.readdir(BLOG_DIR);
  return files.filter((file) => file.endsWith('.mdx')).map((file) => file.replace(/\.mdx$/, ''));
}

export async function getBlogPost(slug: string): Promise<BlogPost> {
  const fullPath = path.join(BLOG_DIR, `${slug}.mdx`);
  const source = await fs.readFile(fullPath, 'utf-8');
  const { frontmatter, content } = await compileMDX<BlogFrontMatter>({
    source,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [remarkGfm as unknown as Pluggable],
        rehypePlugins: [[rehypeSlug], [rehypeAutolinkHeadings, { behavior: 'wrap' }]],
      },
    },
  });

  return {
    slug,
    frontMatter: frontmatter,
    readingTime: Math.max(1, Math.ceil(readingTime(source).minutes)).toString(),
    content,
    headings: extractHeadings(source),
  };
}

export type BlogListItem = {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  tags: string[];
  readingTime: string;
};

export async function getAllBlogPosts(): Promise<BlogListItem[]> {
  const slugs = await getBlogSlugs();
  const posts = await Promise.all(
    slugs.map(async (slug) => {
      const fullPath = path.join(BLOG_DIR, `${slug}.mdx`);
      const file = await fs.readFile(fullPath, 'utf-8');
      const { data } = matter(file);
      const fm = data as BlogFrontMatter;
      return {
        slug,
        title: fm.title,
        description: fm.description,
        date: fm.date,
        author: fm.author,
        tags: fm.tags ?? [],
        readingTime: Math.max(1, Math.ceil(readingTime(file).minutes)).toString(),
      };
    }),
  );

  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}
