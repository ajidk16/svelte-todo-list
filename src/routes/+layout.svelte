<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import { dev } from '$app/environment';
	import { RenderScan } from 'svelte-render-scan';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{@render children?.()}

{#if dev}
	<RenderScan />
{/if}
