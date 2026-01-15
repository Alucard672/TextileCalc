import { getTranslations } from 'next-intl/server';
import { FabricProduction } from '@/components/calculators/FabricProduction';
import { AdPlaceholder } from '@/components/ads/AdPlaceholder';
import { Metadata } from 'next';
import { generateToolMetadata } from '@/lib/metadata';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations('tools.fabricProduction');

  return generateToolMetadata({
    locale,
    seoTitle: t('seoTitle'),
    seoDescription: t('seoDescription'),
    toolPath: 'fabric/fabric-production',
    keywords: ['fabric production', 'loom production', 'weaving production', 'loom efficiency'],
  });
}

export default async function FabricProductionPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations('tools.fabricProduction');

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <AdPlaceholder position="top" />
      
      <div className="max-w-4xl mx-auto my-8">
        <FabricProduction />
      </div>

      <AdPlaceholder position="bottom" />

      <article className="max-w-4xl mx-auto mt-12 prose prose-slate">
        <h2>{t('title')}</h2>
        <p>{t('description')}</p>
        <h3>{t('seoContent.howToUse')}</h3>
        <p>{t('seoContent.howToUseText')}</p>
        <h3>{t('seoContent.productionCalculation')}</h3>
        <p>{t('seoContent.productionCalculationText')}</p>
        <h3>{t('seoContent.efficiencyFactors')}</h3>
        <ul>
          <li>{t('seoContent.efficiencyFactor1')}</li>
          <li>{t('seoContent.efficiencyFactor2')}</li>
          <li>{t('seoContent.efficiencyFactor3')}</li>
          <li>{t('seoContent.efficiencyFactor4')}</li>
        </ul>
      </article>
    </div>
  );
}
