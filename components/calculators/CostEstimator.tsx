'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useTranslations } from 'next-intl';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { calculateTotalCost } from '@/utils/calculations';
import { useState } from 'react';

type FormData = {
  yarnPrice: number;
  yarnConsumption: number;
  laborCost: number;
  overhead: number;
  profitMargin: number;
};

export function CostEstimator() {
  const t = useTranslations('tools.costEstimator');
  const commonT = useTranslations('common');
  const errorsT = useTranslations('common.errors');
  
  // Create schema with translated error messages
  const schema = z.object({
    yarnPrice: z.number().min(0, errorsT('mustBe0OrGreater')),
    yarnConsumption: z.number().min(0, errorsT('mustBe0OrGreater')),
    laborCost: z.number().min(0, errorsT('mustBe0OrGreater')),
    overhead: z.number().min(0, errorsT('mustBe0OrGreater')),
    profitMargin: z.number().min(0, errorsT('mustBe0OrGreater')),
  });
  const [results, setResults] = useState<{
    materialCost: number;
    totalCost: number;
    profit: number;
    sellingPrice: number;
  } | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    const materialCost = data.yarnPrice * data.yarnConsumption;
    const costBeforeProfit = materialCost + data.laborCost + data.overhead;
    const profit = (costBeforeProfit * data.profitMargin) / 100;
    const sellingPrice = costBeforeProfit + profit;

    setResults({
      materialCost,
      totalCost: costBeforeProfit,
      profit,
      sellingPrice,
    });
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
              <Label htmlFor="yarnPrice">{t('yarnPrice')}</Label>
              <Input
                id="yarnPrice"
                type="number"
                step="0.01"
                {...register('yarnPrice', { valueAsNumber: true })}
                placeholder="0.00"
              />
              {errors.yarnPrice && (
                <p className="text-sm text-red-500">{errors.yarnPrice.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="yarnConsumption">{t('yarnConsumption')}</Label>
              <Input
                id="yarnConsumption"
                type="number"
                step="0.01"
                {...register('yarnConsumption', { valueAsNumber: true })}
                placeholder="0.00"
              />
              {errors.yarnConsumption && (
                <p className="text-sm text-red-500">{errors.yarnConsumption.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="laborCost">{t('laborCost')}</Label>
              <Input
                id="laborCost"
                type="number"
                step="0.01"
                {...register('laborCost', { valueAsNumber: true })}
                placeholder="0.00"
              />
              {errors.laborCost && (
                <p className="text-sm text-red-500">{errors.laborCost.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="overhead">{t('overhead')}</Label>
              <Input
                id="overhead"
                type="number"
                step="0.01"
                {...register('overhead', { valueAsNumber: true })}
                placeholder="0.00"
              />
              {errors.overhead && (
                <p className="text-sm text-red-500">{errors.overhead.message}</p>
              )}
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="profitMargin">{t('profitMargin')}</Label>
              <Input
                id="profitMargin"
                type="number"
                step="0.01"
                {...register('profitMargin', { valueAsNumber: true })}
                placeholder="0.00"
              />
              {errors.profitMargin && (
                <p className="text-sm text-red-500">{errors.profitMargin.message}</p>
              )}
            </div>
          </div>
          <Button type="submit" className="w-full">{commonT('calculate')}</Button>
        </form>
        {results && (
          <div className="mt-6 space-y-3">
            <div className="p-4 bg-slate-100 rounded-lg">
              <div className="text-sm text-slate-600 mb-1">{t('materialCost')}</div>
              <div className="text-2xl font-mono font-bold text-blue-600">
                {t('currency')}{results.materialCost.toFixed(2)}
              </div>
            </div>
            <div className="p-4 bg-slate-100 rounded-lg">
              <div className="text-sm text-slate-600 mb-1">{t('totalCost')}</div>
              <div className="text-2xl font-mono font-bold text-blue-600">
                {t('currency')}{results.totalCost.toFixed(2)}
              </div>
            </div>
            <div className="p-4 bg-slate-100 rounded-lg">
              <div className="text-sm text-slate-600 mb-1">{t('profit')}</div>
              <div className="text-2xl font-mono font-bold text-blue-600">
                {t('currency')}{results.profit.toFixed(2)}
              </div>
            </div>
            <div className="p-4 bg-slate-100 rounded-lg">
              <div className="text-sm text-slate-600 mb-1">{t('sellingPrice')}</div>
              <div className="text-2xl font-mono font-bold text-blue-600">
                {t('currency')}{results.sellingPrice.toFixed(2)}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
