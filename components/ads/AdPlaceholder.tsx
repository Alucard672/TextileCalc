'use client';

import { useTranslations } from 'next-intl';

interface AdPlaceholderProps {
  position?: 'top' | 'sidebar' | 'bottom';
}

export function AdPlaceholder({ position = 'top' }: AdPlaceholderProps) {
  const t = useTranslations('ads');

  // 招商广告配置
  const adConfig = {
    image: "/images/zhiyun-banner.jpg", // 放在 public 文件夹下的图片（可选）
    link: "mailto:liumx2026@gmail.com", // 招商联系邮箱
    alt: "Advertise Here",
    title: t('title'),
    description: t('description'),
    cta: t('cta'),
    email: "liumx2026@gmail.com"
  };

  // 如果想展示 AdSense (未来开关)
  const showAdSense = false;

  if (showAdSense) {
    return (
      <div className="w-full bg-slate-100 border border-slate-200 rounded-lg flex items-center justify-center min-h-[100px] md:min-h-[120px] relative overflow-hidden">
        <div className="relative z-10 text-slate-400 text-sm font-medium">
          Advertisement
        </div>
      </div>
    );
  }

  // 根据位置设置不同的样式
  const containerClass = position === 'sidebar' 
    ? "w-full max-w-[300px] mx-auto"
    : "w-full";

  const minHeight = position === 'sidebar' 
    ? "min-h-[250px]"
    : position === 'top'
    ? "min-h-[100px] md:min-h-[120px]"
    : "min-h-[100px] md:min-h-[120px]";

  // 目前展示招商广告
  return (
    <div className={`${containerClass} mb-6`}>
      <a
        href={adConfig.link}
        target="_blank"
        rel="nofollow noopener noreferrer"
        className="block w-full overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm hover:shadow-md transition-shadow"
      >
        {/* 广告内容区域 */}
        <div className={`relative w-full ${minHeight} bg-gradient-to-br from-blue-50 via-slate-50 to-blue-50 flex items-center justify-center`}>
          {/* 如果有图片，尝试显示图片 */}
          {adConfig.image && (
            <div className="absolute inset-0">
              <img
                src={adConfig.image}
                alt={adConfig.alt}
                className="w-full h-full object-cover"
                onError={(e) => {
                  // 图片加载失败时隐藏
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>
          )}
          {/* 文本广告内容 */}
          <div className="relative z-10 text-center p-4 md:p-6 w-full">
            <div className="text-lg md:text-2xl font-bold text-blue-600 mb-2">
              {adConfig.title}
            </div>
            <div className="text-xs md:text-sm text-slate-600 mb-3 md:mb-4 max-w-md mx-auto">
              {adConfig.description}
            </div>
            <div className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors">
              {adConfig.cta}
            </div>
            <div className="text-[10px] text-slate-400 mt-2">
              {adConfig.email}
            </div>
          </div>
        </div>
        {/* 广告标识 */}
        <div className="bg-slate-50 px-3 py-1.5 text-[10px] text-slate-400 text-center border-t border-slate-200">
          {t('sponsored')}
        </div>
      </a>
    </div>
  );
}
