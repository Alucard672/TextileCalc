import { getTranslations } from 'next-intl/server';
import { YarnCountConverter } from '@/components/calculators/YarnCountConverter';
import { AdPlaceholder } from '@/components/ads/AdPlaceholder';
import { StructuredData } from '@/components/seo/StructuredData';
import { JsonLd } from '@/components/seo/JsonLd';
import { Metadata } from 'next';
import { generateToolMetadata } from '@/lib/metadata';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations('tools.yarnCountConverter');

  // Extract keywords from translation file, split by comma if it's a string
  const keywordsStr = t('keywords') || '';
  const keywords = keywordsStr ? keywordsStr.split(',').map(k => k.trim()) : [];

  return generateToolMetadata({
    locale,
    seoTitle: t('seoTitle'),
    seoDescription: t('seoDescription'),
    toolPath: 'yarn/yarn-count-converter',
    keywords,
  });
}

export default async function YarnCountConverterPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations('tools.yarnCountConverter');
  
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://calctextile.com';
  const toolUrl = `${baseUrl}/${locale}/tools/yarn/yarn-count-converter`;

  return (
    <>
      <StructuredData toolKey="yarnCountConverter" toolPath="yarn/yarn-count-converter" />
      <JsonLd
        name={t('title')}
        description={t('seoDescription')}
        url={toolUrl}
        category="Textile Design Software"
        type="SoftwareApplication"
      />
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
