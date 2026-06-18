import { create } from 'zustand';
import { buildCarbonProfile } from '../services/carbonEngine';
import { generateCoachMessage, getRecommendations } from '../services/recommendationEngine';
import { readStorage, writeStorage } from '../services/storageService';
import type { AssistantMessage } from '../types/assistant';
import type { CarbonInput } from '../types/carbon';

type AssistantState = {
	messages: AssistantMessage[];
	sendMessage: (message: string) => void;
	seedAssistant: (input: CarbonInput) => void;
};

const storedMessages = readStorage<AssistantMessage[]>('carbonwise-assistant', []);

export const useAssistantStore = create<AssistantState>((set, get) => ({
	messages: storedMessages,
	sendMessage: (message) => {
		const nextMessages = [
			...get().messages,
			{
				id: `msg-${Date.now()}`,
				content: message.trim(),
				role: 'user' as const,
				createdAt: new Date().toISOString(),
			},
		];

		writeStorage('carbonwise-assistant', nextMessages);
		set({ messages: nextMessages });
	},
	seedAssistant: (input) => {
		const profile = buildCarbonProfile(input);
		const recommendations = getRecommendations(profile);
		const nextMessages: AssistantMessage[] = [
			{
				id: 'seed-1',
				content: generateCoachMessage(profile),
				role: 'assistant' as const,
				createdAt: new Date().toISOString(),
			},
			...recommendations.slice(0, 2).map((recommendation, index) => ({
				id: `seed-rec-${index}`,
				content: recommendation.description,
				role: 'assistant' as const,
				createdAt: new Date().toISOString(),
			})),
		];

		writeStorage('carbonwise-assistant', nextMessages);
		set({ messages: nextMessages });
	},
}));

export const assistantStore = useAssistantStore;
