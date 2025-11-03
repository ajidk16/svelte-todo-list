import { api } from '$lib/utils/api';

export const load = async ({ cookies }) => {
	const [todoStatus] = await Promise.all([
		api('/todo-status', {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${cookies.get('auth')}`,
				'Content-Type': 'application/json'
			}
		})
	]);

	const profile = await api('/auth/profile', {
		method: 'GET',
		headers: {
			Authorization: `Bearer ${cookies.get('auth')}`,
			'Content-Type': 'application/json'
		}
	});

	return {
		todoStatus,
		user: profile.data,
		cookies: cookies.get('auth')
	};
};

export const actions = {
	verifyEmail: async ({ cookies }) => {
		const authToken = cookies.get('auth');

		const res = await api('/otp/send', {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${authToken}`,
				'Content-Type': 'application/json'
			}
		});

		return res;
	}
};
