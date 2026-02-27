'use client'

import SvgColor from '@/components/svg-color'
import { Button } from '@/components/ui/button'
import { DateRange, DateRangePicker } from '@/components/ui/date-range-picker'
import { FilterChip } from '@/components/ui/filter-chip'
import { SearchInput } from '@/components/ui/search-input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { cn } from '@/lib/utils'
import { useStoreDetailFilter, type StoreFilterValue } from '@/sections/stores/store-detail-search'
import { useState } from 'react'

export type TransactionRow = {
  id: string
  type_transaction: string
  montant: string
  client: string
  date: string
}

const DATA_HEADER = [
  { label: 'ID Transaction', key: 'id' },
  { label: 'Type de transaction', key: 'type_transaction' },
  { label: 'Montant', key: 'montant' },
  { label: 'Client', key: 'client' },
  { label: 'Date', key: 'date' },
] as const

const DEFAULT_TRANSACTIONS: TransactionRow[] = [
  { id: '10836745693', type_transaction: 'Paiement course', montant: '+220 FCFA', client: '+225 07 08 06 05 04', date: '20/01/2025, 10:20' },
  { id: '10836745694', type_transaction: 'Paiement course', montant: '+220 FCFA', client: '+225 07 08 06 05 04', date: '20/01/2025, 10:20' },
  { id: '10836745695', type_transaction: 'Rendu monnaie', montant: '-500 FCFA', client: '+225 07 08 06 05 04', date: '20/01/2025, 10:20' },
  { id: '10836745696', type_transaction: 'Paiement course', montant: '+220 FCFA', client: '+225 07 08 06 05 04', date: '20/01/2025, 10:20' },
  { id: '10836745697', type_transaction: 'Rendu monnaie', montant: '-500 FCFA', client: '+225 07 08 06 05 04', date: '20/01/2025, 10:20' },
  { id: '10836745698', type_transaction: 'Paiement course', montant: '+220 FCFA', client: '+225 07 08 06 05 04', date: '20/01/2025, 10:20' },
  { id: '10836745699', type_transaction: 'Paiement course', montant: '+220 FCFA', client: '+225 07 08 06 05 04', date: '20/01/2025, 10:20' },
  { id: '10836745617', type_transaction: 'Paiement course', montant: '+220 FCFA', client: '+225 07 08 06 05 04', date: '20/01/2025, 10:20' },
  { id: '10836745628', type_transaction: 'Rendu monnaie', montant: '-500 FCFA', client: '+225 07 08 06 05 04', date: '20/01/2025, 10:20' },
]

const FILTER_OPTIONS: { value: StoreFilterValue; label: string; matchType?: string }[] = [
  { value: 'tous', label: 'Tous' },
  { value: 'rendu-monnaie', label: 'Rendu monnaie', matchType: 'Rendu monnaie' },
  { value: 'paiement-courses', label: 'Paiement courses', matchType: 'Paiement course' },
]

function filterRowsByType(rows: TransactionRow[], filter: StoreFilterValue): TransactionRow[] {
  if (filter === 'tous') return rows
  const option = FILTER_OPTIONS.find((o) => o.value === filter)
  if (!option?.matchType) return rows
  return rows.filter((row) => row.type_transaction === option.matchType)
}

type StoreTransactionsTableProps = {
  data?: TransactionRow[]
  className?: string
  onExport?: () => void
}

export function StoreTransactionsTable({
  data = DEFAULT_TRANSACTIONS,
  className,
  onExport,
}: StoreTransactionsTableProps) {
  const [dateRange, setDateRange] = useState<{ from?: Date; to?: Date }>({})
  const [filter, setFilter] = useStoreDetailFilter()
  const filteredData = filterRowsByType(data, filter)

  return (
    <div className={cn('bg-white rounded-[32px] lg:rounded-[40px] min-w-0 w-full overflow-hidden', className)}>
      <div className="flex flex-col gap-4 py-4 px-4 sm:py-5.5 sm:px-6 lg:px-8 pb-5.5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <p className="font-sana-sans-bold text-xl sm:text-[28px] text-black shrink-0">Transactions</p>

          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:gap-3.5 min-w-0">
            <SearchInput
              placeholder="Type, point de vente, n° client, n° d'avoir..."
              wrapperClassName="w-full min-w-0 lg:w-[308px]"
              className="text-xs"
            />

            <div className="flex flex-wrap items-center gap-2 sm:gap-4">
              <div className="flex flex-wrap items-center gap-2">
                {FILTER_OPTIONS.map((opt) => (
                  <FilterChip
                    key={opt.value}
                    active={filter === opt.value}
                    onClick={() => setFilter(opt.value)}
                  >
                    {opt.label}
                  </FilterChip>
                ))}
              </div>

              <div className="flex items-center gap-2 sm:gap-3">
                <DateRangePicker
                  value={dateRange as DateRange}
                  onChange={setDateRange}
                  placeholder="Début - Fin"
                />
                <button
                  type="button"
                  className="flex flex-col items-center justify-center gap-2 cursor-pointer shrink-0 p-1"
                  onClick={() => setDateRange({ from: undefined, to: undefined })}
                  aria-label="Réinitialiser les dates"
                >
                  <SvgColor src="/assets/icons/ic_reset.svg" className="w-4.5 h-4.5 text-[#444444]" />
                </button>
              </div>
            </div>

            <div className="shrink-0">
              <Button
                type="button"
                size="medium"
                className="flex flex-col items-center justify-center rounded-[10px] h-[42px] sm:h-[44px] w-full sm:w-[144px]"
                onClick={onExport}
              >
                <span className="font-sana-sans-bold text-sm sm:text-base text-white">Exporter</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto px-2 sm:px-0">
        <Table className="w-full min-w-[640px] sm:min-w-0 pb-0">
          <TableHeader className="bg-[#F6F6F6]">
            <TableRow className="h-[30px] border-[#E6E6E6] hover:bg-[#F6F6F6]">
              {DATA_HEADER.map((header) => (
                <TableHead
                  key={header.key}
                  className="font-sana-sans-medium text-[#666666] pl-4 sm:pl-10 text-xs sm:text-sm"
                >
                  {header.label}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-sana-sans-medium pl-4 sm:pl-10">
                  {item.id}
                </TableCell>
                <TableCell className="font-sana-sans-bold text-sm sm:text-lg pl-4 sm:pl-10">
                  {item.type_transaction}
                </TableCell>
                <TableCell className="font-sana-sans-medium pl-4 sm:pl-10">
                  {item.montant}
                </TableCell>
                <TableCell className="font-sana-sans-medium pl-4 sm:pl-10">
                  {item.client}
                </TableCell>
                <TableCell className="font-sana-sans-medium pl-4 sm:pl-10">
                  {item.date}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
