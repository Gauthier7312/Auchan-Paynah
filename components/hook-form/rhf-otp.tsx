'use client';

import { useFormContext, Controller } from 'react-hook-form';
import { InputOTP, InputOTPSlot } from '@/components/ui/input-otp';
import { cn } from '@/lib/utils';

type RHFOTPProps = {
  name: string;
  maxLength?: number;
  label?: string;
  labelClassName?: string;
  wrapperClassName?: string;
  errorClassName?: string;
};

export default function RHFOTP({
  name,
  maxLength = 4,
  label,
  labelClassName,
  wrapperClassName,
  errorClassName,
}: RHFOTPProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div className={cn('flex flex-col gap-2.5 w-full', wrapperClassName)}>
          {label && (
            <label htmlFor={name} className={cn('font-sana-sans-medium text-base text-foreground', labelClassName)}>
              {label}
            </label>
          )}
          <InputOTP
            maxLength={maxLength}
            value={field.value ?? ''}
            onChange={(value) => field.onChange(value)}
            onBlur={field.onBlur}
            aria-invalid={!!error}
            aria-describedby={error ? `${name}-error` : undefined}
          >
            {Array.from({ length: maxLength }).map((_, index) => (
              <InputOTPSlot key={index} index={index} />
            ))}
          </InputOTP>
          {error && (
            <p
              className={cn('text-xs text-red-600', errorClassName)}
              id={`${name}-error`}
              role="alert"
            >
              {error.message}
            </p>
          )}
        </div>
      )}
    />
  );
}
