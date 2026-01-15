'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useTranslations } from 'next-intl';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { calculateGSM, convertGSMToOzYd2 } from '@/utils/calculations';
import { useState } from 'react';

type FormData = {
  warpCount: number;
  weftCount: number;
  epi: number;
  ppi: number;
};

export function GSMCalculator() {
  const t = useTranslations('tools.gsmCalculator');
  const commonT = useTranslations('common');
  const errorsT = useTranslations('common.errors');
  const [results, setResults] = useState<{ gsm: number; ozYd2: number } | null>(null);
  
  // Create schema with translated error messages
  const schema = z.object({
    warpCount: z.number().min(0.01, errorsT('mustBeGreaterThan0')),
    weftCount: z.number().min(0.01, errorsT('mustBeGreaterThan0')),
    epi: z.number().min(0.01, errorsT('mustBeGreaterThan0')),
    ppi: z.number().min(0.01, errorsT('mustBeGreaterThan0')),
  });
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    const gsm = calculateGSM(data.warpCount, data.weftCount, data.epi, data.ppi);
    const ozYd2 = convertGSMToOzYd2(gsm);
    setResults({ gsm, ozYd2 });
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
          </div>
          <Button type="submit" className="w-full">
            {commonT('calculate')}
          </Button>
        </form>
        {results && (
          <div className="mt-6 space-y-3">
            <div className="p-4 bg-slate-100 rounded-lg">
              <div className="text-sm text-slate-600 mb-1">{t('gsm')}</div>
              <div className="text-2xl font-mono font-bold text-blue-600">
                {results.gsm.toFixed(2)}
              </div>
            </div>
            <div className="p-4 bg-slate-100 rounded-lg">
              <div className="text-sm text-slate-600 mb-1">{t('ozYd2')}</div>
              <div className="text-2xl font-mono font-bold text-blue-600">
                {results.ozYd2.toFixed(2)}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
