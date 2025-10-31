<script lang="ts">
	import { enhance } from '$app/forms';
	import { ArrowRight, Loader } from 'lucide-svelte';
	let showPassword = false;
	let dark = false;

	// Persist dark mode dengan localStorage
	if (typeof window !== 'undefined') {
		dark =
			localStorage.getItem('theme') === 'dark' ||
			(!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
		document.documentElement.classList.toggle('dark', dark);
	}

	function toggleTheme() {
		dark = !dark;
		document.documentElement.classList.toggle('dark', dark);
		localStorage.setItem('theme', dark ? 'dark' : 'light');
	}

	function togglePassword() {
		showPassword = !showPassword;
	}

	const year = new Date().getFullYear();

	let loading = false;
	let errorMessage = '';
</script>

<div class="bg-gray-50 text-gray-800 dark:bg-gray-950 dark:text-gray-100">
	<div class="grid min-h-dvh md:grid-cols-2">
		<!-- Panel brand -->
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
						<svg width="22" height="22" viewBox="0 0 24 24" fill="none" class="text-white">
							<path
								d="M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3z"
								stroke="currentColor"
								stroke-width="1.5"
							/>
							<path
								d="M12 8v8M7.5 10.5l9 5"
								stroke="currentColor"
								stroke-width="1.5"
								opacity=".7"
							/>
						</svg>
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
						<h2 class="text-2xl font-semibold tracking-tight">Masuk</h2>
						<p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
							Gunakan username dan kata sandi akunmu.
						</p>
					</div>

					{#if errorMessage}
						<p class="mb-2 text-sm text-red-600">{errorMessage}</p>
					{/if}

					<!-- svelte-ignore component_name_lowercase -->
					<form
						method="POST"
						class="space-y-5"
						use:enhance={({ formElement, formData, action, cancel, submitter }) => {
							// console.log('formElement', formElement);
							// console.log('formData', formData);
							// console.log('action', action);
							// console.log('submitter', submitter);

							loading = true;
							errorMessage = '';
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
									on:click|preventDefault={togglePassword}
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
							<button
								type="button"
								on:click={toggleTheme}
								class="text-sm text-gray-600 dark:text-gray-300">Toggle tema</button
							>
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
								Masuk
							{/if}
						</button>
					</form>

					<p class="mt-6 text-center text-sm text-gray-600 dark:text-gray-300">
						© {year} ToDo List. Semua hak dilindungi.
					</p>
				</div>
			</div>
		</main>
	</div>
</div>
