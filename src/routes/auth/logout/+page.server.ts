import { clearUserProfile } from '$lib/store/user';
import { redirect } from '@sveltejs/kit';

export const actions = {
	default: async ({ cookies }) => {
		cookies.delete('auth', { path: '/', expires: new Date(0) });
		cookies.delete('userProfile', { path: '/', expires: new Date(0) });

		clearUserProfile();

		throw redirect(303, '/auth/login');
	}
};
