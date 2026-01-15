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
import { calculateResultantCount } from '@/utils/calculations';
import { Plus, X } from 'lucide-react';

type YarnData = {
  count: number;
  plies: number;
};

export function ResultantCount() {
  const t = useTranslations('tools.resultantCount');
  const errorsT = useTranslations('common.errors');
  
  // Create schema with translated error messages
  const yarnSchema = z.object({
    count: z.number().min(0.01, errorsT('mustBeGreaterThan0')),
    plies: z.number().int().min(1, errorsT('mustBeAtLeast1')),
  });
  const [yarns, setYarns] = useState<YarnData[]>([{ count: 0, plies: 1 }]);
  const [resultantCount, setResultantCount] = useState<number | null>(null);

  const addYarn = () => {
    setYarns([...yarns, { count: 0, plies: 1 }]);
  };

  const removeYarn = (index: number) => {
    setYarns(yarns.filter((_, i) => i !== index));
  };

  const updateYarn = (index: number, field: keyof YarnData, value: number) => {
    const updated = [...yarns];
    updated[index] = { ...updated[index], [field]: value };
    setYarns(updated);
    calculate(updated);
  };

  const calculate = (yarnList: YarnData[] = yarns) => {
    const validYarns = yarnList.filter((y) => y.count > 0 && y.plies > 0);
    if (validYarns.length === 0) {
      setResultantCount(null);
      return;
    }

    const counts = validYarns.map((y) => y.count);
    const plies = validYarns.map((y) => y.plies);
    const result = calculateResultantCount(counts, plies);
    setResultantCount(result);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>{t('title')}</CardTitle>
        <CardDescription>{t('description')}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {yarns.map((yarn, index) => (
          <div key={index} className="flex gap-4 items-end">
            <div className="flex-1 space-y-2">
              <Label>{t('yarnCount')} {index + 1}</Label>
              <Input
                type="number"
                step="0.01"
                value={yarn.count || ''}
                onChange={(e) => updateYarn(index, 'count', parseFloat(e.target.value) || 0)}
                placeholder="0.00"
              />
            </div>
            <div className="flex-1 space-y-2">
              <Label>{t('numberOfPlies')}</Label>
              <Input
                type="number"
                step="1"
                value={yarn.plies || ''}
                onChange={(e) => updateYarn(index, 'plies', parseInt(e.target.value) || 1)}
                placeholder="1"
              />
            </div>
            {yarns.length > 1 && (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => removeYarn(index)}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        ))}
        <Button type="button" variant="outline" onClick={addYarn} className="w-full">
          <Plus className="h-4 w-4 mr-2" />
          {t('addYarn')}
        </Button>
        {resultantCount !== null && (
          <div className="mt-6 p-4 bg-slate-100 rounded-lg">
            <div className="text-sm text-slate-600 mb-1">{t('resultantCount')}</div>
            <div className="text-2xl font-mono font-bold text-blue-600">
              {resultantCount.toFixed(2)}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
