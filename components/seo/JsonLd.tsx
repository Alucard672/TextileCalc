interface JsonLdProps {
  toolName: string;
  description: string;
  url: string;
  category?: string;
  type?: 'SoftwareApplication' | 'WebApplication';
}

export function JsonLd({
  toolName,
  description,
  url,
  category = 'Textile Design Software',
  type = 'SoftwareApplication',
}: JsonLdProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': type,
    name: toolName,
    description,
    applicationCategory: category,
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: '1024',
    },
    url,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
