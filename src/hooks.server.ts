import { setCookie } from '$lib/store/cookies';
import { redirect, type Handle } from '@sveltejs/kit';
export const handle: Handle = async ({ event, resolve }) => {
	const token = event.cookies.get('auth');
	const protectedRoute = event.route.id?.startsWith('/(protected)');

	setCookie('auth', token ?? '');

	const userProfile = event.cookies.get('userProfile');
	setCookie('userProfile', userProfile ?? '');

	const { pathname } = event.url;

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
