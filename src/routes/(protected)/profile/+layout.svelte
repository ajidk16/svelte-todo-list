<script lang="ts">
	import { page } from '$app/state';
	import { getCookie } from '$lib/store/cookies';

	type UserProfile = {
		username: string;
		email: string;
		verified: boolean;
	};

	const user = getCookie('userProfile') as unknown as UserProfile;

	console.log('User Profile Cookie:', user);

	let profile = {
		name: 'John Doe',
		email: 'john@example.com',
		otpEnabled: true
	};

	let listAside = [
		// { title: 'Overview', url: '/profile' },
		{ title: 'Tags', url: '/profile/tags' },
		{ title: 'Todo Status', url: '/profile/todo-status' }
	];
</script>

<div class="flex min-h-screen">
	<aside class="flex w-64 flex-col gap-4 bg-white p-6 shadow-md">
		<div class="flex flex-col items-center gap-2">
			<div
				class="flex h-16 w-16 items-center justify-center rounded-full bg-gray-300 text-2xl font-bold text-gray-700 uppercase"
			>
				{user?.username.charAt(0)}
			</div>
			<div class="text-lg font-semibold">{user?.username}</div>
			<div class="text-sm text-gray-500">{user?.email}</div>
			<div class="mt-2 flex items-center gap-2">
				<span class="text-xs text-gray-600">OTP:</span>
				{#if user?.verified}
					<span class="rounded bg-green-100 px-2 py-0.5 text-xs text-green-700">Enabled</span>
				{:else}
					<span class="rounded bg-red-100 px-2 py-0.5 text-xs text-red-700">Disabled</span>
				{/if}
			</div>
		</div>

		<hr class="my-4 border-brand-600" />
		{#each listAside as item}
			<a
				href={item.url}
				class={`hover:text-brand-600 ${page.url.pathname === item.url ? 'rounded-lg border px-3 py-1 text-brand-600' : ''}`}
				>{item.title}</a
			>
		{/each}
	</aside>

	<main class="flex-1 p-8">
		<slot />
	</main>
</div>
