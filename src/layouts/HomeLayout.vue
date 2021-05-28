<template>
	<div class="min-h-screen flex flex-col">
		<header
			class="flex-none container mx-auto h-16 flex items-center justify-between px-4"
		>
			<h2 class="font-bold text-lg">Contacts Manager</h2>
			<div class="flex space-x-2 items-center">
				<div class="h-8 w-8 rounded-full bg-gray-300"></div>
				<div>{{ $user.firstName }}</div>
			</div>
		</header>
		<main class="flex-1 flex">
			<div class="flex flex-col w-60 flex-none">
				<router-link
					to="/"
					class="py-2 px-4 hover:bg-gray-100 transition-all"
					>Contacts</router-link
				>
				<router-link
					to="/trash"
					class="py-2 px-4 hover:bg-gray-100 transition-all"
					>Trash</router-link
				>
			</div>
			<router-view />
		</main>
	</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
	name: 'HomeLayout',
	async created() {
		let res = await this.fetchProfile()
		if (res.error) await this.logout()
	},
	computed: {
		...mapGetters('auth', ['$user'])
	},
	methods: {
		...mapActions('auth', ['fetchProfile', 'logout'])
	}
}
</script>