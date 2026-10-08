import type { MetadataRoute } from 'next';
import { projects, site } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const pages: MetadataRoute.Sitemap = [
    { url: `${site.url}/`, lastModified: now, changeFrequency: 'monthly', priority: 1 },
    { url: `${site.url}/about`, lastModified: now, changeFrequency: 'yearly', priority: 0.7 },
    { url: `${site.url}/projects`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${site.url}/contacts`, lastModified: now, changeFrequency: 'yearly', priority: 0.8 },
  ];

  const projectPages: MetadataRoute.Sitemap = projects.map((p) => ({
    url: `${site.url}/projects/${p.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  return [...pages, ...projectPages];
}
