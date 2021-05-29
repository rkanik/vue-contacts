<template>
	<div class="min-h-screen flex flex-col">
		<header
			class="flex-none container mx-auto h-16 flex items-center justify-between px-4"
		>
			<h2 class="font-bold text-lg">Contacts Manager</h2>
			<ProfileMenu />
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
import ProfileMenu from '../components/ProfileMenu.vue'
export default {
	name: 'HomeLayout',
	components: {
		ProfileMenu
	},
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