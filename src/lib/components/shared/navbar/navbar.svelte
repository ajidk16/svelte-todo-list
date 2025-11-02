<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/state';

	const { user } = $props<{
		user?: { username: string; email: string; verified: boolean };
	}>();

	// svelte-ignore non_reactive_update
	let listNavbar: { name: string; href: string }[];

	if (user?.verified === true) {
		listNavbar = [
			{ name: 'Dashboard', href: '/dashboard' },
			{ name: 'Todo', href: '/todo' },
			{ name: 'Kanban', href: '/kanban' }
		];
	} else {
		listNavbar = [{ name: 'Dashboard', href: '/dashboard' }];
	}

	const pathname = $derived(page.url.pathname);
</script>

<header class="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur">
	<div class="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
		<div class="flex items-center gap-3">
			<div
				class="grid h-9 w-9 place-content-center rounded-xl bg-brand-600 font-semibold text-white shadow-soft"
			>
				TD
			</div>
			<h1 class="text-lg font-semibold tracking-tight sm:text-xl">Todo List</h1>
		</div>
		<nav class="hidden items-center gap-6 text-sm text-slate-600 md:flex">
			{#each listNavbar as item}
				<a
					href={item.href}
					class={`hover:text-brand-600 ${pathname === item.href ? 'rounded-lg border px-3 py-0.5 text-brand-600' : ''}`}
					>{item.name}</a
				>
			{/each}
		</nav>
		<div class="flex items-center gap-3">
			<div class="relative">
				<button
					class="group flex cursor-pointer items-center gap-2 rounded-full bg-slate-100 p-1.5 capitalize hover:bg-slate-200 focus:outline-none"
				>
					<img
						src="https://ui-avatars.com/api/?name={user?.username}&background=0D8ABC&color=fff"
						alt="Avatar"
						class="h-8 w-8 rounded-full"
					/>
					{user?.username}
					<span class="sr-only">Open user menu</span>
					<svg
						class="h-4 w-4 text-slate-600 group-hover:text-slate-800"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M6 9l6 6 6-6"
						/>
					</svg>
				</button>
				<div
					class="ring-opacity-5 absolute right-0 z-10 mt-2 hidden w-40 rounded-md border-none bg-white shadow-lg ring-1 ring-brand-500 group-hover:block group-focus:tracking-normal"
					style="min-width: 10rem;"
				>
					<ul class="py-1 text-sm text-slate-700">
						<li>
							<a href="/profile/tags" class="block px-4 py-2 hover:bg-slate-100">Profile</a>
						</li>
						<!-- <li>
							<a href="/master-data" class="block px-4 py-2 hover:bg-slate-100">Master Data</a>
						</li> -->
						<li>
							<form method="POST" action="/auth/logout?/signOut" use:enhance>
								<button
									type="submit"
									class="w-full px-4 py-2 text-left text-red-600 hover:bg-slate-100">Logout</button
								>
							</form>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</header>

<style>
	.relative:focus-within .absolute,
	.relative:hover .absolute {
		display: block;
	}
	.absolute {
		display: none;
	}
</style>
