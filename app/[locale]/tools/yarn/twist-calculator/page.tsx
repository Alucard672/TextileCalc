import { getTranslations } from 'next-intl/server';
import { TwistCalculator } from '@/components/calculators/TwistCalculator';
import { AdPlaceholder } from '@/components/ads/AdPlaceholder';
import { Metadata } from 'next';
import { generateToolMetadata } from '@/lib/metadata';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations('tools.twistCalculator');

  return generateToolMetadata({
    locale,
    seoTitle: t('seoTitle'),
    seoDescription: t('seoDescription'),
    toolPath: 'yarn/twist-calculator',
    keywords: ['twist calculator', 'TPI', 'TPM', 'twist multiplier', 'yarn twist'],
  });
}

export default async function TwistCalculatorPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations('tools.twistCalculator');

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <AdPlaceholder position="top" />
      
      <div className="max-w-4xl mx-auto my-8">
        <TwistCalculator />
      </div>

      <AdPlaceholder position="bottom" />

      <article className="max-w-4xl mx-auto mt-12 prose prose-slate">
        <h2>{t('title')}</h2>
        <p>{t('description')}</p>
        <h3>{t('seoContent.howToUse')}</h3>
        <p>{t('seoContent.howToUseText')}</p>
        <h3>{t('seoContent.conversion')}</h3>
        <p>{t('seoContent.conversionText')}</p>
        <h3>{t('seoContent.twistMultiplierFormula')}</h3>
        <p>{t('seoContent.twistMultiplierText')}</p>
      </article>
    </div>
  );
}
