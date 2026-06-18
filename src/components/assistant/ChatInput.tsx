import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Button from '../common/Button';
import { TextArea } from '../common/Input';
import { useAssistantStore } from '../../store/assistantStore';

const chatSchema = z.object({
  message: z.string().min(3, 'Write at least 3 characters.'),
});

type ChatFormValues = z.infer<typeof chatSchema>;

export default function ChatInput() {
  const sendMessage = useAssistantStore((state) => state.sendMessage);
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<ChatFormValues>({
    resolver: zodResolver(chatSchema),
    defaultValues: { message: '' },
  });

  const onSubmit = (values: ChatFormValues) => {
    sendMessage(values.message);
    reset();
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <TextArea label="Ask the AI coach" placeholder="How can I reduce my transport footprint this week?" {...register('message')} error={errors.message?.message} />
      <Button type="submit" disabled={isSubmitting} className="w-full">Send</Button>
    </form>
  );
}
