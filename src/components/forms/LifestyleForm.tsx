import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Card from '../common/Card';
import Button from '../common/Button';
import { TextInput } from '../common/Input';
import { useCarbonStore } from '../../store/carbonStore';

const schema = z.object({
  shoppingSpendPerWeek: z.coerce.number().min(0),
  lifestyleHoursPerWeek: z.coerce.number().min(0),
});

type Values = z.infer<typeof schema>;

export default function LifestyleForm() {
  const profile = useCarbonStore((state) => state.profile);
  const updateInput = useCarbonStore((state) => state.updateInput);
  const { register, handleSubmit } = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: {
      shoppingSpendPerWeek: profile.shoppingSpendPerWeek,
      lifestyleHoursPerWeek: profile.lifestyleHoursPerWeek,
    },
  });

  return (
    <Card className="space-y-4">
      <h2 className="text-lg font-semibold text-slate-900">Lifestyle</h2>
      <form className="grid gap-4 sm:grid-cols-2" onSubmit={handleSubmit(updateInput)}>
        <TextInput label="Weekly shopping spend" type="number" {...register('shoppingSpendPerWeek')} />
        <TextInput label="Lifestyle hours per week" type="number" {...register('lifestyleHoursPerWeek')} />
        <div className="sm:col-span-2">
          <Button type="submit" className="w-full">Update lifestyle data</Button>
        </div>
      </form>
    </Card>
  );
}
