import { getTranslations } from 'next-intl/server';
import { FabricYardage } from '@/components/calculators/FabricYardage';
import { AdPlaceholder } from '@/components/ads/AdPlaceholder';
import { Metadata } from 'next';
import { generateToolMetadata } from '@/lib/metadata';
import { generateStructuredDataScripts } from '@/lib/structured-data';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations('tools.fabricYardage');

  return generateToolMetadata({
    locale,
    seoTitle: t('seoTitle'),
    seoDescription: t('seoDescription'),
    toolPath: 'fabric/fabric-yardage',
    keywords: ['fabric yardage', 'fabric calculation', 'fabric purchasing', 'inventory management'],
  });
}

export default async function FabricYardagePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations('tools.fabricYardage');

  const structuredData = generateStructuredDataScripts({
    locale,
    toolKey: 'fabricYardage',
    toolPath: 'fabric/fabric-yardage',
    title: t('title'),
    description: t('description'),
    seoDescription: t('seoDescription'),
    howToUse: t('seoContent.howToUse'),
    howToUseText: t('seoContent.howToUseText'),
  });

  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: structuredData }} />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AdPlaceholder position="top" />
        
        <div className="max-w-4xl mx-auto my-8">
          <FabricYardage />
        </div>

        <AdPlaceholder position="bottom" />

        <article className="max-w-4xl mx-auto mt-12 prose prose-slate">
          <h2>{t('title')}</h2>
          <p>{t('description')}</p>
          <h3>{t('seoContent.howToUse')}</h3>
          <p>{t('seoContent.howToUseText')}</p>
          <h3>{t('seoContent.formula')}</h3>
          <p>{t('seoContent.formulaText')}</p>
          <h3>{t('seoContent.applications')}</h3>
          <p>{t('seoContent.applicationsText')}</p>
        </article>
      </div>
    </>
  );
}
