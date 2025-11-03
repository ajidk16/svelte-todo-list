import { api } from '$lib/utils/api';
import { redirect, type Handle } from '@sveltejs/kit';
export const handle: Handle = async ({ event, resolve }) => {
	const token = event.cookies.get('auth');
	const protectedRoute = event.route.id?.startsWith('/(protected)');

	const { pathname } = event.url;

	const to = event.url.searchParams.get('to');
	const otp = event.url.searchParams.get('otp');
	if (otp && to) {
		const verifyEmail = await api('/auth/verify-email', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ otp })
		});

		if (verifyEmail.status === 200) {
			throw redirect(303, '/dashboard');
		}
	}

	if (pathname === '/auth/login' && token) {
		throw redirect(303, '/dashboard');
	}

	if (pathname === '/') {
		throw redirect(303, '/auth/login');
	}

	if (protectedRoute && !token) {
		throw redirect(303, '/auth/login');
	}

	return resolve(event);
};
