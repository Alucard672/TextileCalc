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
  convertYardsToMeters,
  convertMetersToYards,
  convertPoundsToKilograms,
  convertKilogramsToPounds,
} from '@/utils/calculations';

const schema = z.object({
  yards: z.number().min(0).optional(),
  meters: z.number().min(0).optional(),
  pounds: z.number().min(0).optional(),
  kilograms: z.number().min(0).optional(),
});

type FormData = z.infer<typeof schema>;

export function UnitConverter() {
  const t = useTranslations('tools.unitConverter');
  const lastEditedRef = useRef<keyof FormData | null>(null);
  const {
    register,
    watch,
    setValue,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      yards: undefined,
      meters: undefined,
      pounds: undefined,
      kilograms: undefined,
    },
  });

  const yards = watch('yards');
  const meters = watch('meters');
  const pounds = watch('pounds');
  const kilograms = watch('kilograms');

  // Auto-update meters when yards changes
  useEffect(() => {
    if (lastEditedRef.current === 'yards' && yards !== undefined && yards >= 0) {
      setValue('meters', Number(convertYardsToMeters(yards).toFixed(4)), { shouldValidate: false, shouldDirty: false });
    }
  }, [yards, setValue]);

  // Auto-update yards when meters changes
  useEffect(() => {
    if (lastEditedRef.current === 'meters' && meters !== undefined && meters >= 0) {
      setValue('yards', Number(convertMetersToYards(meters).toFixed(4)), { shouldValidate: false, shouldDirty: false });
    }
  }, [meters, setValue]);

  // Auto-update kilograms when pounds changes
  useEffect(() => {
    if (lastEditedRef.current === 'pounds' && pounds !== undefined && pounds >= 0) {
      setValue('kilograms', Number(convertPoundsToKilograms(pounds).toFixed(4)), { shouldValidate: false, shouldDirty: false });
    }
  }, [pounds, setValue]);

  // Auto-update pounds when kilograms changes
  useEffect(() => {
    if (lastEditedRef.current === 'kilograms' && kilograms !== undefined && kilograms >= 0) {
      setValue('pounds', Number(convertKilogramsToPounds(kilograms).toFixed(4)), { shouldValidate: false, shouldDirty: false });
    }
  }, [kilograms, setValue]);

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>{t('title')}</CardTitle>
        <CardDescription>{t('description')}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-4">{t('length')}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="yards">{t('yards')}</Label>
              <Input
                id="yards"
                type="number"
                step="0.01"
                {...register('yards', {
                  valueAsNumber: true,
                  onChange: () => { lastEditedRef.current = 'yards'; }
                })}
                placeholder="0.00"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="meters">{t('meters')}</Label>
              <Input
                id="meters"
                type="number"
                step="0.01"
                {...register('meters', {
                  valueAsNumber: true,
                  onChange: () => { lastEditedRef.current = 'meters'; }
                })}
                placeholder="0.00"
              />
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">{t('weight')}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="pounds">{t('pounds')}</Label>
              <Input
                id="pounds"
                type="number"
                step="0.01"
                {...register('pounds', {
                  valueAsNumber: true,
                  onChange: () => { lastEditedRef.current = 'pounds'; }
                })}
                placeholder="0.00"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="kilograms">{t('kilograms')}</Label>
              <Input
                id="kilograms"
                type="number"
                step="0.01"
                {...register('kilograms', {
                  valueAsNumber: true,
                  onChange: () => { lastEditedRef.current = 'kilograms'; }
                })}
                placeholder="0.00"
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
