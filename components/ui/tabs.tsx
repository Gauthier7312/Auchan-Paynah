'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

type TabsContextValue = {
  value: string
  onValueChange: (value: string) => void
}

const TabsContext = React.createContext<TabsContextValue | null>(null)

function useTabs() {
  const ctx = React.useContext(TabsContext)
  if (!ctx) throw new Error('Tabs components must be used within <Tabs>')
  return ctx
}

type TabsProps = {
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  className?: string
  children: React.ReactNode
}

function Tabs({
  value: controlledValue,
  defaultValue = '',
  onValueChange,
  className,
  children,
}: TabsProps) {
  const [uncontrolledValue, setUncontrolledValue] = React.useState(defaultValue)
  const isControlled = controlledValue !== undefined
  const value = isControlled ? controlledValue : uncontrolledValue

  const handleChange = React.useCallback(
    (v: string) => {
      if (!isControlled) setUncontrolledValue(v)
      onValueChange?.(v)
    },
    [isControlled, onValueChange]
  )

  return (
    <TabsContext.Provider value={{ value, onValueChange: handleChange }}>
      <div data-slot="tabs" className={cn('flex flex-col gap-2', className)}>
        {children}
      </div>
    </TabsContext.Provider>
  )
}

type TabsListProps = React.HTMLAttributes<HTMLDivElement>

function TabsList({ className, ...props }: TabsListProps) {
  return (
    <div
      data-slot="tabs-list"
      role="tablist"
      className={cn(
        'inline-flex items-center gap-1.5 rounded-[14px] bg-[#E6E6E6] p-1 cursor-pointer',
        className
      )}
      {...props}
    />
  )
}

type TabsTriggerProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  value: string
}

function TabsTrigger({ value, className, children, ...props }: TabsTriggerProps) {
  const { value: activeValue, onValueChange } = useTabs()
  const isActive = activeValue === value

  return (
    <button
      type="button"
      role="tab"
      aria-selected={isActive}
      data-state={isActive ? 'active' : 'inactive'}
      onClick={() => onValueChange(value)}
      className={cn(
        'inline-flex items-center justify-center rounded-[10px] px-4 py-2 h-[38px] min-w-[143px] text-base font-sana-sans-bold whitespace-nowrap transition-colors outline-none cursor-pointer',
        'data-[state=active]:bg-white data-[state=active]:text-[#444444] data-[state=active]:font-sana-sans-bold data-[state=active]:shadow-none',
        'focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1',
        'disabled:pointer-events-none disabled:opacity-50',
        '[&_svg]:shrink-0',
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}

type TabsContentProps = React.HTMLAttributes<HTMLDivElement> & {
  value: string
}

function TabsContent({ value, className, children, ...props }: TabsContentProps) {
  const { value: activeValue } = useTabs()
  if (activeValue !== value) return null

  return (
    <div
      data-slot="tabs-content"
      role="tabpanel"
      className={cn('flex-1 outline-none pt-4', className)}
      {...props}
    >
      {children}
    </div>
  )
}

export { Tabs, TabsList, TabsTrigger, TabsContent }
