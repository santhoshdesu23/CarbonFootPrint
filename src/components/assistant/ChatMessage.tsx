import { useAssistantStore } from '../../store/assistantStore';

export default function ChatMessage() {
  const messages = useAssistantStore((state) => state.messages);

  return (
    <div className="space-y-3" aria-live="polite">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`rounded-2xl px-4 py-3 text-sm leading-6 ${message.role === 'assistant' ? 'bg-emerald-50 text-emerald-950' : 'bg-slate-100 text-slate-800'}`}
        >
          {message.content}
        </div>
      ))}
      {messages.length === 0 ? <p className="text-sm text-slate-500">Start a conversation with the sustainability coach.</p> : null}
    </div>
  );
}
