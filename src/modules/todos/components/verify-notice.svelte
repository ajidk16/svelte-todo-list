<script lang="ts">
	import { resendVerificationEmail } from '../services/auth';

	let loading = $state(false);

	async function handleResend() {
		try {
			loading = true;
			await resendVerificationEmail();
			alert('Tautan verifikasi telah dikirim ulang ke email Anda.');
		} catch (e) {
			alert('Gagal mengirim ulang tautan verifikasi. Coba lagi.');
		} finally {
			loading = false;
		}
	}
</script>

<div class="mx-auto mt-16 max-w-7xl px-4 sm:px-6 lg:px-8">
	<div
		class="rounded-2xl border border-yellow-200 bg-yellow-50 p-6 text-center text-yellow-700 shadow-soft"
	>
		<h2 class="text-lg font-semibold">Verifikasi Email Diperlukan</h2>
		<p class="mt-2 text-sm">
			Silakan verifikasi email Anda untuk melanjutkan. Kami telah mengirim tautan verifikasi ke
			email Anda.
			<br />
			Jika belum menerima email, periksa spam atau
			<button
				class="ml-1 inline-block rounded bg-yellow-100 px-2 py-0.5 text-yellow-800 hover:bg-yellow-200 disabled:opacity-50"
				onclick={handleResend}
				disabled={loading}>kirim ulang verifikasi</button
			>
		</p>
	</div>
</div>
