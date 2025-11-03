import { PUBLIC_BACKEND_URL } from '$env/static/public';

export const api = async (url: string, options: RequestInit = {}) => {
	const res = await fetch(`${PUBLIC_BACKEND_URL}${url}`, {
		...options,
		credentials: 'include'
	});

	return await res.json();
};
