'use client';

import { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useTranslations } from 'next-intl';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  convertTPIToTPM,
  convertTPMToTPI,
  convertNeToTex,
  calculateTwistMultiplier,
} from '@/utils/calculations';

const schema = z.object({
  tpi: z.number().min(0).optional(),
  tpm: z.number().min(0).optional(),
  yarnCount: z.number().min(0).optional(),
});

type FormData = z.infer<typeof schema>;

export function TwistCalculator() {
  const t = useTranslations('tools.twistCalculator');
  const lastEditedRef = useRef<keyof FormData | null>(null);
  const {
    register,
    watch,
    setValue,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      tpi: undefined,
      tpm: undefined,
      yarnCount: undefined,
    },
  });

  const tpi = watch('tpi');
  const tpm = watch('tpm');
  const yarnCount = watch('yarnCount');

  // Auto-update TPM when TPI changes
  useEffect(() => {
    if (lastEditedRef.current === 'tpi' && tpi !== undefined && tpi > 0) {
      setValue('tpm', Number(convertTPIToTPM(tpi).toFixed(2)), { shouldValidate: false, shouldDirty: false });
    }
  }, [tpi, setValue]);

  // Auto-update TPI when TPM changes
  useEffect(() => {
    if (lastEditedRef.current === 'tpm' && tpm !== undefined && tpm > 0) {
      setValue('tpi', Number(convertTPMToTPI(tpm).toFixed(2)), { shouldValidate: false, shouldDirty: false });
    }
  }, [tpm, setValue]);

  const twistMultiplier = yarnCount && tpi && yarnCount > 0 && tpi > 0
    ? calculateTwistMultiplier(tpi, yarnCount)
    : null;

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>{t('title')}</CardTitle>
        <CardDescription>{t('description')}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="tpi">{t('tpi')}</Label>
            <Input
              id="tpi"
              type="number"
              step="0.01"
              {...register('tpi', {
                valueAsNumber: true,
                onChange: () => { lastEditedRef.current = 'tpi'; }
              })}
              placeholder="0.00"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="tpm">{t('tpm')}</Label>
            <Input
              id="tpm"
              type="number"
              step="0.01"
              {...register('tpm', {
                valueAsNumber: true,
                onChange: () => { lastEditedRef.current = 'tpm'; }
              })}
              placeholder="0.00"
            />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="yarnCount">{t('yarnCount')}</Label>
            <Input
              id="yarnCount"
              type="number"
              step="0.01"
              {...register('yarnCount', { valueAsNumber: true })}
              placeholder="0.00"
            />
          </div>
        </div>
        {twistMultiplier !== null && (
          <div className="mt-6 p-4 bg-slate-100 rounded-lg">
            <div className="text-sm text-slate-600 mb-1">{t('twistMultiplier')}</div>
            <div className="text-2xl font-mono font-bold text-blue-600">
              {twistMultiplier.toFixed(2)}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
