'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/routing';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useTranslations } from 'next-intl';

export function LanguageSwitcher() {
  const t = useTranslations('common');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const handleLanguageChange = (newLocale: string) => {
    // usePathname from next-intl already returns path without locale
    // Just use it directly with the new locale
    router.replace(pathname || '/', { locale: newLocale });
  };

  return (
    <Select value={locale} onValueChange={handleLanguageChange}>
      <SelectTrigger className="w-[120px]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="en">{t('english')}</SelectItem>
        <SelectItem value="zh">{t('chinese')}</SelectItem>
        <SelectItem value="es">{t('spanish')}</SelectItem>
        <SelectItem value="hi">{t('hindi')}</SelectItem>
        <SelectItem value="tr">{t('turkish')}</SelectItem>
        <SelectItem value="vi">{t('vietnamese')}</SelectItem>
        <SelectItem value="id">{t('indonesian')}</SelectItem>
        <SelectItem value="pt">{t('portuguese')}</SelectItem>
        <SelectItem value="bn">{t('bengali')}</SelectItem>
        <SelectItem value="ur">{t('urdu')}</SelectItem>
      </SelectContent>
    </Select>
  );
}
