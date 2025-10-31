import { api } from '$lib/utils/api.js';
import { error } from '@sveltejs/kit';

export const load = async ({ url, cookies }) => {
	console.log('apa itu url', url.pathname);

	const kanban = await api('/todo-status', {
		method: 'GET'
	});

	if (kanban.status === 404) {
		throw error(404, 'Kanban endpoint not found.');
	}

	return { kanban: kanban, auth: cookies.get('auth') };
};
