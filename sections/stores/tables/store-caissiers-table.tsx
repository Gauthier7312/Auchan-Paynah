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
import {
  useStoreCaissierFilter,
  type StoreCaissierFilterValue,
} from '@/sections/stores/store-detail-search'
import { useState } from 'react'

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

const DEFAULT_CAISSIERS: CaissierRow[] = [
  { id: '1', utilisateur: 'Emmanuel GUIEBI', cle_acces: '****4521', date_affectation: '15/01/2025', statut: 'actif' },
  { id: '2', utilisateur: 'Ismael DIOMANDE', cle_acces: '****7832', date_affectation: '12/01/2025', statut: 'actif' },
  { id: '3', utilisateur: 'Aya KONE', cle_acces: '****2198', date_affectation: '10/01/2025', statut: 'bloque' },
  { id: '4', utilisateur: 'Koffi ADOU', cle_acces: '****5543', date_affectation: '08/01/2025', statut: 'actif' },
  { id: '5', utilisateur: 'Marie OUATTARA', cle_acces: '****8876', date_affectation: '05/01/2025', statut: 'actif' },
  { id: '6', utilisateur: 'Jean BAMBA', cle_acces: '****3321', date_affectation: '03/01/2025', statut: 'bloque' },
  { id: '7', utilisateur: 'Fatou SANGARE', cle_acces: '****6690', date_affectation: '02/01/2025', statut: 'actif' },
]

const FILTER_OPTIONS: { value: StoreCaissierFilterValue; label: string; matchStatut?: CaissierRow['statut'] }[] = [
  { value: 'tous', label: 'Tous' },
  { value: 'actif', label: 'Actif', matchStatut: 'actif' },
  { value: 'bloque', label: 'Bloqué', matchStatut: 'bloque' },
]

function filterRowsByStatut(rows: CaissierRow[], filter: StoreCaissierFilterValue): CaissierRow[] {
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
  const filteredData = filterRowsByStatut(data, filter)

  return (
    <div className={cn('bg-white rounded-[40px] w-full overflow-hidden', className)}>
      <div className="flex items-center justify-between pb-5.5 px-10">
        <p className="font-sana-sans-bold text-[28px] text-black">Caissiers</p>

        <div className="flex items-center gap-3.5">
          <SearchInput
            placeholder="Nom, clé d'accès, numéro..."
            wrapperClassName="w-[172px]"
            className="text-xs"
          />

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
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

            <div className="flex items-center gap-5">
              <DateRangePicker
                value={dateRange as DateRange}
                onChange={setDateRange}
                placeholder="Début - Fin"
              />

              <button
                type="button"
                className="flex flex-col items-center justify-center gap-2 cursor-pointer"
                onClick={() => setDateRange({ from: undefined, to: undefined })}
                aria-label="Réinitialiser les dates"
              >
                <SvgColor src="/assets/icons/ic_reset.svg" className="w-4.5 h-4.5 text-[#444444]" />
              </button>
            </div>
          </div>
        </div>

        <div>
          <Button
            type="button"
            size="medium"
            className="flex flex-col items-center justify-center rounded-[10px] h-[44px] w-[176px]"
            onClick={onAddCaissier}
          >
            <span className="font-sana-sans-bold text-base text-white">Ajouter un caissier</span>
          </Button>
        </div>
      </div>

      <div>
        <Table className="w-full pb-0">
          <TableHeader className="bg-[#F6F6F6]">
            <TableRow className="h-[30px] border-[#E6E6E6] hover:bg-[#F6F6F6]">
              {DATA_HEADER.map((header) => (
                <TableHead
                  key={header.key}
                  className="font-sana-sans-medium text-[#666666] pl-10 text-sm"
                >
                  {header.label}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-sana-sans-medium text-lg pl-10">
                  {item.utilisateur}
                </TableCell>
                <TableCell className="font-sana-sans-medium text-lg pl-10">
                  {item.cle_acces}
                </TableCell>
                <TableCell className="font-sana-sans-medium pl-10">
                  {item.date_affectation}
                </TableCell>
                <TableCell className="pl-10">
                  <span
                    className={cn(
                      'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-sana-sans-medium',
                      item.statut === 'actif' && 'bg-[#E8F5E9] text-[#2E7D32]',
                      item.statut === 'bloque' && 'bg-[#FFEBEE] text-[#C62828]'
                    )}
                  >
                    {item.statut === 'actif' ? 'Actif' : 'Bloqué'}
                  </span>
                </TableCell>
                <TableCell className="pl-10">
                  <button
                    type="button"
                    className="font-sana-sans-medium text-sm text-primary hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 rounded"
                    onClick={() => onAction?.(item)}
                  >
                    Voir
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
