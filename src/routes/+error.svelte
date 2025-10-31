<script lang="ts">
	import { page } from '$app/state';
	import { Navbar } from '$lib/components/shared';

	const title = page?.status === 404 ? 'Halaman tidak ditemukan' : 'Terjadi kesalahan';
	const message = page?.error?.message ?? 'Maaf, ada yang tidak beres.';

	// Marketing tagline

	const details = import.meta.env.DEV ? (page?.error?.message ?? page?.error?.message) : null;

	let copied = false;
	const copyDetails = async () => {
		const text = `[${page?.status}] ${title}: ${message}\n\n${details ?? ''}`.trim();
		try {
			await navigator.clipboard.writeText(text);
			copied = true;
			setTimeout(() => (copied = false), 1400);
		} catch {}
	};

	const goBack = () => {
		if (history.length > 1) history.back();
		else location.href = '/';
	};
</script>

<section
	class="min-h-screen bg-linear-to-b from-slate-50 to-white text-slate-800 dark:from-slate-900 dark:to-slate-950 dark:text-slate-100"
>
	<Navbar />

	<main class="mx-auto max-w-5xl px-6 py-12 flex flex-col justify-center min-h-[calc(100vh-4rem)]">
		<div class="grid items-start gap-8 md:grid-cols-[1fr_380px]">
			<section class="space-y-6">
				<div
					class="inline-flex items-center gap-2 rounded-full border border-slate-200 px-3 py-1 text-xs text-slate-500 dark:border-slate-800"
				>
					<span class="inline-flex size-2 animate-pulse rounded-full bg-rose-500"></span>
					<span>Status</span>
					<span class="font-semibold text-slate-700 dark:text-slate-200"
						>{page.status ?? 'Unknown'}</span
					>
				</div>

				<h1 class="text-3xl font-bold tracking-tight md:text-4xl">
					{title}
				</h1>
				<p class="leading-relaxed text-slate-600 dark:text-slate-300">
					{message}
				</p>

				<div class="flex flex-wrap gap-2 pt-2">
					<button
						on:click={goBack}
						class="rounded-xl border border-slate-300 px-4 py-2 text-sm hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800"
						>Kembali</button
					>
					<a
						href="/"
						class="rounded-xl bg-indigo-600 px-4 py-2 text-sm text-white hover:bg-indigo-700"
						>Ke Beranda</a
					>
					<button
						on:click={copyDetails}
						class="rounded-xl bg-slate-900 px-4 py-2 text-sm text-white hover:bg-slate-800 dark:bg-slate-200 dark:text-slate-900 dark:hover:bg-white"
					>
						{#if copied}Tersalin{/if}{#if !copied}Salin detail{/if}
					</button>
				</div>
			</section>

			<aside class="sticky top-20">
				<div
					class="rounded-2xl border border-slate-200 bg-white/70 p-5 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-900/70"
				>
					<div class="flex items-center justify-between">
						<h2 class="font-semibold">Detail</h2>
						<span class="text-xs text-slate-500">debug</span>
					</div>
					<div class="mt-3 text-xs">
						<div
							class="grid grid-cols-3 gap-2 border-b border-slate-100 py-2 dark:border-slate-800"
						>
							<div class="text-slate-500">Status</div>
							<div class="col-span-2 font-medium">{page.status ?? 'Unknown'}</div>
						</div>
						<div
							class="grid grid-cols-3 gap-2 border-b border-slate-100 py-2 dark:border-slate-800"
						>
							<div class="text-slate-500">Message</div>
							<div class="col-span-2 font-medium wrap-break-word">{message}</div>
						</div>
						<div class="py-2">
							<div class="mb-2 text-slate-500">Trace</div>
							{#if details}
								<pre
									class="max-h-64 overflow-auto rounded-xl bg-slate-950 p-3 text-[11px] leading-relaxed text-white"><code
										>{details ?? 'Tidak tersedia di produksi.'}</code
									></pre>
							{:else}
								<div class="text-slate-500">Tidak tersedia di produksi.</div>
							{/if}
						</div>
					</div>
				</div>

				<div
					aria-hidden="true"
					class="mt-6 rounded-2xl border border-slate-200 bg-linear-to-br from-indigo-50 to-purple-50 p-5 dark:border-slate-800 dark:from-indigo-950/40 dark:to-purple-950/30"
				>
					<div class="flex items-center gap-3">
						<svg viewBox="0 0 24 24" class="size-10 text-indigo-600"
							><path
								fill="currentColor"
								d="M12 2a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2m1 15h-2v-2h2Zm0-4h-2V7h2Z"
							/></svg
						>
						<div>
							<p class="font-semibold">Butuh bantuan?</p>
							<p class="text-sm text-slate-600 dark:text-slate-400">
								Kontak support atau cek log server.
							</p>
						</div>
					</div>
				</div>
			</aside>
		</div>
	</main>
</section>
