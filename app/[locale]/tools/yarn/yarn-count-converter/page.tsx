import { getTranslations } from 'next-intl/server';
import { YarnCountConverter } from '@/components/calculators/YarnCountConverter';
import { AdPlaceholder } from '@/components/ads/AdPlaceholder';
import { StructuredData } from '@/components/seo/StructuredData';
import { Metadata } from 'next';
import { generateToolMetadata } from '@/lib/metadata';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations('tools.yarnCountConverter');

  return generateToolMetadata({
    locale,
    seoTitle: t('seoTitle'),
    seoDescription: t('seoDescription'),
    toolPath: 'yarn/yarn-count-converter',
    keywords: ['yarn count', 'Ne', 'Nm', 'Tex', 'Denier', 'yarn conversion', 'textile count'],
  });
}

export default async function YarnCountConverterPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations('tools.yarnCountConverter');

  return (
    <>
      <StructuredData toolKey="yarnCountConverter" toolPath="yarn/yarn-count-converter" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AdPlaceholder position="top" />
        
        <div className="max-w-4xl mx-auto my-8">
          <YarnCountConverter />
        </div>

        <AdPlaceholder position="bottom" />

      <article className="max-w-4xl mx-auto mt-12 prose prose-slate">
        <h2>{t('title')}</h2>
        <p>{t('description')}</p>
        <h3>{t('seoContent.howToUse')}</h3>
        <p>{t('seoContent.howToUseText')}</p>
        <h3>{t('seoContent.yarnCountSystems')}</h3>
        <ul>
          <li><strong>{t('seoContent.neDescription')}</strong></li>
          <li><strong>{t('seoContent.nmDescription')}</strong></li>
          <li><strong>{t('seoContent.texDescription')}</strong></li>
          <li><strong>{t('seoContent.denierDescription')}</strong></li>
        </ul>
        <h3>{t('seoContent.commonConversions')}</h3>
        <ul>
          <li>{t('seoContent.neToNm')}</li>
          <li>{t('seoContent.neToTex')}</li>
          <li>{t('seoContent.neToDenier')}</li>
        </ul>
      </article>
      </div>
    </>
  );
}
