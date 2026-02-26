'use client';

import { useMemo } from 'react';
import { Label, Legend, Pie, PieChart } from 'recharts';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart';

const chartData = [
  { name: 'Paiement course', value: 2364, fill: 'var(--chart-2)' },
  { name: 'Rendu monnaie', value: 7000, fill: 'var(--chart-1)' },
];

const chartConfig = {
  rendu: { label: 'Rendu monnaie', color: 'var(--chart-1)' },
  paiement: { label: 'Paiement course', color: 'var(--chart-2)' },
} satisfies ChartConfig;

export default function StatisticsChart() {
  const total = useMemo(
    () => chartData.reduce((acc, curr) => acc + curr.value, 0),
    []
  );

  return (
    <div className="w-full">
      <ChartContainer config={chartConfig} className="w-full h-[360px]">
        <PieChart>
          <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            innerRadius={80}
            outerRadius={115}
            strokeWidth={4}
            stroke="transparent"
          >
            <Label
              content={({ viewBox }) => {
                if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                  const cx = viewBox.cx as number;
                  const cy = viewBox.cy as number;
                  const lineHeight = 18;
                  return (
                    <text x={cx} textAnchor="middle" dominantBaseline="middle">
                      <tspan
                        x={cx}
                        y={cy - lineHeight / 2}
                        className="fill-[#444444] font-sana-sans-heavy text-[36px]"
                      >
                        {total.toLocaleString('fr-FR')}
                      </tspan>
                      <tspan
                        x={cx}
                        y={cy + lineHeight / 2}
                        className="text-sm font-sana-sans-medium mt-2"
                      >
                        Transactions
                      </tspan>
                    </text>
                  );
                }
                return null;
              }}
            />
          </Pie>
          <Legend
            verticalAlign="bottom"
            height={34}
            formatter={(value) => <span className="font-sana-sans-bold text-base text-[#444444]">{value}</span>}
            iconType="circle"
            iconSize={11}
            wrapperStyle={{ paddingTop: '10px' }}
            itemSorter={(item) => {
              const order: Record<string, number> = { 'Rendu monnaie': 0, 'Paiement course': 1 };
              return order[String(item.value)] ?? 2;
            }}
          />
        </PieChart>
      </ChartContainer>
    </div>
  );
}
