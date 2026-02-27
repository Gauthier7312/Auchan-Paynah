'use client'

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs'
import { cn } from '@/lib/utils'

export type StoreDetailTabsTab = {
  value: string
  label: string
  content: React.ReactNode
}

type StoreDetailTabsProps = {
  tabs: StoreDetailTabsTab[]
  value?: string
  onValueChange?: (value: string) => void
  defaultValue?: string
  className?: string
  tabsListClassName?: string
  contentClassName?: string
}

export function StoreDetailTabs({
  tabs,
  value: controlledValue,
  onValueChange,
  defaultValue,
  className,
  tabsListClassName,
  contentClassName,
}: StoreDetailTabsProps) {
  const initialValue = defaultValue ?? tabs[0]?.value ?? 'infos'

  return (
    <Tabs
      className={cn('w-full', className)}
      value={controlledValue}
      defaultValue={controlledValue === undefined ? initialValue : undefined}
      onValueChange={onValueChange}
    >
      <TabsList className={cn('w-fit mx-8', tabsListClassName)}>
        {tabs?.map((tab) => (
          <TabsTrigger key={tab.value} value={tab.value}>
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {tabs?.map((tab) => (
        <TabsContent
          key={tab.value}
          value={tab.value}
          className={cn('bg-white py-4', contentClassName)}
        >
          {tab.content}
        </TabsContent>
      ))}
    </Tabs>
  )
}
