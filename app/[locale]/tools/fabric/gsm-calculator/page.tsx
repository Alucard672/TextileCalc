import { getTranslations } from 'next-intl/server';
import { GSMCalculator } from '@/components/calculators/GSMCalculator';
import { AdPlaceholder } from '@/components/ads/AdPlaceholder';
import { JsonLd } from '@/components/seo/JsonLd';
import { Metadata } from 'next';
import { generateToolMetadata } from '@/lib/metadata';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations('tools.gsmCalculator');

  // Extract keywords from translation file
  const keywordsStr = t('keywords') || '';
  const keywords = keywordsStr ? keywordsStr.split(',').map(k => k.trim()) : [];

  return generateToolMetadata({
    locale,
    seoTitle: t('seoTitle'),
    seoDescription: t('seoDescription'),
    toolPath: 'fabric/gsm-calculator',
    keywords,
  });
}

export default async function GSMCalculatorPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations('tools.gsmCalculator');
  
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://calctextile.com';
  const toolUrl = `${baseUrl}/${locale}/tools/fabric/gsm-calculator`;

  return (
    <>
      <JsonLd
        toolName={t('title')}
        description={t('seoDescription')}
        url={toolUrl}
        category="Textile Design Software"
        type="SoftwareApplication"
      />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <AdPlaceholder position="top" />
      
      <div className="max-w-4xl mx-auto my-8">
        <GSMCalculator />
      </div>

      <AdPlaceholder position="bottom" />

      <article className="max-w-4xl mx-auto mt-12 prose prose-slate">
        <h2>{t('title')}</h2>
        <p>{t('description')}</p>
        <h3>{t('seoContent.howToUse')}</h3>
        <p>{t('seoContent.howToUseText')}</p>
        <h3>{t('seoContent.gsmFormula')}</h3>
        <p>{t('seoContent.gsmFormulaText')}</p>
        <h3>{t('seoContent.factorsAffectingGSM')}</h3>
        <ul>
          <li>{t('seoContent.factor1')}</li>
          <li>{t('seoContent.factor2')}</li>
          <li>{t('seoContent.factor3')}</li>
        </ul>
      </article>
    </div>
    </>
  );
}
