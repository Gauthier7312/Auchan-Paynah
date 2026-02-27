 /* eslint-disable @typescript-eslint/no-explicit-any */
import { FormProvider as Form, UseFormReturn } from 'react-hook-form';

type Props = {
  children: React.ReactNode;
  methods: UseFormReturn<any>;
  onSubmit?: (e: React.BaseSyntheticEvent) => void;
};

export default function FormProvider({ children, onSubmit, methods }: Props) {
  return (
    <Form {...methods}>
      <form onSubmit={onSubmit} className="flex h-full min-h-0 flex-col">
        {children}
      </form>
    </Form>
  );
}
