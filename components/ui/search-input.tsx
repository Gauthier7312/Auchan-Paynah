'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import SvgColor from '@/components/svg-color';

export interface SearchInputProps extends Omit<React.ComponentPropsWithoutRef<'input'>, 'type'> {
  wrapperClassName?: string;
  iconClassName?: string;
}

const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
  ({ placeholder = 'Rechercher…', className, wrapperClassName, iconClassName, ...props }, ref) => {
    return (
      <div
        className={cn(
          'flex items-center gap-1 bg-[#E6E6E6] rounded-[18px] px-3',
          wrapperClassName
        )}
      >
        <SvgColor
          src="/assets/icons/ic_search.svg"
          className={cn('w-3 h-3.5 text-[#949494] shrink-0', iconClassName)}
        />
        <input
          ref={ref}
          type="text"
          placeholder={placeholder}
          className={cn(
            'p-0 m-0 bg-transparent outline-none text-[#949494] text-[15px] font-sana-sans-italic h-[36px] min-w-0 placeholder:text-[#949494] flex-1',
            className
          )}
          {...props}
        />
      </div>
    );
  }
);

SearchInput.displayName = 'SearchInput';

export { SearchInput };
