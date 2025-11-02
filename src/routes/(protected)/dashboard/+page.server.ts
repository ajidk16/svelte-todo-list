import { api } from '$lib/utils/api';

export const load = async ({ cookies }) => {
	const [todoStatus] = await Promise.all([api('/todo-status', { method: 'GET' })]);

	// if (todoStatus.status === 404) {
	// 	return { user: cookies.get('userProfile') || null };
	// }

	// if (todoStatus.status >= 400) {
	// 	return error(todoStatus.status, {
	// 		message: todoStatus.message || 'An error occurred while fetching todo status.'
	// 	});
	// }

	return {
		todoStatus,
		user: JSON.parse(cookies.get('userProfile') || 'null')
	};
};

export const actions = {
	verifyEmail: async ({ cookies }) => {
		const authToken = cookies.get('auth');

		console.log('authToken:', authToken);

		console.log('verifyEmail action called', authToken);

		const res = await api('/otp/send', {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${authToken}`,
				'Content-Type': 'application/json'
			}
		});

		return res;
	}
};
