'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useTranslations } from 'next-intl';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { calculateShrinkage } from '@/utils/calculations';
import { useState } from 'react';

type FormData = {
  originalLength: number;
  afterWashLength: number;
};

export function FabricShrinkage() {
  const t = useTranslations('tools.fabricShrinkage');
  const commonT = useTranslations('common');
  const errorsT = useTranslations('common.errors');
  
  const schema = z.object({
    originalLength: z.number().min(0.01, errorsT('mustBeGreaterThan0')),
    afterWashLength: z.number().min(0, errorsT('mustBe0OrGreater')),
  });
  
  const [shrinkage, setShrinkage] = useState<number | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    const result = calculateShrinkage(data.originalLength, data.afterWashLength);
    setShrinkage(result);
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
              <Label htmlFor="originalLength">{t('originalLength')}</Label>
              <Input
                id="originalLength"
                type="number"
                step="0.01"
                {...register('originalLength', { valueAsNumber: true })}
                placeholder="0.00"
              />
              {errors.originalLength && (
                <p className="text-sm text-red-500">{errors.originalLength.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="afterWashLength">{t('afterWashLength')}</Label>
              <Input
                id="afterWashLength"
                type="number"
                step="0.01"
                {...register('afterWashLength', { valueAsNumber: true })}
                placeholder="0.00"
              />
              {errors.afterWashLength && (
                <p className="text-sm text-red-500">{errors.afterWashLength.message}</p>
              )}
            </div>
          </div>
          <Button type="submit" className="w-full">
            {commonT('calculate')}
          </Button>
        </form>
        {shrinkage !== null && (
          <div className="mt-6 p-4 bg-slate-100 rounded-lg">
            <div className="text-sm text-slate-600 mb-1">{t('shrinkage')}</div>
            <div className="text-2xl font-mono font-bold text-blue-600">
              {shrinkage.toFixed(2)}%
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
