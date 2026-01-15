'use client';

import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import { LanguageSwitcher } from './LanguageSwitcher';
import { Button } from '@/components/ui/button';
import { usePathname } from '@/i18n/routing';

export function Navbar() {
  const t = useTranslations('common');
  const navT = useTranslations('nav');
  const pathname = usePathname();

  return (
    <nav className="border-b border-slate-200 bg-white sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-8">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-xl font-bold text-blue-600">
                {t('appName')}
              </span>
            </Link>
            <div className="hidden md:flex items-center space-x-4">
              <Link href="/">
                <Button
                  variant={pathname === '/' ? 'default' : 'ghost'}
                  size="sm"
                >
                  {navT('home')}
                </Button>
              </Link>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </nav>
  );
}
