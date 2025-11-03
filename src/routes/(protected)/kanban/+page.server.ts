import { api } from '$lib/utils/api.js';
import { error } from '@sveltejs/kit';

export const load = async ({ cookies }) => {
	const kanban = await api('/todo-status?status=true', {
		method: 'GET',
		headers: {
			Authorization: `Bearer ${cookies.get('auth')}`,
			'Content-Type': 'application/json'
		}
	});

	if (kanban.status === 404) {
		throw error(404, 'Kanban endpoint not found.');
	}

	return { kanban: kanban, auth: cookies.get('auth') };
};
