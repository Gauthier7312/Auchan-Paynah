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
    <FormProvider methods={methods} onSubmit={methods.handleSubmit(onSubmit)}>
      <div className="flex flex-col justify-between items-center h-full">
        <div>
          <p className="font-sana-sans-heavy text-4xl leading-16">Mot de passe oublié</p>
          <p className="font-sana-sans-medium text-[20px] -mt-2">
            Veuillez entrer votre adresse email pour réinitialiser votre mot de passe
          </p>

          <div className="flex flex-col gap-5 w-[374px] mt-[42px]">
            <RHFTextField name="email" label="Email" type="email" />
          </div>
        </div>

        <Button
          type="submit"
          variant="primary"
          size="large"
          className="max-w-[355px] font-sana-sans-heavy font-normal mb-2.5"
        >
          Continuer
        </Button>
      </div>
    </FormProvider>
  );
}
