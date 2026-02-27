'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

export type FilterChipProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  active?: boolean
}

const FilterChip = React.forwardRef<HTMLButtonElement, FilterChipProps>(
  ({ className, active = false, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        type="button"
        role="tab"
        aria-selected={active}
        data-state={active ? 'active' : 'inactive'}
        className={cn(
          'inline-flex items-center justify-center rounded-[18px] px-4 py-2.5 h-[36px] text-xs font-sana-sans-medium-italic whitespace-nowrap transition-colors outline-none cursor-pointer',
          'bg-[#E6E6E6] text-[#949494] hover:text-[#444444]',
          'data-[state=active]:bg-[#FFE8E8] data-[state=active]:text-black data-[state=active]:shadow-none',
          'focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1',
          'disabled:pointer-events-none disabled:opacity-50',
          className
        )}
        {...props}
      >
        {children}
      </button>
    )
  }
)

FilterChip.displayName = 'FilterChip'

export { FilterChip }
