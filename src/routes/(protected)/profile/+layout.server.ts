export const load = async ({ cookies }) => {
	return {
		user: JSON.parse(cookies.get('userProfile') || 'null')
	};
};
