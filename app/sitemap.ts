import { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://calctextile.com';

// Tool paths organized by category
const tools = [
  { path: 'yarn/yarn-count-converter', priority: 0.9 },
  { path: 'yarn/resultant-count', priority: 0.8 },
  { path: 'yarn/twist-calculator', priority: 0.8 },
  { path: 'yarn/draft-calculator', priority: 0.7 },
  { path: 'yarn/yarn-weight', priority: 0.8 },
  { path: 'fabric/gsm-calculator', priority: 0.9 },
  { path: 'fabric/cover-factor', priority: 0.8 },
  { path: 'fabric/weave-beam-weight', priority: 0.7 },
  { path: 'fabric/fabric-production', priority: 0.8 },
  { path: 'fabric/fabric-shrinkage', priority: 0.8 },
  { path: 'fabric/gsm-to-oz-converter', priority: 0.7 },
  { path: 'fabric/fabric-yardage', priority: 0.7 },
  { path: 'apparel/fabric-consumption', priority: 0.9 },
  { path: 'apparel/cbm-calculator', priority: 0.8 },
  { path: 'apparel/cost-estimator', priority: 0.8 },
  { path: 'utilities/unit-converter', priority: 0.7 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const sitemapEntries: MetadataRoute.Sitemap = [];

  // Add homepage for each locale
  routing.locales.forEach((locale) => {
    sitemapEntries.push({
      url: `${baseUrl}/${locale}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
      alternates: {
        languages: Object.fromEntries(
          routing.locales.map((loc) => [loc, `${baseUrl}/${loc}`])
        ),
      },
    });

    // Add tool pages for each locale
    tools.forEach((tool) => {
      sitemapEntries.push({
        url: `${baseUrl}/${locale}/tools/${tool.path}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: tool.priority,
        alternates: {
          languages: Object.fromEntries(
            routing.locales.map((loc) => [loc, `${baseUrl}/${loc}/tools/${tool.path}`])
          ),
        },
      });
    });
  });

  return sitemapEntries;
}
