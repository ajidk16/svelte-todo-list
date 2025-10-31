<script>
	import { Navbar } from '$lib/components/shared';
	import StatsCards from '../../../modules/todos/components/stats-cards.svelte';

	let { data } = $props();
	const todoStatus = $derived(data.todoStatus.data);
</script>

<div>
	<StatsCards todosStatus={todoStatus} />
</div>
