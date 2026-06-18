export type AssistantMessage = {
  id: string;
  content: string;
  role: 'assistant' | 'user';
  createdAt: string;
};
