<script>
	// Contoh data profil, bisa diganti dengan data asli dari store atau API
	let user = {
		name: 'Dimas Kaji',
		email: 'dimas@example.com',
		avatar: 'https://i.pravatar.cc/150?img=3',
		bio: 'Web developer passionate about Svelte and modern web technologies.',
		joined: 'January 2023'
	};
</script>

<div
	class="mx-auto mt-12 flex max-w-xl flex-col items-center gap-6 rounded-xl bg-white p-8 shadow-lg"
>
	<!-- svelte-ignore a11y_img_redundant_alt -->
	<img
		class="h-28 w-28 rounded-full border-4 border-blue-500 shadow-md"
		src={user.avatar}
		alt="Profile picture"
	/>
	<div class="text-center">
		<h2 class="text-2xl font-bold text-gray-800">{user.name}</h2>
		<p class="text-gray-500">{user.email}</p>
		<p class="mt-2 text-gray-600">{user.bio}</p>
	</div>
	<div class="flex items-center gap-2 text-sm text-gray-400">
		<svg class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
			<path stroke-linecap="round" stroke-linejoin="round" d="M8 7V3m8 4V3m-9 8h10m-9 4h6m-7 4h8"
			></path>
		</svg>
		<span>Joined {user.joined}</span>
	</div>
	<button
		class="mt-4 rounded-lg bg-blue-600 px-6 py-2 text-white shadow transition hover:bg-blue-700"
	>
		Edit Profile
	</button>
</div>
