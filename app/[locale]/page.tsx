import { getTranslations } from 'next-intl/server';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Link } from '@/i18n/routing';
import { Metadata } from 'next';
import { routing } from '@/i18n/routing';
import {
  Ruler,
  Layers,
  RulerIcon,
  Package,
  Calculator,
  Gauge,
  ArrowRightLeft,
  Grid3x3,
  Weight,
  Factory,
  DollarSign,
  Scale,
  TrendingDown,
  ArrowUpDown,
  Package2,
  RulerIcon as RulerIcon2,
} from 'lucide-react';
import { AdPlaceholder } from '@/components/ads/AdPlaceholder';

const tools = [
  {
    id: 'yarn-count-converter',
    category: 'yarn',
    icon: Ruler,
    route: '/tools/yarn/yarn-count-converter',
  },
  {
    id: 'resultant-count',
    category: 'yarn',
    icon: Layers,
    route: '/tools/yarn/resultant-count',
  },
  {
    id: 'twist-calculator',
    category: 'yarn',
    icon: Gauge,
    route: '/tools/yarn/twist-calculator',
  },
  {
    id: 'draft-calculator',
    category: 'yarn',
    icon: ArrowRightLeft,
    route: '/tools/yarn/draft-calculator',
  },
  {
    id: 'gsm-calculator',
    category: 'fabric',
    icon: RulerIcon,
    route: '/tools/fabric/gsm-calculator',
  },
  {
    id: 'cover-factor',
    category: 'fabric',
    icon: Grid3x3,
    route: '/tools/fabric/cover-factor',
  },
  {
    id: 'weave-beam-weight',
    category: 'fabric',
    icon: Weight,
    route: '/tools/fabric/weave-beam-weight',
  },
  {
    id: 'fabric-production',
    category: 'fabric',
    icon: Factory,
    route: '/tools/fabric/fabric-production',
  },
  {
    id: 'fabric-consumption',
    category: 'apparel',
    icon: Calculator,
    route: '/tools/apparel/fabric-consumption',
  },
  {
    id: 'cbm-calculator',
    category: 'apparel',
    icon: Package,
    route: '/tools/apparel/cbm-calculator',
  },
  {
    id: 'cost-estimator',
    category: 'apparel',
    icon: DollarSign,
    route: '/tools/apparel/cost-estimator',
  },
  {
    id: 'unit-converter',
    category: 'utilities',
    icon: Scale,
    route: '/tools/utilities/unit-converter',
  },
  {
    id: 'fabric-shrinkage',
    category: 'fabric',
    icon: TrendingDown,
    route: '/tools/fabric/fabric-shrinkage',
  },
  {
    id: 'gsm-to-oz-converter',
    category: 'fabric',
    icon: ArrowUpDown,
    route: '/tools/fabric/gsm-to-oz-converter',
  },
  {
    id: 'yarn-weight',
    category: 'yarn',
    icon: Package2,
    route: '/tools/yarn/yarn-weight',
  },
  {
    id: 'fabric-yardage',
    category: 'fabric',
    icon: RulerIcon2,
    route: '/tools/fabric/fabric-yardage',
  },
];

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations('home');
  const toolT = await getTranslations('tools');

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <AdPlaceholder position="top" />
      
      {/* Hero Section */}
      <div className="text-center py-12 md:py-16">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
          {t('heroTitle')}
        </h1>
        <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
          {t('heroSubtitle')}
        </p>
        <div className="max-w-md mx-auto">
          <Input
            type="search"
            placeholder={t('searchPlaceholder')}
            className="w-full"
          />
        </div>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {tools.map((tool) => {
          const Icon = tool.icon;
          const toolKey = tool.id
            .split('-')
            .map((word, i) =>
              i === 0
                ? word
                : word.charAt(0).toUpperCase() + word.slice(1)
            )
            .join('');
          const toolTitle = toolT(`${toolKey}.title`);
          const toolDescription = toolT(`${toolKey}.description`);

          return (
            <Link key={tool.id} href={tool.route}>
              <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <div className="flex items-center space-x-3 mb-2">
                    <Icon className="h-6 w-6 text-blue-600" />
                    <CardTitle>{toolTitle}</CardTitle>
                  </div>
                  <CardDescription>{toolDescription}</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          );
        })}
      </div>

      <AdPlaceholder position="bottom" />
    </div>
  );
}
