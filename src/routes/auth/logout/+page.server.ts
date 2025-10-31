import { redirect } from '@sveltejs/kit';

export const actions = {
	default: async ({ cookies }) => {
		// cookies.delete('auth', { path: '/' });
		// cookies.delete('userProfile', { path: '/' });

		cookies.delete('auth', { path: '/', expires: new Date(0) });
		cookies.delete('userProfile', { path: '/', expires: new Date(0) });

		throw redirect(303, '/auth/login');
	}
};
