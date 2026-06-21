import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import Button from '../components/common/Button';
import { TextInput } from '../components/common/Input';
import { useUserStore } from '../store/userStore';
import { APP_NAME } from '../utils/constants';

const schema = z.object({
  name: z.string().min(2, 'Enter your name (at least 2 characters).'),
  city: z.string().min(2, 'Enter your city.'),
  householdSize: z.coerce.number().min(1, 'Household size must be at least 1.'),
  preferredUnit: z.enum(['metric', 'imperial']),
});

type Values = z.infer<typeof schema>;

export default function OnboardingPage() {
  const updateUser = useUserStore((state) => state.updateUser);
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: { name: '', city: '', householdSize: 1, preferredUnit: 'metric' },
  });

  const onSubmit = (values: Values) => {
    updateUser({ ...values, email: '' });
    navigate('/dashboard');
  };

  return (
    <main className="grid min-h-screen place-items-center bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.18),_transparent_30%),linear-gradient(180deg,#f8fcf9_0%,#edf7f1_100%)] px-4">
      <div className="w-full max-w-md space-y-6 rounded-3xl border border-white/60 bg-white/90 p-8 shadow-xl backdrop-blur">
        <div className="space-y-1">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-emerald-600">{APP_NAME}</p>
          <h1 className="text-2xl font-semibold text-slate-900">Welcome — let's set up your profile</h1>
          <p className="text-sm text-slate-500">This takes 30 seconds and personalises your carbon dashboard.</p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <TextInput label="Your name" placeholder="Alex" {...register('name')} error={errors.name?.message} />
          <TextInput label="City" placeholder="Seattle" {...register('city')} error={errors.city?.message} />
          <TextInput label="Household size" type="number" min="1" {...register('householdSize')} error={errors.householdSize?.message} />

          <div className="flex flex-col gap-2 text-sm font-medium text-slate-700">
            <label htmlFor="preferredUnit">Preferred unit</label>
            <select
              id="preferredUnit"
              className="h-11 rounded-xl border border-slate-200 bg-white px-4 text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
              {...register('preferredUnit')}
            >
              <option value="metric">Metric (kg CO2e)</option>
              <option value="imperial">Imperial (lbs CO2e)</option>
            </select>
          </div>

          <Button type="submit" disabled={isSubmitting} className="w-full">
            Get started
          </Button>
        </form>
      </div>
    </main>
  );
}
