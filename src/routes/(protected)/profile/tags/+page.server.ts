import { api } from '$lib/utils/api.js';

export const load = async ({ url, cookies }) => {
	const page = Number(url.searchParams.get('page')) || 1;
	const limit = Number(url.searchParams.get('limit')) || 10;
	const search = url.searchParams.get('search') ?? '';

	const params = new URLSearchParams();
	params.set('page', String(page));
	params.set('limit', String(limit));
	if (search) params.set('search', search);

	const tags = await api(`/tags?${params.toString()}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${cookies.get('auth')}`
		}
	});

	return {
		tags: tags
	};
};

export const actions = {
	create: async ({ request, cookies }) => {
		const formData = await request.formData();
		const name = formData.get('name');
		const color = formData.get('color');

		const newTag = {
			name,
			color
		};

		const createdTag = await api('/tags', {
			method: 'POST',
			body: JSON.stringify(newTag),
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${cookies.get('auth')}`
			}
		});

		return { createdTag };
	},
	update: async ({ request, cookies }) => {
		const formData = await request.formData();
		const id = formData.get('id');
		const name = formData.get('name');
		const color = formData.get('color');

		const updatedTag = {
			name,
			color
		};

		const result = await api(`/tags/${id}`, {
			method: 'PUT',
			body: JSON.stringify(updatedTag),
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

		const result = await api(`/tags/${id}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${cookies.get('auth')}`
			}
		});

		return { result };
	}
};
