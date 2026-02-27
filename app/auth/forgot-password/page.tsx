'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import FormProvider from '@/components/hook-form/form-provider';
import { RHFTextField } from '@/components/hook-form';
import { toast } from 'sonner';
import { redirect } from 'next/navigation';

type ForgotPasswordFormValues = {
  email: string;
};

const forgotPasswordSchema = z.object({
  email: z.email({ message: "L'email est invalide" }),
});

export default function ForgotPasswordPage() {
  const methods = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: '' },
  });

  const onSubmit = () => {
    toast.success('Un code OTP a été envoyé à votre adresse email pour réinitialiser votre mot de passe');
    redirect('/auth/verify');
  };

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <FormProvider methods={methods} onSubmit={methods.handleSubmit(onSubmit)}>
        <div className="flex min-h-0 flex-1 flex-col items-center justify-between">
          <div className="w-full max-w-[374px]">
            <p className="font-sana-sans-heavy text-3xl leading-tight sm:text-4xl">
              Mot de passe oublié
            </p>
            <p className="font-sana-sans-medium mt-1 text-base sm:mt-2 sm:text-[20px]">
              Veuillez entrer votre adresse email pour réinitialiser votre mot de passe
            </p>

            <div className="mt-8 flex w-full flex-col gap-5 sm:mt-10">
              <RHFTextField name="email" label="Email" type="email" />
            </div>
          </div>

          <div className="mt-auto w-full max-w-[355px] pt-4 sm:pt-6">
            <Button
              type="submit"
              variant="primary"
              size="large"
              className="w-full font-sana-sans-heavy font-normal"
            >
              Continuer
            </Button>
          </div>
        </div>
      </FormProvider>
    </div>
  );
}
