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
    <div className="flex min-h-0 flex-1 flex-col">
      <FormProvider methods={methods} onSubmit={methods.handleSubmit(onSubmit)}>
        <div className="flex min-h-0 flex-1 flex-col items-center justify-between">
          <div className="w-full max-w-[374px]">
            <p className="font-sana-sans-heavy text-3xl leading-tight sm:text-4xl">
              Code OTP
            </p>
            <p className="font-sana-sans-medium mt-1 leading-snug text-base text-[#444444] pr-0 sm:mt-2 sm:pr-8 sm:text-[20px]">
              Veuillez saisir le code OTP reçu par message sur votre adresse email
            </p>

            <div className="mt-8 flex w-full flex-col gap-5 sm:mt-10">
              <RHFOTP name="code" maxLength={4} />
              <p className="font-sana-sans-medium text-sm sm:text-base">
                Pas encore reçu ?{' '}
                <span className="text-secondary-dark text-base">
                  {formatCountdown(countdown)}
                </span>{' '}
                <button
                  type="button"
                  onClick={handleResend}
                  disabled={countdown > 0}
                  className="font-sana-sans-medium-italic text-primary pl-2 text-sm hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded disabled:cursor-not-allowed disabled:opacity-50 sm:pl-5 sm:text-base"
                >
                  Renvoyez
                </button>
              </p>
            </div>
          </div>

          <div className="mt-auto w-full max-w-[355px] pt-4 sm:pt-6">
            <Button
              type="submit"
              variant="primary"
              size="large"
              className="w-full font-sana-sans-heavy font-normal"
            >
              Valider
            </Button>
          </div>
        </div>
      </FormProvider>
    </div>
  );
}
