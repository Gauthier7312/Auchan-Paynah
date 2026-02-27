'use client';

import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import FormProvider from '@/components/hook-form/form-provider';
import { RHFTextField } from '@/components/hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { redirect } from 'next/navigation';


type LoginFormValues = {
  email: string;
  password: string;
};

const loginSchema = z.object({
  email: z.email({ message: 'L\'email est invalide' }),
  password: z.string({ message: 'Le mot de passe est requis' }).min(6, { message: 'Le mot de passe doit contenir au moins 6 caractères' }),
});

export default function LoginPage() {
  const methods = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  const onSubmit = () => {
    toast.success('Connexion réussie');
    redirect('/admin/dashboard');
  };

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <FormProvider methods={methods} onSubmit={methods.handleSubmit(onSubmit)}>
        <div className="flex min-h-0 flex-1 flex-col items-center justify-between">
          <div>
            <p className="font-sana-sans-heavy text-4xl leading-16">Connexion</p>
            <p className="font-sana-sans-medium text-[20px] -mt-2">
              Saisissez vos identifiants pour vous connecter
            </p>

            <div className="flex flex-col gap-5 w-[374px] mt-[42px]">
              <RHFTextField name="email" label="Identifiant" type="email" />
              <RHFTextField name="password" label="Mot de passe" type="password" />

              <Link
                href="/auth/forgot-password"
                className="font-sana-sans-medium text-base text-primary text-right hover:underline block"
              >
                Mot de passe oublié
              </Link>
            </div>
          </div>

          <Button
            type="submit"
            variant="primary"
            size="large"
            className="mt-auto w-full max-w-[355px] font-sana-sans-heavy font-normal mb-2.5"
          >
            Se connecter
          </Button>
        </div>
      </FormProvider>
    </div>
  );
}
