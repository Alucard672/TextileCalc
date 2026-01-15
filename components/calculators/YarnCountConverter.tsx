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
  convertNeToNm,
  convertNeToTex,
  convertNeToDenier,
  convertNmToNe,
  convertTexToNe,
  convertDenierToNe,
} from '@/utils/calculations';

const schema = z.object({
  ne: z.number().min(0).optional(),
  nm: z.number().min(0).optional(),
  tex: z.number().min(0).optional(),
  denier: z.number().min(0).optional(),
});

type FormData = z.infer<typeof schema>;

export function YarnCountConverter() {
  const t = useTranslations('tools.yarnCountConverter');
  const commonT = useTranslations('common');
  const lastEditedRef = useRef<keyof FormData | null>(null);
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      ne: undefined,
      nm: undefined,
      tex: undefined,
      denier: undefined,
    },
  });

  const ne = watch('ne');
  const nm = watch('nm');
  const tex = watch('tex');
  const denier = watch('denier');

  // Auto-update when Ne changes
  useEffect(() => {
    if (lastEditedRef.current === 'ne' && ne !== undefined && ne > 0) {
      setValue('nm', Number(convertNeToNm(ne).toFixed(2)), { shouldValidate: false, shouldDirty: false });
      setValue('tex', Number(convertNeToTex(ne).toFixed(2)), { shouldValidate: false, shouldDirty: false });
      setValue('denier', Number(convertNeToDenier(ne).toFixed(2)), { shouldValidate: false, shouldDirty: false });
    }
  }, [ne, setValue]);

  // Auto-update when Nm changes
  useEffect(() => {
    if (lastEditedRef.current === 'nm' && nm !== undefined && nm > 0) {
      const newNe = convertNmToNe(nm);
      setValue('ne', Number(newNe.toFixed(2)), { shouldValidate: false, shouldDirty: false });
      setValue('tex', Number(convertNeToTex(newNe).toFixed(2)), { shouldValidate: false, shouldDirty: false });
      setValue('denier', Number(convertNeToDenier(newNe).toFixed(2)), { shouldValidate: false, shouldDirty: false });
    }
  }, [nm, setValue]);

  // Auto-update when Tex changes
  useEffect(() => {
    if (lastEditedRef.current === 'tex' && tex !== undefined && tex > 0) {
      const newNe = convertTexToNe(tex);
      setValue('ne', Number(newNe.toFixed(2)), { shouldValidate: false, shouldDirty: false });
      setValue('nm', Number(convertNeToNm(newNe).toFixed(2)), { shouldValidate: false, shouldDirty: false });
      setValue('denier', Number(convertNeToDenier(newNe).toFixed(2)), { shouldValidate: false, shouldDirty: false });
    }
  }, [tex, setValue]);

  // Auto-update when Denier changes
  useEffect(() => {
    if (lastEditedRef.current === 'denier' && denier !== undefined && denier > 0) {
      const newNe = convertDenierToNe(denier);
      setValue('ne', Number(newNe.toFixed(2)), { shouldValidate: false, shouldDirty: false });
      setValue('nm', Number(convertNeToNm(newNe).toFixed(2)), { shouldValidate: false, shouldDirty: false });
      setValue('tex', Number(convertNeToTex(newNe).toFixed(2)), { shouldValidate: false, shouldDirty: false });
    }
  }, [denier, setValue]);

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>{t('title')}</CardTitle>
        <CardDescription>{t('description')}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="ne">{t('ne')}</Label>
            <Input
              id="ne"
              type="number"
              step="0.01"
              {...register('ne', { 
                valueAsNumber: true,
                onChange: () => { lastEditedRef.current = 'ne'; }
              })}
              placeholder="0.00"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="nm">{t('nm')}</Label>
            <Input
              id="nm"
              type="number"
              step="0.01"
              {...register('nm', { 
                valueAsNumber: true,
                onChange: () => { lastEditedRef.current = 'nm'; }
              })}
              placeholder="0.00"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="tex">{t('tex')}</Label>
            <Input
              id="tex"
              type="number"
              step="0.01"
              {...register('tex', { 
                valueAsNumber: true,
                onChange: () => { lastEditedRef.current = 'tex'; }
              })}
              placeholder="0.00"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="denier">{t('denier')}</Label>
            <Input
              id="denier"
              type="number"
              step="0.01"
              {...register('denier', { 
                valueAsNumber: true,
                onChange: () => { lastEditedRef.current = 'denier'; }
              })}
              placeholder="0.00"
            />
          </div>
        </div>
        <p className="text-sm text-slate-500 mt-4">
          {commonT('enterAnyValue')}
        </p>
      </CardContent>
    </Card>
  );
}
