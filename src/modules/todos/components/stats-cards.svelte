<script lang="ts">
	export let todosStatus: any[] = [];

	let data = 0;
	todosStatus.forEach((value) => {
		data += value.todos.length;
	});
</script>

<section class="mx-auto mt-8 max-w-7xl px-4 sm:px-6 lg:px-8">
	<div class="grid gap-4 sm:grid-cols-3">
		<article class="rounded-2xl border border-slate-200 bg-white p-5 shadow-soft">
			<div class="text-sm text-slate-500">Total Tugas</div>
			<div class="mt-2 text-3xl font-semibold">{data}</div>
			<div class="mt-1 text-xs text-slate-500">+6 minggu ini</div>
		</article>
		{#each todosStatus.filter((status) => status.name === 'backlog' || status.name === 'done') as status}
			<article class="rounded-2xl border border-slate-200 bg-white p-5 shadow-soft">
				<div class="text-sm text-slate-500">{status.label}</div>
				<div class="mt-2 text-3xl font-semibold">{status.todos.length}</div>
				<div class="mt-1 text-xs text-slate-500">
					{Math.round((status.todos.length / data) * 100)}% completion
				</div>
			</article>
		{/each}
	</div>
</section>
