<script lang="ts">
	import Button from '$lib/components/shared/button/button.svelte';
	import { Ellipsis, Eye, Option, SquarePen, Trash } from 'lucide-svelte';

	export let row: any;
	export let onEdit: (row: any) => void = () => {};
	export let onDelete: (row: any) => void = () => {};
	let showMenu = false;
	export let onView: (row: any) => void = () => {};

	console.log('row di aksi cell:', onEdit.name);

	// Optional: close menu on outside click
	import { onMount } from 'svelte';
	let menuRef: HTMLDivElement;
	onMount(() => {
		const handleClick = (e: MouseEvent) => {
			if (showMenu && menuRef && !menuRef.contains(e.target as Node)) {
				showMenu = false;
			}
		};
		document.addEventListener('mousedown', handleClick);
		return () => document.removeEventListener('mousedown', handleClick);
	});
</script>

<div class="flex justify-end gap-2">
	<div class="hidden md:inline-block">
		<button
			class="cursor-pointer rounded p-1 hover:bg-gray-100"
			aria-label="Aksi"
			on:click={() => (showMenu = !showMenu)}
		>
			<Ellipsis size="20" class="text-gray-600" />
		</button>
		{#if showMenu}
			<div
				class="absolute right-14 z-50 mt-2 w-32 rounded bg-white shadow-2xl ring-1 ring-gray-200"
				bind:this={menuRef}
			>
				{#if onEdit.name !== ''}
					<button
						class="flex w-full cursor-pointer items-center px-3 py-2 hover:bg-gray-100"
						on:click={() => {
							showMenu = false;
							onEdit(row);
						}}
					>
						<SquarePen size="16" class="mr-2 text-sky-600" />
						Edit
					</button>
				{/if}
				{#if onDelete.name !== ''}
					<button
						class="flex w-full cursor-pointer items-center px-3 py-2 hover:bg-gray-100"
						on:click={() => {
							showMenu = false;
							onDelete(row);
						}}
					>
						<Trash size="16" class="mr-2 text-rose-600" />
						Hapus
					</button>
				{/if}
				{#if onView.name !== ''}
					<button
						class="flex w-full cursor-pointer items-center px-3 py-2 hover:bg-gray-100"
						on:click={() => {
							showMenu = false;
							onView(row);
						}}
					>
						<Eye size="16" class="mr-2 text-green-600" />
						Lihat
					</button>
				{/if}
			</div>
		{/if}
	</div>

	<div class="space-y-2 md:hidden">
		{#if onEdit.name !== ''}
			<Button rounded="md" size="xs" variant="outline" on:click={() => onEdit(row)}>
				<SquarePen size="16" class="text-sky-600" />
			</Button>
		{/if}
		{#if onDelete.name !== ''}
			<Button rounded="md" size="xs" variant="outline" on:click={() => onDelete(row)}>
				<Trash size="16" class="text-rose-600" />
			</Button>
		{/if}
		{#if onView.name !== ''}
			<Button rounded="md" size="xs" variant="outline" on:click={() => onView(row)}>
				<Eye size="16" class="text-green-600" />
			</Button>
		{/if}
	</div>
</div>
