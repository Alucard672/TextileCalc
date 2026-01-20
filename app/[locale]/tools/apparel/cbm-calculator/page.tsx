import { getTranslations } from 'next-intl/server';
import { CBMCalculator } from '@/components/calculators/CBMCalculator';
import { AdPlaceholder } from '@/components/ads/AdPlaceholder';
import { Metadata } from 'next';
import { generateToolMetadata } from '@/lib/metadata';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations('tools.cbmCalculator');

  // Extract keywords from translation file
  const keywordsStr = t('keywords') || '';
  const keywords = keywordsStr ? keywordsStr.split(',').map(k => k.trim()) : [];

  return generateToolMetadata({
    locale,
    seoTitle: t('seoTitle'),
    seoDescription: t('seoDescription'),
    toolPath: 'apparel/cbm-calculator',
    keywords,
  });
}

export default async function CBMCalculatorPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations('tools.cbmCalculator');

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <AdPlaceholder position="top" />
      
      <div className="max-w-4xl mx-auto my-8">
        <CBMCalculator />
      </div>

      <AdPlaceholder position="bottom" />

      <article className="max-w-4xl mx-auto mt-12 prose prose-slate">
        <h2>{t('title')}</h2>
        <p>{t('description')}</p>
        <h3>{t('seoContent.howToUse')}</h3>
        <p>{t('seoContent.howToUseText')}</p>
        <h3>{t('seoContent.cbmFormula')}</h3>
        <p>{t('seoContent.cbmFormulaText')}</p>
        <h3>{t('seoContent.containerTypes')}</h3>
        <ul>
          <li>{t('seoContent.container20ft')}</li>
          <li>{t('seoContent.container40ft')}</li>
          <li>{t('seoContent.container40hc')}</li>
        </ul>
      </article>
    </div>
  );
}
