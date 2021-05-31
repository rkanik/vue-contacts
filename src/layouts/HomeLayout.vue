<template>
	<div class="min-h-screen flex flex-col bg-primary dark:bg-dark-primary">
		<header
			class="flex-none bg-seondary dark:bg-dark-seondary sticky top-0 z-10"
		>
			<div class="container mx-auto">
				<div class="px-4 py-4 flex items-center">
					<h2
						class="font-bold text-xl text-text-primaryy dark:text-dark-text-primary tracking-wider"
					>
						Contacts
					</h2>

					<u-button icon class="ml-auto">
						<u-icon
							class="text-base"
							mdi="white-balance-sunny"
							@click="switchTheme()"
						/>
					</u-button>
					<ProfileMenu class="ml-2" />
				</div>
				<div class="px-4 grid grid-cols-3">
					<div class="flex items-center">
						<router-link to="/" tag="button">
							<div
								class="flex items-center space-x-2 px-3 py-2 relative rounded transition-all hover:text-accent dark:hover:text-dark-accent hover:bg-primary dark:hover:bg-dark-primary"
							>
								<UIcon mdi="account-circle-outline" />
								<div>Contacts</div>
							</div>
						</router-link>

						<button
							@click="onInitImport"
							class="flex items-center space-x-2 px-3 py-2 relative rounded transition-all hover:text-accent dark:hover:text-dark-accent hover:bg-primary dark:hover:bg-dark-primary focus:outline-none"
						>
							<UIcon mdi="cloud-upload-outline" />
							<div>Import</div>
						</button>

						<button
							class="flex items-center space-x-2 px-3 py-2 relative rounded transition-all hover:text-accent dark:hover:text-dark-accent hover:bg-primary dark:hover:bg-dark-primary focus:outline-none"
						>
							<UIcon mdi="download-outline" />
							<div>Export</div>
						</button>

						<router-link to="/trash" tag="button">
							<div
								class="flex items-center space-x-2 px-3 py-2 relative rounded transition-all hover:text-accent dark:hover:text-dark-accent hover:bg-primary dark:hover:bg-dark-primary"
							>
								<UIcon mdi="trash-can-outline" />
								<div>Trash</div>
							</div>
						</router-link>
					</div>

					<div class="flex justify-center">
						<div
							class="h-12 w-96 relative transform translate-y-5 flex items-center space-x-3 bg-primary dark:bg-dark-primary px-6 rounded-full border-2 dark:border-dark-divider"
						>
							<UIcon mdi="magnify" class="flex-none" />
							<input
								type="text"
								placeholder="Search"
								class="flex-1 text-primary dark:text-dark-text-secondary bg-transparent focus:outline-none"
							/>
						</div>
					</div>

					<div class="flex justify-end items-center space-x-3">
						<u-button @click="$router.push('/new')" class="rounded-full">
							<UIcon mdi="plus-circle-outline" class="text-base" />
							<span>Add New</span>
						</u-button>
					</div>
				</div>
			</div>
		</header>

		<main class="flex-1 flex">
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
		ProfileMenu,
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
		...mapActions('me', [
			'importContacts'
		]),
		async onChangeFile(event) {
			await this.importContacts({ file: event.target.files[0] })
		},
		onInitImport() {
			const input = document.createElement('input')
			input.type = 'file'
			input.accept = 'application/JSON, .csv, .vcf'
			input.onchange = this.onChangeFile
			input.click()
		},
	},
}
</script>