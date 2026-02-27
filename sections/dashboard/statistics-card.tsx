'use client';

import { useState } from 'react';
import { Select } from '@/components/ui/select';
import StatisticsChart from '@/sections/dashboard/statistics-chart';

const PERIOD_OPTIONS = [
  { value: '1', label: "Aujourd'hui" },
  { value: '2', label: '7 derniers jours' },
  { value: '3', label: '30 derniers jours' },
  { value: '4', label: 'Cette année' },
];

export default function StatisticsCard() {
  const [period, setPeriod] = useState('3');

  return (
    <div className="min-w-0 bg-white rounded-[40px] py-4 px-5 sm:py-6 sm:px-8.5 flex flex-col justify-between h-full">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <p className="font-sana-sans-bold text-xl sm:text-[28px] text-[#444444]">Statistiques</p>
        <div className="min-w-0 sm:min-w-[110px]">
          <Select
            name="statistiques"
            id="statistiques"
            value={period}
            options={PERIOD_OPTIONS}
            onChange={setPeriod}
          />
        </div>
      </div>

      <StatisticsChart />
    </div>
  );
}
