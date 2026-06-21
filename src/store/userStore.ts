import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { User } from '../types/user';

// Placeholder defaults — replace with real onboarding data before production.
const DEFAULT_USER: User = {
	id: 'user-carbonwise',
	name: 'Your Name',
	email: 'you@example.com',
	householdSize: 2,
	city: 'Your City',
	preferredUnit: 'metric',
};

type UserState = {
	user: User;
	updateUser: (patch: Partial<User>) => void;
};

export const useUserStore = create<UserState>()(
	persist(
		(set, get) => ({
			user: DEFAULT_USER,
			updateUser: (patch) => {
				set({ user: { ...get().user, ...patch } });
			},
		}),
		{
			name: 'carbonwise-user',
			storage: createJSONStorage(() => localStorage),
		},
	),
);

export const userStore = useUserStore;
