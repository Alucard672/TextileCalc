'use client';

import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';

interface StructuredDataProps {
  toolKey: string; // e.g., 'yarnCountConverter'
  toolPath: string; // e.g., 'yarn/yarn-count-converter'
}

export function StructuredData({ toolKey, toolPath }: StructuredDataProps) {
  const t = useTranslations(`tools.${toolKey}`);
  const locale = useLocale();
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://calctextile.com';
  const fullUrl = `${baseUrl}/${locale}/tools/${toolPath}`;

  // HowTo Schema
  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: t('title'),
    description: t('description'),
    step: [
      {
        '@type': 'HowToStep',
        name: t('seoContent.howToUse'),
        text: t('seoContent.howToUseText'),
      },
    ],
  };

  // SoftwareApplication Schema
  const softwareApplicationSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: t('title'),
    description: t('seoDescription'),
    applicationCategory: 'UtilityApplication',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    url: fullUrl,
  };

  // BreadcrumbList Schema
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: `${baseUrl}/${locale}`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: t('title'),
        item: fullUrl,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  );
}
