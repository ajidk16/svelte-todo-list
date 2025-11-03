import { api } from '$lib/utils/api.js';

export const load = async ({ cookies }) => {
	const profile = await api('/auth/profile', {
		method: 'GET',
		headers: {
			Authorization: `Bearer ${cookies.get('auth')}`,
			'Content-Type': 'application/json'
		}
	});

	return {
		me: profile
	};
};
