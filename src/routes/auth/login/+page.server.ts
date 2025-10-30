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
	default: async ({ request }) => {
		const data = await request.formData();
		const username = data.get('username');
		const password = data.get('password');

		const res = await api('/auth/login', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ username, password })
		});

		// cookies.set('token', res?.token, {
		// 	httpOnly: true,
		// 	path: '/',
		// 	sameSite: 'strict'
		// });

		if (res.status !== 200) return fail(400, { message: 'Login gagal' });
		throw redirect(303, '/todo');
	}
};
