import type { Actions } from './$types';

export const actions = {
	login: async (event) => {
		console.log('login action', event);
	},
	register: async ({ request }) => {
        const formData = await request.formData();
		console.log('register action', formData);
	}
} satisfies Actions;
