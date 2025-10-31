import { api } from '$lib/utils/api.js';
import { redirect, fail } from '@sveltejs/kit';

// export const load = async ({ cookies }) => {
// 	// const token = cookies.get('token');
// 	// if (!token) throw redirect(303, '/auth/login');
// 	// return { loggedIn: true };
//     console.log('Load login page',cookies);
//     return {
//         loggedIn: cookies
//     };
// };

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

		console.log('Login response:', res);

		cookies.set('auth', res?.token, {
			httpOnly: true,
			sameSite: 'strict',
			secure: true,
			partitioned: true,
			maxAge: 60 * 60 * 24 * 7,
			path: '/'
		});

		cookies.set('userProfile', JSON.stringify({
			id: res.data.id,
			username: res.data.username,
			name: res.data.name,
			verified: res.data.verifiedEmail,
		}), {
			httpOnly: true,
			sameSite: 'strict',
			secure: true,
			partitioned: true,
			maxAge: 60 * 60 * 24 * 7,
			path: '/'
		});

		if (res.status !== 200) return fail(400, { message: 'Login gagal' });
		throw redirect(303, '/todo');
	}
};
