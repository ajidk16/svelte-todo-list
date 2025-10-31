<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import { AlarmClockCheck, ArrowRight, Loader } from 'lucide-svelte';
	let showPassword = $state(false);
	let dark = false;

	if (typeof window !== 'undefined') {
		dark =
			localStorage.getItem('theme') === 'dark' ||
			(!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
		document.documentElement.classList.toggle('dark', dark);
	}

	const year = new Date().getFullYear();

	let isPageLoaded = $state(false);
	let loading = $state(false);
	let errorMessage = $state('');
</script>

<div class="bg-gray-50 text-gray-800 dark:bg-gray-950 dark:text-gray-100">
	<div class="grid min-h-dvh md:grid-cols-2">
		<aside
			class="relative hidden items-center justify-center overflow-hidden bg-linear-to-br from-brand-600 via-brand-700 to-brand-900 p-10 md:flex"
		>
			<div
				class="absolute inset-0 opacity-20 [background:radial-gradient(600px_200px_at_10%_10%,white_10%,transparent_60%)]"
			></div>
			<div class="relative z-10 max-w-md text-brand-50">
				<div class="mb-10 flex items-center gap-3">
					<div
						class="grid h-10 w-10 place-items-center rounded-2xl bg-white/15 ring-1 ring-white/30 backdrop-blur"
					>
						<AlarmClockCheck size={24} />
					</div>
					<span class="text-xl font-semibold tracking-tight">ToDo List</span>
				</div>
				<h1 class="text-3xl/9 font-semibold">Kelola aktivitas Anda dengan mudah dan efisien.</h1>
				<p class="mt-3 text-brand-100/90">
					Antarmuka intuitif, performa responsif, dan pengalaman konsisten di setiap halaman.
				</p>
			</div>
		</aside>

		<!-- Panel form -->
		<main class="flex items-center justify-center p-6 md:p-10">
			<div class="w-full max-w-md">
				<div
					class="rounded-2xl bg-white/90 p-6 shadow-soft ring-1 ring-gray-200/70 backdrop-blur md:p-8 dark:bg-gray-900/70 dark:ring-white/5"
				>
					<div class="mb-6">
						<h2 class="text-2xl font-semibold tracking-tight">
							{isPageLoaded === false ? 'Masuk' : 'Daftar'}
						</h2>
						<p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
							{isPageLoaded
								? 'Gunakan username dan kata sandi akunmu.'
								: 'Buat akun baru untuk memulai.'}
						</p>
					</div>

					{#if errorMessage}
						<p class="mb-2 text-sm text-red-600">{errorMessage}</p>
					{/if}

					<!-- svelte-ignore component_name_lowercase -->
					<form
						method="POST"
						class="space-y-5"
						action={isPageLoaded === false ? '?/login' : '?/register'}
						use:enhance={() => {
							loading = true;

							return async ({ result }: any) => {
								errorMessage = result?.data?.message || '';
								loading = false;
								goto('/dashboard');
								// `result` is an `ActionResult` object
								// `update` is a function which triggers the default logic that would be triggered if this callback wasn't set
							};
						}}
					>
						<div>
							<label for="username" class="mb-1 block text-sm font-medium">Username</label>
							<input
								id="username"
								name="username"
								required
								placeholder="kamu@contoh.com"
								class="w-full rounded-xl border border-gray-300/80 bg-white px-3.5 py-2.5 text-sm ring-2 ring-transparent outline-none focus:border-brand-500 focus:ring-brand-200 dark:border-white/10 dark:bg-gray-900 dark:focus:ring-brand-800"
							/>
						</div>

						{#if isPageLoaded === true}
							<div>
								<label for="email" class="mb-1 block text-sm font-medium">Email</label>
								<input
									id="email"
									name="email"
									type="email"
									required
									placeholder="kamu@contoh.com"
									class="w-full rounded-xl border border-gray-300/80 bg-white px-3.5 py-2.5 text-sm ring-2 ring-transparent outline-none focus:border-brand-500 focus:ring-brand-200 dark:border-white/10 dark:bg-gray-900 dark:focus:ring-brand-800"
								/>
							</div>
						{/if}

						<div>
							<label for="password" class="mb-1 block text-sm font-medium">Kata Sandi</label>
							<div class="relative">
								<input
									id="password"
									name="password"
									type={showPassword ? 'text' : 'password'}
									placeholder="••••••••"
									autocomplete="current-password"
									required
									class="w-full rounded-xl border border-gray-300/80 bg-white px-3.5 py-2.5 pr-11 text-sm ring-2 ring-transparent outline-none focus:border-brand-500 focus:ring-brand-200 dark:border-white/10 dark:bg-gray-900 dark:focus:ring-brand-800"
								/>
								<button
									onclick={() => {
										showPassword = !showPassword;
									}}
									type="button"
									aria-label="Tampilkan sandi"
									class="absolute inset-y-0 right-2.5 my-auto grid h-8 w-8 place-items-center rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-white/10"
								>
									{#if showPassword}
										<svg class="h-5 w-5" viewBox="0 0 24 24" fill="none">
											<path d="M3 3l18 18" stroke="currentColor" stroke-width="1.6" />
											<path
												d="M2 12s3.5-7 10-7c2.1 0 3.9.6 5.4 1.4M22 12s-3.5 7-10 7c-2.1 0-3.9-.6-5.4-1.4"
												stroke="currentColor"
												stroke-width="1.6"
												opacity=".7"
											/>
										</svg>
									{:else}
										<svg class="h-5 w-5" viewBox="0 0 24 24" fill="none">
											<path
												d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z"
												stroke="currentColor"
												stroke-width="1.6"
											/>
											<circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="1.6" />
										</svg>
									{/if}
								</button>
							</div>
						</div>

						<div class="flex items-center justify-between">
							<label class="inline-flex items-center gap-2 text-sm">
								<input
									type="checkbox"
									class="size-4 rounded border-gray-300 text-brand-600 focus:ring-brand-500"
								/>
								Ingat saya
							</label>
							<!-- <button type="button" class="text-sm text-gray-600 dark:text-gray-300"
								>Toggle tema</button
							> -->
						</div>

						<button
							type="submit"
							class="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand-600 px-4 py-2.5 text-sm font-medium text-white transition-all duration-200 hover:bg-brand-700 focus:ring-4 focus:outline-none"
							disabled={loading}
						>
							{#if loading}
								<span class="animate-spin">
									<Loader size={16} />
								</span>
								<span class="animate-pulse">Memuat...</span>
							{:else}
								<span class="transition-transform duration-200 group-hover:translate-x-1">
									<ArrowRight size={16} />
								</span>
								{isPageLoaded === false ? 'Masuk' : 'Daftar'}
							{/if}
						</button>
					</form>

					<!-- Footer -->
					<hr class="my-6 border-gray-200 dark:border-gray-800" />
					<div class="text-center text-sm text-gray-600 dark:text-gray-300">
						{isPageLoaded === false ? 'Belum punya akun? ' : 'Sudah punya akun? '}
						<button
							onclick={() => {
								isPageLoaded = !isPageLoaded;
							}}
							class="cursor-pointer font-medium text-brand-600 hover:underline"
							>{isPageLoaded === false ? 'Daftar di sini' : 'Masuk di sini'}</button
						>
					</div>

					<p class="mt-6 text-center text-sm text-gray-600 dark:text-gray-300">
						© {year} ToDo List. Semua hak dilindungi.
					</p>
				</div>
			</div>
		</main>
	</div>
</div>
