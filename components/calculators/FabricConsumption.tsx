'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useTranslations } from 'next-intl';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { calculateFabricConsumption, calculateKgPerDoz } from '@/utils/calculations';
import { useState } from 'react';

type FormData = {
  length: number;
  chest: number;
  sleeve: number;
  gsm: number;
  wastage: number;
};

export function FabricConsumption() {
  const t = useTranslations('tools.fabricConsumption');
  const commonT = useTranslations('common');
  const errorsT = useTranslations('common.errors');
  
  // Create schema with translated error messages
  const schema = z.object({
    length: z.number().min(0.01, errorsT('mustBeGreaterThan0')),
    chest: z.number().min(0.01, errorsT('mustBeGreaterThan0')),
    sleeve: z.number().min(0, errorsT('mustBe0OrGreater')),
    gsm: z.number().min(0.01, errorsT('mustBeGreaterThan0')),
    wastage: z.number().min(0, errorsT('mustBe0OrGreater')),
  });
  const [results, setResults] = useState<{ perPiece: number; perDoz: number } | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    const perPiece = calculateFabricConsumption(
      data.length,
      data.chest,
      data.sleeve,
      data.gsm,
      data.wastage
    );
    const perDoz = calculateKgPerDoz(perPiece);
    setResults({ perPiece, perDoz });
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
              <Label htmlFor="chest">{t('chest')}</Label>
              <Input
                id="chest"
                type="number"
                step="0.01"
                {...register('chest', { valueAsNumber: true })}
                placeholder="0.00"
              />
              {errors.chest && (
                <p className="text-sm text-red-500">{errors.chest.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="sleeve">{t('sleeve')}</Label>
              <Input
                id="sleeve"
                type="number"
                step="0.01"
                {...register('sleeve', { valueAsNumber: true })}
                placeholder="0.00"
              />
              {errors.sleeve && (
                <p className="text-sm text-red-500">{errors.sleeve.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="gsm">{t('gsm')}</Label>
              <Input
                id="gsm"
                type="number"
                step="0.01"
                {...register('gsm', { valueAsNumber: true })}
                placeholder="0.00"
              />
              {errors.gsm && (
                <p className="text-sm text-red-500">{errors.gsm.message}</p>
              )}
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="wastage">{t('wastage')}</Label>
              <Input
                id="wastage"
                type="number"
                step="0.01"
                {...register('wastage', { valueAsNumber: true })}
                placeholder="0.00"
              />
              {errors.wastage && (
                <p className="text-sm text-red-500">{errors.wastage.message}</p>
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
              <div className="text-sm text-slate-600 mb-1">{t('consumptionPerPiece')}</div>
              <div className="text-2xl font-mono font-bold text-blue-600">
                {results.perPiece.toFixed(4)} {t('unitKg')}
              </div>
            </div>
            <div className="p-4 bg-slate-100 rounded-lg">
              <div className="text-sm text-slate-600 mb-1">{t('kgPerDoz')}</div>
              <div className="text-2xl font-mono font-bold text-blue-600">
                {results.perDoz.toFixed(4)} {t('unitKg')}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
