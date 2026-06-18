import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Button from '../common/Button';
import Card from '../common/Card';
import { TextInput } from '../common/Input';
import { useGoalStore } from '../../store/goalStore';

const goalSchema = z.object({
  title: z.string().min(3, 'Enter a clear goal title.'),
  targetKgCo2e: z.coerce.number().positive('Target must be greater than 0.'),
  progressKgCo2e: z.coerce.number().min(0, 'Progress cannot be negative.'),
  deadline: z.string().min(4, 'Choose a deadline.'),
});

type GoalFormValues = z.infer<typeof goalSchema>;

export default function GoalForm() {
  const addGoal = useGoalStore((state) => state.addGoal);
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<GoalFormValues>({
    resolver: zodResolver(goalSchema),
    defaultValues: { title: '', targetKgCo2e: 25, progressKgCo2e: 0, deadline: 'Weekly' },
  });

  const onSubmit = (values: GoalFormValues) => {
    addGoal(values);
    reset(values);
  };

  return (
    <Card className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold text-slate-900">Create Goal</h2>
        <p className="text-sm text-slate-500">Set a weekly or monthly reduction target.</p>
      </div>
      <form className="grid gap-4 sm:grid-cols-2" onSubmit={handleSubmit(onSubmit)}>
        <div className="sm:col-span-2">
          <TextInput label="Goal title" placeholder="Reduce commuting emissions" {...register('title')} error={errors.title?.message} />
        </div>
        <TextInput label="Target kg CO2e" type="number" step="0.1" {...register('targetKgCo2e')} error={errors.targetKgCo2e?.message} />
        <TextInput label="Starting progress" type="number" step="0.1" {...register('progressKgCo2e')} error={errors.progressKgCo2e?.message} />
        <div className="sm:col-span-2">
          <TextInput label="Deadline" placeholder="Weekly / Monthly" {...register('deadline')} error={errors.deadline?.message} />
        </div>
        <div className="sm:col-span-2">
          <Button type="submit" disabled={isSubmitting} className="w-full">Save goal</Button>
        </div>
      </form>
    </Card>
  );
}
