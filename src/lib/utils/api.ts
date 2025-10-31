import { PUBLIC_BACKEND_URL } from '$env/static/public';
import { getToken } from '$lib/store/cookies';

export const api = async (url: string, options: RequestInit = {}) => {
	const token = getToken('auth') ?? '';
	const headers = {
		...(token ? { Authorization: `Bearer ${token}` } : undefined),
		...options.headers
	};

	const res = await fetch(`${PUBLIC_BACKEND_URL}${url}`, {
		...options,
		headers,
		credentials: 'include'
	});

	return await res.json();
};
