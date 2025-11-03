<script lang="ts">
	import { goto } from '$app/navigation';
	import { Button } from '$lib/components/shared/index.js';
	import { api } from '$lib/utils/api';
	import { Plus } from 'lucide-svelte';

	// Tipe untuk tag terkait todo
	type TodoTag = {
		tag: {
			id: string;
			name: string;
			color: string;
		};
	};

	// Tipe user pembuat todo
	type User = {
		id: string;
		email: string;
		username: string;
	};

	// Tipe card/todo
	type KanbanItem = {
		id: string;
		title: string;
		description: string;
		isCompleted: boolean;
		priority: string;
		user: User;
		todosTags: TodoTag[];
	};

	// Tipe kolom kanban
	type KanbanColumn = {
		id: string;
		name: string;
		label: string;
		color: string; // hex color
		sortOrder: number;
		todos: KanbanItem[];
	};

	let { data } = $props();

	let columns: KanbanColumn[] = $derived(data.kanban.data);

	let dragged: KanbanItem | null = null;
	let fromCol: number | null = null;

	function onDragStart(event: DragEvent, card: KanbanItem, colIdx: number) {
		dragged = card;
		fromCol = colIdx;
		event.dataTransfer?.setData('text/plain', card.id.toString());
	}

	async function onDrop(event: DragEvent, toColIdx: number) {
		event.preventDefault();
		if (dragged && fromCol !== null) {
			if (fromCol !== toColIdx) {
				// hapus dari kolom asal
				const fromTodos = columns[fromCol].todos.filter((item) => item.id !== dragged!.id);
				// tambah ke kolom tujuan
				const toTodos = [...columns[toColIdx].todos, dragged];

				// update columns dengan copy baru agar reaktif
				columns = columns.map((col, idx) => {
					if (idx === fromCol) return { ...col, todos: fromTodos };
					if (idx === toColIdx) return { ...col, todos: toTodos };
					return col;
				});

				// Update status todo di backend via API client-side
				await api('/todos/' + dragged!.id, {
					method: 'PUT',
					body: JSON.stringify({
						status: columns[toColIdx].id
					}),
					headers: {
						Authorization: `Bearer ${data.auth}`,
						'Content-Type': 'application/json'
					}
				});

				console.log('fromTodos:', fromTodos, 'toTodos:', toTodos, 'columns:', columns);

				dragged = null;
				fromCol = null;
			}
		}
	}

	function onDragOver(event: DragEvent) {
		event.preventDefault();
	}
</script>

<div>
	<!-- Info Bar -->
	<section class="mx-auto max-w-7xl px-4 pt-6">
		<div class="rounded-2xl bg-white p-4 ring-1 ring-gray-200">
			<div class="flex flex-col gap-3 sm:flex-row sm:items-center">
				<div class="text-sm text-gray-600">
					<strong class="font-semibold">Catatan:</strong> Ini tampilan statis. Ubah konten kartu langsung
					di HTML.
				</div>
				<div class="flex flex-wrap items-center gap-2 sm:ml-auto">
					{#each columns as col}
						<span
							class="inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs"
							style={`background-color: ${col.color}; color: white;`}
						>
							• {col.label}
						</span>
					{/each}
				</div>
			</div>
		</div>
	</section>

	<!-- Board -->
	<div
		class="mx-auto grid max-w-7xl gap-4 px-4 pt-6 sm:grid-cols-2 lg:grid-cols-{String(
			columns.length
		)}"
	>
		{#if columns.length === 0}
			<section
				class="col-span-full flex h-[60vh] flex-col items-center justify-center rounded-2xl bg-white shadow-inner ring-1 ring-gray-200"
			>
				<svg
					class="mb-4 h-16 w-16 text-gray-300"
					fill="none"
					stroke="currentColor"
					stroke-width="1.5"
					viewBox="0 0 48 48"
				>
					<rect x="8" y="12" width="32" height="24" rx="4" fill="#f3f4f6" />
					<path d="M16 20h16M16 28h8" stroke="#d1d5db" stroke-width="2" stroke-linecap="round" />
				</svg>
				<h2 class="mb-2 text-lg font-semibold text-gray-700">Belum Ada Kolom</h2>
				<p class="mb-4 max-w-xs text-center text-sm text-gray-500">
					Tidak ada kolom untuk ditampilkan.<br />
					Silakan tambahkan kolom baru untuk memulai board kanban Anda.
				</p>

				<Button onClick={() => goto('/profile/todo-status')}>
					<Plus size={16} /> Tambah Kolom
				</Button>
			</section>
		{:else}
			{#each columns as col, colIdx}
				<!-- svelte-ignore event_directive_deprecated -->
				<section
					role="list"
					class="flex h-[70vh] flex-col rounded-2xl bg-white shadow-sm ring-1 ring-gray-200"
					on:dragover={onDragOver}
					on:drop={(event) => onDrop(event, colIdx)}
				>
					<header class="flex items-center justify-between border-b border-gray-200 p-4">
						<div class="flex items-center gap-2">
							<span class="h-2.5 w-2.5 rounded-full" style={`background-color: ${col.color}`}
							></span>
							<h3 class="font-semibold">{col.label}</h3>
						</div>
						<span class="text-xs text-gray-500">{col.todos.length} item</span>
					</header>
					<div class="space-y-3 overflow-auto p-3">
						{#each col.todos as card}
							<article
								draggable="true"
								on:dragstart={(event) => onDragStart(event, card, colIdx)}
								class="cursor-move rounded-xl border border-gray-200 bg-white p-3 hover:shadow-md"
							>
								<div class="flex items-start gap-2">
									<div
										class="mt-1 h-2.5 w-2.5 shrink-0 rounded-full"
										style={`background-color: ${col.color}`}
									></div>
									<div class="min-w-0">
										<h4 class="truncate text-sm font-medium">{card.title}</h4>
										<p class="mt-1 text-xs text-gray-600">{card.description}</p>
										<div class="mt-2 flex flex-wrap items-center gap-2">
											<span
												class="rounded-md bg-amber-50 px-2 py-0.5 text-[11px] font-medium text-amber-700 ring-1 ring-amber-100"
											>
												{card.priority.toUpperCase()}
											</span>
											<span
												class="rounded-md bg-gray-100 px-2 py-0.5 text-[11px] text-gray-700 ring-1 ring-black/5"
											>
												{card.isCompleted ? 'Completed' : 'Pending'}
											</span>
											{#each card.todosTags as tagItem}
												<span
													class="rounded-md px-2 py-0.5 text-[11px] font-medium ring-1"
													style={`background-color: ${tagItem.tag.color}; color: white;`}
												>
													{tagItem.tag.name}
												</span>
											{/each}
										</div>
									</div>
								</div>
							</article>
						{/each}
					</div>
					<footer class="border-t border-gray-200 p-3 text-center text-xs text-gray-500">
						Drag & drop item ke column lain.
					</footer>
				</section>
			{/each}
		{/if}
	</div>
</div>
