import { get, writable } from 'svelte/store';

export type UserProfile = {
	id: string;
	username: string;
	email: string;
	verified: boolean;
};

export const profileStore = writable<UserProfile | null>(null);

export const setUserProfile = (profile: UserProfile) => {
	profileStore.set(profile);
};

export const getUserProfile = (): UserProfile | null => {
	return get(profileStore);
};

export const clearUserProfile = () => {
	profileStore.set(null);
};
