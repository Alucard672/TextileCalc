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
import { calculateFabricYardage, calculateFabricYardageFromYards } from '@/utils/calculations';
import { useState } from 'react';

type FormData = {
  length: number;
  width: number;
  unitSystem: 'metric' | 'imperial';
};

export function FabricYardage() {
  const t = useTranslations('tools.fabricYardage');
  const commonT = useTranslations('common');
  const errorsT = useTranslations('common.errors');
  const [yardage, setYardage] = useState<number | null>(null);
  const [unitSystem, setUnitSystem] = useState<'metric' | 'imperial'>('metric');
  
  const schema = z.object({
    length: z.number().min(0.01, errorsT('mustBeGreaterThan0')),
    width: z.number().min(0.01, errorsT('mustBeGreaterThan0')),
    unitSystem: z.enum(['metric', 'imperial']),
  });
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      unitSystem: 'metric',
    },
  });

  const onSubmit = (data: FormData) => {
    let result: number;
    if (data.unitSystem === 'metric') {
      result = calculateFabricYardage(data.length, data.width);
    } else {
      result = calculateFabricYardageFromYards(data.length, data.width);
    }
    setYardage(result);
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
            <Label htmlFor="unitSystem">{t('unitSystem')}</Label>
            <Select
              value={unitSystem}
              onValueChange={(value: 'metric' | 'imperial') => {
                setUnitSystem(value);
                setValue('unitSystem', value);
              }}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="metric">{t('metric')}</SelectItem>
                <SelectItem value="imperial">{t('imperial')}</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="length">
                {unitSystem === 'metric' ? t('lengthMeters') : t('lengthYards')}
              </Label>
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
              <Label htmlFor="width">
                {unitSystem === 'metric' ? t('widthCm') : t('widthInches')}
              </Label>
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
          </div>
          <Button type="submit" className="w-full">
            {commonT('calculate')}
          </Button>
        </form>
        {yardage !== null && (
          <div className="mt-6 p-4 bg-slate-100 rounded-lg">
            <div className="text-sm text-slate-600 mb-1">{t('yardage')}</div>
            <div className="text-2xl font-mono font-bold text-blue-600">
              {yardage.toFixed(4)} {t('unitYd2')}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
