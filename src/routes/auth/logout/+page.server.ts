import { api } from '$lib/utils/api.js';
import { redirect } from '@sveltejs/kit';

export const actions = {
	default: async ({ cookies }) => {
		// hapus cookie auth
		await api('/auth/logout', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' }
		});

		cookies.delete('auth', { path: '/' });

		throw redirect(303, '/auth/login');
	}
};
