'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useTranslations } from 'next-intl';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { calculateCoverFactor } from '@/utils/calculations';
import { useState } from 'react';

type FormData = {
  epi: number;
  ppi: number;
  warpCount: number;
  weftCount: number;
};

export function CoverFactor() {
  const t = useTranslations('tools.coverFactor');
  const commonT = useTranslations('common');
  const errorsT = useTranslations('common.errors');
  
  // Create schema with translated error messages
  const schema = z.object({
    epi: z.number().min(0.01, errorsT('mustBeGreaterThan0')),
    ppi: z.number().min(0.01, errorsT('mustBeGreaterThan0')),
    warpCount: z.number().min(0.01, errorsT('mustBeGreaterThan0')),
    weftCount: z.number().min(0.01, errorsT('mustBeGreaterThan0')),
  });
  const [coverFactor, setCoverFactor] = useState<number | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    const result = calculateCoverFactor(data.epi, data.ppi, data.warpCount, data.weftCount);
    setCoverFactor(result);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>{t('title')}</CardTitle>
        <CardDescription>{t('description')}</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="epi">{t('epi')}</Label>
              <Input
                id="epi"
                type="number"
                step="0.01"
                {...register('epi', { valueAsNumber: true })}
                placeholder="0.00"
              />
              {errors.epi && (
                <p className="text-sm text-red-500">{errors.epi.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="ppi">{t('ppi')}</Label>
              <Input
                id="ppi"
                type="number"
                step="0.01"
                {...register('ppi', { valueAsNumber: true })}
                placeholder="0.00"
              />
              {errors.ppi && (
                <p className="text-sm text-red-500">{errors.ppi.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="warpCount">{t('warpCount')}</Label>
              <Input
                id="warpCount"
                type="number"
                step="0.01"
                {...register('warpCount', { valueAsNumber: true })}
                placeholder="0.00"
              />
              {errors.warpCount && (
                <p className="text-sm text-red-500">{errors.warpCount.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="weftCount">{t('weftCount')}</Label>
              <Input
                id="weftCount"
                type="number"
                step="0.01"
                {...register('weftCount', { valueAsNumber: true })}
                placeholder="0.00"
              />
              {errors.weftCount && (
                <p className="text-sm text-red-500">{errors.weftCount.message}</p>
              )}
            </div>
          </div>
          <Button type="submit" className="w-full">{commonT('calculate')}</Button>
        </form>
        {coverFactor !== null && (
          <div className="mt-6 p-4 bg-slate-100 rounded-lg">
            <div className="text-sm text-slate-600 mb-1">{t('coverFactor')}</div>
            <div className="text-2xl font-mono font-bold text-blue-600">
              {coverFactor.toFixed(4)}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
