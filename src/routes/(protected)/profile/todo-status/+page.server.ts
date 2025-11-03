import { api } from '$lib/utils/api.js';

export const load = async ({ url, cookies }) => {
	const page = Number(url.searchParams.get('page')) || 1;
	const limit = Number(url.searchParams.get('limit')) || 10;
	const search = url.searchParams.get('search') ?? '';

	const params = new URLSearchParams();
	params.set('page', String(page));
	params.set('limit', String(limit));
	if (search) params.set('search', search);

	const todoStatuses = await api(`/todo-status?${params.toString()}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${cookies.get('auth')}`
		}
	});

	return {
		todoStatus: todoStatuses
	};
};

export const actions = {
	create: async ({ request, cookies }) => {
		const formData = await request.formData();
		const name = formData.get('name');
		const label = formData.get('label');
		const color = formData.get('color');
		const sortOrder = formData.get('sortOrder') || 0;

		if (!name || !label || !color) {
			return { error: 'Name, label, and color are required.' };
		}

		const newTodoStatus = {
			name,
			label,
			color,
			sortOrder: Number(sortOrder)
		};

		const createdTodoStatus = await api('/todo-status', {
			method: 'POST',
			body: JSON.stringify(newTodoStatus),
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${cookies.get('auth')}`
			}
		});

		return { createdTodoStatus };
	},
	update: async ({ request, cookies }) => {
		const formData = await request.formData();
		const id = formData.get('id');
		const name = formData.get('name');
		const label = formData.get('label');
		const color = formData.get('color');
		const sortOrder = formData.get('sortOrder') || 0;

		if (!id || !name || !label || !color) {
			return { error: 'ID, name, label, and color are required.' };
		}

		const updatedTodoStatus = {
			name,
			label,
			color,
			sortOrder: Number(sortOrder)
		};

		const result = await api(`/todo-status/${id}`, {
			method: 'PUT',
			body: JSON.stringify(updatedTodoStatus),
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${cookies.get('auth')}`
			}
		});

		return { result };
	},
	delete: async ({ request, cookies }) => {
		const formData = await request.formData();
		const id = formData.get('id');

		await api(`/todo-status/${id}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${cookies.get('auth')}`
			}
		});

		return { success: true };
	}
};
