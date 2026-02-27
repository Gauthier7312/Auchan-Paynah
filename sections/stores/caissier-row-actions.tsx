'use client'

import SvgColor from '@/components/svg-color'
import { IconButton } from '@/components/ui/icon-button'
import type { CaissierRow } from '@/sections/stores/tables/store-caissiers-table'

type CaissierRowActionsProps = {
  row: CaissierRow
  onAction?: (row: CaissierRow) => void
}

const iconClass = 'w-4 h-4 sm:w-5 sm:h-5 text-[#949494]'

export function CaissierRowActions({ row, onAction }: CaissierRowActionsProps) {
  const handleAction = () => onAction?.(row)

  return (
    <div className="flex items-center justify-end gap-1.5 sm:gap-2">
      <IconButton label="Modifier" onClick={handleAction}>
        <SvgColor src="/assets/icons/ic_edit.svg" className={iconClass} />
      </IconButton>
      <IconButton label="Échanger" onClick={handleAction}>
        <SvgColor src="/assets/icons/ic_exchange.svg" className={iconClass} />
      </IconButton>
      <IconButton label="Liste" onClick={handleAction}>
        <SvgColor src="/assets/icons/ic_list.svg" className={iconClass} />
      </IconButton>
      <IconButton label="Supprimer" onClick={handleAction}>
        <SvgColor src="/assets/icons/ic_delete_user.svg" className={iconClass} />
      </IconButton>
    </div>
  )
}
