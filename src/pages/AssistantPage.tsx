import DashboardLayout from '../components/layout/DashboardLayout';
import AiCoach from '../components/assistant/AiCoach';
import ChatInput from '../components/assistant/ChatInput';
import ChatMessage from '../components/assistant/ChatMessage';

export default function AssistantPage() {
  return (
    <DashboardLayout>
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <AiCoach />
        <div className="space-y-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <ChatMessage />
          <ChatInput />
        </div>
      </div>
    </DashboardLayout>
  );
}
