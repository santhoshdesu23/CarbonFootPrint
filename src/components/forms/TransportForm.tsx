import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Card from '../common/Card';
import Button from '../common/Button';
import { TextInput } from '../common/Input';
import { useCarbonStore } from '../../store/carbonStore';

const schema = z.object({
  transportKm: z.coerce.number().min(0),
  transportDaysPerWeek: z.coerce.number().min(0).max(7),
});

type Values = z.infer<typeof schema>;

export default function TransportForm() {
  const profile = useCarbonStore((state) => state.profile);
  const updateInput = useCarbonStore((state) => state.updateInput);
  const { register, handleSubmit } = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: {
      transportKm: profile.transportKm,
      transportDaysPerWeek: profile.transportDaysPerWeek,
    },
  });

  return (
    <Card className="space-y-4">
      <h2 className="text-lg font-semibold text-slate-900">Transport</h2>
      <form className="grid gap-4 sm:grid-cols-2" onSubmit={handleSubmit(updateInput)}>
        <TextInput label="Distance per trip (km)" type="number" step="0.1" {...register('transportKm')} />
        <TextInput label="Days per week" type="number" step="1" {...register('transportDaysPerWeek')} />
        <div className="sm:col-span-2">
          <Button type="submit" className="w-full">Update transport data</Button>
        </div>
      </form>
    </Card>
  );
}
