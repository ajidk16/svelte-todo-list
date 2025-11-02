import { clearUserProfile } from '$lib/store/user';
import { api } from '$lib/utils/api';
import { redirect } from '@sveltejs/kit';

export const actions = {
	signOut: async ({ cookies }) => {
		cookies.delete('auth', { path: '/', expires: new Date(0) });
		cookies.delete('userProfile', { path: '/', expires: new Date(0) });

		clearUserProfile();

		throw redirect(303, '/auth/login');
	},
	verify: async ({ cookies }) => {
		const authToken = cookies.get('auth');

		console.log('verifyEmail action called', authToken);

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
