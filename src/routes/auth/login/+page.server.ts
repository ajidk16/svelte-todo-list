import { api } from '$lib/utils/api.js';
import { redirect, fail } from '@sveltejs/kit';

export const actions = {
	default: async ({ request, cookies }) => {
		const data = await request.formData();
		const username = data.get('username');
		const password = data.get('password');

		const res = await api('/auth/login', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ username, password })
		});

		cookies.set('auth', res?.token, {
			httpOnly: true,
			sameSite: 'none',
			secure: true,
			partitioned: false,
			maxAge: 60 * 60 * 24 * 7,
			path: '/'
		});

		cookies.set(
			'userProfile',
			JSON.stringify({
				id: res.data.id,
				username: res.data.username,
				name: res.data.name,
				verified: res.data.verifiedEmail
			}),
			{
				httpOnly: true,
				sameSite: 'none',
				secure: true,
				partitioned: false,
				maxAge: 60 * 60 * 24 * 7,
				path: '/'
			}
		);

		if (res.status !== 200) return fail(400, { message: 'Login gagal' });
		throw redirect(303, '/todo');
	}
};
