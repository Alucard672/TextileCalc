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

        <article className="max-w-4xl mx-auto mt-12 mb-16 prose prose-slate prose-lg">
          <header>
            <h1 className="text-3xl font-bold mb-4">{t('title')}</h1>
            <p className="text-lg text-slate-600 mb-8">{t('description')}</p>
          </header>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">{t('seoArticle.howToUseTitle')}</h2>
            <p className="mb-4 leading-relaxed">{t('seoArticle.howToUseContent')}</p>
            
            <h3 className="text-xl font-semibold mt-6 mb-3">{t('seoContent.yarnCountSystems')}</h3>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li><strong>{t('seoContent.neDescription')}</strong></li>
              <li><strong>{t('seoContent.nmDescription')}</strong></li>
              <li><strong>{t('seoContent.texDescription')}</strong></li>
              <li><strong>{t('seoContent.denierDescription')}</strong></li>
            </ul>
            
            <h3 className="text-xl font-semibold mt-6 mb-3">{t('seoContent.commonConversions')}</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>{t('seoContent.neToNm')}</li>
              <li>{t('seoContent.neToTex')}</li>
              <li>{t('seoContent.neToDenier')}</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">{t('seoArticle.importanceTitle')}</h2>
            <p className="leading-relaxed">{t('seoArticle.importanceContent')}</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-6">{t('seoArticle.faqTitle')}</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">{t('seoArticle.faq1Question')}</h3>
                <p className="text-slate-700 leading-relaxed">{t('seoArticle.faq1Answer')}</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">{t('seoArticle.faq2Question')}</h3>
                <p className="text-slate-700 leading-relaxed">{t('seoArticle.faq2Answer')}</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">{t('seoArticle.faq3Question')}</h3>
                <p className="text-slate-700 leading-relaxed">{t('seoArticle.faq3Answer')}</p>
              </div>
            </div>
          </section>
        </article>
      </div>
    </>
  );
}
