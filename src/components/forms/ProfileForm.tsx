import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Card from '../common/Card';
import Button from '../common/Button';
import { TextInput } from '../common/Input';
import { useUserStore } from '../../store/userStore';

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  householdSize: z.coerce.number().min(1),
  city: z.string().min(2),
  preferredUnit: z.enum(['metric', 'imperial']),
});

type Values = z.infer<typeof schema>;

export default function ProfileForm() {
  const user = useUserStore((state) => state.user);
  const updateUser = useUserStore((state) => state.updateUser);
  const { register, handleSubmit } = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: user,
  });

  return (
    <Card className="space-y-4">
      <h2 className="text-lg font-semibold text-slate-900">Profile</h2>
      <form className="grid gap-4 sm:grid-cols-2" onSubmit={handleSubmit(updateUser)}>
        <TextInput label="Name" {...register('name')} />
        <TextInput label="Email" type="email" {...register('email')} />
        <TextInput label="Household size" type="number" {...register('householdSize')} />
        <TextInput label="City" {...register('city')} />
        <TextInput label="Preferred unit" placeholder="metric or imperial" {...register('preferredUnit')} />
        <div className="sm:col-span-2">
          <Button type="submit" className="w-full">Save profile</Button>
        </div>
      </form>
    </Card>
  );
}
