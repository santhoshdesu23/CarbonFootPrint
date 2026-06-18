export type CarbonCategory = 'transport' | 'food' | 'energy' | 'shopping' | 'lifestyle';

export type WeeklyEmissionEntry = {
	weekLabel: string;
	kgCo2e: number;
};

export type MonthlyEmissionEntry = {
	monthLabel: string;
	kgCo2e: number;
};

export type CarbonInput = {
	transportKm: number;
	transportDaysPerWeek: number;
	meatMealsPerWeek: number;
	dairyMealsPerWeek: number;
	homeEnergyKwhPerMonth: number;
	shoppingSpendPerWeek: number;
	lifestyleHoursPerWeek: number;
};

export type CategoryEmission = {
	category: CarbonCategory;
	kgCo2e: number;
};

export type CarbonProfile = CarbonInput & {
	weeklyTrend: WeeklyEmissionEntry[];
	monthlyTrend: MonthlyEmissionEntry[];
	benchmarkKgCo2e: number;
	carbonScore: number;
	totalKgCo2e: number;
	categoryEmissions: CategoryEmission[];
};

export type CarbonScenario = {
	transportReductionPercent: number;
	foodReductionPercent: number;
	energyReductionPercent: number;
	shoppingReductionPercent: number;
	lifestyleReductionPercent: number;
};

export type ScenarioProjection = {
	projectedTotalKgCo2e: number;
	projectedCarbonScore: number;
	totalSavingsKgCo2e: number;
	projectedCategoryEmissions: CategoryEmission[];
	strongestLever: CarbonCategory;
	narrative: string;
};

export type Recommendation = {
	id: string;
	title: string;
	description: string;
	impactLabel: string;
	savingsKgCo2e: number;
	category: CarbonCategory | 'all';
};

export type Badge = {
	id: string;
	title: string;
	description: string;
	unlocked: boolean;
};
