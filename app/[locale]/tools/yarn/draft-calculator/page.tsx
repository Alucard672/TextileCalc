import { getTranslations } from 'next-intl/server';
import { DraftCalculator } from '@/components/calculators/DraftCalculator';
import { AdPlaceholder } from '@/components/ads/AdPlaceholder';
import { Metadata } from 'next';
import { generateToolMetadata } from '@/lib/metadata';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations('tools.draftCalculator');

  return generateToolMetadata({
    locale,
    seoTitle: t('seoTitle'),
    seoDescription: t('seoDescription'),
    toolPath: 'yarn/draft-calculator',
    keywords: ['draft calculator', 'draft ratio', 'spinning', 'textile spinning'],
  });
}

export default async function DraftCalculatorPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations('tools.draftCalculator');

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <AdPlaceholder position="top" />
      
      <div className="max-w-4xl mx-auto my-8">
        <DraftCalculator />
      </div>

      <AdPlaceholder position="bottom" />

      <article className="max-w-4xl mx-auto mt-12 prose prose-slate">
        <h2>{t('title')}</h2>
        <p>{t('description')}</p>
        <h3>{t('seoContent.howToUse')}</h3>
        <p>{t('seoContent.howToUseText')}</p>
        <h3>{t('seoContent.calculationMethods')}</h3>
        <ul>
          <li><strong>{t('seoContent.speedMethodText')}</strong></li>
          <li><strong>{t('seoContent.diameterMethodText')}</strong></li>
        </ul>
        <h3>{t('seoContent.importance')}</h3>
        <p>{t('seoContent.importanceText')}</p>
      </article>
    </div>
  );
}
