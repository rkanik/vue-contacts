<template>
	<div class="min-h-screen flex flex-col bg-primary dark:bg-dark-primary">
		<header
			class="flex-none bg-seondary dark:bg-dark-seondary shadow sticky top-0 z-10"
		>
			<div class="container mx-auto">
				<div class="px-4 h-16 flex items-center">
					<h2
						class="font-bold text-lg text-text-primaryy dark:text-dark-text-primary tracking-wide"
					>
						Contacts
					</h2>

					<u-button icon class="ml-auto">
						<u-icon
							class="text-lg"
							mdi="mdi-white-balance-sunny"
							@click="switchTheme()"
						/>
					</u-button>
					<ProfileMenu class="ml-2" />
				</div>
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
		...mapActions(['switchTheme']),
		...mapActions('auth', ['fetchProfile', 'logout']),
	},
}
</script>