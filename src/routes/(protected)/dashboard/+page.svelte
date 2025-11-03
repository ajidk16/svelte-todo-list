<script lang="ts">
	import { page } from '$app/state';
	import { onMount } from 'svelte';
	import StatsCards from '../../../modules/todos/components/stats-cards.svelte';
	import VerifyNotice from '../../../modules/todos/components/verify-notice.svelte';
	import { api } from '$lib/utils/api';
	import { Button, Modal } from '$lib/components/shared';
	import { goto } from '$app/navigation';

	let { data } = $props();
	const todoStatus = $derived(data.todoStatus.data);

	const otp = page.url.searchParams.get('otp');
	const to = page.url.searchParams.get('to');

	let modal = $state(false);

	onMount(async () => {
		if (otp === null) return;
		const res = await api(`/otp/verify?otp=${otp}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				otp: otp,
				to: to
			})
		});

		// Update cookie userProfile setelah verifikasi berhasil
		if (res.status === 200 && res.data) {
			const userProfile = {
				id: res.data.data.id,
				username: res.data.data.username,
				email: res.data.data.email,
				verified: res.data.data.verifiedEmail
			};

			console.log('cek user profile', userProfile);

			document.cookie = `userProfile=${encodeURIComponent(
				JSON.stringify(userProfile)
			)}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=None; Secure`;

			// alert('Akun Anda telah berhasil diverifikasi.');
			modal = true;
		}
	});
</script>

<div>
	{#if data.user.verified === false}
		<VerifyNotice user={data.user} />
	{:else}
		<StatsCards todosStatus={todoStatus} />
	{/if}
	<!-- <StatsCards todosStatus={todoStatus} /> -->
</div>

{#if modal}
	<Modal isOpen={modal} title="" onClose={() => (modal = false)}>
		<div class="flex flex-col items-center justify-center space-y-4 p-6">
			<div class="mb-2 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
				<svg
					class="h-10 w-10 text-green-500"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					viewBox="0 0 24 24"
				>
					<path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
				</svg>
			</div>
			<h2 class="text-center text-2xl font-bold text-green-700">Verifikasi Berhasil!</h2>
			<p class="text-center text-gray-600">
				Email Anda telah berhasil diverifikasi! 🎉<br />
				Sekarang Anda dapat menggunakan semua fitur aplikasi tanpa batasan.
			</p>
			<Button
				className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded shadow"
				onClick={() => {
					window.location.reload();
					modal = false;
				}}
			>
				Tutup
			</Button>
		</div>
	</Modal>
{/if}
