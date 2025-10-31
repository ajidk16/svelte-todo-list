<script lang="ts">
	import { Footer, Navbar } from '$lib/components/shared';
</script>

<div class="bg-slate-50 text-slate-800 antialiased min-h-screen flex flex-col">
	<Navbar />
	<main class="flex-1">
		<slot />
	</main>
	<Footer />
</div>
