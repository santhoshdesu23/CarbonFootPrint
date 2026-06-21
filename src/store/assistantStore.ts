import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { buildCarbonProfile } from '../services/carbonEngine';
import { generateCoachMessage, getRecommendations } from '../services/recommendationEngine';
import type { AssistantMessage } from '../types/assistant';
import type { CarbonInput } from '../types/carbon';

type AssistantState = {
	messages: AssistantMessage[];
	sendMessage: (message: string) => void;
	seedAssistant: (input: CarbonInput) => void;
	clearMessages: () => void;
};

export const useAssistantStore = create<AssistantState>()(
	persist(
		(set, get) => ({
			messages: [],
			sendMessage: (message) => {
				const trimmed = message.trim();
				if (!trimmed) return;

				const userMessage: AssistantMessage = {
					id: `msg-${Date.now()}`,
					content: trimmed,
					role: 'user',
					createdAt: new Date().toISOString(),
				};

				// Generate a contextual auto-reply based on keywords in the message.
				const lower = trimmed.toLowerCase();
				let replyContent = 'Great question. Focus on your highest-emission category first for the fastest carbon score improvement.';
				if (lower.includes('transport') || lower.includes('car') || lower.includes('commute')) {
					replyContent = 'Transport is often the largest lever. Even shifting two trips per week to transit or walking creates measurable savings.';
				} else if (lower.includes('food') || lower.includes('meat') || lower.includes('diet')) {
					replyContent = 'Food choices have a high impact. Replacing one meat-heavy meal per week with a plant-based option is one of the fastest footprint reductions available.';
				} else if (lower.includes('energy') || lower.includes('electricity') || lower.includes('home')) {
					replyContent = 'Home energy use compounds over months. Reducing standby load and improving insulation gives consistent long-term savings.';
				} else if (lower.includes('shopping') || lower.includes('buy') || lower.includes('purchase')) {
					replyContent = 'Embodied emissions in goods are often underestimated. A short pause before non-essential purchases lowers your shopping footprint steadily.';
				}

				const assistantReply: AssistantMessage = {
					id: `msg-${Date.now() + 1}`,
					content: replyContent,
					role: 'assistant',
					createdAt: new Date().toISOString(),
				};

				set({ messages: [...get().messages, userMessage, assistantReply] });
			},
			seedAssistant: (input) => {
				const profile = buildCarbonProfile(input);
				const recommendations = getRecommendations(profile);
				const seeded: AssistantMessage[] = [
					{
						id: 'seed-1',
						content: generateCoachMessage(profile),
						role: 'assistant',
						createdAt: new Date().toISOString(),
					},
					...recommendations.slice(0, 2).map((rec, index) => ({
						id: `seed-rec-${index}`,
						content: rec.description,
						role: 'assistant' as const,
						createdAt: new Date().toISOString(),
					})),
				];
				set({ messages: seeded });
			},
			clearMessages: () => set({ messages: [] }),
		}),
		{
			name: 'carbonwise-assistant',
			storage: createJSONStorage(() => localStorage),
		},
	),
);

export const assistantStore = useAssistantStore;
