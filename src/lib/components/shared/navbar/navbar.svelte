<script>
	import { enhance } from '$app/forms';
	import { page } from '$app/state';

	const listenav = [
		{ name: 'Dashboard', href: '/dashboard' },
		{ name: 'Todo', href: '/todo' },
		{ name: 'Kanban', href: '/kanban' }
	];

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
			{#each listenav as item}
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
					class="group flex cursor-pointer items-center gap-2 rounded-full bg-slate-100 p-1.5 hover:bg-slate-200 focus:outline-none"
				>
					<img
						src="https://ui-avatars.com/api/?name=Suraji&background=0D8ABC&color=fff"
						alt="Avatar"
						class="h-8 w-8 rounded-full"
					/>
				</button>
				<div
					class="ring-opacity-5 absolute right-0 z-10 mt-2 hidden w-40 rounded-md border-none bg-white shadow-lg ring-1 ring-brand-500 group-hover:block group-focus:tracking-normal"
					style="min-width: 10rem;"
				>
					<ul class="py-1 text-sm text-slate-700">
						<li>
							<a href="/profile/tags" class="block px-4 py-2 hover:bg-slate-100">Profile</a>
						</li>
						<li>
							<a href="/master-data" class="block px-4 py-2 hover:bg-slate-100">Master Data</a>
						</li>
						<li>
							<form method="POST" action="/auth/logout" use:enhance>
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
