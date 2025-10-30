import { api } from '$lib/utils/api';

export async function resendVerificationEmail() {
	const res = await api('/otp/send', {
		method: 'GET'
	});

	console.log('resendVerificationEmail', res);
	// if (!res.ok) throw new Error('Failed to resend verification');
	return res;
}
