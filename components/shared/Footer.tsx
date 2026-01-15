import { useTranslations } from 'next-intl';

export function Footer() {
  const t = useTranslations('footer');

  return (
    <footer className="border-t border-slate-200 bg-white mt-auto">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center text-slate-600">
          <p className="text-sm mb-2">{t('description')}</p>
          <p className="text-xs text-slate-400">{t('copyright')}</p>
        </div>
      </div>
    </footer>
  );
}
