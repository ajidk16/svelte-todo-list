import { api } from '$lib/utils/api.js';
import type { Actions } from './$types.js';
import { fail } from '@sveltejs/kit';

export const load = async ({ url }) => {
	const page = Number(url.searchParams.get('page')) || 1;
	const limit = Number(url.searchParams.get('limit')) || 5;
	const search = url.searchParams.get('search') ?? '';
	const dateFilter = url.searchParams.get('date-filter') || '';

	const [todos, tags, todoStatus] = await Promise.all([
		api(`/todos?page=${page}&limit=${limit}&search=${search}&dateFilter=${dateFilter}`, { method: 'GET' }),
		api('/tags', { method: 'GET' }),
		api('/todo-status', { method: 'GET' })
	]);

	if (!todos || !tags || !todoStatus) {
		fail(403, { message: 'Forbidden' });
	}

	return {
		todos,
		tags,
		todoStatus
	};
};

export const actions = {
	// Define your form actions here
	addTodo: async ({ request, cookies }) => {
		const formData = await request.formData();
		const todo = {
			title: formData.get('title'),
			description: formData.get('description'),
			priority: formData.get('priority'),
			status: formData.get('status'),
			tags: formData.get('tags')
		};

		const response = await api('/todos', {
			method: 'POST',
			body: JSON.stringify(todo),
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${cookies.get('auth')}`
			}
		});

		return response;
	},
	updateTodo: async ({ request, cookies }) => {
		const formData = await request.formData();

		const todoId = formData.get('id');
		if (!todoId) fail(400, { id: 'ID is required for updating a todo' });

		const todo = {
			title: formData.get('title'),
			description: formData.get('description'),
			priority: formData.get('priority'),
			status: formData.get('status'),
			tags: formData.get('tags')
		};

		const response = await api(`/todos/${todoId}`, {
			method: 'PUT',
			body: JSON.stringify(todo),
			headers: {
				Authorization: `Bearer ${cookies.get('auth')}`,
				'Content-Type': 'application/json'
			}
		});

		// return response;
		// remove modal from page.svelte after update
		return {
			...response,
			closeModal: false
		};
	},
	deleteTodo: async ({ request, cookies }) => {
		const formData = await request.formData();
		const todoId = formData.get('id');

		const response = await api(`/todos/${todoId}`, {
			method: 'DELETE',
			headers: {
				Authorization: `Bearer ${cookies.get('auth')}`,
				'Content-Type': 'application/json'
			}
		});

		return response;
	}
} satisfies Actions;
