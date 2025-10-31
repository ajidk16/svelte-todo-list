import { redirect } from '@sveltejs/kit';

export const actions = {
	default: async ({ cookies }) => {
		cookies.delete('auth', { path: '/' });
		cookies.delete('userProfile', { path: '/' });

		throw redirect(303, '/auth/login');
	}
};
