<script lang="ts">
	import { Footer, Navbar } from '$lib/components/shared';

	const { data } = $props();
</script>

<div class="flex min-h-screen flex-col bg-slate-50 text-slate-800 antialiased">
	<Navbar user={data.me.data} />

	<!-- svelte-ignore slot_element_deprecated -->
	<main class="flex-1">
		<slot />
	</main>

	<Footer />
</div>
