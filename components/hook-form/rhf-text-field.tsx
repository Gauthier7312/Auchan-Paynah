import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { Input } from '@/components/ui/input';

type Props = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'name'> & {
  name: string;
  label: string;
  wrapperClassName?: string;
  labelClassName?: string;
  inputClassName?: string;
  errorClassName?: string;
};

export default function RHFTextField({
  name,
  label,
  type = 'text',
  wrapperClassName,
  labelClassName,
  inputClassName,
  errorClassName,
  ...other
}: Props) {
  const { control } = useFormContext();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>, onChange: (value: unknown) => void) => {
    const { value } = event.target;
    if (type === 'number') {
      onChange(value === '' ? undefined : Number(value));
    } else {
      onChange(value);
    }
  };

  return (
    <div className={`flex flex-col gap-2.5 w-full ${wrapperClassName ?? ''}`.trim()}>
      <label htmlFor={name} className={labelClassName ?? 'block font-sana-sans-medium text-base text-foreground'}>
        {label}
      </label>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <>
            <Input
              {...field}
              id={name}
              type={type}
              value={field.value ?? ''}
              onChange={(e) => handleChange(e, field.onChange)}
              onBlur={field.onBlur}
              className={`w-full ${error ? 'border-red-500' : ''} ${inputClassName ?? ''}`.trim()}
              aria-invalid={!!error}
              aria-describedby={error ? `${name}-error` : undefined}
              {...other}
            />
            {error && (
              <p className={`text-xs text-red-600 ${errorClassName ?? ''}`.trim()} id={`${name}-error`} role="alert">
                {error.message}
              </p>
            )}
          </>
        )}
      />
    </div>
  );
}
