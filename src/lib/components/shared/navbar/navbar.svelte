<script>
	import { enhance } from '$app/forms';
	import { page } from '$app/state';

	const listenav = [
		{ name: 'Dashboard', href: '/dashboard' },
		{ name: 'Todo', href: '/todo' },
		{ name: 'Kanban', href: '/kanban' }
	];

	const pathname = page.url.pathname;
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
			<form method="POST" action="/auth/logout" use:enhance>
				<button
					type="submit"
					class="rounded-lg bg-red-50 px-3 py-0.5 border text-red-600 hover:bg-red-100"
				>
					Logout
				</button>
			</form>
		</div>
	</div>
</header>
