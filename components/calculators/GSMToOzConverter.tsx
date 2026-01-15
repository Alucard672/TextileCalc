'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { convertGSMToOzYd2, convertOzYd2ToGSM } from '@/utils/calculations';

export function GSMToOzConverter() {
  const t = useTranslations('tools.gsmToOzConverter');
  const [gsm, setGsm] = useState<string>('');
  const [ozYd2, setOzYd2] = useState<string>('');

  const handleGsmChange = (value: string) => {
    setGsm(value);
    if (value && !isNaN(parseFloat(value)) && parseFloat(value) > 0) {
      const result = convertGSMToOzYd2(parseFloat(value));
      setOzYd2(result.toFixed(4));
    } else {
      setOzYd2('');
    }
  };

  const handleOzYd2Change = (value: string) => {
    setOzYd2(value);
    if (value && !isNaN(parseFloat(value)) && parseFloat(value) > 0) {
      const result = convertOzYd2ToGSM(parseFloat(value));
      setGsm(result.toFixed(2));
    } else {
      setGsm('');
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>{t('title')}</CardTitle>
        <CardDescription>{t('description')}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="gsm">{t('gsm')}</Label>
            <Input
              id="gsm"
              type="number"
              step="0.01"
              value={gsm}
              onChange={(e) => handleGsmChange(e.target.value)}
              placeholder="0.00"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="ozYd2">{t('ozYd2')}</Label>
            <Input
              id="ozYd2"
              type="number"
              step="0.0001"
              value={ozYd2}
              onChange={(e) => handleOzYd2Change(e.target.value)}
              placeholder="0.0000"
            />
          </div>
          <p className="text-sm text-slate-500">{t('hint')}</p>
        </div>
      </CardContent>
    </Card>
  );
}
