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
  const { register, handleSubmit, formState: { errors } } = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: user,
  });

  return (
    <Card className="space-y-4">
      <h2 className="text-lg font-semibold text-slate-900">Profile</h2>
      <form className="grid gap-4 sm:grid-cols-2" onSubmit={handleSubmit(updateUser)}>
        <TextInput label="Name" {...register('name')} error={errors.name?.message} />
        <TextInput label="Email" type="email" {...register('email')} error={errors.email?.message} />
        <TextInput label="Household size" type="number" {...register('householdSize')} error={errors.householdSize?.message} />
        <TextInput label="City" {...register('city')} error={errors.city?.message} />
        <div className="flex flex-col gap-2 text-sm font-medium text-slate-700 sm:col-span-2">
          <label htmlFor="preferredUnit">Preferred unit</label>
          <select
            id="preferredUnit"
            className="h-11 rounded-xl border border-slate-200 bg-white px-4 text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
            {...register('preferredUnit')}
          >
            <option value="metric">Metric (kg CO2e)</option>
            <option value="imperial">Imperial (lbs CO2e)</option>
          </select>
          {errors.preferredUnit ? <span className="text-xs font-medium text-rose-600">{errors.preferredUnit.message}</span> : null}
        </div>
        <div className="sm:col-span-2">
          <Button type="submit" className="w-full">Save profile</Button>
        </div>
      </form>
    </Card>
  );
}
