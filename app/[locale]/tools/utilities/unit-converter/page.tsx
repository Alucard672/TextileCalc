import { getTranslations } from 'next-intl/server';
import { UnitConverter } from '@/components/calculators/UnitConverter';
import { AdPlaceholder } from '@/components/ads/AdPlaceholder';
import { Metadata } from 'next';
import { generateToolMetadata } from '@/lib/metadata';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations('tools.unitConverter');

  // Extract keywords from translation file
  const keywordsStr = t('keywords') || '';
  const keywords = keywordsStr ? keywordsStr.split(',').map(k => k.trim()) : [];

  return generateToolMetadata({
    locale,
    seoTitle: t('seoTitle'),
    seoDescription: t('seoDescription'),
    toolPath: 'utilities/unit-converter',
    keywords,
  });
}

export default async function UnitConverterPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations('tools.unitConverter');

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <AdPlaceholder position="top" />
      
      <div className="max-w-4xl mx-auto my-8">
        <UnitConverter />
      </div>

      <AdPlaceholder position="bottom" />

      <article className="max-w-4xl mx-auto mt-12 prose prose-slate">
        <h2>{t('title')}</h2>
        <p>{t('description')}</p>
        <h3>{t('seoContent.howToUse')}</h3>
        <p>{t('seoContent.howToUseText')}</p>
        <h3>{t('seoContent.conversionFactors')}</h3>
        <ul>
          <li>{t('seoContent.yardsToMeters')}</li>
          <li>{t('seoContent.metersToYards')}</li>
          <li>{t('seoContent.poundsToKg')}</li>
          <li>{t('seoContent.kgToPounds')}</li>
        </ul>
        <h3>{t('seoContent.commonUsage')}</h3>
        <p>{t('seoContent.usageText')}</p>
      </article>
    </div>
  );
}
