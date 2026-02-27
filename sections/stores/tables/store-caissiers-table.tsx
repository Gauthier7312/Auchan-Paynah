'use client'

import SvgColor from '@/components/svg-color'
import { Button } from '@/components/ui/button'
import { DateRange, DateRangePicker } from '@/components/ui/date-range-picker'
import { FilterChip } from '@/components/ui/filter-chip'
import { IconButton } from '@/components/ui/icon-button'
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
  useStoreSelectedCaissierId,
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
  { id: '1', utilisateur: 'OwenJaphet01', cle_acces: '1234', date_affectation: '15/01/2025', statut: 'actif' },
  { id: '2', utilisateur: 'OwenJaphet01', cle_acces: '1234', date_affectation: '12/01/2025', statut: 'actif' },
  { id: '3', utilisateur: 'OwenJaphet01', cle_acces: '5623', date_affectation: '10/01/2025', statut: 'bloque' },
  { id: '4', utilisateur: 'OwenJaphet01', cle_acces: '5543', date_affectation: '08/01/2025', statut: 'actif' },
  { id: '5', utilisateur: 'OwenJaphet01', cle_acces: '1234', date_affectation: '05/01/2025', statut: 'actif' },
  { id: '6', utilisateur: 'OwenJaphet01', cle_acces: '1235', date_affectation: '03/01/2025', statut: 'bloque' },
  { id: '7', utilisateur: 'OwenJaphet01', cle_acces: '1236', date_affectation: '01/01/2025', statut: 'actif' }
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
  const [selectedCaissierId, setSelectedCaissierId] = useStoreSelectedCaissierId()
  const filteredData = filterRowsByStatut(data, filter)
  const isRightPanelOpen = selectedCaissierId != null

  return (
    <div className={cn('bg-white rounded-[40px] w-full min-w-0 overflow-hidden', className)}>
      <div className="flex items-center justify-between pb-5.5 px-8">
        <p className="font-sana-sans-bold text-[28px] text-black">Caissiers</p>

        <div className="flex items-center gap-3.5">
          <SearchInput
            placeholder="Nom, clé d'accès, numéro..."
            wrapperClassName={cn(
              'transition-[width] duration-300',
              isRightPanelOpen ? 'w-[154px]' : 'w-[308px]'
            )}
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

            <div className="flex items-center gap-3">
              <DateRangePicker
                value={dateRange as DateRange}
                onChange={setDateRange}
                placeholder="Début - Fin"
              />

              <button
                type="button"
                className="flex flex-col items-center justify-center cursor-pointer"
                onClick={() => setDateRange({ from: undefined, to: undefined })}
                aria-label="Réinitialiser les dates"
              >
                <SvgColor src="/assets/icons/ic_reset.svg" className="w-4 h-4 text-[#444444]" />
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

      <div className="min-w-0 ">
      <Table className="w-full table-fixed">
        <TableHeader className="bg-[#F6F6F6]">
          <TableRow className="h-[30px] border-[#E6E6E6] hover:bg-[#F6F6F6]">
            {DATA_HEADER.map((header) => (
              <TableHead
                key={header.key}
                className={cn(
                  'font-sana-sans-medium text-[#666666] pl-10 text-sm',
                  header.key === 'utilisateur' && 'w-[20%]',
                  header.key === 'cle_acces' && 'w-[18%]',
                  header.key === 'date_affectation' && 'w-[22%]',
                  header.key === 'statut' && 'w-[15%]',
                  header.key === 'actions' && 'w-[25%] pr-10'
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
                <TableCell className="font-sana-sans-medium text-lg pl-10 w-[20%] align-middle">
                  {item.utilisateur}
                </TableCell>
                <TableCell className="font-sana-sans-medium pl-10 w-[18%] align-middle">
                  {item.cle_acces}
                </TableCell>
                <TableCell className="font-sana-sans-medium pl-10 w-[22%] align-middle">
                  {item.date_affectation}
                </TableCell>
                <TableCell className="pl-10 w-[15%] align-middle">
                  <span
                    className={cn(
                      'inline-flex items-center justify-center rounded-[8px] text-sm font-sana-sans-medium w-[68px] h-[26px] text-center',
                      item.statut === 'actif' && 'bg-[#67B346] text-white',
                      item.statut === 'bloque' && 'bg-[#949494] text-white'
                    )}
                  >
                    {item.statut === 'actif' ? 'Actif' : 'Bloqué'}
                  </span>
                </TableCell>
                <TableCell className="pl-10 pr-10 w-[25%] text-right align-middle" onClick={(e) => e.stopPropagation()}>
                  <div className="flex items-center justify-start gap-2">
                    <IconButton
                      label="Modifier"
                      onClick={() => onAction?.(item)}
                    >
                      <SvgColor src="/assets/icons/ic_edit.svg" className="w-5 h-5 text-[#949494]" />
                    </IconButton>
                    <IconButton
                      label="-"
                      onClick={() => onAction?.(item)}
                    >
                      <SvgColor src="/assets/icons/ic_exchange.svg" className="w-5 h-5 text-[#949494]" />
                    </IconButton>
                    <IconButton
                      label="Liste"
                      onClick={() => onAction?.(item)}
                    >
                      <SvgColor src="/assets/icons/ic_list.svg" className="w-5 h-5 text-[#949494]" />
                    </IconButton>
                    <IconButton
                      label="Supprimer"
                      onClick={() => onAction?.(item)}
                    >
                      <SvgColor src="/assets/icons/ic_delete_user.svg" className="w-5 h-5 text-[#949494]" />
                    </IconButton>
                  </div>
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
