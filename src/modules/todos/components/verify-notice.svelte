<script lang="ts">
	import { enhance } from '$app/forms';
	import { Button } from '$lib/components/shared';
	import type { UserProfile } from '$lib/store/user';

	const { user } = $props<{ user: UserProfile }>();

	let loading = $state(false);
</script>

<div
	class="flex min-h-[calc(100vh-150px)] items-center justify-center px-2 py-8 sm:px-4 sm:py-12 md:px-6 lg:px-8"
>
	<div
		class="w-full max-w-sm rounded-2xl bg-white p-4 shadow-lg ring-1 ring-indigo-100 sm:max-w-md sm:p-8 lg:rounded-3xl lg:shadow-xl"
	>
		<div class="flex flex-col items-center">
			<svg
				class="mb-4 h-10 w-10 text-indigo-500 sm:h-12 sm:w-12"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				viewBox="0 0 24 24"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M16 12V8a4 4 0 10-8 0v4M5 12h14l-1.5 8h-11L5 12z"
				/>
			</svg>
			<h2 class="mb-2 text-xl font-bold text-indigo-700 sm:text-2xl">
				Verifikasi Email Diperlukan
			</h2>
			<p class="mb-3 text-center text-base font-medium text-gray-700">
				<span class="font-bold text-indigo-600 capitalize">Hai {user.username}</span>, amankan
				akunmu dan nikmati semua fitur eksklusif dengan memverifikasi email sekarang!
			</p>
			<p class="mb-6 text-center text-sm text-gray-500">
				Kami telah mengirimkan tautan verifikasi ke email Anda.<br />
				Silakan cek inbox Anda untuk melanjutkan.<br />
				Jika belum menerima email, periksa folder spam atau klik tombol di bawah untuk mengirim ulang.
			</p>
			<form
				method="POST"
				action="?/verifyEmail"
				use:enhance={() => {
					loading = true;

					setTimeout(() => {
						loading = false;
					}, 2000);
				}}
			>
				<Button type="submit" variant="primary" disabled={loading} className="w-full sm:w-auto">
					{#if loading}
						<span class="flex items-center justify-center">
							<svg class="mr-2 h-4 w-4 animate-spin" viewBox="0 0 24 24">
								<circle
									class="opacity-25"
									cx="12"
									cy="12"
									r="10"
									stroke="currentColor"
									stroke-width="4"
									fill="none"
								/>
								<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
							</svg>
							Mengirim...
						</span>
					{:else}
						Verifikasi Sekarang
					{/if}
				</Button>
			</form>
		</div>
	</div>
</div>
