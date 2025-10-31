<script lang="ts">
	import { page } from '$app/state';

	const { data } = $props();

	let listAside = [
		// { title: 'Overview', url: '/profile' },
		{ title: 'Tags', url: '/profile/tags' },
		{ title: 'Todo Status', url: '/profile/todo-status' }
	];
</script>

<div class="flex min-h-screen flex-col md:flex-row">
	<!-- Sidebar -->
	<aside
		class="hidden w-full shrink-0 flex-row items-center gap-4 bg-white p-4 shadow-md md:flex md:w-64 md:flex-col md:items-stretch md:p-6"
	>
		<div class="flex w-full flex-col items-center gap-2">
			<div
				class="flex h-16 w-16 items-center justify-center rounded-full bg-gray-300 text-2xl font-bold text-gray-700 uppercase"
			>
				{data.user.username.charAt(0)}
			</div>
			<div class="text-lg font-semibold">{data.user.username}</div>
			<div class="text-sm text-gray-500">{data.user.email}</div>
			<div class="mt-2 flex items-center gap-2">
				<span class="text-xs text-gray-600">OTP:</span>
				{#if data.user.verified}
					<span class="rounded bg-green-100 px-2 py-0.5 text-xs text-green-700">Enabled</span>
				{:else}
					<span class="rounded bg-red-100 px-2 py-0.5 text-xs text-red-700">Disabled</span>
				{/if}
			</div>
		</div>

		<hr class="my-4 hidden border-brand-600 md:block" />
		<div class="flex w-full flex-row justify-center gap-2 md:flex-col md:justify-start">
			{#each listAside as item}
				<a
					href={item.url}
					class={`hover:text-brand-600 ${page.url.pathname === item.url ? 'rounded-lg border px-3 py-1 text-brand-600' : ''}`}
					>{item.title}</a
				>
			{/each}
		</div>
	</aside>

	<!-- Main Content -->
	<main class="flex-1 p-4 md:p-8">
		<slot />
	</main>
</div>
