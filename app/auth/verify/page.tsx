'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import FormProvider from '@/components/hook-form/form-provider';
import { RHFOTP } from '@/components/hook-form';
import { toast } from 'sonner';
import { redirect } from 'next/navigation';

type VerifyFormValues = {
  code: string;
};

const verifySchema = z.object({
  code: z
    .string()
    .length(4, { message: 'Le code OTP doit contenir 4 caractères' })
    .regex(/^\d+$/, { message: 'Le code doit contenir uniquement des chiffres' }),
});

const COUNTDOWN_SECONDS = 60;

function formatCountdown(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2, '0')} : ${String(s).padStart(2, '0')}`;
}

export default function VerifyPage() {
  const [countdown, setCountdown] = useState<number>(COUNTDOWN_SECONDS);

  const methods = useForm<VerifyFormValues>({
    resolver: zodResolver(verifySchema),
    defaultValues: { code: '' },
  });

  useEffect(() => {
    if (countdown <= 0) return;
    const timer = setInterval(() => {
      setCountdown((prev) => (prev <= 1 ? 0 : prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, [countdown]);

  const handleResend = () => {
    if (countdown > 0) return;
    setCountdown(COUNTDOWN_SECONDS);
    toast.success('Un nouveau code OTP a été envoyé à votre adresse email');
  };

  const onSubmit = () => {
    toast.success('Code OTP validé avec succès');
    redirect('/auth/login');
  };

  return (
    <FormProvider methods={methods} onSubmit={methods.handleSubmit(onSubmit)}>
      <div className="flex flex-col justify-between items-center h-full">
        <div>
          <p className="font-sana-sans-heavy text-4xl leading-16">Code OTP</p>
          <p className="font-sana-sans-medium leading-snug text-[20px] -mt-2 pr-8">
            Veuillez saisir le code OTP reçu par message sur votre adresse email
          </p>

          <div className="flex flex-col gap-5 w-[374px] mt-[42px]">
            <RHFOTP name="code" maxLength={4} />
            <p className="font-sana-sans-medium text-base">
              Pas encore reçu ?{' '}
              <span className="text-secondary-dark text-base">
                {formatCountdown(countdown)}
              </span>{' '}
              <button
                type="button"
                onClick={handleResend}
                disabled={countdown > 0}
                className="font-sana-sans-medium-italic text-primary text-base pl-5 disabled:opacity-50 disabled:cursor-not-allowed hover:underline"
              >
                Renvoyez
              </button>
            </p>
          </div>
        </div>

        <Button
          type="submit"
          variant="primary"
          size="large"
          className="max-w-[355px] font-sana-sans-heavy font-normal mb-2.5"
        >
          Valider
        </Button>
      </div>
    </FormProvider>
  );
}
