'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { IconButton } from '@/components/ui/icon-button'
import { EyeIcon, EyeOffIcon } from '@/public/assets/icons/eye-icon'

export type MaskedValueProps = {
  value: string
  maskLength?: number
  maskChar?: string
  onRevealChange?: (revealed: boolean) => void
  className?: string
  valueClassName?: string
}

export function MaskedValue({
  value,
  maskLength = 4,
  maskChar = '•',
  onRevealChange,
  className,
  valueClassName,
}: MaskedValueProps) {
  const [isRevealed, setIsRevealed] = React.useState(false)

  const handleToggle = React.useCallback(() => {
    setIsRevealed((prev) => {
      const next = !prev
      onRevealChange?.(next)
      return next
    })
  }, [onRevealChange])

  const displayValue = isRevealed ? value : maskChar.repeat(maskLength)

  return (
    <div
      className={cn('inline-flex items-center gap-2', className)}
      onClick={(e) => e.stopPropagation()}
    >
      <span className={cn('font-sana-sans-medium', valueClassName)}>
        {displayValue}
      </span>
      <IconButton
        label={isRevealed ? 'Masquer' : 'Afficher'}
        onClick={handleToggle}
        aria-label={isRevealed ? 'Masquer la clé' : 'Afficher la clé'}
        className="w-5 h-5 bg-primary/10"
      >
        {isRevealed ? (
          <EyeOffIcon className="w-2 h-2 text-primary" />
        ) : (
          <EyeIcon className="w-2 h-2 text-primary" />
        )}
      </IconButton>
    </div>
  )
}
