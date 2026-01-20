import { Metadata } from 'next';
import { routing } from '@/i18n/routing';

interface GenerateToolMetadataParams {
  locale: string;
  seoTitle: string;
  seoDescription: string;
  toolPath: string; // e.g., 'yarn/yarn-count-converter'
  keywords?: string[];
}

export function generateToolMetadata({
  locale,
  seoTitle,
  seoDescription,
  toolPath,
  keywords = [],
}: GenerateToolMetadataParams): Metadata {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://calctextile.com';
  const fullPath = `/${locale}/tools/${toolPath}`;
  const canonicalUrl = `${baseUrl}${fullPath}`;
  
  // Generate alternate language URLs
  const alternates: Record<string, string> = {};
  routing.locales.forEach((loc) => {
    alternates[loc] = `${baseUrl}/${loc}/tools/${toolPath}`;
  });

  // Default keywords for textile tools
  const defaultKeywords = [
    'textile calculator',
    'yarn calculator',
    'fabric calculator',
    'textile engineering',
    'textile tools',
  ];

  const allKeywords = [...defaultKeywords, ...keywords].join(', ');

  return {
    title: seoTitle,
    description: seoDescription,
    keywords: allKeywords,
    alternates: {
      canonical: canonicalUrl,
      languages: alternates,
    },
    openGraph: {
      title: seoTitle,
      description: seoDescription,
      url: canonicalUrl,
      siteName: 'TextileCalc',
      locale: locale,
      type: 'website',
      images: [
        {
          url: `${baseUrl}/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: seoTitle,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: seoTitle,
      description: seoDescription,
      images: [`${baseUrl}/og-image.jpg`],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}
