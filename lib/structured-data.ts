import { routing } from '@/i18n/routing';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://calctextile.com';

interface GenerateStructuredDataParams {
  locale: string;
  toolKey: string;
  toolPath: string;
  title: string;
  description: string;
  seoDescription: string;
  howToUse?: string;
  howToUseText?: string;
}

export function generateStructuredDataScripts({
  locale,
  toolKey,
  toolPath,
  title,
  description,
  seoDescription,
  howToUse,
  howToUseText,
}: GenerateStructuredDataParams): string {
  const fullUrl = `${baseUrl}/${locale}/tools/${toolPath}`;

  // HowTo Schema
  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: title,
    description: description,
    step: howToUse && howToUseText
      ? [
          {
            '@type': 'HowToStep',
            name: howToUse,
            text: howToUseText,
          },
        ]
      : [],
  };

  // SoftwareApplication Schema
  const softwareApplicationSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: title,
    description: seoDescription,
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
        name: title,
        item: fullUrl,
      },
    ],
  };

  return `
    <script type="application/ld+json">
      ${JSON.stringify(howToSchema, null, 2)}
    </script>
    <script type="application/ld+json">
      ${JSON.stringify(softwareApplicationSchema, null, 2)}
    </script>
    <script type="application/ld+json">
      ${JSON.stringify(breadcrumbSchema, null, 2)}
    </script>
  `;
}
