'use client';

import { useState } from 'react';
import { Select } from '@/components/ui/select';

const PERIOD_OPTIONS = [
  { value: '1', label: "Aujourd'hui" },
  { value: '2', label: '7 derniers jours' },
  { value: '3', label: '30 derniers jours' },
  { value: '4', label: 'Cette année' },
];

export default function StatisticsCard() {
  const [period, setPeriod] = useState('3');

  return (
    <div className="min-w-0 bg-white rounded-[40px] py-6 px-8.5">
      <div className="flex items-center justify-between">
        <p className="font-sana-sans-bold text-[28px] text-[#444444]">Statistiques</p>
        <div className="min-w-[110px]">
          <Select
            name="statistiques"
            id="statistiques"
            value={period}
            options={PERIOD_OPTIONS}
            onChange={setPeriod}
          />
        </div>
      </div>
    </div>
  );
}
