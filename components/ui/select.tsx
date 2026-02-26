'use client';

import { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

export type SelectOption = { value: string; label: string };

type SelectProps = {
  name?: string;
  id?: string;
  value: string;
  options: SelectOption[];
  onChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
  triggerClassName?: string;
  contentClassName?: string;
};

export function Select({
  name,
  id,
  value,
  options,
  onChange,
  placeholder = 'Choisir…',
  className,
  triggerClassName,
  contentClassName,
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((o) => o.value === value);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={ref} className={cn('relative', className)}>
      <input type="hidden" name={name} value={value} readOnly aria-hidden />
      <button
        type="button"
        id={id}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={selectedOption?.label ?? placeholder}
        onClick={() => setIsOpen((o) => !o)}
        className={cn(
          'flex w-full items-center justify-between gap-2 rounded-[18px] border-none bg-[#F2F2F2] px-3 py-2.5 font-sana-sans-italic text-xs text-[#444444] outline-none transition-shadow',
          triggerClassName
        )}
      >
        <span className="truncate">{selectedOption?.label ?? placeholder}</span>
        <svg
          className={cn('h-3.5 w-3.5 shrink-0 text-[#444444] transition-transform', isOpen && 'rotate-180')}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <ul
          role="listbox"
          className={cn(
            'absolute top-full left-0 z-50 mt-1 max-h-[104px] min-w-full overflow-auto rounded-[20px] border-none bg-[#F2F2F2] p-3 shadow-lg',
            contentClassName
          )}
        >
          {options.map((option) => (
            <li
              key={option.value}
              role="option"
              aria-selected={option.value === value}
              onClick={() => {
                onChange?.(option.value);
                setIsOpen(false);
              }}
              className={cn(
                'cursor-pointer py-0.5 font-sana-sans-italic text-xs text-[#444444] transition-colors hover:bg-[#F2F2F2] text-right',
                option.value === value && 'bg-[#F2F2F2] font-sana-sans-medium-italic text-black'
              )}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
