import { api } from '$lib/utils/api';
import { error } from '@sveltejs/kit';

export const load = async () => {
	const [todoStatus] = await Promise.all([api('/todo-status', { method: 'GET' })]);

	if (todoStatus.status === 404) {
		throw error(404, 'Todo status endpoint not found.');
	}

	if (todoStatus.status >= 400) {
		return error(todoStatus.status, {
			message: todoStatus.message || 'An error occurred while fetching todo status.'
		});
	}

	return {
		todoStatus
	};
};
