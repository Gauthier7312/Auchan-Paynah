'use client'

import { useState } from 'react'
import SvgColor from '@/components/svg-color'
import { Button } from '@/components/ui/button'
import { DateRange, DateRangePicker } from '@/components/ui/date-range-picker'
import { FilterChip } from '@/components/ui/filter-chip'
import { MaskedValue } from '@/components/ui/masked-value'
import { SearchInput } from '@/components/ui/search-input'
import { StatutBadge } from '@/components/ui/statut-badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { cn } from '@/lib/utils'
import { CaissierRowActions } from '@/sections/stores/caissier-row-actions'
import {
  useStoreCaissierFilter,
  useStoreSelectedCaissierId,
  type StoreCaissierFilterValue,
} from '@/sections/stores/store-detail-search'

export type CaissierRow = {
  id: string
  utilisateur: string
  cle_acces: string
  date_affectation: string
  statut: 'actif' | 'bloque'
}

const DATA_HEADER = [
  { label: 'Utilisateur', key: 'utilisateur' },
  { label: "Clé d'accès", key: 'cle_acces' },
  { label: "Date d'affectation", key: 'date_affectation' },
  { label: 'Statut', key: 'statut' },
  { label: 'Actions', key: 'actions' },
] as const

const COLUMN_WIDTHS = {
  utilisateur: 'w-[20%]',
  cle_acces: 'w-[18%]',
  date_affectation: 'w-[22%]',
  statut: 'w-[15%]',
  actions: 'w-[25%]',
} as const

const DEFAULT_CAISSIERS: CaissierRow[] = [
  { id: '1', utilisateur: 'OwenJaphet01', cle_acces: '1234', date_affectation: '15/01/2025', statut: 'actif' },
  { id: '2', utilisateur: 'OwenJaphet01', cle_acces: '1234', date_affectation: '12/01/2025', statut: 'actif' },
  { id: '3', utilisateur: 'OwenJaphet01', cle_acces: '5623', date_affectation: '10/01/2025', statut: 'bloque' },
  { id: '4', utilisateur: 'OwenJaphet01', cle_acces: '5543', date_affectation: '08/01/2025', statut: 'actif' },
  { id: '5', utilisateur: 'OwenJaphet01', cle_acces: '1234', date_affectation: '05/01/2025', statut: 'actif' },
  { id: '6', utilisateur: 'OwenJaphet01', cle_acces: '1235', date_affectation: '03/01/2025', statut: 'bloque' },
  { id: '7', utilisateur: 'OwenJaphet01', cle_acces: '1236', date_affectation: '01/01/2025', statut: 'actif' },
]

const FILTER_OPTIONS: {
  value: StoreCaissierFilterValue
  label: string
  matchStatut?: CaissierRow['statut']
}[] = [
  { value: 'tous', label: 'Tous' },
  { value: 'actif', label: 'Actif', matchStatut: 'actif' },
  { value: 'bloque', label: 'Bloqué', matchStatut: 'bloque' },
]

function filterRowsByStatut(
  rows: CaissierRow[],
  filter: StoreCaissierFilterValue
): CaissierRow[] {
  if (filter === 'tous') return rows
  const option = FILTER_OPTIONS.find((o) => o.value === filter)
  if (!option?.matchStatut) return rows
  return rows.filter((row) => row.statut === option.matchStatut)
}

type StoreCaissiersTableProps = {
  data?: CaissierRow[]
  className?: string
  onAddCaissier?: () => void
  onAction?: (row: CaissierRow) => void
}

export function StoreCaissiersTable({
  data = DEFAULT_CAISSIERS,
  className,
  onAddCaissier,
  onAction,
}: StoreCaissiersTableProps) {
  const [dateRange, setDateRange] = useState<{ from?: Date; to?: Date }>({})
  const [filter, setFilter] = useStoreCaissierFilter()
  const [selectedCaissierId, setSelectedCaissierId] = useStoreSelectedCaissierId()
  const filteredData = filterRowsByStatut(data, filter)
  const isRightPanelOpen = selectedCaissierId != null

  const handleResetDates = () => setDateRange({ from: undefined, to: undefined })

  return (
    <div
      className={cn(
        'bg-white rounded-[32px] lg:rounded-[40px] w-full min-w-0 overflow-hidden',
        className
      )}
    >
      <div className="flex flex-col gap-4 py-4 px-4 sm:py-5.5 sm:px-6 lg:px-8 pb-5.5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <h2 className="font-sana-sans-bold text-xl sm:text-[28px] text-black shrink-0">
            Caissiers
          </h2>

          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:gap-3.5 min-w-0">
            <SearchInput
              placeholder="Nom, clé d'accès, numéro..."
              wrapperClassName={cn(
                'w-full min-w-0 transition-[width] duration-300',
                isRightPanelOpen ? 'lg:w-[148px]' : 'lg:w-[400px]'
              )}
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
                  className="flex shrink-0 flex-col items-center justify-center p-1 cursor-pointer rounded-md hover:bg-black/5 transition-colors"
                  onClick={handleResetDates}
                  aria-label="Réinitialiser les dates"
                >
                  <SvgColor
                    src="/assets/icons/ic_reset.svg"
                    className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-[#444444]"
                  />
                </button>
              </div>
            </div>

            <div className="shrink-0">
              <Button
                type="button"
                size="medium"
                className="flex h-[42px] sm:h-[44px] w-full sm:w-[176px] flex-col items-center justify-center rounded-[10px]"
                onClick={onAddCaissier}
              >
                <span className="font-sana-sans-bold text-sm sm:text-base text-white">
                  Ajouter un caissier
                </span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="min-w-0 pb-5.5 overflow-x-auto px-0">
        <Table className="w-full min-w-[700px] sm:min-w-0 table-fixed pb-0">
          <TableHeader className="bg-[#F6F6F6]">
            <TableRow className="h-[30px] border-[#E6E6E6] hover:bg-[#F6F6F6]">
              {DATA_HEADER.map((header) => (
                <TableHead
                  key={header.key}
                  className={cn(
                    'font-sana-sans-medium text-[#666666] pl-4 sm:pl-10 text-xs sm:text-sm',
                    header.key === 'actions' && 'pr-4 sm:pr-10',
                    COLUMN_WIDTHS[header.key]
                  )}
                >
                  {header.label}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.map((item) => {
              const isSelected = selectedCaissierId === item.id
              return (
                <TableRow
                  key={item.id}
                  className={cn(
                    'cursor-pointer transition-colors',
                    isSelected && 'bg-[#F3F3F3]'
                  )}
                  onClick={() => setSelectedCaissierId(item.id)}
                >
                  <TableCell
                    className={cn(
                      'font-sana-sans-medium align-middle pl-4 sm:pl-10 text-sm sm:text-lg',
                      COLUMN_WIDTHS.utilisateur
                    )}
                  >
                    {item.utilisateur}
                  </TableCell>
                  <TableCell
                    className={cn(
                      'font-sana-sans-medium align-middle pl-4 sm:pl-10 text-sm',
                      COLUMN_WIDTHS.cle_acces
                    )}
                  >
                    <MaskedValue value={item.cle_acces} maskLength={4} />
                  </TableCell>
                  <TableCell
                    className={cn(
                      'font-sana-sans-medium align-middle pl-4 sm:pl-10 text-sm',
                      COLUMN_WIDTHS.date_affectation
                    )}
                  >
                    {item.date_affectation}
                  </TableCell>
                  <TableCell
                    className={cn(
                      'align-middle pl-4 sm:pl-10',
                      COLUMN_WIDTHS.statut
                    )}
                  >
                    <StatutBadge statut={item.statut} />
                  </TableCell>
                  <TableCell
                    className={cn(
                      'pl-4 sm:pl-10 pr-4 sm:pr-10 text-right align-middle',
                      COLUMN_WIDTHS.actions
                    )}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <CaissierRowActions
                      row={item}
                      onAction={onAction}
                    />
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
