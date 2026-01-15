import { getTranslations } from 'next-intl/server';
import { FabricConsumption } from '@/components/calculators/FabricConsumption';
import { AdPlaceholder } from '@/components/ads/AdPlaceholder';
import { Metadata } from 'next';
import { generateToolMetadata } from '@/lib/metadata';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations('tools.fabricConsumption');

  return generateToolMetadata({
    locale,
    seoTitle: t('seoTitle'),
    seoDescription: t('seoDescription'),
    toolPath: 'apparel/fabric-consumption',
    keywords: ['fabric consumption', 'garment consumption', 'apparel consumption', 'fabric usage'],
  });
}

export default async function FabricConsumptionPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations('tools.fabricConsumption');

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <AdPlaceholder position="top" />
      
      <div className="max-w-4xl mx-auto my-8">
        <FabricConsumption />
      </div>

      <AdPlaceholder position="bottom" />

      <article className="max-w-4xl mx-auto mt-12 prose prose-slate">
        <h2>{t('title')}</h2>
        <p>{t('description')}</p>
        <h3>{t('seoContent.howToUse')}</h3>
        <p>{t('seoContent.howToUseText')}</p>
        <h3>{t('seoContent.formula')}</h3>
        <p>{t('seoContent.formulaText')}</p>
        <h3>{t('seoContent.factors')}</h3>
        <ul>
          <li>{t('seoContent.factor1')}</li>
          <li>{t('seoContent.factor2')}</li>
          <li>{t('seoContent.factor3')}</li>
        </ul>
      </article>
    </div>
  );
}
