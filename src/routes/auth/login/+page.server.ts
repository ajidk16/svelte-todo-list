import { api } from '$lib/utils/api.js';
import { redirect, fail } from '@sveltejs/kit';

export const actions = {
	login: async ({ request, cookies }) => {
		const data = await request.formData();
		const username = data.get('username');
		const password = data.get('password');

		const res = await api('/auth/login', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ username, password })
		});

		if (res.status !== 200) return fail(400, res);

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
				email: res.data.email,
				verified: res.data.verified
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

		throw redirect(303, '/dashboard');
	},
	register: async ({ request, cookies }) => {
		const data = await request.formData();
		const username = data.get('username');
		const email = data.get('email');
		const password = data.get('password');

		const res = await api('/auth/register', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ username, email, password })
		});

		if (res.status !== 200) return fail(400, { message: 'Registrasi gagal' });

		const login = await api('/auth/login', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ username, password })
		});

		if (login.status !== 200) return fail(400, { message: 'Login gagal' });

		cookies.set('auth', login?.token, {
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
				id: login.data.id,
				username: login.data.username,
				email: login.data.email,
				verified: login.data.verified
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

		throw redirect(303, '/dashboard');
	}
};
