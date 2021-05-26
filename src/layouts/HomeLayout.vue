<template>
	<div class="min-h-screen flex flex-col">
		<header
			class="flex-none container mx-auto border border-t-0 border-gray-400 h-16 flex items-center justify-between px-4"
		>
			<h2 class="font-bold text-lg">Contacts Manager</h2>
			<div class="flex space-x-2 items-center">
				<div class="h-8 w-8 rounded-full bg-gray-300"></div>
				<div>{{ $user.firstName }}</div>
			</div>
		</header>
		<main class="flex-1 flex flex-col">
			<router-view />
		</main>
	</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
	name: 'HomeLayout',
	async created() {

		await this.fetchProfile()

	},
	computed: {
		...mapGetters('auth', ['$user'])
	},
	methods: {
		...mapActions('auth', ['fetchProfile'])
	}
}
</script>