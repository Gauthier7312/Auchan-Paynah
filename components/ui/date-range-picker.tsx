'use client'

import * as React from 'react'
import { type DateRange, DayPicker } from 'react-day-picker'
import { fr } from 'react-day-picker/locale'
import { cn } from '@/lib/utils'
import SvgColor from '../svg-color'
import { Button } from './button'

export type { DateRange }

const dayPickerClassNames = {
  root: 'rdp-root font-sana-sans-medium text-[15px] text-[#444444]',
  months: 'rdp-months flex flex-col sm:flex-row gap-6',
  month: 'rdp-month',
  month_caption: 'rdp-month_caption flex items-center justify-between pb-3',
  caption_label: 'rdp-caption_label font-sana-sans-bold text-[17px] text-[#444444]',
  nav: 'rdp-nav flex items-center hidden gap-1',
  button_previous: 'rdp-button_previous hidden h-9 w-9 rounded-[10px] flex items-center justify-center text-[#444444] hover:bg-[#FFE8E8] hover:text-primary transition-colors',
  button_next: 'rdp-button_next h-9 w-9 hidden rounded-[10px] flex items-center justify-center text-[#444444] hover:bg-[#FFE8E8] hover:text-primary transition-colors',
  weekdays: 'rdp-weekdays',
  weekday: 'rdp-weekday font-sana-sans-bold text-[13px] text-[#666666] py-2',
  week: 'rdp-week',
  day: 'rdp-day p-0.5',
  day_button: 'rdp-day_button h-9 w-9 rounded-[10px] font-sana-sans-medium transition-colors',
  footer: 'rdp-footer mt-4 pt-4 hidden border-t border-[#E6E6E6] text-center',
  range_start: 'rdp-range_start bg-[#FFE8E8] text-primary hover:bg-[#FFD4DA] hover:text-primary',
  range_end: 'rdp-range_end bg-[#FFE8E8] text-primary hover:bg-[#FFD4DA] hover:text-primary',
  range_middle: 'rdp-range_middle bg-[#FFE8E8] text-primary hover:bg-[#FFD4DA] hover:text-primary',
  selected: 'rdp-selected bg-[#FFE8E8] text-primary hover:bg-[#FFD4DA] hover:text-primary',
  today: 'rdp-today font-sana-sans-bold text-primary',
  outside: 'rdp-outside text-[#E6E6E6]',
  disabled: 'rdp-disabled opacity-40 cursor-not-allowed',
}

type DateRangePickerProps = {
  value?: DateRange
  onChange?: (range: DateRange) => void
  placeholder?: string
  className?: string
  triggerClassName?: string
}

function formatDateLong(date: Date): string {
  return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })
}

function formatRange(range: DateRange | undefined): string {
  if (!range?.from) return 'Début - Fin'
  const fromStr = range.from.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' })
  if (!range.to || range.from.getTime() === range.to.getTime()) return fromStr
  const toStr = range.to.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' })
  return `${fromStr} → ${toStr}`
}

export function DateRangePicker({
  value,
  onChange,
  placeholder = 'Début - Fin',
  triggerClassName,
}: DateRangePickerProps) {
  const [open, setOpen] = React.useState(false)
  const initialDraft: DateRange = value?.from !== undefined || value?.to !== undefined ? value : { from: undefined, to: undefined }
  const [draft, setDraft] = React.useState<DateRange>(initialDraft)

  const handleOpen = () => {
    setDraft(value ?? { from: undefined, to: undefined })
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleApply = () => {
    onChange?.(draft)
    setOpen(false)
  }

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) handleClose()
  }

  React.useEffect(() => {
    if (!open) return
    const onEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose()
    }
    document.addEventListener('keydown', onEscape)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onEscape)
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <>
      <button
        type="button"
        onClick={handleOpen}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-label="Choisir une plage de dates"
        className={cn(
          'h-[36px] min-w-[178px] items-center justify-center rounded-[18px] bg-[#E6E6E6] px-4 text-[12px] font-sana-sans-italic text-[#949494] transition-colors outline-none focus-visible:ring-2 focus-visible:ring-primary/30 placeholder:text-[#949494]',
          triggerClassName
        )}
      >
        <div className="flex items-center justify-between gap-2">
          {formatRange(value) || placeholder}
          <SvgColor src="/assets/icons/ic_date.svg" className="w-3.5 h-3.5 text-[#444444]" />
        </div>
      </button>

      {open && (
        <div
          className="date-range-picker-modal fixed inset-0 z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Sélection de la plage de dates"
        >
          <div
            className="absolute inset-0 bg-black/40 transition-opacity"
            onClick={handleBackdropClick}
            aria-hidden
          />
          <div className="date-range-picker-content relative z-10 w-full max-w-[min(90vw,720px)] sm:max-w-[400px] rounded-[24px] bg-white p-4 shadow-xl">
            <div className="mb-2 flex items-center justify-end">
              {/* <h2 className="font-sana-sans-bold text-[20px] text-[#444444]">
                Choisir une plage de dates
              </h2> */}
              <button
                type="button"
                onClick={handleClose}
                className="rounded-[10px] p-2 text-[#949494] transition-colors hover:bg-[#F6F6F6] hover:text-[#444444]"
                aria-label="Fermer"
              >
                <SvgColor src="/assets/icons/ic_close.svg" className="w-4 h-4 text-[#949494]" />
              </button>
            </div>

            <div className="flex justify-center">
              <DayPicker
                mode="range"
                locale={fr}
                defaultMonth={draft?.from ?? new Date()}
                selected={draft}
                onSelect={(range) => setDraft(range ?? { from: undefined, to: undefined })}
                classNames={dayPickerClassNames}
              />
            </div>

            <div className=" flex flex-wrap items-center justify-between gap-3 border-t border-[#E6E6E6] pt-4">
                <Button
                  type="button"
                  onClick={handleApply}
                  className="w-full h-[40px] flex flex-col items-center justify-center rounded-[10px]"
                >
                  <span className="font-sana-sans-bold text-[15px] text-white">Valider</span>
                </Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
