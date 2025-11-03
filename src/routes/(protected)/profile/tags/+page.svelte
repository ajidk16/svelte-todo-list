<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import { page } from '$app/state';

	// @ts-nocheck

	import { Card, DataTable, Modal } from '$lib/components/shared';
	import Button from '$lib/components/shared/button/button.svelte';
	import AksiCell from '$lib/components/shared/data-table/aksi-cell.svelte';
	import type {
		AnySvelteComponent,
		Column
	} from '$lib/components/shared/data-table/data-table.svelte';

	const { data } = $props();

	let tags = $derived(data.tags.data);

	type Row = { id: string; color: string; name: string; status: boolean };

	const columns: Column<Row>[] = [
		{
			key: 'name',
			header: 'Nama',
			sortable: true,
			render: (r) =>
				`<span style="background-color: ${r.color};" class="inline-block px-2 py-0.5 rounded-full text-white text-xs">${r.name}</span>`
		},
		{
			key: 'status',
			header: 'Status',
			sortable: true,
			render: (r) =>
				`<span class="px-2 py-0.5 rounded-full text-xs ${
					r.status === true ? 'bg-green-100 text-green-700' : 'bg-rose-100 text-rose-700'
				}">${r.status ? 'Aktif' : 'Tidak Aktif'}</span>`
		},
		{
			key: 'aksi',
			header: 'Aksi',
			align: 'right',
			visible: true,
			component: AksiCell as unknown as AnySvelteComponent,
			componentProps: (row) => ({
				onEdit: () => {
					modal = true;
					isEditing = true;
					editingStatus = { id: row.id, name: row.name, color: row.color, status: row.status };
				},
				onDelete: () => console.log('delete', row)
			})
		}
	];

	function onSort(e: CustomEvent) {
		const { sortBy, sortDir } = e.detail;
		console.log('sort:', sortBy, sortDir);
		goto(`?page=1&limit=10&sortBy=${sortBy}&sortDir=${sortDir}`);
	}
	function onPage(e: CustomEvent) {
		const { page, pageSize } = e.detail;
		console.log('page:', page, pageSize);
		goto(`?page=${page}&limit=${pageSize}`);
	}

	let selectedIds: string[] = [];
	function onSelect(e: CustomEvent) {
		console.log('selected ids:', e.detail.ids);
		// goto(`?page`)
		selectedIds = e.detail.ids;
	}

	function debounce<T extends (...args: any[]) => void>(func: T, delay: number): T {
		let timeoutId: ReturnType<typeof setTimeout>;
		return function (...args: Parameters<T>) {
			if (timeoutId) clearTimeout(timeoutId);
			timeoutId = setTimeout(() => func(...args), delay);
		} as T;
	}

	// Debounced handler, hanya akan terpanggil 300ms setelah typing berhenti
	const debouncedGoto = debounce((query: string) => {
		console.log('search query:', query);
		goto(`?page=1&limit=10&search=${encodeURIComponent(query)}`, {
			noScroll: true,
			keepFocus: true
		});
	}, 300);

	// Event handler onSearch
	function onSearch(e: CustomEvent) {
		const query = e.detail.q;
		debouncedGoto(query);
	}

	let modal = $state(false);
	let editingStatus = $state({ id: '', name: '', color: '#ffffff', status: true });
	let isEditing = $state(false);
</script>

<div>
	<Card className="mb-6">
		<div class="flex items-center justify-between">
			<h3 class="text-lg font-semibold">Daftar Tags</h3>
			<Button
				variant="primary"
				onClick={() => {
					modal = true;
					isEditing = false;
					editingStatus = { id: '', name: '', color: '#ffffff', status: true };
				}}
			>
				Tambah tags
			</Button>
		</div>
	</Card>
	<DataTable
		{columns}
		data={tags}
		total={data?.tags?.pagination?.total}
		selectable
		searchable
		stickyHeader
		serverMode={true}
		inputValue={page.url.searchParams.get('search') || ''}
		currentPage={Number(page.url.searchParams.get('page')) || 1}
		pageSizeOptions={[10, 25, 50, 100]}
		on:sort={onSort}
		on:page={onPage}
		on:select={onSelect}
		on:searchInput={onSearch}
	/>

	{#if modal}
		<Modal
			title={isEditing ? 'Edit tags' : 'Tambah tags'}
			isOpen={modal}
			onClose={() => (modal = false)}
		>
			<form
				method="POST"
				action={isEditing ? '?/update' : '?/create'}
				use:enhance={() => {
					modal = false;
					isEditing = false;
					editingStatus = { id: '', name: '', color: '#ffffff', status: true };
				}}
				class="space-y-4"
			>
				<div class="space-y-2">
					{#if isEditing}
						<input type="hidden" name="id" bind:value={editingStatus.id} />
					{/if}
					<label class="mb-1 block font-medium" for="name">Nama</label>
					<input
						id="name"
						name="name"
						type="text"
						class="w-full rounded-lg border border-slate-300 px-3 py-1"
						bind:value={editingStatus.name}
						placeholder="e.g., Backlog"
					/>

					<label class="mb-1 block font-medium" for="color">Warna</label>
					<input
						id="color"
						name="color"
						type="color"
						class="w-full rounded-lg border border-slate-300 px-3 py-2"
						bind:value={editingStatus.color}
					/>

					<label class="mb-1 block font-medium" for="status">Status</label>
					<!-- radio status -->
					<div class="space-x-4">
						<label class="inline-flex items-center">
							<input
								type="radio"
								name="status"
								value={true}
								class="form-radio"
								bind:group={editingStatus.status}
								checked={editingStatus.status === true}
							/>
							<span class="ml-2">Aktif</span>
						</label>
						<label class="inline-flex items-center">
							<input
								type="radio"
								name="status"
								value={false}
								class="form-radio"
								bind:group={editingStatus.status}
								checked={editingStatus.status === false}
							/>
							<span class="ml-2">Tidak Aktif</span>
						</label>
					</div>
				</div>
				<div class="flex justify-end space-x-2">
					<Button
						variant="secondary"
						onClick={() => {
							modal = false;
							isEditing = false;
							editingStatus = { id: '', name: '', color: '#ffffff', status: true };
						}}>Batal</Button
					>
					<Button variant="primary" type="submit">
						{isEditing ? 'Simpan' : 'Tambah'}
					</Button>
				</div>
			</form>
		</Modal>
	{/if}
</div>
