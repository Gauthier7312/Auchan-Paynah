'use client'

import { cn } from '@/lib/utils'

export type StatutBadgeValue = 'actif' | 'bloque'

type StatutBadgeProps = {
  statut: StatutBadgeValue
}

export function StatutBadge({ statut }: StatutBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center justify-center rounded-lg text-xs sm:text-sm font-sana-sans-medium h-6 sm:h-[26px] min-w-[60px] sm:min-w-[68px]',
        statut === 'actif' && 'bg-[#67B346] text-white',
        statut === 'bloque' && 'bg-[#949494] text-white'
      )}
    >
      {statut === 'actif' ? 'Actif' : 'Bloqué'}
    </span>
  )
}
