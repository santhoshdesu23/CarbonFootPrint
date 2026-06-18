import type { Badge } from '../types/carbon';

export const badges: Badge[] = [
	{
		id: 'badge-score-starter',
		title: 'Score Starter',
		description: 'Achieved a baseline carbon score of 50 or above.',
		unlocked: true,
	},
	{
		id: 'badge-efficiency-builder',
		title: 'Efficiency Builder',
		description: 'Improved emissions across the highest-impact category.',
		unlocked: false,
	},
	{
		id: 'badge-sustainability-leader',
		title: 'Sustainability Leader',
		description: 'Maintained a score above 80 for a full month.',
		unlocked: false,
	},
];
