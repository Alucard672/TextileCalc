'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useTranslations } from 'next-intl';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { calculateFabricProduction, calculateDailyProduction } from '@/utils/calculations';
import { useState } from 'react';

type FormData = {
  rpm: number;
  ppi: number;
  efficiency: number;
  workingHours?: number;
};

export function FabricProduction() {
  const t = useTranslations('tools.fabricProduction');
  const commonT = useTranslations('common');
  const errorsT = useTranslations('common.errors');
  const [results, setResults] = useState<{ hourly: number; daily: number | null } | null>(null);
  
  // Create schema with translated error messages
  const schema = z.object({
    rpm: z.number().min(0.01, errorsT('mustBeGreaterThan0')),
    ppi: z.number().min(0.01, errorsT('mustBeGreaterThan0')),
    efficiency: z.number().min(0).max(100, errorsT('mustBeBetween0And100')),
    workingHours: z.number().min(0.01, errorsT('mustBeGreaterThan0')).optional(),
  });
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    const hourly = calculateFabricProduction(data.rpm, data.ppi, data.efficiency);
    const daily = data.workingHours
      ? calculateDailyProduction(hourly, data.workingHours)
      : null;
    setResults({ hourly, daily });
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
              <Label htmlFor="rpm">{t('rpm')}</Label>
              <Input
                id="rpm"
                type="number"
                step="0.01"
                {...register('rpm', { valueAsNumber: true })}
                placeholder="0.00"
              />
              {errors.rpm && (
                <p className="text-sm text-red-500">{errors.rpm.message}</p>
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
              <Label htmlFor="efficiency">{t('efficiency')}</Label>
              <Input
                id="efficiency"
                type="number"
                step="0.01"
                {...register('efficiency', { valueAsNumber: true })}
                placeholder="0.00"
              />
              {errors.efficiency && (
                <p className="text-sm text-red-500">{errors.efficiency.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="workingHours">{t('workingHours')} ({commonT('optional')})</Label>
              <Input
                id="workingHours"
                type="number"
                step="0.01"
                {...register('workingHours', { valueAsNumber: true })}
                placeholder="0.00"
              />
            </div>
          </div>
          <Button type="submit" className="w-full">{commonT('calculate')}</Button>
        </form>
        {results && (
          <div className="mt-6 space-y-3">
            <div className="p-4 bg-slate-100 rounded-lg">
              <div className="text-sm text-slate-600 mb-1">{t('hourlyProduction')}</div>
              <div className="text-2xl font-mono font-bold text-blue-600">
                {results.hourly.toFixed(2)} {t('unitMh')}
              </div>
            </div>
            {results.daily !== null && (
              <div className="p-4 bg-slate-100 rounded-lg">
                <div className="text-sm text-slate-600 mb-1">{t('dailyProduction')}</div>
                <div className="text-2xl font-mono font-bold text-blue-600">
                  {results.daily.toFixed(2)} {t('unitMday')}
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
