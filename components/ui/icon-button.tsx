'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

export type IconButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  label: string
  iconClassName?: string
}

const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ className, label, children, iconClassName, ...props }, ref) => {
    return (
      <div className="relative inline-flex group">
        <button
          ref={ref}
          type="button"
          aria-label={label}
          className={cn(
            'inline-flex items-center justify-center rounded-full w-[40px] h-[40px] transition-colors cursor-pointer',
            'bg-transparent hover:bg-[#F3F3F3]',
            'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1',
            'disabled:pointer-events-none disabled:opacity-50',
            className
          )}
          {...props}
        >
          <span className={cn('flex items-center justify-center', iconClassName)}>
            {children}
          </span>
        </button>
        <span
          role="tooltip"
          className={cn(
            'absolute left-1/2 -translate-x-1/2 top-full mt-0.5 z-10',
            'px-2 py-1 rounded text-[10px] font-sana-sans-medium text-black bg-transparent whitespace-nowrap',
            'opacity-0 pointer-events-none transition-opacity duration-150',
            'group-hover:opacity-100'
          )}
        >
          {label}
        </span>
      </div>
    )
  }
)

IconButton.displayName = 'IconButton'

export { IconButton }
