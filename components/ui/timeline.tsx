'use client'

import { cn } from '@/lib/utils'
import { Button } from './button'

export type TimelineItemProps = {
  id: string
  title: string
  description?: string
  actionLabel?: string
  onAction?: (item: TimelineItemProps) => void
  highlight?: boolean
}

type TimelineProps = {
  items: TimelineItemProps[]
  className?: string
  wrapperClassName?: string
}

function Timeline({ items, className, wrapperClassName }: TimelineProps) {
  return (
    <div className={cn('px-6 pb-6', wrapperClassName)}>
      <ul className={cn('relative flex flex-col gap-0', className)}>
        {items.map((item, index) => (
          <TimelineItem
            key={item.id}
            item={item}
            isLast={index === items.length - 1}
          />
        ))}
      </ul>
    </div>
  )
}

type TimelineItemComponentProps = {
  item: TimelineItemProps
  isLast: boolean
}

function TimelineItem({ item, isLast }: TimelineItemComponentProps) {
  const handleAction = () => {
    item.onAction?.(item)
  }

  return (
    <li className="relative flex gap-4 pb-6 last:pb-0">
      {!isLast && (
        <span
          className="absolute left-[4px] top-2 bottom-0 w-px bg-[#949494]"
          aria-hidden
        />
      )}
      <span
        className={cn(
          'relative z-10 flex h-2 w-2 shrink-0 items-center justify-center rounded-full border-2 border-[#E6E6E6] bg-white',
          item.highlight && 'border-primary bg-primary'
        )}
      >
      </span>
      <div className="flex min-w-0 flex-1 flex-col gap-1.5">
        <p className="font-sana-sans-bold">
          {item.title}
        </p>
        {item.description && (
          <p className="font-sana-sans-medium text-[#666666] -mt-2.5">
            {item.description}
          </p>
        )}
        {item.actionLabel && (
          <Button
            variant="secondary"
            size="small"
            onClick={handleAction}
            className="font-sana-sans-bold flex items-center justify-center h-[30px] text-xs text-[#444444] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 rounded-full text-left w-fit"
          >
            {item.actionLabel}
          </Button>
        )}
      </div>
    </li>
  )
}

export { Timeline, type TimelineItemProps as TimelineItemType }
