import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { buildCarbonProfile, estimateMonthlySavings } from '../services/carbonEngine';
import { buildBenchmarkComparison, buildCategoryChartData, buildTrendChartData } from '../services/analyticsService';
import { getRecommendations } from '../services/recommendationEngine';
import type { CarbonInput, CarbonProfile, Recommendation } from '../types/carbon';

const DEFAULT_INPUT: CarbonInput = {
	transportKm: 42,
	transportDaysPerWeek: 5,
	meatMealsPerWeek: 6,
	dairyMealsPerWeek: 10,
	homeEnergyKwhPerMonth: 320,
	shoppingSpendPerWeek: 140,
	lifestyleHoursPerWeek: 12,
};

type CarbonState = {
	profile: CarbonProfile;
	recommendations: Recommendation[];
	benchmarkData: ReturnType<typeof buildBenchmarkComparison>;
	categoryChartData: ReturnType<typeof buildCategoryChartData>;
	trendChartData: ReturnType<typeof buildTrendChartData>;
	monthlySavingsEstimate: number;
	updateInput: (input: Partial<CarbonInput>) => void;
	resetProfile: () => void;
};

type CarbonPersistedState = {
	input: CarbonInput;
};

const buildStateFromInput = (input: CarbonInput): Omit<CarbonState, 'updateInput' | 'resetProfile'> => {
	const profile = buildCarbonProfile(input);

	return {
		profile,
		recommendations: getRecommendations(profile),
		benchmarkData: buildBenchmarkComparison(profile),
		categoryChartData: buildCategoryChartData(profile),
		trendChartData: buildTrendChartData(profile),
		monthlySavingsEstimate: estimateMonthlySavings(profile, 12),
	};
};

export const useCarbonStore = create<CarbonState>()(
	persist(
		(set, get) => ({
			...buildStateFromInput(DEFAULT_INPUT),
			updateInput: (input) => {
				const p = get().profile;
				const currentInput: CarbonInput = {
					transportKm: p.transportKm,
					transportDaysPerWeek: p.transportDaysPerWeek,
					meatMealsPerWeek: p.meatMealsPerWeek,
					dairyMealsPerWeek: p.dairyMealsPerWeek,
					homeEnergyKwhPerMonth: p.homeEnergyKwhPerMonth,
					shoppingSpendPerWeek: p.shoppingSpendPerWeek,
					lifestyleHoursPerWeek: p.lifestyleHoursPerWeek,
				};
				set({ ...buildStateFromInput({ ...currentInput, ...input }) });
			},
			resetProfile: () => {
				set({ ...buildStateFromInput(DEFAULT_INPUT) });
			},
		}),
		{
			name: 'carbonwise-carbon-store',
			storage: createJSONStorage(() => localStorage),
			partialize: (state) => ({
				input: {
					transportKm: state.profile.transportKm,
					transportDaysPerWeek: state.profile.transportDaysPerWeek,
					meatMealsPerWeek: state.profile.meatMealsPerWeek,
					dairyMealsPerWeek: state.profile.dairyMealsPerWeek,
					homeEnergyKwhPerMonth: state.profile.homeEnergyKwhPerMonth,
					shoppingSpendPerWeek: state.profile.shoppingSpendPerWeek,
					lifestyleHoursPerWeek: state.profile.lifestyleHoursPerWeek,
				},
			} satisfies CarbonPersistedState),
			merge: (persisted, current) => {
				const hydratedInput = (persisted as CarbonPersistedState | undefined)?.input ?? DEFAULT_INPUT;
				return { ...current, ...buildStateFromInput(hydratedInput) };
			},
		},
	),
);
