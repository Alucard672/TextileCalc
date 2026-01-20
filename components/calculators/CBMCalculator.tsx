'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useTranslations } from 'next-intl';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { calculateCBM, suggestContainer } from '@/utils/calculations';
import { useState } from 'react';

type FormData = {
  length: number;
  width: number;
  height: number;
  quantity: number;
};

export function CBMCalculator() {
  const t = useTranslations('tools.cbmCalculator');
  const commonT = useTranslations('common');
  const errorsT = useTranslations('common.errors');
  const [results, setResults] = useState<{ cbm: number; containerKey: 'container20ft' | 'container40ft' | 'container40hc' | 'containerMultiple' | '' } | null>(null);
  
  // Create schema with translated error messages
  const schema = z.object({
    length: z.number().min(0.01, errorsT('mustBeGreaterThan0')),
    width: z.number().min(0.01, errorsT('mustBeGreaterThan0')),
    height: z.number().min(0.01, errorsT('mustBeGreaterThan0')),
    quantity: z.number().int().min(1, errorsT('mustBeAtLeast1')),
  });
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    const cbm = calculateCBM(data.length, data.width, data.height, data.quantity);
    const containerKey = suggestContainer(cbm);
    setResults({ cbm, containerKey });
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
              <Label htmlFor="length">{t('length')}</Label>
              <Input
                id="length"
                type="number"
                step="0.01"
                {...register('length', { valueAsNumber: true })}
                placeholder="0.00"
              />
              {errors.length && (
                <p className="text-sm text-red-500">{errors.length.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="width">{t('width')}</Label>
              <Input
                id="width"
                type="number"
                step="0.01"
                {...register('width', { valueAsNumber: true })}
                placeholder="0.00"
              />
              {errors.width && (
                <p className="text-sm text-red-500">{errors.width.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="height">{t('height')}</Label>
              <Input
                id="height"
                type="number"
                step="0.01"
                {...register('height', { valueAsNumber: true })}
                placeholder="0.00"
              />
              {errors.height && (
                <p className="text-sm text-red-500">{errors.height.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="quantity">{t('quantity')}</Label>
              <Input
                id="quantity"
                type="number"
                step="1"
                {...register('quantity', { valueAsNumber: true })}
                placeholder="0"
              />
              {errors.quantity && (
                <p className="text-sm text-red-500">{errors.quantity.message}</p>
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
              <div className="text-sm text-slate-600 mb-1">{t('totalCBM')}</div>
              <div className="text-2xl font-mono font-bold text-blue-600">
                {results.cbm.toFixed(4)} {t('unitM3')}
              </div>
            </div>
            <div className="p-4 bg-slate-100 rounded-lg">
              <div className="text-sm text-slate-600 mb-1">{t('containerSuggestion')}</div>
              <div className="text-xl font-semibold text-blue-600">
                {results.containerKey ? t(results.containerKey) : ''}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
