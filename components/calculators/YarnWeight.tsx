'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useTranslations } from 'next-intl';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { calculateYarnWeight, calculateYarnWeightFromTex } from '@/utils/calculations';
import { useState } from 'react';

type FormData = {
  length: number;
  yarnCount: number;
  countSystem: 'ne' | 'tex';
};

export function YarnWeight() {
  const t = useTranslations('tools.yarnWeight');
  const commonT = useTranslations('common');
  const errorsT = useTranslations('common.errors');
  const [weight, setWeight] = useState<number | null>(null);
  const [countSystem, setCountSystem] = useState<'ne' | 'tex'>('ne');
  
  const schema = z.object({
    length: z.number().min(0.01, errorsT('mustBeGreaterThan0')),
    yarnCount: z.number().min(0.01, errorsT('mustBeGreaterThan0')),
    countSystem: z.enum(['ne', 'tex']),
  });
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      countSystem: 'ne',
    },
  });

  const onSubmit = (data: FormData) => {
    let result: number;
    if (data.countSystem === 'ne') {
      result = calculateYarnWeight(data.length, data.yarnCount);
    } else {
      result = calculateYarnWeightFromTex(data.length, data.yarnCount);
    }
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
          <div className="space-y-2">
            <Label htmlFor="countSystem">{t('countSystem')}</Label>
            <Select
              value={countSystem}
              onValueChange={(value: 'ne' | 'tex') => {
                setCountSystem(value);
                setValue('countSystem', value);
              }}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ne">Ne (English Count)</SelectItem>
                <SelectItem value="tex">Tex</SelectItem>
              </SelectContent>
            </Select>
          </div>
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
              <Label htmlFor="yarnCount">{t('yarnCount')}</Label>
              <Input
                id="yarnCount"
                type="number"
                step="0.01"
                {...register('yarnCount', { valueAsNumber: true })}
                placeholder="0.00"
              />
              {errors.yarnCount && (
                <p className="text-sm text-red-500">{errors.yarnCount.message}</p>
              )}
            </div>
          </div>
          <Button type="submit" className="w-full">
            {commonT('calculate')}
          </Button>
        </form>
        {weight !== null && (
          <div className="mt-6 p-4 bg-slate-100 rounded-lg">
            <div className="text-sm text-slate-600 mb-1">{t('weight')}</div>
            <div className="text-2xl font-mono font-bold text-blue-600">
              {weight.toFixed(4)} {t('unitKg')}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
