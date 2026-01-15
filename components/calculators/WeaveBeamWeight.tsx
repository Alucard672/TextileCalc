'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useTranslations } from 'next-intl';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { calculateWeaveBeamWeight } from '@/utils/calculations';
import { useState } from 'react';

type FormData = {
  length: number;
  ends: number;
  yarnCountTex: number;
};

export function WeaveBeamWeight() {
  const t = useTranslations('tools.weaveBeamWeight');
  const commonT = useTranslations('common');
  const errorsT = useTranslations('common.errors');
  
  // Create schema with translated error messages
  const schema = z.object({
    length: z.number().min(0.01, errorsT('mustBeGreaterThan0')),
    ends: z.number().int().min(1, errorsT('mustBeAtLeast1')),
    yarnCountTex: z.number().min(0.01, errorsT('mustBeGreaterThan0')),
  });
  const [weight, setWeight] = useState<number | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    const result = calculateWeaveBeamWeight(data.length, data.ends, data.yarnCountTex);
    setWeight(result);
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
              <Label htmlFor="ends">{t('ends')}</Label>
              <Input
                id="ends"
                type="number"
                step="1"
                {...register('ends', { valueAsNumber: true })}
                placeholder="0"
              />
              {errors.ends && (
                <p className="text-sm text-red-500">{errors.ends.message}</p>
              )}
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="yarnCountTex">{t('yarnCountTex')}</Label>
              <Input
                id="yarnCountTex"
                type="number"
                step="0.01"
                {...register('yarnCountTex', { valueAsNumber: true })}
                placeholder="0.00"
              />
              {errors.yarnCountTex && (
                <p className="text-sm text-red-500">{errors.yarnCountTex.message}</p>
              )}
            </div>
          </div>
          <Button type="submit" className="w-full">{commonT('calculate')}</Button>
        </form>
        {weight !== null && (
          <div className="mt-6 p-4 bg-slate-100 rounded-lg">
            <div className="text-sm text-slate-600 mb-1">{t('weight')}</div>
            <div className="text-2xl font-mono font-bold text-blue-600">
              {weight.toFixed(2)} {t('unitKg')}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
