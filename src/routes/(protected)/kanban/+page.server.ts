import { api } from '$lib/utils/api.js';
// import { error } from 'console';

export const load = async ({ url, cookies }) => {
	console.log('apa itu url', url.pathname);

	const kanban = await api('/todo-status', {
		method: 'GET'
	});

	// error(403, 'data kosong');

	// console.log(kanban);

	return { kanban: kanban, auth: cookies.get('auth') };
};
