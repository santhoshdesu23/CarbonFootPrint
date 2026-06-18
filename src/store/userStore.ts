import { create } from 'zustand';
import { readStorage, writeStorage } from '../services/storageService';
import type { User } from '../types/user';

const DEFAULT_USER: User = {
	id: 'user-carbonwise',
	name: 'Alex Green',
	email: 'alex@example.com',
	householdSize: 2,
	city: 'Seattle',
	preferredUnit: 'metric',
};

type UserState = {
	user: User;
	updateUser: (patch: Partial<User>) => void;
};

export const useUserStore = create<UserState>((set, get) => ({
	user: readStorage<User>('carbonwise-user', DEFAULT_USER),
	updateUser: (patch) => {
		const nextUser = { ...get().user, ...patch };
		writeStorage('carbonwise-user', nextUser);
		set({ user: nextUser });
	},
}));

export const userStore = useUserStore;
