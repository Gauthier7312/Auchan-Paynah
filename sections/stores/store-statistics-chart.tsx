'use client'

import { Pie, PieChart } from 'recharts'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart'

const DEFAULT_CHART_DATA = [
  { name: 'Paiement course', value: 2364, fill: 'var(--chart-2)' },
  { name: 'Rendu monnaie', value: 7000, fill: 'var(--chart-1)' },
] as const

const DEFAULT_CHART_CONFIG = {
  rendu: { label: 'Rendu monnaie', color: 'var(--chart-1)' },
  paiement: { label: 'Paiement course', color: 'var(--chart-2)' },
} satisfies ChartConfig

const LEGEND_ORDER: Record<string, number> = { 'Rendu monnaie': 0, 'Paiement course': 1 }

type StoreStatisticsChartProps = {
  data?: readonly { name: string; value: number; fill: string }[]
  config?: ChartConfig
  size?: number
}

export function StoreStatisticsChart({
  data = DEFAULT_CHART_DATA,
  config = DEFAULT_CHART_CONFIG,
  size = 110,
}: StoreStatisticsChartProps) {
  const legendItems = [...data].sort(
    (a, b) => (LEGEND_ORDER[a.name] ?? 99) - (LEGEND_ORDER[b.name] ?? 99)
  )

  return (
    <div className="flex items-center gap-4">
      <ChartContainer
        config={config}
        className="shrink-0"
        style={{ width: size, height: size }}
      >
        <PieChart>
          <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
          <Pie
            data={[...data]}
            dataKey="value"
            nameKey="name"
            innerRadius={size * 0.35}
            outerRadius={size * 0.48}
            strokeWidth={2}
            stroke="transparent"
          />
        </PieChart>
      </ChartContainer>

      <ul className="flex flex-col gap-4 shrink-0" role="list" aria-label="Légende">
        {legendItems.map((item) => (
          <li key={item.name} className="flex items-center gap-2">
            <span
              className="h-2.5 w-2.5 rounded-full shrink-0"
              style={{ backgroundColor: item.fill }}
              aria-hidden
            />
            <span className="font-sana-sans-bold text-sm text-[#444444]">{item.name}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
