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

/** Extracts only the raw CarbonInput fields from a CarbonProfile, dropping computed fields. */
const extractInput = (profile: CarbonProfile): CarbonInput => ({
	transportKm: profile.transportKm,
	transportDaysPerWeek: profile.transportDaysPerWeek,
	meatMealsPerWeek: profile.meatMealsPerWeek,
	dairyMealsPerWeek: profile.dairyMealsPerWeek,
	homeEnergyKwhPerMonth: profile.homeEnergyKwhPerMonth,
	shoppingSpendPerWeek: profile.shoppingSpendPerWeek,
	lifestyleHoursPerWeek: profile.lifestyleHoursPerWeek,
});

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
				set({ ...buildStateFromInput({ ...extractInput(get().profile), ...input }) });
			},
			resetProfile: () => {
				set({ ...buildStateFromInput(DEFAULT_INPUT) });
			},
		}),
		{
			name: 'carbonwise-carbon-store',
			storage: createJSONStorage(() => localStorage),
			partialize: (state) => ({ input: extractInput(state.profile) } satisfies CarbonPersistedState),
			merge: (persisted, current) => {
				const hydratedInput = (persisted as CarbonPersistedState | undefined)?.input ?? DEFAULT_INPUT;
				return { ...current, ...buildStateFromInput(hydratedInput) };
			},
		},
	),
);
