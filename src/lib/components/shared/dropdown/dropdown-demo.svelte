<script lang="ts">
	import Dropdown from './dropdown.svelte';

	const options = [
		{ id: 1, label: 'Option 1' },
		{ id: 2, label: 'Option 2' },
		{ id: 3, label: 'Option 3' }
	];

	function handleSelect(item: unknown) {
		console.log(item);
	}
</script>

<Dropdown items={options} onSelect={handleSelect} placeholder="pilih" />
