import { getTranslations } from 'next-intl/server';
import { CostEstimator } from '@/components/calculators/CostEstimator';
import { AdPlaceholder } from '@/components/ads/AdPlaceholder';
import { Metadata } from 'next';
import { generateToolMetadata } from '@/lib/metadata';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations('tools.costEstimator');

  return generateToolMetadata({
    locale,
    seoTitle: t('seoTitle'),
    seoDescription: t('seoDescription'),
    toolPath: 'apparel/cost-estimator',
    keywords: ['cost estimator', 'production cost', 'textile cost', 'pricing calculator'],
  });
}

export default async function CostEstimatorPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations('tools.costEstimator');

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <AdPlaceholder position="top" />
      
      <div className="max-w-4xl mx-auto my-8">
        <CostEstimator />
      </div>

      <AdPlaceholder position="bottom" />

      <article className="max-w-4xl mx-auto mt-12 prose prose-slate">
        <h2>{t('title')}</h2>
        <p>{t('description')}</p>
        <h3>{t('seoContent.howToUse')}</h3>
        <p>{t('seoContent.howToUseText')}</p>
        <h3>{t('seoContent.costBreakdown')}</h3>
        <ul>
          <li>{t('seoContent.materialCostText')}</li>
          <li>{t('seoContent.totalCostText')}</li>
          <li>{t('seoContent.profitText')}</li>
        </ul>
        <h3>{t('seoContent.pricing')}</h3>
        <p>{t('seoContent.pricingText')}</p>
      </article>
    </div>
  );
}
