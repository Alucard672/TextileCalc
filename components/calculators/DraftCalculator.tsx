'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useTranslations } from 'next-intl';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { calculateDraft, calculateDraftByDiameter } from '@/utils/calculations';

type SpeedFormData = {
  inputSpeed: number;
  outputSpeed: number;
};

type DiameterFormData = {
  frontDiameter: number;
  backDiameter: number;
};

export function DraftCalculator() {
  const t = useTranslations('tools.draftCalculator');
  const commonT = useTranslations('common');
  const errorsT = useTranslations('common.errors');
  const [method, setMethod] = useState<'speed' | 'diameter'>('speed');
  const [draft, setDraft] = useState<number | null>(null);

  // Create schemas with translated error messages
  const speedSchema = z.object({
    inputSpeed: z.number().min(0.01, errorsT('mustBeGreaterThan0')),
    outputSpeed: z.number().min(0.01, errorsT('mustBeGreaterThan0')),
  });

  const diameterSchema = z.object({
    frontDiameter: z.number().min(0.01, errorsT('mustBeGreaterThan0')),
    backDiameter: z.number().min(0.01, errorsT('mustBeGreaterThan0')),
  });

  const {
    register: registerSpeed,
    handleSubmit: handleSubmitSpeed,
    formState: { errors: speedErrors },
  } = useForm<SpeedFormData>({
    resolver: zodResolver(speedSchema),
  });

  const {
    register: registerDiameter,
    handleSubmit: handleSubmitDiameter,
    formState: { errors: diameterErrors },
  } = useForm<DiameterFormData>({
    resolver: zodResolver(diameterSchema),
  });

  const onSpeedSubmit = (data: SpeedFormData) => {
    const result = calculateDraft(data.inputSpeed, data.outputSpeed);
    setDraft(result);
  };

  const onDiameterSubmit = (data: DiameterFormData) => {
    const result = calculateDraftByDiameter(data.frontDiameter, data.backDiameter);
    setDraft(result);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>{t('title')}</CardTitle>
        <CardDescription>{t('description')}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>{t('method')}</Label>
          <Select value={method} onValueChange={(value) => setMethod(value as 'speed' | 'diameter')}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="speed">{t('speedMethod')}</SelectItem>
              <SelectItem value="diameter">{t('diameterMethod')}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {method === 'speed' ? (
          <form onSubmit={handleSubmitSpeed(onSpeedSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="inputSpeed">{t('inputSpeed')}</Label>
                <Input
                  id="inputSpeed"
                  type="number"
                  step="0.01"
                  {...registerSpeed('inputSpeed', { valueAsNumber: true })}
                  placeholder="0.00"
                />
                {speedErrors.inputSpeed && (
                  <p className="text-sm text-red-500">{speedErrors.inputSpeed.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="outputSpeed">{t('outputSpeed')}</Label>
                <Input
                  id="outputSpeed"
                  type="number"
                  step="0.01"
                  {...registerSpeed('outputSpeed', { valueAsNumber: true })}
                  placeholder="0.00"
                />
                {speedErrors.outputSpeed && (
                  <p className="text-sm text-red-500">{speedErrors.outputSpeed.message}</p>
                )}
              </div>
            </div>
            <Button type="submit" className="w-full">{commonT('calculate')}</Button>
          </form>
        ) : (
          <form onSubmit={handleSubmitDiameter(onDiameterSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="frontDiameter">{t('frontDiameter')}</Label>
                <Input
                  id="frontDiameter"
                  type="number"
                  step="0.01"
                  {...registerDiameter('frontDiameter', { valueAsNumber: true })}
                  placeholder="0.00"
                />
                {diameterErrors.frontDiameter && (
                  <p className="text-sm text-red-500">{diameterErrors.frontDiameter.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="backDiameter">{t('backDiameter')}</Label>
                <Input
                  id="backDiameter"
                  type="number"
                  step="0.01"
                  {...registerDiameter('backDiameter', { valueAsNumber: true })}
                  placeholder="0.00"
                />
                {diameterErrors.backDiameter && (
                  <p className="text-sm text-red-500">{diameterErrors.backDiameter.message}</p>
                )}
              </div>
            </div>
            <Button type="submit" className="w-full">{commonT('calculate')}</Button>
          </form>
        )}

        {draft !== null && (
          <div className="mt-6 p-4 bg-slate-100 rounded-lg">
            <div className="text-sm text-slate-600 mb-1">{t('draft')}</div>
            <div className="text-2xl font-mono font-bold text-blue-600">
              {draft.toFixed(2)}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
