<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import { ArrowLeft, ArrowRight, RemoveFormatting, SquarePen, Trash } from 'lucide-svelte';
	import VerifyNotice from '../../../modules/todos/components/verify-notice.svelte';
	import StatsCards from '../../../modules/todos/components/stats-cards.svelte';
	import Button from '$lib/components/shared/button/button.svelte';
	import Modal from '$lib/components/shared/modal/modal.svelte';
	import { enhance } from '$app/forms';

	let { data } = $props();

	const todos = $derived(data.todos.data);
	const tags = $derived(data.tags);
	const todoStatus = $derived(data.todoStatus.data);

	const onPrev = (page: number, limit: number) => {
		goto(`/todo?page=${page - 1}&limit=${limit}`, { noScroll: true });
	};

	const onNext = (page: number, limit: number) => {
		goto(`/todo?page=${page + 1}&limit=${limit}`, { noScroll: true });
	};

	const dateFilter = [
		{
			label: 'Bulan ini',
			value: 'month'
		},
		{
			label: 'Minggu ini',
			value: 'week'
		},
		{
			label: 'Hari ini',
			value: 'day'
		},
		{
			label: 'Semua',
			value: ''
		}
	];

	let selectedFilter = $state(page.url.searchParams.get('date-filter') ?? '');
	let loadingFilter = $state(false);

	const filterDate = async (value: string) => {
		loadingFilter = true;
		await goto(`/todo?page=1&limit=${data.todos.pagination.limit}&date-filter=${value}`, {
			noScroll: true
		});
		loadingFilter = false;
		selectedFilter = value;
	};

	let searchValue = $state(page.url.searchParams.get('search') ?? '');
	let searchTimeout: ReturnType<typeof setTimeout>;

	const handleSearch = (e: Event) => {
		const value = (e.target as HTMLInputElement).value;
		searchValue = value;

		clearTimeout(searchTimeout);
		searchTimeout = setTimeout(async () => {
			await goto(
				`/todo?page=1&limit=${data.todos.pagination.limit}&date-filter=${selectedFilter}&search=${searchValue}`,
				{
					noScroll: true
				}
			);
		}, 400);
	};

	let modal = $state(false);
	let formData: Record<string, any> = $state({});
	let editMode: boolean = $state(false);

	type Todo = {
		id: string;
		title?: string;
		description?: string;
		status?: string;
		priority?: string;
		tags?: string;
		color?: string;
		isCompleted?: boolean;
	};

	// take value tags to string array from formData.todosTags
	let valueTags = $state<string>('');

	const onEdit = (id: string) => {
		const todoToEdit = data.todos.data.find((todo: Todo) => todo.id === id);

		if (todoToEdit && todoToEdit.todosTags) {
			valueTags = todoToEdit.todosTags.map((tagObj: any) => tagObj.tag.name).join(', ');
		} else {
			valueTags = '';
		}

		if (todoToEdit) {
			formData = { ...todoToEdit };
			editMode = true;
			modal = true;
		}
	};
</script>

<div>
	{#if data.todos.status === 403}
		<VerifyNotice />
	{:else}
		<!-- Main content goes here -->
		<StatsCards todosStatus={todoStatus} />
		<section class="mx-auto mt-8 max-w-7xl px-4 sm:px-6 lg:px-8">
			<div class="rounded-2xl border border-slate-200 bg-white p-4 shadow-soft">
				<!-- <Button onClick={() => (modal = true)} rounded="md" size="xs">Tambah Todo</Button> -->
				<div class="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
					<div class="flex flex-wrap items-center gap-2">
						<span class="text-sm text-slate-500">Filter:</span>
						{#each dateFilter.reverse() as filter, i}
							<button
								type="button"
								class="cursor-pointer rounded-full border border-slate-200 px-3 py-1.5 text-sm capitalize transition-colors duration-150 hover:border-brand-200 hover:bg-brand-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/30
									{selectedFilter === filter.value
									? 'border-brand-300 bg-brand-100 font-semibold text-brand-700'
									: 'bg-white text-slate-700'}"
								onclick={() => filterDate(filter.value)}
								aria-pressed={selectedFilter === filter.value}
							>
								{filter.label}
							</button>
						{/each}
					</div>
					<div class="w-full sm:w-80">
						<label class="sr-only" for="search">Cari tugas</label>
						<div class="relative">
							<input
								id="search"
								type="text"
								placeholder="Cari judul, tag, atau deskripsi…"
								value={searchValue}
								oninput={handleSearch}
								class="w-full rounded-xl border border-slate-200 py-2.5 pr-3 pl-10 text-sm outline-none placeholder:text-slate-400"
							/>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="absolute top-2.5 left-3 h-5 w-5 text-slate-400"
								viewBox="0 0 24 24"
								fill="currentColor"
							>
								<path
									d="M10 2a8 8 0 105.293 14.293l3.707 3.707 1.414-1.414-3.707-3.707A8 8 0 0010 2zm0 2a6 6 0 110 12A6 6 0 0110 4z"
								/>
							</svg>
						</div>
					</div>
				</div>
			</div>
		</section>

		<main
			class="mx-auto mt-6 grid max-w-7xl gap-6 px-4 pb-16 sm:px-6 lg:grid-cols-[1fr_320px] lg:px-8"
		>
			<section class="space-y-4">
				<div class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-soft">
					<div
						class="flex items-center justify-between border-b border-slate-100 bg-slate-50 px-5 py-3"
					>
						<h2 class="text-sm font-semibold tracking-wide text-slate-700 uppercase">
							{dateFilter.find((filter) => filter.value === selectedFilter)?.label}
						</h2>
						<span class="text-xs text-slate-500">{todos.length} tugas</span>
					</div>
					{#if data.todos.data.length === 0}
						<div class="mx-auto mt-16 max-w-7xl px-4 sm:px-6 lg:px-8">
							<div
								class="rounded-2xl border border-dotted border-slate-200 bg-white p-6 text-center text-slate-700"
							>
								<h2 class="text-lg font-semibold">Tidak ada tugas ditemukan</h2>
								<p class="mt-2 text-sm">
									Saat ini tidak ada tugas yang sesuai dengan kriteria pencarian atau filter Anda.
									Cobalah menyesuaikan pencarian atau filter Anda.
								</p>
							</div>
						</div>
					{:else}
						{#each todos as todo}
							<ul class="divide-y divide-slate-100">
								<li class="flex justify-between p-5 hover:bg-slate-50/60">
									<div class="flex w-full items-start gap-4">
										<input
											type="checkbox"
											id={todo.id}
											class="peer mt-1.5 h-5 w-5 shrink-0 cursor-pointer rounded accent-brand-600"
										/>
										<label
											for={todo.id}
											class="w-full cursor-pointer peer-checked:line-through peer-checked:decoration-slate-400 peer-checked:opacity-60"
										>
											<h3 class="text-lg font-semibold text-slate-800">{todo.title}</h3>
											<p class="mt-1 text-sm text-slate-600">
												{todo.description}
											</p>
											<div class="mt-3 flex flex-wrap gap-2 capitalize">
												{#each todo.todosTags as tags}
													<span
														style="background-color: {tags.tag.color ?? '#3b82f6'}; color: white;"
														class="inline-flex items-center rounded-full px-3 py-1 text-xs font-medium"
														>{tags.tag.name}</span
													>
												{/each}

												<span
													class={`${!todo.isCompleted && 'hidden'} rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-xs text-emerald-700 peer-checked:inline`}
													>{todo.isCompleted ? 'Selesai' : 'Belum Selesai'}</span
												>
											</div>
										</label>
									</div>
									<div class="flex flex-col items-center justify-center gap-3">
										<button
											class="inline-flex cursor-pointer items-center rounded-full bg-slate-100 p-2 text-slate-600 hover:bg-slate-200 focus:ring-2 focus:ring-brand-500/30 focus:outline-none"
											onclick={() => onEdit(todo.id)}
										>
											<SquarePen size="16" />
										</button>
										<button
											class="inline-flex cursor-pointer items-center rounded-full bg-slate-100 p-2 text-slate-600 hover:bg-slate-200 focus:ring-2 focus:ring-brand-500/30 focus:outline-none"
										>
											<Trash size="16" />
										</button>
									</div>
								</li>
							</ul>
						{/each}
					{/if}
					<div class="p-5">
						<nav class="flex items-center justify-between gap-3" aria-label="Pagination">
							<p class="hidden text-sm text-slate-600 sm:block">
								Menampilkan <span class="font-medium"
									>{(data.todos.pagination.page - 1) * data.todos.pagination.limit + 1}</span
								>–<span class="font-medium"
									>{Math.min(
										data.todos.pagination.page * data.todos.pagination.limit,
										data?.todos?.pagination?.total
									)}</span
								>
								dari
								<span class="font-medium">{data?.todos?.pagination?.total}</span> tugas
							</p>

							<div class="flex items-center gap-1">
								<button
									class="inline-flex cursor-pointer items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/30 disabled:cursor-not-allowed disabled:opacity-40"
									aria-label="Sebelumnya"
									disabled={data.todos.pagination.page === 1}
									onclick={() => onPrev(data.todos.pagination.page, data.todos.pagination.limit)}
								>
									<ArrowLeft size="16" />
									<span class="hidden sm:inline">Sebelumnya</span>
								</button>

								<button
									class="inline-flex cursor-pointer items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/30"
									aria-label="Berikutnya"
									disabled={data.todos.pagination.page === data?.todos?.pagination?.totalPages}
									onclick={() => onNext(data.todos.pagination.page, data.todos.pagination.limit)}
								>
									<span class="hidden sm:inline">Berikutnya</span>
									<ArrowRight size="16" />
								</button>
							</div>
						</nav>
					</div>
				</div>
			</section>

			<aside class="space-y-4">
				<div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-soft">
					<h3 class="text-sm font-semibold text-slate-700">Shortcut</h3>
					<ul class="mt-3 space-y-2 text-sm">
						<li>
							<button
								onclick={() => {
									modal = true;
									editMode = false;
									formData = {};
								}}
								class="cursor-pointer text-brand-700 hover:underline">Tambah Tugas</button
							>
						</li>
						<!-- <li><a href="#asd" class="text-brand-700 hover:underline">Impor CSV</a></li>
						<li><a href="#asd" class="text-brand-700 hover:underline">Template</a></li> -->
					</ul>
				</div>
				<div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-soft">
					<h3 class="text-sm font-semibold text-slate-700">Ringkas Status</h3>
					<ul class="mt-3 space-y-2 text-sm">
						{#if todoStatus.length > 0}
							{#each todoStatus as status}
								<li class="flex items-center justify-between">
									<span class="inline-flex items-center gap-2"
										><span
											class="h-2.5 w-2.5 rounded-full"
											style="background-color: {status.color};"
										></span>
										{status.label}</span
									>
									<span class="font-medium">
										{status.todos.length ?? 0}
									</span>
								</li>
							{/each}
						{:else}
							<a href="/profile/todo-status" class="text-brand-700 hover:underline">Tambah Status</a>
						{/if}
					</ul>
				</div>

				<div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-soft">
					<h3 class="text-sm font-semibold text-slate-700">Tag Populer</h3>
					<div class="mt-3 flex flex-wrap gap-2">
						{#if tags.length > 0}
							{#each tags as tag}
								<span
									class="inline-flex items-center rounded-full px-3 py-1 text-xs font-medium"
									style="background-color: {tag.color}; color: white;"
								>
									{tag.name}
								</span>
							{/each}
						{:else}
							<a href="/profile/tags" class="text-brand-700 hover:underline">Tambah Tag</a>
						{/if}
					</div>
				</div>
			</aside>
		</main>
	{/if}
</div>

<Modal
	isOpen={modal}
	title={editMode ? 'Edit Todo' : 'Tambah Todo'}
	onClose={() => (modal = false)}
>
	<form
		method="POST"
		action={editMode ? '?/updateTodo' : '?/addTodo'}
		use:enhance={() => {
			// return async ({}) => {
			// 	// Setelah submit berhasil, tutup modal dan reset formData
			modal = false;
			formData = {};
			editMode = false;
			// };
		}}
		class="space-y-2"
	>
		<!-- Hidden field untuk ID saat update -->
		{#if editMode}
			<input type="hidden" name="id" value={formData.id} />
		{/if}

		<div>
			<label class="text-sm" for="title">Judul</label>
			<input
				id="title"
				name="title"
				type="text"
				class="w-full rounded-lg px-3 py-1"
				placeholder="Masukkan judul"
				value={formData.title ?? ''}
			/>
		</div>
		<div>
			<label class="text-sm" for="description">Deskripsi</label>
			<textarea
				id="description"
				name="description"
				class="w-full rounded-lg px-3 py-1"
				placeholder="Masukkan deskripsi">{formData.description ?? ''}</textarea
			>
		</div>
		<div>
			<label class="text-sm" for="priority">Prioritas</label>
			<select id="priority" name="priority" class="w-full rounded-lg px-3 py-1">
				<option value="low" selected={formData.priority === 'low'}>Rendah</option>
				<option value="medium" selected={formData.priority === 'medium'}>Sedang</option>
				<option value="high" selected={formData.priority === 'high'}>Tinggi</option>
				<option value="urgent" selected={formData.priority === 'urgent'}>Mendesak</option>
			</select>
		</div>
		<div>
			<label class="text-sm" for="status">Status</label>
			<select id="status" name="status" class="w-full rounded-lg px-3 py-1">
				{#each todoStatus as status}
					<option value={status.id} selected={formData?.status?.id === status.id}>
						{status.label}
					</option>
				{/each}
			</select>
		</div>
		<div class="space-y-1.5">
			<label for="tags" class="block text-sm font-medium">Tags (pisahkan dengan koma)</label>
			<input
				id="tags"
				name="tags"
				type="text"
				value={valueTags ?? ''}
				oninput={(e) => {
					const tags = (e.target as HTMLInputElement).value
						.split(',')
						.map((tag) => tag.trim())
						.filter((tag) => tag.length > 0)
						.map((tag) => ({
							name: tag,
							color: `#${Math.floor(Math.random() * 16777215)
								.toString(16)
								.padStart(6, '0')}`
						}));

					formData = {
						...formData,
						tags: (e.target as HTMLInputElement).value,
						todosTags: tags.map((tag) => ({ tag }))
					};
				}}
				placeholder="mis. svelte, tailwind, ui"
				class="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm ring-brand-500 outline-none focus:border-brand-400 focus:ring-2"
			/>
			<p class="text-xs text-slate-500">
				Contoh: <span class="font-medium">frontend, ecommerce, responsive</span>
			</p>
		</div>
		{#if formData.todosTags && formData.todosTags.length > 0}
			<div class="mt-2 flex flex-wrap gap-2">
				{#each formData.todosTags as tagObj}
					<span
						class="inline-flex items-center rounded-full px-3 py-1 text-xs font-medium"
						style="background-color: {tagObj.tag.color ?? '#3b82f6'}; color: white;"
					>
						{tagObj.tag.name}
					</span>
				{/each}
			</div>
		{/if}

		<div class="mt-3 flex items-center justify-end gap-3">
			<Button
				variant="ghost"
				onClick={() => {
					modal = false;
				}}
				type="button">Batal</Button
			>

			<button
				formaction={editMode ? '?/updateTodo' : '?/addTodo'}
				class="rounded-xl bg-brand-600 px-4 py-2 text-white"
				type="submit"
			>
				{editMode ? 'Update' : 'Simpan'}
			</button>
		</div>
	</form>
</Modal>
