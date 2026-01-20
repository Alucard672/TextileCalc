interface JsonLdProps {
  name: string;
  description: string;
  url: string;
  category?: string;
  type?: 'SoftwareApplication' | 'WebApplication';
}

export function JsonLd({
  name,
  description,
  url,
  category = 'Textile Design Software',
  type = 'SoftwareApplication',
}: JsonLdProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': type,
    name,
    description,
    applicationCategory: category,
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
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
